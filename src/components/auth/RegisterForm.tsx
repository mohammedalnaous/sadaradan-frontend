'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import axios from '@/lib/axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import { Phone, LogIn, Apple, Smartphone } from 'lucide-react';

export default function RegisterForm() {
  const t = useTranslations('register');
  const locale = useLocale();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    recaptchaToken: '',
  });

  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRecaptcha = (token: string | null) => {
    setForm((prev) => ({ ...prev, recaptchaToken: token || '' }));
  };

  const isPasswordStrong = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecial
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('❌ Passwords do not match');
      return;
    }

    if (!isPasswordStrong(form.password)) {
      alert(
        '❌ Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (!form.recaptchaToken) {
      alert('❌ Please complete the reCAPTCHA');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/auth/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        recaptchaToken: form.recaptchaToken,
      });

      alert(t('success'));
      router.push(`/${locale}/login`);
    } catch (err: any) {
      alert(`${t('fail')}: ${err?.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE}/auth/google`;
  };

  const handleApple = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE}/auth/apple`;
  };

  const handleOtp = () => {
    router.push(`/${locale}/register/otp`);
  };

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen w-full px-4 flex flex-col justify-center items-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="max-w-md w-full space-y-6">
        {/* 🌙 Dark Mode Switch */}
        <div className={`text-${locale === 'ar' ? 'left' : 'right'}`}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm underline"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* 🖼 Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="SADARADAN Logo"
            width={280}
            height={120}
            priority
          />
        </div>

        {/* 🌍 Social Options */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            <LogIn size={18} /> {t('google')}
          </button>

          <button
            type="button"
            onClick={handleApple}
            className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            <Apple size={18} /> {t('apple')}
          </button>

          <button
            type="button"
            onClick={handleOtp}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <Smartphone size={18} /> {t('otp')}
          </button>
        </div>

        {/* 📝 Registration Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-4 border dark:border-gray-700"
        >
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            {t('title')}
          </h1>

          <input
            name="firstName"
            type="text"
            placeholder={t('firstName')}
            value={form.firstName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder={t('lastName')}
            value={form.lastName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="email"
            type="email"
            placeholder={t('email')}
            value={form.email}
            onChange={handleChange}
            className={`input input-bordered w-full ${locale === 'ar' ? 'text-right' : 'text-left'}`}
            dir="ltr"
          />
          <input
            name="mobile"
            type="tel"
            placeholder={t('mobile')}
            value={form.mobile}
            onChange={handleChange}
            className={`input input-bordered w-full ${locale === 'ar' ? 'text-right' : 'text-left'}`}
            dir="ltr"
          />

          <input
            name="password"
            type="password"
            placeholder={t('password')}
            value={form.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder={t('confirmPassword')}
            value={form.confirmPassword}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>{t('passwordRules')}</p>
            <ul className="list-disc ml-5 text-xs">
              <li>{t('rule1')}</li>
              <li>{t('rule2')}</li>
              <li>{t('rule3')}</li>
              <li>{t('rule4')}</li>
            </ul>
          </div>

          <ReCAPTCHA
            sitekey="6Lc7AxorAAAAAG5D8eotm5d-RJTo6o9YhkMog8Kz"
            onChange={handleRecaptcha}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white font-semibold rounded-lg shadow-md transition duration-300"
            style={{ backgroundColor: '#C8A165' }}
          >
            {loading ? t('loading') : t('submit')}
          </button>
        </form>
      </div>

      {/* 📜 Footer */}
      <footer className="mt-10 px-6 py-4 w-full max-w-6xl text-gray-600 dark:text-gray-300 text-xs">
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


          <p className="text-2xl font-semibold text-right">
            sadaradan.com 2025 ©
          </p>
        </div>
      </footer>
    </div>
  );
}
