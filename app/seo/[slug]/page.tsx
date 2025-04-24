import Head from 'next/head';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import seoPages from '@/data/seo-pages.json';
import { getProductsByTag } from '@/lib/shopify';
import ProductGrid from '@/components/ProductGrid';
import CTA from '@/components/CTA';
import Testimonial from '@/components/Testimonial';
import { getImageForSlug } from '@/lib/assets';
import { ICON_ALTS } from '@/lib/assetsAlt';
import dynamic from 'next/dynamic';
const ABTest = dynamic(() => import('@/components/ABTest'), { ssr: false });
import AccordionTabs from '@/components/AccordionTabs';

export const revalidate = 60 * 60 * 24 * 30; // revalidate pages every 30 days

// Pre-render all SEO page slugs at build time
export async function generateStaticParams() {
  return seoPages.map(p => ({ slug: p.slug }));
}

export default async function SeoPage({ params: { slug } }: { params: { slug: string } }) {
  const page = seoPages.find(p => p.slug === slug);
  if (!page) {
    notFound();
  }

  const products = await getProductsByTag(page.productTag);

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
        <link rel="canonical" href={`https://niagarastandsout.ca/seo/${slug}`} />
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

      <section className="hero p-8 text-center">
        <h1 className="text-4xl font-bold">{page.title}</h1>
        <p className="mt-2 text-lg">{page.subtitle}</p>
      </section>

      <ABTest slug={slug}>
        {() => (
          <CTA
            title={page.cta}
            subtitle={page.subtitle}
            button={{ text: page.cta, link: `/collections/${page.productTag}` }}
          />
        )}
      </ABTest>

      <div
        className="prose max-w-none mt-8"
        dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
      />
      {page.faq && page.faq.length > 0 && (
        <AccordionTabs
          tabs={page.faq.map(f => ({ label: f.question, content: <p>{f.answer}</p> }))}
        />
      )}

      <Testimonial
        quote={page.testimonial}
        author={page.author}
      />

      <ProductGrid products={products} />

      {/* Cross-linked SEO pages */}
      <section className="mt-8 p-8 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Explore Related Pages</h2>
        <ul className="list-disc list-inside space-y-2">
          {relatedPages.map(rp => (
            <li key={rp.slug}>
              <Link href={`/seo/${rp.slug}`} className="text-blue-600 hover:underline">
                {rp.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Lead capture form */}
      <section className="mt-8 p-8 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Get a Free Quote</h2>
        <form action="/api/lead" method="POST" className="space-y-4">
          <input type="hidden" name="pageSlug" value={slug} />
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" type="text" required className="mt-1 block w-full border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" type="email" required className="mt-1 block w-full border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea name="message" rows={3} required className="mt-1 block w-full border-gray-300 rounded-md" />
          </div>
          <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded">Submit</button>
        </form>
      </section>
    </>
  );
}
