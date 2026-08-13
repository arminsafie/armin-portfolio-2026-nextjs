"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-dim bg-ink/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex h-9 w-9 items-center justify-center border border-line font-display text-sm font-medium text-paper"
        >
          AS
        </a>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.15em] text-muted md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-amber" />
            </span>
            Yerevan, AM
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center border border-line-dim text-paper transition-colors hover:border-blue md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="border-t border-line-dim bg-ink/95 px-6 py-2 md:hidden">
          <ul>
            {links.map((link) => (
              <li key={link.href} className="border-b border-line-dim last:border-b-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 font-mono text-sm uppercase tracking-[0.15em] text-muted transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 py-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-blink rounded-full bg-amber" />
            </span>
            Yerevan, AM
          </div>
        </nav>
      )}
    </header>
  );
}
