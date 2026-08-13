export default function CornerBrackets() {
  return (
    <>
      <span className="pointer-events-none absolute -left-px -top-px h-4 w-4 border-l border-t border-transparent transition-colors group-hover:border-amber" />
      <span className="pointer-events-none absolute -right-px -top-px h-4 w-4 border-r border-t border-transparent transition-colors group-hover:border-amber" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b border-l border-transparent transition-colors group-hover:border-amber" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b border-r border-transparent transition-colors group-hover:border-amber" />
    </>
  );
}
