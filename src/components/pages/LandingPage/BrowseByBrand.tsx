'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function BrowseByBrand() {
  const t = useTranslations('browseByBrand');
  const locale = useLocale();

  const brands = [
    { label: 'Toyota', value: 'Toyota', logo: '/brands/toyota.png' },
    { label: 'Hyundai', value: 'Hyundai', logo: '/brands/hyundai.png' },
    { label: 'BWM', value: 'BMW', logo: '/brands/bmw.png' }, // typo in label but correct search
    { label: 'Kia', value: 'Kia', logo: '/brands/kia.png' },
    { label: 'Mercedes', value: 'Mercedes', logo: '/brands/mercedes.png' },
    { label: 'Nissan', value: 'Nissan', logo: '/brands/nissan.png' },
    { label: 'Chevrolet', value: 'Chevrolet', logo: '/brands/chevrolet.png' },
    { label: 'Honda', value: 'Honda', logo: '/brands/honda.png' }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{t('title')}</h2>

        <div className="flex md:grid md:grid-cols-6 lg:grid-cols-8 gap-4 overflow-x-auto md:overflow-visible py-2">
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={`/${locale}/search?brand=${encodeURIComponent(brand.value)}`}
              className="flex-none md:flex md:flex-col items-center gap-2 hover-glow transition-all"
            >
              <div className="w-24 h-24 rounded-full bg-white border flex items-center justify-center shadow-sm overflow-hidden">
                <Image
                  src={brand.logo}
                  alt={brand.label}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gray-700 font-semibold mt-1 md:text-center">
                {brand.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
