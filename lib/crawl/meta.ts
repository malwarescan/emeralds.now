import { readFileSync } from "fs";
import { join } from "path";

export type CrawlMeta = {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
};

let cached: Record<string, CrawlMeta> | null = null;

function loadMetaTags(): Record<string, CrawlMeta> {
  if (cached) return cached;
  try {
    const path = join(process.cwd(), "crawl", "seo", "meta_tags.json");
    const raw = readFileSync(path, "utf-8");
    const arr = JSON.parse(raw) as Array<{ product_id: string; meta_title?: string; meta_description?: string; og_title?: string; og_description?: string; og_image?: string }>;
    cached = {};
    for (const row of arr) {
      if (row.product_id) {
        cached[row.product_id] = {
          title: row.meta_title,
          description: row.meta_description,
          og_title: row.og_title,
          og_description: row.og_description,
          og_image: row.og_image,
        };
      }
    }
    return cached;
  } catch {
    cached = {};
    return cached;
  }
}

/** Get crawl meta for a product by id (e.g. MUZEM_001). Used in PDP generateMetadata. */
export function getCrawlMeta(productId: string): CrawlMeta | null {
  const map = loadMetaTags();
  return map[productId] ?? null;
}
