import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-8 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to opportunities
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="mt-4 font-mono text-lg text-muted sm:text-xl">
            {profile.role} <span className="text-accent">·</span> {profile.tagline}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.intro}</p>
          <p className="mt-4 flex items-center gap-1.5 text-sm text-muted">
            <PinIcon /> {profile.location}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-bg transition hover:brightness-110"
            >
              View my work
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent/50"
            >
              <DownloadIcon /> Download CV
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-md p-2 text-muted transition hover:text-accent">
                <GitHubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md p-2 text-muted transition hover:text-accent">
                <LinkedInIcon />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="rounded-md p-2 text-muted transition hover:text-accent">
                <MailIcon />
              </a>
            </div>
          </div>
        </div>

        <Terminal />
      </div>
    </section>
  );
}

function Terminal() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-line bg-surface/90 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">yassine@sfax: ~</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
        <code>
          <Line cmd="whoami" />
          <Out>Full-stack & AI developer</Out>
          <Line cmd="cat stack.json" />
          <Out>
            {"{"}
            {"\n"}  <K>&quot;front&quot;</K>: [<S>&quot;React&quot;</S>, <S>&quot;Angular&quot;</S>, <S>&quot;TS&quot;</S>],
            {"\n"}  <K>&quot;back&quot;</K>:  [<S>&quot;FastAPI&quot;</S>, <S>&quot;Django&quot;</S>, <S>&quot;Symfony&quot;</S>],
            {"\n"}  <K>&quot;ai&quot;</K>:    [<S>&quot;LangChain&quot;</S>, <S>&quot;RAG&quot;</S>, <S>&quot;Qdrant&quot;</S>]
            {"\n"}
            {"}"}
          </Out>
          <Line cmd="ls projects/" />
          <Out>
            <span className="text-accent-2">sav-ia/</span>  <span className="text-accent-2">expensesnap/</span>  <span className="text-accent-2">blood-donation/</span>
          </Out>
          <span className="text-accent">❯</span> <span className="cursor" />
        </code>
      </pre>
    </div>
  );
}

function Line({ cmd }: { cmd: string }) {
  return (
    <>
      <span className="text-accent">❯</span> <span className="text-text">{cmd}</span>
      {"\n"}
    </>
  );
}

function Out({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="text-muted">{children}</span>
      {"\n"}
    </>
  );
}

function K({ children }: { children: ReactNode }) {
  return <span className="text-accent-2">{children}</span>;
}

function S({ children }: { children: ReactNode }) {
  return <span className="text-[#fbbf24]">{children}</span>;
}
