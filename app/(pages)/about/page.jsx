import Link from 'next/link';
import { FaCheckCircle, FaUsers, FaTrophy, FaRegClock, FaHeart, FaLightbulb, FaRocket, FaAward } from 'react-icons/fa';

export default function AboutPage() {
  const stats = [
    { icon: FaUsers, value: '۵,۰۰۰+', label: 'دانشجوی فعال' },
    { icon: FaTrophy, value: '۲۰۰+', label: 'دوره تخصصی' },
    { icon: FaRegClock, value: '۵۰,۰۰۰+', label: 'ساعت آموزش' },
    { icon: FaAward, value: '۹۸٪', label: 'رضایت دانشجویان' },
  ];

  const values = [
    { icon: FaHeart, title: 'کیفیت اولویت اول', desc: 'ما به دنبال ارائه بالاترین کیفیت آموزشی هستیم.' },
    { icon: FaLightbulb, title: 'نوآوری مستمر', desc: 'همیشه به روزترین متدهای آموزشی را ارائه می‌دهیم.' },
    { icon: FaRocket, title: 'پیشرفت دانشجویان', desc: 'موفقیت شما، هدف اصلی ماست.' },
  ];

  const team = [
    { name: 'دکتر سارا حسینی', role: 'موسس و مدیر ارشد', bio: 'دکتری مهندسی کامپیوتر از دانشگاه تهران، بیش از ۱۵ سال سابقه تدریس.', imagePlaceholder: 'bg-indigo-200' },
    { name: 'مهندس علی محمدی', role: 'مدیر فنی', bio: 'متخصص هوش مصنوعی و بک‌اند، همکار سابق گوگل.', imagePlaceholder: 'bg-blue-200' },
    { name: 'مریم کریمی', role: 'مدیر طراحی', bio: 'طراح ارشد UI/UX با ۱۰ سال تجربه بین‌المللی.', imagePlaceholder: 'bg-purple-200' },
    { name: 'رضا نوری', role: 'مدیر بازاریابی', bio: 'کارشناس ارشد بازاریابی دیجیتال و مشاور کسب‌وکار.', imagePlaceholder: 'bg-green-200' },
  ];

  return (
    <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">درباره آکادمی‌آنلاین</h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto animate-slide-up">
            ما به دنبال تحول در آموزش آنلاین و توانمندسازی هزاران متخصص هستیم.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-5">داستان ما</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                آکادمی‌آنلاین در سال ۱۳۹۸ با هدف دسترسی آسان و عادلانه به آموزش‌های باکیفیت تأسیس شد. امروز با بیش از ۵۰۰۰ دانشجو و ۲۰۰ دوره تخصصی، یکی از بزرگترین پلتفرم‌های آموزشی ایران هستیم.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                تیم ما متشکل از اساتید مجرب دانشگاه و متخصصان صنعت است تا محتوایی کاملاً عملی و به‌روز ارائه دهد. ما به کیفیت، پشتیبانی و موفقیت شما عشق می‌ورزیم.
              </p>
              <div className="flex items-center gap-3 text-indigo-600">
                <FaCheckCircle className="h-5 w-5" />
                <span className="font-semibold">بیش از ۹۸٪ دانشجویان ما دوره را توصیه می‌کنند</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* <Image src="/images/about/story.jpg" alt="داستان ما" width={600} height={400} className="w-full h-auto" /> */}
              <div className="w-full h-80 bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center text-gray-500 rounded-2xl">
                [تصویر داستان ما]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-600 transition-colors">
                  <stat.icon className="h-10 w-10 text-indigo-600 group-hover:text-white transition" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-gray-800">{stat.value}</div>
                <div className="text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <FaRocket className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">چشم‌انداز</h3>
              <p className="text-gray-600 leading-relaxed">
                تبدیل شدن به بزرگترین مرجع آموزش آنلاین در خاورمیانه و ایجاد بستری برای یادگیری مادام‌العمر.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <FaHeart className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">رسالت</h3>
              <p className="text-gray-600 leading-relaxed">
                توانمندسازی افراد با آموزش‌های کاربردی، به‌روز و با کیفیت، و کمک به رشد شغلی آن‌ها.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ارزش‌های ما</h2>
            <p className="text-gray-600">اصولی که مسیر ما را مشخص می‌کند</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl text-center hover:shadow-md transition">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">تیم رهبری</h2>
            <p className="text-gray-600">متخصصانی که به شما کمک می‌کنند</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition">
                <div className={`w-32 h-32 mx-auto rounded-full ${member.imagePlaceholder} flex items-center justify-center mb-4`}>
                  {/* <Image src={member.image} alt={member.name} width={128} height={128} className="rounded-full" /> */}
                  <span className="text-gray-500 text-xs">[عکس]</span>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-indigo-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}