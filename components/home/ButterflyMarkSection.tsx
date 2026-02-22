"use client";

import Link from "next/link";

const IMAGE_DESKTOP = "/images/editorial/butterfly-mark-3200.webp";
const IMAGE_MOBILE = "/images/editorial/butterfly-mark-1440.webp";

export default function ButterflyMarkSection() {
  return (
    <section className="butterfly-mark-wrap bg-[var(--abyssal)]" aria-label="The Guardian Mark editorial section">
      <div className="butterfly-mark-shell relative overflow-hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet={IMAGE_DESKTOP} />
          <img
            src={IMAGE_MOBILE}
            alt="Butterfly hovering above an emerald jewel, signature maison guardian motif."
            className="absolute inset-0 h-full w-full object-cover object-[36%_50%]"
            decoding="async"
          />
        </picture>
        <div className="butterfly-mark-veil pointer-events-none absolute inset-0" aria-hidden />
        <div className="absolute inset-0 flex items-end">
          <div className="rail w-full pb-8 sm:pb-10">
            <div className="max-w-[31ch] text-left">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]/76">
                THE GUARDIAN MARK
              </p>
              <h2 className="mt-2 font-serif text-[1.5rem] leading-tight text-[#f5f0e8] sm:text-[1.95rem]">
                A sign of protected origin.
              </h2>
              <p className="mt-3 text-[0.8rem] leading-relaxed text-[#f5f0e8]/88 sm:text-[0.88rem]">
                Each piece is traced, certified, and prepared by the Muzem atelier for insured delivery
                worldwide.
              </p>
              <Link
                href="/atelier"
                className="butterfly-mark-cta tap-scale mt-5 inline-flex items-center border border-[rgba(201,162,39,0.46)] px-5 py-2.5 text-[0.67rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]"
              >
                Discover the Atelier
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="rail">
        <div className="butterfly-mark-divider mx-auto mt-6" aria-hidden />
      </div>
    </section>
  );
}
