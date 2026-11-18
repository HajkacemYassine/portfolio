"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { badgeFacts, profile, stats } from "@/data/portfolio";

// Deterministic "barcode" stripes derived from the name, so it never changes between renders.
const BARCODE = Array.from((profile.name.replace(/\s/g, "") + "ISETSFAX2027").repeat(2), (c, i) => ({
  w: (c.charCodeAt(0) % 3) + 1,
  gap: ((c.charCodeAt(0) + i) % 2) + 1,
}));

// Counts from 0 up to `value` each time `run` turns true. Shows the final value otherwise,
// so the server render, screen readers and reduced-motion users always get the real number.
function CountUp({ value, run, delay = 0 }: { value: string; run: boolean; delay?: number }) {
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!run || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const duration = 900;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3)))); // ease-out cubic
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    // Zero out on the next frame (before the back face is visible), then
    // start counting once the flip has turned far enough to show it.
    frame = requestAnimationFrame(() => setN(0));
    const timer = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      setN(target);
    };
  }, [run, target, delay]);

  if (Number.isNaN(target)) return <>{value}</>;
  return (
    <>
      <span aria-hidden="true" className="tabular-nums">
        {n}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

// Developer ID card that flips on hover (mouse) or tap/Enter (touch, keyboard).
export function IdBadge() {
  const [flipped, setFlipped] = useState(false);
  const lastPointer = useRef<string>("");

  return (
    <div className="flex flex-col items-center">
      {/* Lanyard */}
      <div className="badge-lanyard" aria-hidden="true">
        <span className="badge-strap" />
        <span className="badge-clip" />
      </div>

      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`Developer ID card for ${profile.name}. ${flipped ? "Showing back" : "Showing front"}, press to flip.`}
        className="badge-scene rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
        onClick={() => {
          // Mouse users flip by hovering; a click would just undo it.
          if (lastPointer.current !== "mouse") setFlipped((f) => !f);
          lastPointer.current = "";
        }}
      >
        <div className="badge-card" data-flipped={flipped}>
          {/* Front */}
          <div className="badge-face flex flex-col">
            <div className="badge-punch" aria-hidden="true" />
            <div className="flex items-center justify-between bg-linear-to-r from-accent to-accent-2 px-5 py-3 text-bg">
              <span className="font-mono text-[11px] font-bold tracking-[0.2em]">DEVELOPER ID</span>
              <span className="font-mono text-[11px] font-semibold">2026</span>
            </div>

            <div className="flex flex-1 flex-col items-center px-6 pt-7">
              <div className="badge-monogram">
                {profile.photo ? (
                  <span className="block h-[124px] w-[124px] overflow-hidden rounded-full">
                    {/* Zoomed toward the face so it reads at badge size */}
                    <Image
                      src={profile.photo}
                      alt={`Photo of ${profile.name}`}
                      width={248}
                      height={248}
                      className="h-full w-full origin-[50%_32%] scale-[1.3] object-cover"
                    />
                  </span>
                ) : (
                  <span className="text-gradient text-5xl font-bold tracking-tight">YH</span>
                )}
              </div>
              <p className="mt-5 text-xl font-semibold tracking-tight text-text">{profile.name}</p>
              <p className="mt-1 text-sm text-accent">{profile.role}</p>

              <dl className="mt-6 grid w-full grid-cols-3 gap-2 border-t border-line pt-4 text-left">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">ID No.</dt>
                  <dd className="mt-0.5 font-mono text-xs text-text">YH-0191</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Based</dt>
                  <dd className="mt-0.5 text-xs text-text">Sfax, TN</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Valid till</dt>
                  <dd className="mt-0.5 font-mono text-xs text-text">2027</dd>
                </div>
              </dl>
            </div>

            <div className="flex h-9 items-end overflow-hidden px-6 pb-4" aria-hidden="true">
              {BARCODE.map((b, i) => (
                <span key={i} className="h-full bg-text/70" style={{ width: b.w, marginRight: b.gap }} />
              ))}
            </div>
          </div>

          {/* Back */}
          <div className="badge-face badge-back flex flex-col">
            <div className="badge-punch" aria-hidden="true" />
            <div className="border-b border-line px-5 pt-5 pb-3">
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-muted">WHAT I AM</span>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-3 px-5 text-left">
              {badgeFacts.map((f, i) => (
                <li
                  key={f.title}
                  className="badge-fact flex items-start gap-3"
                  style={{ transitionDelay: flipped ? `${300 + i * 80}ms` : "0ms" }}
                >
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-linear-to-br from-accent to-accent-2 text-[11px] font-bold text-bg"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    <span className="block text-sm font-semibold leading-tight text-text">{f.title}</span>
                    <span className="mt-0.5 block text-[11px] leading-tight text-muted">{f.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mx-5 mb-3 grid grid-cols-3 divide-x divide-line rounded-lg border border-line bg-bg/60 py-2">
              {stats.map((s, i) => (
                <li key={s.label} className="text-center">
                  <div className="text-gradient text-lg font-semibold leading-none">
                    <CountUp value={s.value} run={flipped} delay={250 + i * 120} />
                  </div>
                  <div className="mt-1 text-[9px] leading-tight text-muted">{s.label}</div>
                </li>
              ))}
            </ul>

            <p className="border-t border-line px-5 py-3 text-[11px] text-muted">
              If found, say hello · <span className="text-accent">{profile.email}</span>
            </p>
          </div>
        </div>
      </button>

      <p className="mt-4 font-mono text-xs text-muted">
        <span className="hidden [@media(hover:hover)]:inline">Hover</span>
        <span className="[@media(hover:hover)]:hidden">Tap</span> the card to flip it
      </p>
    </div>
  );
}
