"use client";

import Link from "next/link";

/**
 * Editorial hero "cover": full-width, fog overlay, centered H1 + tagline + single CTA.
 * Min height 65vh desktop, 72vh mobile. Image-first when asset exists; gradient + bokeh for now.
 */
export function HeroCover() {
  return (
    <section
      className="hero-cover-min relative flex items-center justify-center text-center"
      style={{
        minHeight: "72vh",
        paddingTop: "var(--section-padding-y-mobile)",
        paddingBottom: "var(--section-padding-y-mobile)",
        paddingLeft: "var(--rail-lg)",
        paddingRight: "var(--rail-lg)",
      }}
    >
      {/* Background: emerald macro / refraction feel + soft bokeh */}
      <div
        className="absolute inset-0 -z-20"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 30%, rgba(6, 42, 30, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 70% 60%, rgba(4, 30, 21, 0.6) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(197, 160, 89, 0.04) 0%, transparent 40%),
            var(--abyss)
          `,
        }}
      />
      {/* Veil for legibility (bottom heavier) */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{ background: "var(--fog-gradient)" }}
      />

      <div className="relative z-10 max-w-[720px] mx-auto">
        <h1 className="hero-brand text-display-1 mb-4" style={{ marginBottom: "var(--space-md)" }}>
          Emeralds.now
        </h1>
        <p
          className="text-caption tracking-[0.15em] uppercase mb-8"
          style={{
            color: "var(--paper)",
            opacity: 0.9,
            marginBottom: "var(--space-lg)",
          }}
        >
          Exceptional emeralds. Origin-certified. Atelier-crafted.
        </p>
        <Link href="/collections" className="cta-primary">
          Discover
        </Link>
      </div>
    </section>
  );
}
