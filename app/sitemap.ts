import type { MetadataRoute } from "next";
import { getCrawlProducts, getCrawlCollectionHandles } from "@/lib/crawl/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";

function toHandle(p: { handle?: string; id: string }): string {
  return p.handle ?? p.id.toLowerCase().replace(/_/g, "-");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getCrawlProducts();
  const collectionHandles = getCrawlCollectionHandles();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/concierge`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/cart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/education/authenticity`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/education/origin`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const collectionUrls: MetadataRoute.Sitemap = collectionHandles.map((handle) => ({
    url: `${BASE}/collections/${handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/product/${toHandle(p)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...collectionUrls, ...productUrls];
}
