"use client";

const STATEMENT =
  "Four generations of Colombian artisans. Each stone is certified; each piece is singular. We bring the mines of Muzo and Chivor to the world through heirloom jewelry.";

export default function MaisonGateway() {
  return (
    <section className="relative bg-[var(--abyssal)] pt-12 pb-14 sm:pt-14 sm:pb-16">
      {/* Top scrim: section fades in from hero atmosphere (no snap) */}
      <div className="section-top-scrim pointer-events-none absolute inset-x-0 top-0 z-0" aria-hidden />
      <div className="rail relative z-10">
        <p className="mx-auto max-w-[34ch] text-center text-[0.9rem] leading-[1.6] text-[#f5f0e8]/95 sm:max-w-[56ch] sm:text-base sm:leading-[1.62]">
          {STATEMENT}
        </p>
        <div className="mx-auto mt-8 h-px w-[66%] bg-[rgba(201,162,39,0.26)] sm:w-[50%]" />
      </div>
    </section>
  );
}
