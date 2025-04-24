'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function PreviewArea() {
  const [config, setConfig] = useState<any>({ elements: [] });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = 400;
  const height = 300;
  const scale = width / 800;

  useEffect(() => {
    const stored = localStorage.getItem('designConfig');
    if (stored) setConfig(JSON.parse(stored));
    const handler = () => {
      const s = localStorage.getItem('designConfig');
      if (s) setConfig(JSON.parse(s));
    };
    window.addEventListener('designConfigChange', handler);
    return () => window.removeEventListener('designConfigChange', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    config.elements.forEach((el: any) => {
      if (el.type === 'image') {
        const img = new Image();
        img.src = el.src;
        img.onload = () => ctx.drawImage(img, el.x * scale, el.y * scale, el.width * scale, el.height * scale);
      } else if (el.type === 'text') {
        ctx.font = `${el.fontSize * scale}px ${el.fontFamily}`;
        ctx.fillStyle = el.color || '#ffffff';
        ctx.fillText(el.text, el.x * scale, el.y * scale);
      }
    });
  }, [config, scale]);

  return (
    <div className="border border-neutral-700 bg-black p-4 rounded mt-4">
      <canvas ref={canvasRef} width={width} height={height} className="w-full h-auto" />
    </div>
  );
}
