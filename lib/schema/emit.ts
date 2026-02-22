/**
 * Emits Organization, WebSite, Breadcrumb, Product JSON-LD.
 * Strips Reviews/AggregateRating unless explicitly flagged as real.
 */
import type { NormalizedProduct } from "@/lib/catalog/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Muzem Emeralds",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: "4th Generation Family Jewelry - Certified Colombian Emeralds",
    sameAs: ["https://www.instagram.com/muzem_emeralds/"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Éméraude Royale | Muzem Emeralds",
    url: BASE_URL,
    publisher: organizationSchema(),
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/collections?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productSchema(
  product: NormalizedProduct,
  options: { includeReviews?: boolean } = {}
) {
  const imageUrl = product.localImagePath
    ? `${BASE_URL}${product.localImagePath}`
    : product.image_url;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: imageUrl,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.sale_price_usd,
      priceCurrency: product.currency_usd,
      availability:
        product.sellability === "in-stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${BASE_URL}/product/${product.handle}`,
    },
  };
  if (product.sku) schema.sku = product.sku;
  if (product.certification) schema.additionalProperty = [{ "@type": "PropertyValue", name: "Certification", value: product.certification }];
  // Do not add aggregateRating or reviews unless options.includeReviews is true (real data).
  if (options.includeReviews) {
    // Only when you have real review data
    // schema.aggregateRating = { ... };
    // schema.review = [ ... ];
  }
  return schema;
}
