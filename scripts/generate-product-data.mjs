#!/usr/bin/env node
/**
 * Generates crawl/product_data.json from crawl/product_inventory.csv.
 * Run: node scripts/generate-product-data.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const csvPath = join(root, "crawl", "product_inventory.csv");
const outPath = join(root, "crawl", "product_data.json");

function parsePrice(s) {
  if (s == null || s === "") return 0;
  const n = String(s).replace(/\D/g, "");
  return parseInt(n, 10) || 0;
}

const raw = readFileSync(csvPath, "utf-8");
const lines = raw.split(/\r?\n/).filter((line) => line.trim());
const header = lines[0].split(",");
const rows = lines.slice(1);

const products = rows.map((line) => {
  const parts = line.split(",");
  if (parts.length < 13) return null;
  const product_id = parts[0].trim();
  const seo_filename = parts[10]?.trim() ?? "";
  const category = parts[4]?.trim() ?? "all";
  const title = parts.length > 13 ? parts.slice(1, parts.length - 11).join(",").trim() : (parts[1] ?? "").trim();
  const regular_price = parts.length > 13 ? parts[parts.length - 7] : parts[5];
  return {
    id: product_id,
    handle: product_id.toLowerCase().replace(/_/g, "-"),
    title: title || product_id,
    description: `${title}. Certified Colombian emerald.`,
    price: parsePrice(regular_price),
    currency: "COP",
    image: seo_filename,
    category,
    collection: category,
  };
}).filter(Boolean);

writeFileSync(outPath, JSON.stringify(products, null, 2), "utf-8");
console.log(`Wrote ${products.length} products to crawl/product_data.json`);
