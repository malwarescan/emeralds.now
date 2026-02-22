"use client";

import Link from "next/link";

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
              <Link href={item.href} className="expertise-card block tap-scale" style={{ minHeight: "clamp(132px, 20vw, 154px)" }}>
                <span className="expertise-card-atmosphere" aria-hidden />
                <span className="expertise-card-inner">
                  <span className="font-serif text-lg font-normal text-[var(--cream)] sm:text-xl">{item.title}</span>
                  <span className="mt-2 block text-[0.75rem] leading-snug text-[var(--cream)]/74">
                    {item.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
