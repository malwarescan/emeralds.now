import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryTiles } from "@/lib/catalog/categories";
import { getProductsByCollectionHandle } from "@/lib/catalog/catalog";
import { formatPrice } from "@/lib/format/price";
import { getShortTitle } from "@/lib/format/titles";
import { breadcrumbSchema } from "@/lib/schema/emit";
import ProductCard from "@/components/product/ProductCard";

const COLLECTION_HANDLES = ["rings", "earrings", "pendants", "bracelets", "chains", "one-of-one"];

const FALLBACK_TILES: Record<string, { title: string; description: string }> = {
  rings: { title: "Rings", description: "Certified Colombian emerald rings in gold, silver, and platinum." },
  earrings: { title: "Earrings", description: "Earrings in gold and silver with natural and carved emeralds." },
  pendants: { title: "Pendants", description: "Pendants and necklaces featuring Colombian emeralds." },
  bracelets: { title: "Bracelets", description: "Emerald bracelets in gold and silver." },
  chains: { title: "Chains", description: "Gold and silver chains to pair with your pieces." },
  "one-of-one": { title: "One-of-One", description: "Unique pieces, each one singular in the world." },
};

function specLine(p: { material?: string; emerald_type?: string; primary_category?: string }): string {
  const parts = [p.material, p.emerald_type].filter(Boolean);
  return parts.length ? parts.join(" · ").toUpperCase() : p.primary_category?.toUpperCase() ?? "";
}

export function generateStaticParams() {
  return COLLECTION_HANDLES.map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const handleLower = handle?.toLowerCase() ?? "";
  const tile = FALLBACK_TILES[handleLower];
  const title = tile?.title ?? handle ?? "Collection";
  const description = tile?.description ?? `Explore ${title} — certified Colombian emerald jewelry.`;
  return {
    title: `${title} | Muzem Emeralds`,
    description,
    alternates: { canonical: `/collections/${handleLower}` },
    openGraph: { url: `/collections/${handleLower}` },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const handleLower = handle?.toLowerCase() ?? "";
  if (!COLLECTION_HANDLES.includes(handleLower)) notFound();

  let tile: { title: string; description: string } | null = null;
  try {
    const tiles = getCategoryTiles();
    tile = tiles.find((t) => t.slug === handleLower) ?? null;
  } catch {
    // categories.json missing or unreadable
  }
  if (!tile) tile = FALLBACK_TILES[handleLower] ?? null;
  if (!tile) notFound();

  const products = getProductsByCollectionHandle(handleLower);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://emeralds.now/" },
    { name: "Collections", url: "https://emeralds.now/collections" },
    { name: tile.title, url: `https://emeralds.now/collections/${handleLower}` },
  ]);

  return (
    <main className="min-h-full w-full bg-[var(--abyssal)] py-6 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="rail">
        <Link
          href="/"
          className="mb-6 inline-block text-[0.75rem] uppercase tracking-widest text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
        >
          ← Home
        </Link>
        <h1 className="font-serif text-2xl font-normal tracking-wide text-[#f5f0e8] sm:text-3xl">
          {tile.title}
        </h1>
        <p className="mt-2 max-w-lg text-sm text-[#f5f0e8]/80">
          {tile.description}
        </p>
        {products.length === 0 ? (
          <p className="mt-10 text-[#f5f0e8]/70">No pieces in this collection yet.</p>
        ) : (
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <li key={p.product_id}>
                <ProductCard product={p} sizes="(max-width: 430px) 100vw, 50vw, 33vw">
                  <p className="product-card-title mt-3">{getShortTitle(p.title)}</p>
                  <p className="mt-1.5 text-[0.8125rem] font-normal text-[var(--cream)]/90">
                    {formatPrice(p.sale_price_usd, p.currency_usd)}
                  </p>
                  {specLine(p) && (
                    <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-widest text-[var(--cream)]/60">
                      {specLine(p)}
                    </p>
                  )}
                  <span className="view-piece mt-3 inline-block text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--gold-muted)] hover:text-[var(--gold-hairline)]">
                    View piece
                  </span>
                </ProductCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
