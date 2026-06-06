import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';

export const metadata = {
  title: 'آکادمی آنلاین | حرفه‌ای‌ترین دوره‌های آموزشی',
  description: 'بزرگترین پلتفرم آموزش آنلاین با دوره‌های تخصصی برنامه‌نویسی، طراحی، بازاریابی و هوش مصنوعی',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}