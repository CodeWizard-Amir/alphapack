'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaTelegram, FaWhatsapp, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'نام و نام خانوادگی الزامی است';
    if (!formData.email.trim()) newErrors.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'ایمیل نامعتبر است';
    if (!formData.message.trim()) newErrors.message = 'پیام الزامی است';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // در اینجا می‌توانید درخواست API ارسال کنید
    console.log('فرستاده شد:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    { icon: FaMapMarkerAlt, title: 'آدرس', info: 'تهران، خیابان ولیعصر، پلاک ۱۲۳، طبقه ۴', color: 'text-red-500', bg: 'bg-red-100' },
    { icon: FaPhone, title: 'تلفن', info: '۰۲۱-۱۲۳۴۵۶۷۸', link: 'tel:02112345678', color: 'text-blue-500', bg: 'bg-blue-100' },
    { icon: FaEnvelope, title: 'ایمیل', info: 'info@onlineacademy.com', link: 'mailto:info@onlineacademy.com', color: 'text-indigo-500', bg: 'bg-indigo-100' },
    { icon: FaClock, title: 'ساعات کاری', info: 'شنبه تا پنجشنبه ۹ صبح تا ۶ عصر', color: 'text-green-500', bg: 'bg-green-100' },
  ];

  const socials = [
    { icon: FaTelegram, name: 'تلگرام', link: 'https://t.me/onlineacademy', color: 'hover:text-blue-500' },
    { icon: FaWhatsapp, name: 'واتساپ', link: 'https://wa.me/989123456789', color: 'hover:text-green-500' },
  ];

  return (
    <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            تماس با ما
          </h1>
          <p className="text-gray-600 text-lg">ما همیشه اینجا هستیم تا به سوالات شما پاسخ دهیم</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition flex items-start gap-4">
                <div className={`${info.bg} p-3 rounded-full`}>
                  <info.icon className={`h-6 w-6 ${info.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-gray-600 text-sm hover:text-indigo-600 transition">{info.info}</a>
                  ) : (
                    <p className="text-gray-600 text-sm">{info.info}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="bg-indigo-50 p-5 rounded-2xl text-center">
              <p className="font-semibold mb-3">شبکه‌های اجتماعی ما</p>
              <div className="flex justify-center gap-4">
                {socials.map((social, idx) => (
                  <a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className={`text-gray-500 ${social.color} transition text-2xl`}>
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">ارسال پیام</h2>
              {isSubmitted && (
                <div className="mb-4 bg-green-100 text-green-700 p-3 rounded-xl flex items-center gap-2">
                  <FaCheckCircle />
                  پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none transition`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none transition`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">تلفن (اختیاری)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">موضوع</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">پیام شما *</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200 outline-none transition resize-none`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 text-lg shadow-md"
                >
                  <FaPaperPlane className="h-5 w-5" />
                  ارسال پیام
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg h-80 bg-gray-200">
          {/* <iframe src="https://www.google.com/maps/embed?..." className="w-full h-full"></iframe> */}
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">[نقشه گوگل مپ اینجا قرار گیرد]</div>
        </div>
      </div>
    </main>
  );
}