'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

export default function FloatingPostAd() {
  const t = useTranslations('floatingPostAd');
  const locale = useLocale();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/${locale}/post`)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-bold text-white text-3x1 shadow-lg transition-all duration-300 transform hover:scale-105"
      style={{
        backgroundColor: '#C8A165',
        textShadow: '0 1px 1px #000',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 12px #C8A165';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      }}
    >
      <Plus size={40} />
      {t('button')}
    </button>
  );
}
