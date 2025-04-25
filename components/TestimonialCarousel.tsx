"use client";
import { useState } from 'react';

interface Testimonial { quote: string; author: string }
interface Props { testimonials: Testimonial[] }

export default function TestimonialCarousel({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const prev = () => setCurrent((current - 1 + total) % total);
  const next = () => setCurrent((current + 1) % total);

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="p-6 bg-white rounded shadow-lg text-center text-lg">{testimonials[current].quote}</div>
      <div className="mt-4 text-sm text-gray-600 text-center italic">— {testimonials[current].author}</div>
      {total > 1 && (
        <>
          <button onClick={prev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">‹</button>
          <button onClick={next} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300">›</button>
        </>
      )}
    </div>
  );
}
