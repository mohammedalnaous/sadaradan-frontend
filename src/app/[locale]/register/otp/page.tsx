'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function RegisterOtpPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    try {
      await axios.post('/auth/request-otp', { mobile });
      setStep('verify');
    } catch (err: any) {
      alert('Failed to send OTP: ' + err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      await axios.post('/auth/verify-otp', { mobile, code });
      router.push('/set-password'); // Or your `/register/set-password` page
    } catch (err: any) {
      alert('Invalid OTP: ' + err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">📱 Mobile Registration</h1>

      <div className="space-y-4 w-full max-w-sm">
        <input
          type="tel"
          placeholder="Enter mobile"
          className="input input-bordered w-full"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          disabled={step === 'verify'}
        />

        {step === 'verify' && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="input input-bordered w-full"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}

        <button
          className="btn btn-primary w-full"
          onClick={step === 'verify' ? handleVerify : handleRequest}
          disabled={loading}
        >
          {loading
            ? 'Processing...'
            : step === 'verify'
              ? 'Verify OTP'
              : 'Send OTP'}
        </button>
      </div>
    </div>
  );
}
