// components/TrustIcons.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { ICONS } from '@/lib/assets';
import { ICON_ALTS } from '@/lib/assetsAlt';

interface Icon {
  slug: string;
  alt: string;
  label: string;
}

interface Props {
  icons?: Icon[];
}

const DEFAULT_ICONS: Icon[] = [
  { slug: 'icon-secure', alt: 'Secure Checkout', label: 'Secure Checkout' },
  { slug: 'icon-shipping', alt: 'Fast Shipping', label: 'Fast Shipping' },
  { slug: 'icon-quality', alt: 'Premium Quality', label: 'Premium Quality' },
  { slug: 'icon-support', alt: '24/7 Support', label: '24/7 Support' },
];

export default function TrustIcons({ icons = DEFAULT_ICONS }: Props) {
  return (
    <section className="flex flex-wrap justify-center items-center gap-8 my-12 px-4">
      {icons.map((icon, idx) => (
        <div key={idx} className="flex flex-col items-center text-center">
          <div className="relative w-12 h-12 mb-2">
            <Image
              src={ICONS[icon.slug] || ICONS.default}
              alt={ICON_ALTS[icon.slug] || icon.alt || icon.slug.replace(/-/g, ' ')}
              fill
              className="object-contain"
              unoptimized
              // dynamic CDN mapping, default fallback
            />
          </div>
          <span className="text-xs md:text-sm text-gray-300 font-medium">
            {icon.label}
          </span>
        </div>
      ))}
    </section>
  );
}