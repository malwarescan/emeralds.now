"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    title: string;
    product: { title: string; handle: string };
  };
};

type CartData = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: { edges: Array<{ node: CartLine }> };
};

function formatMoney(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
}

export default function CartClient() {
  const params = useSearchParams();
  const router = useRouter();
  const addToken = params.get("add") ?? "";
  const qty = Number(params.get("qty") ?? "1");
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [preparing, setPreparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasAddIntent = useMemo(() => !!addToken, [addToken]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        if (hasAddIntent) setPreparing(true);

        const payload = hasAddIntent ? { addToken, qty } : {};
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = (await res.json()) as { cart?: CartData; error?: string };
        if (!res.ok) {
          throw new Error(json.error ?? "Unable to prepare cart");
        }
        if (cancelled) return;
        setCart(json.cart ?? null);

        if (hasAddIntent) {
          await new Promise((r) => setTimeout(r, 750));
          router.replace("/cart");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unable to load cart");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setPreparing(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [addToken, hasAddIntent, qty, router]);

  return (
    <main className="min-h-full w-full bg-[var(--abyssal)] py-8 sm:py-10">
      <div className="rail">
        <h1 className="font-serif text-2xl text-[var(--cream)] sm:text-3xl">Cart</h1>
        <p className="mt-2 max-w-[58ch] text-sm text-[var(--cream)]/80">
          Review your selected pieces. Checkout is hosted securely by Shopify.
        </p>

        {preparing && (
          <div className="mt-5 rounded-md border border-[rgba(201,162,39,0.35)] px-4 py-3 text-sm text-[var(--cream)]/88">
            Preparing checkout...
          </div>
        )}

        {loading && !preparing && (
          <div className="mt-5 rounded-md border border-[rgba(201,162,39,0.25)] px-4 py-3 text-sm text-[var(--cream)]/78">
            Loading cart...
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-md border border-[rgba(201,110,90,0.5)] px-4 py-3 text-sm text-[var(--cream)]">
            {error}
          </div>
        )}

        {!loading && !error && cart && (
          <>
            <ul className="mt-6 space-y-3">
              {cart.lines.edges.map(({ node }) => (
                <li key={node.id} className="rounded-md border border-[rgba(201,162,39,0.24)] px-4 py-3">
                  <p className="font-serif text-[1rem] text-[var(--cream)]">{node.merchandise.product.title}</p>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--cream)]/62">
                    {node.merchandise.title} · Qty {node.quantity}
                  </p>
                  <Link
                    href={`/product/${node.merchandise.product.handle}`}
                    className="mt-2 inline-block text-[0.68rem] uppercase tracking-[0.16em] text-[var(--cream)]/78 hover:text-[var(--cream)]"
                  >
                    View piece
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-md border border-[rgba(201,162,39,0.24)] px-4 py-4">
              <p className="text-sm text-[var(--cream)]/86">
                Subtotal:{" "}
                {formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </p>
              <p className="mt-1 text-sm text-[var(--cream)]">
                Total: {formatMoney(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}
              </p>
              <a
                href={cart.checkoutUrl}
                className="tap-scale mt-4 inline-flex min-h-11 items-center border border-[rgba(201,162,39,0.48)] px-5 py-2.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[var(--cream)]"
                data-cta-id="cart_checkout"
                data-cta-label="Checkout"
              >
                Continue to secure checkout
              </a>
            </div>
          </>
        )}

        {!loading && !error && !cart && (
          <div className="mt-6 rounded-md border border-[rgba(201,162,39,0.24)] px-4 py-4">
            <p className="text-sm text-[var(--cream)]/82">Your cart is currently empty.</p>
            <Link
              href="/collections/rings"
              className="tap-scale mt-3 inline-flex min-h-11 items-center border border-[rgba(201,162,39,0.4)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--cream)]"
              data-cta-id="cart_enter_collection"
              data-cta-label="Enter the collection"
            >
              Enter the collection
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
