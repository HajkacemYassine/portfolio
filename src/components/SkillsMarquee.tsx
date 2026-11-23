"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { SkillLogo } from "@/data/skill-logos";

const BASE_SPEED = 40; // px per second when the page is still
const SCROLL_BOOST = 0.35; // how much page scroll speed adds to the marquee

// Rows of tech logos that loop forever, in alternating directions.
// Scrolling the page speeds them up (and scrolling up reverses the push).
export function SkillsMarquee({ rows }: { rows: SkillLogo[][] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const offsets = rows.map(() => 0);
    let boost = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let visible = false;
    let frame = 0;

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(root);

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smoothed page-scroll velocity, in px per second.
      const scrollY = window.scrollY;
      const scrollVelocity = dt > 0 ? (scrollY - lastScrollY) / dt : 0;
      lastScrollY = scrollY;
      boost += (scrollVelocity * SCROLL_BOOST - boost) * 0.1;

      trackRefs.current.forEach((track, i) => {
        if (!track) return;
        const half = track.scrollWidth / 2; // content is rendered twice
        const dir = i % 2 === 0 ? -1 : 1;
        offsets[i] += dir * (BASE_SPEED + boost) * dt;
        offsets[i] = ((offsets[i] % half) - half) % half; // keep in (-half, 0]
        track.style.transform = `translate3d(${offsets[i]}px, 0, 0)`;
      });

      frame = visible ? requestAnimationFrame(tick) : 0;
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [rows]);

  return (
    <div ref={rootRef} className="skills-marquee space-y-4" aria-label="Technologies I work with">
      {rows.map((row, i) => (
        <div key={i} className="overflow-hidden py-3">
          <div
            ref={(el) => {
              trackRefs.current[i] = el;
            }}
            className="skills-track flex w-max will-change-transform"
          >
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 gap-4 pr-4" aria-hidden={copy === 1 || undefined}>
                {row.map((logo, j) => (
                  <li
                    key={logo.name}
                    className="skill-logo"
                    style={{ "--brand": logo.color, "--float-delay": `${(j % 5) * -0.7}s` } as CSSProperties}
                  >
                    <span className="skill-logo-tile">
                      <svg viewBox="0 0 24 24" role="img" aria-label={logo.name} className="h-9 w-9">
                        <path d={logo.path} fill="currentColor" />
                      </svg>
                    </span>
                    <span className="skill-logo-name">{logo.name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
