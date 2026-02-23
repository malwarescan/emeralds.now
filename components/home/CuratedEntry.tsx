"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { useCinemaScroll } from "@/lib/motion/useCinemaScroll";
import type { CategoryTile, NormalizedProduct } from "@/lib/catalog/types";
import { formatPrice } from "@/lib/format/price";
import { getShortTitle } from "@/lib/format/titles";

const CURATED_ORDER = ["rings", "earrings", "pendants", "bracelets", "chains", "one-of-one"];

function orderedCategories(tiles: CategoryTile[]) {
  const byId = new Map(tiles.map((tile) => [tile.id, tile]));
  return CURATED_ORDER.map((id) => byId.get(id)).filter(Boolean) as CategoryTile[];
}

function specLine(p: NormalizedProduct): string {
  const parts = [p.material, p.emerald_type].filter(Boolean);
  return parts.length ? parts.join(" · ").toUpperCase() : p.primary_category?.toUpperCase() ?? "";
}

function CuratedCategoryTile({ tile }: { tile: CategoryTile }) {
  const cinemaRef = useCinemaScroll<HTMLAnchorElement>({ plateMax: 12, fgMax: 7, fade: false });

  return (
    <Link
      ref={cinemaRef}
      href={tile.route}
      className={`category-tile category-tile-row tap-scale cinema card-settle ${tile.id === "custom" ? "category-tile--custom" : ""}`}
      aria-label={`Enter ${tile.title}`}
      data-cta-id={`curated_category_${tile.id}`}
      data-cta-label={tile.title}
    >
      <span className="cinema-plate absolute inset-0" aria-hidden>
        <span className="category-tile-atmosphere" />
        <span className="category-tile-noise" />
      </span>
      <span className="cinema-fg category-tile-inner relative">
        <span>
          <span className="category-tile-title font-serif text-xl font-normal leading-tight text-[#f5f0e8] sm:text-[1.4rem]">
            {tile.title}
          </span>
          <span className="category-tile-description mt-1.5 block max-w-md text-[0.7rem] leading-snug text-[#f5f0e8]/75">
            {tile.description}
          </span>
        </span>
        <span className="category-tile-affordance" aria-hidden>
          <span className="category-tile-dot" />
          <span className="category-tile-rule" />
        </span>
      </span>
    </Link>
  );
}

export default function CuratedEntry({
  tiles,
  products,
}: {
  tiles: CategoryTile[];
  products: NormalizedProduct[];
}) {
  const categories = orderedCategories(tiles).slice(0, 6);
  const highlights = Array.from(new Map(products.map((p) => [p.product_id, p])).values()).slice(0, 4);
  const sectionCinemaRef = useCinemaScroll<HTMLDivElement>({ plateMax: 8, fgMax: 5, fade: false });

  return (
    <section className="bg-[var(--abyssal)] py-9 sm:py-11" data-concierge-safe="1">
      <div className="rail">
        <div
          ref={sectionCinemaRef}
          className="curated-entry-shell cinema card-settle relative overflow-hidden rounded-[12px] border border-[rgba(201,162,39,0.24)] px-5 py-5 sm:px-6 sm:py-6"
        >
          <span className="curated-entry-atmosphere cinema-plate pointer-events-none absolute inset-0" aria-hidden />
          <div className="cinema-fg space-y-2">
            <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[var(--cream)]/72">
              CURATED ENTRY
            </p>
            <p className="text-[0.84rem] leading-snug text-[var(--cream)]/88">
              Choose a category, then explore selected highlights.
            </p>
            <p className="text-[0.64rem] uppercase tracking-[0.14em] text-[var(--cream)]/62">
              ORIGIN VERIFIED · ATELIER-SIGNED · INSURED DELIVERY
            </p>
            <div className="curated-entry-divider" aria-hidden />
          </div>

          <div className="cinema-fg mt-4 lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-7">
            <div>
              <p className="mb-3 text-[0.64rem] font-medium uppercase tracking-[0.16em] text-[var(--cream)]/66">
                Our creations
              </p>
              <div className="grid gap-3">
                {categories.map((tile) => (
                  <CuratedCategoryTile key={tile.id} tile={tile} />
                ))}
              </div>
            </div>

            <div className="mt-5 lg:mt-0">
              <p className="mb-3 text-[0.64rem] font-medium uppercase tracking-[0.16em] text-[var(--cream)]/66">
                Featured creations
              </p>
              <ul className="curated-highlights-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1">
                {highlights.map((p) => (
                  <li key={p.product_id} className="curated-highlight-card min-w-[86%] snap-start lg:min-w-0">
                    <ProductCard
                      product={p}
                      sizes="(max-width: 430px) 86vw, (max-width: 1024px) 48vw, 26vw"
                      mountClassName="gallery-mount-featured gallery-mount-curated"
                      mountMaxHeight="45vh"
                      contentClassName="curated-card-body mt-2.5"
                      conciergeSafeImageArea
                      cinema
                      cinemaPlateMax={10}
                      cinemaFgMax={6}
                      cinemaFade={false}
                    >
                      <p className="product-card-title">{getShortTitle(p.title, 38)}</p>
                      <p className="text-[0.78rem] font-normal text-[var(--cream)]/88">
                        {formatPrice(p.sale_price_usd, p.currency_usd)}
                      </p>
                      {specLine(p) && (
                        <p className="text-[0.6rem] font-medium uppercase tracking-[0.14em] text-[var(--cream)]/60">
                          {specLine(p)}
                        </p>
                      )}
                      <span className="view-piece inline-flex items-center gap-2 text-[0.64rem] font-medium uppercase tracking-[0.14em] text-[var(--cream)]/83">
                        <span className="featured-view-piece-rule" aria-hidden />
                        <span>View piece</span>
                      </span>
                    </ProductCard>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="cinema-fg mt-5 flex justify-center">
            <Link
              href="/collections"
              className="featured-view-all tap-scale inline-flex items-center border border-[rgba(201,162,39,0.24)] px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8]"
              data-cta-id="curated_explore_all_pieces"
              data-cta-label="Explore all pieces"
            >
              Explore all pieces
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
