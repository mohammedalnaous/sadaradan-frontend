// src/utils/auth.ts
export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };
  
  export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken');
  };
  
  export const saveTokens = (access: string, refresh: string) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
  };
  
  export const clearTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  
  export const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };
  