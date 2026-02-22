"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import type { NormalizedProduct } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/format/price";
import { getShortTitle } from "@/lib/format/titles";

function specLine(p: NormalizedProduct): string {
  const parts = [p.material, p.emerald_type].filter(Boolean);
  return parts.length ? parts.join(" · ").toUpperCase() : p.primary_category?.toUpperCase() ?? "";
}

export default function FeaturedCreations({ products }: { products: NormalizedProduct[] }) {
  const visibleProducts = Array.from(new Map(products.map((p) => [p.product_id, p])).values()).slice(
    0,
    8,
  );
  if (visibleProducts.length === 0) return null;

  return (
    <section className="bg-[var(--abyssal)] py-8 sm:py-10">
      <div className="rail">
        <h2 className="mb-4 font-serif text-xl font-normal tracking-wide text-[var(--cream)] sm:text-2xl">
          Featured creations
        </h2>
        <div className="featured-section-divider" aria-hidden />
        <p className="mt-4 max-w-[34ch] text-[0.75rem] leading-snug text-[#f5f0e8]/65">
          Selected highlights from the archive, reviewed for proportion and presence.
        </p>
        <ul className="pt-4">
          {visibleProducts.map((p) => (
            <li
              key={p.product_id}
              className="border-b border-[rgba(201,162,39,0.2)] pb-5 last:border-b-0"
            >
              <ProductCard
                product={p}
                sizes="(max-width: 430px) 100vw, 400px"
                mountClassName="gallery-mount-featured"
                mountMaxHeight="56vh"
                contentClassName="featured-card-body mt-3"
                conciergeSafeImageArea
              >
                <p className="product-card-title featured-card-title">{getShortTitle(p.title, 44)}</p>
                <p className="featured-card-price text-[0.8125rem] font-normal text-[var(--cream)]/90">
                  {formatPrice(p.sale_price_usd, p.currency_usd)}
                </p>
                {specLine(p) && (
                  <p className="featured-card-spec text-[0.62rem] font-medium uppercase tracking-[0.15em] text-[var(--cream)]/62">
                    {specLine(p)}
                  </p>
                )}
                <span className="featured-view-piece view-piece mt-3 inline-flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.15em] tap-scale">
                  <span className="featured-view-piece-rule" aria-hidden />
                  <span>View piece</span>
                </span>
              </ProductCard>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-center">
          <Link
            href="/collections"
            className="featured-view-all tap-scale inline-flex items-center border border-[rgba(201,162,39,0.22)] px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]"
          >
            Explore all pieces
          </Link>
        </div>
        <div className="featured-section-divider mt-7" aria-hidden />
      </div>
    </section>
  );
}
