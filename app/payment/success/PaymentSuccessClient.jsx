'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaDownload, FaHome, FaShoppingCart, FaPrint } from 'react-icons/fa';

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transaction');
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('lastTransaction');
    if (stored) {
      setTransactionData(JSON.parse(stored));
      sessionStorage.removeItem('lastTransaction');
    } else if (transactionId) {
      setTransactionData({
        id: transactionId,
        amount: 0,
        date: new Date().toLocaleString('fa-IR'),
        items: []
      });
    }
  }, [transactionId]);

  if (!transactionData) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">در حال هدایت...</h2>
          <Link href="/" className="text-indigo-600 mt-4 inline-block">بازگشت به صفحه اصلی</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 md:pt-24 pb-16 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="container-custom max-w-3xl mx-auto text-center">
        {/* همان JSX قبلی شما، بدون تغییر */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">پرداخت با موفقیت انجام شد!</h1>
          <p className="text-gray-600 mb-8">دوره‌های خریداری شده به پنل شما اضافه شدند.</p>

          <div className="bg-gray-50 rounded-2xl p-6 text-right mb-8">
            <h3 className="font-bold text-lg mb-3">جزئیات تراکنش</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>شماره تراکنش:</span>
                <span className="font-mono text-indigo-600">{transactionData.id}</span>
              </div>
              <div className="flex justify-between">
                <span>مبلغ پرداختی:</span>
                <span>{transactionData.amount.toLocaleString()} تومان</span>
              </div>
              <div className="flex justify-between">
                <span>تاریخ و ساعت:</span>
                <span>{transactionData.date}</span>
              </div>
            </div>
            {transactionData.items.length > 0 && (
              <div className="mt-4 pt-3 border-t">
                <p className="font-medium mb-2">دوره‌های خریداری شده:</p>
                <ul className="list-disc list-inside text-sm">
                  {transactionData.items.map((item, idx) => (
                    <li key={idx}>{item.title} (تعداد: {item.quantity})</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition">
              <FaHome /> رفتن به پنل کاربری
            </Link>
            <Link href="/courses" className="inline-flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-full font-semibold transition">
              <FaShoppingCart /> مشاهده دوره‌های دیگر
            </Link>
            <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
              <FaPrint /> چاپ فاکتور
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}