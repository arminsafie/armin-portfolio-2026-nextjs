"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorCoordinates() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const target = ref.current?.parentElement;
    if (!target) return;

    const handleMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      setPos({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
    };
    const handleLeave = () => setPos(null);

    target.addEventListener("mousemove", handleMove);
    target.addEventListener("mouseleave", handleLeave);
    return () => {
      target.removeEventListener("mousemove", handleMove);
      target.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {pos && (
        <>
          <div className="absolute w-full border-t border-dashed border-line/25" style={{ top: pos.y }} />
          <div className="absolute h-full border-l border-dashed border-line/25" style={{ left: pos.x }} />
          <div
            className="absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap border border-line/60 bg-ink/90 px-2 py-1 font-mono text-[10px] text-blue"
            style={{ left: pos.x, top: pos.y }}
          >
            X:{String(Math.max(pos.x, 0)).padStart(4, "0")} Y:{String(Math.max(pos.y, 0)).padStart(4, "0")}
          </div>
        </>
      )}
    </div>
  );
}
