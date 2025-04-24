'use client';

import React from 'react';

interface FontSelectorProps {
  fonts: string[];
  onFontChange?: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ fonts, onFontChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    onFontChange?.(font);
    const stored = JSON.parse(localStorage.getItem('designConfig') || '{"elements":[]}');
    localStorage.setItem('designConfig', JSON.stringify({ ...stored, selectedFont: font }));
    window.dispatchEvent(new CustomEvent('designConfigChange'));
  };

  return (
    <select onChange={handleChange} className="w-full p-2 bg-neutral-700 rounded">
      {fonts.map(font => (
        <option key={font} value={font} style={{ fontFamily: font }}>
          {font}
        </option>
      ))}
    </select>
  );
};

export default FontSelector;
