import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { formatToman } from '../utils/formatCurrency';

export default function OrderConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state || !state.orderId) {
      navigate('/');
    }
  }, [state, navigate]);

  if (!state || !state.orderId) return null;

  const { orderId, total, items } = state;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="rounded-3xl p-8 md:p-12 text-center animate-scale-in"
           style={{ background: 'white', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(212,87,138,.08)' }}>
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>

        <h1 className="text-2xl md:text-3xl font-black mb-2" style={{ color: 'var(--color-text)' }}>
          سفارش با موفقیت ثبت شد! 🎉
        </h1>
        <p className="mb-8" style={{ color: 'var(--color-muted)' }}>
          سفارش شما دریافت شد و در اسرع وقت پردازش خواهد شد.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-right flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">کد پیگیری سفارش</p>
              <p className="font-bold text-lg font-mono tracking-widest">{orderId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">مبلغ پرداختی</p>
              <p className="font-bold text-lg text-pink-600">{formatToman(total)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Package size={16} className="text-pink-500" />
              اقلام سفارش ({items.length.toLocaleString('fa-IR')})
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <div key={item.product.id} className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 relative group">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold">{item.quantity.toLocaleString('fa-IR')}x</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-primary text-sm px-8">
            بازگشت به صفحه اصلی
          </Link>
          <Link to="/shop" className="btn-ghost text-sm px-8">
            ادامه خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
