const stack = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Laravel",
  "PHP",
  "WordPress",
  "Jest",
  "Git",
];

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-line-dim bg-panel/30 py-4">
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        <TickerRow />
        <TickerRow hidden />
      </div>
      {/* edge fades so the loop point is invisible */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

function TickerRow({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 pr-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-2"
      aria-hidden={hidden || undefined}
    >
      {stack.map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          {item}
          <span className="text-line">+</span>
        </span>
      ))}
    </div>
  );
}
