#!/usr/bin/env tsx
import fs from 'fs';
// Use global fetch available in Node 18+ instead of importing 'node-fetch'
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
if (!DOMAIN || !TOKEN) {
  console.error('Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN in environment');
  process.exit(1);
}
// use version from env
const VERSION = process.env.SHOPIFY_API_VERSION || '2024-04';
const API_ROOT = `https://${DOMAIN}/admin/api/${VERSION}`;
const dataFile = path.resolve(__dirname, '../data/seo-pages.json');
let pages: any[] = [];
try {
  pages = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
} catch (e) {
  console.error('Failed to parse data file:', e);
}

async function upsert(page: any) {
  const listRes = await fetch(
    `${API_ROOT}/metaobjects.json?type=seo_page&handle=${page.slug}`,
    { headers: { 'X-Shopify-Access-Token': TOKEN! } }
  );
  const listText = await listRes.text();
  let listJson: any = {};
  try { listJson = listText ? JSON.parse(listText) : {}; } catch { console.error('Failed to parse list response:', listText); }
  const existing = listJson.metaobjects?.[0];

  const fields = [
    { key: 'title', value: page.title },
    { key: 'subtitle', value: page.subtitle },
    { key: 'cta', value: page.cta },
    { key: 'productTag', value: page.productTag },
    { key: 'bodyHtml', value: page.bodyHtml },
    { key: 'testimonial', value: page.testimonial },
    { key: 'author', value: page.author },
    { key: 'contactCTA', value: page.contactCTA },
    { key: 'faq', value: JSON.stringify(page.faq) },
    { key: 'seoTitle', value: page.seo.title },
    { key: 'seoDescription', value: page.seo.description },
    { key: 'jsonLd', value: JSON.stringify(page.seo.jsonLd) }
  ];

  const payload = { metaobject: { type: 'seo_page', handle: page.slug, fields } };
  const url = existing
    ? `${API_ROOT}/metaobjects/${existing.id}.json`
    : `${API_ROOT}/metaobjects.json`;
  const method = existing ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: {
      'X-Shopify-Access-Token': TOKEN!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const resText = await res.text();
  let resJson: any = {};
  try { resJson = resText ? JSON.parse(resText) : {}; } catch { console.error('Failed to parse upsert response:', resText); }
  if (resJson.errors || resJson.metaobjectUpsert?.userErrors?.length) {
    console.error(`${method} failed for ${page.slug}:`, resJson.errors || resJson.metaobjectUpsert.userErrors);
  } else {
    console.log(`${method} successful for ${page.slug}`);
  }
}

async function main() {
  for (const page of pages) {
    await upsert(page);
  }
}

main().catch(e => console.error(e));
