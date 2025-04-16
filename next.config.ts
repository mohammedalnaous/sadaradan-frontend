// next.config.ts
import { Configuration } from 'webpack';
import withNextIntl from 'next-intl/plugin';

const pluginConfig = {
  requestConfig: './src/i18n/request.ts', // ✅ your messages loader
};

const nextConfig = {
  reactStrictMode: true,

  // ❌ REMOVE this block completely when using App Router!
  // i18n: {
  //   locales: ['en', 'ar'],
  //   defaultLocale: 'en',
  // },

  webpack: (config: Configuration) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  },
};

export default withNextIntl(pluginConfig)(nextConfig);
