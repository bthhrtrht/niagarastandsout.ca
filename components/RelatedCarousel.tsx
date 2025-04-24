"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TaggedProduct } from '@/lib/shopify';

interface RelatedCarouselProps {
  products: TaggedProduct[];
}

export default function RelatedCarousel({ products }: RelatedCarouselProps) {
  const router = useRouter();

  const handleClick = (handle: string) => {
    // Track in localStorage for follow-up
    const viewed: string[] = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
    if (!viewed.includes(handle)) {
      viewed.push(handle);
      localStorage.setItem('viewedProducts', JSON.stringify(viewed));
    }
    // Analytics events
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'RelatedProductClick', { product: handle });
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'related_click', {
        event_category: 'RelatedProducts',
        event_label: handle,
      });
    }
    router.push(`/products/${handle}`);
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">You may also like</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {products.map((p) => (
          <div
            key={p.handle}
            className="flex-shrink-0 w-40 cursor-pointer"
            onClick={() => handleClick(p.handle)}
          >
            <Image
              src={p.image}
              alt={p.title}
              width={160}
              height={160}
              className="rounded-lg"
            />
            <p className="mt-2 text-sm text-center">{p.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
