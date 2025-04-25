#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN!;
if (!DOMAIN || !TOKEN) {
  console.error('Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN');
  process.exit(1);
}

// Use API version that supports metaobjects (override env var)
const VERSION = '2024-04';
const API_ROOT = `https://${DOMAIN}/admin/api/${VERSION}`;

export async function syncMetaobjectsToJson() {
  // Fetch via Admin GraphQL
  const query = /* GraphQL */ `
    query Metaobjects($type: String!) {
      metaobjects(type: $type, first: 250) {
        edges {
          node {
            handle
            fields(first: 250) { key value }
          }
        }
      }
    }
  `;
  const response = await fetch(`${API_ROOT}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables: { type: 'featured_sniper' } }),
  });
  if (!response.ok) {
    console.error(`GraphQL Error: ${response.status} - ${await response.text()}`);
    process.exit(1);
  }
  const { data } = await response.json();
  const edges = data?.metaobjects?.edges || [];
  const formatted = edges.map((edge: any) => {
    const obj = edge.node;
    const fieldMap: Record<string, string> = {};
    obj.fields.forEach((f: any) => (fieldMap[f.key] = f.value));
    return {
      slug: obj.handle,
      icon: fieldMap.icon,
      alt: fieldMap.alt_text,
      title: fieldMap.title,
      description: fieldMap.description,
    };
  });
  const outputPath = path.join(process.cwd(), 'public', 'metaobjects.json');
  fs.writeFileSync(outputPath, JSON.stringify(formatted, null, 2));
  console.log(`✅ Synced ${formatted.length} metaobjects to ${outputPath}`);
}

if (require.main === module) {
  syncMetaobjectsToJson();
}
