import Link from 'next/link';
import { FaStar, FaUsers, FaVideo, FaAward, FaShieldAlt, FaBolt, FaChartLine, FaArrowLeft, FaChevronLeft } from 'react-icons/fa';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const features = [
    { icon: FaVideo, title: 'ویدئوهای با کیفیت', desc: 'دسترسی مادام‌العمر به ویدئوهای Full HD با قابلیت دانلود' },
    { icon: FaUsers, title: 'اساتید مجرب', desc: 'یادگیری از بهترین اساتید صنعت و دانشگاه با سابقه درخشان' },
    { icon: FaAward, title: 'گواهینامه معتبر', desc: 'دریافت گواهی پایان دوره پس از قبولی در آزمون آنلاین' },
    { icon: FaShieldAlt, title: 'ضمانت بازگشت وجه', desc: 'در صورت عدم رضایت، تا ۷ روز وجه شما برگردانده می‌شود' },
    { icon: FaBolt, title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی همیشه آماده پاسخگویی به سوالات شماست' },
    { icon: FaChartLine, title: 'بازار کار', desc: 'دوره‌ها بر اساس نیاز بازار کار طراحی شده‌اند' },
  ];

  const teamMembers = [
    { name: 'دکتر سارا حسینی', role: 'مدرس ارشد برنامه‌نویسی', imagePlaceholder: 'bg-blue-100' },
    { name: 'مهندس علی محمدی', role: 'متخصص هوش مصنوعی', imagePlaceholder: 'bg-green-100' },
    { name: 'مریم کریمی', role: 'طراح UI/UX', imagePlaceholder: 'bg-purple-100' },
    { name: 'رضا نوری', role: 'کارشناس بازاریابی دیجیتال', imagePlaceholder: 'bg-yellow-100' },
  ];

  const testimonials = [
    { name: 'محمد رضایی', course: 'دوره React پیشرفته', text: 'واقعاً عالی بود! بعد از این دوره تونستم توی شرکت بزرگ استخدام بشم.', rating: 5, avatarPlaceholder: 'bg-gray-300' },
    { name: 'زهرا احمدی', course: 'دوره UI/UX', text: 'کیفیت تدریس و پشتیبانی بی‌نظیر بود. خیلی ممنون از تیم آکادمی.', rating: 5, avatarPlaceholder: 'bg-gray-300' },
    { name: 'رضا کریمی', course: 'دوره بازاریابی دیجیتال', text: 'عملی و کاربردی، دقیقاً چیزی که تو بازار کار نیاز داشتم.', rating: 5, avatarPlaceholder: 'bg-gray-300' },
  ];

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          <div className="container-custom py-20 md:py-28 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in text-center lg:text-right">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <FaBolt className="h-4 w-4" />
                  بیش از ۵۰۰۰ دانشجو فعال
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    مسیر موفقیت
                  </span>
                  <br />
                  از همین امروز شروع کن
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mt-6 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  به بزرگترین آکادمی آنلاین ایران بپیوندید. بیش از ۲۰۰ دوره تخصصی در زمینه برنامه‌نویسی، طراحی، بازاریابی و هوش مصنوعی با تدریس برترین اساتید.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-5">
                  <Link
                    href="/courses"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold transition shadow-xl hover:shadow-2xl flex items-center gap-2 text-lg"
                  >
                    مشاهده دوره‌ها
                    <FaChevronLeft className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/about"
                    className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-full font-semibold transition text-lg"
                  >
                    درباره ما
                  </Link>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-6 mt-10">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-md">
                        {/* <Image src={`/images/student-${i}.jpg`} alt="student" width={48} height={48} className="object-cover" /> */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-bold text-indigo-600 text-lg">+۵,۰۰۰</span> دانشجو فعال
                  </div>
                </div>
              </div>
              <div className="relative animate-slide-up">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition duration-500">
                  {/* <Image src="/images/hero-main.jpg" alt="hero learning" width={600} height={500} className="w-full h-auto object-cover" /> */}
                  <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center text-gray-500">
                    <span className="text-lg">[عکس اصلی هیرو اینجا قرار گیرد]</span>
                  </div>
                </div>
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-scale-up">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FaAward className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">معتبرترین آکادمی</p>
                    <p className="text-xs text-gray-500">برگزیده سال ۱۴۰۳</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">مزایای ما</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-5">چرا آکادمی‌آنلاین؟</h2>
              <p className="text-gray-600 text-lg">ما به دنبال ارائه بهترین تجربه یادگیری با بالاترین کیفیت هستیم</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="group bg-gray-50 hover:bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                    <feature.icon className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Preview */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-12 flex-wrap gap-5">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold">دوره‌های محبوب</h2>
                <p className="text-gray-600 text-lg mt-2">پرطرفدارترین دوره‌های این ماه</p>
              </div>
              <Link href="/courses" className="text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all text-lg">
                مشاهده همه
                <FaArrowLeft className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group">
                  <div className="relative h-56 bg-gray-200">
                    {/* <Image src={`/images/course-${i}.jpg`} alt="course" fill className="object-cover group-hover:scale-105 transition duration-500" /> */}
                    <div className="w-full h-full bg-gradient-to-br from-indigo-300 to-purple-300 flex items-center justify-center text-gray-700">
                      تصویر دوره {i}
                    </div>
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      تخفیف ۳۰٪
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-indigo-600 mb-3">
                      <span>برنامه‌نویسی</span>
                      <span>•</span>
                      <span>پیشرفته</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">دوره جامع React و Next.js</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">آموزش پروژه‌محور ساخت وب‌سایت‌های مدرن با نکست ۱۴ و Tailwind CSS</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <FaStar className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">۴.۹</span>
                        <span className="text-gray-500 text-sm">(۱,۲۰۳ نظر)</span>
                      </div>
                      <div>
                        <span className="text-gray-400 line-through text-sm">۳,۵۰۰,۰۰۰</span>
                        <span className="text-xl font-bold text-indigo-600 mr-2">۲,۴۵۰,۰۰۰</span>
                        <span className="text-xs">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase">اساتید باتجربه</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-5">تیم حرفه‌ای ما</h2>
              <p className="text-gray-600 text-lg">اساتید و متخصصانی که مسیر یادگیری شما را هموار می‌کنند</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="text-center group">
                  <div className={`relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden shadow-xl group-hover:scale-105 transition duration-300 ${member.imagePlaceholder}`}>
                    {/* <Image src={`/images/team-${idx+1}.jpg`} alt={member.name} fill className="object-cover" /> */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">[عکس]</div>
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-indigo-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-indigo-50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-indigo-600 font-semibold text-sm uppercase">رضایت دانشجویان</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-5">آنچه دانشجویان ما می‌گویند</h2>
              <p className="text-gray-600 text-lg">بیش از ۹۸٪ از دانشجویان ما دوره‌های آکادمی را به دیگران توصیه می‌کنند</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`relative w-14 h-14 rounded-full overflow-hidden ${testimonial.avatarPlaceholder}`}>
                      {/* <Image src={`/images/avatar-${idx+1}.jpg`} alt={testimonial.name} fill className="object-cover" /> */}
                      <div className="w-full h-full bg-gray-300"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-indigo-600">{testimonial.course}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container-custom text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white">آماده برای شروع یادگیری هستی؟</h2>
            <p className="text-indigo-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              همین الان ثبت‌نام کن و به جمع هزاران دانشجو بپیوند. تخفیف ویژه ۳۰٪ برای ۳ روز اول!
            </p>
            <Link
              href="/register"
              className="inline-block bg-white text-indigo-600 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
            >
              شروع یادگیری
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}