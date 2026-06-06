'use client';

import { useState } from 'react';
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaCheckCircle,
  FaGraduationCap,
  FaGlobe,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaUserGraduate
} from 'react-icons/fa';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'علی رضایی',
    email: 'ali.rezaei@email.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    birthDate: '۱۳۷۵/۰۳/۱۵',
    location: 'تهران، ایران',
    bio: 'توسعه‌دهنده فرانت‌اند با ۵ سال سابقه. عاشق یادگیری تکنولوژی‌های جدید و خلق تجربه‌های کاربری عالی.',
    website: 'https://alirezaei.com',
    linkedin: 'https://linkedin.com/in/alirezaei',
    github: 'https://github.com/alirezaei',
    twitter: 'https://twitter.com/alirezaei'
  });

  const [profileImage, setProfileImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSuccessMessage('اطلاعات پروفایل با موفقیت به‌روزرسانی شد');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setShowUploadModal(false);
        setSuccessMessage('تصویر پروفایل با موفقیت آپدیت شد');
        setTimeout(() => setSuccessMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // آمار کاربر
  const stats = [
    { label: 'دوره‌های ثبت‌نامی', value: '۱۲', icon: FaGraduationCap, color: 'text-indigo-600' },
    { label: 'گواهی‌نامه‌ها', value: '۴', icon: FaCheckCircle, color: 'text-green-600' },
    { label: 'ساعت یادگیری', value: '۱۸۶', icon: FaUserGraduate, color: 'text-purple-600' },
    { label: 'نظرات ثبت شده', value: '۸', icon: FaUserCircle, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">پروفایل من</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">مشاهده و ویرایش اطلاعات شخصی</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition shadow-md ${
            isEditing
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isEditing ? <FaTimes className="h-4 w-4" /> : <FaEdit className="h-4 w-4" />}
          {isEditing ? 'انصراف' : 'ویرایش پروفایل'}
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-3 rounded-xl flex items-center gap-2 animate-fade-in">
          <FaCheckCircle className="h-5 w-5" />
          {successMessage}
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative"></div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4 group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              {profileImage ? (
                <img src={profileImage} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="h-20 w-20 text-white" />
              )}
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-full text-white shadow-md transition"
            >
              <FaCamera className="h-4 w-4" />
            </button>
          </div>

          {/* Name and Role */}
          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{formData.fullName}</h3>
              <p className="text-gray-500 dark:text-gray-400">کاربر عادی | عضو از ۱۴۰۲/۰۱/۱۵</p>
            </div>
            <div className="flex gap-2">
              <a href={formData.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a href={formData.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                <FaGithub className="h-4 w-4" />
              </a>
              <a href={formData.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-50 dark:bg-sky-900/30 text-sky-600 rounded-lg hover:bg-sky-100 transition">
                <FaTwitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-1`} />
                <p className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نام کامل</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none transition ${
                    !isEditing ? 'bg-gray-50 dark:bg-gray-800 text-gray-500' : ''
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ایمیل</label>
                <div className="relative">
                  <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pr-11 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none transition ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-800 text-gray-500' : ''
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">تلفن همراه</label>
                <div className="relative">
                  <FaPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pr-11 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none transition ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-800 text-gray-500' : ''
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">تاریخ تولد</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pr-11 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none transition ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-800 text-gray-500' : ''
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">موقعیت مکانی</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pr-11 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none transition ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-800 text-gray-500' : ''
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">وبسایت شخصی</label>
                <div className="relative">
                  <FaGlobe className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pr-11 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none transition ${
                      !isEditing ? 'bg-gray-50 dark:bg-gray-800 text-gray-500' : ''
                    }`}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">بیوگرافی</label>
                <textarea
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:border-indigo-300 outline-none transition resize-none ${
                    !isEditing ? 'bg-gray-50 dark:bg-gray-800 text-gray-500' : ''
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6 pt-4 border-t dark:border-gray-700">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition flex items-center gap-2"
                >
                  <FaSave className="h-4 w-4" />
                  ذخیره تغییرات
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-2.5 rounded-xl font-semibold transition"
                >
                  انصراف
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">آپلود تصویر پروفایل</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <div className="text-center py-6">
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <FaUserCircle className="h-20 w-20 text-gray-400" />
                )}
              </div>
              <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition">
                <FaCamera className="h-4 w-4" />
                انتخاب تصویر
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}