'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from '@/lib/axios';
import ReCAPTCHA from 'react-google-recaptcha';

interface JwtPayload {
  role: string;
  email: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!recaptchaToken) {
      setErrorMsg('⚠️ Please complete the reCAPTCHA');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
        recaptchaToken,
      });

      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);

      const decoded = jwtDecode<JwtPayload>(accessToken);
      const role = decoded.role;

      if (role === 'master' || role === 'admin') {
        router.push('/');
      } else {
        router.push('/user/home'); // Update this with your actual user dashboard
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || '❌ Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Welcome to SADARADAN
        </h1>

        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ReCAPTCHA
            sitekey="6Lc7AxorAAAAAG5D8eotm5d-RJTo6o9YhkMog8Kz"
            onChange={(token) => setRecaptchaToken(token || '')}
          />

          <button
            disabled={loading}
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
