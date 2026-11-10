import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <h2 className="mb-10 flex items-center gap-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="font-mono text-base font-normal text-accent">{index}.</span>
          {title}
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
