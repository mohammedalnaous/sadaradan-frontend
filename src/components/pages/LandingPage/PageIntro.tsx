'use client';

import { useEffect, useState } from 'react';

export default function PageIntro({ onFinish }: { onFinish: () => void }) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = 'SADARA APP';

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setFadeOut(true), 800);
      setTimeout(() => onFinish(), 1400);
    }
  }, [index]);

  return (
    <div
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <h1 className="text-7xl md:text-7xl font-extrabold text-white glowing-text">
        {text}
        <span className="animate-pulse text-blue-300 ml-1">|</span>
      </h1>
    </div>
  );
}
