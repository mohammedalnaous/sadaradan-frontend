'use client';

import { useTranslations } from 'next-intl';
import { JSX, useEffect, useRef, useState } from 'react';
import {
  Handshake,
  UserCheck,
  Car,
  BriefcaseBusiness
} from 'lucide-react';
import { useInView } from 'framer-motion';

function useCountUp(target: number, trigger: boolean, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const increment = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(interval);
        setCount(target);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [target, trigger, duration]);

  return count;
}

function StatCard({
  value,
  label,
  icon
}: {
  value: string;
  label: string;
  icon: JSX.Element;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const number = parseInt(value.replace(/\D/g, ''), 10);
  const animated = useCountUp(number, isInView);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl shadow hover:shadow-md transition p-6 text-center border-t-4 border-[#C8A165]"
    >
      <div className="mb-3">{icon}</div>
      <p className="text-3xl font-bold text-[#C8A165]">
        {animated}+
      </p>
      <p className="text-lg font-medium text-gray-800 mt-1">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const t = useTranslations('statsSection');
  const [mounted, setMounted] = useState(false);
  const stats = t.raw('stats') as { value: string; label: string }[];

  const icons = [
    <Handshake size={32} className="text-[#C8A165]" />,
    <UserCheck size={32} className="text-[#C8A165]" />,
    <Car size={32} className="text-[#C8A165]" />,
    <BriefcaseBusiness size={32} className="text-[#C8A165]" />
  ];

  useEffect(() => setMounted(true), []);
  if (!mounted || !stats.length) return null;

  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            icon={icons[index]}
          />
        ))}
      </div>
    </section>
  );
}
