'use client';

import ABTest from '@/components/ABTest';
import CTA from '@/components/CTA';

interface SeoABTestWrapperProps {
  slug: string;
  cta: string;
  subtitle: string;
  productTag: string;
}

export default function SeoABTestWrapper({ slug, cta, subtitle, productTag }: SeoABTestWrapperProps) {
  return (
    <ABTest slug={slug}>
      {() => (
        <CTA
          title={cta}
          subtitle={subtitle}
          button={{ text: cta, link: `/collections/${productTag}` }}
        />
      )}
    </ABTest>
  );
}
