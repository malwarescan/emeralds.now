import type { Metadata } from "next";
import { getCrawlFaqSchema } from "@/lib/crawl/aeo";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Muzem emerald jewelry, care, certification, and shipping. Emeralds.now — authorized distributor.",
};

type FaqItem = {
  "@type": string;
  name?: string;
  acceptedAnswer?: { "@type": string; text?: string; speakable?: { cssSelector?: string[] } };
};

export default function FaqPage() {
  const schema = getCrawlFaqSchema();
  const mainEntity = (schema?.mainEntity as FaqItem[] | undefined) ?? [];
  const name = (schema?.name as string) ?? "FAQ";

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              name: schema.name,
              description: schema.description,
              url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now"}/faq`,
              mainEntity: schema.mainEntity,
            }),
          }}
        />
      )}
      <article
        className="faq-page"
        style={{
          paddingLeft: "var(--rail-lg)",
          paddingRight: "var(--rail-lg)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-3xl)",
        }}
      >
        <h1 className="text-display-2 mb-4">{name}</h1>
        <p className="text-body opacity-90 mb-12 max-w-prose">
          {schema?.description as string}
        </p>
        <dl className="space-y-10">
          {mainEntity.map((item, i) => (
            <div key={i}>
              <dt className="text-heading-3 mb-2">{item.name}</dt>
              <dd className={`text-body text-technical opacity-90 ${item.acceptedAnswer?.speakable?.cssSelector?.[0] ? `faq-answer-${i + 1}` : ""}`}>
                {item.acceptedAnswer?.text}
              </dd>
            </div>
          ))}
        </dl>
      </article>
    </>
  );
}
