'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaStar, FaClock, FaUserGraduate, FaBookOpen, FaChevronLeft, FaFilter } from 'react-icons/fa';
import coursesData from '../../server/course.json';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

  useEffect(() => {
    setCourses(coursesData.courses);
    setFilteredCourses(coursesData.courses);
  }, []);

  useEffect(() => {
    let filtered = courses;
    if (activeCategory !== 'all') {
      filtered = filtered.filter(course => course.category === activeCategory);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredCourses(filtered);
  }, [activeCategory, searchTerm, courses]);

  const categories = coursesData.categories;

  return (
    <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className='text-indigo-600 lg:text-6xl font-extrabold my-5 text-4xl md:text-5xl '>دوره های آموزشی</h1>
          <p className="text-gray-600  text-lg">پیشرفته‌ترین و به‌روزترین دوره‌های تخصصی با تدریس اساتید مجرب</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Box */}
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="جستجوی دوره، مدرس یا توضیحات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-2xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 transition outline-none bg-white"
              />
            </div>

            {/* Filter Button Mobile */}
            <button
              onClick={() => setIsFilterMobileOpen(!isFilterMobileOpen)}
              className="md:hidden w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-3 rounded-2xl font-medium"
            >
              <FaFilter className="h-4 w-4" />
              فیلتر دسته‌بندی
            </button>

            {/* Categories Desktop */}
            <div className="hidden md:flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 border border-gray-200'
                  }`}
                >
                  {/* آیکون‌ها به صورت داینامیک از react-icons می‌آیند، برای سادگی متن می‌گذاریم */}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Categories Mobile Dropdown */}
          {isFilterMobileOpen && (
            <div className="md:hidden mt-4 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsFilterMobileOpen(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      activeCategory === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500">
            {filteredCourses.length} دوره <span className="hidden sm:inline">آموزشی</span> یافت شد
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700">دوره‌ای یافت نشد</h3>
            <p className="text-gray-500 mt-2">لطفاً عبارت دیگری جستجو کنید یا فیلتر را تغییر دهید</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  {/* <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition duration-500" /> */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center text-gray-500 text-sm">
                    [تصویر دوره: {course.title}]
                  </div>
                  {course.badge && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {course.badge}
                    </div>
                  )}
                  {/* Level Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                    {course.level === 'beginner' && 'مقدماتی'}
                    {course.level === 'intermediate' && 'متوسط'}
                    {course.level === 'advanced' && 'پیشرفته'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-800">{course.rating}</span>
                      <span className="text-gray-400 text-sm">({course.reviews.toLocaleString()})</span>
                    </div>
                    <div className="text-sm text-gray-400 flex items-center gap-1">
                      <FaUserGraduate className="h-3 w-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-indigo-600 transition">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">مدرس: {course.instructor}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaClock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBookOpen className="h-3 w-3" />
                      <span>{course.lectures} درس</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      {course.oldPrice && (
                        <span className="text-gray-400 line-through text-sm ml-2">
                          {course.oldPrice.toLocaleString()} تومان
                        </span>
                      )}
                      <span className="text-sm font-bold text-indigo-600">
                        {course.price.toLocaleString()} تومان
                      </span>
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 justify-center py-2 rounded-full text-xs font-semibold transition flex items-center shadow-md"
                    >
                      مشاهده دوره
                      <FaChevronLeft className="h-3 mt-[1px] mx-2 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}