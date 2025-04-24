import dotenv from 'dotenv';
dotenv.config();

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN || "";
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2023-10';

const endpoint = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export interface Collection {
  handle: string;
  title: string;
  description: string;
  image: string | null;
  imageAlt: string;
}

export async function getAllCollections(): Promise<Collection[]> {
  const query = `
    query Collections {
      collections(first: 100, query: "published_status:published") {
        edges {
          node {
            handle
            title
            description
            image {
              url
              altText
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
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    const raw = await res.text();
    const json = JSON.parse(raw);

    if (json.errors) {
      console.error("Shopify GraphQL errors:", JSON.stringify(json.errors, null, 2));
    }

    const collections = json.data?.collections?.edges || [];

    return collections.map((edge: any): Collection => ({
      handle: edge.node.handle,
      title: edge.node.title,
      description: edge.node.description,
      image: edge.node.image?.url || null,
      imageAlt: edge.node.image?.altText || '',
    }));
  } catch (e) {
    console.error("Error fetching collections:", e);
    return [];
  }
}
