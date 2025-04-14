'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function PopularTags() {
  const t = useTranslations('popularTags');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const translated = t.raw('tags') as string[];
    setTags(translated);
  }, [t]);

  if (!tags.length) return null;

  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>

        {/* ✅ Mobile tags - styled like SmartFilters */}
        <div className="md:hidden flex overflow-x-auto gap-3 scrollbar-hide">
          {tags.map((tag, index) => (
            <a
              key={index}
              href={`/tags/${tag.toLowerCase()}`}  // Link to the tag page or any URL
              className="min-w-fit px-4 py-2 text-2xl font-bold rounded-full transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: '#C8A165',
                color: '#fff',
                opacity: 0.85,
                textShadow: '0 1px 1px #000',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.boxShadow = '0 0 12px #C8A165';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.85';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              {tag}
            </a>
          ))}
        </div>

        {/* ✅ Desktop tags - styled like SmartFilters */}
        <div className="hidden md:grid grid-cols-5 gap-3 mt-4">
          {tags.map((tag, index) => (
            <a
              key={index}
              href={`/tags/${tag.toLowerCase()}`}  // Link to the tag page or any URL
              className="text-center px-4 py-2 text-2xl font-bold rounded-full transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: '#C8A165',
                color: '#fff',
                opacity: 0.85,
                textShadow: '0 1px 1px #000',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.boxShadow = '0 0 12px #C8A165';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.85';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
