import { notFound } from 'next/navigation';
import CanvasDesigner from '@/components/CanvasDesigner';
import FontSelector from '@/components/FontSelector';
import UploadButton from '@/components/UploadButton';
import PreviewArea from '@/components/PreviewArea';
import { getCollectionByHandle, getAllCollections } from '@/lib/shopify';

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map(col => ({ slug: col.handle }));
}

export default async function DesignPage({ params: { slug } }: { params: { slug: string } }) {
  const collection = await getCollectionByHandle(slug);
  if (!collection) return notFound();

  return (
    <main className="container mx-auto px-4 py-8 text-white">
      {/* Hero */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold">{collection.title} Designer</h1>
        <p className="mt-2 text-lg text-yellow-300">{collection.description}</p>
      </section>

      {/* Canvas Designer */}
      <section className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-1/4 space-y-4">
            <FontSelector fonts={[
              'Bebas Neue',
              'Oswald',
              'Anton',
            ]} />
            <UploadButton />
          </aside>
          <div className="lg:w-3/4">
            <CanvasDesigner width={800} height={600} />
            <PreviewArea />
          </div>
        </div>
      </section>

      {/* Checkout CTA */}
      <section className="text-center mb-12">
        <button
          onClick={() => {/* addToCart(designConfig) */}}
          className="bg-yellow-400 text-neutral-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
        >
          Add Your Custom {collection.title} to Cart
        </button>
      </section>

      {/* Related Collections & Footer CTA */}
      {/* TODO: add HomepageMenu or AsSeenOn strip here */}
    </main>
  );
}
