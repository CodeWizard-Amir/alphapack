'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaShoppingBag,
  FaEye,
  FaDownload,
  FaPrint,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaSearch,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTruck,
  FaCreditCard
} from 'react-icons/fa';

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // داده‌های سفارشات
  const orders = [
    {
      id: 'ORD-1001',
      date: '۱۴۰۳/۰۱/۲۰',
      time: '۱۴:۳۰',
      status: 'delivered',
      statusText: 'تحویل شده',
      statusColor: 'text-green-600 bg-green-100',
      total: '۲,۴۵۰,۰۰۰',
      paymentMethod: 'کارت اعتباری',
      trackingCode: 'TRK-123456',
      items: [
        { id: 1, title: 'دوره جامع React و Next.js', price: '۲,۴۵۰,۰۰۰', quantity: 1, image: null }
      ]
    },
    {
      id: 'ORD-1002',
      date: '۱۴۰۳/۰۲/۰۱',
      time: '۱۱:۱۵',
      status: 'delivered',
      statusText: 'تحویل شده',
      statusColor: 'text-green-600 bg-green-100',
      total: '۲,۸۵۰,۰۰۰',
      paymentMethod: 'کارت اعتباری',
      trackingCode: 'TRK-123457',
      items: [
        { id: 2, title: 'دوره هوش مصنوعی با پایتون', price: '۲,۸۵۰,۰۰۰', quantity: 1, image: null }
      ]
    },
    {
      id: 'ORD-1003',
      date: '۱۴۰۳/۰۲/۱۵',
      time: '۱۶:۲۰',
      status: 'pending',
      statusText: 'در انتظار پرداخت',
      statusColor: 'text-yellow-600 bg-yellow-100',
      total: '۳,۹۵۰,۰۰۰',
      paymentMethod: 'کارت اعتباری',
      trackingCode: null,
      items: [
        { id: 3, title: 'دوره امنیت سایبری و تست نفوذ', price: '۳,۹۵۰,۰۰۰', quantity: 1, image: null }
      ]
    },
    {
      id: 'ORD-1004',
      date: '۱۴۰۳/۰۲/۱۰',
      time: '۰۹:۴۵',
      status: 'cancelled',
      statusText: 'لغو شده',
      statusColor: 'text-red-600 bg-red-100',
      total: '۲,۷۵۰,۰۰۰',
      paymentMethod: 'کارت اعتباری',
      trackingCode: null,
      items: [
        { id: 4, title: 'دوره MikroTik', price: '۲,۷۵۰,۰۰۰', quantity: 1, image: null }
      ]
    },
    {
      id: 'ORD-1005',
      date: '۱۴۰۳/۰۲/۰۵',
      time: '۱۳:۰۰',
      status: 'processing',
      statusText: 'در حال پردازش',
      statusColor: 'text-blue-600 bg-blue-100',
      total: '۳,۲۵۰,۰۰۰',
      paymentMethod: 'کارت اعتباری',
      trackingCode: 'TRK-123458',
      items: [
        { id: 5, title: 'دوره جامع CCNA', price: '۳,۲۵۰,۰۰۰', quantity: 1, image: null }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <FaCheckCircle className="h-4 w-4" />;
      case 'pending': return <FaClock className="h-4 w-4" />;
      case 'cancelled': return <FaTimesCircle className="h-4 w-4" />;
      case 'processing': return <FaTruck className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    if (searchTerm && !order.id.includes(searchTerm)) return false;
    return true;
  });

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    pending: orders.filter(o => o.status === 'pending').length,
    totalSpent: orders.reduce((sum, o) => sum + parseInt(o.total.replace(/,/g, '')), 0).toLocaleString()
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">سفارشات من</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">مشاهده و پیگیری وضعیت سفارشات شما</p>
        </div>
        <Link
          href="/courses"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition shadow-md"
        >
          <FaShoppingBag className="h-4 w-4" />
          خرید مجدد
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">کل سفارشات</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
            </div>
            <FaShoppingBag className="h-8 w-8 text-indigo-400" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">تحویل شده</p>
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
            </div>
            <FaCheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">در انتظار</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <FaClock className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">مجموع خرید</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalSpent} تومان</p>
            </div>
            <FaCreditCard className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی سفارش (شماره سفارش)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-11 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filterStatus === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200'
              }`}
            >
              همه سفارشات
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filterStatus === 'processing'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200'
              }`}
            >
              در حال پردازش
            </button>
            <button
              onClick={() => setFilterStatus('delivered')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filterStatus === 'delivered'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200'
              }`}
            >
              تحویل شده
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filterStatus === 'pending'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200'
              }`}
            >
              در انتظار
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
            {/* Order Header */}
            <div className="p-5 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-sm text-gray-500">شماره سفارش:</span>
                  <span className="font-bold text-gray-800 dark:text-white mr-2">{order.id}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-gray-500">{order.date} - {order.time}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${order.statusColor}`}>
                    {getStatusIcon(order.status)}
                    {order.statusText}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex flex-wrap gap-4 items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl flex items-center justify-center">
                    <FaShoppingBag className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-white">{item.title}</h4>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                      <span>تعداد: {item.quantity}</span>
                      <span>قیمت: {item.price} تومان</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-indigo-600">{(item.price * item.quantity).toLocaleString()} تومان</p>
                  </div>
                </div>
              ))}

              {/* Order Footer */}
              <div className="mt-4 pt-4 border-t dark:border-gray-700 flex flex-wrap justify-between items-center gap-3">
                <div>
                  <span className="text-sm text-gray-500">روش پرداخت: </span>
                  <span className="text-sm font-medium">{order.paymentMethod}</span>
                  {order.trackingCode && (
                    <>
                      <span className="text-sm text-gray-500 mr-3">کد رهگیری: </span>
                      <span className="text-sm font-mono">{order.trackingCode}</span>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition flex items-center gap-1 text-sm">
                    <FaEye className="h-4 w-4" />
                    جزئیات
                  </button>
                  <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition flex items-center gap-1 text-sm">
                    <FaPrint className="h-4 w-4" />
                    چاپ
                  </button>
                  {order.status === 'delivered' && (
                    <button className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition flex items-center gap-1 text-sm">
                      <FaStar className="h-4 w-4" />
                    ثبت نظر
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm text-center py-12">
            <FaShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">سفارشی یافت نشد</h3>
            <p className="text-gray-500 mt-2">شما هنوز سفارشی ثبت نکرده‌اید</p>
            <Link href="/courses" className="inline-block mt-4 text-indigo-600 hover:underline">
              شروع خرید
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}