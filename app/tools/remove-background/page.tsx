'use client';
export const dynamic = 'error';

import React, { useState } from 'react';

export default function RemoveBackgroundTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');
    try {
      const res = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY || '' },
        body: formData,
      });
      if (!res.ok) throw new Error('Background removal failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (err) {
      console.error(err);
      alert('Background removal failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Remove Background</h1>
      <input
        type="file"
        accept="image/*"
        onChange={e => e.target.files && setFile(e.target.files[0])}
        className="mb-4 text-white"
      />
      <button
        onClick={handleRemove}
        disabled={!file || loading}
        className="px-4 py-2 bg-yellow-400 text-black rounded mb-4"
      >
        {loading ? 'Removing...' : 'Remove Background'}
      </button>
      {result && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Result Preview</h2>
          <img src={result} alt="Background removed" className="max-w-full mb-4 rounded" />
          <a href={result} download className="px-4 py-2 bg-yellow-400 text-black rounded">
            Download
          </a>
        </div>
      )}
    </main>
  );
}
