'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Collection } from '@/lib/shopify'; // your typed interface from getAllCollections
import { getImageForSlug } from '@/lib/assets';
import { ICON_ALTS } from '@/lib/assetsAlt';
import { IMAGE_META } from '@/lib/imageMeta';

interface Props {
  collections: Collection[];
}

export default function HomepageMenu({ collections }: Props) {
  return (
    <section className="bg-black py-12 px-4">
      <h3 className="text-white text-2xl font-bold mb-6 text-center">
        Explore Our Collections
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {collections.map((col) => (
          <Link
            key={col.handle}
            href={`/collections/${col.handle}`}
            className="group flex flex-col items-center bg-neutral-900 p-6 rounded-lg transition-shadow hover:shadow-lg hover:opacity-80"
          >
            <div className="w-20 h-20 mb-3 relative">
              {(() => {
                const meta = IMAGE_META[col.handle] || {};
                return (
                  <Image
                    src={getImageForSlug(col.handle, 'collection')}
                    alt={ICON_ALTS[col.handle] || col.imageAlt || col.title || col.handle.replace(/-/g, ' ')}
                    title={meta.title}
                    data-hover={meta.hover}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                );
              })()}
            </div>
            <span className="text-yellow-400 font-semibold text-center">
              {col.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
