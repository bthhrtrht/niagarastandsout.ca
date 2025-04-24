#!/usr/bin/env tsx
import fs from 'fs';
import path from 'path';

interface SeoPage {
  slug: string;
  title: string;
  subtitle: string;
  cta: string;
  productTag: string;
  bodyHtml: string;
  testimonial: string;
  author: string;
  faq: { question: string; answer: string }[];
  contactCTA: string;
  seo: {
    title: string;
    description: string;
    jsonLd: object;
  };
}

const args = process.argv.slice(2);
const isPreview = args.includes('--preview');
const isOverwrite = args.includes('--overwrite');

const scriptDir = path.dirname(new URL(import.meta.url).pathname);
const dataDir = path.resolve(scriptDir, '../data');
const outputFile = path.resolve(dataDir, 'seo-pages.json');

fs.mkdirSync(dataDir, { recursive: true });

const defaultImage = 'https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg';
const siteUrl = process.env.SITE_URL || 'https://www.example.com';

// Preload specific sniper targets
const targets = [
  { slug: 'boat-decals-niagara', title: 'Custom Boat Decals in Niagara' },
  { slug: 'storefront-decals-hamilton', title: 'Storefront Window Decals for Hamilton Shops' },
  { slug: 'waterproof-labels-niagara', title: 'Waterproof Labels for Niagara Businesses' },
  { slug: 'cannabis-labels-canada', title: 'Legal Cannabis Stickers & Packaging Labels' },
  { slug: 'wedding-signs-niagara', title: 'Custom Wedding Welcome Signs in Niagara' },
  { slug: 'car-magnets-ontario', title: 'Ontario’s Custom Car Magnet Printing' },
  { slug: 'bulk-yard-signs-niagara', title: 'Bulk Custom Yard Signs – Fast Niagara Printing' },
  { slug: 'rv-graphics-ontario', title: 'RV + Trailer Decals Across Ontario' },
  { slug: 'pet-memorial-stickers', title: 'Personalized Pet Memorial Decals (Canada)' },
  { slug: 'storefront-decals-st-catharines', title: 'Vinyl Window Decals for St. Catharines' },
  { slug: 'tote-bags-custom-design', title: 'Custom Design Tote Bags Printed Locally' },
  { slug: 'decals-for-small-business', title: 'Decals for Small Businesses (Local Printing)' },
  { slug: 'funny-stickers-canada', title: 'Funny Vinyl Stickers Made in Canada' },
  { slug: 'laptop-stickers-artist', title: 'Custom Laptop Stickers for Designers' },
  { slug: 'ai-generated-decals', title: 'AI-Generated Stickers from Your Prompts' },
  { slug: 'free-svg-canada', title: 'Free SVG Files for Cutting in Canada' },
  { slug: 'overland-vehicle-decals', title: 'National Park + Adventure Decals' },
  { slug: 'business-labels-ontario', title: 'Branded Business Labels – Ontario Print Shop' },
  { slug: 'reflective-boat-numbers', title: 'Transport Canada Reflective Boat Numbers' },
  { slug: 'metallic-boat-decals', title: 'Premium Metallic Boat Name Decals' },
  { slug: 'nfc-review-stickers', title: 'NFC Stickers to Get More Google Reviews' },
  { slug: 'custom-banner-niagara', title: 'Custom Event Banners – Niagara Region' },
  { slug: 'funny-signs-home-decor', title: 'Funny Signs for Your Kitchen & Man Cave' },
  { slug: 'patriotic-decals-canada', title: 'Canadian Flag + Military Pride Decals' },
  { slug: 'svg-bundle-download', title: 'Urban SVG Cut File Bundles (Free & Paid)' },
  { slug: 'plane-tail-numbers', title: 'Aircraft Tail Numbers + Lettering Kits' },
  { slug: 'cannabis-labels-niagara', title: 'Local Niagara Cannabis Product Labels' },
  { slug: 'waterproof-stickers-niagara', title: 'Waterproof Custom Stickers (Fast Turnaround)' },
  { slug: 'branding-labels-craft-products', title: 'Labels for Candles, Jars, Packaging' },
  { slug: 'car-magnets-bulk-order', title: 'Car Magnets Bulk Order Deal – Free Shipping' },
  { slug: 'storefront-decals-toronto', title: 'Toronto Storefront Decals – Delivered Fast' }
];
const cities = ['Niagara Falls', 'St. Catharines', 'Hamilton', 'Fort Erie'];
const authors = ['Alex', 'Priya', 'Jordan', 'Taylor'];
// Build selected array with rotating city and author
const selected = targets.map((t, i) => ({
  item: { handle: t.slug, title: t.title },
  city: cities[i % cities.length],
  author: `${authors[i % authors.length]} from ${cities[i % cities.length]}`
}));

const newPages: SeoPage[] = selected.map(({ item, city, author }) => {
  const slug = item.handle;
  const title = item.title;
  const subtitle = `${title} delivered to ${city}`;
  const cta = `Shop ${title}`;
  const testimonial = `This ${title} was perfect for my project in ${city}!`;
  // Cross-links to next 3 targets
  const related = targets.filter(x => x.slug !== slug);
  const links = related.slice(0,3).map(r => `<a href="/seo/${r.slug}" class="text-blue-500">${r.title}</a>`).join(' · ');
  const bodyHtml = `<p>Discover our ${title} in ${city}, designed for your needs. ${links}</p>`;
  const seoTitle = title;
  const seoDescription = `Get premium ${title} in ${city}. UV resistant, waterproof, and made to last.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoTitle,
    description: seoDescription,
    url: `${siteUrl}/seo/${slug}`,
    image: defaultImage
  };

  const faq = [
    {
      question: `What makes ${item.title} decals in ${city} durable?`,
      answer: `Our ${item.title} decals use premium vinyl material with UV-resistant lamination to ensure long-lasting performance in ${city}'s climate.`
    },
    {
      question: `How long does shipping to ${city} take?`,
      answer: `We offer fast shipping to ${city}, usually arriving within 3-5 business days.`
    },
    {
      question: `Can I customize my ${item.title} decal design?`,
      answer: `Yes! Use our design tool to upload images or text and preview your custom ${item.title} decal before ordering.`
    }
  ];
  const contactCTA = `Have more questions? Contact us at ${siteUrl}/contact or call us today!`;

  return {
    slug,
    title,
    subtitle,
    cta,
    productTag: item.handle,
    bodyHtml,
    testimonial,
    author,
    faq,
    contactCTA,
    seo: { title: seoTitle, description: seoDescription, jsonLd }
  };
});

let existing: SeoPage[] = [];
if (fs.existsSync(outputFile)) {
  try {
    existing = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
  } catch {
    console.warn(`Could not parse existing output. Overwriting.`);
    existing = [];
  }
}

let finalPages: SeoPage[];
if (isOverwrite) {
  finalPages = newPages;
} else {
  const existingSlugs = new Set(existing.map(p => p.slug));
  finalPages = [...existing, ...newPages.filter(p => !existingSlugs.has(p.slug))];
}

if (isPreview) {
  console.log(JSON.stringify(finalPages, null, 2));
} else {
  fs.writeFileSync(outputFile, JSON.stringify(finalPages, null, 2));
  console.log(`Generated ${finalPages.length} SEO pages to ${outputFile}`);
}
