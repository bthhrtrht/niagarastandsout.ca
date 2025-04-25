import { notFound } from 'next/navigation';
import { getCollectionByHandle } from '@/lib/shopify';
import dynamicComponent from 'next/dynamic';
// Load DesignPageClient as client component only (disable SSR) to prevent window references on server
const DesignPageClient = dynamicComponent(() => import('@/components/DesignPageClient'), { ssr: false });

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function DesignPage({ params: { slug } }: { params: { slug: string } }) {
  const collection = await getCollectionByHandle(slug);
  if (!collection) return notFound();

  return (
    <>
      <main className="container mx-auto px-4 py-8 text-white">
        {/* Hero */}
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold">{collection.title} Designer</h1>
          <p className="mt-2 text-lg text-yellow-300">{collection.description}</p>
        </section>
      </main>
      <DesignPageClient collectionTitle={collection.title} />
    </>
  );
}
