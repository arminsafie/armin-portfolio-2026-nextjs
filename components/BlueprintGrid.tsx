export default function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint bg-grid opacity-70" />
      {/* radial fade so the grid recedes toward the edges instead of tiling flatly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 30%, transparent 0%, #0A1626 78%)",
        }}
      />
      <svg
        className="absolute -top-1 left-1/2 hidden -translate-x-1/2 md:block"
        width="920"
        height="420"
        viewBox="0 0 920 420"
        fill="none"
      >
        <circle
          cx="460"
          cy="180"
          r="140"
          stroke="#79ABDE"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="460"
          cy="180"
          r="200"
          stroke="#79ABDE"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        <line x1="460" y1="10" x2="460" y2="350" stroke="#79ABDE" strokeOpacity="0.18" />
        <line x1="150" y1="180" x2="770" y2="180" stroke="#79ABDE" strokeOpacity="0.18" />
      </svg>
    </div>
  );
}
