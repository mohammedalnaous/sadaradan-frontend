// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

const supportedLocales = ['en', 'ar'];

export default getRequestConfig(async ({ locale }) => {
  console.log('🌐 getRequestConfig received locale:', locale);

  const selectedLocale = supportedLocales.includes(locale || '') ? locale! : 'ar';

  const messages = (await import(`../messages/${selectedLocale}.json`)).default;

  return {
    messages,
    locale: selectedLocale
  };
});
