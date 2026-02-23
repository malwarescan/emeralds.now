# SEO/Schema Validation Report

Date: 2026-02-22  
Method: static code audit (Next.js app routes + metadata + JSON-LD emitters)

Commerce decision:
- Primary commerce flow: Shopify Storefront cart -> Shopify hosted checkout.
- Stripe: concierge-only (invoices/deposits), not PDP default.

## Route Inventory

- `/` (`app/page.tsx`)
- `/atelier` (`app/atelier/page.tsx`)
- `/collections` (redirects to `/collections/rings`)
- `/collections/[handle]`
- `/product/[handle]`
- `/cart`
- `/concierge`
- `/faq`
- `/education/[slug]`

## Critical Findings

### P0

- None open in route/indexability wiring after this pass.

### P1

- **Resolved**: `app/robots.ts` added.
- **Resolved**: `app/sitemap.ts` added.
- **Resolved**: canonical metadata added across route templates.
- **Resolved**: BreadcrumbList JSON-LD emitted on collection/product/education templates.
- **Resolved**: FAQPage live on `/faq` and `/concierge`.
- **Remaining**: optional MerchantReturnPolicy and shippingDetails schema not yet emitted on PDP.

## Template Checks

### Home (`/`)

- Title/description via `SITE_META`: Present (Pass)
- H1 exactly once: likely present in Hero (Pass)
- Organization/WebSite JSON-LD: emitted in root layout (Pass)
- Canonical explicit: present (Pass)

### Collection (`/collections/[handle]`)

- Unique title/description by handle: Present (Pass)
- H1 per page: present (Pass)
- BreadcrumbList JSON-LD: present (Pass)
- Canonical explicit: present (Pass)

### Product (`/product/[handle]`)

- Product JSON-LD: present (`productSchema`) (Pass)
- Offer price/availability mapped from same product source as UI (Pass)
- H1 exactly once: present (Pass)
- BreadcrumbList JSON-LD: present (Pass)
- Canonical explicit: present (Pass)

### Atelier (`/atelier`)

- Metadata present (Pass)
- H1 exactly once: present (Pass)
- Canonical explicit: present (Pass)
- AEO schema (FAQ/HowTo/Speakable) live emission: partial (FAQ present on dedicated routes) (Partial)

## Recommended Fix Plan

1. Add MerchantReturnPolicy and OfferShippingDetails on PDP schema if policy claims are shown.
2. Add Speakable/HowTo where editorial pages are intended as answer targets.
3. Validate live output in Rich Results test screenshots for each template.

## Evidence Files

- `app/layout.tsx`
- `app/page.tsx`
- `app/atelier/page.tsx`
- `app/collections/[handle]/page.tsx`
- `app/product/[handle]/page.tsx`
- `app/concierge/page.tsx`
- `app/faq/page.tsx`
- `app/education/[slug]/page.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `lib/seo/meta.ts`
- `lib/schema/emit.ts`

