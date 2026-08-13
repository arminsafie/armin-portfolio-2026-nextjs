import { ArrowUpRight } from "lucide-react";
import CornerBrackets from "./CornerBrackets";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { Project } from "@/lib/content";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20 md:px-10 md:py-24">
      <SectionHeading sheet="A-03" index="03" title="Projects" note={`Count: 0${projects.length}`} />

      <Reveal className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </Reveal>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const href = project.url ? `https://${project.url.replace(/^https?:\/\//, "")}` : undefined;

  return (
    <div className="group relative border border-line-dim bg-panel/30 p-5 transition-colors hover:border-line sm:p-6 md:p-7">
      {/* corner brackets appear on hover, like a selection marquee in a design tool */}
      <CornerBrackets />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-medium text-paper">{project.name}</h3>
          <p className="mt-0.5 text-sm text-muted">{project.kind}</p>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${project.name}`}
            className="mt-1 shrink-0 text-muted-2 transition-colors hover:text-blue"
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>

      {project.result && (
        <p className="mt-4 border-l border-amber/50 pl-3 text-sm leading-relaxed text-paper/80">
          {project.result}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tag, i) => (
          <span
            key={i}
            className="border border-line-dim px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-2"
          >
            {tag}
          </span>
        ))}
        {project.url && (
          <span className="px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-2">
            {project.url}
          </span>
        )}
      </div>
    </div>
  );
}
