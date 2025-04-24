#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';

const siteUrl = process.env.SITE_URL || 'https://www.example.com';
const dataFile = path.resolve(__dirname, '../data/seo-pages.json');
const publicDir = path.resolve(__dirname, '../public');
const outputFile = path.join(publicDir, 'sitemap.xml');

if (!fs.existsSync(dataFile)) {
  console.error(`Data file not found: ${dataFile}`);
  process.exit(1);
}

const pages: { slug: string }[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

fs.mkdirSync(publicDir, { recursive: true });

const urls = pages.map(p => `  <url>\n    <loc>${siteUrl}/seo/${p.slug}</loc>\n  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

fs.writeFileSync(outputFile, xml);
console.log(`Generated sitemap with ${pages.length} entries at ${outputFile}`);
