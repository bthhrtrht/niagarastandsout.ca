'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FreeSvgEntry } from '@/types';

interface Props {
  page: FreeSvgEntry;
  all: FreeSvgEntry[];
}

export default function FreeSvgPage({ page, all }: Props) {
  const fallbackImage = 'https://niagarastandsout.ca/cdn/shop/files/default-svg-cover.png';
  const initialSrc = `https://niagarastandsout.ca/cdn/shop/files/${page.image}`;
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);

  return (
    <main className="min-h-screen bg-black text-text p-6">
      {/* Page Title & Description */}
      <h1 className="text-3xl font-heading text-accent mb-4">
        {page.title} – Free SVG Files in Canada
      </h1>
      <p className="mb-6 max-w-prose">
        {page.description || 'Download 100% free, high-quality SVG files for crafting and resale.'}
      </p>

      {/* Hero Image */}
      <div className="w-full max-w-lg mx-auto mb-8">
        <Image
          src={imgSrc}
          alt={`${page.title} — Free SVG`}
          width={600}
          height={400}
          unoptimized
          className="rounded shadow-lg"
          onError={() => setImgSrc(fallbackImage)}
        />
      </div>

      {/* Benefits List */}
      <ul className="benefits list-none space-y-2 mb-8 max-w-md mx-auto">
        <li>✔️ 100% Free Downloads</li>
        <li>✔️ Compatible with Cricut & Silhouette</li>
        <li>✔️ Small Business & Resale Friendly Licensing</li>
        <li>✔️ Includes SVG, PNG & DXF Formats</li>
      </ul>

      {/* Newsletter CTA */}
      <div className="text-center mb-10">
        <Link
          href="/pages/newsletter"
          className="cta-btn bg-accent text-background font-semibold"
        >
          Subscribe for New SVG Drops
        </Link>
      </div>

      {/* Inline Signup Form */}
      <form
        action="https://your-newsletter-url.com"
        method="POST"
        className="newsletter-form flex flex-col sm:flex-row gap-3 mb-12 max-w-lg mx-auto"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="flex-grow bg-neutral-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-accent text-background rounded-r-md font-bold hover:opacity-90 transition"
        >
          Sign Me Up
        </button>
      </form>

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWorkSeries",
            name: `${page.title} Free SVG Collection`,
            author: { "@type": "Organization", name: "Niagara Stands Out" },
            about: "Free SVG files for Canadian crafters and small business resale use.",
            image: imgSrc,
            inLanguage: "en-CA",
          }),
        }}
      />

      {/* Related Collections */}
      <section className="mt-16">
        <h2 className="text-2xl font-heading text-accent mb-6">
          More Free SVG Collections
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {all
            .filter((p) => p.handle !== page.handle)
            .map((p) => (
              <li key={p.handle}>
                <Link
                  href={`/free-svgs/${p.handle}`}
                  className="block bg-neutral-900 p-4 rounded hover:bg-neutral-800 transition text-text"
                >
                  {p.title}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
