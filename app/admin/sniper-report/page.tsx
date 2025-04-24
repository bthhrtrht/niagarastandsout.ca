import fs from 'fs';
import path from 'path';
import SniperActions from '@/components/SniperActions';

interface Metric {
  slug: string;
  title: string;
  views: number;
  clicks: number;
  leads: number;
  conversion: number;
}

export default function SniperReport() {
  const dataDir = path.resolve(process.cwd(), 'data');
  const seoPages = JSON.parse(fs.readFileSync(path.join(dataDir, 'seo-pages.json'), 'utf-8'));
  const leads = JSON.parse(fs.readFileSync(path.join(dataDir, 'leads.json'), 'utf-8'));
  const events = JSON.parse(fs.readFileSync(path.join(dataDir, 'ab-events.json'), 'utf-8'));

  const metrics: Metric[] = seoPages.map((p: any): Metric => {
    const views = events.filter((e: any) => e.slug === p.slug && e.eventType === 'assign').length;
    const clicks = events.filter((e: any) => e.slug === p.slug && e.eventType === 'click').length;
    const leadsCount = leads.filter((l: any) => l.slug === p.slug).length;
    const conversion = views > 0 ? leadsCount / views : 0;
    return { slug: p.slug, title: p.title, views, clicks, leads: leadsCount, conversion };
  });

  const sorted = metrics.sort((a: Metric, b: Metric) => b.conversion - a.conversion);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sniper Reporting Dashboard</h1>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr>
            <th className="border px-2 py-1">Page</th>
            <th className="border px-2 py-1">Views</th>
            <th className="border px-2 py-1">Clicks</th>
            <th className="border px-2 py-1">Leads</th>
            <th className="border px-2 py-1">Conv. Rate</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((m: Metric) => (
            <tr key={m.slug} className="odd:bg-gray-100">
              <td className="border px-2 py-1">{m.title}</td>
              <td className="border px-2 py-1">{m.views}</td>
              <td className="border px-2 py-1">{m.clicks}</td>
              <td className="border px-2 py-1">{m.leads}</td>
              <td className="border px-2 py-1">{(m.conversion * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SniperActions />
    </main>
  );
}
