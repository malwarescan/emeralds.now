# emeralds.now QA Master Table

Scope: code-level QA against MASTER QA SPEC (pass/fail).  
Date: 2026-02-22  
Owner: Web engineering

| Page | Element | Expected Behavior | Actual | Pass/Fail | Priority (P0-P3) | Screenshot/clip | Owner | Fix notes |
|---|---|---|---|---|---|---|---|---|
| Global | Concierge CTA links (`/concierge`) | Route exists and loads concierge lead capture experience | No `app/concierge/page.tsx`; links resolve to 404 | Fail | P0 | Pending | Web | Create canonical concierge route and connect all concierge CTAs |
| Product | `Acquire` CTA in sticky bar | Adds item to cart and opens valid cart flow | Links to `/cart?add=...`; no `app/cart/page.tsx` found | Fail | P0 | Pending | Web/Commerce | Implement cart route or route to hosted checkout/cart endpoint |
| Product | Request availability CTA | Valid fallback when product unavailable | Fallback target is `/concierge` (currently missing) | Fail | P0 | Pending | Web/CRM | Fix after concierge route exists |
| Footer/Home | Education links (`/education/*`) | Routes exist and render content pages | No `app/education/*` pages found | Fail | P1 | Pending | Content/Web | Build pages or remove links |
| Footer | FAQ link (`/faq`) | FAQ page exists, indexable, supports AEO | No `app/faq/page.tsx` found | Fail | P1 | Pending | Content/Web | Build FAQ route + FAQ schema |
| Global | Robots policy | Robots config should be explicit for production | No `app/robots.ts` | Fail | P1 | N/A | SEO | Add robots generation with env gating |
| Global | Sitemap | Sitemap includes canonical indexable routes | No `app/sitemap.ts` | Fail | P1 | N/A | SEO | Add sitemap generator |
| Product/Collection/Atelier | Canonical tags | Each indexable page has canonical URL | No canonical in page metadata (`alternates.canonical`) | Fail | P1 | N/A | SEO | Add canonical for each route template |
| Product pages | Breadcrumb schema | Product templates emit BreadcrumbList | `breadcrumbSchema` helper exists but unused in routes | Fail | P1 | Pending | SEO/Web | Emit breadcrumb JSON-LD per page |
| Product pages | Offer consistency | JSON-LD price/availability should match visible UI | Product schema uses same source fields as UI in PDP | Pass | P0 | N/A | Web | Keep single source of truth for price and availability |
| Product pages | H1 uniqueness | Exactly one H1 aligned with intent | PDP has one H1 (`product.title`) | Pass | P2 | N/A | Web | Keep |
| Home/Product | CTA analytics | Stable analytics event names for key CTAs | No explicit CTA analytics instrumentation found | Fail | P1 | N/A | Analytics | Add event map + instrumentation without PII |
| Buttons (global) | Disabled/loading states for async CTA | Async actions show disabled/loading and prevent double fire | No cart mutation button flow; link-only pattern has no loading state | Fail | P1 | Pending | Web/Commerce | Move to action button with pending state in commerce flow |
| Accessibility | Focus-visible consistency | All interactive elements have visible focus style | Relies mostly on browser default; no consistent focus utility | Partial | P2 | Pending | Web/Design | Define global focus ring token and apply |
| Motion | Reduced motion behavior | Animation/parallax disabled for `prefers-reduced-motion` | `RouteTransition` and cinema hook both gate reduced motion | Pass | P2 | N/A | Web | Keep and regression test |
| SEO/AEO | FAQ/HowTo/QA schema live usage | Relevant templates should emit FAQ/HowTo where applicable | JSON-LD examples exist in repo folders but not emitted by app routes | Fail | P1 | N/A | SEO/Content | Implement route-level schema emission |

## Test Matrix Status

- Desktop Chrome: Pending manual QA  
- Desktop Safari: Pending manual QA  
- Mobile iOS Safari: Pending manual QA  
- Mobile Android Chrome: Pending manual QA  
- Network Fast 3G and normal: Pending manual QA

