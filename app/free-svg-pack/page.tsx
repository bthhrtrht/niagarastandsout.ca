import TrackingPixels from '../../components/TrackingPixels';
import FreeSVGPackForm from '../../components/FreeSVGPackForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free SVG Pack',
  description: 'Sign up to receive a free pack of high-quality SVG files delivered instantly.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function FreeSVGPackPage() {
  return (
    <>
      <TrackingPixels />
      <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Get Your Free SVG Pack</h1>
        <p className="mb-6 text-center">
          Enter your email below, and we&apos;ll send you a zip of premium SVG files for free.
        </p>
        <FreeSVGPackForm />
      </main>
    </>
  );
}
