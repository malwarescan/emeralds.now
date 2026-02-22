# Éméraude Royale — Emeralds.now

Mobile-first “Maison portal” for Muzem Emeralds. Abyssal green + gold hairlines, Stripe checkout, Railway hosting. Catalog source: Muzem (official online distributor).

## Data spine (source of truth)

- **ecommerce/master_catalog.json** — product info, pricing, tags, category, alt text
- **ecommerce/inventory.csv** — sellability (in-stock / reserved / sold)
- **ecommerce/image_mapping.csv** + **public/images/products/** — local product images (use `seo_filename` from CSV)
- **ecommerce/categories.json** — category tiles + tag taxonomy

## Homepage sections (order fixed)

A. Hero Cover (72–78vh) · B. Maison Gateway · C. Our Creations (category tiles) · D. Featured Creations · E. Proof & Expertise · F. Services Bar · G. News (optional) · H. Footer

## Featured products (Option 2)

No `featured` tag in catalog. Ordered list is in **config/featured.ts** — edit `FEATURED_PRODUCT_IDS` to set the 6–10 MUZEM IDs shown in Section D.

## Asset convention (Option A)

**Product images:** Filename = `seo_filename` from `ecommerce/image_mapping.csv`. Store in `public/images/products/{seo_filename}`. See **docs/ASSET_CONVENTION.md**.

**Hero (required for build):**

- `public/images/hero/emeralds-intro.mp4`
- `public/images/hero/emeraldsnow-hero-image.webp`

**Validation:** `npm run validate:assets` checks every hero + product image. `npm run build` runs it automatically; build fails if any required file is missing.

## Run

```bash
npm install
npm run dev
```

Build: `npm run build` · Start: `npm start`

## QA (mobile)

- 320px: no overflow, legible hero, tappable category tiles
- Featured cards: vertical list, 4:5 aspect
- No white flash on navigation; target LCP &lt; 1.5s, CLS near 0

## UI merge protocol (Maison methodology)

### Required: PR = feature + proof pack

All UI PRs must include the Maison Proof Pack in the PR description before merge review:

- 390px: Featured ring
- 390px: Featured earrings
- 390px: Featured section with two consecutive cards
- 320px: Featured view (tightest mobile constraint)
- Desktop: Featured section

No merge without proof attachments and gate checkboxes checked.

### Maison QA gates (hard pass/fail)

- A) Ghost plate regression (no secondary rounded plate or visible duplicate card surface)
- B) Image viewport discipline (56vh max, title + price + spec + View piece visible within one 390px scan)
- C) Subject occupancy consistency (category bias + focal scale only when needed)
- D) Museum mount tone (warm paper matte, restrained vignette)
- E) Typography hierarchy (shortTitle on cards, full title on PDP only, uniform price format)
- F) Concierge collision (dot-only or reposition when overlap risk exists)

### Priority execution sequence after featured lock

1. **Our Creations compaction** (`target: 112px` mobile row tiles, one frame only)
2. **Mount/focal extension to Collections + PDP**
3. **Mobile loupe viewer** (fullscreen, swipe, pinch/zoom, minimal chrome)
