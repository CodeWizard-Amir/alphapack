'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCreditCard, FaLock, FaShieldAlt, FaArrowRight, FaShoppingBag } from 'react-icons/fa';

const getCartFromStorage = () => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart_items');
  return stored ? JSON.parse(stored) : [];
};

export default function PaymentGatewayPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const cart = getCartFromStorage();
    if (cart.length === 0) {
      router.push('/cart');
    } else {
      setCartItems(cart);
    }
  }, [router]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal; // بدون تخفیف برای سادگی

  const handlePayment = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) {
      setError('لطفاً تمام اطلاعات کارت را وارد کنید');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError('شماره کارت باید ۱۶ رقم باشد');
      return;
    }
    setIsProcessing(true);
    setError('');

    // شبیه‌سازی درخواست به درگاه
    setTimeout(() => {
      // ساخت تراکنش تصادفی
      const transactionId = 'TRX-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      // ذخیره تراکنش در sessionStorage برای صفحه موفقیت
      sessionStorage.setItem('lastTransaction', JSON.stringify({
        id: transactionId,
        amount: total,
        date: new Date().toLocaleString('fa-IR'),
        items: cartItems
      }));
      // پاک کردن سبد خرید پس از پرداخت موفق
      localStorage.removeItem('cart_items');
      // رفتن به صفحه موفقیت
      router.push(`/payment/success?transaction=${transactionId}`);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return null; // یا لودینگ
  }

  return (
    <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">درگاه پرداخت تستی</h1>
          <p className="text-gray-500 mt-2">اطلاعات کارت را به صورت تستی وارد کنید</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* خلاصه خرید */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <FaShoppingBag className="text-indigo-600" />
              خلاصه سفارش
            </h2>
            <div className="space-y-3 max-h-80 overflow-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-2">
                  <div>
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-gray-500 mr-2">x{item.quantity}</span>
                  </div>
                  <span>{(item.price * item.quantity).toLocaleString()} تومان</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t text-lg font-bold flex justify-between">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-indigo-600">{total.toLocaleString()} تومان</span>
            </div>
            <div className="mt-4 text-xs text-gray-400 flex items-center gap-1 justify-center">
              <FaLock className="h-3 w-3" /> پرداخت امن توسط زرین‌پال تست
            </div>
          </div>

          {/* فرم پرداخت */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6 text-indigo-600">
              <FaCreditCard className="h-6 w-6" />
              <h2 className="text-xl font-bold">اطلاعات کارت بانکی</h2>
            </div>
            <form onSubmit={handlePayment}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">شماره کارت</label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="6037 9912 3456 7890"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 outline-none transition"
                  maxLength="19"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">تاریخ انقضا (MM/YY)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="12/25"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').slice(0,5))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CVV2</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0,4))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 outline-none"
                  />
                </div>
              </div>
              {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 transition disabled:opacity-70"
              >
                {isProcessing ? 'در حال اتصال به درگاه...' : (
                  <>
                    پرداخت {total.toLocaleString()} تومان
                    <FaArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <FaShieldAlt className="h-4 w-4" />
              <span>برای تست می‌توانید هر شماره ۱۶ رقمی و تاریخ دلخواه وارد کنید</span>
            </div>
            <Link href="/cart" className="block text-center text-indigo-600 mt-4 text-sm hover:underline">
              بازگشت به سبد خرید
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}