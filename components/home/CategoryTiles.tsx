"use client";

import Link from "next/link";
import { useCinemaScroll } from "@/lib/motion/useCinemaScroll";
import type { CategoryTile } from "@/lib/catalog/types";

const GATEWAY_ORDER = ["rings", "earrings", "pendants", "bracelets", "chains", "one-of-one", "custom"];

function orderTiles(tiles: CategoryTile[]) {
  const bySlug = new Map(tiles.map((tile) => [tile.id, tile]));
  return GATEWAY_ORDER.map((id) => bySlug.get(id)).filter(Boolean).slice(0, 6) as CategoryTile[];
}

function GatewayTile({ tile }: { tile: CategoryTile }) {
  const cinemaRef = useCinemaScroll<HTMLAnchorElement>({ plateMax: 12, fgMax: 7, fade: false });

  return (
    <Link
      ref={cinemaRef}
      href={tile.route}
      className={`category-tile category-tile-row tap-scale cinema card-settle ${tile.id === "custom" ? "category-tile--custom" : ""}`}
      aria-label={`Enter ${tile.title}`}
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

export default function CategoryTiles({ tiles }: { tiles: CategoryTile[] }) {
  const orderedTiles = orderTiles(tiles);

  return (
    <section
      className="bg-[var(--abyssal)] py-9 sm:py-9"
      data-concierge-safe="1"
    >
      <div className="rail space-y-5">
        <div className="space-y-2">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--cream)]/70">
            OUR CREATIONS
          </p>
          <p className="text-sm font-normal leading-snug text-[var(--cream)]/90 sm:text-[0.95rem]">
            Choose a category to enter the collection.
          </p>
          <div className="category-section-divider" aria-hidden />
          <p className="text-[0.67rem] uppercase tracking-[0.12em] text-[var(--cream)]/65">
            Origin verified · Atelier-signed · Insured delivery
          </p>
        </div>
        <div className="mt-5 grid gap-3">
          {orderedTiles.map((tile) => (
            <GatewayTile key={tile.id} tile={tile} />
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/collections/rings"
            className="category-view-all inline-flex items-center border border-[rgba(201,162,39,0.28)] px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[#f5f0e8] transition-colors hover:border-[rgba(201,162,39,0.52)]"
          >
            View all pieces
          </Link>
        </div>
      </div>
    </section>
  );
}
