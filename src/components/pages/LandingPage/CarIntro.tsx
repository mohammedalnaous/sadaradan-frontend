'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function CarIntro() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 16000); // 8s x 2
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[9999] pointer-events-none">
      <div
        className="absolute w-[320px] md:w-[480px] lg:w-[600px]"
        style={{
          bottom: 0,
          left: isRTL ? '100vw' : '-400px',
          animation: `${isRTL ? 'car-from-right' : 'car-from-left'} 6s ease-in-out 0s 2 forwards`,
          transform: isRTL ? 'scaleX(-1)' : 'none'
        }}
      >
        <Image
          src="/assets/car-intro.png"
          alt="Animated Car"
          width={600}
          height={200}
          className="w-full h-auto object-contain drop-shadow-xl"
          priority
        />
      </div>
    </div>
  );
}
