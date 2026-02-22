"use client";

import Link from "next/link";
import type { NormalizedProduct } from "@/lib/catalog/types";

import { formatPrice } from "@/lib/format/price";

export default function StickyAcquireBar({ product }: { product: NormalizedProduct }) {
  const canAcquire = product.sellability === "in-stock";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 border-t border-[rgba(201,162,39,0.3)] bg-[var(--abyssal)] px-4 py-3 safe-area-pb sm:px-6 sm:py-4">
      <span className="font-serif text-lg text-[#f5f0e8]">
        {formatPrice(product.sale_price_usd, product.currency_usd)}
      </span>
      <div className="flex items-center gap-3">
        {canAcquire ? (
          <Link
            href={`/cart?add=${product.product_id}`}
            className="tap-scale inline-block border border-[rgba(201,162,39,0.5)] bg-transparent px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-[#f5f0e8]"
          >
            Acquire
          </Link>
        ) : (
          <Link
            href="/concierge"
            className="tap-scale inline-block border border-[rgba(201,162,39,0.5)] bg-transparent px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-[#f5f0e8]"
          >
            Request availability
          </Link>
        )}
        <Link
          href="/concierge"
          className="tap-scale flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(201,162,39,0.35)] text-[#f5f0e8]/90"
          aria-label="Speak with an artisan"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 2a3 3 0 0 1 3 3v2a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>
        </Link>
      </div>
    </div>
  );
}
