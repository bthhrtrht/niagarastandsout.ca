import dotenv from 'dotenv';
import { gql, GraphQLClient } from 'graphql-request';

dotenv.config();

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || process.env.SHOP_DOMAIN || "";
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN || "";
// Derive API version from env or default
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-04';
const endpoint = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const gqlClient = new GraphQLClient(endpoint, {
  headers: { 'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN },
});

// ───── Types ─────

export interface ProductImageNode {
  url: string;
  altText: string | null;
}

export interface AllProduct {
  handle: string;
  title: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: { node: ProductImageNode }[];
  };
}

interface AllProductsResponse {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    edges: { node: AllProduct }[];
  };
}

export interface ProductImage {
  originalSrc: string;
  altText?: string;
}

export interface ProductVariant {
  title: string;
  id: string;
  price: {
    amount: string;
    currencyCode: string;
  };
}

export interface ProductMetafield {
  namespace: string;
  key: string;
  value: string;
}

export interface Product {
  title: string;
  description: string;
  tags: string[];
  handle: string;
  images: {
    edges: { node: ProductImage }[];
  };
  variants: {
    edges: { node: ProductVariant }[];
  };
  metafields?: {
    edges: { node: ProductMetafield }[];
  };
}

export interface TaggedProduct {
  handle: string;
  title: string;
  image: string;
  price?: { amount: string; currency: string };
  available?: boolean;
}

// ───── Queries ─────

const PRODUCTS_PAGE = gql`
  query AllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          handle
          title
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 10) { edges { node { url altText } } }
        }
      }
    }
  }
`;

// ───── Functions ─────

export async function fetchAllProducts(): Promise<AllProduct[]> {
  let products: AllProduct[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const response = (await gqlClient.request(PRODUCTS_PAGE, {
      first: 250,
      after: cursor,
    })) as AllProductsResponse;

    const items = response.products.edges.map((edge: { node: AllProduct }) => edge.node);
    products = products.concat(items);
    hasNextPage = response.products.pageInfo.hasNextPage;
    cursor = response.products.pageInfo.endCursor;
  }

  return products;
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query Product($handle: String!) {
      productByHandle(handle: $handle) {
        title
        handle
        description
        tags
        images(first: 10) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              title
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables: { handle } }),
      next: { revalidate: 60 },
    });

    const raw = await res.text();
    const json = JSON.parse(raw);

    if (!json.data?.productByHandle) {
      console.error(`getProductByHandle: No product found for handle "${handle}"`, json.errors || json);
      return null;
    }

    return json.data.productByHandle as Product;
  } catch (e) {
    console.error(`Error in getProductByHandle for handle "${handle}":`, e);
    return null;
  }
}

export async function getProductsByTag(tag: string): Promise<TaggedProduct[]> {
  const query = `
    query ProductsByTag($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            title
            handle
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables: { query: `tag:${tag}` } }),
      next: { revalidate: 60 },
    });

    const raw = await res.text();
    const json = JSON.parse(raw);

    const edges = json.data?.products?.edges || [];

    return edges.map((edge: any): TaggedProduct => ({
      handle: edge.node.handle,
      title: edge.node.title,
      image:
        edge.node.images.edges[0]?.node.originalSrc ||
        "https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg",
    }));
  } catch (e) {
    console.error(`Error in getProductsByTag for tag "${tag}":`, e);
    return [];
  }
}

export async function getFrontpageProducts(limit = 12): Promise<TaggedProduct[]> {
  const query = `
    query FrontpageProducts($limit: Int!) {
      collection(handle: "frontpage") {
        products(first: $limit) {
          edges {
            node {
              handle
              title
              images(first: 1) { edges { node { originalSrc } } }
              availableForSale
              variants(first: 1) { edges { node { price { amount currencyCode } } } }
            }
          }
        }
      }
    }
  `;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables: { limit } }),
      next: { revalidate: 60 },
    });
    const json = await res.json();
    const edges = json.data?.collection?.products?.edges || [];
    return edges.map((edge: any) => {
      const variant = edge.node.variants.edges[0]?.node;
      return {
        handle: edge.node.handle,
        title: edge.node.title,
        image:
          edge.node.images.edges[0]?.node.originalSrc ||
          "https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg",
        price: variant?.price
          ? { amount: variant.price.amount, currency: variant.price.currencyCode }
          : undefined,
        available: edge.node.availableForSale,
      };
    });
  } catch (e) {
    console.error(`Error in getFrontpageProducts:`, e);
    return [];
  }
}

// ───── Re-exports ─────

export { getAllCollections } from './getAllCollections';
export type { Collection } from './getAllCollections';
export { getCollectionProducts, getCollectionByHandle } from './collections';
