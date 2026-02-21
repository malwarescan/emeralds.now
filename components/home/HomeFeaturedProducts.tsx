import Link from "next/link";
import { getCrawlProducts, crawlProductImageUrl } from "@/lib/crawl/products";
import { Placard } from "@/components/ui/Placard";
import { GoldHairline } from "@/components/ui/GoldHairline";

function toHandle(p: { id: string; handle?: string }): string {
  if (p.handle) return p.handle;
  return p.id.toLowerCase().replace(/_/g, "-");
}

/**
 * Featured products from crawl — up to 6, minimal grid. Hidden if no crawl data.
 */
export function HomeFeaturedProducts() {
  const products = getCrawlProducts().slice(0, 6);
  if (!products.length) return null;

  return (
    <section
      style={{
        paddingTop: "var(--section-padding-y-desktop)",
        paddingBottom: "var(--section-padding-y-desktop)",
        paddingLeft: "var(--rail-lg)",
        paddingRight: "var(--rail-lg)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--gallery-max)" }}>
        <h2 className="text-display-2 mb-6">From the collection</h2>
        <p className="text-body opacity-90 max-w-xl mb-10">
          A selection of origin-certified pieces. Each stone is traced; each setting is signed.
        </p>
        <GoldHairline className="mb-10" />
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {products.map((product) => {
            const handle = toHandle(product);
            const imageUrl = product.image ? crawlProductImageUrl(product.image) : null;
            return (
              <Link key={product.id} href={`/product/${handle}`} className="block group">
                <Placard
                  title={product.title}
                  caption={
                    product.currency && product.price != null
                      ? `${product.currency} ${Number(product.price).toLocaleString()}`
                      : undefined
                  }
                >
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-square bg-[var(--color-mist)] flex items-center justify-center text-micro uppercase opacity-50" aria-hidden>
                      —
                    </div>
                  )}
                </Placard>
              </Link>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link href="/collections" className="cta-primary">
            View all pieces
          </Link>
        </div>
      </div>
    </section>
  );
}
