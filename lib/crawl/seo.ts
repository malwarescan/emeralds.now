import { readFileSync } from "fs";
import { join } from "path";

type ProductSchema = Record<string, unknown> & { sku?: string };

let cachedGraph: ProductSchema[] | null = null;

function loadProductSchemas(): ProductSchema[] {
  if (cachedGraph) return cachedGraph;
  try {
    const path = join(process.cwd(), "crawl", "seo_schema.json");
    const raw = readFileSync(path, "utf-8");
    const data = JSON.parse(raw) as { product_schemas?: { "@graph"?: ProductSchema[] } };
    const graph = data?.product_schemas?.["@graph"];
    cachedGraph = Array.isArray(graph) ? graph : [];
    return cachedGraph;
  } catch {
    cachedGraph = [];
    return cachedGraph;
  }
}

/** Rewrite schema object URLs from crawl domain to our base (and product path when provided). */
function rewriteSchemaUrls(obj: unknown, base: string, productPath?: string): unknown {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") {
    if (productPath && obj.includes("muzem.co") && (obj.includes("/shop/") || obj.includes("/en/shop/"))) return `${base}${productPath}`;
    return obj.replace(/https:\/\/muzem\.co\/?/g, base.endsWith("/") ? base : `${base}/`);
  }
  if (Array.isArray(obj)) return obj.map((item) => rewriteSchemaUrls(item, base, productPath));
  if (typeof obj === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === "@id" && typeof v === "string" && productPath && v.includes("#product")) out[k] = `${base}${productPath}#product`;
      else if (k === "url" && typeof v === "string" && productPath && v.includes("muzem.co")) out[k] = `${base}${productPath}`;
      else out[k] = rewriteSchemaUrls(v, base, productPath);
    }
    return out;
  }
  return obj;
}

/** Get crawl Product JSON-LD for a product by id (e.g. MUZEM_001). Returns schema with URLs rewritten to base. */
export function getCrawlProductSchema(
  productId: string,
  base: string,
  productPath?: string
): Record<string, unknown> | null {
  const graph = loadProductSchemas();
  const product = graph.find((p) => (p.sku as string) === productId);
  if (!product) return null;
  const rewritten = rewriteSchemaUrls(JSON.parse(JSON.stringify(product)), base, productPath) as Record<string, unknown>;
  return rewritten;
}
