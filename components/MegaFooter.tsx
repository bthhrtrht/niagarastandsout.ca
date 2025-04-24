import seoPages from '@/data/seo-pages.json';
import Link from 'next/link';

interface BlogPost { title: string; slug: string; }
interface SeoPage { slug: string; title: string; }

export default function MegaFooter() {
  const shopLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/collections/all' },
    { label: 'Custom Designer', href: '/custom-decal-designer' },
    { label: 'AI Generator', href: '/tools/ai-decal-generator' },
    { label: 'Contact', href: '/pages/contact' },
  ];

  const comparePages = (seoPages as SeoPage[])
    .filter(p => p.slug.startsWith('compare-'))
    .slice(0, 5);

  // Stub blog posts until FS logic is server-only
  const blogPosts: BlogPost[] = [];

  const accountLinks = [
    { label: 'Account / Login', href: '/account/login' },
    { label: 'Order Lookup', href: '/pages/order-lookup' },
  ];

  return (
    <footer className="bg-black text-gray-300 py-12 px-4 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-yellow-400 font-bold mb-4">Shop</h3>
          <ul className="space-y-2">
            {shopLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-yellow-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-yellow-400 font-bold mb-4">Compare</h3>
          <ul className="space-y-2">
            {comparePages.map(p => (
              <li key={p.slug}>
                <Link href={`/seo/${p.slug}`} className="hover:text-yellow-400">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-yellow-400 font-bold mb-4">Resources (Blog)</h3>
          <ul className="space-y-2">
            {blogPosts.map(p => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="hover:text-yellow-400">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-yellow-400 font-bold mb-4">My Account</h3>
          <ul className="space-y-2">
            {accountLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-yellow-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
