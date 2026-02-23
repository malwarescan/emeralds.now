import type { Metadata } from "next";
import Link from "next/link";
import { organizationSchema } from "@/lib/schema/emit";

export const metadata: Metadata = {
  title: "Concierge | Muzem Emeralds",
  description:
    "Speak with a Muzem artisan for sourcing support, certification context, and secure insured delivery guidance.",
  alternates: { canonical: "/concierge" },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does concierge help with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Concierge supports sourcing requests, certification review, fit guidance, and delivery planning before purchase.",
      },
    },
    {
      "@type": "Question",
      name: "How fast does concierge respond?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most inquiries receive an initial response within one business day.",
      },
    },
    {
      "@type": "Question",
      name: "Is delivery insured?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Orders are prepared for insured delivery with secure packaging and documented handoff.",
      },
    },
  ],
};

export default function ConciergePage() {
  return (
    <main className="min-h-full w-full bg-[var(--abyssal)] py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />

      <div className="rail">
        <h1 className="font-serif text-2xl text-[var(--cream)] sm:text-3xl">Concierge</h1>
        <p className="mt-3 max-w-[62ch] text-[0.92rem] leading-relaxed text-[var(--cream)]/86">
          Concierge is your direct channel to a Muzem artisan for sourcing direction, certification context,
          and piece selection support. Share your desired style, budget, and timeline, and we prepare options
          aligned to verified origin and atelier standards. Most requests receive an initial response within one
          business day.
        </p>

        <div className="mt-6">
          <a
            href="mailto:atelier@emeralds.now?subject=Muzem%20Concierge%20Request"
            className="tap-scale inline-flex min-h-11 items-center border border-[rgba(201,162,39,0.45)] px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--cream)]"
            data-cta-id="concierge_request_sourcing"
            data-cta-label="Request sourcing"
          >
            Request sourcing
          </a>
        </div>

        <ul className="mt-7 grid gap-3 sm:grid-cols-3">
          <li className="rounded-md border border-[rgba(201,162,39,0.22)] px-4 py-3 text-[0.74rem] uppercase tracking-[0.12em] text-[var(--cream)]/78">
            Origin traced
          </li>
          <li className="rounded-md border border-[rgba(201,162,39,0.22)] px-4 py-3 text-[0.74rem] uppercase tracking-[0.12em] text-[var(--cream)]/78">
            Atelier-signed
          </li>
          <li className="rounded-md border border-[rgba(201,162,39,0.22)] px-4 py-3 text-[0.74rem] uppercase tracking-[0.12em] text-[var(--cream)]/78">
            Insured delivery
          </li>
        </ul>

        <div className="mt-8">
          <Link
            href="/atelier"
            className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--cream)]/72 hover:text-[var(--cream)]"
          >
            View atelier standards
          </Link>
        </div>
      </div>
    </main>
  );
}
