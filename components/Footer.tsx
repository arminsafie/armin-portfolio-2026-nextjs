export default function Footer() {
  return (
    <footer className="border-t border-line-dim">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-2 sm:flex-row md:px-10">
        <p>© {new Date().getFullYear()} Armin Safaie</p>
        <p>Drafted in Yerevan · Built with Next.js</p>
      </div>
    </footer>
  );
}
