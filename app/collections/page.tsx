import Link from "next/link";
import { getAllCollectionHandles } from "@/lib/shopify/client";
import { getCrawlCollectionHandles } from "@/lib/crawl/products";
import { GoldHairline } from "@/components/ui/GoldHairline";
import { webPage, organization, webSite, breadcrumbList } from "@/lib/schema/emit";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";

export default async function CollectionsIndexPage() {
  const shopifyHandles = await getAllCollectionHandles();
  const crawlHandles = getCrawlCollectionHandles();
  const handles = shopifyHandles.length > 0 ? shopifyHandles : crawlHandles;
  const schemaGraph = [
    organization(),
    webSite(false),
    webPage(`${base}/collections`, "Collections | Emeralds.now", "Explore Muzem emerald collections."),
    breadcrumbList([{ name: "Home", path: "/" }, { name: "Collections", path: "/collections" }]),
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
        }}
      >
        <nav aria-label="Breadcrumb" className="text-technical text-caption mb-8">
          <Link href="/" className="opacity-78 hover:opacity-100">Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <span>Collections</span>
        </nav>

        <h1 className="text-display-1 mb-6">Collections</h1>
        <p className="text-body opacity-90 max-w-xl mb-12">
          Browse by category. Each piece is origin-certified and atelier-crafted.
        </p>
        <GoldHairline className="mb-12" />

        <ul className="flex flex-wrap gap-6">
          {handles.length
            ? handles.map((handle) => (
                <li key={handle}>
                  <Link
                    href={`/collections/${handle}`}
                    className="text-display-2 opacity-90 hover:opacity-100 transition-opacity"
                  >
                    {handle.replace(/-/g, " ")}
                  </Link>
                </li>
              ))
            : (
                <>
                  <li><Link href="/collections/rings" className="text-display-2 opacity-90 hover:opacity-100">Rings</Link></li>
                  <li><Link href="/collections/necklaces" className="text-display-2 opacity-90 hover:opacity-100">Necklaces</Link></li>
                  <li><Link href="/collections/bracelets" className="text-display-2 opacity-90 hover:opacity-100">Bracelets</Link></li>
                </>
              )}
        </ul>
      </article>
    </>
  );
}
