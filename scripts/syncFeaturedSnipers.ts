#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || '2024-04';
if (!DOMAIN || !TOKEN) {
  console.error('Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN');
  process.exit(1);
}
const API_ROOT = `https://${DOMAIN}/admin/api/${VERSION}`;

async function upsertFeaturedSnipers(slugs: string[]) {
  const listRes = await fetch(
    `${API_ROOT}/metaobjects.json?type=featured_sniper&handle=featured_sniper`,
    { headers: { 'X-Shopify-Access-Token': TOKEN! } }
  );
  const listText = await listRes.text();
  let listJson: any = {};
  try { listJson = listText ? JSON.parse(listText) : {}; } catch { console.error('Parse list response:', listText); }
  const existing = listJson.metaobjects?.[0];

  const fields = [{ key: 'pages', value: JSON.stringify(slugs) }];
  const payload = { metaobject: { type: 'featured_sniper', handle: 'featured_sniper', fields } };
  const url = existing
    ? `${API_ROOT}/metaobjects/${existing.id}.json`
    : `${API_ROOT}/metaobjects.json`;
  const method = existing ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'X-Shopify-Access-Token': TOKEN!, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const resText2 = await res.text();
  let resJson2: any = {};
  try { resJson2 = resText2 ? JSON.parse(resText2) : {}; } catch { console.error('Parse upsert response:', resText2); }
  if (resJson2.errors || resJson2.metaobjectUpsert?.userErrors?.length) {
    console.error(`${method} failed:`, resJson2.errors || resJson2.metaobjectUpsert.userErrors);
  } else {
    console.log(`${method} successful for featured_sniper: [${slugs.join(', ')}]`);
  }
}

function loadSlugs(): string[] {
  const data = fs.readFileSync(path.resolve(__dirname, '../data/seo-pages.json'), 'utf-8');
  const pages = JSON.parse(data) as { slug: string }[];
  return pages.slice(0, 15).map(p => p.slug);
}

async function main() {
  const slugs = loadSlugs();
  console.log('Syncing featured snipers:', slugs);
  await upsertFeaturedSnipers(slugs);
}

main().catch(e => { console.error(e); process.exit(1); });
