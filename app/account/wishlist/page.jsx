'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
  FaStar,
  FaEye,
  FaRegHeart,
  FaClock,
  FaUserGraduate,
  FaBookOpen
} from 'react-icons/fa';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: 'دوره جامع DevOps و Docker و Kubernetes',
      slug: 'devops-docker-kubernetes',
      image: null,
      instructor: 'مهندس مهدی کریمی',
      category: 'DevOps',
      price: '۴,۲۵۰,۰۰۰',
      oldPrice: '۵,۹۰۰,۰۰۰',
      discount: 28,
      rating: 4.9,
      reviews: 1048,
      duration: '۶۵ ساعت',
      addedAt: '۱۴۰۳/۰۲/۱۰'
    },
    {
      id: 2,
      title: 'دوره تخصصی بلاکچین و توسعه Smart Contract',
      slug: 'blockchain-smart-contracts',
      image: null,
      instructor: 'مهندس سعید مرتضوی',
      category: 'بلاکچین',
      price: '۳,۱۰۰,۰۰۰',
      oldPrice: '۴,۳۰۰,۰۰۰',
      discount: 28,
      rating: 4.7,
      reviews: 534,
      duration: '۴۵ ساعت',
      addedAt: '۱۴۰۳/۰۲/۰۵'
    },
    {
      id: 3,
      title: 'دوره جامع هوش مصنوعی و Machine Learning',
      slug: 'ai-machine-learning-python',
      image: null,
      instructor: 'دکتر نگار محمدی',
      category: 'هوش مصنوعی',
      price: '۴,۹۵۰,۰۰۰',
      oldPrice: '۶,۹۰۰,۰۰۰',
      discount: 28,
      rating: 5.0,
      reviews: 1562,
      duration: '۷۰ ساعت',
      addedAt: '۱۴۰۳/۰۲/۰۱'
    },
    {
      id: 4,
      title: 'دوره جامع مدیریت لینوکس و LPIC',
      slug: 'linux-lpic-complete',
      image: null,
      instructor: 'مهندس حسین طاهری',
      category: 'لینوکس',
      price: '۳,۱۵۰,۰۰۰',
      oldPrice: '۴,۵۰۰,۰۰۰',
      discount: 30,
      rating: 4.8,
      reviews: 991,
      duration: '۵۸ ساعت',
      addedAt: '۱۴۰۳/۰۱/۲۵'
    }
  ]);

  const [sortBy, setSortBy] = useState('newest');

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const getSortedWishlist = () => {
    const sorted = [...wishlist];
    switch(sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
      case 'price-low':
        return sorted.sort((a, b) => parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, '')));
      case 'price-high':
        return sorted.sort((a, b) => parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, '')));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  };

  const stats = {
    total: wishlist.length,
    totalDiscount: wishlist.reduce((sum, item) => {
      const old = parseInt(item.oldPrice.replace(/,/g, ''));
      const current = parseInt(item.price.replace(/,/g, ''));
      return sum + (old - current);
    }, 0).toLocaleString(),
    avgRating: (wishlist.reduce((sum, item) => sum + item.rating, 0) / wishlist.length).toFixed(1)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">علاقه‌مندی‌ها</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">دوره‌هایی که دوست داری بعداً بخری</p>
        </div>
        <Link
          href="/courses"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition shadow-md"
        >
          <FaBookOpen className="h-4 w-4" />
          مشاهده همه دوره‌ها
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">تعداد دوره‌ها</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <FaHeart className="h-10 w-10 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">صرفه‌جویی در خرید</p>
              <p className="text-2xl font-bold">{stats.totalDiscount} تومان</p>
            </div>
            <FaShoppingCart className="h-10 w-10 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">میانگین امتیاز</p>
              <p className="text-3xl font-bold">{stats.avgRating}</p>
            </div>
            <FaStar className="h-10 w-10 opacity-80" />
          </div>
        </div>
      </div>

      {/* Sort and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">مرتب‌سازی بر اساس:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-sm"
            >
              <option value="newest">جدیدترین</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
              <option value="rating">بالاترین امتیاز</option>
            </select>
          </div>
          <button
            onClick={() => setWishlist([])}
            className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
          >
            <FaTrash className="h-3 w-3" />
            حذف همه
          </button>
        </div>
      </div>

      {/* Wishlist Items */}
      {wishlist.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-center py-16">
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaRegHeart className="h-12 w-12 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">علاقه‌مندی‌ها خالی است!</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            دوره‌هایی که دوست داری به این لیست اضافه کن تا بعداً راحت‌تر به آنها دسترسی داشته باشی.
          </p>
          <Link href="/courses" className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            مشاهده دوره‌ها
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {getSortedWishlist().map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="md:w-48 h-32 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 flex items-center justify-center relative">
                  <FaHeart className="h-10 w-10 text-red-400" />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    {item.discount}٪ تخفیف
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <FaStar className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">{item.rating}</span>
                          <span className="text-xs text-gray-400">({item.reviews.toLocaleString()})</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <FaClock className="h-3 w-3" />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <FaUserGraduate className="h-3 w-3" />
                          {item.instructor}
                        </span>
                      </div>
                      <Link href={`/courses/${item.slug}`}>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 hover:text-indigo-600 transition">
                          {item.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">{item.oldPrice} تومان</span>
                        <span className="text-xl font-bold text-indigo-600">{item.price} تومان</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">اضافه شده در {item.addedAt}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/courses/${item.slug}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1"
                      >
                        <FaShoppingCart className="h-3 w-3" />
                        خرید
                      </Link>
                      <Link
                        href={`/courses/${item.slug}`}
                        className="border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-lg text-sm transition flex items-center gap-1"
                      >
                        <FaEye className="h-3 w-3" />
                        مشاهده
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg text-sm transition flex items-center gap-1"
                      >
                        <FaTrash className="h-3 w-3" />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add to Cart All Button */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-5 text-center text-white">
            <p className="text-lg font-semibold mb-3">می‌خوای همه این دوره‌ها رو یکجا بخری؟</p>
            <button className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-2 rounded-xl font-semibold transition">
              خرید همه ({wishlist.length} دوره)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}