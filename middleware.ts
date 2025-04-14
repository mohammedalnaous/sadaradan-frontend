// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  localeDetection: false
});

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ Root route redirect logic
  if (pathname === '/') {
    const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (savedLocale === 'en' || savedLocale === 'ar') {
      return NextResponse.redirect(new URL(`/${savedLocale}`, request.url));
    }
    return NextResponse.redirect(new URL('/language', request.url));
  }

  // ✅ All other routes handled by next-intl middleware
  return intlMiddleware(request);
}

// ✅ Match everything except static files, _next, api
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)']
};
