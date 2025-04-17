'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Phone } from 'lucide-react';

export default function CompleteProfilePage() {
  const t = useTranslations('completeProfile');
  const locale = useLocale();
  const router = useRouter();

  const [form, setForm] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) router.replace(`/${locale}/login`);
  }, [locale, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isPasswordStrong = (password: string) => {
    const rules = [
      /.{8,}/,
      /[A-Z]/,
      /[a-z]/,
      /[0-9]/,
      /[^A-Za-z0-9]/
    ];
    return rules.every((r) => r.test(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError('❌ Passwords do not match.');
      return;
    }

    if (!isPasswordStrong(form.password)) {
      setError(
        '❌ Password must be at least 8 characters, with uppercase, lowercase, number and special character.'
      );
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('Access token missing. Please log in again.');

      let normalizedMobile = form.mobile.trim();
      if (/^05\d{9}$/.test(normalizedMobile)) {
        normalizedMobile = normalizedMobile.replace(/^0/, '+90');
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/set-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mobile: normalizedMobile,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unknown error');

      if (data.accessToken && data.refreshToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      router.replace(`/${locale}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen flex flex-col items-center px-4 py-8 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      {/* 🌙 Dark Mode Toggle */}
      <div className="w-full max-w-md text-right mb-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm underline"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Logo */}
      <Image
        src="/logo.png"
        alt="SADARADAN"
        width={240}
        height={120}
        priority
        className="mb-4"
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4 border dark:border-gray-700"
      >
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
           {t('title') || 'Complete Your Profile'}
            </h2>

        <input
  id="mobile"
  type="tel"
  name="mobile"
  value={form.mobile}
  placeholder={t('mobile') || '+905555555555'}
  onChange={handleChange}
  className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring text-black placeholder-gray-500 ${
    locale === 'ar' ? 'text-right' : 'text-left'
  }`}
  dir="ltr"
  required
/>

        <input
          type="password"
          name="password"
          placeholder={t('password') || 'Create Password'}
          value={form.password}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder={t('confirmPassword') || 'Confirm Password'}
          value={form.confirmPassword}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
          <p>{t('passwordRules') || 'Password must include:'}</p>
          <ul className="list-disc ml-5">
            <li>{t('rule1') || 'At least 8 characters'}</li>
            <li>{t('rule2') || 'Uppercase & lowercase letters'}</li>
            <li>{t('rule3') || 'A number'}</li>
            <li>{t('rule4') || 'A special character'}</li>
          </ul>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
        type="submit"
        className="w-full py-2 text-white font-semibold rounded-lg shadow-md transition duration-300"
        style={{ backgroundColor: '#C8A165' }}
         disabled={loading}
         >
         {loading ? t('loading') || 'Saving...' : t('submit') || 'Finish Registration'}
         </button>
      </form>

      {/* 📜 Footer */}
      <footer className="mt-10 px-6 py-4 w-full max-w-6xl text-gray-600 dark:text-gray-200 text-xs">
        <div className="mb-4 text-center text-xs">
          <p>
            {locale === 'ar'
              ? 'جميع المحتويات والآراء والمعلومات المنشورة من قبل المستخدمين على موقع sadaradan.com دقيقة وكاملة ولا يمكن تغييرها، والمسؤوليات القانونية المتعلقة بنشرها تقع على عاتق المستخدم الذي أنشأ المحتوى. لا يتحمل موقع sadaradan.com أي مسؤولية عن الأخطاء أو المخالفات القانونية في هذا المحتوى أو الآراء أو المعلومات. يمكنك التواصل مع المعلن لطرح أسئلتك.'
              : 'All content, opinions and information created by users on sadaradan.com are accurate, complete and unchangeable, and the legal obligations regarding their publication belong to the user who created the content. sadaradan.com is not responsible in any way for the inaccuracies, deficiencies or violation of the rules regulated by law in this content, opinions and information. You can contact the advertiser for your questions.'}
          </p>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="flex items-center gap-2 text-lg">
            <Phone size={50} className="text-[#C8A165]" />
            00905355982811
          </p>
          <p className="text-2xl font-semibold text-right">sadaradan.com 2025 ©</p>
        </div>
      </footer>
    </div>
  );
}
