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

export default function HomePage() {
  const tiles = getCategoryTiles();
  const featured = getFeaturedProducts(FEATURED_PRODUCT_IDS);

  return (
    <main className="min-h-full w-full bg-[var(--abyssal)]">
      <Hero />
      <MaisonGateway />
      <ButterflyMarkSection />
      <MuzemDynastySection />
      <ExpertiseLinks />
      <ServicesBar />
      <CuratedEntry tiles={tiles} products={featured} />
      <SiteFooter />
    </main>
  );
}
