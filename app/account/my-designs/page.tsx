'use client';

import React, { useState, useEffect } from 'react';

interface CustomDesign { text: string; image: string; }

export default function MyDesignsPage() {
  const [customDesigns, setCustomDesigns] = useState<CustomDesign[]>([]);
  const [aiDesigns, setAiDesigns] = useState<string[]>([]);

  useEffect(() => {
    const storedCustom = JSON.parse(localStorage.getItem('custom-designs') || '[]');
    const storedAi = JSON.parse(localStorage.getItem('ai-designs') || '[]');
    setCustomDesigns(storedCustom);
    setAiDesigns(storedAi);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">My Designs</h1>
      {customDesigns.length === 0 && aiDesigns.length === 0 && (
        <p className="text-gray-400">No designs saved yet.</p>
      )}
      {customDesigns.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Custom Decals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customDesigns.map((d, i) => (
              <div key={i} className="bg-neutral-900 p-4 rounded flex flex-col">
                <img src={d.image} alt={`Design ${i+1}`} className="w-full h-auto rounded mb-2" />
                <p className="text-gray-300 mb-2">{d.text}</p>
                <a href={d.image} download className="mt-auto px-3 py-1 bg-yellow-400 text-black rounded text-center">
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
      {aiDesigns.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">AI Decal Designs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiDesigns.map((url, i) => (
              <div key={i} className="bg-neutral-900 p-4 rounded flex flex-col">
                <img src={url} alt={`AI Design ${i+1}`} className="w-full h-auto rounded mb-2" />
                <a href={url} download className="mt-auto px-3 py-1 bg-yellow-400 text-black rounded text-center">
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
