import seoPages from '@/data/seo-pages.json';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://niagarastandsout.com';
  const urls = seoPages.map((p: any) => `${baseUrl}/seo/${p.slug}`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `<url><loc>${url}</loc></url>`).join('')}
</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
