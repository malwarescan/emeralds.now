import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductByHandle } from "@/lib/catalog/catalog";
import { breadcrumbSchema, productSchema } from "@/lib/schema/emit";
import StickyAcquireBar from "@/components/product/StickyAcquireBar";
import PdpGallery from "@/components/product/PdpGallery";
import { formatPrice } from "@/lib/format/price";

function collectionHandleForProduct(category?: string) {
  const normalized = (category ?? "").toLowerCase().trim();
  if (!normalized) return "";
  if (normalized === "one-of-one") return "one-of-one";
  return normalized.endsWith("s") ? normalized : `${normalized}s`;
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return { title: "Product | Muzem Emeralds" };
  const { getMetaForProduct } = await import("@/lib/seo/meta");
  const meta = getMetaForProduct(product.product_id);
  if (meta) {
    return {
      ...meta,
      alternates: { canonical: `/product/${product.handle}` },
      openGraph: { ...(meta.openGraph ?? {}), url: `/product/${product.handle}` },
    };
  }
  return {
    title: product.title,
    description: product.meta_description ?? product.description,
    alternates: { canonical: `/product/${product.handle}` },
    openGraph: { url: `/product/${product.handle}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const schema = productSchema(product);
  const collectionHandle = collectionHandleForProduct(product.primary_category);
  const collectionUrl = collectionHandle ? `https://emeralds.now/collections/${collectionHandle}` : "https://emeralds.now/collections";
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://emeralds.now/" },
    { name: "Collections", url: "https://emeralds.now/collections" },
    { name: product.primary_category || "Collection", url: collectionUrl },
    { name: product.title, url: `https://emeralds.now/product/${product.handle}` },
  ]);

  return (
    <>
      <main className="min-h-full w-full bg-[var(--abyssal)] pb-24 sm:pb-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
        <div className="rail py-6">
          <Link
            href="/"
            className="mb-6 inline-block text-[0.75rem] uppercase tracking-widest text-[#f5f0e8]/70 hover:text-[#f5f0e8]"
          >
            ← Collection
          </Link>
          <PdpGallery product={product} />
          <div className="mt-6 border-b border-[rgba(201,162,39,0.2)] pb-6">
            <h1 className="font-serif text-xl font-normal text-[#f5f0e8] sm:text-2xl">
              {product.title}
            </h1>
            <p className="mt-2 text-[0.75rem] uppercase tracking-wider text-[#f5f0e8]/75">
              {[product.material, product.emerald_type].filter(Boolean).join(" · ")}
            </p>
            <p className="mt-4 text-[#f5f0e8]">
              {formatPrice(product.sale_price_usd, product.currency_usd)}
            </p>
          </div>
          <div className="mt-6 prose prose-invert max-w-none">
            <p className="text-sm leading-relaxed text-[#f5f0e8]/90">
              {product.description}
            </p>
            {product.certification && (
              <p className="mt-4 text-[0.8rem] text-[#f5f0e8]/70">
                {product.certification}
              </p>
            )}
          </div>
        </div>
      </main>
      <StickyAcquireBar product={product} />
    </>
  );
}
