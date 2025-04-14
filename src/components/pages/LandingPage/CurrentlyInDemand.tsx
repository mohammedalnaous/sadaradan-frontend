'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function CurrentlyInDemand() {
  const t = useTranslations('currentlyInDemand');
  const locale = useLocale();

  const trendingBrands = [
    {
      brand: 'Hyundai',
      model: 'Tucson',
      logo: '/brands/hyundai.png',
      tag: '⚡ Tucson'
    },
    {
      brand: 'Toyota',
      model: 'Corolla',
      logo: '/brands/toyota.png',
      tag: '💎 Corolla'
    },
    {
      brand: 'BMW',
      model: 'X5',
      logo: '/brands/bmw.png',
      tag: '🚗 X5'
    },
    {
      brand: 'Kia',
      model: 'Sportage',
      logo: '/brands/kia.png',
      tag: '🔥 Sportage'
    }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* ✅ Title in dark blue box */}
        <div className="bg-blue-900 text-white text-center py-2 rounded-lg mb-6">
          <h2 className="text-lg font-semibold tracking-wide">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {trendingBrands.map((item, index) => (
            <Link
              key={index}
              href={`/${locale}/search?brand=${encodeURIComponent(item.brand)}&model=${encodeURIComponent(item.model)}`}
              className="bg-gray-50 rounded-xl shadow hover:shadow-md hover-glow p-4 transition-all cursor-pointer flex flex-col items-center gap-3"
            >
              <Image
                src={item.logo}
                alt={item.brand}
                width={100}
                height={60}
                className="object-contain h-[60px] w-auto max-w-[100px]"
              />
              <h3 className="text-sm font-semibold text-gray-800">{item.brand}</h3>
              <span className="text-base font-semibold text-yellow-800 bg-yellow-100 px-3 py-1 rounded-full">
                {item.tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
