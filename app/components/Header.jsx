'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaShoppingCart, FaUser, FaBookOpen } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

// helper: دریافت تعداد کل آیتم‌های سبد خرید (جمع quantity ها)
const getCartTotalCount = () => {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem('cart_items');
  if (!stored) return 0;
  try {
    const cart = JSON.parse(stored);
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // تابع به‌روزرسانی تعداد از localStorage
  const updateCartCount = () => {
    setCartCount(getCartTotalCount());
  };

  useEffect(() => {
    // خواندن اولیه
    updateCartCount();

    // گوش دادن به رویداد سفارشی 'cart-updated'
    window.addEventListener('cart-updated', updateCartCount);

    // (اختیاری) در صورت تغییر در tab دیگر، از storage event استفاده کنیم
    const handleStorageChange = (e) => {
      if (e.key === 'cart_items') {
        updateCartCount();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'خانه', href: '/' },
    { name: 'دوره‌ها', href: '/courses' },
    { name: 'درباره ما', href: '/about' },
    { name: 'وبلاگ', href: '/blog' },
    { name: 'تماس با ما', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* لوگو */}
            <Link href="/" className="flex items-center gap-2">
              <FaBookOpen className="h-7 w-7 text-indigo-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                آکادمی‌آنلاین
              </span>
            </Link>

            {/* منوی دسکتاپ */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* دکمه‌ها */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <FaShoppingCart className="h-5 w-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full transition shadow-md hover:shadow-lg"
              >
                <FaUser className="h-4 w-4" />
                <span>ورود / ثبت‌نام</span>
              </Link>
            </div>

            {/* دکمه همبرگر موبایل */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="منو"
            >
              <FaBars className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navLinks={navLinks} />
    </>
  );
}