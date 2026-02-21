# Developer Integration Guide — Emeralds.now

This guide is **specific to this repo**: Next.js 16 (App Router), TypeScript, headless Shopify, `public/images/products/`, and `lib/schema/`.

---

## Prerequisites

- All crawl files placed in `crawl/` as per [README_FIRST.md](./README_FIRST.md).
- Node 20+, `npm install --legacy-peer-deps` already run.

---

## Phase 1: Setup (~30 min)

### 1.1 Copy product images

```bash
# From project root
cp -r crawl/raw_images/* public/images/products/
```

- **Source:** `crawl/raw_images/` (132 JPGs).
- **Target:** `public/images/products/` (served at `/images/products/...`).
- Use `next/image` with `src="/images/products/MUZEM_001_....jpg"` (or Cloudinary later).

### 1.2 Product data in this codebase

- **Option A — Headless Shopify:** Import `crawl/ecommerce/shopify_import.csv` into Shopify, then keep using `lib/shopify/client.ts` (getProductByHandle, getCollectionByHandle). Product handles/slugs should match or be mapped from MUZEM_001-style IDs.
- **Option B — Static/JSON:** Place `crawl/product_data.json` (or a transformed version) under `data/` or `crawl/` and load it in Server Components or API routes. Create a small helper (e.g. `lib/products/loadFromCrawl.ts`) that reads the JSON and returns products by id or handle.

### 1.3 Verify

- [ ] 132 images exist in `public/images/products/`.
- [ ] Product data (Shopify or JSON) is loadable and has 132 items.

---

## Phase 2: Product pages (~2 hours)

### 2.1 Routes (already in repo)

- **Collection list:** `app/collections/page.tsx`
- **Collection by handle:** `app/collections/[handle]/page.tsx`
- **Product by handle:** `app/product/[handle]/page.tsx`

### 2.2 Using crawl images on PDP

- In `app/product/[handle]/page.tsx`, product images come from Shopify or your JSON. To use **crawl images** instead (or as fallback), map product id/handle to filename, e.g.:

  - If handle is `muzem-001-...`: image path `/images/products/MUZEM_001_18k_Yellow_Gold_Ring_with_....jpg`.
  - Add a helper that maps `handle` or `productId` → `public/images/products/<filename>` and pass to `PdpGallery` or `next/image`.

- **LCP:** Keep hero image `priority`, use `sizes` and `fill` or explicit width/height to avoid CLS.

### 2.3 Collections

- Ensure collection handles in the app match Shopify (or your JSON) after import. Use `getAllCollectionHandles()` and `getCollectionByHandle(handle)` from `lib/shopify/client.ts` if using Shopify.

---

## Phase 3: SEO (~1.5 hours)

### 3.1 JSON-LD (this repo)

- **Existing:** `lib/schema/emit.ts` and `lib/schema/types.ts` emit Organization, WebSite, WebPage, BreadcrumbList, Product, Offer, etc.
- **Crawl schemas:** You have `crawl/seo/product_schemas.jsonld`, `crawl/geo/organization_schema.jsonld`, `crawl/geo/localbusiness_schema.jsonld`, `crawl/aeo/faq_schema.jsonld`.
- **Integration:** Either (a) merge crawl JSON-LD into the existing `@graph` in layout/product/collection pages, or (b) inject crawl schema files as static `<script type="application/ld+json">` where appropriate. Prefer keeping a single `@graph` per page and merging in crawl product/org/FAQ when available.

### 3.2 Sitemap

- **Crawl:** `crawl/seo/sitemap.xml` (138 URLs).
- **Next.js:** You can use `app/sitemap.ts` to generate sitemap from Shopify + static routes, or replace/merge with crawl sitemap at build time (e.g. copy into `public/sitemap.xml` or output from a route).

### 3.3 Meta tags

- Use `crawl/seo/meta_tags.csv` to set `metadataBase`, `title`, `description` per page (e.g. in `generateMetadata` in product/collection pages).

---

## Phase 4: Ecommerce (~2 hours)

- **Cart/checkout:** This repo is headless; checkout is typically via Shopify Checkout (link to Shopify cart/checkout or use Storefront API).
- **Imports:** Use `crawl/ecommerce/shopify_import.csv` for Shopify; other files for other platforms if needed.
- **Prices:** Crawl data uses COP; ensure display/checkout currency is configured (Shopify markets or multi-currency if required).

---

## Paths quick reference

| What | Path in repo |
|------|------------------|
| Product images (live) | `public/images/products/` |
| Crawl images (source) | `crawl/raw_images/` |
| Product data (crawl) | `crawl/product_data.json` |
| Schema emission | `lib/schema/emit.ts` |
| Shopify client | `lib/shopify/client.ts` |
| PDP component | `app/product/[handle]/page.tsx` |
| Collection page | `app/collections/[handle]/page.tsx` |

---

## Total time (estimate)

- Phase 1: ~30 min  
- Phase 2: ~2 hours  
- Phase 3: ~1.5 hours  
- Phase 4: ~2 hours  
- **Total:** ~6 hours for full integration.

For a quick code reference, use [QUICK_START_CHEATSHEET.md](./QUICK_START_CHEATSHEET.md). For progress tracking, use [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md).
