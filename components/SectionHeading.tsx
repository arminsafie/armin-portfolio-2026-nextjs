export default function SectionHeading({
  sheet,
  index,
  title,
  note,
}: {
  sheet: string;
  index: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="relative mb-10 border-b border-line-dim pb-4 sm:mb-14 sm:pb-5">
      {/* ghost numeral — a quiet nod to the sheet number, not decoration for its own sake */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 right-0 select-none font-display text-[3.5rem] font-medium leading-none text-transparent opacity-[0.15] sm:-top-6 sm:text-[6rem] md:-top-8 md:text-[8rem]"
        style={{ WebkitTextStroke: "1px #79ABDE" }}
      >
        {index}
      </span>

      <div className="relative flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            Sheet {sheet}
          </p>
          <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl md:text-4xl">
            {title}
          </h2>
        </div>
        {note && (
          <p className="hidden max-w-[14rem] text-right font-mono text-[11px] uppercase tracking-[0.1em] text-muted-2 md:block">
            {note}
          </p>
        )}
      </div>
    </div>
  );
}
