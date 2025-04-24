"use client";
import React from 'react';
import Image from 'next/image';
import { ICONS } from '@/lib/assets';
import { ICON_ALTS } from '@/lib/assetsAlt';

interface Logo {
  src: string;
  alt: string;
}

export default function AsSeenOn({ logos }: { logos: Logo[] }) {
  return (
    <section className="bg-neutral-900 bg-opacity-75 py-6 px-4 border-t-2 border-yellow-400">
      <p className="text-sm uppercase text-yellow-400 font-semibold tracking-widest text-center mb-4">
        As Seen On
      </p>
      <ul className="flex items-center justify-center flex-wrap gap-6 sm:gap-8">
        {logos.map((logo, i) => {
          const key = logo.src.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
          return (
            <li
              key={i}
              className="flex items-center justify-center"
              style={{ width: '48px', height: '48px' }}
            >
              <Image
                src={ICONS[key] || ICONS.default}
                alt={ICON_ALTS[key] || logo.alt || key.replace(/-/g, ' ')}
                width={48}
                height={48}
                className="w-full h-full object-contain opacity-60 hover:opacity-90 transition duration-200"
                style={{ filter: 'brightness(0) invert(1)' }}
                unoptimized
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
