import type { Metadata } from "next";
import Link from "next/link";
import { getCategoryTiles } from "@/lib/catalog/categories";
import { getFeaturedProducts } from "@/lib/catalog/catalog";
import { FEATURED_PRODUCT_IDS } from "@/config/featured";
import Hero from "@/components/home/Hero";
import MaisonGateway from "@/components/home/MaisonGateway";
import ButterflyMarkSection from "@/components/home/ButterflyMarkSection";
import MuzemDynastySection from "@/components/home/MuzemDynastySection";
import CuratedEntry from "@/components/home/CuratedEntry";
import ExpertiseLinks from "@/components/home/ExpertiseLinks";
import ServicesBar from "@/components/home/ServicesBar";
import SiteFooter from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  const tiles = getCategoryTiles();
  const featured = getFeaturedProducts(FEATURED_PRODUCT_IDS);

  return (
    <main className="min-h-full w-full bg-[var(--abyssal)]">
      <Hero />
      <section className="bg-[var(--abyssal)] pb-12 pt-6 sm:pb-14 sm:pt-8">
        <div className="rail flex justify-center">
          <Link
            href="/collections"
            className="hero-cta tap-scale inline-block bg-transparent px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#f5f0e8] sm:text-[0.7rem]"
            aria-label="Enter the collection"
            data-cta-id="hero_enter_collection"
            data-cta-label="Enter the collection"
          >
            Enter the collection
          </Link>
        </div>
      </section>
      <ButterflyMarkSection />
      <MaisonGateway />
      <MuzemDynastySection />
      <ExpertiseLinks />
      <ServicesBar />
      <CuratedEntry tiles={tiles} products={featured} />
      <SiteFooter />
    </main>
  );
}
