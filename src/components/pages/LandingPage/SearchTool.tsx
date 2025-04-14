'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchTool() {
  const t = useTranslations('searchTool');
  const [paymentType, setPaymentType] = useState<'cash' | 'finance'>('cash');

  return (
    <section className="bg-white py-6 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">{t('title')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <input placeholder={t('city')} className="input" />
          <input placeholder={t('brand')} className="input" />
          <input placeholder={t('series')} className="input" />
          <input placeholder={t('model')} className="input" />
          <input placeholder={t('km')} className="input" />
          <input placeholder={t('minPrice')} className="input" />
          <input placeholder={t('maxPrice')} className="input" />

          <select
            className="input"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value as 'cash' | 'finance')}
          >
            <option value="cash">{t('cash')}</option>
            <option value="finance">{t('finance')}</option>
          </select>
        </div>

        <div className="mt-4 text-right">
          <button className="bg-[#C8A165] hover:bg-[#a7834d] text-white font-bold py-2 px-6 rounded-full inline-flex items-center gap-2 transition-all">
            <Search size={18} />
            {t('search')}
          </button>
        </div>
      </div>
    </section>
  );
}
