import { getProductByHandle } from '@/lib/shopify';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';

export const dynamic = 'error';
export const revalidate = 43200;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  const imagesList = product?.images?.edges?.map(e => e.node?.originalSrc).filter(Boolean) ?? [];
  return {
    title: product?.title + ' | MyShop',
    description: product?.description.slice(0, 160),
    openGraph: {
      title: product?.title,
      description: product?.description.slice(0, 160),
      images: imagesList,
    },
    alternates: { canonical: `/products/${params.handle}` },
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);
  if (!product) return <p>Product not found.</p>;

  const imageUrls = product.images?.edges?.map(e => e.node?.originalSrc).filter(Boolean) ?? [];
  const firstVariant = product.variants?.edges?.[0]?.node;
  const priceCurrency = firstVariant?.price.currencyCode ?? '';
  const price = firstVariant?.price.amount ?? '';
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: params.handle,
    image: imageUrls,
    offers: {
      '@type': 'Offer',
      priceCurrency,
      price,
      availability: 'https://schema.org/InStock',
      url: `https://yourdomain.com/products/${params.handle}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ProductDetailClient product={product} />
    </>
  );
}
