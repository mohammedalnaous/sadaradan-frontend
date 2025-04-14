'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const images = [
  '/banners/banner1.jpg',
  '/banners/banner2.jpg',
  '/banners/banner3.jpg'
];

type Banner = { title: string; subtitle: string };

export default function HeroBanner() {
  const t = useTranslations('heroBanner');
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    // Load translated banner content client-side only
    const loaded = t.raw('banners') as Banner[];
    setBanners(loaded);
    setMounted(true);
  }, [t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔒 Prevent render until both mounted and banners loaded
  if (!mounted || banners.length === 0) return null;

  return (
    <div className="relative w-full h-[180px] md:h-[250px] lg:h-[300px] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={img}
            alt={`Banner ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center px-4 md:px-10 text-white">
            <h2 className="text-lg md:text-2xl font-bold mb-1">
              {banners[index]?.title}
            </h2>
            <p className="text-xs md:text-base">{banners[index]?.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
