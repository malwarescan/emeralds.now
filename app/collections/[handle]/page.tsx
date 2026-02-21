import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionByHandle, getAllCollectionHandles } from "@/lib/shopify/client";
import { getCrawlCollectionByHandle, getCrawlCollectionHandles, crawlProductImageUrl } from "@/lib/crawl/products";
import { GoldHairline } from "@/components/ui/GoldHairline";
import { Placard } from "@/components/ui/Placard";
import { collectionPageSchema, organization, webSite, webPage, breadcrumbList } from "@/lib/schema/emit";

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  const shopifyHandles = await getAllCollectionHandles();
  const crawlHandles = getCrawlCollectionHandles();
  const handles = shopifyHandles.length > 0 ? shopifyHandles : crawlHandles;
  if (!handles.length) return [];
  return handles.map((handle) => ({ handle }));
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  let collection = await getCollectionByHandle(handle);
  const crawlCollection = getCrawlCollectionByHandle(handle);

  if (!collection && !crawlCollection) notFound();
  const isCrawl = !collection && !!crawlCollection;

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";
  const title = isCrawl ? crawlCollection!.title : collection!.title;
  const productsForSchema = isCrawl
    ? crawlCollection!.products
    : (collection!.products?.nodes ?? []).map((p: { handle: string; title: string }) => ({ handle: p.handle, title: p.title }));
  const breadcrumb = breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: title, path: `/collections/${handle}` },
  ]);
  const itemList = (isCrawl ? crawlCollection!.products : productsForSchema).map(
    (p: { handle: string; title: string }, i: number) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      url: `${base}/product/${p.handle}`,
      name: p.title,
    })
  );
  const collectionSchema = collectionPageSchema(`${base}/collections/${handle}`, title, itemList);

  const schemaGraph = [
    organization(),
    webSite(false),
    webPage(`/collections/${handle}`, title, (isCrawl ? crawlCollection!.description : collection!.description) ?? undefined, `${base}/collections/${handle}#breadcrumb`),
    breadcrumb,
    collectionSchema,
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
          <Link href="/collections" className="opacity-78 hover:opacity-100">Collections</Link>
          <span className="mx-2 opacity-50">/</span>
          <span>{title}</span>
        </nav>

        <h1 className="text-display-1 mb-4">{title}</h1>
        {!isCrawl && collection!.description && (
          <p className="text-body opacity-90 max-w-2xl mb-12">{collection!.description}</p>
        )}
        {isCrawl && crawlCollection!.description && (
          <p className="text-body opacity-90 max-w-2xl mb-12">{crawlCollection!.description}</p>
        )}
        <GoldHairline className="mb-12" />

        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
        >
          {isCrawl
            ? crawlCollection!.products.map((product) => (
                <Link key={product.handle} href={`/product/${product.handle}`} className="block group">
                  <Placard
                    title={product.title}
                    caption={product.currency && product.price != null ? `${product.currency} ${product.price}` : undefined}
                  >
                    {product.image ? (
                      <img
                        src={crawlProductImageUrl(product.image)}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="w-full aspect-square object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-square bg-[var(--color-mist)]" aria-hidden />
                    )}
                  </Placard>
                </Link>
              ))
            : (collection!.products?.nodes ?? []).map((product) => (
                <Link key={product.handle} href={`/product/${product.handle}`} className="block group">
                  <Placard title={product.title} caption={product.priceRange?.minVariantPrice ? `${product.priceRange.minVariantPrice.currencyCode} ${product.priceRange.minVariantPrice.amount}` : undefined}>
                    {product.featuredImage?.url ? (
                      <img
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText ?? product.title}
                        width={400}
                        height={400}
                        className="w-full aspect-square object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-square bg-[var(--color-mist)]" aria-hidden />
                    )}
                  </Placard>
                </Link>
              ))}
        </div>
      </article>
    </>
  );
}
