# Bug Bash Log

Date started: 2026-02-22  
Scope: MASTER QA SPEC (luxury UX/UI + functional + SEO/AEO/GEO)

## P0

- [ ] `P0-001` Broken concierge route (`/concierge`) used by multiple CTAs
  - Status: Open
  - Impact: dead-end from high-intent actions
  - Files linking to broken route:
    - `components/concierge/ConciergeLiveDot.tsx`
    - `components/product/StickyAcquireBar.tsx`
    - `app/atelier/page.tsx`
    - `components/layout/SiteFooter.tsx`
    - `lib/catalog/categories.ts` (custom tile route)
  - Fix owner: Web/CRM

- [ ] `P0-002` Acquire CTA points to missing `/cart` route
  - Status: Open
  - Impact: purchase path broken from PDP
  - File: `components/product/StickyAcquireBar.tsx`
  - Fix owner: Web/Commerce

## P1

- [ ] `P1-001` Missing `app/robots.ts`
- [ ] `P1-002` Missing `app/sitemap.ts`
- [ ] `P1-003` Canonical tags not explicitly set per page
- [ ] `P1-004` Breadcrumb schema helper not emitted in route templates
- [ ] `P1-005` Footer/home education links target missing routes
- [ ] `P1-006` FAQ link points to missing `/faq`
- [ ] `P1-007` CTA analytics event map not implemented

## P2

- [ ] `P2-001` Standardized focus-visible ring token not enforced globally
- [ ] `P2-002` Manual visual QA matrix pending (Chrome/Safari/iOS/Android, Fast 3G)

## P3

- [ ] `P3-001` CTA verb consistency review pass pending final copy freeze

