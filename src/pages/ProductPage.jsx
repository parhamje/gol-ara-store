import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Check, ChevronLeft, ChevronRight, Share2, Heart, Truck, ShieldCheck, RefreshCw, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import { formatToman, discountPercent } from '../utils/formatCurrency';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import { useTranslation } from 'react-i18next';

export default function ProductPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const product = products.find((p) => p.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState(isRtl ? 'صورتی' : 'Pink');

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product?.id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-lg font-semibold mb-4">{t('product.not_found')}</p>
        <Link to="/shop" className="btn-primary inline-flex">{t('nav.shop')}</Link>
      </div>
    );
  }

  const name = isRtl ? product.name : product.name_en;
  const description = isRtl ? product.description : product.description_en;
  const specs = isRtl ? product.specs : product.specs_en;
  const brand = isRtl ? product.brand : product.brand_en;

  const discount = discountPercent(product.originalPrice, product.price);
  const related  = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const allImages = product.images || [product.image];

  const colors = [
    { name: isRtl ? 'قرمز' : 'Red', hex: '#dc2626' },
    { name: isRtl ? 'نود' : 'Nude', hex: '#d4a373' },
    { name: isRtl ? 'صورتی' : 'Pink', hex: '#f472b6' }
  ];

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatPrice = (amount) => isRtl ? formatToman(amount) : `${amount.toLocaleString()} T`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6" style={{ background: '#fdf4f8' }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--color-muted)' }}
           aria-label="Breadcrumb">
        <Link to="/" className="hover:text-pink-500 transition-colors">{t('nav.home')}</Link>
        {isRtl ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        <Link to="/shop" className="hover:text-pink-500 transition-colors">{t('nav.shop')}</Link>
        {isRtl ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
        <span className="line-clamp-1" style={{ color: 'var(--color-text)' }}>{name}</span>
      </nav>

      {/* Main content Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 relative group">
              <img
                src={allImages[activeImg]}
                alt={`${name} — Image ${activeImg + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {discount > 0 && (
                <span className="absolute top-4 end-4 bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                  {isRtl ? `٪${discount.toLocaleString('fa-IR')}` : `${discount}%`}
                </span>
              )}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => (i + (isRtl ? 1 : -1) + allImages.length) % allImages.length)}
                    className="absolute top-1/2 -translate-y-1/2 start-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    {isRtl ? <ChevronLeft size={20} /> : <ChevronLeft size={20} />}
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => (i + (isRtl ? -1 : 1) + allImages.length) % allImages.length)}
                    className="absolute top-1/2 -translate-y-1/2 end-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    {isRtl ? <ChevronRight size={20} /> : <ChevronRight size={20} />}
                  </button>
                </>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex items-center gap-2" role="list">
                <button
                   className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors flex-shrink-0 bg-gray-50 hover:bg-pink-50"
                   onClick={() => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)}>
                  {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                <div className="flex gap-3 overflow-x-auto flex-1 no-scrollbar py-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      role="listitem"
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 rounded-[1rem] overflow-hidden border-2 transition-all flex-shrink-0 ${
                        i === activeImg ? 'border-pink-400 p-0.5' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover rounded-[0.8rem]" />
                    </button>
                  ))}
                </div>

                <button
                   className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors flex-shrink-0 bg-gray-50 hover:bg-pink-50"
                   onClick={() => setActiveImg((i) => (i + 1) % allImages.length)}>
                  {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col relative">

            {/* Action Buttons */}
            <div className="absolute top-0 end-0 flex gap-2">
               <button
                 onClick={() => toggleWishlist(product)}
                 className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-pink-50 text-gray-500 hover:text-pink-500 transition-colors shadow-sm"
               >
                 <Heart size={18} className={isInWishlist ? "fill-pink-500 text-pink-500" : ""} />
               </button>
               <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-pink-50 text-gray-500 hover:text-pink-500 transition-colors shadow-sm">
                 <Share2 size={18} />
               </button>
            </div>

            {/* Title & Rating */}
            <div className="pe-24 mb-6">
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>{brand}</p>
              <h1 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">
                {name}
              </h1>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size={16} />
                <span className="text-sm text-gray-500 mt-1">
                  ({isRtl ? product.reviewCount.toLocaleString('fa-IR') : product.reviewCount} {t('product.reviews_label')})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1 mb-8">
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-gray-900 tracking-tight">
                  {isRtl ? formatToman(product.price).replace(/\s*تومان/, '') : product.price.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-gray-500">
                  {isRtl ? 'تومان' : 'Toman'}
                </span>
                {discount > 0 && (
                  <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-lg text-xs font-bold ms-2 border border-red-100">
                    {isRtl ? `٪${discount.toLocaleString('fa-IR')} تخفیف` : `${discount}% OFF`}
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {description}
            </p>

            {/* Colors */}
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-800 mb-3">{t('product.color_select')}</p>
              <div className="flex gap-6">
                {colors.map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setSelectedColor(color.name)}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center p-0.5 transition-all ${
                      selectedColor === color.name ? 'border-2 border-gray-900' : 'border border-gray-200'
                    }`}>
                      <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                    </div>
                    <span className={`text-xs ${selectedColor === color.name ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1" />

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-between w-28 h-12 px-2 bg-gray-50 rounded-2xl border border-gray-100">
                <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-600 transition-colors"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus size={16} />
                </button>
                <span className="font-bold text-gray-800">{isRtl ? qty.toLocaleString('fa-IR') : qty}</span>
                <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-600 transition-colors"
                        onClick={() => setQty((q) => q + 1)}>
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all shadow-md ${
                  added ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-900 hover:bg-black'
                } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {added ? (
                  <><Check size={20} /> {t('product.added_to_cart')}</>
                ) : (
                  <><ShoppingBag size={20} /> {product.inStock ? t('product.add_to_cart') : t('product.out_of_stock')}</>
                )}
              </button>
            </div>

            {/* Trust Features */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div className="flex flex-col items-center text-center gap-2 bg-gray-50 p-3 rounded-2xl">
                <RefreshCw size={20} className="text-gray-700" />
                <span className="text-xs font-semibold text-gray-600">{t('home.easy_return')}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 bg-gray-50 p-3 rounded-2xl">
                <ShieldCheck size={20} className="text-gray-700" />
                <span className="text-xs font-semibold text-gray-600">{t('home.auth_guarantee')}</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 bg-gray-50 p-3 rounded-2xl">
                <Truck size={20} className="text-gray-700" />
                <span className="text-xs font-semibold text-gray-600">{t('home.fast_delivery')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-start border-b border-gray-100 px-6 lg:px-10" role="tablist">
          {[
            { id: 'description', label: t('product.description') },
            { id: 'specs',       label: t('product.specs') },
            { id: 'reviews',     label: `${t('product.reviews_label')} (${isRtl ? product.reviewCount.toLocaleString('fa-IR') : product.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-5 px-6 text-sm font-bold transition-colors relative ${
                activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gray-900 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
        <div className="p-6 lg:p-10" role="tabpanel">
          {activeTab === 'description' && (
            <p className="text-sm leading-8 text-gray-700 text-justify">
              {description}
            </p>
          )}
          {activeTab === 'specs' && (
             <div className="max-w-2xl">
              <dl className="space-y-4">
                {Object.entries(specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-sm py-3 border-b border-gray-50 last:border-0">
                    <dt className="font-semibold text-gray-500">{key}</dt>
                    <dd className="text-gray-800">{val}</dd>
                  </div>
                ))}
              </dl>
             </div>
          )}
          {activeTab === 'reviews' && (
             <p className="text-sm text-gray-500 text-center py-10">
               {t('filter.no_results')}
             </p>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-6 pe-2">
            <h2 id="related-title" className="text-lg font-black text-gray-800">{t('product.related')}</h2>
            <Heart size={16} className="text-pink-500 fill-pink-500" />
          </div>
          <div className="products-grid stagger-children">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
