#!/usr/bin/env node
/**
 * Asset validator for emeralds.now
 * Option A: seo_filename is the canonical filename in public/images/products/
 * Exit 1 if any: missing files, duplicates (same seo_filename for multiple product_id), or extension mismatches.
 * Required for merge: exit 0, Missing = 0, Duplicates = 0, Extension mismatches = 0.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const IMAGE_MAPPING_CSV = path.join(ROOT, "ecommerce", "image_mapping.csv");
const PRODUCTS_DIR = path.join(ROOT, "public", "images", "products");
const HERO_DIR = path.join(ROOT, "public", "images", "hero");

const HERO_ASSETS = [
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
  const seoIdx = header.indexOf("seo_filename");
  if (productIdIdx === -1 || seoIdx === -1) {
    console.error("image_mapping.csv missing product_id or seo_filename column");
    process.exit(1);
  }
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    const productId = row[productIdIdx]?.trim();
    const seoFilename = row[seoIdx]?.trim();
    if (productId && seoFilename) rows.push({ product_id: productId, seo_filename: seoFilename });
  }
  return rows;
}

function main() {
  console.log("validate-assets: checking hero + product images (Option A: seo_filename = filename)\n");

  const missing = [];
  const duplicates = [];
  const extensionMismatches = [];

  // 1. Hero assets
  for (const name of HERO_ASSETS) {
    const p = path.join(HERO_DIR, name);
    if (!fs.existsSync(p)) missing.push({ path: `public/images/hero/${name}`, type: "hero" });
  }

  // 2. Product images from CSV
  const rows = readImageMapping();
  const bySeo = new Map();
  for (const row of rows) {
    const expectedPath = path.join(PRODUCTS_DIR, row.seo_filename);
    const exists = fs.existsSync(expectedPath);
    if (!exists) {
      const ext = path.extname(row.seo_filename).toLowerCase();
      const base = path.basename(row.seo_filename, path.extname(row.seo_filename));
      const altExts = [".jpg", ".jpeg", ".webp", ".png"];
      let foundAlt = null;
      for (const e of altExts) {
        if (e === ext) continue;
        const altPath = path.join(PRODUCTS_DIR, base + e);
        if (fs.existsSync(altPath)) {
          foundAlt = e;
          break;
        }
      }
      if (foundAlt) {
        extensionMismatches.push({
          product_id: row.product_id,
          expected: row.seo_filename,
          found: base + foundAlt,
        });
      } else {
        missing.push({ path: `public/images/products/${row.seo_filename}`, type: "product", product_id: row.product_id });
      }
    }

    if (!bySeo.has(row.seo_filename)) bySeo.set(row.seo_filename, []);
    bySeo.get(row.seo_filename).push(row.product_id);
  }

  for (const [filename, ids] of bySeo) {
    if (ids.length > 1) duplicates.push({ seo_filename: filename, product_ids: ids });
  }

  // Report
  if (missing.length) {
    console.error("Missing files:");
    missing.forEach((m) => console.error("  -", m.path, m.product_id ? `(${m.product_id})` : ""));
    console.error("");
  }
  if (duplicates.length) {
    console.warn("Duplicates (same seo_filename for multiple product_ids):");
    duplicates.forEach((d) => console.warn("  -", d.seo_filename, "->", d.product_ids.join(", ")));
    console.warn("");
  }
  if (extensionMismatches.length) {
    console.warn("Extension mismatches (expected vs found on disk):");
    extensionMismatches.forEach((e) => console.warn("  -", e.product_id, "expected", e.expected, "found", e.found));
    console.warn("");
  }

  const missingCount = missing.length;
  const dupCount = duplicates.length;
  const extCount = extensionMismatches.length;

  console.log("--- Summary ---");
  console.log("Missing:", missingCount);
  console.log("Duplicates:", dupCount);
  console.log("Extension mismatches:", extCount);

  const ok = missingCount === 0 && dupCount === 0 && extCount === 0;
  if (ok) {
    console.log("\nOK: All hero assets and", rows.length, "product images present. Missing = 0, Duplicates = 0, Extension mismatches = 0.");
  } else {
    console.error("\nFAIL: Fix filenames until validator passes. Do not work around.");
    if (missingCount) console.error("  Missing:", missingCount);
    if (dupCount) console.error("  Duplicates:", dupCount);
    if (extCount) console.error("  Extension mismatches:", extCount);
    process.exit(1);
  }
}

main();
