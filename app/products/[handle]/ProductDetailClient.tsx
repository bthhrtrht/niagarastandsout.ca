'use client';

import React from 'react';
import { Product } from '@/lib/shopify';
import Image from 'next/image';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const handleAddToCart = () => {
    // TODO: call your cart API, e.g. fetch('/api/cart', { method: 'POST', body: JSON.stringify({ id: product.handle }) })
  };

  const handleBuyNow = () => {
    // TODO: redirect to checkout, e.g. window.location.href = '/checkout';
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image
          src={product.images.edges[0].node.originalSrc}
          alt={product.images.edges[0].node.altText ?? product.title}
          width={600}
          height={600}
          priority
        />
        <div className="space-y-6">
          <p className="text-lg">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Buy It Now
          </button>
        </div>
      </div>
    </div>
  );
}
