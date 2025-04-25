import Head from 'next/head';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import seoPages from '@/data/seo-pages.json';
import { getProductsByTag, TaggedProduct } from '@/lib/shopify';
import ProductGrid from '@/components/ProductGrid';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { getImageForSlug } from '@/lib/assets';
import { ICON_ALTS } from '@/lib/assetsAlt';
import SeoABTestWrapper from '@/components/SeoABTestWrapper';
import AccordionTabs from '@/components/AccordionTabs';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export const revalidate = 2592000; // revalidate pages every 30 days
export const dynamic = 'force-static'; // static generate SEO pages

// Pre-render all SEO page slugs at build time
export async function generateStaticParams() {
  return seoPages.map(p => ({ slug: p.slug }));
}

export default async function SeoPage({ params: { slug } }: { params: { slug: string } }) {
  // Load page data from static JSON, fallback 404
  const page = seoPages.find(p => p.slug === slug);
  if (!page) notFound();

  // Fetch products, handle errors
  let products: TaggedProduct[] = [];
  try { products = await getProductsByTag(page.productTag); } catch (e) { console.error(e); }

  const relatedPages = seoPages.filter(p => p.slug !== slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.seo.description,
  };

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.seo.description} />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="canonical" href={`https://shopify-headless-complete.vercel.app/seo/${slug}`} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.seo.description} />
        <meta property="og:image" content={getImageForSlug(slug)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.seo.description} />
        <meta name="twitter:image" content={getImageForSlug(slug)} />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          contentUrl: getImageForSlug(slug),
          description: ICON_ALTS[slug],
          name: page.seo.title || slug,
          author: { "@type": "Organization", name: "Niagara Stands Out" }
        }) }}
      />

      {/* ProductList JSON-LD */}
      {products.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: products.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://shopify-headless-complete.vercel.app/products/${p.handle}`
              }))
            })
          }}
        />
      )}

      <header className="bg-[url('/hero-boat.jpg')] bg-cover bg-center text-white py-24">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold">{page.title}</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto">{page.subtitle}</p>
        </div>
      </header>

      <SeoABTestWrapper slug={slug} cta={page.cta} subtitle={page.subtitle} productTag={page.productTag} />

      <section id="content" className="prose prose-lg max-w-none mt-8 container mx-auto px-4">
        <div dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
      </section>

      {page.faq && page.faq.length > 0 && (
        <section id="faq" className="mt-12 container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <AccordionTabs tabs={page.faq.map(f => ({ label: f.question, content: <p>{f.answer}</p> }))} />
        </section>
      )}

      <section id="testimonials" className="mt-12 bg-gray-100 py-8">
        <TestimonialCarousel testimonials={[{ quote: page.testimonial, author: page.author }]} />
      </section>

      <section id="products" className="mt-12 container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <ProductGrid products={products} />
      </section>

      <nav aria-label="Related pages" className="mt-12 container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Explore Related Pages</h2>
        <ul className="list-disc list-inside space-y-2">
          {relatedPages.map(rp => (
            <li key={rp.slug}>
              <Link href={`/seo/${rp.slug}`} className="text-blue-600 hover:underline">
                {rp.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section id="lead-capture" className="mt-12 py-8 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Get a Free Quote</h2>
        <form action="/api/lead" method="POST" className="space-y-4 max-w-lg mx-auto">
          <input type="hidden" name="pageSlug" value={slug} />
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input name="name" type="text" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <Input name="email" type="email" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <Textarea name="message" rows={3} required />
          </div>
          <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded w-full">Submit</button>
        </form>
      </section>
    </>
  );
}
