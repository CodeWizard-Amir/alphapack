'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaShoppingBag, FaTrashAlt, FaArrowLeft, FaShoppingCart, FaGift, FaCreditCard, FaPlus, FaMinus } from 'react-icons/fa';

// helpers localStorage
const getCartFromStorage = () => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart_items');
  return stored ? JSON.parse(stored) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart_items', JSON.stringify(cart));
};

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');

  // بارگذاری سبد از localStorage
  useEffect(() => {
    const cart = getCartFromStorage();
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
    saveCartToStorage(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    saveCartToStorage(updated);
  };

  const applyDiscount = () => {
    if (discountCode === 'OFF20') {
      setDiscountPercent(20);
      setDiscountMessage('کد تخفیف ۲۰٪ با موفقیت اعمال شد');
    } else if (discountCode === 'WELCOME10') {
      setDiscountPercent(10);
      setDiscountMessage('کد تخفیف ۱۰٪ با موفقیت اعمال شد');
    } else {
      setDiscountPercent(0);
      setDiscountMessage('کد تخفیف نامعتبر است');
      setTimeout(() => setDiscountMessage(''), 3000);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = 0;
  const total = subtotal - discountAmount + shipping;

  // رفتن به صفحه درگاه پرداخت
  const goToPayment = () => {
    if (cartItems.length === 0) return;
    router.push('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <div className="container-custom text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-indigo-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingBag className="h-14 w-14 text-indigo-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">سبد خرید خالی است!</h1>
            <p className="text-gray-500 mb-8">به نظر می‌رسد هنوز دوره‌ای به سبد خرید اضافه نکرده‌اید.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg"
            >
              <FaArrowLeft className="h-4 w-4" />
              مشاهده دوره‌ها
            </Link>
            <div className="mt-10 text-sm text-gray-400">
              <p>پیشنهاد ویژه: با خرید اولین دوره، ۲۰٪ تخفیف بگیرید!</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-2">
          <FaShoppingCart className="h-8 w-8 text-indigo-600" />
          سبد خرید
          <span className="text-base bg-gray-200 text-gray-700 px-3 py-1 rounded-full ml-3">{totalItems} دوره</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 flex flex-wrap gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <FaShoppingBag className="text-indigo-400 text-3xl" />
                  </div>
                </div>
                <div className="flex-1 min-w-[150px]">
                  <h3 className="font-bold text-gray-800">{item.title}</h3>
                  {item.oldPrice && (
                    <span className="text-gray-400 line-through text-sm ml-2">{item.oldPrice.toLocaleString()} تومان</span>
                  )}
                  <span className="text-indigo-600 font-bold">{item.price.toLocaleString()} تومان</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-200 rounded-full transition">
                    <FaMinus className="h-3 w-3 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-200 rounded-full transition">
                    <FaPlus className="h-3 w-3 text-gray-600" />
                  </button>
                </div>
                <div className="text-right min-w-[100px]">
                  <span className="font-bold text-gray-800">{(item.price * item.quantity).toLocaleString()} تومان</span>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition p-2">
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            ))}

            <div className="bg-white rounded-2xl shadow-md p-5 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <FaGift className="h-5 w-5 text-indigo-500" />
                <span>کد تخفیف دارید؟</span>
              </div>
              <div className="flex gap-2 flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="کد تخفیف"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-300 outline-none"
                />
                <button onClick={applyDiscount} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition">
                  اعمال
                </button>
              </div>
              {discountMessage && (
                <div className={`text-sm ${discountPercent > 0 ? 'text-green-600' : 'text-red-500'} w-full text-center`}>
                  {discountMessage}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">خلاصه سفارش</h2>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>مجموع ({totalItems} دوره)</span>
                  <span>{subtotal.toLocaleString()} تومان</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>تخفیف ({discountPercent}%)</span>
                    <span>- {discountAmount.toLocaleString()} تومان</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>حمل و نقل</span>
                  <span className="text-green-600">رایگان</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>قابل پرداخت</span>
                  <span className="text-indigo-600">{total.toLocaleString()} تومان</span>
                </div>
              </div>
              <button
                onClick={goToPayment}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 transition shadow-md"
              >
                <FaCreditCard className="h-5 w-5" />
                ثبت سفارش و پرداخت
              </button>
              <Link href="/courses" className="block text-center text-indigo-600 mt-4 text-sm hover:underline">
                ادامه خرید
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}