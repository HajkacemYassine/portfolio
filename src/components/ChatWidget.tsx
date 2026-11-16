"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is Yassine's tech stack?",
  "Tell me about the SAV-IA project.",
  "What experience does he have?",
  "Is he available for an internship or job?",
  "How can I contact him?",
];

const GREETING =
  "Hi! I'm Ask Yassine AI. Ask me about his skills, projects, experience or availability, in any language.";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const history: Msg[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-20) }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
    } catch (e) {
      const msg = e instanceof Error && e.message ? e.message : "Sorry, something went wrong.";
      setMessages([...history, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[min(600px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent">✦</div>
            <div className="flex-1">
              <p className="flex items-center gap-2 text-sm font-semibold">
                Ask Yassine AI <span className="h-2 w-2 rounded-full bg-accent" />
              </p>
              <p className="font-mono text-xs text-muted">Portfolio assistant</p>
            </div>
            <button onClick={() => setMessages([])} aria-label="Clear chat" disabled={loading}
              className="rounded-lg border border-line px-2 py-1 text-muted hover:text-text disabled:opacity-40">↺</button>
            <button onClick={() => setOpen(false)} aria-label="Close chat"
              className="rounded-lg border border-line px-2 py-1 text-muted hover:text-text">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm" aria-live="polite">
            <Bubble role="assistant" content={GREETING} />
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content || "…"} />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions (only before the first question) */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 border-t border-line p-3">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-accent hover:text-accent">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex gap-2 border-t border-line p-3">
            <input dir="auto" value={input} onChange={(e) => setInput(e.target.value)}
              maxLength={1000} placeholder="Ask about Yassine…" aria-label="Your question"
              className="min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-accent" />
            <button disabled={!input.trim() || loading}
              className="rounded-xl bg-accent px-4 text-sm font-semibold text-bg disabled:opacity-40">
              Send
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold shadow-lg hover:border-accent">
        <span className="text-accent">✦</span> Ask Yassine AI
      </button>
    </>
  );
}

function Bubble({ role, content }: Msg) {
  const mine = role === "user";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <p dir="auto"
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 leading-relaxed ${
          mine ? "bg-accent text-bg" : "bg-surface-2 text-text"}`}>
        {content}
      </p>
    </div>
  );
}
