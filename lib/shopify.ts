// lib/shopify.ts

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN || "";
const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`;

// ───── Type Definitions ─────

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
  metafields: {
    edges: { node: ProductMetafield }[];
  };
}

export interface TaggedProduct {
  handle: string;
  title: string;
  image: string;
}

// ───── Fetch Single Product by Handle ─────

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
        # metafields removed due to API changes
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

// ───── Fetch Products by Tag ─────

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

// Re-export collection utilities for imports from '@/lib/shopify'
export { getAllCollections } from './getAllCollections';
export type { Collection } from './getAllCollections';
export { getCollectionProducts, getCollectionByHandle } from './collections';
