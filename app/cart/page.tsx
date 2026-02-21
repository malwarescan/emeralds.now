import Link from "next/link";
import { GoldHairline } from "@/components/ui/GoldHairline";

export const metadata = {
  title: "Cart",
  description: "Your cart — Emeralds.now",
};

export default function CartPage() {
  return (
    <article
      style={{
        paddingLeft: "var(--rail-lg)",
        paddingRight: "var(--rail-lg)",
        paddingTop: "var(--space-2xl)",
        paddingBottom: "var(--space-3xl)",
      }}
    >
      <h1 className="text-display-2 mb-6">Cart</h1>
      <GoldHairline className="mb-8" />
      <p className="text-body opacity-90 mb-8">
        Your cart is empty. <Link href="/collections" className="link-luxury">Discover pieces</Link>.
      </p>
      <Link href="/collections" className="cta-primary">
        Continue to collection
      </Link>
    </article>
  );
}
