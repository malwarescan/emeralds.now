"use client";

import { useState } from "react";

const ITEMS = [
  {
    title: "Insured delivery",
    bullets: [
      "All shipments are fully insured.",
      "Signature required for high-value pieces.",
      "Tracking provided for every order.",
    ],
  },
  {
    title: "Returns & authenticity",
    bullets: [
      "30-day return window for unworn pieces.",
      "Certificate of authenticity with every stone.",
      "Full refund or exchange.",
    ],
  },
  {
    title: "Concierge appointments",
    bullets: [
      "One-on-one with an artisan.",
      "Bespoke and custom commissions.",
      "Video or in-person by arrangement.",
    ],
  },
  {
    title: "Care & maintenance",
    bullets: [
      "Complimentary care guide with purchase.",
      "Lifetime advice on cleaning and storage.",
      "Professional cleaning recommendations.",
    ],
  },
] as const;

export default function ServicesBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--abyssal)] py-10 sm:py-14">
      <div className="rail">
        <h2 className="mb-6 font-serif text-lg font-normal tracking-wide text-[#f5f0e8] sm:text-xl">
          Services
        </h2>
        <ul className="space-y-0">
          {ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={item.title} className="services-item border-b border-[rgba(201,162,39,0.22)] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="services-accordion-button flex w-full items-center justify-between py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]">
                    {item.title}
                  </span>
                  <span
                    className="services-accordion-chev text-[0.7rem] font-medium text-[#f5f0e8]/70 transition-transform"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    ▼
                  </span>
                </button>
                <div className={`services-accordion-panel ${isOpen ? "open" : ""}`}>
                  <ul className="space-y-1 pl-0 text-[0.75rem] leading-relaxed text-[#f5f0e8]/75">
                      {item.bullets.map((b) => (
                      <li key={b} className="list-none">
                        {b}
                      </li>
                      ))}
                    </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
