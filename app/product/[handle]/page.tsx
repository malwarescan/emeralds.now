import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductByHandle } from "@/lib/catalog/catalog";
import { productSchema } from "@/lib/schema/emit";
import StickyAcquireBar from "@/components/product/StickyAcquireBar";
import PdpGallery from "@/components/product/PdpGallery";
import { formatPrice } from "@/lib/format/price";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return { title: "Product | Muzem Emeralds" };
  const { getMetaForProduct } = await import("@/lib/seo/meta");
  const meta = getMetaForProduct(product.product_id);
  return meta ?? { title: product.title, description: product.meta_description ?? product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const schema = productSchema(product);

  return (
    <>
      <main className="min-h-full w-full bg-[var(--abyssal)] pb-24 sm:pb-28">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
