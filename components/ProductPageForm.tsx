'use client';

import React from 'react';
import ProductInfoPanel from '@/components/ProductInfoPanel';

interface Variant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
}

interface Props {
  title: string;
  variants: Variant[];
  tags?: string[];
}

export default function ProductPageForm({ title, variants, tags }: Props) {
  const uploadSection = tags?.includes('custom') ? (
    <div className="my-4">
      <label className="block text-white font-semibold mb-2">Upload your file:</label>
      <input
        type="file"
        className="block w-full text-gray-200 bg-neutral-800 border border-neutral-700 rounded-lg p-2"
      />
    </div>
  ) : null;

  const onAddToCart = (variantId: string) => {
    console.log('Add to Cart', variantId);
  };

  const onBuyNow = (variantId: string) => {
    console.log('Buy Now', variantId);
  };

  return (
    <ProductInfoPanel
      title={title}
      variants={variants}
      onAddToCart={onAddToCart}
      onBuyNow={onBuyNow}
      uploadSection={uploadSection}
    />
  );
}
