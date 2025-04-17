'use client';

import React from 'react';

export interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

export default function LogoutModal({
  isOpen,
  onCancel,
  onConfirm,
  message,
}: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm shadow-lg">
        {/* ✅ Here's the message */}
        <p className="text-gray-800 dark:text-white text-center mb-6">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#C8A165] hover:bg-[#b3884e] text-white font-medium py-1 px-4 rounded"
            >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
