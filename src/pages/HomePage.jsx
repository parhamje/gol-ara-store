import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import HeroSlider from '../components/HeroSlider';

const FEATURES = [
  { icon: Truck,       title: 'ارسال سریع',       desc: 'تحویل در کمتر از ۲۴ ساعت در تهران' },
  { icon: ShieldCheck, title: 'ضمانت اصالت',       desc: 'محصولات ۱۰۰٪ اصل با بارکد معتبر' },
  { icon: RefreshCw,   title: 'مرجوعی آسان',       desc: 'بازگشت کالا تا ۷ روز بدون قید و شرط' },
];

const HERO_CATEGORIES = [
  { label: 'رژ لب و مداد', href: '/shop', bg: '#fdf4f8', img: '/images/lipstick.png' },
  { label: 'سایه چشم',     href: '/shop', bg: '#fdf4f8', img: '/images/eyeshadow.png' },
  { label: 'کرم پودر',     href: '/shop', bg: '#fdf4f8', img: '/images/foundation.png' },
  { label: 'مراقبت پوست',  href: '/shop', bg: '#fdf4f8', img: '/images/skincare.png' },
  { label: 'لاک ناخن',     href: '/shop', bg: '#fdf4f8', img: '/images/nailpolish.png' },
  { label: 'ابزار آرایشی', href: '/shop', bg: '#fdf4f8', img: '/images/tools.png' },
];

export default function HomePage() {
  const featured = products.filter((p) => p.tags.includes('پرفروش')).slice(0, 10);
  const newest   = products.filter((p) => p.tags.includes('جدید')).slice(0, 10);

  return (
    <div className="bg-transparent">
      {/* ── Hero Slider ──────────────────────────────────────── */}
      <HeroSlider />

      {/* ── Trust Features ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8" aria-label="ویژگی‌های فروشگاه">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-5 p-6 rounded-[2rem] bg-gray-50 border border-gray-100 transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm text-pink-500">
                <Icon size={24} />
              </div>
              <div>
                <p className="font-black text-gray-800 mb-1">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12" aria-label="دسته‌بندی‌ها">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-800">دسته‌بندی‌های محبوب</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {HERO_CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              to={cat.href}
              className="flex flex-col items-center gap-3 p-4 rounded-[2rem] transition-all group"
              style={{ background: cat.bg }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-sm group-hover:border-pink-200 transition-colors">
                <img src={cat.img} alt={cat.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-gray-700">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Banner ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8" aria-label="تبلیغ ویژه">
        <div
          className="rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-sm border border-pink-100"
          style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center md:text-right mb-8 md:mb-0">
            <div className="inline-block bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              فقط تا پایان هفته
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-pink-900 mb-3">
              جشنواره تخفیف‌های طلایی
            </h2>
            <p className="text-pink-800 text-lg">تا <span className="font-black text-2xl">۳۰٪ تخفیف</span> روی تمامی محصولات برندهای معتبر</p>
          </div>
          
          <div className="relative z-10">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-pink-600 font-black px-8 py-4 rounded-2xl hover:bg-pink-50 transition-colors shadow-lg">
              مشاهده تخفیف‌ها
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12" aria-labelledby="featured-title">
        <div className="flex items-end justify-between mb-8 pr-2 border-r-4 border-pink-500 py-1">
          <h2 id="featured-title" className="text-2xl font-black text-gray-800 mr-3">پرفروش‌ترین محصولات</h2>
          <Link to="/shop" className="text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1">
            مشاهده همه
            <ArrowLeft size={16} />
          </Link>
        </div>
        <ProductCarousel products={featured} />
      </section>

      {/* ── Newest ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pb-20" aria-labelledby="newest-title">
        <div className="flex items-end justify-between mb-8 pr-2 border-r-4 border-pink-500 py-1">
          <h2 id="newest-title" className="text-2xl font-black text-gray-800 mr-3">تازه‌ترین‌ها در گل آرا</h2>
          <Link to="/shop" className="text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1">
            مشاهده همه
            <ArrowLeft size={16} />
          </Link>
        </div>
        <ProductCarousel products={newest} />
      </section>
    </div>
  );
}
