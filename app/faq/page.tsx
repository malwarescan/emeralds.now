import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Muzem Emeralds",
  description: "Answers on provenance, certification, shipping, returns, and concierge support.",
  alternates: { canonical: "/faq" },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is emeralds.now the official Muzem online store?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. emeralds.now is the official online store for Muzem Emeralds.",
      },
    },
    {
      "@type": "Question",
      name: "Where do your emeralds come from?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our sourcing context references Colombian emerald corridors including Muzo and Chivor, with documentation preserved through the atelier process.",
      },
    },
    {
      "@type": "Question",
      name: "How is shipping handled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Orders are prepared for insured delivery, secure packaging, and documented handoff.",
      },
    },
  ],
};

export default function FaqPage() {
  return (
    <main className="min-h-full w-full bg-[var(--abyssal)] py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <div className="rail">
        <h1 className="font-serif text-2xl text-[var(--cream)] sm:text-3xl">FAQ</h1>
        <div className="mt-6 space-y-5">
          <section>
            <h2 className="text-[0.85rem] font-medium uppercase tracking-[0.16em] text-[var(--cream)]/86">
              Is emeralds.now official Muzem?
            </h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--cream)]/84">
              Yes. emeralds.now is the official online store for Muzem Emeralds.
            </p>
          </section>
          <section>
            <h2 className="text-[0.85rem] font-medium uppercase tracking-[0.16em] text-[var(--cream)]/86">
              Where do emeralds come from?
            </h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--cream)]/84">
              Our sourcing context follows Colombian emerald corridors, especially Muzo and Chivor, with
              documentation preserved through selection and setting.
            </p>
          </section>
          <section>
            <h2 className="text-[0.85rem] font-medium uppercase tracking-[0.16em] text-[var(--cream)]/86">
              How is shipping handled?
            </h2>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--cream)]/84">
              Orders are prepared for insured delivery with secure packaging and documented handoff.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
