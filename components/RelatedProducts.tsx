// components/RelatedProducts.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ICONS } from '@/lib/assets';
import { ICON_ALTS } from '@/lib/assetsAlt';

interface Product {
  handle: string;
  title: string;
  image: string;
}

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  if (!products || products.length === 0) return null;

  return (
    <section className="bg-black py-8 px-4 rounded-xl shadow-lg my-8 max-w-5xl mx-auto">
      <h2 className="text-yellow-400 text-2xl font-bold mb-6 text-center">
        Related Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.handle}
            href={`/products/${p.handle}`}
            className="block bg-neutral-900 rounded-lg p-4 transition hover:bg-neutral-800"
          >
            <div className="relative w-full aspect-square mb-2">
              <Image
                src={p.image || ICONS.default}
                alt={ICON_ALTS[p.handle] || p.title || p.handle.replace(/-/g, ' ')}
                fill
                className="object-cover rounded"
                unoptimized
                // dynamic fallback to default icon
              />
            </div>
            <div className="text-white font-semibold text-center">{p.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
