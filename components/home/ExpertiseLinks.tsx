"use client";

import Link from "next/link";
import { useCinemaScroll } from "@/lib/motion/useCinemaScroll";

const LINKS = [
  {
    title: "How to verify a Colombian emerald",
    description: "A practical protocol used by our team before every piece leaves the atelier.",
    href: "/education/how-to-verify-colombian-emerald",
  },
  {
    title: "Treatments explained",
    description: "How oiling, clarity treatments, and reinforcement affect value and longevity.",
    href: "/education/emerald-treatments-explained",
  },
  {
    title: "Care and storage guide",
    description: "Preserve color and brilliance with museum-level handling at home.",
    href: "/education/emerald-care-guide",
  },
] as const;

function ExpertiseCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  const cinemaRef = useCinemaScroll<HTMLAnchorElement>({ plateMax: 11, fgMax: 6, fade: false });

  return (
    <Link
      ref={cinemaRef}
      href={href}
      className="expertise-card cinema card-settle block tap-scale"
      style={{ minHeight: "clamp(132px, 20vw, 154px)" }}
      data-cta-id={`expertise_${href.split("/").pop() ?? "link"}`}
      data-cta-label={title}
    >
      <span className="cinema-plate expertise-card-atmosphere" aria-hidden />
      <span className="cinema-fg expertise-card-inner">
        <span className="font-serif text-lg font-normal text-[var(--cream)] sm:text-xl">{title}</span>
        <span className="mt-2 block text-[0.75rem] leading-snug text-[var(--cream)]/74">{description}</span>
      </span>
    </Link>
  );
}

export default function ExpertiseLinks() {
  return (
    <section className="bg-[var(--abyssal)] py-10 sm:py-14">
      <div className="rail">
        <h2 className="mb-6 font-serif text-lg font-normal tracking-wide text-[#f5f0e8] sm:text-xl">
          Proof & expertise
        </h2>
        <ul className="space-y-4">
          {LINKS.map((item) => (
            <li key={item.href}>
              <ExpertiseCard title={item.title} description={item.description} href={item.href} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
