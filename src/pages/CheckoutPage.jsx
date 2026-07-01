import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Banknote, MapPin, Phone, User, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { formatToman } from '../utils/formatCurrency';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postal: '',
    paymentMethod: 'online',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      navigate('/cart');
    }
  }, [items, navigate, isSubmitting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      clearCart();
      const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();
      navigate('/order-confirm', { state: { orderId, total, items: [...items] } });
    }, 1500);
  };

  if (items.length === 0 && !isSubmitting) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Progress */}
      <div className="flex items-center justify-between mb-10 max-w-xl mx-auto animate-fade-in">
        <div className="progress-step active">
          <div className="step-dot">۱</div>
          <span>سبد خرید</span>
        </div>
        <div className="progress-line active" />
        <div className="progress-step active">
          <div className="step-dot">۲</div>
          <span>تکمیل خرید</span>
        </div>
        <div className="progress-line" />
        <div className="progress-step">
          <div className="step-dot">۳</div>
          <span>تایید سفارش</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          
          {/* Section: Info */}
          <section className="p-6 rounded-2xl animate-fade-in-up"
                   style={{ background: 'white', boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2"
                style={{ color: 'var(--color-primary)' }}>
              <User size={20} />
              اطلاعات شخصی و ارسال
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  نام و نام خانوادگی
                </label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange}
                       className="input-base" placeholder="مثال: علی احمدی" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  شماره موبایل
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                         className="input-base pr-10" placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  آدرس دقیق
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute top-4 right-3 text-gray-400" />
                  <textarea required name="address" value={formData.address} onChange={handleChange}
                            className="input-base pr-10 min-h-[100px] resize-none py-3"
                            placeholder="استان، شهر، خیابان، پلاک، واحد..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  شهر
                </label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange}
                       className="input-base" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-muted)' }}>
                  کد پستی
                </label>
                <input type="text" name="postal" value={formData.postal} onChange={handleChange}
                       className="input-base" dir="ltr" />
              </div>
            </div>
          </section>

          {/* Section: Payment */}
          <section className="p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.1s', background: 'white', boxShadow: 'var(--shadow-card)' }}>
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2"
                style={{ color: 'var(--color-primary)' }}>
              <CreditCard size={20} />
              روش پرداخت
            </h2>
            <div className="flex flex-col gap-3">
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                formData.paymentMethod === 'online' ? 'border-pink-500 bg-pink-50' : 'border-transparent bg-gray-50'
              }`}>
                <input type="radio" name="paymentMethod" value="online"
                       checked={formData.paymentMethod === 'online'} onChange={handleChange}
                       className="w-4 h-4 text-pink-600 accent-pink-600" />
                <CreditCard size={20} style={{ color: formData.paymentMethod === 'online' ? 'var(--color-primary)' : 'var(--color-muted)' }} />
                <div>
                  <p className="font-semibold text-sm">پرداخت اینترنتی (درگاه زرین‌پال)</p>
                  <p className="text-xs text-gray-500">پرداخت امن با تمامی کارت‌های عضو شتاب</p>
                </div>
              </label>
              
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                formData.paymentMethod === 'cod' ? 'border-pink-500 bg-pink-50' : 'border-transparent bg-gray-50'
              }`}>
                <input type="radio" name="paymentMethod" value="cod"
                       checked={formData.paymentMethod === 'cod'} onChange={handleChange}
                       className="w-4 h-4 text-pink-600 accent-pink-600" />
                <Banknote size={20} style={{ color: formData.paymentMethod === 'cod' ? 'var(--color-primary)' : 'var(--color-muted)' }} />
                <div>
                  <p className="font-semibold text-sm">پرداخت در محل</p>
                  <p className="text-xs text-gray-500">پرداخت هزینه هنگام تحویل سفارش (فقط تهران)</p>
                </div>
              </label>
            </div>
          </section>

          <div className="hidden lg:block">
            <button type="submit" disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-lg">
              {isSubmitting ? 'در حال ثبت...' : 'ثبت و پرداخت نهایی'}
            </button>
          </div>
        </form>

        {/* Sidebar Summary */}
        <aside className="rounded-2xl p-6 sticky top-20 animate-fade-in-up"
               style={{ animationDelay: '0.2s', background: 'white', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(212,87,138,.08)' }}>
          <h2 className="font-bold text-base mb-5">خلاصه سفارش</h2>
          
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity.toLocaleString('fa-IR')} عدد
                  </p>
                </div>
                <p className="text-xs font-semibold whitespace-nowrap">
                  {formatToman(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6 text-sm border-t pt-4" style={{ borderColor: '#e9d5e8' }}>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-muted)' }}>مبلغ کل محصولات</span>
              <span>{formatToman(total)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-muted)' }}>هزینه ارسال</span>
              <span className="text-green-600 font-medium">رایگان</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-base"
                 style={{ borderColor: '#e9d5e8' }}>
              <span>مبلغ نهایی</span>
              <span className="price-main">{formatToman(total)}</span>
            </div>
          </div>

          <button onClick={handleSubmit} disabled={isSubmitting}
                  className="btn-primary w-full py-3 lg:hidden mb-3">
            {isSubmitting ? 'در حال پردازش...' : 'ثبت سفارش'}
          </button>
          
          <Link to="/cart" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-pink-600 transition-colors">
            <ArrowLeft size={14} />
            بازگشت به سبد خرید
          </Link>
        </aside>
      </div>
    </div>
  );
}
