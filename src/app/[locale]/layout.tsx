import '../globals.css';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SADARADAN',
  description: 'Multilingual classified platform',
};

// ✅ Static wrapper layout
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return <LocaleLoader locale={params.locale}>{children}</LocaleLoader>;
}

// ✅ Async loader for translations
async function LocaleLoader({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (err) {
    console.error(`❌ Failed to load translations for locale: ${locale}`, err);
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        <Toaster position="top-center" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// ✅ Generate routes for each supported locale
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
