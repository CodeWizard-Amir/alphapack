'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaGoogle, FaGithub, FaArrowRight } from 'react-icons/fa';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' یا 'register'
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email.trim()) newErrors.email = 'ایمیل الزامی است';
    if (!loginData.password) newErrors.password = 'رمز عبور الزامی است';
    return newErrors;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!registerData.name.trim()) newErrors.name = 'نام و نام خانوادگی الزامی است';
    if (!registerData.email.trim()) newErrors.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) newErrors.email = 'ایمیل نامعتبر است';
    if (!registerData.password) newErrors.password = 'رمز عبور الزامی است';
    else if (registerData.password.length < 6) newErrors.password = 'رمز عبور حداقل ۶ کاراکتر باشد';
    if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = 'رمز عبور مطابقت ندارد';
    return newErrors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateLogin();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('ورود:', loginData);
    // درخواست API ارسال شود
    alert('ورود موفقیت‌آمیز (دمو)');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateRegister();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('ثبت‌نام:', registerData);
    alert('ثبت‌نام موفقیت‌آمیز (دمو)');
  };

  return (
    <main className="pt-20 mx-auto! md:pt-24 pb-16 w-[90%] lg:w-1/3! flex items-center justify-center">
      <div className="w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => { setActiveTab('login'); setErrors({}); }}
              className={`flex-1 py-4 text-center font-bold text-lg transition relative ${
                activeTab === 'login'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ورود
            </button>
            <button
              onClick={() => { setActiveTab('register'); setErrors({}); }}
              className={`flex-1 py-4 text-center font-bold text-lg transition relative ${
                activeTab === 'register'
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ثبت‌نام
            </button>
          </div>

          <div className="p-6 md:p-8">
            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                  <div className="relative">
                    <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
                  <div className="relative">
                    <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="********"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div className="flex justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" /> مرا به خاطر بسپار
                  </label>
                  <Link href="/forgot-password" className="text-indigo-600 hover:underline">فراموشی رمز عبور؟</Link>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition shadow-md flex items-center justify-center gap-2"
                >
                  ورود <FaArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                  <div className="relative">
                    <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="علی رضایی"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                  <div className="relative">
                    <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تلفن (اختیاری)</label>
                  <div className="relative">
                    <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={registerData.phone}
                      onChange={handleRegisterChange}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
                  <div className="relative">
                    <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="حداقل ۶ کاراکتر"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور</label>
                  <div className="relative">
                    <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition shadow-md flex items-center justify-center gap-2"
                >
                  ثبت‌نام <FaArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">یا</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-2.5 rounded-xl transition">
                <FaGoogle className="text-red-500 h-5 w-5" />
                <span>ادامه با Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-2.5 rounded-xl transition">
                <FaGithub className="text-gray-800 h-5 w-5" />
                <span>ادامه با GitHub</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-xs mt-6">
          با ثبت‌نام، شرایط و قوانین سایت را می‌پذیرید.
        </p>
      </div>
    </main>
  );
}