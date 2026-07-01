import { Users, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'فروش کل', value: '۱۲۴,۵۰۰,۰۰۰', unit: 'تومان', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'سفارشات جدید', value: '۴۵', unit: 'سفارش', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: 'کاربران فعال', value: '۱,۲۸۴', unit: 'نفر', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { label: 'نرخ تبدیل', value: '۳.۲٪', unit: '', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-black text-gray-800 mb-8">خلاصه وضعیت</h1>
      
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
        نمودار فروش (نسخه دمو)
      </div>
    </div>
  );
}
