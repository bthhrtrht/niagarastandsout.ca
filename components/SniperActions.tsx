'use client';

import { useState } from 'react';

export default function SniperActions() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handle = async (path: string) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(path, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) setMessage(`Error: ${data.error || res.statusText}`);
      else setMessage('Success!');
    } catch {
      setMessage('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <button
        disabled={loading}
        onClick={() => handle('/api/regenerate-seo-pages')}
        className="bg-blue-500 disabled:opacity-50 text-white py-2 px-4 rounded"
      >
        {loading ? 'Regenerating...' : 'Regenerate SEO Pages'}
      </button>
      <button
        disabled={loading}
        onClick={() => handle('/api/sync-metaobjects')}
        className="bg-green-500 disabled:opacity-50 text-white py-2 px-4 rounded"
      >
        {loading ? 'Syncing...' : 'Sync Metaobjects'}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
