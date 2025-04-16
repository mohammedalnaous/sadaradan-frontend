'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import api from '@/lib/api';
import { SubscriptionCode, UpdatePriceDto } from '@/types/subscription';
import axios, { AxiosError } from 'axios';

export default function PlanPriceForm() {
  const [plans, setPlans] = useState<SubscriptionCode[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionCode | ''>(''); // ✅ Handles unselected state safely
  const [oldPrice, setOldPrice] = useState<number | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPlans(Object.values(SubscriptionCode));
  }, []);

  const fetchOldPrice = async (code: SubscriptionCode) => {
    try {
      console.log('📥 Fetching price for:', code);
      const res = await api.get(`/admin/subscriptions/pricing/${code}`);
      setOldPrice(res.data.price);
    } catch (err) {
      console.error('❌ Error fetching price:', err);
      setOldPrice(null);
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value as SubscriptionCode;
    setSelectedPlan(code);

    if (code) {
      fetchOldPrice(code);
    } else {
      setOldPrice(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPlan || newPrice < 0) {
      setMessage('❌ Please select a plan and enter a valid price');
      return;
    }
  
    try {
      const payload: UpdatePriceDto = {
        code: selectedPlan,
        newPrice,
      };
  
      const res = await api.patch('/admin/subscriptions/pricing/update-price', payload);
      setMessage(res.data.message || '✅ Updated successfully');
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
  
      console.error('❌ Price update error:', err);
  
      if (err.response?.data?.message) {
        setMessage(`❌ ${err.response.data.message}`);
      } else {
        setMessage('❌ Failed to update the price');
      }
    }
  };
  
  

  return (
    <div className="space-y-4">
      {/* Plan Selector */}
      <div>
        <label className="block mb-1 font-medium">Select Plan</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedPlan}
          onChange={handleSelect}
        >
          <option value="">-- Select --</option>
          {plans.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {/* Old Price Display */}
      {oldPrice !== null && (
        <div>
          <p className="text-sm text-gray-600">
            Current Price: <strong>${oldPrice}</strong>
          </p>
        </div>
      )}

      {/* New Price Input */}
      <div>
        <label className="block mb-1 font-medium">New Price</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={newPrice}
          onChange={(e) => setNewPrice(Number(e.target.value) || 0)}
        />
      </div>

      {/* Submit Button */}
      <button
     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
     onClick={handleSubmit}
     disabled={!selectedPlan || newPrice < 0} // ✅ Allow 0
     >
      Update Price
      </button>

      {/* Result Message */}
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
