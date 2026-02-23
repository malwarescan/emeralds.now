import type { Metadata } from "next";
import { Suspense } from "react";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Cart | Muzem Emeralds",
  description: "Review your selected pieces and continue to secure Shopify checkout.",
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-full w-full bg-[var(--abyssal)] py-8 sm:py-10">
          <div className="rail">
            <h1 className="font-serif text-2xl text-[var(--cream)] sm:text-3xl">Cart</h1>
            <p className="mt-4 text-sm text-[var(--cream)]/78">Loading cart...</p>
          </div>
        </main>
      }
    >
      <CartClient />
    </Suspense>
  );
}
