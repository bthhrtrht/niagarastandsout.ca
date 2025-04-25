import { gql, GraphQLClient } from 'graphql-request';

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN || "";
const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`;

const gqlClient = new GraphQLClient(endpoint, {
  headers: { 'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN }
});

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

export interface AllProduct {
  handle: string;
  title: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: { node: { url: string; altText: string | null } }[] };
}

export async function fetchAllProducts(): Promise<AllProduct[]> {
  let products: AllProduct[] = [];
  let hasNextPage = true;
  let cursor: string | null = null;

  while (hasNextPage) {
    const response = await gqlClient.request<{
      products: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        edges: { node: AllProduct }[];
      };
    }>(PRODUCTS_PAGE, { first: 250, after: cursor });

    const items = response.products.edges.map(edge => edge.node);
    products = products.concat(items);

    hasNextPage = response.products.pageInfo.hasNextPage;
    cursor = response.products.pageInfo.endCursor;
  }

  return products;
}
