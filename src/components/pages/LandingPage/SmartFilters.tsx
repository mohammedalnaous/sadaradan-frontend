'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function SmartFilters() {
  const t = useTranslations('smartFilters');
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const translated = t.raw('filters') as string[];
    setFilters(translated);
  }, [t]);

  if (!filters.length) return null;

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2">
        {filters.map((label, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
            className="px-4 py-2 rounded-full font-bold text-2xl transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: '#0B1F66', // 🔵 dark blue
              opacity: index === selectedIndex ? 1 : 0.85,
              color: '#fff',
              textShadow: '0px 1px 2px #000',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 12px #0B1F66';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
