import { GraduationCap, Languages as LanguagesIcon } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { EducationItem, LanguageItem } from "@/lib/content";

export default function EducationLanguages({
  education,
  languages,
}: {
  education: EducationItem[];
  languages: LanguageItem[];
}) {
  return (
    <section id="education" className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 md:px-10 md:py-24">
      <SectionHeading sheet="A-05" index="05" title="Education & Languages" />

      <Reveal className="grid gap-6 lg:grid-cols-2">
        {/* Education */}
        <div className="border border-line-dim bg-panel/30 p-5 sm:p-6 md:p-7">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line-dim text-blue">
              <GraduationCap className="h-4 w-4" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
              Education
            </p>
          </div>

          <ul className="divide-y divide-line-dim">
            {education.map((e, i) => (
              <li key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span className="mt-0.5 shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm text-paper">{e.program}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-muted-2">
                    {e.institution}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div className="border border-line-dim bg-panel/30 p-5 sm:p-6 md:p-7">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-line-dim text-blue">
              <LanguagesIcon className="h-4 w-4" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
              Languages
            </p>
          </div>

          <ul className="divide-y divide-line-dim">
            {languages.map((lang, i) => (
              <li key={i} className="py-4 first:pt-0 last:pb-0">
                <div className="mb-2.5 flex items-baseline justify-between">
                  <span className="text-sm text-paper">{lang.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-2">
                    {lang.level}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((tick) => (
                    <span
                      key={tick}
                      className={`h-1.5 flex-1 rounded-full ${
                        tick <= lang.scale ? "bg-blue" : "bg-line-dim"
                      }`}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
