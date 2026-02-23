import { getProductById } from "@/lib/catalog/catalog";

const SHOPIFY_ENDPOINT = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type StorefrontResult<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: { edges: Array<{ node: ShopifyCartLine }> };
};

function assertStorefrontConfig() {
  if (!SHOPIFY_ENDPOINT) {
    throw new Error("Missing NEXT_PUBLIC_SHOPIFY_STOREFRONT_ENDPOINT");
  }
  if (!SHOPIFY_TOKEN) {
    throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  }
}

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  assertStorefrontConfig();
  const res = await fetch(SHOPIFY_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Storefront API error: ${res.status}`);
  }

  const json = (await res.json()) as StorefrontResult<T>;
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "Unknown Storefront error");
  }
  if (!json.data) {
    throw new Error("Empty Storefront response");
  }
  return json.data;
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
  }
`;

export async function resolveMerchandiseId(addToken: string): Promise<string> {
  if (addToken.startsWith("gid://shopify/ProductVariant/")) return addToken;

  const sku = getProductById(addToken)?.sku ?? addToken;
  const query = `
    query VariantBySku($query: String!) {
      productVariants(first: 1, query: $query) {
        edges {
          node { id }
        }
      }
    }
  `;
  const data = await storefront<{
    productVariants: { edges: Array<{ node: { id: string } }> };
  }>(query, { query: `sku:${sku}` });

  const variantId = data.productVariants.edges[0]?.node?.id;
  if (!variantId) {
    throw new Error("Could not resolve merchandise variant for add token");
  }
  return variantId;
}

export async function cartCreate(merchandiseId?: string, qty = 1): Promise<ShopifyCart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
  `;

  const lines = merchandiseId ? [{ merchandiseId, quantity: qty }] : [];
  const data = await storefront<{
    cartCreate: {
      cart: ShopifyCart | null;
      userErrors: Array<{ message: string }>;
    };
  }>(mutation, { input: { lines } });

  const err = data.cartCreate.userErrors[0]?.message;
  if (err) throw new Error(err);
  if (!data.cartCreate.cart) throw new Error("Failed to create cart");
  return data.cartCreate.cart;
}

export async function cartLinesAdd(cartId: string, merchandiseId: string, qty = 1): Promise<ShopifyCart> {
  const mutation = `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { message }
      }
    }
  `;
  const data = await storefront<{
    cartLinesAdd: {
      cart: ShopifyCart | null;
      userErrors: Array<{ message: string }>;
    };
  }>(mutation, {
    cartId,
    lines: [{ merchandiseId, quantity: qty }],
  });

  const err = data.cartLinesAdd.userErrors[0]?.message;
  if (err) throw new Error(err);
  if (!data.cartLinesAdd.cart) throw new Error("Failed to add cart line");
  return data.cartLinesAdd.cart;
}

export async function cartGet(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    ${CART_FRAGMENT}
    query CartGet($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;
  const data = await storefront<{ cart: ShopifyCart | null }>(query, { cartId });
  return data.cart;
}
