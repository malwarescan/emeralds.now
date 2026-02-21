"use client";

import Link from "next/link";

/**
 * Three-tile discovery hub: left texture, center CTA "Discover Now", right texture.
 * Hover: zoom 1.02, border brighten, subtle glow.
 */
export function DiscoveryTiles() {
  return (
    <section
      className="discovery-tiles"
      style={{
        paddingTop: "var(--section-padding-y-desktop)",
        paddingBottom: "var(--section-padding-y-desktop)",
        paddingLeft: "var(--rail-lg)",
        paddingRight: "var(--rail-lg)",
      }}
    >
      <div
        className="mx-auto grid gap-6 md:gap-8"
        style={{
          maxWidth: "var(--gallery-max)",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        <Link
          href="/education/authenticity"
          className="discovery-tile min-h-[240px] flex items-end p-8"
          style={{
            border: "1px solid var(--color-gold-subtle)",
            background: "var(--veil)",
          }}
        >
          <span className="text-micro tracking-[0.12em] uppercase opacity-70">Origin & certification</span>
        </Link>

        <Link
          href="/collections"
          className="discovery-tile discovery-tile-cta min-h-[240px] flex flex-col items-center justify-center gap-4 p-8"
          style={{
            border: "1px solid var(--color-gold-muted)",
            background: "var(--veil)",
          }}
        >
          <span className="w-10 h-10 rounded-full border border-[var(--color-gold-subtle)] flex items-center justify-center" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </span>
          <span className="text-caption tracking-[0.2em] uppercase">Discover Now</span>
        </Link>

        <Link
          href="/education/authenticity"
          className="discovery-tile min-h-[240px] flex items-end justify-end p-8"
          style={{
            border: "1px solid var(--color-gold-subtle)",
            background: "var(--veil)",
          }}
        >
          <span className="text-micro tracking-[0.12em] uppercase opacity-70">Care & authenticity</span>
        </Link>
      </div>
    </section>
  );
}
