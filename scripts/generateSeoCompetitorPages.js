#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Paths
const base = process.cwd();
const compFile = path.join(base, 'competitors.json');
const dataFile = path.join(base, 'data', 'seo-pages.json');

// Load competitor URLs
if (!fs.existsSync(compFile)) {
  console.error(`competitors.json not found at ${compFile}`);
  process.exit(1);
}
const urls = JSON.parse(fs.readFileSync(compFile, 'utf-8'));

// Load existing SEO pages
let existing = [];
if (fs.existsSync(dataFile)) {
  existing = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
}
const existingSlugs = new Set(existing.map(p => p.slug));

// Slugify helper
function slugify(url) {
  return url
    .replace(/^https?:\/\//i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

const defaultImage = 'https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg';

// Build entries
const newEntries = urls.map(link => {
  const slug = slugify(link);
  const host = new URL(link).hostname;
  const name = slug.replace(/-/g, ' ');
  return {
    slug,
    title: `Compare ${name} | Niagara Stands Out`,
    subtitle: `Better than ${host}`,
    cta: 'See Our Quality First',
    productTag: '',
    bodyHtml: `<h2>Why We Beat ${host}</h2><p>Your unique local spin here…</p>`,
    testimonial: `“Switched from ${host}—never looked back!”`,
    author: 'A Very Happy Customer',
    seo: {
      title: `Niagara vs. ${host}: Best Decals`,
      description: `Discover why Niagara Stands Out outperforms ${host} in quality, price, and service.`,
      image: defaultImage,
      schema: {
        '@type': 'WebPage',
        '@id': `https://niagarastandsout.ca/seo/${slug}`,
        url: `https://niagarastandsout.ca/seo/${slug}`,
        name: `Compare ${name}`,
        description: `Head-to-head comparison between Niagara Stands Out and ${host}.`
      }
    }
  };
});

// Append unique
const append = newEntries.filter(e => !existingSlugs.has(e.slug));
const final = existing.concat(append);
fs.writeFileSync(dataFile, JSON.stringify(final, null, 2), 'utf-8');
console.log(`Appended ${append.length} compare pages; total entries: ${final.length}`);
