// app/page.tsx

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCollections, getFrontpageProducts } from '@/lib/shopify';
import AsSeenOn from '@/components/AsSeenOn';
import ProductGrid from '@/components/ProductGrid';
import RelatedCarousel from '@/components/RelatedCarousel';

export const dynamic = 'force-static';

export default async function HomePage() {
  const collections = await getAllCollections();
  const products = await getFrontpageProducts();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="preload" href="/hero-wrap.jpg" as="image" />
        <link rel="canonical" href="https://shopify-headless-complete.vercel.app/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [{"@type":"ListItem",position:1,name:"Home",item:"https://shopify-headless-complete.vercel.app/"}]
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({"@type":"ListItem",position:i+1,url:`https://shopify-headless-complete.vercel.app/products/${p.handle}`}))
        })}} />
      </Head>
      <main className="font-main">
        {/* Hero */}
        <header className="relative h-[60vh] flex items-center justify-center bg-[url('/hero-wrap.jpg')] bg-cover bg-center before:absolute before:inset-0 before:bg-black/50 text-white">
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl sm:text-6xl font-bold">Custom Boat, Vehicle & Retail Graphics — Printed in Niagara</h1>
            <p className="mt-4 text-lg">Ships in 48 h · Eco-solvent inks · 10 yr vinyl</p>
            <a href="#product-gallery" className="inline-block mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-300 transition">Start Your Design →</a>
          </div>
        </header>

        {/* Social Proof */}
        <section aria-labelledby="trusted-by" className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 id="trusted-by" className="text-xl font-semibold mb-4">Trusted by</h2>
            <AsSeenOn logos={[
              { src: 'https://niagarastandsout.ca/media/logos/etsy.svg', alt: 'Etsy' },
              { src: 'https://niagarastandsout.ca/media/logos/facebook.svg', alt: 'Facebook Marketplace' },
              { src: 'https://niagarastandsout.ca/media/logos/niagara-this-week.svg', alt: 'Niagara This Week' },
            ]} />
            <p className="mt-4 font-medium">★★★★★ 4.9/5 from 1,824 orders</p>
          </div>
        </section>

        {/* Product-Family Gallery */}
        <section id="product-gallery" aria-labelledby="product-families-title" className="py-12 container mx-auto px-4">
          <h2 id="product-families-title" className="text-3xl font-semibold mb-8 text-center">Our Product Families</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {collections.map(c => (
              <Link key={c.handle} href={`/collections/${c.handle}`} className="group block overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition">
                <div className="relative w-full h-36">
                  <Image src={c.image || '/placeholder.jpg'} alt={c.title} fill className="object-cover group-hover:scale-110 transition" />
                </div>
                <h3 className="mt-2 text-center font-medium">{c.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section aria-labelledby="featured-products" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 id="featured-products" className="text-3xl font-semibold text-center mb-8">Featured Products</h2>
            <ProductGrid products={products} />
          </div>
        </section>

        {/* Configurator Teaser */}
        <section aria-labelledby="configurator-title" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 id="configurator-title" className="text-3xl font-semibold mb-4">Design in 3 Clicks</h2>
            <Image src="/configurator.gif" alt="Configurator Teaser" width={800} height={450} className="mx-auto rounded-lg shadow-lg" />
            <Link href="/configurator" className="inline-block mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-300 transition">Start Designing</Link>
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section aria-labelledby="featured-work-title" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 id="featured-work-title" className="text-3xl font-semibold mb-8 text-center">Featured Products Carousel</h2>
            <RelatedCarousel products={products} />
          </div>
        </section>

        {/* Education / FAQ */}
        <section aria-labelledby="faq-title" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 id="faq-title" className="text-3xl font-semibold mb-4 text-center">Boat Decals FAQ</h2>
            <details className="mb-4">
              <summary className="cursor-pointer font-medium">What is the turnaround time?</summary>
              <p className="mt-2">We ship within 48 hours using eco-solvent inks and durable vinyl.</p>
            </details>
            <details className="mb-4">
              <summary className="cursor-pointer font-medium">Are the decals weather resistant?</summary>
              <p className="mt-2">Yes, all prints are waterproof and UV-resistant for outdoor use.</p>
            </details>
            {/* More FAQ */}
          </div>
        </section>

        {/* Free SVG Funnel */}
        <section aria-labelledby="free-svg-title" className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 id="free-svg-title" className="text-3xl font-semibold mb-4">Download 150 Free SVGs</h2>
            <a href="https://forms.gle/YOUR_FORM_ID" target="_blank" rel="noopener" className="inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-300 transition">Download Now</a>
          </div>
        </section>
      </main>
      {/* Sticky Quote Button */}
      <a href="/contact" className="fixed bottom-4 right-4 z-50 bg-yellow-400 text-black px-4 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition">Get a Quote</a>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Services</h3>
            <ul>
              <li><Link href="/collections/boat-wraps" className="hover:underline">Boat Wraps</Link></li>
              <li><Link href="/collections/fleet-graphics" className="hover:underline">Fleet Graphics</Link></li>
              <li><Link href="/collections/retail-pop" className="hover:underline">Retail POP</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p>123 Main St, Niagara Falls, ON</p>
            <p>(555) 123-4567</p>
            <p>Mon-Fri: 9am – 5pm</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Credibility</h3>
            <div className="flex space-x-4">
              <Image src="/payment-visa.svg" alt="Visa" width={48} height={30} />
              <Image src="/payment-mastercard.svg" alt="Mastercard" width={48} height={30} />
              <Image src="/bbb-seal.svg" alt="BBB Accredited Business" width={48} height={48} />
            </div>
          </div>
        </div>
        <p className="text-center text-sm mt-8">&copy; {new Date().getFullYear()} Shopify Headless Complete. All rights reserved.</p>
      </footer>
    </>
  );
}
