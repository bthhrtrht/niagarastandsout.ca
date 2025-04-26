import Link from 'next/link';
import { getImageForSlug } from '@/lib/assets';
import { ICON_ALTS } from '@/lib/assetsAlt';
import { IMAGE_META } from '@/lib/imageMeta';
import Image from 'next/image';

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0 m-0">
      {products.map((p, i) => {
        const meta = IMAGE_META[p.handle] || {};
        return (
          <li key={p.handle} className="list-none bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <Link href={`/products/${p.handle}`}>  
              <a className="block">
                <Image
                  src={getImageForSlug(p.handle, 'product')}
                  alt={ICON_ALTS[p.handle] || p.title}
                  title={meta.title}
                  width={400}
                  height={400}
                  placeholder="blur"
                  blurDataURL={`${getImageForSlug(p.handle, 'product')}?width=10&blur=50`}
                  className="object-cover"
                  priority={i < 3}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{meta.title || p.title}</h3>
                </div>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
