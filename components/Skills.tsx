import {
  CheckCircle2,
  Code2,
  Globe2,
  Layers,
  Server,
  TestTube2,
  Wrench,
  Palette,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CornerBrackets from "./CornerBrackets";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { SiteContent } from "@/lib/content";

const groupIcons: Record<string, LucideIcon> = {
  Core: Code2,
  Frameworks: Layers,
  Styling: Palette,
  "Backend & APIs": Server,
  Testing: TestTube2,
  CMS: Globe2,
  Tools: Wrench,
};

export default function Skills({ skills }: { skills: SiteContent["skills"] }) {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 md:px-10 md:py-24">
      <SectionHeading sheet="A-04" index="04" title="Skills" note="Legend: stack & strengths" />

      <Reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, i) => {
          const Icon = groupIcons[group.label] || Tag;
          return (
            <div
              key={i}
              className="group relative border border-line-dim bg-panel/30 p-5 transition-colors hover:border-line sm:p-6"
            >
              <CornerBrackets />

              <div className="mb-4 flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line-dim text-blue transition-colors group-hover:border-blue">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
                  {group.label}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((item, j) => (
                  <span
                    key={j}
                    className="border border-line-dim bg-ink/60 px-2.5 py-1 text-sm text-paper/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </Reveal>

      <Reveal className="mt-8 border border-line-dim bg-panel/20 p-5 sm:p-6 md:p-8">
        <p className="stamp mb-5">Strengths</p>
        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.strengths.map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-paper/90">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-amber" />
              {s}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
