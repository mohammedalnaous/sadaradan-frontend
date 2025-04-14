'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
  const t = useTranslations('footer');
  const groups = ['corporate', 'services', 'dealers', 'help'];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {groups.map((group, index) => {
          const groupLinks = t.raw(`links.${group}`) as string[];
          return (
            <div key={index}>
              <h4 className="text-lg font-bold mb-3">{t(`groups.${group}`)}</h4>
              <ul className="space-y-1 text-sm">
                {groupLinks.map((link, i) => (
                  <li
                    key={i}
                    className="hover:underline cursor-pointer text-gray-300 hover:text-white transition"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 px-4 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <p className="text-sm text-gray-400">&copy; 2025 SADARADAN All rights reserved.</p>

        {/* App Store Badges */}
        <div className="flex gap-4">
          <Image
            src="/assets/appstore.png"
            alt="App Store"
            width={240}
            height={120}
          />
          <Image
            src="/assets/googleplay.png"
            alt="Google Play"
            width={240}
            height={120}
          />
        </div>
      </div>
    </footer>
  );
}
