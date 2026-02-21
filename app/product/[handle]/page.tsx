import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductByHandle } from "@/lib/shopify/client";
import { getCrawlProductByHandle, crawlProductImageUrl } from "@/lib/crawl/products";
import { getCrawlMeta } from "@/lib/crawl/meta";
import { getCrawlProductSchema } from "@/lib/crawl/seo";
import { productSchema, merchantReturnPolicy, shippingDetails, organization, webSite, webPage, breadcrumbList } from "@/lib/schema/emit";
import { PdpGallery } from "@/components/product/PdpGallery";
import { GoldHairline } from "@/components/ui/GoldHairline";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const crawlProduct = getCrawlProductByHandle(handle);
  if (!crawlProduct) return {};
  const meta = getCrawlMeta(crawlProduct.id);
  if (!meta) return { title: crawlProduct.title };
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";
  return {
    title: meta.title ?? crawlProduct.title,
    description: meta.description ?? crawlProduct.description,
    openGraph: {
      title: meta.og_title ?? meta.title ?? crawlProduct.title,
      description: meta.og_description ?? meta.description ?? crawlProduct.description,
      images: meta.og_image ? [meta.og_image] : undefined,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const { getCrawlProducts } = await import("@/lib/crawl/products");
  const crawl = getCrawlProducts();
  if (!crawl.length) return [];
  return crawl.map((p) => ({ handle: p.handle ?? p.id.toLowerCase().replace(/_/g, "-") }));
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  const crawlProduct = getCrawlProductByHandle(handle);
  const isCrawl = !product && crawlProduct;
  if (!product && !crawlProduct) notFound();

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";
  const productUrl = `${base}/product/${handle}`;

  const title = isCrawl ? crawlProduct!.title : product!.title;
  const description = isCrawl ? crawlProduct!.description : product!.description;
  const price = isCrawl ? (crawlProduct!.price ?? 0) : parseFloat(product!.priceRange?.minVariantPrice?.amount ?? "0");
  const currency = isCrawl ? (crawlProduct!.currency ?? "COP") : (product!.priceRange?.minVariantPrice?.currencyCode ?? "USD");
  const highPrice = !isCrawl && product!.variants?.nodes?.length
    ? Math.max(...product!.variants.nodes.map((v: { price: { amount: string } }) => parseFloat(v.price?.amount ?? "0")))
    : undefined;

  const productPath = `/product/${handle}`;
  const crawlSchemaProduct = isCrawl ? getCrawlProductSchema(crawlProduct!.id, base, productPath) : null;

  const schemaGraph = [
    organization(),
    webSite(false),
    webPage(productUrl, title, description ?? undefined, `${productUrl}#breadcrumb`),
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Collections", path: "/collections" },
      { name: title, path: `/product/${handle}` },
    ]),
    ...(crawlSchemaProduct ? [crawlSchemaProduct] : [
      productSchema({
        url: productUrl,
        name: title,
        description: description ?? undefined,
        image: isCrawl
          ? (crawlProduct!.image ? (crawlProduct!.image.startsWith("http") ? crawlProduct!.image : `${base}${crawlProductImageUrl(crawlProduct!.image)}`) : undefined)
          : (product!.featuredImage?.url ?? product!.images?.nodes?.map((n: { url: string }) => n.url)),
        price,
        highPrice: highPrice && highPrice !== price ? highPrice : undefined,
        currency,
        sku: !isCrawl ? product!.variants?.nodes?.[0]?.id : crawlProduct!.id,
      }),
      merchantReturnPolicy(30),
      shippingDetails(5, 10),
    ]),
  ];

  const images = isCrawl
    ? (() => {
        const img = crawlProduct!.image ?? (crawlProduct!.images as string[])?.[0];
        if (!img) return [{ url: "", alt: title, width: 1200, height: 1200 }];
        const url = img.startsWith("http") ? img : crawlProductImageUrl(img);
        return [{ url, alt: title, width: 1200, height: 1200 }];
      })()
    : [
        product!.featuredImage,
        ...(product!.images?.nodes ?? []),
      ].filter((img): img is NonNullable<typeof img> => Boolean(img)).map((img) => ({
        url: img.url,
        alt: img.altText,
        width: img.width ?? 1200,
        height: img.height ?? 1200,
      }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": schemaGraph }),
        }}
      />

      <article
        className="product-pdp min-h-screen"
        style={{
          paddingLeft: "var(--rail-lg)",
          paddingRight: "var(--rail-lg)",
          paddingTop: "var(--space-xl)",
          paddingBottom: "var(--space-3xl)",
          background: "#041E15",
        }}
      >
        <nav aria-label="Breadcrumb" className="text-technical text-caption mb-6" style={{ color: "var(--paper)" }}>
          <Link href="/" className="opacity-78 hover:opacity-100" style={{ color: "inherit" }}>Home</Link>
          <span className="mx-2 opacity-50">/</span>
          <Link href="/collections" className="opacity-78 hover:opacity-100" style={{ color: "inherit" }}>Collections</Link>
          <span className="mx-2 opacity-50">/</span>
          <span>{title}</span>
        </nav>

        <div
          className="grid gap-12 lg:grid-cols-[1.618fr_1fr]"
          style={{ alignItems: "start" }}
        >
          <PdpGallery
            images={images}
            productName={title}
          />

          <div style={{ color: "var(--paper)" }}>
            <h1 className="text-display-2 mb-2">{title}</h1>
            <p className="text-technical text-body mb-4">
              {currency} {isCrawl ? price : (product!.priceRange?.minVariantPrice?.amount ?? "")}
              {!isCrawl && (product!.variants?.nodes?.length ?? 0) > 1 && " — variants available"}
            </p>
            <GoldHairline className="my-6" />
            <div className="flex flex-wrap gap-4">
              <a href="#acquire" className="cta-primary">Acquire</a>
              <Link href="/concierge" className="cta-secondary">Speak to an artisan</Link>
            </div>
            <p className="text-caption text-technical mt-6 opacity-78">
              Origin-certified · Authenticity guarantee · 30-day returns
            </p>

            <GoldHairline className="my-10" />
            <section aria-labelledby="the-stone">
              <h2 id="the-stone" className="text-heading-3 mb-4">The Stone</h2>
              <p className="text-body opacity-90">
                {description ?? "Origin, carat, treatment, and certification details for this piece are provided with your purchase."}
              </p>
            </section>
            <GoldHairline className="my-8" />
            <section aria-labelledby="the-setting">
              <h2 id="the-setting" className="text-heading-3 mb-4">The Setting</h2>
              <p className="text-body opacity-90 text-technical">
                Metal, craftsmanship, and atelier details.
              </p>
            </section>
            <GoldHairline className="my-8" />
            <section aria-labelledby="proof">
              <h2 id="proof" className="text-heading-3 mb-4">Proof</h2>
              <p className="text-body opacity-90 text-technical">
                Certificates, grading, authenticity guarantees.
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
