// components/StyledCTA.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Badge {
  icon?: React.ReactNode;
  text: string;
}

interface StyledCTAProps {
  title: string;
  subtitle: string;
  button: { text: string; link: string };
  badges?: Badge[];
  imageUrl?: string;
  imageAlt?: string;
  asSeenOn?: React.ReactNode;
  testimonial?: React.ReactNode;
}

export default function StyledCTA({
  title,
  subtitle,
  button,
  badges = [],
  imageUrl,
  imageAlt,
  asSeenOn,
  testimonial,
}: StyledCTAProps) {
  return (
    <section className="relative bg-neutral-900 bg-opacity-80 rounded-3xl p-8 text-center text-white max-w-4xl mx-auto">
      {/* Glow Animation Layer */}
      <div className="absolute inset-0 rounded-3xl animate-pulse bg-gradient-to-tr from-cyan-400/20 via-transparent to-blue-600/20"></div>
      <div className="relative z-10 flex flex-col items-center">
        {imageUrl && (
          <div className="mb-8 w-[min(60vw,320px)] h-[min(60vw,320px)] rounded-3xl overflow-hidden border-4 border-cyan-400 shadow-lg">
            <Image
              src={imageUrl}
              alt={imageAlt || 'CTA Visual'}
              width={320}
              height={320}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 drop-shadow-lg">
          {title}
        </h1>
        <p className="text-lg md:text-xl font-medium mb-6 text-gray-200 drop-shadow">
          {subtitle}
        </p>

        <Link
          href={button.link}
          className="inline-block bg-gradient-to-r from-cyan-400 to-yellow-400 text-black font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-transform active:scale-95 mb-6"
        >
          {button.text}
        </Link>

        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {badges.map((badge, i) => (
              <span
                key={i}
                className="flex items-center gap-2 bg-black bg-opacity-60 px-4 py-2 rounded-full text-cyan-400 font-semibold shadow-inner"
              >
                {badge.icon}
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {testimonial && <div className="mb-6 w-full">{testimonial}</div>}
        {asSeenOn && <div className="w-full">{asSeenOn}</div>}
      </div>
    </section>
  );
}
