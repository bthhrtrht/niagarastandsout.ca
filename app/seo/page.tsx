import Link from 'next/link';
import seoPages from '@/data/seo-pages.json';

export default function SeoIndexPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">SEO Landing Pages</h1>
      <ul className="list-disc list-inside space-y-2">
        {seoPages.map((page) => (
          <li key={page.slug}>
            <Link href={`/seo/${page.slug}`} className="text-yellow-400 hover:underline">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
