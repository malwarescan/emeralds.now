import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/catalog/catalog";

const COLLECTIONS = ["rings", "earrings", "pendants", "bracelets", "chains", "one-of-one"];
const EDUCATION = [
  "how-to-verify-colombian-emerald",
  "emerald-treatments-explained",
  "emerald-care-guide",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";
  const now = new Date();
  const products = getCatalog();

  const staticRoutes = [
    "/",
    "/atelier",
    "/concierge",
    "/faq",
    "/collections",
    ...COLLECTIONS.map((h) => `/collections/${h}`),
    ...EDUCATION.map((s) => `/education/${s}`),
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
    })),
    ...products.map((product) => ({
      url: `${base}/product/${product.handle}`,
      lastModified: now,
    })),
  ];
}
