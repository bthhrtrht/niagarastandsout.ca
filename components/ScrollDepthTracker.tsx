'use client';

import { useEffect } from 'react';

interface ScrollDepthTrackerProps {
  slug: string;
  thresholds?: number[];
}

export default function ScrollDepthTracker({ slug, thresholds = [25, 50, 75, 100] }: ScrollDepthTrackerProps) {
  useEffect(() => {
    const sent = new Set<number>();
    const handler = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const percent = Math.floor((scrollPos / docHeight) * 100);
      thresholds.forEach((th) => {
        if (percent >= th && !sent.has(th)) {
          sent.add(th);
          const variant = localStorage.getItem(`ab-${slug}`) || 'unknown';
          fetch('/api/ab-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, variant, eventType: `scroll-${th}` }),
          });
        }
      });
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [slug, thresholds]);

  return null;
}
