import { GoogleGenAI } from "@google/genai";
import { buildSystemPrompt } from "@/lib/assistant-prompt";

// Tried in order: if one is overloaded or slow, fall through to the next.
// flash-lite first: fastest and least overloaded on the free tier.
const MODELS = ["gemini-3.5-flash-lite", "gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.1-flash-lite"];
// One attempt per model (not the SDK's default 5 retries, up to 60s apart),
// capped at 12s so a busy model is skipped quickly.
const HTTP_OPTIONS = { timeout: 12_000, retryOptions: { attempts: 1 } };
const SYSTEM_PROMPT = buildSystemPrompt();

// Created on first request so builds don't need the key.
let ai: GoogleGenAI | null = null;
function client() {
  if (!process.env.GEMINI_API_KEY) return null;
  ai ??= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return ai;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

// Simple per-IP limit: 10 messages per minute (in-memory, resets when the instance restarts)
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 10;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return new Response("Too many messages, please wait a minute.", { status: 429 });
  }

  let messages: ChatMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const valid =
    Array.isArray(messages) &&
    messages.length > 0 &&
    messages.length <= 20 &&
    messages.every(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.length <= 1000,
    );
  if (!valid) return new Response("Bad request", { status: 400 });

  const gemini = client();
  if (!gemini) {
    console.error("GEMINI_API_KEY is not set");
    return new Response("The assistant is unavailable right now.", { status: 500 });
  }

  // Gemini calls the assistant role "model"
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // Not streamed on purpose: the free tier often drops a stream mid-answer
  // (503 "high demand"). Waiting for the full answer means any failure, even
  // halfway, falls through to the next model and the visitor never sees a
  // cut-off reply. Answers are 2-5 sentences, so the wait is short.
  for (const model of MODELS) {
    try {
      const res = await gemini.models.generateContent({
        model,
        contents,
        config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.3, httpOptions: HTTP_OPTIONS },
      });
      const text = res.text?.trim();
      if (!text) throw new Error("empty response");
      return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    } catch (err) {
      console.error(`[chat] ${model} failed:`, (err as { status?: number }).status ?? err);
    }
  }

  return new Response("The assistant is busy right now, please try again in a moment.", { status: 503 });
}
