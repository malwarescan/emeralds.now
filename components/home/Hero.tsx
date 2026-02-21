import Image from "next/image";

/**
 * Luxury hero: art-directed frame, ceremonial stack, controlled veil, no long copy on image.
 * H1 + subhead + CTA row + hairline + microcopy. Statement paragraph moved to band below.
 */
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#041E15]" aria-label="Hero">
      <div className="relative min-h-[72vh] md:min-h-[68vh]">
        <Image
          src="/images/emeraldsnow-hero-image.png"
          alt="Emeralds.now — authorized Muzem emerald jewelry"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Luxury veil for text legibility (no harsh black mask) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,30,21,0.08)_0%,rgba(4,30,21,0.55)_55%,rgba(4,30,21,0.88)_100%)]" aria-hidden />

        {/* Edge vignette for "museum spotlight" */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,30,21,0.35),rgba(4,30,21,0.55),rgba(4,30,21,0.92))] opacity-60" aria-hidden />

        {/* Content rail — centered ceremonial stack */}
        <div className="relative z-10 mx-auto flex min-h-[72vh] md:min-h-[68vh] max-w-[1240px] flex-col items-center justify-end px-6 pb-16 md:pb-20 text-center">
          <h1 className="text-[#F7F3EA] text-[42px] md:text-[76px] tracking-[0.12em] leading-[0.95] font-serif">
            EMERALDS.NOW
          </h1>

          <p className="mt-3 text-[#F7F3EA]/85 text-[12px] md:text-[13px] tracking-[0.22em] uppercase">
            Where every flaw is feature.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="/collections"
              className="inline-flex items-center justify-center rounded-[10px] border border-[#C5A059]/70 px-6 py-3 text-[12px] tracking-[0.20em] uppercase text-[#F7F3EA] transition hover:border-[#C5A059] hover:scale-[1.01]"
            >
              Discover collection
            </a>
            <a
              href="/concierge"
              className="inline-flex items-center justify-center rounded-[10px] border border-[#F7F3EA]/25 px-6 py-3 text-[12px] tracking-[0.20em] uppercase text-[#F7F3EA]/90 transition hover:border-[#F7F3EA]/40 hover:text-[#F7F3EA]"
            >
              Speak to an artisan
            </a>
          </div>

          <div className="mt-8 h-px w-[180px] bg-[#C5A059]/35" aria-hidden />

          <p className="mt-6 max-w-[720px] text-[#F7F3EA]/70 text-[12px] md:text-[13px] tracking-[0.10em]">
            Origin-certified stones. Signed settings. Insured delivery.
          </p>
        </div>
      </div>

      {/* Post-hero statement band (long copy off the image) */}
      <div className="bg-[#041E15]">
        <div className="mx-auto max-w-[1240px] px-6 py-14 md:py-18">
          <p className="max-w-[760px] text-[#F7F3EA]/78 text-[16px] md:text-[18px] leading-[1.55]">
            What we offer is rare. Not scarcity for its own sake — stones and craftsmanship that deserve to be seen, chosen, and worn with intention.
          </p>
        </div>
      </div>
    </section>
  );
}
