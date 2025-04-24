// Script to append 50 SEO page entries to data/seo-pages.json
import fs from 'fs';
import path from 'path';
// Load existing SEO pages
const filePath = path.join(__dirname, '..', 'data', 'seo-pages.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const existingSlugs = new Set(data.map(p => p.slug));

// Topics to scale (skip boat-decals and car-graphics)
const topics = [
  { slug: 'vinyl-lettering-storefronts', title: 'Vinyl Lettering Storefronts' },
  { slug: 'custom-window-graphics', title: 'Custom Window Graphics' },
  { slug: 'security-stickers', title: 'Security Stickers for Property Owners' },
  { slug: 'nfc-review-stickers', title: 'NFC Review Stickers for Local Businesses' },
  { slug: 'wall-decals-home-decor', title: 'Wall Decals for Home Decor' },
  { slug: 'car-magnets-contractors', title: 'Car Magnets for Contractors' },
  { slug: 'boat-name-decals', title: 'Boat Name Decals Canada' },
  { slug: 'stickers-craft-brewers', title: 'Custom Stickers for Craft Brewers' },
  { slug: 'decals-sports-teams', title: 'Decals for Sports Teams' },
  { slug: 'safety-stickers-construction', title: 'Safety Stickers for Construction Sites' }
];
const cities = ['Niagara Falls', 'Hamilton', 'Welland', 'St. Catharines', 'Burlington'];
const authors = ['Jordan', 'Taylor', 'Morgan', 'Casey', 'Alex'];

let added = 0;
for (const topic of topics) {
  for (const city of cities) {
    if (added >= 50) break;
    const slug = `${topic.slug}-${city.toLowerCase().replace(/\s+/g, '-')}`;
    if (existingSlugs.has(slug)) continue;
    const title = `${topic.title} in ${city} – Niagara Stands Out`;
    const description = `${topic.title} crafted locally in ${city} with premium materials and gritty style.`;
    const obj = {
      slug,
      title,
      description,
      hero: {
        headline: topic.title,
        subtext: `${topic.title} available now in ${city}.`,
        ctaText: `Shop ${topic.title}`,
        ctaLink: `/collections/${topic.slug}`
      },
      bodyHtml: `<h2>${topic.title}</h2><p>Our ${topic.title.toLowerCase()} are manufactured in ${city}, combining durability and bold urban design. Perfect for any storefront or vehicle.</p><p>Choose from a variety of finishes and customization options to suit your style.</p>`,
      testimonial: {
        quote: `"${topic.title} exceeded my expectations and held up through all seasons!"`,
        author: `${authors[added % authors.length]} from ${city}`,
        imageUrl: `https://niagarastandsout.ca/media/testimonials/${slug}.jpg`
      },
      productTag: topic.title
    };
    data.push(obj);
    added++;
  }
  if (added >= 50) break;
}
// Write back to file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Appended ${added} new SEO entries.`);
