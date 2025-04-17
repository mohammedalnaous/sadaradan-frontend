'use client';

import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: unknown;
}

export function useAutoRefreshToken(): void {
  const { getAccessToken, getRefreshToken, saveTokens, logout } = useAuth();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    let refreshTimeout: NodeJS.Timeout;

    try {
      const decoded = jwtDecode<JwtPayload>(accessToken);
      const exp = decoded?.exp;

      if (!exp) {
        logout();
        return;
      }

      const now = Date.now();
      const expMs = exp * 1000;
      const timeUntilExpiry = expMs - now;
      const refreshDelay = timeUntilExpiry - 60_000; // refresh 1 min before expiry

      if (refreshDelay <= 0) {
        logout();
        return;
      }

      refreshTimeout = setTimeout(() => {
        void refreshTokens();
      }, refreshDelay);
    } catch (error) {
      console.error('❌ Token decode failed:', error);
      logout();
    }

    return () => {
      clearTimeout(refreshTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshTokens = async (): Promise<void> => {
    try {
      const response = await fetch('/auth/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data?.accessToken && data?.refreshToken) {
        saveTokens(data.accessToken, data.refreshToken);
      } else {
        logout();
      }
    } catch (err) {
      console.error('❌ Auto-refresh failed:', err);
      logout();
    }
  };
}
