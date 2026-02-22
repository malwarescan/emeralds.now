# Asset + data convention (emeralds.now)

## Naming decision: Option A (enforced)

**Product images: `seo_filename` is the filename.**

- Every product image in the repo must be named **exactly** as `seo_filename` in `ecommerce/image_mapping.csv`.
- Store files in `public/images/products/{seo_filename}`.
- The app resolves images via `lib/catalog/images.ts` → `/images/products/{seo_filename}`.
- Do **not** use raw MUZEM_001_… filenames in the app; only `seo_filename` is canonical.

## Repo asset structure (must match exactly)

These paths must exist and be committed (not ignored) so they work in dev, build, and Railway:

```
public/
  images/
    hero/
      emeralds-intro.mp4
      emeraldsnow-hero-image.webp
    products/
      {seo_filename for each row in ecommerce/image_mapping.csv}
```

## Validation

Before every build/deploy:

```bash
npm run validate:assets
```

**Required for merge:** Exit code 0, Missing = 0, Duplicates = 0, Extension mismatches = 0.

- Exits with code 1 if any hero or product image is missing, or if there are duplicates or extension mismatches.
- Do not work around failures; fix filenames until it passes.

`npm run build` runs `validate:assets` automatically. See **docs/ASSET_DEPLOY_PROCESS.md** for the full process.

## Railway

- Use the repo `public/` as-is; do not ignore `public/images/**`.
- Set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g. `https://www.emeralds.now` or Railway preview URL) for schema/meta canonicals.
