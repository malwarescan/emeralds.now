/**
 * Category tiles for Section C (Our Creations). From categories.json + fixed routes.
 */
import { readFileSync } from "fs";
import path from "path";
import type { CategoryTile } from "./types";

const CATEGORIES_PATH = path.join(process.cwd(), "ecommerce", "categories.json");

interface CategoriesJson {
  taxonomy?: {
    Jewelry?: {
      subcategories?: Record<
        string,
        { id: string; slug: string; description: string }
      >;
    };
  };
}

const SPEC_ROUTES: Record<string, string> = {
  Rings: "/collections/rings",
  Earrings: "/collections/earrings",
  Pendants: "/collections/pendants",
  Bracelets: "/collections/bracelets",
  Chains: "/collections/chains",
  "One-of-One": "/collections/one-of-one",
  Custom: "/concierge",
};

const SPEC_DESCRIPTORS: Record<string, string> = {
  Rings: "Certified Colombian emerald rings in gold, silver, and platinum.",
  Earrings: "Earrings in gold and silver with natural and carved emeralds.",
  Pendants: "Pendants and necklaces featuring Colombian emeralds.",
  Bracelets: "Emerald bracelets in gold and silver.",
  Chains: "Gold and silver chains to pair with your pieces.",
  "One-of-One": "Unique pieces, each one singular in the world.",
  Custom: "Speak with an artisan for bespoke commissions.",
};

let _tiles: CategoryTile[] | null = null;

export function getCategoryTiles(): CategoryTile[] {
  if (_tiles) return _tiles;
  let order = [
    "Rings",
    "Earrings",
    "Pendants",
    "Bracelets",
    "Chains",
    "One-of-One",
    "Custom",
  ];
  let descMap: Record<string, string> = { ...SPEC_DESCRIPTORS };
  try {
    const raw = readFileSync(CATEGORIES_PATH, "utf-8");
    const data: CategoriesJson = JSON.parse(raw);
    const sub = data.taxonomy?.Jewelry?.subcategories ?? {};
    const fromJson = Object.keys(sub).filter(
      (k) => SPEC_ROUTES[k] || ["Rings", "Earrings", "Pendants", "Bracelets", "Chains"].includes(k)
    );
    if (fromJson.length) {
      order = [...fromJson, "One-of-One", "Custom"];
    }
    for (const k of Object.keys(sub)) {
      if (sub[k].description) descMap[k] = sub[k].description;
    }
  } catch {
    // use default order and SPEC_DESCRIPTORS
  }
  _tiles = order.map((title) => ({
    id: title.toLowerCase().replace(/\s+/g, "-"),
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    title,
    description: descMap[title] ?? "Explore our collection.",
    route: SPEC_ROUTES[title] ?? `/collections/${title.toLowerCase().replace(/\s+/g, "-")}`,
  }));
  return _tiles;
}
