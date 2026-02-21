/**
 * JSON-LD schema types for Organization, WebSite, WebPage, BreadcrumbList,
 * Product, Offer, CollectionPage, Article, etc. Typed for emit.ts.
 */

export type WithContext<T> = { "@context": "https://schema.org"; "@graph"?: never } & T;

export interface Organization {
  "@type": "Organization";
  "@id": string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
}

export interface WebSite {
  "@type": "WebSite";
  "@id": string;
  name: string;
  url: string;
  publisher?: { "@id": string };
  potentialAction?: {
    "@type": "SearchAction";
    target: { "@type": "EntryPoint"; urlTemplate: string };
    "query-input": string;
  };
}

export interface WebPage {
  "@type": "WebPage";
  "@id": string;
  name: string;
  url: string;
  description?: string;
  isPartOf?: { "@id": string };
  breadcrumb?: { "@id": string };
}

export interface BreadcrumbList {
  "@type": "BreadcrumbList";
  "@id": string;
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface Product {
  "@type": "Product";
  "@id": string;
  name: string;
  description?: string;
  image?: string | string[];
  brand?: { "@type": "Brand"; "@id"?: string; name: string };
  offers?: Offer | AggregateOffer;
  sku?: string;
  gtin?: string;
  category?: string;
}

export interface Offer {
  "@type": "Offer";
  price: number;
  priceCurrency: string;
  availability?: string;
  url?: string;
  priceValidUntil?: string;
}

export interface AggregateOffer {
  "@type": "AggregateOffer";
  lowPrice: number;
  highPrice?: number;
  priceCurrency: string;
  offerCount?: number;
  offers?: Offer[];
}

export interface MerchantReturnPolicy {
  "@type": "MerchantReturnPolicy";
  returnPolicyCategory: string;
  merchantReturnDays?: number;
  returnMethod?: string;
}

export interface ShippingDetails {
  "@type": "ShippingDetails";
  shippingRate?: { "@type": "MonetaryAmount"; value: number; currency: string };
  deliveryTime?: { "@type": "ShippingDeliveryTime"; handlingTime?: { "@type": "QuantitativeValue"; minValue?: number; maxValue?: number }; transitTime?: { "@type": "QuantitativeValue"; minValue?: number; maxValue?: number } };
}

export interface ItemList {
  "@type": "ItemList";
  "@id"?: string;
  numberOfItems?: number;
  itemListElement: Array<{ "@type": "ListItem"; position: number; url: string; name?: string }>;
}

export interface Article {
  "@type": "Article";
  "@id"?: string;
  headline: string;
  description?: string;
  author?: { "@type": "Person" | "Organization"; name: string };
  publisher?: { "@type": "Organization"; "@id": string };
  datePublished?: string;
  dateModified?: string;
}
