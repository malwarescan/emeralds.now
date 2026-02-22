# PR: Asset + data + UI readiness

**Canonical process:** See **docs/ASSET_DEPLOY_PROCESS.md** (asset owner + dev team + Railway + hard rule).

## Naming convention (required in PR description)

**Option A (recommended): “seo_filename is the filename”**

- Product image filenames = `seo_filename` from `ecommerce/image_mapping.csv`.
- Files live in `public/images/products/{seo_filename}`.
- App uses only `seo_filename`; no MUZEM_001_… names in code.

## What’s in this PR

- **Validator:** `scripts/validate-assets.js` — checks hero assets + every product image (by `seo_filename`); reports missing, duplicates, extension mismatches; exit 1 if any missing.
- **Scripts:** `npm run validate:assets`; `npm run build` runs `validate:assets` before `next build`.
- **.gitignore:** Comment that `public/images/hero/*` and `public/images/products/*` must not be ignored.
- **Docs:** `docs/ASSET_CONVENTION.md` (Option A + structure + Railway note), this PR doc.

## Confirmation log: `npm run validate:assets`

*(Paste the actual output here before merge.)*

**Required result:** Exit code 0, Missing = 0, Duplicates = 0, Extension mismatches = 0.

Example when clean:

```
--- Summary ---
Missing: 0
Duplicates: 0
Extension mismatches: 0

OK: All hero assets and 132 product images present. Missing = 0, Duplicates = 0, Extension mismatches = 0.
```

If any count > 0, do not merge; fix filenames until it passes.

## Smoke test checklist (must pass before merge)

- [ ] `npm run validate:assets` — exits 0 (or paste log above).
- [ ] `npm run build` — succeeds (runs validator first).
- [ ] `npm run dev` — then:
  - [ ] `/` — hero shows poster immediately (no black flash); video plays when allowed.
  - [ ] `/collections/rings` — listing renders; no broken product images.
  - [ ] Open 3 featured products from home — card + PDP images load.
  - [ ] `/concierge` — loads; “artisan available” dot visible sitewide.

## Screenshots (attach to PR)

1. Homepage hero at mobile width 390.
2. FeaturedCreations with product images loaded.
3. One PDP with image loaded.

## Railway deploy

- Confirm build uses repo `public/` (no ignored assets).
- Set `NEXT_PUBLIC_SITE_URL` to production (e.g. `https://www.emeralds.now`) or staging URL.
