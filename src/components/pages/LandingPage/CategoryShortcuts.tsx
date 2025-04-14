'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  CarFront,
  Truck,
  Bus,
  Wrench,
  Store,
  Gem,
  Gavel,
  Leaf,
  BatteryCharging
} from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

const icons = [
  <CarFront size={40} className="text-blue-600" />,
  <CarFront size={40} className="text-cyan-700" />,
  <Truck size={40} className="text-green-600" />,
  <Bus size={40} className="text-orange-500" />,
  <Wrench size={40} className="text-gray-600" />,
  <Store size={40} className="text-red-600" />,
  <Gem size={40} className="text-indigo-600" />,
  <Gavel size={40} className="text-yellow-600" />,
  <Leaf size={40} className="text-emerald-400" />,
  <BatteryCharging size={40} className="text-emerald-600" />
];

export default function CategoryShortcuts() {
  const t = useTranslations('categoryShortcuts');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<string[] | null>(null);

  useEffect(() => {
    const raw = t.raw('categories') as string[];
    setCategories(raw);
    setMounted(true);
  }, [t]);

  if (!mounted || !categories) return null;

  return (
    <section className="py-3 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* ✅ Title */}
        <h2 className="text-3xl font-bold mb-3">{t('title')}</h2>

        {/* ✅ Desktop: Responsive layout with RTL support */}
        <div
          className={clsx(
            'hidden md:flex gap-6 items-center',
            isRTL ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          {/* ✅ Spinning Icon with entrance animation and responsive size */}
          <div
            className={clsx(
              'flex items-center justify-center',
              'animate-fade-slide-in'
            )}
          >
<div className="w-24 h-24 md:w-40 md:h-40 lg:w-48 lg:h-48 animate-spin-slow hover-glow rounded-full">
<Image src="/icons/asterisk-green.svg" alt="Spinning Icon" width={192} height={192} />

            </div>
          </div>

          {/* ✅ Category Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 flex-1">
            {categories.map((label, index) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center bg-white border rounded-lg p-3 shadow-sm transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style.boxShadow = '0 0 12px #C8A165');
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.style.boxShadow =
                    '0 2px 4px rgba(0,0,0,0.08)');
                }}
              >
                <div className="mb-1">{icons[index]}</div>
                <span className="text-2xl text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Mobile: Scrollable version */}
        <div className="md:hidden flex space-x-3 overflow-x-auto scrollbar-hide mt-3">
          {categories.map((label, index) => (
            <div
              key={label}
              className="min-w-[90px] flex flex-col items-center justify-center bg-white border rounded-lg p-2 shadow-sm transition-all duration-300 transform hover:scale-105"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.style.boxShadow = '0 0 12px #C8A165');
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.boxShadow =
                  '0 2px 4px rgba(0,0,0,0.08)');
              }}
            >
              <div className="mb-1">{icons[index]}</div>
              <span className="text-sm font-bold text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
