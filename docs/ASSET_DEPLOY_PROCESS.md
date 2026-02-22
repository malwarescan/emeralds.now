# Asset + deploy process (emeralds.now)

Follow this order. No other PRs merge until step 6 is satisfied.

---

## 1. ASSET OWNER: Put files in the only correct locations

### Option A: Manual

**Hero (2 files):**

- `public/images/hero/emeralds-intro.mp4`
- `public/images/hero/emeraldsnow-hero-image.webp`

**Products (132 files):** Copy into **`public/images/products/`** and rename each to **`seo_filename`** from **`ecommerce/image_mapping.csv`** (same spelling, extension, capitalization, no spaces).

### Option B: Copy script (if you have source folders)

If you have product images in a folder named like the **`local_path`** basenames in the CSV (e.g. `MUZEM_001_18k_Yellow_Gold_Ring_....jpg`):

```bash
node scripts/copy-assets.js <products_source_dir> [hero_source_dir]
```

Example:

```bash
node scripts/copy-assets.js ./raw_images ./hero_files
```

- Copies each `products_source_dir/{basename(local_path)}` → `public/images/products/{seo_filename}`.
- If `hero_source_dir` is given, copies `emeralds-intro.mp4` and `emeraldsnow-hero-image.webp` into `public/images/hero/`.

Then run **`npm run validate:assets`** and fix any missing/duplicates/extension mismatches.

---

## 2. ASSET OWNER: One PR with only assets

- **Branch name:** `assets/product-images`
- **Commit only:**
  - `public/images/hero/*`
  - `public/images/products/*`
- **No code changes in this PR.**

---

## 3. DEV TEAM: Run validator and block merge unless clean

On the assets branch:

```bash
npm run validate:assets
```

**Required result:**

- Exit code **0**
- Missing = **0**
- Duplicates = **0**
- Extension mismatches = **0**

If it fails:

- Do **not** work around it.
- Fix filenames until it passes.

---

## 4. DEV TEAM: Build and smoke test before merge

```bash
npm run build   # must pass
npm run dev
```

**Manual checks:**

| Check | Pass |
|-------|------|
| `/` — homepage | Hero poster shows instantly |
| `/` | Hero video plays (when motion allowed) |
| `/collections/rings` | Images load |
| Open 3 product pages from featured list | Images load |
| `/concierge` | Page loads + concierge dot visible |

---

## 5. AFTER MERGE: Railway deployment

- Set env var on Railway: **`NEXT_PUBLIC_SITE_URL=https://www.emeralds.now`**
- Deploy `main`.

**Production verification (must be 200 OK):**

- `https://www.emeralds.now/images/hero/emeraldsnow-hero-image.webp`
- `https://www.emeralds.now/images/hero/emeralds-intro.mp4`
- `https://www.emeralds.now/images/products/<one seo_filename from CSV>` (e.g. `muzem-ring-yellow-gold-natural-muzem_001.jpg`)

---

## 6. HARD RULE

**No other PRs merge until:**

- Validator passes
- Build passes
- Production serves hero + at least one product image with **200 OK**
