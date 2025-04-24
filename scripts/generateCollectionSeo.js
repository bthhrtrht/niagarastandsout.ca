#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Collections list source
const collections = [
  { handle: 'boat-decals-graphics', name: 'Boat Decals & Graphics' },
  { handle: 'registration-numbers', name: 'Registration Numbers' },
  { handle: 'custom-decals', name: 'Custom Decals' },
  { handle: 'custom-stickers', name: 'Custom Stickers' },
  { handle: 'laptop-stickers', name: 'Laptop Stickers' },
  { handle: 'rv-trailer-graphics', name: 'RV & Trailer Graphics' },
  { handle: 'storefront-decals', name: 'Storefront Decals' },
  { handle: 'commercial-vehicle', name: 'Commercial Vehicle Graphics' },
  { handle: 'waterproof-stickers', name: 'Waterproof Stickers & Labels' },
  { handle: 'canadian-souvenir-decals', name: 'Canadian Souvenir Decals' },
  { handle: 'funny-stickers', name: 'Funny Stickers' },
  { handle: 'kitchen-decals', name: 'Kitchen Decals' },
  { handle: 'outdoor-adventure-decals', name: 'Outdoor Adventure Decals' },
  { handle: 'animal-decals', name: 'Animal Decals' },
  { handle: 'gaming-decals', name: 'Gaming Decals' },
  { handle: 'plane-tail-numbers-markings', name: 'Plane Tail Numbers & Markings' },
  { handle: 'cannabis-stickers-labels', name: 'Cannabis Stickers & Labels' },
  { handle: 'wedding-signage', name: 'Wedding Signage' },
  { handle: 'patriotic-decals', name: 'Patriotic Decals' },
  { handle: 'logo-decals', name: 'Logo Decals' },
  { handle: 'urban-gritty-svg-cut-files', name: 'Urban Gritty SVG & Cut Files' },
  { handle: 'free-designs', name: 'Free Designs' },
  { handle: 'wrap-collection', name: 'Wrap Collection' },
  { handle: 'sports-collection', name: 'Sports Collection' },
  { handle: 'tote-bags', name: 'Tote Bags' },
  { handle: 'car-magnets', name: 'Car Magnets' },
  { handle: 'banners-large-prints', name: 'Banners & Large Prints' },
  { handle: 'birthday-vinyl-decals', name: 'Birthday Vinyl Decals' },
  { handle: 'brand-decals', name: 'Brand Decals & Merchandise' },
  { handle: 'business-collection', name: 'Business Collection' },
  { handle: 'bulk-deals', name: 'Bulk Deals' },
];

// Distribution cities and authors pool
const cities = ['Niagara Falls', 'Hamilton', 'Welland', 'St. Catharines', 'Burlington'];
const authors = ['Avery', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Darnell', 'Jessie', 'Sam', 'Alex', 'Casey'];

// Helpers
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Build entries
const entries = collections.map((col, idx) => {
  const city = cities[idx % cities.length];
  return {
    slug: `${col.handle}-${slugify(city)}`,
    title: `${col.name} in ${city} – Niagara Stands Out`,
    subtitle: `Locally crafted ${col.name.toLowerCase()} for ${city} customers.`,
    cta: `Order Your Custom ${col.name}`,
    productTag: col.handle,
    bodyHtml: `<h2>${col.name} for ${city}</h2><p>Our ${col.name.toLowerCase()} are manufactured in ${city} with premium materials and a gritty urban aesthetic.</p><p>Durable, waterproof, and UV-resistant – perfect for personal and commercial use in and around ${city}.</p>`,
    testimonial: `“These ${col.name.toLowerCase()} withstood months of outdoor exposure without fading.”`,
    author: `${authors[idx % authors.length]} from ${city}`,
    seo: {
      title: `${col.name} ${city} | Niagara Stands Out`,
      description: `High-quality ${col.name.toLowerCase()} made locally in ${city}. Durable, waterproof, and designed to last.`,
      image: 'https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: col.name,
        brand: { '@type': 'Brand', name: 'Niagara Stands Out' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'CAD',
          price: '19.99',
          availability: 'https://schema.org/InStock',
        },
      },
    },
  };
});

// Write to JSON
const outPath = path.join(__dirname, '../data/seo-pages.json');
fs.writeFileSync(outPath, JSON.stringify(entries, null, 2));
console.log(`Generated ${entries.length} sniper pages at ${outPath}`);
