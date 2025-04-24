// app/collections/[slug]/page.tsx

import LandingPageClient from '@/components/LandingPageClient';
import { getAllCollections } from '@/lib/shopify';
import { getCollectionProducts } from '@/lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Params {
  params: { slug: string };
}

// Generate all collection slugs at build time
export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map((col) => ({ slug: col.handle }));
}

// Build page metadata dynamically
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const collections = await getAllCollections();
  const collection = collections.find((c) => c.handle === params.slug);

  if (!collection) {
    return {
      title: 'Collection Not Found',
      description: 'This collection does not exist. Browse our other products.',
    };
  }

  return {
    title: `${collection.title} | Niagara Stands Out`,
    description: collection.description || `Shop ${collection.title} at Niagara Stands Out.`,
    openGraph: {
      title: collection.title,
      description: collection.description,
      url: `https://niagarastandsout.com/collections/${collection.handle}`,
      images: collection.image ? [collection.image] : [],
    },
  };
}

// Main page component
export default async function CollectionPage({ params }: Params) {
  const collections = await getAllCollections();
  const collection = collections.find((c) => c.handle === params.slug);
  if (!collection) notFound();

  const products = await getCollectionProducts(collection.handle);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.title,
    description: collection.description,
    url: `https://niagarastandsout.com/collections/${collection.handle}`,
    hasPart: products.map((p: any) => ({
      '@type': 'Product',
      name: p.title,
      url: `https://niagarastandsout.com/products/${p.handle}`,
    })),
  };

  return (
    <LandingPageClient
      collection={collection}
      products={products}
      jsonLd={jsonLd}
    />
  );
}
