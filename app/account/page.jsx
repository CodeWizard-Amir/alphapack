'use client';

import Link from 'next/link';
import {
  FaBookOpen,
  FaShoppingBag,
  FaHeart,
  FaCommentDots,
  FaTrophy,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaPlay,
  FaStar,
  FaUserGraduate
} from 'react-icons/fa';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AccountDashboard() {
  // آمار کاربر
  const stats = [
    { title: 'دوره‌های فعال', value: '۸', icon: FaBookOpen, color: 'bg-indigo-500', link: '/account/my-courses' },
    { title: 'تکمیل شده', value: '۴', icon: FaCheckCircle, color: 'bg-green-500', link: '/account/my-courses' },
    { title: 'گواهی‌ها', value: '۴', icon: FaTrophy, color: 'bg-yellow-500', link: '/account/certificates' },
    { title: 'امتیاز', value: '۲,۴۵۰', icon: FaStar, color: 'bg-orange-500', link: '/account/points' },
  ];

  // دوره‌های در حال پیشرفت
  const ongoingCourses = [
    { id: 1, title: 'دوره جامع React و Next.js', progress: 65, lastLesson: 'قسمت ۴۲: پروژه عملی', image: null, instructor: 'دکتر سارا حسینی' },
    { id: 2, title: 'دوره هوش مصنوعی با پایتون', progress: 30, lastLesson: 'قسمت ۱۸: معرفی TensorFlow', image: null, instructor: 'مهندس علی محمدی' },
    { id: 3, title: 'دوره امنیت سایبری', progress: 80, lastLesson: 'قسمت ۵۶: تست نفوذ پیشرفته', image: null, instructor: 'مهندس امیر رضایی' },
  ];

  // سفارشات اخیر
  const recentOrders = [
    { id: '#ORD-001', course: 'دوره جامع React و Next.js', date: '۱۴۰۳/۰۱/۲۰', amount: '۲,۴۵۰,۰۰۰', status: 'پرداخت شده', statusColor: 'text-green-600 bg-green-100' },
    { id: '#ORD-002', course: 'دوره هوش مصنوعی', date: '۱۴۰۳/۰۲/۰۱', amount: '۲,۸۵۰,۰۰۰', status: 'پرداخت شده', statusColor: 'text-green-600 bg-green-100' },
    { id: '#ORD-003', course: 'دوره امنیت سایبری', date: '۱۴۰۳/۰۲/۱۵', amount: '۳,۹۵۰,۰۰۰', status: 'در انتظار', statusColor: 'text-yellow-600 bg-yellow-100' },
  ];

  // علاقه‌مندی‌ها
  const wishlist = [
    { id: 1, title: 'دوره DevOps و Docker', price: '۲,۷۵۰,۰۰۰', oldPrice: '۳,۸۰۰,۰۰۰', rating: 4.9 },
    { id: 2, title: 'دوره بلاکچین و Web3', price: '۳,۱۰۰,۰۰۰', oldPrice: '۴,۳۰۰,۰۰۰', rating: 4.8 },
  ];

  // داده نمودار پیشرفت ماهانه
  const monthlyProgress = [
    { name: 'دی', پیشرفت: 15 },
    { name: 'بهمن', پیشرفت: 28 },
    { name: 'اسفند', پیشرفت: 35 },
    { name: 'فروردین', پیشرفت: 52 },
    { name: 'اردیبهشت', پیشرفت: 68 },
    { name: 'خرداد', پیشرفت: 75 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">سلام، علی جان! 👋</h2>
            <p className="text-indigo-100 mt-1">خوش برگشتی! امروز چطور می‌خواهی پیشرفت کنی؟</p>
          </div>
          <Link
            href="/account/my-courses"
            className="bg-white/20 backdrop-blur hover:bg-white/30 px-5 py-2 rounded-xl transition flex items-center gap-2"
          >
            <FaPlay className="h-4 w-4" />
            ادامه یادگیری
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Link key={idx} href={stat.link} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl group-hover:scale-110 transition`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Progress Chart and Ongoing Courses */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">نمودار پیشرفت یادگیری</h3>
            <FaChartLine className="h-5 w-5 text-indigo-500" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyProgress}>
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="پیشرفت" stroke="#6366f1" fill="url(#progressGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">پیشرفت کلی شما: <span className="font-bold text-indigo-600">۷۵٪</span> از مسیر یادگیری</p>
          </div>
        </div>

        {/* Ongoing Courses */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">دوره‌های در حال پیشرفت</h3>
            <Link href="/account/my-courses" className="text-indigo-600 text-sm hover:underline">مشاهده همه</Link>
          </div>
          <div className="space-y-4">
            {ongoingCourses.map((course) => (
              <div key={course.id} className="group">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{course.title}</h4>
                    <p className="text-xs text-gray-500">{course.instructor}</p>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <FaClock className="h-3 w-3" />
                  آخرین بازدید: {course.lastLesson}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Wishlist */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">سفارشات اخیر</h3>
            <Link href="/account/orders" className="text-indigo-600 text-sm hover:underline">مشاهده همه</Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentOrders.map((order, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{order.course}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 dark:text-white">{order.amount} تومان</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${order.statusColor}`}>{order.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">علاقه‌مندی‌ها</h3>
            <Link href="/account/wishlist" className="text-indigo-600 text-sm hover:underline">مشاهده همه</Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {wishlist.map((item) => (
              <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      <FaStar className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400 line-through">{item.oldPrice.toLocaleString()} تومان</span>
                    <span className="text-xs font-semibold text-indigo-600">{item.price.toLocaleString()} تومان</span>
                  </div>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs transition">
                  خرید
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/courses" className="bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 p-4 rounded-2xl transition text-center group">
          <FaBookOpen className="h-6 w-6 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">دوره‌های جدید</span>
        </Link>
        <Link href="/account/wishlist" className="bg-red-50 dark:bg-red-950/30 hover:bg-red-100 p-4 rounded-2xl transition text-center group">
          <FaHeart className="h-6 w-6 text-red-500 mx-auto mb-2 group-hover:scale-110 transition" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">علاقه‌مندی‌ها</span>
        </Link>
        <Link href="/account/comments" className="bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 p-4 rounded-2xl transition text-center group">
          <FaCommentDots className="h-6 w-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">نظرات من</span>
        </Link>
        <Link href="/account/settings" className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 p-4 rounded-2xl transition text-center group">
          <FaUserGraduate className="h-6 w-6 text-gray-600 mx-auto mb-2 group-hover:scale-110 transition" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">تنظیمات</span>
        </Link>
      </div>
    </div>
  );
}