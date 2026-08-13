import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { SiteContent } from "@/lib/content";

export default function Experience({ experience }: { experience: SiteContent["experience"] }) {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 md:px-10 md:py-24">
      <SectionHeading sheet="A-02" index="02" title="Work" note={experience.durationLabel} />

      <Reveal className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <h3 className="font-display text-xl font-medium text-paper">{experience.role}</h3>
          <p className="mt-1 text-sm text-muted">{experience.type}</p>

          {/* Running duration marker — this is an ongoing role, so the line has no end tick */}
          <div className="relative mt-8 h-px w-full max-w-[220px] bg-line-dim">
            <span className="absolute -top-1.5 left-0 h-3.5 w-px bg-line" />
            <span className="absolute -right-1 -top-[3px] h-2 w-2 animate-blink rounded-full bg-amber" />
          </div>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
            {experience.duration}
          </p>
        </div>

        <ul className="space-y-6">
          {experience.highlights.map((text, i) => (
            <li key={i} className="border-l border-line-dim pl-6 leading-relaxed text-muted">
              {text}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
