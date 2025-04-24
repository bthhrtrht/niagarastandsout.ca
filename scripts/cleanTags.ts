#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GraphQLClient, gql } from 'graphql-request';

dotenv.config();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-04';
const endpoint = `https://${DOMAIN}/admin/api/${API_VERSION}/graphql.json`;
const client = new GraphQLClient(endpoint, {
  headers: { 'X-Shopify-Access-Token': ADMIN_TOKEN }
});

// Slugify helper
function slugify(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchAllTags(): Promise<string[]> {
  const query = gql`
    query {
      shop {
        productTags(first: 250) {
          edges {
            node
          }
        }
      }
    }
  `;
  const res = await client.request<{ shop: { productTags: { edges: { node: string }[] } } }>(query);
  return Array.from(new Set(res.shop.productTags.edges.map(edge => edge.node)));
}

async function main() {
  console.log('🧹 Fetching raw tags from Shopify...');
  const tags = await fetchAllTags();

  console.log(`🔖 Normalizing and grouping ${tags.length} tags...`);
  const groups: Record<string, string[]> = {};
  for (const tag of tags) {
    const slug = slugify(tag);
    groups[slug] = groups[slug] || [];
    groups[slug].push(tag.trim());
  }

  const output = Object.entries(groups).map(([slug, variants]) => ({ slug, variants }));

  const outDir = path.resolve(__dirname, '../data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'cleanedTags.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`✅ Cleaned tags written to ${outPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
