import { readFileSync } from "fs";
import { join } from "path";

export type CrawlProduct = {
  id: string;
  handle?: string;
  title: string;
  description?: string;
  price?: number;
  currency?: string;
  image?: string;
  images?: string[];
  collection?: string;
  category?: string;
  [key: string]: unknown;
};

let cached: CrawlProduct[] | null = null;

function loadCrawlData(): CrawlProduct[] {
  if (cached) return cached;
  try {
    const path = join(process.cwd(), "crawl", "product_data.json");
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw) as CrawlProduct[];
    cached = Array.isArray(data) ? data : [];
    return cached;
  } catch {
    cached = [];
    return [];
  }
}

function toHandle(product: CrawlProduct): string {
  if (product.handle) return product.handle;
  return product.id.toLowerCase().replace(/_/g, "-");
}

/** All products from crawl/product_data.json */
export function getCrawlProducts(): CrawlProduct[] {
  return loadCrawlData();
}

/** Single product by handle or id (e.g. muzem-001) */
export function getCrawlProductByHandle(handle: string): (CrawlProduct & { handle: string }) | null {
  const products = loadCrawlData();
  const normalized = handle.toLowerCase().replace(/_/g, "-");
  const found = products.find(
    (p) => toHandle(p) === normalized || p.id.toLowerCase().replace(/_/g, "-") === normalized
  );
  if (!found) return null;
  return { ...found, handle: toHandle(found) };
}

/** Collection handles: from product collection/category or ["all"] */
export function getCrawlCollectionHandles(): string[] {
  const products = loadCrawlData();
  if (!products.length) return [];
  const set = new Set<string>();
  for (const p of products) {
    const c = (p.collection ?? p.category ?? "all") as string;
    set.add(String(c).toLowerCase().replace(/\s+/g, "-"));
  }
  const list = Array.from(set);
  return list.length ? list : ["all"];
}

/** Products in a collection (or all if handle is "all") */
export function getCrawlCollectionByHandle(handle: string): {
  title: string;
  description?: string;
  products: Array<{
    id: string;
    handle: string;
    title: string;
    price?: number;
    currency?: string;
    image?: string;
  }>;
} | null {
  const products = loadCrawlData();
  if (!products.length) return null;
  const normalized = handle.toLowerCase().replace(/_/g, "-");
  const filtered =
    normalized === "all"
      ? products
      : products.filter((p) => {
          const c = (p.collection ?? p.category ?? "all") as string;
          return String(c).toLowerCase().replace(/\s+/g, "-") === normalized;
        });
  const title = normalized === "all" ? "All pieces" : handle.replace(/-/g, " ");
  return {
    title,
    products: filtered.map((p) => ({
      id: p.id,
      handle: toHandle(p),
      title: p.title,
      price: p.price,
      currency: p.currency,
      image: p.image ?? p.images?.[0],
    })),
  };
}

/** Image URL for crawl product (served from public/images/products/) */
export function crawlProductImageUrl(filename: string): string {
  if (!filename) return "";
  if (filename.startsWith("http")) return filename;
  return `/images/products/${filename.replace(/^\/+/, "")}`;
}
