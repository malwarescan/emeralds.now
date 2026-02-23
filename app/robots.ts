import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";
  const isProd = process.env.NODE_ENV === "production";

  return {
    rules: isProd
      ? [
          {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/_next/", "/admin/", "/internal/"],
          },
        ]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
