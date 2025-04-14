'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function LanguagePage() {
  const router = useRouter();

  useEffect(() => {
    console.log('🌍 Language selector rendered');
  }, []);

  const handleSelect = (locale: 'en' | 'ar') => {
    if (locale !== 'en' && locale !== 'ar') return;
    Cookies.set('NEXT_LOCALE', locale, { expires: 365 });
    router.push(`/${locale}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4 text-center">
      <h1 className="text-3xl font-semibold mb-6">🌐 Choose your language</h1>
      <div className="flex gap-6">
        <button
          onClick={() => handleSelect('en')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg shadow-md transition"
        >
          🇺🇸 English
        </button>
        <button
          onClick={() => handleSelect('ar')}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg shadow-md transition"
        >
          🇸🇦 العربية
        </button>
      </div>
    </div>
  );
}
