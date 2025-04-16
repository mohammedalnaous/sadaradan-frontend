import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
});

export const config = {
  // Match all paths except API, _next, assets, etc.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
