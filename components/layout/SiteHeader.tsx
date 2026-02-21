"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/education", label: "Atelier" },
  { href: "/education", label: "Education" },
  { href: "/concierge", label: "Concierge" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = 0;
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < 80 || y < lastY);
      lastY = y;
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        paddingTop: "var(--space-sm)",
        paddingBottom: "var(--space-sm)",
        paddingLeft: "var(--rail-lg)",
        paddingRight: "var(--rail-lg)",
        backgroundColor: scrolled ? "var(--abyss)" : "transparent",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        borderBottom: scrolled ? "1px solid var(--color-gold-subtle)" : "1px solid transparent",
      }}
    >
      <nav className="flex items-center justify-between max-w-[var(--gallery-max)] mx-auto" aria-label="Main">
        <Link
          href="/"
          className="text-display-2 text-[1rem] font-normal tracking-[0.2em] uppercase"
          style={{ color: "var(--paper)" }}
        >
          Emeralds.now
        </Link>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href + label}
              href={href}
              className="text-micro opacity-90 hover:opacity-100 transition-opacity"
              style={{ color: "var(--paper)" }}
            >
              {label}
            </Link>
          ))}
          <button type="button" className="p-2 opacity-80 hover:opacity-100 transition-opacity" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <Link href="/cart" className="p-2 opacity-80 hover:opacity-100 transition-opacity" aria-label="Bag">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
