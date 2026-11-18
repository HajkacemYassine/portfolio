"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { ProjectPreview } from "./ProjectPreview";
import { Tag } from "./Section";
import { ArrowUpRightIcon, GitHubIcon } from "./Icons";

const MAX_TAGS = 6;

function Details({ p, index }: { p: Project; index: number }) {
  const extra = p.tech.length - MAX_TAGS;
  return (
    <div className="flex h-full flex-col">
      <p className="font-mono text-xs text-accent">
        {String(index + 1).padStart(2, "0")} <span className="text-muted">· {p.subtitle} · {p.year}</span>
      </p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>

      <ul className="mt-4 space-y-1.5 text-sm text-muted">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="text-accent" aria-hidden="true">▹</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap gap-2">
          {p.tech.slice(0, MAX_TAGS).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          {extra > 0 && <Tag>+{extra}</Tag>}
        </div>
        {(p.repo || p.demo) && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-text transition hover:text-accent"
              >
                <GitHubIcon className="h-4 w-4" /> View on GitHub <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            )}
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-text transition hover:text-accent"
              >
                Live demo <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Desktop: a row of panels where the hovered/focused one expands to show details and a mock UI.
// Smaller screens: plain stacked cards with the same content.
export function ProjectPanels() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="hidden h-[540px] gap-3 xl:flex">
        {projects.map((p, i) => {
          const open = i === active;
          return (
            <article
              key={p.title}
              onMouseEnter={() => setActive(i)}
              onFocusCapture={() => setActive(i)}
              className={`relative min-w-0 basis-[68px] overflow-hidden rounded-2xl border bg-surface transition-[flex-grow,border-color,background-color] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] focus-within:border-accent/60 ${
                open
                  ? "grow border-accent/35 bg-linear-to-br from-accent/[0.06] to-transparent"
                  : "grow-0 border-line hover:border-accent/30"
              }`}
            >
              {/* Collapsed rail */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`project-panel-${i}`}
                aria-label={`${p.title}: ${p.subtitle}`}
                tabIndex={open ? -1 : 0}
                onClick={() => setActive(i)}
                className={`absolute inset-0 flex flex-col items-center justify-between py-6 transition-opacity duration-300 ${
                  open ? "pointer-events-none opacity-0" : "cursor-pointer opacity-100"
                }`}
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="rotate-180 text-lg font-semibold tracking-tight whitespace-nowrap text-text [writing-mode:vertical-rl]">
                  {p.title}
                </span>
                <span className="grid h-7 w-7 place-items-center rounded-full border border-line text-muted" aria-hidden="true">
                  +
                </span>
              </button>

              {/* Expanded content (fixed min width so it doesn't reflow while the panel grows) */}
              <div
                id={`project-panel-${i}`}
                inert={!open}
                className={`absolute inset-y-0 left-0 grid w-full min-w-[620px] grid-cols-[1fr_270px] gap-7 p-7 transition-opacity ${
                  open ? "opacity-100 delay-200 duration-500" : "pointer-events-none opacity-0 duration-150"
                }`}
              >
                <Details p={p} index={i} />
                {p.preview && <ProjectPreview kind={p.preview} />}
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 xl:hidden">
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="grid gap-6 rounded-2xl border border-line bg-surface p-6 md:grid-cols-[1fr_260px]"
          >
            <Details p={p} index={i} />
            {p.preview && <ProjectPreview kind={p.preview} />}
          </article>
        ))}
      </div>
    </>
  );
}
