import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { products } from '../data/products';
import ProductCarousel from '../components/ProductCarousel';
import HeroSlider from '../components/HeroSlider';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const FEATURES = [
    { icon: Truck,       title: t('home.fast_delivery'),       desc: t('home.fast_delivery_sub') },
    { icon: ShieldCheck, title: t('home.auth_guarantee'),       desc: t('home.auth_guarantee_sub') },
    { icon: RefreshCw,   title: t('home.easy_return'),       desc: t('home.easy_return_sub') },
  ];

  const HERO_CATEGORIES = [
    { label: t('nav.lips') || 'Lips', href: '/shop', bg: '#fdf4f8', img: import.meta.env.BASE_URL + 'images/lipstick.png' },
    { label: t('nav.eyes') || 'Eyes', href: '/shop', bg: '#fdf4f8', img: import.meta.env.BASE_URL + 'images/eyeshadow.png' },
    { label: t('nav.face') || 'Face', href: '/shop', bg: '#fdf4f8', img: import.meta.env.BASE_URL + 'images/foundation.png' },
    { label: t('nav.skincare') || 'Skincare', href: '/shop', bg: '#fdf4f8', img: import.meta.env.BASE_URL + 'images/skincare.png' },
    { label: t('nav.nails') || 'Nails', href: '/shop', bg: '#fdf4f8', img: import.meta.env.BASE_URL + 'images/nailpolish.png' },
    { label: t('nav.tools') || 'Tools', href: '/shop', bg: '#fdf4f8', img: import.meta.env.BASE_URL + 'images/tools.png' },
  ];

  const featured = products.filter((p) => p.tags.includes('پرفروش')).slice(0, 10);
  const newest   = products.filter((p) => p.tags.includes('جدید')).slice(0, 10);

  return (
    <div className="bg-transparent">
      {/* ── Hero Slider ──────────────────────────────────────── */}
      <HeroSlider />

      {/* ── Trust Features ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8" aria-label="Features">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12" aria-label="Categories">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-800">{t('home.popular_categories')}</h2>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8" aria-label="Promo">
        <div
          className="rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-sm border border-pink-100"
          style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}
        >
          <div className="absolute top-0 end-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 start-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 text-center md:text-start mb-8 md:mb-0">
            <div className="inline-block bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              {t('home.limited_offer') || 'Limited Time Offer'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-pink-900 mb-3">
              {t('home.golden_festival') || 'Golden Discount Festival'}
            </h2>
            <p className="text-pink-800 text-lg">
              {t('home.up_to_30') || 'Up to 30% OFF on all original products'}
            </p>
          </div>
          
          <div className="relative z-10">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-pink-600 font-black px-8 py-4 rounded-2xl hover:bg-pink-50 transition-colors shadow-lg">
              {t('home.view_discounts') || 'View Discounts'}
              {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12" aria-labelledby="featured-title">
        <div className="flex items-end justify-between mb-8 pe-2 border-s-4 border-pink-500 py-1">
          <h2 id="featured-title" className="text-2xl font-black text-gray-800 ms-3">{t('home.best_sellers')}</h2>
          <Link to="/shop" className="text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1">
            {t('view_all')}
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>
        <ProductCarousel products={featured} />
      </section>

      {/* ── Newest ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pb-20" aria-labelledby="newest-title">
        <div className="flex items-end justify-between mb-8 pe-2 border-s-4 border-pink-500 py-1">
          <h2 id="newest-title" className="text-2xl font-black text-gray-800 ms-3">{t('home.newest')}</h2>
          <Link to="/shop" className="text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1">
            {t('view_all')}
            {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>
        <ProductCarousel products={newest} />
      </section>
    </div>
  );
}
