import { getAllCollections } from '../lib/getAllCollections';
import fs from 'fs';
import path from 'path';

async function generateSitemap() {
  const baseUrl = 'https://niagarastandsout.com/pages/';
  const collections = await getAllCollections();
  const urls = collections.map((col: any) => `  <url>\n    <loc>${baseUrl}${col.handle}</loc>\n  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, sitemap, 'utf8');
  console.log(`Sitemap generated at ${outPath}`);
}

generateSitemap();
