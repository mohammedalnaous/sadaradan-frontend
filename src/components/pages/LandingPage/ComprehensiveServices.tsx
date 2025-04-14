'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';  // Import the Link component

export default function ComprehensiveServices() {
  const t = useTranslations('comprehensiveServices');

  const services = [
    {
      icon: '💰',
      title: t('financing.title'),
      bullets: [t('financing.line1'), t('financing.line2')],
      link: '/financing'  // Add the link for Financing
    },
    {
      icon: '🛠️',
      title: t('carAudit.title'),
      bullets: [t('carAudit.line1'), t('carAudit.line2')],
      link: '/car-audit'  // Add the link for Car Audit
    },
    {
      icon: '🚚',
      title: t('delivery.title'),
      bullets: [t('delivery.line1'), t('delivery.line2')],
      link: '/delivery'  // Add the link for Delivery
    },
    {
      icon: '🛡️',
      title: t('warranty.title'),
      bullets: [t('warranty.line1'), t('warranty.line2')],
      link: '/warranty'  // Add the link for Warranty
    },
    {
      icon: '📄',
      title: t('insurance.title'),
      bullets: [t('insurance.line1'), t('insurance.line2')],
      link: '/insurance'  // Add the link for Insurance
    },
    {
      icon: '📋',
      title: t('registration.title'),
      bullets: [t('registration.line1'), t('registration.line2')],
      link: '/vehicle-registration'  // Add the link for Vehicle Registration
    }
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-6 text-gray-700 text-center">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}  // Use the link here
              passHref
            >
              <div
                className="bg-white rounded-xl shadow hover:shadow-md p-5 transition-all flex flex-col gap-3 cursor-pointer"
              >
                <div className="text-4xl">{service.icon}</div>
                <h3 className="text-md font-semibold text-gray-800">{service.title}</h3>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  {service.bullets.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
