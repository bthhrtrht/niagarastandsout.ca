import { getImageForSlug } from '@/lib/assets';
import { ICON_ALTS } from '@/lib/assetsAlt';
import { IMAGE_META } from '@/lib/imageMeta';

export default function ProductGrid({ products }: { products: any[] }) {
  return (
    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem', padding: 0 }}>
      {products.map(p => {
        const meta = IMAGE_META[p.handle] || {};
        return (
          <li key={p.handle} style={{ border: '1px solid #ccc', padding: '1rem', listStyle: 'none' }}>
            <a href={`/products/${p.handle}`}>
              <img
                src={getImageForSlug(p.handle, 'product')}
                alt={ICON_ALTS[p.handle] || p.title}
                title={meta.title}
                data-hover={meta.hover}
                width="100%"
                style={{ marginBottom: '0.5rem' }}
              />
              <strong>{meta.title || p.title}</strong>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
