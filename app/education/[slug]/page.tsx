import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { breadcrumbSchema } from "@/lib/schema/emit";

const EDUCATION_PAGES = {
  "how-to-verify-colombian-emerald": {
    title: "How to verify a Colombian emerald",
    description: "A practical verification protocol covering origin context, treatment disclosure, and certification checks.",
    body: [
      "Start with documentation: ask for certification references, treatment notes, and traceable seller context.",
      "Assess disclosure quality. Trustworthy sellers separate verified facts from interpretation and avoid inflated rarity claims.",
      "Review proportion, cut behavior, and setting integrity together. A premium stone can still be undermined by weak craftsmanship.",
    ],
  },
  "emerald-treatments-explained": {
    title: "Emerald treatments explained",
    description: "Understand common emerald treatments and how they affect transparency, care, and value communication.",
    body: [
      "Clarity enhancement is common in emeralds and should be disclosed in plain language.",
      "Treatment context helps compare stones accurately; undisclosed treatment is a trust risk.",
      "Long-term care expectations should be communicated alongside treatment details before purchase.",
    ],
  },
  "emerald-care-guide": {
    title: "Emerald care and storage guide",
    description: "Best practices for preserving emerald color, setting integrity, and long-term wear performance.",
    body: [
      "Store pieces separately to reduce abrasion risk and protect settings.",
      "Avoid harsh chemicals and ultrasonic cleaning for treated emeralds.",
      "Schedule periodic professional checks for prong integrity and mounting security.",
    ],
  },
} as const;

type Slug = keyof typeof EDUCATION_PAGES;

export function generateStaticParams() {
  return Object.keys(EDUCATION_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = EDUCATION_PAGES[slug as Slug];
  if (!page) return { title: "Education | Muzem Emeralds" };
  return {
    title: `${page.title} | Muzem Emeralds`,
    description: page.description,
    alternates: { canonical: `/education/${slug}` },
  };
}

export default async function EducationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = EDUCATION_PAGES[slug as Slug];
  if (!page) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://emeralds.now/" },
    { name: "Education", url: "https://emeralds.now/education/how-to-verify-colombian-emerald" },
    { name: page.title, url: `https://emeralds.now/education/${slug}` },
  ]);

  return (
    <main className="min-h-full w-full bg-[var(--abyssal)] py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="rail">
        <Link
          href="/"
          className="mb-6 inline-block text-[0.72rem] uppercase tracking-[0.16em] text-[var(--cream)]/72 hover:text-[var(--cream)]"
        >
          ← Home
        </Link>
        <h1 className="font-serif text-2xl text-[var(--cream)] sm:text-3xl">{page.title}</h1>
        <p className="mt-3 max-w-[62ch] text-[0.92rem] leading-relaxed text-[var(--cream)]/84">
          {page.description}
        </p>
        <div className="mt-6 space-y-4">
          {page.body.map((paragraph) => (
            <p key={paragraph} className="max-w-[66ch] text-[0.9rem] leading-relaxed text-[var(--cream)]/86">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
