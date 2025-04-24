'use client';

import React from 'react';

interface UploadButtonProps {
  onUpload?: (src: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const stored = JSON.parse(localStorage.getItem('designConfig') || '{"elements":[]}');
      const elements = [...(stored.elements || []), { type: 'image', src, x: 0, y: 0, width: 200, height: 200 }];
      localStorage.setItem('designConfig', JSON.stringify({ ...stored, elements }));
      window.dispatchEvent(new CustomEvent('designConfigChange'));
      onUpload?.(src);
    };
    reader.readAsDataURL(file);
  };

  return <input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-neutral-200 file:bg-neutral-700 file:text-white file:px-4 file:py-2 file:rounded" />;
};

export default UploadButton;
