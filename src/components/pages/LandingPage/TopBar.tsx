'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Globe, Search, User } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import SavedSearch from './SavedSearch';

export default function TopBar() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [loginLabel, setLoginLabel] = useState('');
  const [registerLabel, setRegisterLabel] = useState('');
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('topBar');

  useEffect(() => {
    setPlaceholder(t('searchPlaceholder'));
    setCategoryLabel(t('categoryLabel'));
    setLoginLabel(t('login'));
    setRegisterLabel(t('register'));
    setMounted(true);

    // ✅ Check login status (based on your auth method)
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      fetchSavedSearches(token);
    }
  }, [t]);

  const fetchSavedSearches = async (token: string) => {
    try {
      const response = await fetch('/api/saved-searches', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.warn('⚠️ Failed to fetch saved searches:', response.status);
        return;
      }

      const data = await response.json();
      setSavedSearches(data.savedSearches || []);
    } catch (error) {
      console.error('❌ Error fetching saved searches:', error);
    }
  };

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const newPath = `/${newLocale}${pathname.replace(/^\/(en|ar)/, '')}`;
    router.push(newPath);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (!mounted || !placeholder || !categoryLabel) return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-3xl font-bold text-[#C8A165] tracking-wide underline underline-offset-4 decoration-[#C8A165]"
        >
          SADARADAN
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-4 max-w-2xl">
          <div className="flex border border-gray-300 rounded-full w-full overflow-hidden shadow-sm">
            <button className="px-4 bg-gray-100 text-sm border-r border-gray-300 text-gray-600">
              {categoryLabel} ▼
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={placeholder}
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button onClick={handleSearch} className="px-4 text-blue-600">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition"
          >
            <Globe className="mr-1" size={18} />
            {locale.toUpperCase()}
          </button>

          {/* 💖 Saved Searches (Only if logged in) */}
          {isLoggedIn && (
            <SavedSearch savedSearches={savedSearches} />
          )}

          {/* User Menu */}
          <div className="relative group">
            <User size={22} className="cursor-pointer" />
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40 p-2 opacity-0 group-hover:opacity-100 transition duration-150 pointer-events-none group-hover:pointer-events-auto">
              <Link
                href={`/${locale}/login`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {loginLabel}
              </Link>
              <Link
                href={`/${locale}/register`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {registerLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
