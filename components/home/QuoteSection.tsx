import { GoldHairline } from "@/components/ui/GoldHairline";

/**
 * Centered quote as pacing device. Max 720px, subtle hairline, immaculate copy.
 */
export function QuoteSection() {
  return (
    <section
      className="py-16 md:py-24"
      style={{
        paddingLeft: "var(--rail-lg)",
        paddingRight: "var(--rail-lg)",
      }}
    >
      <GoldHairline className="max-w-[720px] mx-auto mb-12" />
      <blockquote
        className="text-center max-w-[720px] mx-auto"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)",
          lineHeight: 1.5,
          letterSpacing: "0.08em",
          color: "var(--paper)",
          opacity: 0.95,
        }}
      >
        What we offer is rare. Not scarcity for its own sake — stones and craftsmanship that deserve to be seen, chosen, and worn with intention.
      </blockquote>
      <GoldHairline className="max-w-[720px] mx-auto mt-12" />
    </section>
  );
}
