# Emeralds.now — Authorized Muzem Emerald Jewelry

Luxury ecommerce flagship: white-glove ceremony, LCP < 1.5s, enterprise schema (AEO/SEO/GEO).

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Headless Shopify** (Storefront API) — fetch-based client in `lib/shopify/client.ts`
- **Cloudinary** — helpers in `lib/cloudinary.ts` (AVIF/WebP, blur-up, lighting variants)
- **GSAP** (planned: route transitions, FLIP) + **Lenis** (momentum scroll)
- **Three.js + R3F** — hero WebGL deferred; gradient fallback in place
- **Supabase** — concierge leads (`lib/concierge/capture.ts`)
- **Railway** — hosting

## Setup

1. **Install** (React 19 + R3F peer deps may require):
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Env** — copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT` + `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (for collections/product)
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (optional, for Cloudinary URLs)
   - `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (for concierge capture)

3. **Supabase** — create table `concierge_leads` with columns: `interest`, `budget`, `timeline`, `ring_size`, `preferences`, `appointment_type`, `created_at`.

4. **Run**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — dev server
- `npm run build` / `npm run start` — production
- `npm run schema:validate` — JSON-LD emit sanity check
- `npm run crawl:product-data` — regenerate `crawl/product_data.json` from CSV
- `npm run crawl:copy-images` — copy crawl images to `public/images/products/`

## Sitemap

The app serves a sitemap at **`/sitemap.xml`** (generated from `app/sitemap.ts`) with home, collections, collection pages, all product PDPs, FAQ, concierge, cart, and education pages. Submit `https://your-domain.com/sitemap.xml` in Google Search Console after deploy.

## Pre-launch checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` in production env to your live domain
- [ ] Test key pages: `/`, `/collections`, `/product/muzem-001`, `/faq`
- [ ] Validate JSON-LD: [validator.schema.org](https://validator.schema.org/) or Google Rich Results Test
- [ ] Submit sitemap in Google Search Console
- [ ] Deploy (e.g. Railway)

## Design

- **Tokens** — `styles/tokens.css` (Abyssal, Gold, Paper, Mist, shadows, spacing, motion)
- **Typography** — `styles/typography.css` (display + technical, responsive scale)
- **Grid** — asymmetric rails via `--rail` / `--rail-lg`; deliberate voids

## Routes

| Path | Description |
|------|-------------|
| `/` | Home (hero, stone, craftsmanship) |
| `/collections`, `/collections/[handle]` | Collection list + product grid |
| `/product/[handle]` | PDP with lighting toggle, schema, AEO sections |
| `/concierge` | Concierge entry + overlay trigger |
| `/education/[slug]` | AEO/education (authenticity, origin) |
| `/[city]/[intent]` | GEO (e.g. `/bogota/emerald-rings`) |

## Concierge

- **Live dot** — “An artisan is available” (slow pulse); opens overlay.
- **Overlay** — conversational flow: interest → budget → timeline → details → appointment type; writes to Supabase.

## Schema

- **Global** — Organization, WebSite, WebPage, BreadcrumbList.
- **Collection** — CollectionPage + ItemList.
- **PDP** — Product, Offer/AggregateOffer, MerchantReturnPolicy, ShippingDetails.
- **Education** — Article.
- Emit in `lib/schema/emit.ts`; types in `lib/schema/types.ts`.

## WebGL Hero

Spec calls for “Emerald Refraction” (R3F + postprocessing). Current hero is a **gradient fallback** to keep LCP safe. To add the full scene: implement `HeroRefractionWebGL` with R3F (and fix JSX intrinsics for Three in your TS setup), then switch `HeroRefraction` to dynamic-import it with reduced-motion fallback.

## Host for crawler (get a public URL)

To let a coding agent crawl the site you need a live URL.

**Vercel (fastest):** Push to GitHub → [vercel.com](https://vercel.com) → Add New → Project → import repo → Deploy. You get `https://your-project.vercel.app`. Set env `NEXT_PUBLIC_SITE_URL` to that URL. Give the crawler the **root URL** and **`/sitemap.xml`**.

**Railway:** Connect repo at [railway.app](https://railway.app) → deploy → use the `*.railway.app` URL. Set `NEXT_PUBLIC_SITE_URL` to that URL. Crawler entry: root URL + `/sitemap.xml`.

**After deploy:** Run `npm run crawl:copy-images` before building (or ensure `crawl/raw_images/` is copied to `public/images/products/`) so product images load. Crawler key routes: `/`, `/collections`, `/product/muzem-001`, `/faq`, and all 132 `/product/[handle]` URLs.

---

## Deploy on Railway

1. **Connect** the repo in [Railway](https://railway.app) (GitHub/GitLab or CLI).
2. **Build** — Railway detects Next.js and runs `npm install`, `npm run build`, then `next start`. The app uses `output: "standalone"` for a minimal production server.
3. **Env** — In the Railway project, set the same variables as in `.env.example` (e.g. `NEXT_PUBLIC_SITE_URL` to your Railway app URL or custom domain).
4. **Domain** — Attach a custom domain in Railway or use the generated `*.railway.app` URL; set `NEXT_PUBLIC_SITE_URL` to that base URL for schema and links.

For `next/image` with Cloudinary/Shopify, Railway’s Node runtime works as-is. Optional: add `sharp` for faster image optimization: `npm install sharp`.

## Sentry

Sentry was omitted (peer dep conflict with Next 16). Add `@sentry/nextjs` when a compatible version is available.
