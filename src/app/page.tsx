import {
  activities,
  education,
  experience,
  languages,
  profile,
  skills,
} from "@/data/portfolio";
import { Hero } from "@/components/Hero";
import { IdBadge } from "@/components/IdBadge";
import { ProjectPanels } from "@/components/ProjectPanels";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Section, Tag } from "@/components/Section";
import { SkillsMarquee } from "@/components/SkillsMarquee";
import { skillLogoRows } from "@/data/skill-logos";
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
            <Reveal delay={100} className="-mt-6 self-start justify-self-center">
              <IdBadge />
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
          <Reveal>
            <ProjectPanels />
          </Reveal>
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
          <Reveal className="mb-12">
            <SkillsMarquee rows={skillLogoRows} />
          </Reveal>
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
