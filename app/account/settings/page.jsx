'use client';

import { useState } from 'react';
import {
  FaLock,
  FaBell,
  FaLanguage,
  FaPalette,
  FaShieldAlt,
  FaGlobe,
  FaEnvelope,
  FaSms,
  FaMoon,
  FaSun,
  FaCheckCircle,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaKey
} from 'react-icons/fa';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('security'); // security, notifications, appearance, privacy
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password Form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailPromotions: true,
    emailUpdates: true,
    emailReminders: true,
    smsAlerts: false,
    pushMessages: true,
    courseComplete: true,
    newCourse: false,
    forumReplies: true
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'light', // light, dark, system
    fontSize: 'medium', // small, medium, large
    reducedMotion: false
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showPhone: false,
    showActivity: true,
    acceptTerms: true,
    acceptNewsletter: true
  });

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('رمز عبور جدید و تکرار آن مطابقت ندارد');
      return;
    }
    setSuccessMessage('رمز عبور با موفقیت تغییر کرد');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleNotificationChange = (key) => {
    setNotificationSettings({ ...notificationSettings, [key]: !notificationSettings[key] });
    setSuccessMessage('تنظیمات اعلان‌ها ذخیره شد');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleAppearanceChange = (key, value) => {
    setAppearance({ ...appearance, [key]: value });
    setSuccessMessage('تنظیمات ظاهری ذخیره شد');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handlePrivacyChange = (key) => {
    setPrivacy({ ...privacy, [key]: !privacy[key] });
    setSuccessMessage('تنظیمات حریم خصوصی ذخیره شد');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const tabs = [
    { id: 'security', label: 'امنیت', icon: FaShieldAlt },
    { id: 'notifications', label: 'اعلان‌ها', icon: FaBell },
    { id: 'appearance', label: 'ظاهر', icon: FaPalette },
    { id: 'privacy', label: 'حریم خصوصی', icon: FaLock }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">تنظیمات حساب</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">مدیریت تنظیمات امنیتی، اعلان‌ها و ظاهر</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-3 rounded-xl flex items-center gap-2 animate-fade-in">
          <FaCheckCircle className="h-5 w-5" />
          {successMessage}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Security Tab - تغییر رمز عبور */}
          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaKey className="h-5 w-5 text-indigo-600" />
                تغییر رمز عبور
              </h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رمز عبور فعلی</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رمز عبور جدید</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showNewPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">تکرار رمز عبور جدید</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition flex items-center gap-2"
                >
                  <FaSave className="h-4 w-4" />
                  تغییر رمز عبور
                </button>
              </form>

              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">نکات امنیتی:</h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-500 space-y-1 list-disc list-inside">
                  <li>رمز عبور خود را هر ۳ ماه یکبار تغییر دهید</li>
                  <li>از رمزهای عبور تکراری برای سرویس‌های مختلف استفاده نکنید</li>
                  <li>رمز عبور قوی شامل حروف بزرگ، کوچک، عدد و نماد باشد</li>
                </ul>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaBell className="h-5 w-5 text-indigo-600" />
                تنظیمات اعلان‌ها
              </h3>
              
              <div className="space-y-4">
                <div className="border-b dark:border-gray-700 pb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FaEnvelope className="h-4 w-4" />
                    اعلان‌های ایمیل
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-600 dark:text-gray-400">ارسال پیشنهادات و تخفیف‌ها</span>
                      <div
                        onClick={() => handleNotificationChange('emailPromotions')}
                        className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.emailPromotions ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationSettings.emailPromotions ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-600 dark:text-gray-400">به‌روزرسانی‌های حساب</span>
                      <div
                        onClick={() => handleNotificationChange('emailUpdates')}
                        className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.emailUpdates ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationSettings.emailUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-600 dark:text-gray-400">یادآوری دوره‌ها</span>
                      <div
                        onClick={() => handleNotificationChange('emailReminders')}
                        className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.emailReminders ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationSettings.emailReminders ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="border-b dark:border-gray-700 pb-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FaSms className="h-4 w-4" />
                    اعلان‌های پیامکی
                  </h4>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-600 dark:text-gray-400">دریافت هشدارهای مهم از طریق پیامک</span>
                    <div
                      onClick={() => handleNotificationChange('smsAlerts')}
                      className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.smsAlerts ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationSettings.smsAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <FaGlobe className="h-4 w-4" />
                    اعلان‌های درون برنامه‌ای
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-600 dark:text-gray-400">تکمیل دوره</span>
                      <div
                        onClick={() => handleNotificationChange('courseComplete')}
                        className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.courseComplete ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationSettings.courseComplete ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-600 dark:text-gray-400">دوره جدید منتشر شد</span>
                      <div
                        onClick={() => handleNotificationChange('newCourse')}
                        className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.newCourse ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationSettings.newCourse ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-gray-600 dark:text-gray-400">پاسخ به نظرات</span>
                      <div
                        onClick={() => handleNotificationChange('forumReplies')}
                        className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.forumReplies ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notificationSettings.forumReplies ? 'translate-x-6' : 'translate-x-1'}`} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaPalette className="h-5 w-5 text-indigo-600" />
                تنظیمات ظاهری
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">تم سایت</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleAppearanceChange('theme', 'light')}
                      className={`p-3 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                        appearance.theme === 'light' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <FaSun className="h-6 w-6 text-yellow-500" />
                      <span className="text-sm">روشن</span>
                    </button>
                    <button
                      onClick={() => handleAppearanceChange('theme', 'dark')}
                      className={`p-3 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                        appearance.theme === 'dark' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <FaMoon className="h-6 w-6 text-indigo-500" />
                      <span className="text-sm">تاریک</span>
                    </button>
                    <button
                      onClick={() => handleAppearanceChange('theme', 'system')}
                      className={`p-3 rounded-xl border-2 transition flex flex-col items-center gap-2 ${
                        appearance.theme === 'system' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <FaGlobe className="h-6 w-6 text-gray-500" />
                      <span className="text-sm">سیستم</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">اندازه فونت</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAppearanceChange('fontSize', 'small')}
                      className={`px-4 py-2 rounded-lg transition ${
                        appearance.fontSize === 'small' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'
                      }`}
                    >
                      کوچک
                    </button>
                    <button
                      onClick={() => handleAppearanceChange('fontSize', 'medium')}
                      className={`px-4 py-2 rounded-lg transition ${
                        appearance.fontSize === 'medium' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'
                      }`}
                    >
                      متوسط
                    </button>
                    <button
                      onClick={() => handleAppearanceChange('fontSize', 'large')}
                      className={`px-4 py-2 rounded-lg transition ${
                        appearance.fontSize === 'large' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700'
                      }`}
                    >
                      بزرگ
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">کاهش انیمیشن‌ها</span>
                      <p className="text-xs text-gray-500">برای تجربه کاربری بهتر در صورت حساسیت به حرکت</p>
                    </div>
                    <div
                      onClick={() => handleAppearanceChange('reducedMotion', !appearance.reducedMotion)}
                      className={`w-12 h-6 rounded-full transition-colors ${appearance.reducedMotion ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${appearance.reducedMotion ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaLock className="h-5 w-5 text-indigo-600" />
                حریم خصوصی
              </h3>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">نمایش ایمیل در پروفایل عمومی</span>
                      <p className="text-xs text-gray-500">ایمیل شما برای سایر کاربران قابل مشاهده باشد</p>
                    </div>
                    <div
                      onClick={() => handlePrivacyChange('showEmail')}
                      className={`w-12 h-6 rounded-full transition-colors ${privacy.showEmail ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${privacy.showEmail ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">نمایش تلفن در پروفایل عمومی</span>
                      <p className="text-xs text-gray-500">تلفن شما برای سایر کاربران قابل مشاهده باشد</p>
                    </div>
                    <div
                      onClick={() => handlePrivacyChange('showPhone')}
                      className={`w-12 h-6 rounded-full transition-colors ${privacy.showPhone ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${privacy.showPhone ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">نمایش فعالیت‌ها</span>
                      <p className="text-xs text-gray-500">فعالیت‌های شما در سایت برای دیگران قابل مشاهده باشد</p>
                    </div>
                    <div
                      onClick={() => handlePrivacyChange('showActivity')}
                      className={`w-12 h-6 rounded-full transition-colors ${privacy.showActivity ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${privacy.showActivity ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">قبول شرایط و قوانین</span>
                      <p className="text-xs text-gray-500">با این گزینه شرایط و قوانین سایت را می‌پذیرید</p>
                    </div>
                    <div
                      onClick={() => handlePrivacyChange('acceptTerms')}
                      className={`w-12 h-6 rounded-full transition-colors ${privacy.acceptTerms ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform ${privacy.acceptTerms ? 'translate-x-6' : 'translate-x-1'}`} />
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl mt-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">اطلاعات حریم خصوصی:</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-500">
                    اطلاعات شما نزد ما محفوظ است و هرگز به شخص ثالثی فروخته نمی‌شود. شما می‌توانید در هر زمان درخواست حذف اطلاعات خود را بدهید.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-red-800 dark:text-red-400 text-lg">حذف حساب کاربری</h3>
            <p className="text-sm text-red-700 dark:text-red-500 mt-1">
              با حذف حساب کاربری، تمام اطلاعات شما از سرور حذف خواهد شد و قابل بازگشت نیست.
            </p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold transition">
            درخواست حذف حساب
          </button>
        </div>
      </div>
    </div>
  );
}