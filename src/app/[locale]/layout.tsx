import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SADARADAN',
  description: 'Multilingual classified platform',
};

export default async function LocaleLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await _params;
  const messages = await getMessages({ locale: params.locale });

  if (!messages) notFound();

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        dir={params.locale === 'ar' ? 'rtl' : 'ltr'}
      >
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
