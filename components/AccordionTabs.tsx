'use client';

import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface Props {
  tabs: Tab[];
}

export default function AccordionTabs({ tabs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-2xl mx-auto bg-neutral-900 rounded-xl shadow-lg divide-y divide-neutral-800">
      {tabs.map((tab, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div key={tab.label}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className={`w-full text-left px-6 py-4 font-bold text-yellow-400 focus:outline-none flex justify-between items-center transition-colors ${
                isOpen ? 'bg-neutral-800' : 'hover:bg-neutral-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-xl">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && (
              <div className="px-6 py-4 bg-neutral-800 text-gray-200">
                {tab.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
