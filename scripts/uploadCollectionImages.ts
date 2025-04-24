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

async function main() {
  const dirArg = process.argv[2] || 'collection_images_styled';
  const imagesDir = path.resolve(__dirname, `../${dirArg}`);
  if (!fs.existsSync(imagesDir)) {
    console.error(`Directory not found: ${imagesDir}`);
    process.exit(1);
  }
  const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  for (const file of files) {
    const slug = path.parse(file).name;
    const filePath = path.join(imagesDir, file);
    const buffer = fs.readFileSync(filePath);
    const attachment = buffer.toString('base64');

    // Fetch collection by handle
    const getQuery = gql`
      query getCollectionByHandle($queryString: String!) {
        collections(first:1, query: $queryString) {
          edges { node { id handle image { originalSrc } } }
        }
      }
    `;
    const res: any = await client.request(getQuery, { queryString: `handle:${slug}` });
    const existing = res.collections.edges[0]?.node;
    if (!existing) {
      console.warn(`⚠️ Collection not found for handle '${slug}', skipping.`);
      continue;
    }
    if (existing.image?.originalSrc) {
      console.log(`⚠️ Skipping '${slug}' (already has image).`);
      continue;
    }

    // Update collection image via Shopify REST Admin API
    const numericId = existing.id.split('/').pop();
    if (!numericId) {
      console.error(`Invalid collection ID for '${slug}': ${existing.id}`);
      continue;
    }
    const restUrl = `https://${DOMAIN}/admin/api/${API_VERSION}/custom_collections/${numericId}.json`;
    try {
      const response = await fetch(restUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': ADMIN_TOKEN
        },
        body: JSON.stringify({
          custom_collection: { id: numericId, image: { attachment, alt: slug } }
        })
      });
      const data = await response.json();
      if (!response.ok || data.errors) {
        console.error(`❌ Failed to upload image for '${slug}':`, data);
      } else {
        console.log(`✅ Uploaded image for '${slug}'.`);
      }
    } catch (err) {
      console.error(`❌ Network error uploading image for '${slug}':`, err);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
