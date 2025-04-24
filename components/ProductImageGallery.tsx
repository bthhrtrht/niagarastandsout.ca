'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageNode {
  originalSrc: string;
  altText?: string | null;
}

interface ImageEdge {
  node: ImageNode;
}

interface Props {
  images: ImageEdge[];
}

export default function ProductImageGallery({ images }: Props) {
  const [selected, setSelected] = useState<number>(0);
  if (!images || images.length === 0) return null;

  const selectedImage = images[selected]?.node;
  const fallbackSrc = 'https://niagarastandsout.ca/cdn/shop/files/default-hero.jpg';

  return (
    <div className="w-full md:w-1/2 px-4">
      <div className="sticky top-24">
        {/* Main Image */}
        <div className="aspect-[4/3] bg-neutral-800 rounded-lg overflow-hidden mb-4">
          <Image
            src={selectedImage.originalSrc || fallbackSrc}
            alt={selectedImage.altText || 'Product image'}
            width={800}
            height={600}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, idx) => {
            const src = img.node.originalSrc || fallbackSrc;
            const alt = img.node.altText || `Thumbnail ${idx + 1}`;
            const isActive = idx === selected;

            return (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition ${
                  isActive ? 'border-yellow-400' : 'border-neutral-700 hover:border-neutral-500'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
