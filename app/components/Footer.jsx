import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBookOpen } from 'react-icons/fa';

export default function Footer() {
  const quickLinks = [
    { name: 'دوره‌های آموزشی', href: '/courses' },
    { name: 'درباره ما', href: '/about' },
    { name: 'تماس با ما', href: '/contact' },
    { name: 'قوانین و مقررات', href: '/terms' },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: '#', color: 'hover:text-sky-500' },
    { icon: FaInstagram, href: '#', color: 'hover:text-pink-500' },
    { icon: FaLinkedin, href: '#', color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaBookOpen className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold">آکادمی‌آنلاین</span>
            </div>
            <p className="text-gray-400 mb-5 leading-relaxed">
              بزرگترین پلتفرم آموزش آنلاین با بیش از ۵۰۰۰ دانشجو و ۲۰۰ دوره تخصصی در حوزه برنامه‌نویسی، طراحی و بازاریابی دیجیتال.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={`text-gray-400 transition-all duration-300 ${social.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-5">لینک‌های سریع</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-5">ارتباط با ما</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <FaMapMarkerAlt className="h-5 w-5 flex-shrink-0" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaPhone className="h-5 w-5 flex-shrink-0" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="h-5 w-5 flex-shrink-0" />
                <span>info@onlineacademy.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-5">عضویت در خبرنامه</h3>
            <p className="text-gray-400 mb-4">برای دریافت تخفیف‌ها و دوره‌های جدید ایمیل خود را وارد کنید.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="ایمیل شما"
                className="px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl transition whitespace-nowrap font-medium">
                ثبت‌نام
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} آکادمی‌آنلاین. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}