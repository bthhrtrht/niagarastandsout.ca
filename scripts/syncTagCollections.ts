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

const dataDir = path.resolve(__dirname, '../data');
const logsDir = path.resolve(__dirname, '../logs');
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(logsDir, { recursive: true });
const tagMeta = JSON.parse(fs.readFileSync(path.join(dataDir, 'tagMeta.json'), 'utf-8'));
const cleaned = JSON.parse(fs.readFileSync(path.join(dataDir, 'cleanedTags.json'), 'utf-8'));

const backup: any[] = [];
const logPath = path.join(logsDir, 'syncTagCollections.log');
function log(msg: string) {
  const time = new Date().toISOString();
  fs.appendFileSync(logPath, `${time} ${msg}\n`);
}

async function upsertCollection(item: any) {
  const { slug, title, description, metaTitle, metaDescription, imageUrl } = item;
  // Fetch existing collection by handle via search
  const getQuery = gql`query getCollectionByHandle($queryString: String!) {
    collections(first:1, query: $queryString) {
      edges { node { id handle } }
    }
  }`;
  const res: any = await client.request(getQuery, { queryString: `handle:${slug}` });
  const existing = res.collections.edges[0]?.node;
  if (!existing) {
    // Create new collection
    const createMutation = gql`mutation createCollection($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection { id handle }
        userErrors { field message }
      }
    }`;
    const input: any = {
      title,
      handle: slug,
      descriptionHtml: description,
      image: imageUrl ? { src: imageUrl } : undefined,
      metafields: [
        { namespace: "global", key: "title_tag", value: metaTitle, type: "single_line_text_field" },
        { namespace: "global", key: "description_tag", value: metaDescription, type: "single_line_text_field" }
      ]
    };
    const createRes = await client.request(createMutation, { input });
    log(`Created collection ${slug}`);
    backup.push({ action: 'create_collection', slug, response: createRes });
  } else {
    // Update existing collection
    const updateMutation = gql`mutation updateCollection($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection { id handle }
        userErrors { field message }
      }
    }`;
    const input: any = {
      id: existing.id,
      title,
      descriptionHtml: description,
      image: imageUrl ? { src: imageUrl } : undefined,
      metafields: [
        { namespace: "global", key: "title_tag", value: metaTitle, type: "single_line_text_field" },
        { namespace: "global", key: "description_tag", value: metaDescription, type: "single_line_text_field" }
      ]
    };
    const updateRes = await client.request(updateMutation, { input });
    log(`Updated collection ${slug}`);
    backup.push({ action: 'update_collection', slug, response: updateRes });
  }
}

// Sync product tags based on cleaned variants
async function syncTags() {
  for (const { slug, variants } of cleaned) {
    const productIds = new Set<string>();
    for (const tag of variants) {
      const q = gql`query($query: String!) {
        products(first: 100, query: $query) {
          edges { node { id tags } }
        }
      }`;
      const res: any = await client.request(q, { query: `tag:${tag}` });
      res.products.edges.forEach((e: any) => productIds.add(e.node.id));
    }
    for (const id of productIds) {
      const q2 = gql`query($id: ID!) {
        product(id: $id) { id tags }
      }`;
      const r2: any = await client.request(q2, { id });
      const current: string[] = r2.product.tags;
      const newTags = Array.from(new Set([slug, ...current.filter(t => !variants.includes(t))]));
      if (newTags.sort().join(',') !== current.sort().join(',')) {
        const mut = gql`mutation updateProductTags($input: ProductInput!) {
          productUpdate(input: $input) {
            product { id }
            userErrors { field message }
          }
        }`;
        await client.request(mut, { input: { id, tags: newTags } });
        log(`Updated product ${id} tags -> ${newTags.join(',')}`);
        backup.push({ productId: id, oldTags: current, newTags });
      }
    }
  }
}

// Runner
async function main() {
  log('Starting syncTagCollections');
  for (const meta of tagMeta) await upsertCollection(meta);
  await syncTags();
  fs.writeFileSync(path.join(logsDir, 'syncTagBackup.json'), JSON.stringify(backup, null, 2));
  log('Completed syncTagCollections');
}

main().catch(err => {
  log(`Error: ${err.message}`);
  process.exit(1);
});

console.log('✅ syncTagCollections complete.');
