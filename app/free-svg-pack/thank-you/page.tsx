import TrackingPixels from '@/components/TrackingPixels';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You - Free SVG Pack',
  description: 'Your free SVG pack is on its way! Download now or check your inbox.',
};

export default function ThankYouPage() {
  const zipUrl = process.env.NEXT_PUBLIC_SVG_ZIP_URL;
  return (
    <>
      <TrackingPixels />
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="mb-6">
          Your free SVG pack is available for download.
        </p>
        {zipUrl ? (
          <a
            href={zipUrl}
            download
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Download SVG Pack
          </a>
        ) : (
          <p className="text-red-600">Download link is not available.</p>
        )}
        <p className="mt-8">
          Or check your email for the download link.
        </p>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Back to Home
        </Link>
      </main>
    </>
  );
}
