"use client";
import React from "react";
import type { Product } from "@/lib/shopify";

type Props = { data: Product };

export default function ProductDetailClient({ data }: Props) {
  const handleAdd = () => {
    // TODO: call your cart API, e.g. fetch('/api/cart', { method: 'POST', body: JSON.stringify({ id: data.id }) })
  };
  const handleBuyNow = () => {
    // TODO: redirect to checkout, e.g. window.location.href = '/checkout';
  };

  return (
    <div className="bg-neutral-900 rounded-xl p-6 shadow-lg max-w-md mx-auto">
      <h1 className="text-3xl font-extrabold text-yellow-400 mb-4 drop-shadow">
        {data.title}
      </h1>
      {/* TODO: render images, variant selector, price, etc. */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="px-4 py-2 bg-black text-yellow-400 font-bold rounded border border-yellow-400 hover:bg-yellow-400 hover:text-black transition"
        >
          Buy Now
        </button>
      </div>
      {data.tags.includes("custom") && (
        <div className="mt-4">
          <label className="block text-white font-semibold mb-2">Upload your file:</label>
          <input
            type="file"
            className="block w-full text-gray-200 bg-neutral-800 border border-neutral-700 rounded p-2"
          />
        </div>
      )}
    </div>
  );
}
