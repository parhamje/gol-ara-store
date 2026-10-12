import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const stats = [
    { label: isRtl ? 'فروش کل' : 'Total Sales', value: isRtl ? '۱۲۴,۵۰۰,۰۰۰' : '124,500,000', unit: isRtl ? 'تومان' : 'Toman', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: isRtl ? 'سفارشات جدید' : 'New Orders', value: isRtl ? '۴۵' : '45', unit: isRtl ? 'سفارش' : 'orders', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: isRtl ? 'کاربران فعال' : 'Active Users', value: isRtl ? '۱,۲۸۴' : '1,284', unit: isRtl ? 'نفر' : 'users', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { label: isRtl ? 'نرخ تبدیل' : 'Conversion Rate', value: isRtl ? '۳.۲٪' : '3.2%', unit: '', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-black text-gray-800 mb-8">
        {isRtl ? 'خلاصه وضعیت' : 'Dashboard Overview'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 stagger-children">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-800">
                {stat.value} <span className="text-sm text-gray-500">{stat.unit}</span>
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-96 flex items-center justify-center text-gray-400 font-bold">
        {isRtl ? 'نمودار فروش (نسخه دمو)' : 'Sales Chart (Demo)'}
      </div>
    </div>
  );
}
