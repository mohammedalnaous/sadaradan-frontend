'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Article = {
  title: string;
  date: string;
  image: string;
};

export default function AdviceSection() {
  const t = useTranslations('adviceSection');
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loaded = t.raw('articles') as Article[];
    setArticles(loaded);
  }, [t]);

  if (!articles.length) return null;

  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 font-alarabiya">{t('title')}</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {articles.map((item, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
              }}
            >
              <div className="relative h-40 w-full">
                <Image
                  src={`/advice/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="p-3 rounded-b-xl transition-all duration-300 transform hover:scale-[1.01]"
                style={{
                  backgroundColor: '#fff',
                  color: '#0B1F66',
                  textShadow: 'none',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="font-bold text-2xl">{item.title}</h3>
                <p className="text-lg mt-1">📅 {item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ More Button stays unchanged */}
        <div className="flex justify-center">
          <button
            className="px-6 py-2 rounded-full font-bold text-2xl transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: '#0B1F66',
              color: '#fff',
              textShadow: '0 1px 1px #000',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 12px #0B1F66';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
          >
            {t('moreButton')}
          </button>
        </div>
      </div>
    </section>
  );
}
