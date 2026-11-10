import {
  activities,
  education,
  experience,
  languages,
  profile,
  projects,
  skills,
  stats,
} from "@/data/portfolio";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Section, Tag } from "@/components/Section";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* About */}
        <Section id="about" index="01" title="About me">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={100} className="grid grid-cols-3 gap-3 self-start lg:grid-cols-1">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-line bg-surface p-5">
                  <div className="text-3xl font-semibold text-gradient sm:text-4xl">{s.value}</div>
                  <div className="mt-1 text-sm text-muted">{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" index="02" title="Experience">
          <ol className="relative space-y-10 border-l border-line pl-6 sm:pl-8">
            {experience.map((job, i) => (
              <li key={job.company} className="relative">
                <span
                  className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:-left-[39px]"
                  aria-hidden="true"
                />
                <Reveal delay={i * 60} className="rounded-xl border border-line bg-surface p-6 transition-colors hover:border-accent/30">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold">
                      {job.role} <span className="text-accent">@ {job.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.place}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted sm:text-[15px]">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>

        {/* Projects */}
        <Section id="projects" index="03" title="Projects">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 80} className={p.featured ? "md:col-span-2" : ""}>
                <article
                  className={`group flex h-full flex-col rounded-xl border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 ${
                    p.featured ? "border-accent/25 bg-linear-to-br from-accent/[0.07] to-transparent sm:p-8" : "border-line"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {p.featured && (
                        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Featured project</p>
                      )}
                      <h3 className={`font-semibold ${p.featured ? "text-2xl" : "text-lg"}`}>{p.title}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {p.subtitle} · <span className="font-mono">{p.year}</span>
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code on GitHub`} className="rounded-md p-1.5 text-muted transition hover:text-accent">
                          <GitHubIcon />
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo`} className="rounded-md p-1.5 text-muted transition hover:text-accent">
                          <ArrowUpRightIcon className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className={`mt-4 leading-relaxed text-muted ${p.featured ? "max-w-3xl sm:text-[17px]" : "text-[15px]"}`}>
                    {p.description}
                  </p>

                  <ul className={`mt-4 gap-2 text-sm text-muted ${p.featured ? "grid sm:grid-cols-3" : "space-y-1.5"}`}>
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-accent" aria-hidden="true">▹</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {p.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted transition hover:text-accent"
            >
              More on GitHub <ArrowUpRightIcon />
            </a>
          </Reveal>
        </Section>

        {/* Skills */}
        <Section id="skills" index="04" title="Skills">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={(i % 3) * 60} className="rounded-xl border border-line bg-surface p-6">
                <h3 className="mb-4 font-mono text-sm text-accent">{s.group}</h3>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="rounded-md bg-surface-2 px-2.5 py-1 text-sm text-text">
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <Reveal className="rounded-xl border border-line bg-surface p-6 lg:col-span-1">
              <h3 className="mb-4 font-mono text-sm text-accent">Education</h3>
              <ul className="space-y-5">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="font-medium">{e.degree}</p>
                    <p className="text-sm text-muted">{e.detail}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {e.school} · {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={60} className="rounded-xl border border-line bg-surface p-6">
              <h3 className="mb-4 font-mono text-sm text-accent">Languages</h3>
              <ul className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <li key={l} className="rounded-md bg-surface-2 px-2.5 py-1 text-sm">
                    {l}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="rounded-xl border border-line bg-surface p-6">
              <h3 className="mb-4 font-mono text-sm text-accent">Community</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-muted">
                {activities.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="text-accent" aria-hidden="true">▹</span>
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" index="05" title="Contact">
          <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
            <div
              className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
            />
            <h3 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s build something.</h3>
            <p className="relative mx-auto mt-4 max-w-xl text-muted">
              I&apos;m looking for internships and junior full-stack or AI roles. Have a project, an opening, or just a question? My inbox is open.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="relative mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition hover:brightness-110"
            >
              <MailIcon className="h-4 w-4" /> Say hello
            </a>
            <p className="relative mt-4 break-all font-mono text-sm text-muted">{profile.email}</p>
            <div className="relative mt-6 flex justify-center gap-2">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-md p-2 text-muted transition hover:text-accent">
                <GitHubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md p-2 text-muted transition hover:text-accent">
                <LinkedInIcon />
              </a>
            </div>
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-center font-mono text-xs text-muted">
        Designed &amp; built by {profile.name} · Next.js + Tailwind
      </footer>
    </>
  );
}
