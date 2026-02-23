# Page-by-Page QA Checklist (from MASTER QA SPEC)

Checkout model evidence:
- Canonical decision locked: **Shopify Storefront cart -> Shopify hosted checkout**.
- Stripe is secondary only (concierge invoices/deposits), not PDP default.
- Cart flow implemented at `/cart` with Shopify cart operations via `/api/cart`.

## `/` Home

### Expected CTA destinations

- Hero: `Enter the collection` -> `/collections`
- Butterfly: `Discover the Atelier` -> `/atelier`
- Muzem section: `Enter the Atelier` -> `/atelier`
- Curated: category tiles -> `/collections/[handle]` (custom tile currently `/concierge`)
- Curated: `Explore all pieces` -> `/collections`
- Floating concierge pill -> `/concierge`

### Expected schema blocks

- Organization JSON-LD (global)
- WebSite JSON-LD (global)
- Optional: FAQPage (if answer-first block added)

## `/collections` (redirect)

### Expected behavior

- 307/308 redirect to canonical collection (`/collections/rings`) without chain.

### Expected schema blocks

- WebPage metadata + canonical for destination route.

## `/collections/[handle]`

### Expected CTA destinations

- Back link `Home` -> `/`
- Product card `View piece` -> `/product/[handle]`

### Expected schema blocks

- BreadcrumbList (`Home > Collections > [Handle]`)
- Collection page metadata with canonical and OG URL.

## `/product/[handle]`

### Expected CTA destinations

- Back link `Collection` -> canonical source collection or `/collections/rings`
- Sticky `Acquire` -> valid cart/checkout entry
- Sticky concierge icon -> `/concierge`

### Expected schema blocks

- Product JSON-LD (name, image, offer, priceCurrency, availability, URL)
- BreadcrumbList (`Home > Collection > Product`)
- Merchant return/shipping details if claimed in UI content

## `/atelier`

### Expected CTA destinations

- Back link `Home` -> `/`
- `Speak with Concierge` -> `/concierge`

### Expected schema blocks

- WebPage metadata + canonical
- FAQPage/HowTo blocks for provenance, shipping, authenticity if used as answer source

## Linked routes validation

- `/concierge` (implemented)
- `/faq` (implemented)
- `/education/how-to-verify-colombian-emerald` (implemented)
- `/education/emerald-treatments-explained` (implemented)
- `/education/emerald-care-guide` (implemented)
- `/cart` (implemented as Shopify cart bridge)

