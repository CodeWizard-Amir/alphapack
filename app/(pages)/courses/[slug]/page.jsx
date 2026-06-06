'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaStar, FaUserGraduate, FaClock, FaBookOpen, FaCheckCircle, 
  FaPlay, FaDownload, FaExpand, FaQuestionCircle, FaUserTie,
  FaListUl, FaVideo, FaFileAlt, FaMinus, FaPlus, FaShoppingCart
} from 'react-icons/fa';
import coursesData from '../../../server/course.json';

// helper: دریافت سبد خرید از localStorage
const getCartFromStorage = () => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart_items');
  return stored ? JSON.parse(stored) : [];
};

// helper: ذخیره سبد خرید در localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem('cart_items', JSON.stringify(cart));
};

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [cardUpdated, setCardUpdated] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [progress, setProgress] = useState({});
  const [activeTab, setActiveTab] = useState('content');
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const found = coursesData.courses.find(c => c.slug === slug);
    setCourse(found);
    if (found?.chapters?.length > 0) {
      setActiveChapter(0);
      const savedProgress = localStorage.getItem(`course_progress_${found.id}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    }
  }, [slug]);

  useEffect(() =>{
    console.log(1);
  },[cardUpdated])

  // افزودن به سبد خرید
  const addToCart = () => {
    if (!course) return;
    const cart = getCartFromStorage();
    const existingIndex = cart.findIndex(item => item.id === course.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: course.id,
        title: course.title,
        price: course.price,
        oldPrice: course.oldPrice || null,
        quantity: 1,
        slug: course.slug,
        image: course.image || null
      });
    }
    saveCartToStorage(cart);
    setCardUpdated((cu) => cu++)
    setCartMessage('✅ دوره به سبد خرید اضافه شد!');
    setTimeout(() => setCartMessage(''), 3000);
  };

  // خرید مستقیم: ابتدا به سبد اضافه می‌کنیم سپس به صفحه پرداخت می‌رویم
  const buyNow = () => {
    if (!course) return;
    const cart = getCartFromStorage();
    const existingIndex = cart.findIndex(item => item.id === course.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: course.id,
        title: course.title,
        price: course.price,
        oldPrice: course.oldPrice || null,
        quantity: 1,
        slug: course.slug,
        image: course.image || null
      });
    }
    saveCartToStorage(cart);
    router.push('/payment'); // رفتن به صفحه درگاه پرداخت
  };

  const toggleChapter = (index) => {
    setActiveChapter(activeChapter === index ? null : index);
  };

  const markLessonComplete = (chapterIdx, lessonIdx) => {
    const key = `${chapterIdx}-${lessonIdx}`;
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);
    localStorage.setItem(`course_progress_${course.id}`, JSON.stringify(newProgress));
  };

  const getCompletedCount = () => {
    if (!course) return 0;
    let completed = 0;
    course.chapters.forEach((chapter, chIdx) => {
      chapter.lessons.forEach((_, leIdx) => {
        if (progress[`${chIdx}-${leIdx}`]) completed++;
      });
    });
    return completed;
  };

  const getTotalLessons = () => {
    if (!course) return 0;
    return course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  };

  const getProgressPercent = () => {
    const total = getTotalLessons();
    if (total === 0) return 0;
    return Math.round((getCompletedCount() / total) * 100);
  };

  const openVideoPreview = (videoUrl, title) => {
    setCurrentVideo({ url: videoUrl, title });
    setIsVideoModalOpen(true);
  };

  if (!course) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">دوره یافت نشد</h2>
          <Link href="/courses" className="text-indigo-600 mt-4 inline-block">بازگشت به دوره‌ها</Link>
        </div>
      </main>
    );
  }

  const totalLessons = getTotalLessons();
  const completedCount = getCompletedCount();
  const progressPercent = getProgressPercent();

  return (
    <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-indigo-600">خانه</Link> /{' '}
          <Link href="/courses" className="hover:text-indigo-600">دوره‌ها</Link> /{' '}
          <span className="text-gray-800">{course.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {course.badge && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">{course.badge}</span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  course.level === 'beginner' ? 'bg-green-100 text-green-700' :
                  course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {course.level === 'beginner' ? 'مقدماتی' : course.level === 'intermediate' ? 'متوسط' : 'پیشرفته'}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold mb-4">{course.title}</h1>
              <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1"><FaUserGraduate /><span>{course.students.toLocaleString()} دانشجو</span></div>
                <div className="flex items-center gap-1"><FaClock /><span>{course.duration}</span></div>
                <div className="flex items-center gap-1"><FaBookOpen /><span>{course.lectures} درس</span></div>
                <div className="flex items-center gap-1 text-yellow-500"><FaStar /><span>{course.rating} ({course.reviews.toLocaleString()} نظر)</span></div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button onClick={buyNow} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold transition shadow-md">
                  خرید دوره
                </button>
                <button onClick={addToCart} className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-full font-semibold transition">
                  افزودن به سبد خرید
                </button>
              </div>
              {cartMessage && (
                <div className="mt-4 text-green-600 bg-green-50 p-2 rounded-lg text-center">
                  {cartMessage}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8">
              <div className="mb-6">
                {course.oldPrice && (
                  <span className="text-gray-400 line-through text-lg ml-2">{course.oldPrice.toLocaleString()} تومان</span>
                )}
                <div className="text-3xl font-bold text-indigo-600">{course.price.toLocaleString()} تومان</div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center">
                  <FaUserTie className="h-8 w-8 text-indigo-600" />
                </div>
                <div>
                  <p className="font-bold text-lg">{course.instructor}</p>
                  <p className="text-gray-600 text-sm">{course.instructorBio?.substring(0, 50)}...</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between"><span>مدت دسترسی:</span><span className="font-medium">مادام‌العمر</span></div>
                <div className="flex justify-between"><span>گواهی پایان دوره:</span><span className="font-medium">دارد</span></div>
                <div className="flex justify-between"><span>پشتیبانی:</span><span className="font-medium">۲۴ ساعته</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and remaining content (بدون تغییر) */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${activeTab === 'content' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaListUl className="inline ml-2" /> سرفصل‌های دوره
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${activeTab === 'description' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaFileAlt className="inline ml-2" /> توضیحات تکمیلی
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`px-6 py-4 font-semibold transition whitespace-nowrap ${activeTab === 'requirements' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaQuestionCircle className="inline ml-2" /> پیش‌نیازها
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'content' && (
              <div>
                <div className="mb-8 p-4 bg-indigo-50 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">پیشرفت شما</span>
                    <span className="text-indigo-600 font-bold">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{completedCount} از {totalLessons} درس تکمیل شده</p>
                </div>

                <div className="space-y-3">
                  {course.chapters.map((chapter, chIdx) => (
                    <div key={chIdx} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleChapter(chIdx)}
                        className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition text-right"
                      >
                        <div className="flex items-center gap-3">
                          {activeChapter === chIdx ? <FaMinus className="text-indigo-600" /> : <FaPlus className="text-indigo-600" />}
                          <span className="font-bold text-lg">{chapter.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{chapter.duration} | {chapter.lessons.length} درس</span>
                      </button>
                      
                      {activeChapter === chIdx && (
                        <div className="divide-y divide-gray-100 animate-fade-in">
                          {chapter.lessons.map((lesson, leIdx) => {
                            const isCompleted = progress[`${chIdx}-${leIdx}`];
                            return (
                              <div key={leIdx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                                <div className="flex items-center gap-3 flex-1">
                                  <button onClick={() => markLessonComplete(chIdx, leIdx)} className="focus:outline-none">
                                    <FaCheckCircle className={`h-5 w-5 ${isCompleted ? 'text-green-500' : 'text-gray-300'}`} />
                                  </button>
                                  {lesson.isPreview ? (
                                    <button onClick={() => openVideoPreview(lesson.videoUrl, lesson.title)} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
                                      <FaPlay className="h-3 w-3" />
                                      <span>{lesson.title}</span>
                                      <span className="text-xs bg-indigo-100 px-2 py-0.5 rounded">پیش‌نمایش</span>
                                    </button>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <FaVideo className="h-4 w-4 text-gray-400" />
                                      <span className={isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}>{lesson.title}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <span>{lesson.duration}</span>
                                  {!lesson.isPreview && (
                                    <button className="text-gray-400 hover:text-gray-600">
                                      <FaDownload className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-3">توضیحات کامل دوره</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{course.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">مخاطبان دوره</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {course.targetAudience?.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div>
                <h3 className="text-2xl font-bold mb-3">پیش‌نیازهای دوره</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {course.requirements?.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && currentVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setIsVideoModalOpen(false)}>
          <div className="relative max-w-4xl w-full bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-10">
              <FaExpand className="h-5 w-5" />
            </button>
            <video controls autoPlay className="w-full" src={currentVideo.url}>
              <source src={currentVideo.url} type="video/mp4" />
              مرورگر شما از ویدیو پشتیبانی نمی‌کند.
            </video>
            <div className="p-4 text-white">
              <h3 className="font-bold">{currentVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}