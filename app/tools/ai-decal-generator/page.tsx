'use client';
export const dynamic = 'error';

import React, { useState } from 'react';

export default function AIDecalGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_AI_API_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });
      const json = await res.json();
      const url = json.data?.image_url || json.url || json.imageUrl;
      setImageUrl(url);
    } catch (err) {
      console.error(err);
      alert('Image generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = () => {
    if (!imageUrl) return;
    const existing = JSON.parse(localStorage.getItem('ai-designs') || '[]');
    existing.push(imageUrl);
    localStorage.setItem('ai-designs', JSON.stringify(existing));
    window.location.href = '/custom-decal-designer';
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">AI Decal Generator</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your decal..."
          className="p-2 bg-neutral-800 rounded text-white"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="px-4 py-2 bg-yellow-400 text-black rounded font-bold"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
        {imageUrl && (
          <div className="mt-6 text-center">
            <img src={imageUrl} alt="Generated" className="mx-auto max-w-full rounded mb-4" />
            <button onClick={handleBuy} className="px-4 py-2 bg-yellow-400 text-black rounded font-bold">
              Buy as Decal
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
