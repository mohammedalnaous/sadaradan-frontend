'use client';

import { useState } from 'react';
import PageIntro from '@/components/pages/LandingPage/PageIntro';
import LandingPage from '@/components/pages/LandingPage';

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && <PageIntro onFinish={() => setShowIntro(false)} />}
      {!showIntro && <LandingPage />}
    </>
  );
}
