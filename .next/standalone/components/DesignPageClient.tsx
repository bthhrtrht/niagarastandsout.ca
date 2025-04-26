"use client";

import React from 'react';
import FontSelector from '@/components/FontSelector';
import UploadButton from '@/components/UploadButton';
import CanvasDesigner from '@/components/CanvasDesigner';
import PreviewArea from '@/components/PreviewArea';

interface DesignPageClientProps {
  collectionTitle: string;
}

export default function DesignPageClient({ collectionTitle }: DesignPageClientProps) {
  return (
    <>
      {/* Canvas Designer */}
      <section className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-1/4 space-y-4">
            <FontSelector fonts={[
              'Bebas Neue',
              'Oswald',
              'Anton',
            ]} />
            <UploadButton />
          </aside>
          <div className="lg:w-3/4">
            <CanvasDesigner width={800} height={600} />
            <PreviewArea />
          </div>
        </div>
      </section>

      {/* Checkout CTA */}
      <section className="text-center mb-12">
        <button
          onClick={() => {/* addToCart(designConfig) */}}
          className="bg-yellow-400 text-neutral-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
        >
          Add Your Custom {collectionTitle} to Cart
        </button>
      </section>
    </>
  );
}
