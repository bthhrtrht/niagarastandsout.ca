import { notFound } from 'next/navigation';
import type { FreeSvgEntry } from '@/types';
import freeSvgs from '@/data/free-svgs.json';
import FreeSvgPage from '@/components/FreeSvgPage';
import { Metadata } from 'next';

interface Params {
  params: { handle: string };
}

export const dynamic = 'error';
export const revalidate = 43200;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params: { handle } }: Params): Promise<Metadata> {
  const all = freeSvgs as FreeSvgEntry[];
  const page = all.find(p => p.handle === handle);
  if (!page) {
    return { title: 'Page Not Found' };
  }
  const title = `${page.title} – Free SVG Files in Canada | Niagara Stands Out`;
  const description = `Download 100% free ${page.title.toLowerCase()} for Cricut & Silhouette with commercial license. ${page.description}`;
  return {
    title,
    description,
    keywords: [
      'free svg files canada',
      'cricut svg downloads',
      'commercial use svg files',
      'canadian svg cut files',
      'free svg for silhouette users'
    ],
    openGraph: {
      title,
      description,
      url: `https://niagarastandsout.ca/free-svgs/${page.handle}`,
      siteName: 'Niagara Stands Out',
      images: [
        {
          url: `https://niagarastandsout.ca/cdn/shop/files/${page.image}`,
          alt: title
        }
      ],
      type: 'website'
    }
  };
}

export default function Page({ params: { handle } }: Params) {
  const all = freeSvgs as FreeSvgEntry[];
  const page = all.find((p) => p.handle === handle);
  if (!page) {
    return notFound();
  }
  return <FreeSvgPage page={page} all={all} />;
}
