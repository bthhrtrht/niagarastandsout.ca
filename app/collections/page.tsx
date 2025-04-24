// app/collections/page.tsx
import { getAllCollections } from '@/lib/shopify'; 
import Image from 'next/image';
import Link from 'next/link';

export default async function CollectionsIndexPage() {
  const collections = await getAllCollections();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_30%,#181c2b_70%,#0ff2_100%)] py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-cyan-400 drop-shadow mb-10">
        All Collections
      </h1>
      <div className="grid gap-8 w-full max-w-6xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {collections.map((col) => (
          <Link
            key={col.handle}
            href={`/collections/${col.handle}`}
            className="flex flex-col items-center bg-neutral-900 border border-neutral-700 p-4 rounded-xl hover:shadow-lg transition"
          >
            <div className="w-full h-40 relative mb-4">
              <Image
                src={col.image || '/cdn/shop/files/default-hero.jpg'}
                alt={col.imageAlt || col.title}
                fill
                className="object-cover rounded-md"
                unoptimized
              />
            </div>
            <h3 className="text-white font-semibold text-center">
              {col.title}
            </h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
