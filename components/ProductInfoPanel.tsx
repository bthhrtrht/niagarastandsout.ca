'use client';

import React, { useState } from 'react';

interface Variant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
}

interface Props {
  title: string;
  variants: Variant[];
  onAddToCart: (variantId: string) => void;
  onBuyNow: (variantId: string) => void;
  uploadSection?: React.ReactNode;
}

export default function ProductInfoPanel({
  title,
  variants,
  onAddToCart,
  onBuyNow,
  uploadSection,
}: Props) {
  // Default to first variant
  const [selectedId, setSelectedId] = useState<string>(variants[0]?.id);
  const selectedVariant = variants.find((v) => v.id === selectedId) || variants[0]!;

  return (
    <div className="bg-neutral-900 rounded-xl p-6 shadow-lg max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-yellow-400 mb-4 drop-shadow">
        {title}
      </h1>

      {/* Variant Selector */}
      <label htmlFor="variant-select" className="block text-white mb-2 font-medium">
        Choose an option:
      </label>
      <select
        id="variant-select"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="w-full mb-4 px-3 py-2 bg-neutral-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        {variants.map((v) => (
          <option key={v.id} value={v.id}>
            {v.title}
          </option>
        ))}
      </select>

      {/* Price Display */}
      <div className="text-lg text-white mb-6">
        From{' '}
        <span className="text-yellow-400 font-bold">
          {new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: selectedVariant.price.currencyCode,
          }).format(Number(selectedVariant.price.amount))}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button
          onClick={() => onAddToCart(selectedVariant.id)}
          className="flex-1 px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow hover:bg-yellow-300 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onBuyNow(selectedVariant.id)}
          className="flex-1 px-4 py-2 bg-black text-yellow-400 font-bold rounded-lg border border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
        >
          Buy Now
        </button>
      </div>

      {/* Optional Upload Section */}
      {uploadSection && <div className="mt-4">{uploadSection}</div>}
    </div>
  );
}
