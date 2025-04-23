#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';
import { getAllCollections } from '../lib/shopify';

interface SeoEntry {
  slug: string;
  title: string;
  subtitle: string;
  cta: string;
  productTag: string;
  bodyHtml: string;
  testimonial: string;
  author: string;
  faq: { question: string; answer: string }[];
  seo: {
    title: string;
    description: string;
    image: string;
    schema: object;
  };
}

async function main() {
  const args = process.argv.slice(2);
  const isOverwrite = args.includes('--overwrite');

  const dataDir = path.resolve(process.cwd(), 'data');
  fs.mkdirSync(dataDir, { recursive: true });
  const outFile = path.join(dataDir, 'seo-pages.json');

  let existing: SeoEntry[] = [];
  if (!isOverwrite && fs.existsSync(outFile)) {
    try {
      existing = JSON.parse(fs.readFileSync(outFile, 'utf-8'));
    } catch {}
  }

  const collections = await getAllCollections();
  const entries: SeoEntry[] = collections.map(col => {
    const slug = col.handle;
    const title = col.title;
    const lower = title.toLowerCase();
    return {
      slug,
      title: `${title} in Niagara Falls | ${title}`,
      subtitle: `Premium ${lower} built for Ontario`,
      cta: `Shop ${title} Now`,
      productTag: title,
      bodyHtml: `<h2>${title} for Niagara Falls</h2><p>Discover our ${lower}, customizable, durable, and delivered fast.</p>`,
      testimonial: `“These ${lower} turned heads on my ride!”`,
      author: `Jordan from Niagara Falls`,
      faq: [
        { question: `How long do ${lower} last?`, answer: `Our marine-grade vinyl lasts 5+ years outdoors.` },
        { question: `Can I install them myself?`, answer: `Yes – each pack includes a step-by-step guide.` }
      ],
      seo: {
        title: `${title} in Niagara Falls | Shop Now`,
        description: `Discover top-quality ${lower}—customizable, durable, and delivered fast.`,
        image: col.image || '',
        schema: {
          "@context": "https://schema.org",
          "@type": "Product",
          name: title,
          image: [col.image || ''],
          description: `High-quality ${lower}`,
          brand: { "@type": "Brand", name: "Niagara Stands Out" }
        }
      }
    };
  });

  const final = isOverwrite
    ? entries
    : existing.concat(entries.filter(e => !existing.some(ex => ex.slug === e.slug)));

  fs.writeFileSync(outFile, JSON.stringify(final, null, 2));
  console.log(`Generated ${entries.length} entries; total entries: ${final.length}`);
}

main().catch(err => { console.error(err); process.exit(1); });
