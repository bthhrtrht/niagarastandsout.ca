import React from 'react';
import Link from 'next/link';

interface FeaturedSnipersProps {
  limit?: number;
}
interface MoField { key: string; value: string; }
interface SeoPageData {
  slug: string;
  title?: string;
  subtitle?: string;
  seoDescription?: string;
  bodyHtml?: string;
  testimonial?: string;
  cta?: string;
}

export default async function FeaturedSnipers({ limit = 6 }: FeaturedSnipersProps) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN!;
  const token = process.env.SHOPIFY_ADMIN_API_TOKEN!;
  const version = process.env.SHOPIFY_API_VERSION || '2024-04';
  const endpoint = `https://${domain}/admin/api/${version}/graphql.json`;

  // Fetch featured_sniper metaobject
  const featuredQuery = {
    query: `
      query getFeatured($handle: String!) {
        metaobject(handle: $handle, type: "featured_sniper") {
          fields { key value }
        }
      }
    `,
    variables: { handle: 'top_sniper' },
  };
  const featuredRes = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify(featuredQuery),
  });
  const featuredJson = await featuredRes.json();
  const pagesValue = featuredJson.data?.metaobject?.fields?.find((f: MoField) => f.key === 'pages')?.value || '[]';
  let slugs: string[] = [];
  try { slugs = JSON.parse(pagesValue); } catch { slugs = []; }
  slugs = slugs.slice(0, limit);

  // Fetch each SEO page metaobject
  const pagePromises = slugs.map(async (slug) => {
    const seoQuery = {
      query: `
        query getSeoPage($slug: String!) {
          metaobject(handle: $slug, type: "seo_page") {
            fields { key value }
          }
        }
      `,
      variables: { slug },
    };
    const seoRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify(seoQuery),
    });
    const seoJson = await seoRes.json();
    const mo = seoJson.data?.metaobject;
    const data: SeoPageData = { slug };
    mo?.fields?.forEach((f: MoField) => {
      if (f.key === 'title') data.title = f.value;
      if (f.key === 'subtitle') data.subtitle = f.value;
      if (f.key === 'seoDescription') data.seoDescription = f.value;
      if (f.key === 'bodyHtml') data.bodyHtml = f.value;
      if (f.key === 'testimonial') data.testimonial = f.value;
      if (f.key === 'cta') data.cta = f.value;
    });
    return data;
  });
  const featuredData = await Promise.all(pagePromises);

  if (featuredData.length === 0) {
    return <p className="text-center py-8 text-gray-400">No featured sniper pages yet</p>;
  }
  return (
    <section className="bg-neutral-900 py-12 px-6">
      <h2 className="text-2xl text-yellow-400 font-bold mb-6 text-center">Featured SEO Pages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredData.map((page) => (
          <div key={page.slug} className="p-6 bg-white rounded-lg transform hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">{page.title}</h3>
            <p className="text-gray-700 mb-4">{page.subtitle || page.seoDescription || page.bodyHtml?.substring(0, 100)}</p>
            <Link href={`/seo/${page.slug}`} className="inline-block bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-300">
              {page.cta || 'View Page'}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
