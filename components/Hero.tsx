import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import BlueprintGrid from "./BlueprintGrid";
import CursorCoordinates from "./CursorCoordinates";
import headshot from "@/public/headshot.jpg";
import type { SiteContent } from "@/lib/content";

export default function Hero({
  hero,
  contact,
}: {
  hero: SiteContent["hero"];
  contact: SiteContent["contact"];
}) {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 md:pb-24 md:pt-48">
      <BlueprintGrid />
      <CursorCoordinates />

      {/* soft glow for depth — kept subtle, not neon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-blue/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-64 h-72 w-72 rounded-full bg-amber/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-10">
          <div>
            <p className="stamp mb-6 animate-rise opacity-0" style={{ animationDelay: "0ms" }}>
              {hero.eyebrow}
            </p>

            <h1
              className="max-w-4xl animate-rise font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-paper opacity-0 sm:text-6xl md:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              {hero.name}
            </h1>

            <p
              className="mt-6 max-w-xl animate-rise font-display text-xl font-medium text-blue opacity-0 md:text-2xl"
              style={{ animationDelay: "180ms" }}
            >
              {hero.tagline}
            </p>

            <p
              className="mt-6 max-w-2xl animate-rise text-balance text-base leading-relaxed text-muted opacity-0 md:text-lg"
              style={{ animationDelay: "260ms" }}
            >
              {hero.bio}
            </p>

            <div
              className="mt-8 flex animate-rise flex-wrap items-center gap-3 opacity-0 sm:mt-10 sm:gap-4"
              style={{ animationDelay: "340ms" }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 border border-amber bg-amber/10 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-amber transition-colors hover:bg-amber/20 sm:px-5 sm:py-3"
              >
                View Projects
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-blue hover:text-blue sm:px-5 sm:py-3"
              >
                <Mail className="h-3.5 w-3.5" />
                Get in touch
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors hover:border-blue hover:text-blue sm:h-11 sm:w-11"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center border border-line text-muted transition-colors hover:border-blue hover:text-blue sm:h-11 sm:w-11"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Photo — framed like a referenced figure in a technical drawing set */}
          <div
            className="relative mx-auto w-full max-w-sm animate-rise opacity-0 lg:mx-0"
            style={{ animationDelay: "220ms" }}
          >
            <div className="group relative border border-line-dim bg-panel/40 p-3 transition-colors hover:border-line">
              <span className="pointer-events-none absolute -left-px -top-px h-4 w-4 border-l border-t border-amber" />
              <span className="pointer-events-none absolute -right-px -top-px h-4 w-4 border-r border-t border-amber" />
              <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b border-l border-amber" />
              <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b border-r border-amber" />

              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={headshot}
                  alt={`Portrait of ${hero.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 320px"
                  className="object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale group-hover:contrast-125"
                />
                {/* on hover the photo tints toward the blueprint palette, like a scanned schematic */}
                <div className="pointer-events-none absolute inset-0 bg-blue opacity-0 mix-blend-color transition-opacity duration-500 group-hover:opacity-70" />
              </div>

              <div className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-2">
                <span>Fig. 01</span>
                <span>Subject: {hero.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title block — drafting-table record of who made this and where */}
        <div
          className="mt-14 grid animate-rise grid-cols-2 gap-x-6 gap-y-5 border border-line-dim bg-panel/40 p-5 font-mono text-xs opacity-0 sm:grid-cols-4 sm:p-6 md:mt-20 md:p-8"
          style={{ animationDelay: "420ms" }}
        >
          <Field label="Drawn by" value={hero.name} />
          <Field label="Base" value={hero.base} />
          <Field label="Discipline" value="Frontend" />
          <Field label="Since" value={hero.since} />
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1.5 uppercase tracking-[0.15em] text-muted-2">{label}</p>
      <p className="text-paper">{value}</p>
    </div>
  );
}
