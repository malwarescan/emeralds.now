import { notFound } from "next/navigation";
import Link from "next/link";
import { GoldHairline } from "@/components/ui/GoldHairline";
import { articleSchema, organization, webSite, webPage, breadcrumbList } from "@/lib/schema/emit";

type Props = { params: Promise<{ slug: string }> };

const EDUCATION: Record<string, { title: string; description: string; content: string }> = {
  authenticity: {
    title: "Authenticity & Certification",
    description: "How we certify origin, treatment, and authenticity for every emerald.",
    content: "Every stone is traced to its source and accompanied by laboratory documentation. We work only with trusted grading bodies and disclose treatments in full.",
  },
  origin: {
    title: "Emerald Origin",
    description: "Colombian, Zambian, and Brazilian origins — what to look for.",
    content: "Origin affects color and value. Colombian Muzo and Zambian Kafubu are among the most sought-after. We disclose mine region and any treatment for every piece.",
  },
};

export async function generateStaticParams() {
  return Object.keys(EDUCATION).map((slug) => ({ slug }));
}

export default async function EducationPage({ params }: Props) {
  const { slug } = await params;
  const page = EDUCATION[slug];
  if (!page) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";
  const path = `/education/${slug}`;
  const schemaGraph = [
    organization(),
    webSite(false),
    webPage(`${base}${path}`, page.title, page.description, `${base}${path}#breadcrumb`),
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Education", path: "/education" },
      { name: page.title, path },
    ]),
    articleSchema({ url: `${base}${path}`, headline: page.title, description: page.description }),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }),
        }}
      />

      <article
        style={{
          paddingLeft: "var(--rail-lg)",
          paddingRight: "var(--rail-lg)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-3xl)",
          maxWidth: "42rem",
        }}
      >
        <nav aria-label="Breadcrumb" className="text-technical text-caption mb-8">
          <Link href="/" className="opacity-78 hover:opacity-100">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href="/education" className="opacity-78 hover:opacity-100">Education</Link>
          <span className="mx-2 opacity-50">/</span>
          <span>{page.title}</span>
        </nav>

        <h1 className="text-display-1 mb-6">{page.title}</h1>
        <p className="text-body opacity-90 mb-8">{page.description}</p>
        <GoldHairline className="mb-8" />
        <div className="text-body opacity-90 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
      </article>
    </>
  );
}
