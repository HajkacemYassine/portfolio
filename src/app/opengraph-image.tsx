import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/data/portfolio";

// Link-preview card shown when the site is shared (LinkedIn, X, WhatsApp, Slack...).
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at module scope; the asset doesn't depend on the request.
const avatar = profile.photo
  ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public", profile.photo))).toString("base64")}`
  : null;

const TAGS = ["React", "FastAPI", "Django", "LangChain", "RAG", "PostgreSQL"];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          gap: 64,
          background: "radial-gradient(circle at 20% 0%, #10302a 0%, #0a0b0f 55%)",
          color: "#e7e9ef",
          fontFamily: "sans-serif",
        }}
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element -- Satori needs a plain <img>
          <img
            src={avatar}
            alt=""
            width={300}
            height={300}
            style={{ borderRadius: 9999, border: "6px solid #34d399", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: 9999,
              border: "6px solid #34d399",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 120,
              fontWeight: 700,
              color: "#34d399",
            }}
          >
            YH
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 26, color: "#34d399", letterSpacing: 4, display: "flex" }}>PORTFOLIO</div>
          <div style={{ fontSize: 76, fontWeight: 700, marginTop: 12, lineHeight: 1.05, display: "flex" }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 40, marginTop: 14, color: "#22d3ee", display: "flex" }}>{profile.role}</div>
          <div style={{ fontSize: 26, marginTop: 18, color: "#9aa1b2", display: "flex" }}>
            {`${profile.tagline} · ${profile.location}`}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
            {TAGS.map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 22,
                  padding: "8px 18px",
                  borderRadius: 9999,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "#161923",
                  color: "#e7e9ef",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <div style={{ fontSize: 24, marginTop: 34, color: "#9aa1b2", display: "flex" }}>yassine-hajkacem.vercel.app</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
