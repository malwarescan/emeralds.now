# Start Here — Crawl Package Integration

**Emeralds.now** (Next.js 16, App Router, headless Shopify) — authorized distributor of Muzem emerald jewelry

Place all crawl output files in this `crawl/` folder. Then follow the steps below.

---

## 30-Second Quick Start

1. **Copy crawl files** → into `crawl/` (this folder).
2. **Copy product images** → from `crawl/raw_images/` to **`public/images/products/`**.
3. **Read** → [DEVELOPER_INTEGRATION_GUIDE.md](./DEVELOPER_INTEGRATION_GUIDE.md) for step-by-step integration.
4. **Track progress** → [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md).

---

## What Goes Where

| You Have | Put It Here |
|----------|-------------|
| All crawl files | `crawl/` (this folder) |
| 132 product images | `crawl/raw_images/` → then copy to `public/images/products/` |
| `product_data.json` | `crawl/product_data.json` |
| SEO / GEO / AEO schemas | `crawl/seo/`, `crawl/geo/`, `crawl/aeo/` |
| Ecommerce imports | `crawl/ecommerce/` |
| Sitemap, meta tags | `crawl/seo/` |

---

## Key Details

| Detail | Value |
|--------|--------|
| Total products | 132 |
| Product IDs | MUZEM_001 to MUZEM_132 |
| Image naming | e.g. `MUZEM_001_18k_Yellow_Gold_Ring_with_...jpg` |
| Price currency | COP (Colombian Peso) |
| This codebase | Next.js 16, App Router, TypeScript, headless Shopify |

---

## Documentation in This Folder

- **README_FIRST.md** (this file) — Start here.
- **MASTER_INDEX.md** — Full index of all crawl assets.
- **DEVELOPER_INTEGRATION_GUIDE.md** — Integration steps for this repo.
- **QUICK_START_CHEATSHEET.md** — Quick code reference.
- **IMPLEMENTATION_CHECKLIST.md** — Printable progress tracker.

---

## Next Step

Open **[DEVELOPER_INTEGRATION_GUIDE.md](./DEVELOPER_INTEGRATION_GUIDE.md)** and follow Phase 1.
