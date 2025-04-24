// components/Testimonials.tsx

'use client';

import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-neutral-950 py-10 px-4 rounded-xl shadow-lg my-8 max-w-3xl mx-auto">
      <h2 className="text-yellow-400 text-2xl font-bold mb-6 text-center">What Customers Say</h2>
      <div className="space-y-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="text-center">
            <blockquote className="text-lg text-white italic mb-2">“{t.quote}”</blockquote>
            <div className="text-yellow-400 font-semibold">— {t.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
}