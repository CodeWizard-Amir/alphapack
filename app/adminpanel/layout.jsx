'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaBookOpen,
  FaUsers,
  FaShoppingCart,
  FaCommentDots,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaChartLine,
  FaMoon,
  FaSun
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  // مدیریت ریسپانسیو سایدبار
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const menuItems = [
    { name: 'داشبورد', href: '/admin', icon: FaTachometerAlt, color: 'text-indigo-500' },
    { name: 'دوره‌ها', href: '/admin/courses', icon: FaBookOpen, color: 'text-blue-500' },
    { name: 'کاربران', href: '/admin/users', icon: FaUsers, color: 'text-green-500' },
    { name: 'سفارشات', href: '/admin/orders', icon: FaShoppingCart, color: 'text-orange-500' },
    { name: 'نظرات', href: '/admin/comments', icon: FaCommentDots, color: 'text-purple-500' },
    { name: 'آمار', href: '/admin/analytics', icon: FaChartLine, color: 'text-cyan-500' },
    { name: 'تنظیمات', href: '/admin/settings', icon: FaCog, color: 'text-gray-500' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* لوگو */}
      <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">آ</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            پنل مدیریت
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>

      {/* منو */}
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : item.color} group-hover:scale-110 transition`} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="mr-auto w-1.5 h-8 bg-indigo-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t dark:border-gray-700">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <FaSignOutAlt className="h-5 w-5 text-red-500" />
          <span className="font-medium">خروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* سایدبار دسکتاپ */}
      <aside
        className={`fixed top-0 right-0 h-full z-30 transition-all duration-300 shadow-xl ${
          isSidebarOpen ? 'w-72' : 'w-0 lg:w-20'
        } overflow-hidden bg-white dark:bg-gray-900`}
      >
        {isSidebarOpen ? (
          <SidebarContent />
        ) : (
          <div className="flex flex-col items-center py-5 h-full">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white font-bold text-lg">آ</span>
            </div>
            <div className="space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-center w-12 h-12 rounded-xl transition ${
                    pathname === item.href
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <button className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition">
                <FaSignOutAlt className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* هدر اصلی */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 ${
          isSidebarOpen ? 'lg:mr-72' : 'lg:mr-20'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <FaBars className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:block">
              {menuItems.find(item => item.href === pathname)?.name || 'داشبورد'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* دکمه dark mode */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isDarkMode ? <FaSun className="h-5 w-5 text-yellow-500" /> : <FaMoon className="h-5 w-5 text-gray-600" />}
            </button>

            {/* اعلان‌ها */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <FaBell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* منوی کاربر */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <FaUserCircle className="h-6 w-6 text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">مدیر سایت</span>
                <FaChevronDown className="h-3 w-3 text-gray-500 hidden md:block" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                  <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 z-20 overflow-hidden">
                    <div className="p-3 border-b dark:border-gray-700">
                      <p className="font-semibold text-gray-800 dark:text-white">مدیر سایت</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">admin@onlineacademy.com</p>
                    </div>
                    <div className="py-2">
                      <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <FaUserCircle className="h-4 w-4" /> پروفایل
                      </Link>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                        <FaSignOutAlt className="h-4 w-4" /> خروج
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* محتوای اصلی */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? 'lg:mr-72' : 'lg:mr-20'
        }`}
      >
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>

      {/* منوی موبایل (اورلی) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl animate-slide-in-right">
            <SidebarContent onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}