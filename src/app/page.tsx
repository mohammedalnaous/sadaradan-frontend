// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectRootPage() {
  const router = useRouter();

  useEffect(() => {
    // Get from cookie
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];

    // Or detect browser/system language
    const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';

    // Decide where to go
    const targetLocale = cookieLocale === 'ar' || cookieLocale === 'en'
      ? cookieLocale
      : browserLang;

    router.replace(`/${targetLocale}`);
  }, [router]);

  return null;
}
