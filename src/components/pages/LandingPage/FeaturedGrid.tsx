'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Listing = {
  title: string;
  location: string;
  price: string;
};

export default function FeaturedGrid() {
  const t = useTranslations('featuredGrid');
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const translated = t.raw('items') as Listing[];
    setListings(translated);
  }, [t]);

  if (!listings.length) return null;

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-base font-semibold mb-3">{t('title')}</h2>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border overflow-hidden transform transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.style.boxShadow = '0 0 12px #C8A165');
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)');
              }}
            >
              <div className="relative h-28 w-full">
                <Image
                  src={`/featured/Featured${index + 1}.jpg`}
                  alt={item.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.location}</p>
                <p className="font-semibold mt-1 text-sm" style={{ color: '#C8A165' }}>
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
