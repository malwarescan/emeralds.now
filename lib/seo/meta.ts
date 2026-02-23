/**
 * Maps meta_tags.json into Next.js generateMetadata.
 * Use getMetaForProduct(productId) on PDP; use SITE_META for layout/home.
 */
import { readFileSync } from "fs";
import path from "path";
import type { Metadata } from "next";

const META_TAGS_PATH = path.join(process.cwd(), "seo", "meta_tags.json");
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";

export const SITE_META: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Éméraude Royale | Muzem Emeralds – Official Online Store",
  description:
    "Official online store for Muzem Emeralds. Certified Colombian emerald jewelry — rings, earrings, pendants, bracelets. 4th generation family artisans.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Éméraude Royale | Muzem Emeralds",
    description: "Official online store for Muzem Emeralds. Certified Colombian emerald jewelry.",
    siteName: "Muzem Emeralds",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@muzem_emeralds",
  },
};

interface MetaTagRow {
  product_id: string;
  meta_title?: string;
  meta_description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
}

let _metaList: MetaTagRow[] | null = null;

function loadMetaTags(): MetaTagRow[] {
  if (_metaList) return _metaList;
  try {
    const raw = readFileSync(META_TAGS_PATH, "utf-8");
    _metaList = JSON.parse(raw);
    return _metaList ?? [];
  } catch {
    return [];
  }
}

export function getMetaForProduct(productId: string): Metadata | null {
  const rows = loadMetaTags();
  const row = rows.find((r) => r.product_id === productId);
  if (!row) return null;
  return {
    title: row.meta_title ?? row.og_title ?? undefined,
    description: row.meta_description ?? row.og_description ?? undefined,
    openGraph: {
      title: row.og_title,
      description: row.og_description,
      images: row.og_image ? [{ url: row.og_image }] : undefined,
      type: "website",
    },
    twitter: {
      title: row.twitter_title,
      description: row.twitter_description,
      images: row.twitter_image ? [row.twitter_image] : undefined,
    },
  };
}
