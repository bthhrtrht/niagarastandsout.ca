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

// Preload target list
const targets: { slug: string; title: string }[] = [
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

const siteUrl = process.env.SITE_URL || 'https://www.example.com';
const defaultImage = '/cdn/shop/files/default-hero.jpg';
const dataDir = path.resolve(process.cwd(), 'data');
fs.mkdirSync(dataDir, { recursive: true });

// Build pages
const pages: SeoPage[] = targets.map(({ slug, title }) => ({
  slug,
  title,
  subtitle: title,
  cta: `Learn More`,
  productTag: slug,
  bodyHtml: `<p>Discover our ${title}. Durable, waterproof, and UV-resistant.</p>`,
  testimonial: '',
  author: '',
  faq: [],
  contactCTA: `Contact us to learn more about ${title} at ${siteUrl}/contact`,
  seo: {
    title,
    description: `Get ${title}.`,  
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: `Get ${title}.`,  
      url: `${siteUrl}/seo/${slug}`,
      image: defaultImage
    }
  }
}));

const outputFile = path.join(dataDir, 'seo-pages.json');
fs.writeFileSync(outputFile, JSON.stringify(pages, null, 2));
console.log(`Generated ${pages.length} preload SEO pages to ${outputFile}`);
