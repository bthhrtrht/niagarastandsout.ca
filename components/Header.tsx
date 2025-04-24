'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [shopDropdown, setShopDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const shopLinks = [
    ['Shop All', '/collections/all'],
    ['Custom Stickers', '/collections/custom-stickers'],
    ['Boat Decals', '/collections/boat-decals-graphics'],
    ['Car Magnets', '/collections/car-magnets'],
    ['Tote Bags', '/collections/tote-bags'],
    ['Waterproof Stickers', '/collections/waterproof-stickers'],
    ['Gaming Decals', '/collections/gaming-decals'],
    ['Banners & Prints', '/collections/banners-large-prints'],
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-neutral-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-yellow-400 font-extrabold text-2xl tracking-wide">
          Niagara Stands Out
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-white font-medium relative">
          <Link href="/" className="hover:text-yellow-400 transition">Home</Link>

          <div
            className="relative group"
            onMouseEnter={() => setShopDropdown(true)}
            onMouseLeave={() => setShopDropdown(false)}
          >
            <button
              className="flex items-center gap-1 hover:text-yellow-400 transition focus:outline-none"
              onClick={() => setShopDropdown(v => !v)}
              type="button"
            >
              Shop <ChevronDown className="w-4 h-4" />
            </button>
            {shopDropdown && (
              <div className="absolute left-0 top-full bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg py-2 mt-2 min-w-[220px] z-50">
                {shopLinks.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-4 py-2 hover:bg-yellow-400 hover:text-black transition"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/pages/ai-assisted-design-generation" className="hover:text-yellow-400 transition">
            AI Design Tool
          </Link>
          <Link href="/contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://nktyvy-qe.myshopify.com/search" className="hover:text-yellow-400 transition">Search</a>
          <a href="https://nktyvy-qe.myshopify.com/account/login" className="hover:text-yellow-400 transition">Account</a>
          <a href="https://nktyvy-qe.myshopify.com/cart" className="hover:text-yellow-400 transition">Cart</a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenu(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-neutral-800">
            <Link href="/" className="text-yellow-400 font-extrabold text-xl">
              Niagara Stands Out
            </Link>
            <button
              className="text-white"
              onClick={() => setMobileMenu(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex-grow p-4 space-y-4">
            <Link href="/" className="block text-white text-lg hover:text-yellow-400 transition">Home</Link>
            <div>
              <button
                className="flex items-center justify-between w-full text-white text-lg hover:text-yellow-400 transition"
                onClick={() => setShopDropdown(v => !v)}
              >
                Shop <ChevronDown className="w-5 h-5" />
              </button>
              {shopDropdown && (
                <div className="mt-2 space-y-2 pl-4">
                  {shopLinks.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="block text-neutral-300 hover:text-yellow-400 transition"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/pages/ai-assisted-design-generation" className="block text-white text-lg hover:text-yellow-400 transition">
              AI Design Tool
            </Link>
            <Link href="/contact" className="block text-white text-lg hover:text-yellow-400 transition">
              Contact
            </Link>
            <a href="https://nktyvy-qe.myshopify.com/search" className="block text-white text-lg hover:text-yellow-400 transition">Search</a>
            <a href="https://nktyvy-qe.myshopify.com/account/login" className="block text-white text-lg hover:text-yellow-400 transition">Account</a>
            <a href="https://nktyvy-qe.myshopify.com/cart" className="block text-white text-lg hover:text-yellow-400 transition">Cart</a>
          </nav>
        </div>
      )}
    </header>
  );
}
