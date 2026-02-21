# Implementation Checklist — Crawl Package

Use this to track integration progress. **~6 hours** total estimate.

---

## Phase 1: Setup (~30 min)

- [ ] All crawl files copied into `crawl/`
- [ ] 132 images copied from `crawl/raw_images/` to `public/images/products/`
- [ ] Product data available: Shopify import **or** `crawl/product_data.json` (or both)
- [ ] Verified: 132 products loadable (API or static JSON)

---

## Phase 2: Product pages (~2 hours)

- [ ] Collection list shows expected collections
- [ ] Collection page shows products with correct images
- [ ] Product detail page (PDP) shows:
  - [ ] Title, price, description
  - [ ] Primary image from `public/images/products/` (or Cloudinary)
  - [ ] No layout shift (explicit image dimensions or fill + min-height)
- [ ] Mapping: product handle/ID → crawl image filename (e.g. MUZEM_001_...)
- [ ] LCP on PDP: hero image priority, stable dimensions

---

## Phase 3: SEO (~1.5 hours)

- [ ] Product JSON-LD on PDP (from `lib/schema/emit.ts` or crawl `seo/product_schemas.jsonld`)
- [ ] Organization / WebSite schema in layout or key pages
- [ ] GEO (organization, local business) merged or injected where needed
- [ ] AEO FAQ schema (from `crawl/aeo/faq_schema.jsonld`) on FAQ page or layout
- [ ] Sitemap: `crawl/seo/sitemap.xml` or generated `app/sitemap.ts`
- [ ] Meta tags: titles/descriptions from `crawl/seo/meta_tags.csv` applied per page

---

## Phase 4: Ecommerce (~2 hours)

- [ ] Shopify (or chosen platform) import done from `crawl/ecommerce/`
- [ ] Cart/checkout path clear (e.g. Shopify Checkout link)
- [ ] Currency (COP) and display/checkout behavior confirmed
- [ ] 132 products available and purchasable (or “Contact / Concierge” flow)

---

## Final checks

- [ ] No broken product or collection links
- [ ] All 132 product images load (no 404s)
- [ ] Schema validates (e.g. Rich Results Test / Search Console)
- [ ] LCP/CLS/INP acceptable on mobile (e.g. LCP < 1.5s target)

---

**Completed by:** _______________  
**Date:** _______________
