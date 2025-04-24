// Bulk SEO pages auto-generator: tags × cities with random CTAs and testimonials
import fs from 'fs';
import path from 'path';

// Define your Shopify tags and schema mapping
const tags = [
  { name: 'Boat Decals', schema: 'Product' },
  { name: 'Car Magnets', schema: 'Product' },
  { name: 'Vinyl Lettering', schema: 'Product' },
  { name: 'NFC Labels', schema: 'Product' },
  { name: 'Custom Window Decals', schema: 'LocalBusiness' },
  { name: 'Brewery Labels', schema: 'Product' },
  { name: 'Security Stickers', schema: 'Product' },
];

// Target cities
const cities = [
  'Niagara Falls',
  'Hamilton',
  'Welland',
  'St. Catharines'
];

// Variations for CTA and testimonials
const ctas = [
  'Start Your Custom Order',
  'Get Yours Today',
  'Order Now',
  'Customize and Order',
  'Shop Now and Save',
  'Grab Yours Now',
];

const testimonialTemplates = [
  '“{tag} in {city} exceeded my expectations with top-notch quality!”',
  '“I’m impressed by how durable the {tag} held up in {city} weather.”',
  '“Thanks to Niagara Stands Out, my {tag} installation turned heads in {city}!”',
  '“These {tag} are a game-changer for my business in {city}.”',
  '“Best {tag} I’ve purchased in {city} – five stars!”',
];

// Helpers
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Load existing SEO pages
const filePath = path.join(__dirname, '..', 'data', 'seo-pages.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Generate new entries
tags.forEach(({ name: tag, schema }) => {
  cities.forEach(city => {
    const slug = `${slugify(tag)}-${slugify(city)}`;
    if (data.some(p => p.slug === slug)) return;

    const cta = randomItem(ctas);
    const testimonial = randomItem(testimonialTemplates)
      .replace('{tag}', tag.toLowerCase())
      .replace('{city}', city);
    const authorNames = ['Avery', 'Jordan', 'Taylor', 'Morgan', 'Casey'];
    const author = `${randomItem(authorNames)} from ${city}`;

    const entry = {
      slug,
      title: `${tag} in ${city} – Niagara Stands Out`,
      subtitle: `${tag} customized for ${city} customers.`,
      cta,
      productTag: tag,
      bodyHtml: `
        <h2>${tag} for ${city}</h2>
        <p>Our ${tag.toLowerCase()} are crafted locally in ${city}, blending durability with gritty urban style.</p>
        <p>Perfect for businesses and individuals looking to stand out on ${tag.includes('Boat') ? 'waterways' : 'streets'} in ${city}.</p>
      `,
      testimonial,
      author,
      seo: {
        title: `${tag} in ${city} | Niagara Stands Out`,
        description: `${tag} customized for ${city} customers with premium materials and local expertise.`,
        image: 'https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg',
        schema: { '@type': schema }
      }
    };
    data.push(entry);
  });
});

// Save back to JSON
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('Auto-generated SEO entries. Total now:', data.length);
