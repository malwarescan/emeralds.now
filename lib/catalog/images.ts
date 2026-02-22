/**
 * Maps MUZEM product_id → local image path under /images/products/
 * Uses image_mapping.csv seo_filename.
 */
import { readFileSync } from "fs";
import path from "path";

const IMAGE_MAPPING_PATH = path.join(
  process.cwd(),
  "ecommerce",
  "image_mapping.csv"
);

let _map: Map<string, string> | null = null;

function parseImageMapping(): Map<string, string> {
  if (_map) return _map;
  const raw = readFileSync(IMAGE_MAPPING_PATH, "utf-8");
  const lines = raw.split("\n").filter(Boolean);
  const header = lines[0].split(",").map((h) => h.trim());
  const idIdx = header.indexOf("product_id");
  const seoIdx = header.indexOf("seo_filename");
  if (idIdx === -1 || seoIdx === -1) {
    _map = new Map();
    return _map;
  }
  _map = new Map();
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    const productId = row[idIdx]?.trim();
    const seoFilename = row[seoIdx]?.trim();
    if (productId && seoFilename) _map.set(productId, `/images/products/${seoFilename}`);
  }
  return _map;
}

function parseCSVLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (inQuotes) {
      cur += c;
    } else if (c === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

export function getLocalImagePath(productId: string): string | undefined {
  return parseImageMapping().get(productId);
}
