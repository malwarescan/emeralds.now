"use client";

import Link from "next/link";
import { useCinemaScroll } from "@/lib/motion/useCinemaScroll";

const IMAGE_DESKTOP = "/images/editorial/butterfly-mark-3200.webp";
const IMAGE_MOBILE = "/images/editorial/butterfly-mark-1440.webp";

export default function ButterflyMarkSection() {
  const cinemaRef = useCinemaScroll<HTMLDivElement>({ plateMax: 8, fgMax: 5, fade: false });

  return (
    <section className="butterfly-mark-wrap bg-[var(--abyssal)]" aria-label="The Guardian Mark editorial section">
      <div ref={cinemaRef} className="butterfly-mark-shell cinema relative">
        <div className="butterfly-mark-background-layer cinema-plate pointer-events-none absolute inset-0" aria-hidden>
          <div className="butterfly-mark-media absolute inset-0">
            <picture>
              <source media="(min-width: 768px)" srcSet={IMAGE_DESKTOP} />
              <img
                src={IMAGE_MOBILE}
                alt=""
                className="h-full w-full object-cover object-[36%_50%]"
                decoding="async"
              />
            </picture>
            <div className="butterfly-mark-veil absolute inset-0" />
          </div>
          <div className="butterfly-mark-grain absolute inset-0" />
          <div className="butterfly-mark-top-scrim absolute left-0 right-0 top-0" />
          <div className="butterfly-mark-bottom-scrim absolute bottom-0 left-0 right-0" />
        </div>
      </div>
      <div className="rail">
        <div className="mx-auto max-w-[394px] text-center">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]/76">
            THE GUARDIAN MARK
          </p>
          <h2 className="mt-2 font-serif text-[1.5rem] leading-tight text-[#f5f0e8] sm:text-[1.95rem]">
            A sign of protected origin.
          </h2>
          <p className="mt-3 text-[0.8rem] leading-relaxed text-[#f5f0e8]/88 sm:text-[0.88rem]">
            Each piece is traced, certified, and prepared by the Muzem atelier for insured delivery worldwide.
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            href="/atelier"
            className="butterfly-mark-cta tap-scale mt-5 inline-flex items-center border border-[rgba(201,162,39,0.46)] px-5 py-2.5 text-[0.67rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]"
            data-cta-id="butterfly_discover_atelier"
            data-cta-label="Discover the Atelier"
          >
            Discover the Atelier
          </Link>
        </div>
        <div className="butterfly-mark-divider mx-auto mt-6" aria-hidden />
      </div>
    </section>
  );
}
