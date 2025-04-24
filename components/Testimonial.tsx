// components/Testimonial.tsx

'use client';

import React from 'react';

interface Props {
  quote: string;
  author: string;
  imageUrl?: string;
}

export default function Testimonial({ quote, author, imageUrl }: Props) {
  return (
    <blockquote className="relative bg-neutral-900 bg-opacity-80 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
      {imageUrl && (
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={author}
            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-inner"
          />
        </div>
      )}
      <div className="text-left">
        <p className="text-xl italic text-gray-200 leading-relaxed">
          <span className="text-cyan-400 text-3xl align-top mr-2">“</span>
          {quote}
        </p>
        <footer className="mt-4 text-cyan-400 font-semibold">– {author}</footer>
      </div>
    </blockquote>
  );
}
