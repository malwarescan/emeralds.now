/**
 * Headless Shopify — Storefront API (GraphQL).
 * Use NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT (e.g. https://store.myshopify.com/api/2024-01/graphql)
 * and SHOPIFY_STOREFRONT_ACCESS_TOKEN.
 */

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function storefrontQuery<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!endpoint || !token) {
    return {} as T;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Shopify API ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? "GraphQL error");
  return json.data as T;
}

const PRODUCT_FRAGMENT = `
  fragment ProductCore on Product {
    id
    handle
    title
    description
    priceRange { minVariantPrice { amount currencyCode } }
    featuredImage { url altText width height }
    images(first: 10) { nodes { url altText width height } }
    variants(first: 20) {
      nodes {
        id
        title
        availableForSale
        price { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
`;

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  selectedOptions?: { name: string; value: string }[];
};

export type ProductImage = {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  priceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
  featuredImage?: ProductImage;
  images?: { nodes: ProductImage[] };
  variants?: { nodes: ProductVariant[] };
};

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await storefrontQuery<{ product: Product | null }>(
    `query Product($handle: String!) {
      product(handle: $handle) {
        ...ProductCore
      }
    }
    ${PRODUCT_FRAGMENT}`,
    { handle }
  );
  return data?.product ?? null;
}

export type CollectionProduct = {
  id?: string;
  handle: string;
  title: string;
  featuredImage?: { url: string; altText?: string };
  priceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  products?: { nodes: CollectionProduct[] };
};

export async function getCollectionByHandle(handle: string): Promise<Collection | null> {
  const data = await storefrontQuery<{ collection: Collection | null }>(
    `query Collection($handle: String!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        products(first: 24) {
          nodes {
            id
            handle
            title
            featuredImage { url altText width height }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }`,
    { handle }
  );
  return data?.collection ?? null;
}

export async function getAllCollectionHandles(): Promise<string[]> {
  const data = await storefrontQuery<{ collections: { nodes: { handle: string }[] } }>(
    `query { collections(first: 100) { nodes { handle } } }`
  );
  return (data?.collections?.nodes ?? []).map((c) => c.handle);
}
