'use client';

import { FaUsers, FaBookOpen, FaShoppingCart, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

export default function AdminDashboard() {
  // آمار کارت‌ها
  const stats = [
    { title: 'کل کاربران', value: '۱۲,۴۵۰', change: '+۱۲%', icon: FaUsers, color: 'bg-indigo-500', changeUp: true },
    { title: 'دوره‌ها', value: '۲۴۵', change: '+۸%', icon: FaBookOpen, color: 'bg-blue-500', changeUp: true },
    { title: 'سفارشات', value: '۳,۲۸۰', change: '+۲۳%', icon: FaShoppingCart, color: 'bg-green-500', changeUp: true },
    { title: 'درآمد (تومان)', value: '۱۲.۵M', change: '-۳%', icon: FaDollarSign, color: 'bg-orange-500', changeUp: false },
  ];

  // داده‌های نمودار فروش ماهانه
  const monthlySales = [
    { name: 'فروردین', فروش: 4200 },
    { name: 'اردیبهشت', فروش: 5800 },
    { name: 'خرداد', فروش: 6200 },
    { name: 'تیر', فروش: 7100 },
    { name: 'مرداد', فروش: 8500 },
    { name: 'شهریور', فروش: 9300 },
    { name: 'مهر', فروش: 10200 },
  ];

  // داده‌های دسته‌بندی دوره‌ها
  const categoryData = [
    { name: 'برنامه‌نویسی', value: 45, color: '#6366f1' },
    { name: 'شبکه', value: 25, color: '#3b82f6' },
    { name: 'امنیت', value: 18, color: '#10b981' },
    { name: 'سخت‌افزار', value: 12, color: '#f59e0b' },
  ];

  // آخرین سفارشات
  const recentOrders = [
    { id: '#ORD-001', user: 'علی رضایی', course: 'React و Next.js', amount: '۲,۴۵۰,۰۰۰', status: 'پرداخت شده', statusColor: 'text-green-600 bg-green-100' },
    { id: '#ORD-002', user: 'سارا محمدی', course: 'هوش مصنوعی', amount: '۲,۸۵۰,۰۰۰', status: 'در انتظار', statusColor: 'text-yellow-600 bg-yellow-100' },
    { id: '#ORD-003', user: 'رضا کریمی', course: 'امنیت سایبری', amount: '۳,۹۵۰,۰۰۰', status: 'پرداخت شده', statusColor: 'text-green-600 bg-green-100' },
    { id: '#ORD-004', user: 'مریم حسینی', course: 'CCNA', amount: '۳,۲۵۰,۰۰۰', status: 'لغو شده', statusColor: 'text-red-600 bg-red-100' },
    { id: '#ORD-005', user: 'امیر عباسی', course: 'MikroTik', amount: '۲,۷۵۰,۰۰۰', status: 'پرداخت شده', statusColor: 'text-green-600 bg-green-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">داشبورد مدیریت</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">به پنل مدیریت خوش آمدید</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
                <p className={`text-xs mt-2 flex items-center gap-1 ${stat.changeUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.changeUp ? <FaArrowUp className="h-3 w-3" /> : <FaArrowDown className="h-3 w-3" />}
                  {stat.change} از ماه قبل
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">نمودار فروش ماهانه</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="فروش" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">دسته‌بندی دوره‌ها</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">آخرین سفارشات</h3>
          <button className="text-indigo-600 text-sm hover:underline">مشاهده همه</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">شماره سفارش</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">کاربر</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">دوره</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">مبلغ</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                  <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-white">{order.id}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{order.user}</td>
                  <td className="px-5 py-3 text-sm text-gray-600 dark:text-gray-400">{order.course}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-gray-800 dark:text-white">{order.amount} تومان</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-indigo-50 dark:bg-indigo-950/30 hover:bg-indigo-100 p-4 rounded-2xl transition text-center">
          <FaBookOpen className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">افزودن دوره جدید</span>
        </button>
        <button className="bg-green-50 dark:bg-green-950/30 hover:bg-green-100 p-4 rounded-2xl transition text-center">
          <FaUsers className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">افزودن کاربر</span>
        </button>
        <button className="bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 p-4 rounded-2xl transition text-center">
          <FaShoppingCart className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">مشاهده سفارشات</span>
        </button>
        <button className="bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 p-4 rounded-2xl transition text-center">
          <FaDollarSign className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">گزارش فروش</span>
        </button>
      </div>
    </div>
  );
}