// app/page.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCollections } from '@/lib/shopify';
import HomepageMenu from '@/components/HomepageMenu';
import CountdownBar from '@/components/CountdownBar';
import AsSeenOn from '@/components/AsSeenOn';
import Testimonials from '@/components/Testimonials';
import TrustIcons from '@/components/TrustIcons';
import FeaturedSnipers from '@/components/FeaturedSnipers';
import seoPages from '@/data/seo-pages.json';

export default async function HomePage() {
  const collections = await getAllCollections();

  return (
    <main className="bg-black text-white font-main">
      {/* Promo Banner */}
      <CountdownBar />

      {/* Hero Section */}
      <section className="relative text-center py-28 px-6">
        <div className="absolute inset-0">
          <Image
            src="https://niagarastandsout.ca/cdn/shop/files/default-hero.avif"
            alt="Hero background"
            fill
            priority
            unoptimized={false}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-heading text-yellow-400 drop-shadow mb-6">
            Custom Decals That Stand Out
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Built in Niagara. Trusted across Canada. UV-resistant, waterproof, and made to last.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-300 transition shadow-lg"
          >
            Start Your Order Now
          </Link>
        </div>
      </section>

      <FeaturedSnipers />

      <section className="py-12 px-6 bg-neutral-900 text-white">
        <h2 className="text-2xl font-bold mb-4">🔥 Featured Sniper Pages</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {seoPages.slice(0, 5).map(p => (
            <li key={p.slug}>
              <Link href={`/seo/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Collections Menu */}
      <HomepageMenu collections={collections} />

      {/* As Seen On */}
      <AsSeenOn logos={[
        { src: 'https://niagarastandsout.ca/media/logos/etsy.svg', alt: 'Etsy' },
        { src: 'https://niagarastandsout.ca/media/logos/facebook.svg', alt: 'Facebook Marketplace' },
        { src: 'https://niagarastandsout.ca/media/logos/niagara-this-week.svg', alt: 'Niagara This Week' },
      ]} />

      {/* Testimonials */}
      <Testimonials testimonials={[
        { quote: 'The decals were top quality!', author: 'Alex from Toronto' },
        { quote: 'Fast shipping and amazing service.', author: 'Priya from Ottawa' },
      ]} />

      {/* Trust Icons */}
      <TrustIcons />
    </main>
  );
}
