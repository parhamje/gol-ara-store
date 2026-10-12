import { Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function OrdersPage() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-pink-50 min-h-[500px]">
      <h1 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
        <Package size={24} className="text-pink-500" />
        {isRtl ? 'سفارشات من' : 'My Orders'}
      </h1>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-300 mb-4">
          <Package size={32} />
        </div>
        <p className="text-gray-500 font-bold">{isRtl ? 'هنوز سفارشی ثبت نکرده‌اید.' : "You haven't placed any orders yet."}</p>
      </div>
    </div>
  );
}
