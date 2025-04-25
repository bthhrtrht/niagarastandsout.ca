import { fetchAllProducts, getProductByHandle } from '@/lib/shopify';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const all = await fetchAllProducts();
  return all.map(p => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  return {
    title: product?.title + ' | MyShop',
    description: product?.description.slice(0, 160),
    openGraph: {
      title: product?.title,
      description: product?.description.slice(0, 160),
      images: product?.images.edges.map(e => e.node.originalSrc) || [],
    },
    alternates: { canonical: `/products/${params.handle}` },
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);
  if (!product) return <p>Product not found.</p>;

  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: params.handle,
    image: product.images.edges.map(e => e.node.originalSrc),
    offers: {
      '@type': 'Offer',
      priceCurrency: product.variants.edges[0]?.node.price.currencyCode,
      price: product.variants.edges[0]?.node.price.amount,
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
