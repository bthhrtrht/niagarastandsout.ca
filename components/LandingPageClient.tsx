// components/LandingPageClient.tsx

'use client';

import React from 'react';
import StyledCTA from './StyledCTA';
import ProductGrid from './ProductGrid';
import AsSeenOn from './AsSeenOn';
import Countdown from './Countdown';
import Testimonial from './Testimonial';
import type { Collection } from '@/lib/shopify';
import { ICONS } from '@/lib/assets';

interface Props {
  collection: Collection;
  products: any[];
  jsonLd: any;
}

export default function LandingPageClient({ collection, products, jsonLd }: Props) {
  // Hero image fallback logic
  const baseImage = collection.image || '';
  const heroImage = baseImage
    ? baseImage
    : `https://source.unsplash.com/800x600/?${encodeURIComponent(
        collection.title.split(' ')[0]
      )},${encodeURIComponent(collection.title)}`;
  const heroAlt = collection.imageAlt || collection.title;

  return (
    <article className="min-h-screen bg-[radial-gradient(circle_at_50%_30%,#181c2b_70%,#0ff2_100%)] text-white flex flex-col items-center">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section with glowing CTA */}
      <header className="w-full py-12 flex justify-center">
        <div className="relative max-w-4xl w-full bg-neutral-900 bg-opacity-80 rounded-3xl p-8 cta-glow">
          <StyledCTA
            title={`${collection.title} — Delivered Fast`}
            subtitle={collection.description}
            button={{ text: 'Start My Order', link: `/collections/${collection.handle}` }}
            badges={[
              { text: 'Printed Locally in Niagara' },
              { text: 'Weatherproof Vinyl' },
              { text: 'Free Shipping on 3+ Packs' },
            ]}
            imageUrl={heroImage}
            imageAlt={heroAlt}
            asSeenOn={
              <AsSeenOn
                logos={[
                  { src: ICONS['etsy']?.title || ICONS.default.title, alt: 'Etsy' },
                  { src: ICONS['facebook']?.title || ICONS.default.title, alt: 'Facebook Marketplace' },
                  { src: ICONS['niagara-this-week']?.title || ICONS.default.title, alt: 'Niagara This Week' },
                ]}
              />
            }
            testimonial={
              <Testimonial
                quote="The decals were better than I imagined. I’ve ordered 3x now for my truck, business, and boat."
                author="Jay from Welland"
                imageUrl={`${ICONS['testimonials-base']}jay.jpg`}
              />
            }
          />
        </div>
      </header>

      {/* Countdown & Products */}
      <section className="w-full max-w-6xl px-4 mt-12">
        <Countdown deadline={new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString()} />
        <ProductGrid products={products} />
      </section>

      {/* Glow Animation Styles (global) */}
      <style jsx global>{`
        .cta-glow {
          box-shadow: 0 0 48px 10px #0ff6, 0 1.5px 8px #000a;
          animation: ctaglow 2.7s ease-in-out infinite alternate;
        }
        @keyframes ctaglow {
          from {
            box-shadow: 0 0 48px 10px #0ff6, 0 1.5px 8px #000a;
          }
          to {
            box-shadow: 0 0 96px 24px #0ff9, 0 1.5px 8px #000a;
          }
        }
      `}</style>
    </article>
  );
}
