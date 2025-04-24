#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || '2024-04';
if (!DOMAIN || !TOKEN) {
  console.error('Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_API_TOKEN in environment');
  process.exit(1);
}
const API_ROOT = `https://${DOMAIN}/admin/api/${VERSION}`;

interface EventEntry { slug: string; eventType: string; }
interface LeadEntry { slug: string; }

const dataDir = path.resolve(__dirname, '../data');
const events: EventEntry[] = JSON.parse(fs.readFileSync(path.join(dataDir, 'ab-events.json'), 'utf-8')) || [];
const leads: LeadEntry[] = JSON.parse(fs.readFileSync(path.join(dataDir, 'leads.json'), 'utf-8')) || [];

// Collect all slugs
const slugSet = new Set<string>();
events.forEach(e => slugSet.add(e.slug));
leads.forEach(l => slugSet.add(l.slug));
const slugs = Array.from(slugSet);

// Compute conversion metrics
const metrics = slugs.map(slug => {
  const clicks = events.filter(e => e.slug === slug && e.eventType === 'click').length;
  const leadsCount = leads.filter(l => l.slug === slug).length;
  const conversion = clicks > 0 ? leadsCount / clicks : 0;
  return { slug, conversion };
});
metrics.sort((a, b) => b.conversion - a.conversion);
const top6 = metrics.slice(0, 6).map(m => m.slug);

async function upsertFeatured() {
  // Fetch existing metaobject
  const listRes = await fetch(
    `${API_ROOT}/metaobjects.json?type=featured_sniper&handle=top_sniper`,
    { headers: { 'X-Shopify-Access-Token': TOKEN!, 'Content-Type': 'application/json' } }
  );
  const listText = await listRes.text();
  let listJson: any = {};
  try { listJson = listText ? JSON.parse(listText) : {}; } catch {}
  const existing = listJson.metaobjects?.[0];

  let current: string[] = [];
  if (existing) {
    const pagesField = existing.fields.find((f: any) => f.key === 'pages');
    if (pagesField && pagesField.value) {
      try { current = JSON.parse(pagesField.value); } catch {}
    }
  }

  const prev = JSON.stringify(current);
  const next = JSON.stringify(top6);
  if (prev === next) {
    console.log('No change in top snipers, skipping update');
    return;
  }

  // Prepare payload
  const fields = [{ key: 'pages', value: JSON.stringify(top6) }];
  const payload = { metaobject: { type: 'featured_sniper', handle: 'top_sniper', fields } };
  const url = existing ? `${API_ROOT}/metaobjects/${existing.id}.json` : `${API_ROOT}/metaobjects.json`;
  const method = existing ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: { 'X-Shopify-Access-Token': TOKEN!, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const resText = await res.text();
  let resJson: any = {};
  try { resJson = resText ? JSON.parse(resText) : {}; } catch {}

  if (resJson.errors) {
    console.error(`${method} failed for featured_sniper:`, resJson.errors);
  } else {
    console.log(`${method} successful for featured_sniper: ${top6.join(',')}`);
  }
}

upsertFeatured().catch(e => {
  console.error('Error promoting top snipers:', e);
  process.exit(1);
});
