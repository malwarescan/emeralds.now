export interface CatalogProduct {
  product_id: string;
  sku: string;
  title: string;
  title_es?: string;
  description: string;
  jewelry_type: string;
  material: string;
  emerald_type?: string;
  regular_price_usd: number;
  sale_price_usd: number;
  regular_price_cop?: number;
  sale_price_cop?: number;
  currency_usd: string;
  stock_status: string;
  quantity: number;
  primary_category: string;
  tags: string;
  image_url: string;
  alt_text: string;
  meta_title?: string;
  meta_description?: string;
  brand: string;
  origin?: string;
  certification?: string;
  warranty?: string;
}

export interface InventoryRow {
  sku: string;
  product_id: string;
  current_stock: number;
  reserved_stock: number;
  available_stock: number;
  status: string;
}

export type SellabilityStatus = "in-stock" | "reserved" | "sold";

export interface FocalPoint {
  focusX: number;
  focusY: number;
}

export interface NormalizedProduct extends CatalogProduct {
  handle: string;
  sellability: SellabilityStatus;
  localImagePath?: string;
  /** Computed focal point for object-position (Option A auto-centering). */
  focalPoint?: FocalPoint;
  /**
   * Per-product minimum scale to avoid tiny subject framing (auto-generated from detection report).
   */
  focalScale?: number;
  /** Optional subject ratio metadata from focal-point detection (for tuning scale behavior). */
  subjectRatio?: number;
}

export interface CategoryTile {
  id: string;
  slug: string;
  title: string;
  description: string;
  route: string;
}
