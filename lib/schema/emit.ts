/**
 * Programmatic JSON-LD schema emission. Stable @id strategy for entity graph.
 */

import type {
  Organization,
  WebSite,
  WebPage,
  BreadcrumbList,
  Product,
  Offer,
  AggregateOffer,
  MerchantReturnPolicy,
  ShippingDetails,
  ItemList,
  Article,
} from "./types";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://emeralds.now";
const ORG_ID = `${BASE}/#organization`;
const SITE_ID = `${BASE}/#website`;

export function organization(): Organization {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Emeralds.now",
    url: BASE,
    logo: `${BASE}/logo.png`,
    description: "Authentic, licensed and authorized distributor of Muzem emerald jewelry.",
  };
}

export function webSite(hasSearch: boolean): WebSite & { "@context": "https://schema.org" } {
  const site: WebSite & { "@context": "https://schema.org" } = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: "Emeralds.now",
    url: BASE,
    publisher: { "@id": ORG_ID },
  };
  if (hasSearch) {
    site.potentialAction = {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    };
  }
  return site;
}

export function webPage(url: string, name: string, description?: string, breadcrumbId?: string): WebPage & { "@context": "https://schema.org" } {
  const pageId = url.startsWith("http") ? url : `${BASE}${url.startsWith("/") ? "" : "/"}${url}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageId}#webpage`,
    name,
    url: pageId,
    description,
    isPartOf: { "@id": SITE_ID },
    ...(breadcrumbId && { breadcrumb: { "@id": breadcrumbId } }),
  };
}

export function breadcrumbList(items: Array<{ name: string; path: string }>): BreadcrumbList & { "@context": "https://schema.org" } {
  const listId = `${BASE}${items.length ? items[items.length - 1].path : ""}#breadcrumb`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": listId,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: item.name,
      item: i < items.length - 1 ? `${BASE}${item.path}` : undefined,
    })),
  };
}

export function productSchema(params: {
  url: string;
  name: string;
  description?: string;
  image?: string | string[];
  brandId?: string;
  price: number;
  highPrice?: number;
  currency?: string;
  sku?: string;
  availability?: string;
}): Product & { "@context": "https://schema.org" } {
  const pageUrl = params.url.startsWith("http") ? params.url : `${BASE}${params.url.startsWith("/") ? "" : "/"}${params.url}`;
  const productId = `${pageUrl}#product`;
  const offer: Offer | AggregateOffer = (params.highPrice != null && params.highPrice !== params.price)
    ? {
        "@type": "AggregateOffer",
        lowPrice: params.price,
        highPrice: params.highPrice,
        priceCurrency: params.currency ?? "USD",
        offerCount: 2,
      }
    : {
        "@type": "Offer",
        price: params.price,
        priceCurrency: params.currency ?? "USD",
        availability: params.availability ?? "https://schema.org/InStock",
        url: pageUrl,
      };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productId,
    name: params.name,
    description: params.description,
    image: params.image,
    ...(params.brandId && { brand: { "@type": "Brand", "@id": params.brandId, name: "Emeralds.now" } }),
    offers: offer,
    sku: params.sku,
  };
}

export function merchantReturnPolicy(days?: number): MerchantReturnPolicy {
  return {
    "@type": "MerchantReturnPolicy",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: days ?? 30,
    returnMethod: "https://schema.org/ReturnByMail",
  };
}

export function shippingDetails(deliveryDaysMin?: number, deliveryDaysMax?: number): ShippingDetails {
  return {
    "@type": "ShippingDetails",
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3 },
      transitTime: { "@type": "QuantitativeValue", minValue: deliveryDaysMin ?? 5, maxValue: deliveryDaysMax ?? 10 },
    },
  };
}

export function collectionPageSchema(url: string, name: string, itemList: ItemList["itemListElement"]) {
  const pageUrl = url.startsWith("http") ? url : `${BASE}${url.startsWith("/") ? "" : "/"}${url}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name,
    url: pageUrl,
    isPartOf: { "@id": SITE_ID },
    numberOfItems: itemList.length,
    itemListElement: itemList,
  };
}

export function articleSchema(params: {
  url: string;
  headline: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
}): Article & { "@context": "https://schema.org" } {
  const pageUrl = params.url.startsWith("http") ? params.url : `${BASE}${params.url.startsWith("/") ? "" : "/"}${params.url}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: params.headline,
    description: params.description,
    publisher: { "@type": "Organization", "@id": ORG_ID },
    datePublished: params.datePublished,
    dateModified: params.dateModified,
  };
}
