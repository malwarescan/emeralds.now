#!/usr/bin/env node
/**
 * Copy and rename assets into public/ so they match the required layout.
 * Run from repo root. Requires source files to exist.
 *
 * Usage:
 *   node scripts/copy-assets.js <products_source_dir> [hero_source_dir]
 *
 * Products: copies <products_source_dir>/{basename(local_path)} -> public/images/products/{seo_filename}
 *           for each row in ecommerce/image_mapping.csv.
 * Hero (if hero_source_dir given): copies
 *   hero_source_dir/emeralds-intro.mp4 -> public/images/hero/
 *   hero_source_dir/emeraldsnow-hero-image.webp -> public/images/hero/
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const IMAGE_MAPPING_CSV = path.join(ROOT, "ecommerce", "image_mapping.csv");
const PRODUCTS_DIR = path.join(ROOT, "public", "images", "products");
const HERO_DIR = path.join(ROOT, "public", "images", "hero");

const HERO_FILES = [
  "emeralds-intro.mp4",
  "emeraldsnow-hero-image.webp",
];

function parseCSVLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQuotes = !inQuotes;
    else if (inQuotes) cur += c;
    else if (c === ",") {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out;
}

function readImageMapping() {
  const raw = fs.readFileSync(IMAGE_MAPPING_CSV, "utf-8");
  const lines = raw.split("\n").filter(Boolean);
  const header = lines[0].split(",").map((h) => h.trim());
  const productIdIdx = header.indexOf("product_id");
  const localPathIdx = header.indexOf("local_path");
  const seoIdx = header.indexOf("seo_filename");
  if (productIdIdx === -1 || seoIdx === -1) {
    console.error("image_mapping.csv missing product_id or seo_filename");
    process.exit(1);
  }
  if (localPathIdx === -1) {
    console.error("image_mapping.csv missing local_path column");
    process.exit(1);
  }
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    const productId = row[productIdIdx]?.trim();
    const localPath = row[localPathIdx]?.trim();
    const seoFilename = row[seoIdx]?.trim();
    if (productId && seoFilename && localPath) {
      const sourceBasename = path.basename(localPath);
      rows.push({ product_id: productId, sourceBasename, seo_filename: seoFilename });
    }
  }
  return rows;
}

function main() {
  const productsSource = process.argv[2];
  const heroSource = process.argv[3];

  if (!productsSource) {
    console.error("Usage: node scripts/copy-assets.js <products_source_dir> [hero_source_dir]");
    console.error("  products_source_dir: folder containing product images named like CSV local_path basenames (e.g. MUZEM_001_18k_Yellow_Gold_Ring_....jpg)");
    console.error("  hero_source_dir (optional): folder containing emeralds-intro.mp4 and emeraldsnow-hero-image.webp");
    process.exit(1);
  }

  if (!fs.existsSync(productsSource)) {
    console.error("Products source dir not found:", productsSource);
    process.exit(1);
  }

  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  fs.mkdirSync(HERO_DIR, { recursive: true });

  const rows = readImageMapping();
  let copied = 0;
  let skipped = 0;
  const missing = [];

  for (const row of rows) {
    const src = path.join(productsSource, row.sourceBasename);
    const dest = path.join(PRODUCTS_DIR, row.seo_filename);
    if (!fs.existsSync(src)) {
      missing.push({ product_id: row.product_id, expected: row.sourceBasename });
      continue;
    }
    fs.copyFileSync(src, dest);
    copied++;
  }

  if (missing.length) {
    console.error("Missing in source dir (first 10):");
    missing.slice(0, 10).forEach((m) => console.error("  ", m.product_id, m.expected));
    if (missing.length > 10) console.error("  ... and", missing.length - 10, "more");
  }

  console.log("Products: copied", copied, "to public/images/products/");
  if (missing.length) console.log("Products: missing", missing.length, "in source (fix and re-run)");

  if (heroSource) {
    if (!fs.existsSync(heroSource)) {
      console.error("Hero source dir not found:", heroSource);
      process.exit(1);
    }
    for (const name of HERO_FILES) {
      const src = path.join(heroSource, name);
      const dest = path.join(HERO_DIR, name);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log("Hero: copied", name);
      } else {
        console.error("Hero: missing in source:", name);
      }
    }
  }

  console.log("\nRun: npm run validate:assets");
}

main();
