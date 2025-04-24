import { getProductByHandle } from '@/lib/shopify';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductInfoPanel from '@/components/ProductInfoPanel';
import TrustIcons from '@/components/TrustIcons';
import AccordionTabs from '@/components/AccordionTabs';
import Testimonials from '@/components/Testimonials';
import RelatedCarousel from '@/components/RelatedCarousel';
import { generateProductSchema } from '@/lib/schema';
import { getProductsByTag } from '@/lib/shopify';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);
  if (!product) return <div>Product not found</div>;

  const schema = generateProductSchema(product);

  // Prepare props for modular components
  const images = product.images?.edges || [];
  const variants = product.variants?.edges?.map((v: any) => ({
    id: v.node.id,
    title: v.node.title,
    price: v.node.price,
  })) || [];
  const uploadSection = product.tags?.includes('custom') ? (
    <div className="my-4">
      <label className="block text-white font-semibold mb-2">Upload your file:</label>
      <input type="file" className="block w-full text-gray-200 bg-neutral-800 border border-neutral-700 rounded-lg p-2" />
    </div>
  ) : null;
  // Example trust/testimonials/related data (replace with real data as needed)
  const tabs = [
    { label: 'Description', content: product.description },
    { label: 'Specs', content: 'Specs coming soon.' },
    { label: 'FAQ', content: 'FAQ coming soon.' },
  ];
  const testimonials = [
    { quote: 'These decals survived 3 Canadian winters without fading. Legit craftsmanship.', author: 'Darnell M. from St. Catharines' },
    { quote: 'Super easy to order and the print quality is insane.', author: 'Jessie R.' },
  ];
  const primaryTag = product.tags[0] || '';
  const related = (await getProductsByTag(primaryTag))
    .filter(p => p.handle !== product.handle)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[url('/grunge-texture.png')] bg-cover bg-fixed bg-black/95 py-10 px-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sticky Gallery */}
        <div className="md:w-1/2 w-full md:sticky md:top-24">
          <ProductImageGallery images={images} />
          <TrustIcons />
        </div>
        {/* Info Panel */}
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <ProductInfoPanel
            title={product.title}
            variants={variants}
            onAddToCart={() => {}}
            onBuyNow={() => {}}
            uploadSection={uploadSection}
          />
          <AccordionTabs tabs={tabs} />
        </div>
      </div>
      <Testimonials testimonials={testimonials} />
      <RelatedCarousel products={related} />
    </main>
  );
}
