'use client';

import Link from 'next/link';
import { FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa';

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl animate-slide-up">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b">
            <span className="text-xl font-bold text-indigo-600">منو</span>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 py-6 px-5 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block py-2 text-gray-800 hover:text-indigo-600 transition font-medium text-lg"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t space-y-3">
              <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-full">
                <FaShoppingCart className="h-5 w-5" />
                <span>سبد خرید (۳)</span>
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-indigo-600 text-indigo-600 py-3 rounded-full">
                <FaUser className="h-5 w-5" />
                <span>ورود / ثبت‌نام</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}