'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PromoAds() {
  const t = useTranslations('promoAds');
  const [promos, setPromos] = useState<string[]>([]);

  useEffect(() => {
    const translated = t.raw('items') as string[];
    setPromos(translated);
  }, [t]);

  if (!promos.length) return null;

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto flex gap-3 scrollbar-hide">
        {promos.map((text, index) => (
          <div
            key={index}
            className="min-w-[240px] h-[56px] flex items-center justify-center text-center rounded-xl px-5 py-3 font-bold text-lg transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: '#C8A165',
              color: '#fff',
              textShadow: '0px 1px 1px #000',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid transparent',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.boxShadow = '0 0 12px #C8A165');
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)');
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
