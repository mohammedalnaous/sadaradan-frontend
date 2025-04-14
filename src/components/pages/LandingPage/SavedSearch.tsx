'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';

export default function SavedSearch() {
  const t = useTranslations('savedSearch');

  const savedSearches = [
    'Toyota SUV < 50,000km',
    'Hyundai under $10k',
    'BMW Diesel',
  ];

  return (
    <div className="relative group">
      <button className="flex items-center text-sm font-medium text-gray-700 hover:text-red-500 transition">
        <Heart className="mr-1" size={18} />
        {t('title')}
      </button>

      <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-64 p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
        {savedSearches.map((search, index) => (
          <div
            key={index}
            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            {search}
          </div>
        ))}
      </div>
    </div>
  );
}
