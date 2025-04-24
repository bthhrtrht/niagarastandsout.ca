'use client';

import React, { useRef, useEffect, useState } from 'react';

interface CanvasDesignerProps {
  width: number;
  height: number;
}

export default function CanvasDesigner({ width, height }: CanvasDesignerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [designConfig, setDesignConfig] = useState<any>({ elements: [] });

  useEffect(() => {
    const stored = localStorage.getItem('designConfig');
    if (stored) setDesignConfig(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    designConfig.elements.forEach((el: any) => {
      if (el.type === 'image') {
        const img = new Image();
        img.src = el.src;
        img.onload = () => ctx.drawImage(img, el.x, el.y, el.width, el.height);
      } else if (el.type === 'text') {
        ctx.font = `${el.fontSize}px ${el.fontFamily}`;
        ctx.fillStyle = el.color;
        ctx.fillText(el.text, el.x, el.y);
      }
    });
  }, [designConfig, width, height]);

  // Expose save function
  (window as any).saveDesign = () => {
    localStorage.setItem('designConfig', JSON.stringify(designConfig));
  };

  return <canvas ref={canvasRef} width={width} height={height} className="bg-white" />;
}
