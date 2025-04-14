// next.config.ts
import { Configuration } from 'webpack';
import withNextIntl from 'next-intl/plugin';

const pluginConfig = {
  // This tells next-intl where to load `locale` config from
  requestConfig: './src/i18n/request.ts'
};

const nextConfig = {
  reactStrictMode: true,
  webpack: (config: Configuration) => {
    config.experiments = { topLevelAwait: true, layers: true };
    return config;
  }
};

export default withNextIntl(pluginConfig)(nextConfig);
