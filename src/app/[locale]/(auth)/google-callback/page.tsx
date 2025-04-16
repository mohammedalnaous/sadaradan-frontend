'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useLocale } from 'next-intl';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');

      if (!accessToken || !refreshToken) {
        setError('❌ Missing login tokens.');
        return;
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const decoded = jwtDecode<{ mobile?: string }>(accessToken);

      if (!decoded?.mobile) {
        router.replace(`/${locale}/register/complete-profile`);
      } else {
        router.replace(`/${locale}/user/home`);
      }
    } catch (err) {
      console.error('❌ Google callback parse error:', err);
      setError('❌ Google login failed. Please try again.');
    }
  }, [searchParams, router, locale]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      {error ? (
        <p className="text-red-600 text-lg">{error}</p>
      ) : (
        <p className="text-gray-700 text-lg">✅ Logging you in via Google...</p>
      )}
    </div>
  );
}
