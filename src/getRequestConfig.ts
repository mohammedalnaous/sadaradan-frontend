// src/getRequestConfig.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const selectedLocale = locale || 'ar'; // fallback just in case

  const messages = (await import(`../messages/${selectedLocale}.json`)).default;

  return {
    messages,
    locale: selectedLocale
  };
});
