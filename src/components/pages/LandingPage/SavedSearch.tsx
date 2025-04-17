'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';

type SavedSearchProps = {
  savedSearches: string[];
  isLoggedIn: boolean;
  onGuestClick?: () => void;
};

export default function SavedSearch({
  savedSearches,
  isLoggedIn,
  onGuestClick,
}: SavedSearchProps) {
  const t = useTranslations('savedSearch');

  return (
    <div
      className="relative group"
      onClick={() => {
        if (!isLoggedIn && onGuestClick) onGuestClick();
      }}
    >
      <button
        className="flex items-center text-sm font-medium text-gray-700 hover:text-red-500 transition"
        type="button"
      >
        <Heart className="mr-1" size={18} />
        {t('title')}
      </button>

      {/* Saved Searches dropdown for logged-in users only */}
      {isLoggedIn && (
        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-64 p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50">
          {savedSearches.length > 0 ? (
            savedSearches.map((search, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {search}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500 italic">
              {t('empty')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
