'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// icons – dynamically imported so they never render on the server
const Search = dynamic(() => import('lucide-react').then(m => m.Search), { ssr: false });
const ShoppingCart = dynamic(() => import('lucide-react').then(m => m.ShoppingCart), { ssr: false });
const Menu = dynamic(() => import('lucide-react').then(m => m.Menu), { ssr: false });
const X = dynamic(() => import('lucide-react').then(m => m.X), { ssr: false });

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections', megaMenu: true },
  { label: 'Custom Designer', href: '/custom-decal-designer' },
  { label: 'AI Generator', href: '/tools/ai-decal-generator' },
  { label: 'Contact', href: '/pages/contact' },
];

const MegaMenu = () => (
  <div className="hidden group-hover:flex absolute top-full left-0 w-full md:w-[48rem] bg-neutral-800 border border-neutral-700 rounded-b-xl shadow-xl p-6 z-40">
    <div className="grid grid-cols-2 gap-4 w-full">
      {/* Replace these links with real collection slugs */}
      {['Boat Decals', 'Vehicle Wraps', 'Waterproof Stickers', 'Window Lettering'].map(txt => (
        <Link
          key={txt}
          href={`/collections/${txt.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-sm text-yellow-300 hover:text-yellow-400"
        >
          {txt}
        </Link>
      ))}
    </div>
  </div>
);

export default function ModernHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 text-yellow-300 backdrop-blur-md">
      {/* gradient border bar */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />

      {/* main bar */}
      <div className="bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="font-semibold text-lg tracking-wide hover:text-yellow-400">
            Niagara Stands Out
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <div key={item.href} className="relative group">
                <Link href={item.href} className="hover:text-yellow-400 transition-colors">
                  {item.label}
                </Link>
                {item.megaMenu && <MegaMenu />}
              </div>
            ))}
          </nav>

          {/* icons */}
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-yellow-400" />
            <button
              className="md:hidden"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* mobile drawer */}
        {mobileOpen && (
          <nav className="md:hidden bg-neutral-800 border-t border-neutral-700">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm hover:bg-neutral-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
