// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import ModernHeader from '@/components/ModernHeader';
import Analytics from './providers/Analytics';
import { Inter, Oswald } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://niagarastandsout.ca'),
  title: {
    default: 'Niagara Stands Out',
    template: '%s | Niagara Stands Out',
  },
  description: 'Custom decals, labels and large-format printing in Niagara.',
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Niagara Stands Out',
    type: 'website',
    images: [
      { url: '/og-default.jpg', width: 1200, height: 630 }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${oswald.className} bg-neutral-900 text-yellow-400`}>
        <Analytics />
        <ModernHeader />
        {children}
        {/* Site footer */}
        {/* <MegaFooter /> */}
      </body>
    </html>
  );
}
