'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, ShoppingCart } from 'lucide-react';
import seoPages from '@/data/seo-pages.json';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'success'|'error'>('idle');
  return (
    <footer className="bg-black border-t border-neutral-800 text-gray-300 py-12 px-4 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link href="/collections/all" className="hover:text-yellow-400 transition">Shop</Link></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/custom-orders" className="hover:text-yellow-400 transition">Custom Orders</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/free-designs" className="hover:text-yellow-400 transition">Free Designs</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/about-us" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
          </ul>
          {seoPages.filter(p => p.slug.startsWith('compare-')).length > 0 && (
            <>
              <h3 className="text-yellow-400 font-bold text-lg mb-4 mt-6">Compare Us</h3>
              <ul className="grid grid-cols-2 gap-2">
                {seoPages.filter(p => p.slug.startsWith('compare-')).map(p => (
                  <li key={p.slug}>
                    <Link href={`/seo/${p.slug}`} className="hover:text-yellow-400 transition">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Customer */}
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-4">Customer</h3>
          <ul className="space-y-2">
            <li><a href="https://nktyvy-qe.myshopify.com/pages/faq" className="hover:text-yellow-400 transition">FAQ</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/policies/privacy-policy" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/policies/refund-policy" className="hover:text-yellow-400 transition">Refund Policy</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/policies/shipping-policy" className="hover:text-yellow-400 transition">Shipping Policy</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/policies/terms-of-service" className="hover:text-yellow-400 transition">Terms of Service</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/account/login" className="hover:text-yellow-400 transition">Account / Login</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/order-lookup" className="hover:text-yellow-400 transition">Order Lookup</a></li>
          </ul>
        </div>

        {/* Business Info & Newsletter */}
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-4">Business Info</h3>
          <ul className="space-y-2 mb-6">
            <li><a href="https://www.niagaraprintshop.ca" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">Niagara Print Shop</a></li>
            <li><a href="https://nktyvy-qe.myshopify.com/pages/ai-assisted-design-generation" className="hover:text-yellow-400 transition">AI-Assisted Design Tool</a></li>
          </ul>
          <form className="flex flex-col gap-2" onSubmit={(e) => { e.preventDefault(); /* signup logic */ }}>
            <label htmlFor="footer-email" className="text-sm font-medium">Sign up for Free SVG Collection</label>
            <div className="flex">
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                required
                className="flex-grow rounded-l-md px-3 py-2 bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-r-md px-4 py-2 bg-primary text-secondary font-bold hover:bg-accent transition"
              >
                Sign Up
              </button>
            </div>
            {/* Feedback messages */}
            {status === 'success' && <p className="mt-2 text-green-500">Thank you for signing up!</p>}
            {status === 'error' && <p className="mt-2 text-red-500">Oops, something went wrong.</p>}
          </form>
        </div>
      </div>

      {/* Social icons */}
      <div className="mt-8 flex justify-center space-x-6">
        <a href="https://etsy.com/shop/niagarastandsout" aria-label="Etsy" target="_blank" rel="noopener noreferrer">
          <ShoppingCart className="w-6 h-6" />
        </a>
        <a href="https://facebook.com/niagarastandsout" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="https://instagram.com/niagarastandsout" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-6 h-6" />
        </a>
      </div>

      {/* Back to top */}
      <div className="text-center mt-6">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-primary hover:text-accent">
          Back to Top
        </button>
      </div>

      <div className="text-center text-xs text-neutral-500 mt-10">
        &copy; {new Date().getFullYear()} Niagara Stands Out. All rights reserved.
      </div>
    </footer>
  );
}
