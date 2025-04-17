'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  getAccessToken as getStoredAccessToken,
  getRefreshToken as getStoredRefreshToken,
  saveTokens as saveStoredTokens,
  clearTokens,
  isTokenValid,
} from '@/utils/auth';

export function useAuth() {
  const router = useRouter();
  const locale = useLocale();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getStoredAccessToken();
    setIsLoggedIn(!!token && isTokenValid(token));
  }, []);

  const getAccessToken = () => getStoredAccessToken();
  const getRefreshToken = () => getStoredRefreshToken();

  const saveTokens = (accessToken: string, refreshToken: string) => {
    saveStoredTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    clearTokens();
    setIsLoggedIn(false);
    toast.success('✅ You have been logged out.');
    router.push(`/${locale}`);
  };

  const redirectToLogin = () => {
    router.replace(`/${locale}/login`);
  };

  const redirectToHome = () => {
    router.replace(`/${locale}`);
  };

  return {
    isLoggedIn,
    getAccessToken,
    getRefreshToken,
    saveTokens,
    logout,
    redirectToLogin,
    redirectToHome,
  };
}
