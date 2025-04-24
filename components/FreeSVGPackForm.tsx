"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FreeSVGPackForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        router.push('/free-svg-pack/thank-you');
      } else {
        console.error('Subscription error', await res.text());
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Get Free SVG Pack'}
      </button>
    </form>
  );
}
