'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ABTestProps {
  slug: string;
  children: (variant: 'A' | 'B') => ReactNode;
}

export default function ABTest({ slug, children }: ABTestProps) {
  const [variant, setVariant] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    let v = localStorage.getItem(`ab-${slug}`) as 'A' | 'B' | null;
    if (v !== 'A' && v !== 'B') {
      v = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem(`ab-${slug}`, v);
      // persist variant in cookie for middleware tracking
      document.cookie = `ab-${slug}=${v}; path=/;`;
      fetch('/api/ab-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, event: 'assign', variant: v }),
      });
    }
    setVariant(v);
  }, [slug]);

  if (!variant) return null;
  return <>{children(variant)}</>;
}
