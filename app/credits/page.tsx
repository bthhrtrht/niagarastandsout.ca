'use client';
import React, { useState, useEffect } from 'react';

export default function CreditsPage() {
  const packs = [5, 20, 50, 100];
  const featureCosts: Record<string, number> = {
    'Custom Designer': 2,
    'Remove Background': 5,
    'AI Generator': 10,
  };
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem('credits') || '0', 10);
    setCredits(stored);
  }, []);

  const buy = (n: number) => {
    const newCount = credits + n;
    localStorage.setItem('credits', newCount.toString());
    setCredits(newCount);
    alert(`Purchased ${n} credits! Total: ${newCount}`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Buy Credits</h1>
      <p className="mb-4">You have <span className="font-bold text-yellow-400">{credits}</span> credits available.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {packs.map(n => (
          <button
            key={n}
            onClick={() => buy(n)}
            className="p-4 bg-yellow-400 text-black font-bold rounded hover:opacity-80 transition"
          >
            Buy {n} Credits
          </button>
        ))}
      </div>
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Feature Costs</h2>
      <ul className="space-y-2">
        {Object.entries(featureCosts).map(([feat, cost]) => (
          <li key={feat} className="flex justify-between">
            <span>{feat}</span>
            <span className="font-bold text-yellow-400">{cost} Credits</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
