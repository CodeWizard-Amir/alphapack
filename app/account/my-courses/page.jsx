'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FaBookOpen,
  FaPlay,
  FaClock,
  FaUserGraduate,
  FaStar,
  FaChartLine,
  FaCheckCircle,
  FaTrophy,
  FaDownload,
  FaEye,
  FaCalendarAlt,
  FaVideo,
  FaRegClock
} from 'react-icons/fa';

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState('all'); // all, in-progress, completed

  // داده‌های دوره‌های کاربر
  const courses = [
    {
      id: 1,
      title: 'دوره جامع React و Next.js',
      slug: 'react-nextjs-complete',
      image: null,
      instructor: 'دکتر سارا حسینی',
      category: 'برنامه‌نویسی',
      progress: 65,
      lastWatched: 'قسمت ۴۲: پروژه عملی فروشگاه',
      totalHours: 42,
      watchedHours: 27,
      certificate: false,
      rating: 4.9,
      status: 'in-progress',
      enrolledAt: '۱۴۰۳/۰۱/۲۰',
      lastAccess: '۱۴۰۳/۰۲/۱۵'
    },
    {
      id: 2,
      title: 'دوره هوش مصنوعی با پایتون',
      slug: 'python-ai',
      image: null,
      instructor: 'مهندس علی محمدی',
      category: 'هوش مصنوعی',
      progress: 30,
      lastWatched: 'قسمت ۱۸: معرفی TensorFlow',
      totalHours: 38,
      watchedHours: 11,
      certificate: false,
      rating: 4.8,
      status: 'in-progress',
      enrolledAt: '۱۴۰۳/۰۲/۰۱',
      lastAccess: '۱۴۰۳/۰۲/۱۴'
    },
    {
      id: 3,
      title: 'دوره امنیت سایبری و تست نفوذ',
      slug: 'ethical-hacking-complete',
      image: null,
      instructor: 'مهندس امیر رضایی',
      category: 'امنیت',
      progress: 80,
      lastWatched: 'قسمت ۵۶: تست نفوذ پیشرفته',
      totalHours: 60,
      watchedHours: 48,
      certificate: true,
      certificateUrl: '/certificates/3',
      rating: 4.9,
      status: 'completed',
      enrolledAt: '۱۴۰۲/۱۲/۱۰',
      lastAccess: '۱۴۰۳/۰۲/۱۰',
      completedAt: '۱۴۰۳/۰۲/۰۵'
    },
    {
      id: 4,
      title: 'دوره جامع شبکه و CCNA',
      slug: 'ccna-network-complete',
      image: null,
      instructor: 'دکتر محمد کرمی',
      category: 'شبکه',
      progress: 100,
      lastWatched: 'تکمیل شده',
      totalHours: 55,
      watchedHours: 55,
      certificate: true,
      certificateUrl: '/certificates/4',
      rating: 4.8,
      status: 'completed',
      enrolledAt: '۱۴۰۲/۱۱/۰۵',
      lastAccess: '۱۴۰۳/۰۲/۰۱',
      completedAt: '۱۴۰۳/۰۲/۰۱'
    },
    {
      id: 5,
      title: 'دوره جامع Flutter',
      slug: 'flutter-mobile-development',
      image: null,
      instructor: 'مهندس آرش رستمی',
      category: 'موبایل',
      progress: 15,
      lastWatched: 'قسمت ۸: معرفی Widgets',
      totalHours: 52,
      watchedHours: 8,
      certificate: false,
      rating: 4.8,
      status: 'in-progress',
      enrolledAt: '۱۴۰۳/۰۲/۱۰',
      lastAccess: '۱۴۰۳/۰۲/۱۲'
    }
  ];

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return course.status === 'in-progress';
    if (activeTab === 'completed') return course.status === 'completed';
    return true;
  });

  const stats = {
    total: courses.length,
    inProgress: courses.filter(c => c.status === 'in-progress').length,
    completed: courses.filter(c => c.status === 'completed').length,
    certificates: courses.filter(c => c.certificate).length,
    totalHours: courses.reduce((sum, c) => sum + c.watchedHours, 0),
    averageProgress: Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">دوره‌های من</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">مدیریت و پیگیری دوره‌های آموزشی شما</p>
        </div>
        <Link
          href="/courses"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition shadow-md"
        >
          <FaBookOpen className="h-4 w-4" />
          مشاهده دوره‌های جدید
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 text-center">
          <FaBookOpen className="h-5 w-5 text-indigo-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
          <p className="text-xs text-gray-500">دوره خریداری شده</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 text-center">
          <FaPlay className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.inProgress}</p>
          <p className="text-xs text-gray-500">در حال یادگیری</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 text-center">
          <FaCheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.completed}</p>
          <p className="text-xs text-gray-500">تکمیل شده</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 text-center">
          <FaTrophy className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.certificates}</p>
          <p className="text-xs text-gray-500">گواهی نامه</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 text-center">
          <FaClock className="h-5 w-5 text-purple-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.totalHours}</p>
          <p className="text-xs text-gray-500">ساعت یادگیری</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 text-center">
          <FaChartLine className="h-5 w-5 text-orange-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-800 dark:text-white">{stats.averageProgress}%</p>
          <p className="text-xs text-gray-500">میانگین پیشرفت</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
        <div className="flex border-b dark:border-gray-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === 'all'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            همه دوره‌ها ({stats.total})
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === 'in-progress'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            در حال یادگیری ({stats.inProgress})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 font-semibold transition whitespace-nowrap ${
              activeTab === 'completed'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            تکمیل شده ({stats.completed})
          </button>
        </div>

        {/* Courses List */}
        <div className="p-5 space-y-5">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="md:w-48 h-40 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center relative">
                  {/* <Image src={course.image} alt={course.title} fill className="object-cover" /> */}
                  <FaBookOpen className="h-12 w-12 text-indigo-400" />
                  {course.progress === 100 && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                      <FaCheckCircle className="h-3 w-3" />
                      تکمیل شده
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 rounded-full">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <FaStar className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">{course.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                        {course.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FaUserGraduate className="h-3 w-3" />
                          {course.instructor}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="h-3 w-3" />
                          ثبت‌نام: {course.enrolledAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaRegClock className="h-3 w-3" />
                          آخرین بازدید: {course.lastAccess}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>پیشرفت شما</span>
                          <span className="font-semibold text-indigo-600">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{course.watchedHours} از {course.totalHours} ساعت</span>
                          <span>{course.lastWatched}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {course.status === 'in-progress' && (
                        <Link
                          href={`/courses/${course.slug}`}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1"
                        >
                          <FaPlay className="h-3 w-3" />
                          ادامه یادگیری
                        </Link>
                      )}
                      {course.status === 'completed' && (
                        <>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1"
                          >
                            <FaEye className="h-3 w-3" />
                            مرور مجدد
                          </Link>
                          {course.certificate && (
                            <button className="border border-green-500 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1">
                              <FaDownload className="h-3 w-3" />
                              دریافت گواهی
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <FaBookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">دوره‌ای یافت نشد</h3>
              <p className="text-gray-500 mt-2">شما هنوز دوره‌ای در این دسته ندارید</p>
              <Link href="/courses" className="inline-block mt-4 text-indigo-600 hover:underline">
                مشاهده دوره‌ها
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}