# Quick Start Cheatsheet — Crawl Integration

## One-time setup

```bash
# 1. Copy crawl package into project
#    → all files into crawl/

# 2. Copy product images to web-visible path
cp -r crawl/raw_images/* public/images/products/
```

## Paths

| Use | Path |
|-----|------|
| Crawl root | `crawl/` |
| Product images (source) | `crawl/raw_images/` |
| Product images (live) | `public/images/products/` |
| Product data JSON | `crawl/product_data.json` |
| SEO schemas | `crawl/seo/` |
| GEO schemas | `crawl/geo/` |
| AEO (FAQ) | `crawl/aeo/` |
| Ecommerce imports | `crawl/ecommerce/` |

## This repo

| Item | Location |
|------|----------|
| Product page | `app/product/[handle]/page.tsx` |
| Collection page | `app/collections/[handle]/page.tsx` |
| Shopify client | `lib/shopify/client.ts` |
| Schema emit | `lib/schema/emit.ts` |
| Next.js image | `next/image` → `src="/images/products/...jpg"` |

## Product IDs

- **Range:** MUZEM_001 … MUZEM_132  
- **Count:** 132 products  
- **Currency:** COP (Colombian Peso)

## Docs

- Start: [README_FIRST.md](./README_FIRST.md)
- Full steps: [DEVELOPER_INTEGRATION_GUIDE.md](./DEVELOPER_INTEGRATION_GUIDE.md)
- Progress: [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)
