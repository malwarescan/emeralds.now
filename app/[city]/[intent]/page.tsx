import Link from "next/link";
import { getGeoTemplate } from "@/lib/geo/templates";
import { GoldHairline } from "@/components/ui/GoldHairline";
import { ConciergeOverlayTrigger } from "@/components/concierge/ConciergeOverlayTrigger";
import { webPage, organization, webSite, breadcrumbList } from "@/lib/schema/emit";

type Props = { params: Promise<{ city: string; intent: string }> };

export default async function GeoPage({ params }: Props) {
  const { city, intent } = await params;
  const t = getGeoTemplate(city, intent);

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";
  const path = `/${city}/${intent}`;
  const schemaGraph = [
    organization(),
    webSite(false),
    webPage(`${base}${path}`, t.title, t.description),
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: t.h1, path },
    ]),
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
        <h1 className="text-display-1 mb-6">{t.h1}</h1>
        <p className="text-body opacity-90 mb-8">{t.summary}</p>
        <GoldHairline className="mb-8" />
        <ConciergeOverlayTrigger />
        {t.collectionHandles?.length ? (
          <>
            <h2 className="text-heading-3 mt-12 mb-4">Explore</h2>
            <ul className="text-body opacity-90">
              {t.collectionHandles.map((handle) => (
                <li key={handle}>
                  <Link href={`/collections/${handle}`} className="link-luxury">
                    {handle}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {t.faqs?.length ? (
          <>
            <h2 id="faq" className="text-heading-3 mt-12 mb-4">{t.faqHeading ?? "FAQ"}</h2>
            <dl className="space-y-4">
              {t.faqs.map((faq, i) => (
                <div key={i}>
                  <dt className="text-technical text-small font-medium mb-1">{faq.q}</dt>
                  <dd className="text-body opacity-90">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
      </article>
    </>
  );
}
