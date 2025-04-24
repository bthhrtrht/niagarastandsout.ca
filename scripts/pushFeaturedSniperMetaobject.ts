#!/usr/bin/env tsx
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;
if (!TOKEN) {
  console.error('Missing SHOPIFY_ADMIN_API_TOKEN in environment');
  process.exit(1);
}
const API_ROOT = process.env.SHOPIFY_API_ROOT!;

interface SeoPage { slug: string; }
interface LeadEntry { slug: string; }
interface EventEntry { slug: string; eventType: string; }

const dataDir = path.resolve(__dirname, '../data');
const seoPages: SeoPage[] = JSON.parse(fs.readFileSync(path.join(dataDir, 'seo-pages.json'), 'utf-8'));
const leads: LeadEntry[] = JSON.parse(fs.readFileSync(path.join(dataDir, 'leads.json'), 'utf-8'));
const events: EventEntry[] = JSON.parse(fs.readFileSync(path.join(dataDir, 'ab-events.json'), 'utf-8'));

// Compute top performers by conversion
const metrics = seoPages.map(p => {
  const views = events.filter(e => e.slug === p.slug && e.eventType === 'view').length;
  const leadsCount = leads.filter(l => l.slug === p.slug).length;
  return { slug: p.slug, conversion: views > 0 ? leadsCount / views : 0 };
});
const top = metrics.sort((a, b) => b.conversion - a.conversion).slice(0, 3).map(m => m.slug);

async function upsertFeatured() {
  const listRes = await fetch(
    `${API_ROOT}/metaobjects.json?type=featured_sniper&handle=top_sniper`,
    { headers: { 'X-Shopify-Access-Token': TOKEN! } }
  );
  const listText = await listRes.text();
  let listJson: any = {};
  try { listJson = listText ? JSON.parse(listText) : {}; } catch { console.error('Failed to parse listRes JSON:', listText); }
  const existing = listJson.metaobjects?.[0];

  const fields = [
    { key: 'pages', value: JSON.stringify(top) },
  ];
  const payload = { metaobject: { type: 'featured_sniper', handle: 'top_sniper', fields } };
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
  let json: any = {};
  try { json = resText ? JSON.parse(resText) : {}; } catch { console.error('Failed to parse upsert response:', resText); }
  if (json.errors) {
    console.error(`${method} failed for featured_sniper:`, json.errors);
  } else {
    console.log(`${method} successful for featured_sniper`);
  }
}

upsertFeatured().catch(e => console.error(e));
