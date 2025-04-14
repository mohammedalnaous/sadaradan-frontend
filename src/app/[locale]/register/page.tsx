'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import api from '@/libs/api';

export default function RegisterPage() {
  const t = useTranslations('register');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await api.post('/auth/register', form);
      alert('Registration successful!');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">{t('title')}</h1>
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" value={form.firstName} onChange={handleChange}
            placeholder={t('firstName')} className="border p-2 rounded" />
          <input name="lastName" value={form.lastName} onChange={handleChange}
            placeholder={t('lastName')} className="border p-2 rounded" />
        </div>
        <input name="email" value={form.email} onChange={handleChange}
          placeholder={t('email')} className="border p-2 rounded w-full mt-4" />
        <input name="mobile" value={form.mobile} onChange={handleChange}
          placeholder={t('mobile')} className="border p-2 rounded w-full mt-4" />
        <input name="password" type="password" value={form.password} onChange={handleChange}
          placeholder={t('password')} className="border p-2 rounded w-full mt-4" />
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
          placeholder={t('confirmPassword')} className="border p-2 rounded w-full mt-4" />
        <button onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          {t('button')}
        </button>
      </div>
    </div>
  );
}
