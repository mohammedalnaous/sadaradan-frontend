'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Globe, Search, User, LogOut } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import SavedSearch from './SavedSearch';
import { isTokenValid, getAccessToken, clearTokens } from '@/utils/auth';
import toast from 'react-hot-toast';
import LogoutModal from '@/components/common/LogoutModal';

export default function TopBar() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [loginLabel, setLoginLabel] = useState('');
  const [registerLabel, setRegisterLabel] = useState('');
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('topBar');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    setPlaceholder(t('searchPlaceholder'));
    setCategoryLabel(t('categoryLabel'));
    setLoginLabel(t('login'));
    setRegisterLabel(t('register'));
    setMounted(true);

    const token = getAccessToken();
    if (token) fetchSavedSearches(token);
  }, [t]);

  useEffect(() => {
    setUserMenuOpen(localStorage.getItem('userMenuOpen') === 'true');
    setLangMenuOpen(localStorage.getItem('langMenuOpen') === 'true');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
        localStorage.setItem('userMenuOpen', 'false');
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
        localStorage.setItem('langMenuOpen', 'false');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    const decoded = JSON.parse(atob(token.split('.')[1]));
    const exp = decoded?.exp * 1000;
    const now = Date.now();
    const timeLeft = exp - now;

    const refreshDelay = timeLeft - 60 * 1000;
    if (refreshDelay <= 0) return;

    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/auth/refresh-token', {
          method: 'POST',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          toast.success('🔁 Session refreshed');
        } else {
          clearTokens();
          toast.error('⏰ Session expired. Please log in again.');
          router.replace(`/${locale}/login`);
        }
      } catch {
        clearTokens();
        toast.error('⚠️ Session refresh failed.');
        router.replace(`/${locale}/login`);
      }
    }, refreshDelay);

    return () => clearTimeout(timer);
  }, [locale, router]);

  const fetchSavedSearches = async (token: string) => {
    try {
      const res = await fetch('/api/saved-searches', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.warn('⚠️ Failed to fetch saved searches:', res.status);
        return;
      }

      const data = await res.json();
      setSavedSearches(data.savedSearches || []);
    } catch (error) {
      console.error('❌ Error fetching saved searches:', error);
    }
  };

  const changeLocale = (targetLocale: 'en' | 'ar') => {
    const newPath = `/${targetLocale}${pathname.replace(/^\/(en|ar)/, '')}`;
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
    router.push(newPath);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleUserMenu = () => {
    const newState = !userMenuOpen;
    setUserMenuOpen(newState);
    localStorage.setItem('userMenuOpen', String(newState));
  };

  const toggleLangMenu = () => {
    const newState = !langMenuOpen;
    setLangMenuOpen(newState);
    localStorage.setItem('langMenuOpen', String(newState));
  };

  if (!mounted || !placeholder || !categoryLabel) return null;

  return (
    <>
      {/* ✅ Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        message={t('logoutConfirm') || 'Are you sure you want to log out?'}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          logout();
        }}
      />

      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="text-3xl font-bold text-[#C8A165] tracking-wide underline underline-offset-4 decoration-[#C8A165]"
          >
            SADARADAN
          </Link>

          {/* Search */}
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
            {/* Language Switch */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={toggleLangMenu}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                <Globe className="mr-1" size={18} />
                {locale.toUpperCase()}
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white shadow-lg border rounded-md z-50">
                  <button
                    onClick={() => changeLocale('en')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLocale('ar')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

           {/* Saved Searches (click-to-redirect if not logged in) */}
<div
  onClick={() => {
    if (!isLoggedIn) {
      toast.error(t('loginToView') || 'Please log in to view saved searches');
      router.push(`/${locale}/login`);
    }
  }}
               className="cursor-pointer"
               >
              <SavedSearch savedSearches={isLoggedIn ? savedSearches : []} isLoggedIn={false} />
             </div>
             {/* User Menu */}
             <div className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="flex items-center"
                aria-label="Toggle user menu"
              >
                <User size={22} className="cursor-pointer" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40 p-2 z-50">
                  {isLoggedIn ? (
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={18} className="inline mr-1" />
                      {t('logout') || 'Logout'}
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
