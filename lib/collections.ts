const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN || "";

const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`;

interface Product {
  title: string;
  handle: string;
  image: string;
}

export interface Collection {
  title: string;
  handle: string;
  description: string;
  image?: string;
}

export async function getCollectionByHandle(handle: string): Promise<Collection | null> {
  const query = `
    query CollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        title
        handle
        description
        image {
          src
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

    const col = json.data?.collectionByHandle;
    if (!col) return null;
    return {
      title: col.title,
      handle: col.handle,
      description: col.description,
      image: col.image?.src || undefined,
    };
  } catch (e) {
    console.error("Error fetching collection by handle:", e);
    return null;
  }
}

export async function getCollectionProducts(handle: string): Promise<Product[]> {
  const query = `
    query ProductsByCollection($handle: String!) {
      collectionByHandle(handle: $handle) {
        products(first: 10) {
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

    if (json.errors) {
      console.error("Shopify GraphQL errors:", JSON.stringify(json.errors, null, 2));
    }

    const products = json.data?.collectionByHandle?.products?.edges || [];

    return products.map((edge: any): Product => ({
      title: edge.node.title,
      handle: edge.node.handle,
      image: edge.node.images.edges[0]?.node.originalSrc || "",
    }));
  } catch (e) {
    console.error("Error fetching collection:", e);
    return [];
  }
}
