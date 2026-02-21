"use client";

import Link from "next/link";

/**
 * Two large feature panels: left editorial, right product still.
 * No card UI — framed art feel, corner-aligned microcopy, "Discover" CTA.
 */
export function FeaturedDuo() {
  return (
    <section
      className="featured-duo"
      style={{
        paddingTop: "var(--section-padding-y-desktop)",
        paddingBottom: "var(--section-padding-y-desktop)",
        paddingLeft: "var(--rail-lg)",
        paddingRight: "var(--rail-lg)",
      }}
    >
      <div
        className="mx-auto grid gap-[var(--gallery-gutter)]"
        style={{
          maxWidth: "var(--gallery-max)",
          gridTemplateColumns: "48% 48%",
        }}
      >
        {/* Left: editorial / model */}
        <Link
          href="/collections/rings"
          className="duo-panel group block relative overflow-hidden min-h-[420px] flex flex-col justify-end"
          style={{
            border: "1px solid var(--color-gold-subtle)",
            background: "var(--veil)",
          }}
        >
          <div
            className="absolute inset-0 -z-10 opacity-60 group-hover:opacity-70 transition-opacity duration-700"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 30% 70%, rgba(6, 42, 30, 0.9) 0%, var(--abyss) 100%)",
            }}
          />
          <div className="p-8 text-left">
            <span className="text-micro tracking-[0.1em] uppercase opacity-80 block mb-2">Rings</span>
            <span className="text-display-2 text-lg tracking-[0.15em] uppercase block mb-4">Colombian origin</span>
            <span className="cta-primary inline-block">Discover</span>
          </div>
        </Link>

        {/* Right: product still-life */}
        <Link
          href="/collections/earrings"
          className="duo-panel group block relative overflow-hidden min-h-[420px] flex flex-col justify-end"
          style={{
            border: "1px solid var(--color-gold-subtle)",
            background: "var(--veil)",
          }}
        >
          <div
            className="absolute inset-0 -z-10 opacity-50 group-hover:opacity-60 transition-opacity duration-700"
            style={{
              background: "radial-gradient(ellipse 70% 70% at 70% 50%, rgba(4, 30, 21, 0.95) 0%, var(--abyss) 100%)",
            }}
          />
          <div className="p-8 text-left">
            <span className="text-micro tracking-[0.1em] uppercase opacity-80 block mb-2">Earrings</span>
            <span className="text-display-2 text-lg tracking-[0.15em] uppercase block mb-4">Stone & setting</span>
            <span className="cta-primary inline-block">Discover</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
