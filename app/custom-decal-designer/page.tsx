'use client';
import React, { useState, useRef, useEffect } from 'react';

export default function CustomDecalDesigner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => setImg(image);
    }
  }, [file]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (img) {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    }
    ctx.fillStyle = '#FFD700';
    ctx.font = '30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, canvas.width / 2, canvas.height - 30);
  }, [img, text]);

  const handleSave = () => {
    if (!canvasRef.current) return;
    const data = {
      text,
      image: canvasRef.current.toDataURL(),
    };
    const existing = JSON.parse(localStorage.getItem('custom-designs') || '[]');
    existing.push(data);
    localStorage.setItem('custom-designs', JSON.stringify(existing));
    alert('Design saved to My Designs');
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Custom Decal Designer</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 flex flex-col gap-4">
          <label className="font-semibold">Custom Text</label>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            className="p-2 bg-neutral-800 rounded text-white"
            placeholder="Enter text…"
          />
          <label className="font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => e.target.files && setFile(e.target.files[0])}
            className="text-white"
          />
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-yellow-400 text-black font-bold rounded"
          >Save to My Designs</button>
        </div>
        <div className="md:w-1/2 flex justify-center items-center bg-neutral-900 p-4 rounded">
          <canvas ref={canvasRef} width={400} height={400} className="bg-neutral-800 rounded" />
        </div>
      </div>
    </main>
  );
}
