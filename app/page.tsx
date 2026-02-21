import { SiteHeader } from "@/components/layout/SiteHeader";
import Hero from "@/components/home/Hero";
import { FeaturedDuo } from "@/components/home/FeaturedDuo";
import { QuoteSection } from "@/components/home/QuoteSection";
import CollectionGrid from "@/components/home/CollectionGrid";
import { DiscoveryTiles } from "@/components/home/DiscoveryTiles";
import Link from "next/link";
import { GoldHairline } from "@/components/ui/GoldHairline";
import { getCrawlProducts, crawlProductImageUrl } from "@/lib/crawl/products";

function toHandle(p: { id: string; handle?: string }): string {
  return p.handle ?? p.id.toLowerCase().replace(/_/g, "-");
}

function formatPrice(price: number | undefined, currency: string): string {
  if (price == null) return "";
  return `${currency} ${price.toLocaleString("es-CO")}`;
}

/**
 * Editorial showroom homepage: hero → duo → quote → collection grid (crawl) → discovery tiles.
 */
export default function HomePage() {
  const crawlProducts = getCrawlProducts().slice(0, 6);
  const products = crawlProducts.map((p) => ({
    handle: toHandle(p),
    title: p.title,
    image: p.image ? crawlProductImageUrl(p.image) : "",
    price: formatPrice(p.price, p.currency ?? "COP"),
    meta: p.category ? `${p.category} · Origin-certified` : undefined,
  }));

  return (
    <article>
      <Hero />

      <FeaturedDuo />
      <QuoteSection />
      <CollectionGrid products={products} />
      <DiscoveryTiles />

      <footer
        className="py-12"
        style={{
          paddingLeft: "var(--rail-lg)",
          paddingRight: "var(--rail-lg)",
          paddingTop: "var(--section-padding-y-mobile)",
          paddingBottom: "var(--section-padding-y-mobile)",
        }}
      >
        <GoldHairline className="mb-8 max-w-[var(--gallery-max)] mx-auto" />
        <nav
          className="flex flex-wrap gap-8 justify-center text-micro tracking-[0.08em] uppercase max-w-[var(--gallery-max)] mx-auto"
          style={{ color: "var(--paper)", opacity: 0.85 }}
          aria-label="Footer"
        >
          <Link href="/collections">Collections</Link>
          <Link href="/education">Atelier</Link>
          <Link href="/education">Education</Link>
          <Link href="/concierge">Concierge</Link>
          <Link href="/shipping-returns">Shipping & Returns</Link>
          <Link href="/education/authenticity">Authenticity</Link>
        </nav>
      </footer>
    </article>
  );
}
