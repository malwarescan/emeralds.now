/**
 * Loads master_catalog.json, joins inventory status, returns normalized products.
 */
import { readFileSync } from "fs";
import path from "path";
import type { CatalogProduct, InventoryRow, NormalizedProduct, SellabilityStatus } from "./types";
import { getLocalImagePath } from "./images";
import { getFocalPoint, getFocalScale, getFocalSubjectRatio } from "./focalPoints";

const CATALOG_PATH = path.join(process.cwd(), "ecommerce", "master_catalog.json");
const INVENTORY_PATH = path.join(process.cwd(), "ecommerce", "inventory.csv");

interface CatalogJson {
  products: CatalogProduct[];
}

let _catalog: CatalogProduct[] | null = null;
let _inventory: Map<string, { available_stock: number; reserved_stock: number; status: string }> | null = null;

function loadCatalog(): CatalogProduct[] {
  if (_catalog) return _catalog;
  const raw = readFileSync(CATALOG_PATH, "utf-8");
  const data: CatalogJson = JSON.parse(raw);
  _catalog = data.products ?? [];
  return _catalog;
}

function parseCSVLine(line: string): string[] {
  const out: string[] = [];
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

function loadInventory(): Map<string, { available_stock: number; reserved_stock: number; status: string }> {
  if (_inventory) return _inventory;
  const raw = readFileSync(INVENTORY_PATH, "utf-8");
  const lines = raw.split("\n").filter(Boolean);
  const header = lines[0].split(",").map((h) => h.trim());
  const productIdIdx = header.indexOf("product_id");
  const availableIdx = header.indexOf("available_stock");
  const reservedIdx = header.indexOf("reserved_stock");
  const statusIdx = header.indexOf("status");
  _inventory = new Map();
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVLine(lines[i]);
    const productId = row[productIdIdx]?.trim();
    if (!productId) continue;
    const available = parseInt(row[availableIdx] ?? "0", 10) || 0;
    const reserved = parseInt(row[reservedIdx] ?? "0", 10) || 0;
    const status = row[statusIdx]?.trim() ?? "";
    _inventory.set(productId, { available_stock: available, reserved_stock: reserved, status });
  }
  return _inventory;
}

function sellability(
  available: number,
  reserved: number,
  status: string
): SellabilityStatus {
  if (available > 0 && status === "Active") return "in-stock";
  if (reserved > 0) return "reserved";
  return "sold";
}

function toHandle(productId: string): string {
  return productId.toLowerCase().replace(/_/g, "-");
}

export function getCatalog(): NormalizedProduct[] {
  const catalog = loadCatalog();
  const inv = loadInventory();
  return catalog.map((p) => {
    const invRow = inv.get(p.product_id);
    const available = invRow?.available_stock ?? 0;
    const reserved = invRow?.reserved_stock ?? 0;
    const status = invRow?.status ?? "";
    const sellabilityStatus = sellability(available, reserved, status);
    const localImagePath = getLocalImagePath(p.product_id);
    const seoFilename = localImagePath ? path.basename(localImagePath) : "";
    const focalPoint = seoFilename ? getFocalPoint(seoFilename) : undefined;
    const focalScale = seoFilename ? getFocalScale(seoFilename) : 1;
    const subjectRatio = seoFilename ? getFocalSubjectRatio(seoFilename) : undefined;
    return {
      ...p,
      handle: toHandle(p.product_id),
      sellability: sellabilityStatus,
      localImagePath,
      focalPoint,
      focalScale,
      subjectRatio,
    };
  });
}

export function getProductByHandle(handle: string): NormalizedProduct | undefined {
  const catalog = getCatalog();
  return catalog.find((p) => p.handle === handle);
}

export function getProductById(id: string): NormalizedProduct | undefined {
  const catalog = getCatalog();
  return catalog.find((p) => p.product_id === id);
}

export function getFeaturedProducts(orderedIds: string[]): NormalizedProduct[] {
  const catalog = getCatalog();
  const byId = new Map(catalog.map((p) => [p.product_id, p]));
  const out: NormalizedProduct[] = [];
  for (const id of orderedIds) {
    const p = byId.get(id);
    if (p) out.push(p);
  }
  return out;
}

const COLLECTION_TO_CATEGORY: Record<string, string> = {
  rings: "Rings",
  earrings: "Earrings",
  pendants: "Pendants",
  bracelets: "Bracelets",
  chains: "Chains",
};

function categoryMatchesHandle(primaryCategory: string | undefined, handle: string): boolean {
  if (!primaryCategory) return false;
  const cat = primaryCategory.toLowerCase().replace(/\s+/g, "-");
  const h = handle.toLowerCase();
  return cat === h || cat.replace(/s+$/, "s") === h;
}

export function getProductsByCollectionHandle(handle: string): NormalizedProduct[] {
  const catalog = getCatalog();
  const category = COLLECTION_TO_CATEGORY[handle.toLowerCase()];
  if (category) {
    return catalog.filter((p) =>
      p.primary_category === category || categoryMatchesHandle(p.primary_category, handle)
    );
  }
  if (handle.toLowerCase() === "one-of-one") {
    return catalog.filter((p) => p.tags?.includes("one-of-one")).slice(0, 24);
  }
  return [];
}
