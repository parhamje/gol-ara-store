import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Check, ChevronLeft, ChevronRight, Share2, Heart, Truck, ShieldCheck, RefreshCw, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import { formatToman, discountPercent } from '../utils/formatCurrency';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('صورتی');
  
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product?.id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-lg font-semibold mb-4">محصول پیدا نشد</p>
        <Link to="/shop" className="btn-primary inline-flex">بازگشت به فروشگاه</Link>
      </div>
    );
  }

  const discount = discountPercent(product.originalPrice, product.price);
  const related  = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const allImages = product.images || [product.image];

  // Colors mock based on image
  const colors = [
    { name: 'قرمز', hex: '#dc2626' },
    { name: 'نود', hex: '#d4a373' },
    { name: 'صورتی', hex: '#f472b6' }
  ];

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6" style={{ background: '#fdf4f8' }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--color-muted)' }}
           aria-label="مسیر ناوبری">
        <Link to="/" className="hover:text-pink-500 transition-colors">خانه</Link>
        <ChevronLeft size={12} />
        <Link to="/shop" className="hover:text-pink-500 transition-colors">آرایش</Link>
        <ChevronLeft size={12} />
        <span className="hover:text-pink-500 transition-colors cursor-pointer">آرایش لب</span>
        <ChevronLeft size={12} />
        <span className="line-clamp-1" style={{ color: 'var(--color-text)' }}>{product.name}</span>
      </nav>

      {/* Main content Card */}
      <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-pink-50 mb-8 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Images (Right Column) ──────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-pink-50 relative group">
              <img
                src={allImages[activeImg]}
                alt={`${product.name} — تصویر ${activeImg + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                  {discount.toLocaleString('fa-IR')}%
                </span>
              )}
              {/* Prev/Next arrows - visible on hover */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((i) => (i + 1) % allImages.length)}
                    className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    aria-label="تصویر بعدی"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)}
                    className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    aria-label="تصویر قبلی"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2" role="list">
                <button
                   className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 transition-colors flex-shrink-0 bg-gray-50 hover:bg-pink-50"
                   onClick={() => setActiveImg((i) => (i - 1 + allImages.length) % allImages.length)}>
                  <ChevronRight size={16} />
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
                  <ChevronLeft size={16} />
                </button>
              </div>
            )}
          </div>

          {/* ── Info (Left Column) ────────────────────────────────── */}
          <div className="flex flex-col relative">
            
            {/* Action Buttons (Share / Like) */}
            <div className="absolute top-0 left-0 flex gap-2">
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
            <div className="pr-12 md:pr-0 mb-6">
              <h1 className="text-2xl md:text-3xl font-black mb-3 text-gray-800">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} size={16} />
                <span className="text-sm text-gray-500 mt-1">
                  ({product.reviewCount.toLocaleString('fa-IR')} نظر)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-pink-600">
                    {formatToman(product.price).replace(/\s*تومان/, '')}
                  </span>
                </div>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatToman(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="text-pink-600 font-bold text-lg pt-1">تومان</div>
              
              {discount > 0 && (
                <div className="mr-auto bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold self-start mt-1">
                  {discount.toLocaleString('fa-IR')}% تخفیف
                </div>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {product.description.split('.')[0]}. این محصول برای استفاده روزانه بسیار مناسب است و حس سبکی به شما می‌دهد.
            </p>

            {/* Colors */}
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-800 mb-3">انتخاب رنگ:</p>
              <div className="flex gap-6">
                {colors.map((color) => (
                  <div key={color.name} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setSelectedColor(color.name)}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-1 transition-all ${
                      selectedColor === color.name ? 'border-2 border-pink-300' : 'border-2 border-transparent'
                    }`}>
                      <div className="w-full h-full rounded-lg shadow-sm" style={{ backgroundColor: color.hex }} />
                    </div>
                    <span className={`text-xs ${selectedColor === color.name ? 'text-pink-600 font-semibold' : 'text-gray-500'}`}>
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1" />

            {/* Actions (Qty + Add to cart) */}
            <div className="flex items-center gap-4 mb-8">
              {/* Qty Selector */}
              <div className="flex items-center justify-between w-28 h-12 px-2 bg-gray-50 rounded-2xl border border-gray-100">
                <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-600 transition-colors"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus size={16} />
                </button>
                <span className="font-bold text-gray-800">{qty.toLocaleString('fa-IR')}</span>
                <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-600 transition-colors"
                        onClick={() => setQty((q) => q + 1)}>
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all shadow-md ${
                  added ? 'bg-green-500 hover:bg-green-600' : 'bg-pink-500 hover:bg-pink-600'
                } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {added ? (
                  <><Check size={20} /> به سبد خرید اضافه شد</>
                ) : (
                  <><ShoppingBag size={20} /> افزودن به سبد خرید</>
                )}
              </button>
            </div>

            {/* Trust Features */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <RefreshCw size={16} className="text-pink-400" />
                ۷ روز ضمانت بازگشت
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={16} className="text-pink-400" />
                ضمانت اصالت کالا
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Truck size={16} className="text-pink-400" />
                تحویل سریع
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-pink-50 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-start border-b border-gray-100 px-6 lg:px-10" role="tablist">
          {[
            { id: 'description', label: 'توضیحات' },
            { id: 'specs',       label: 'ویژگی‌ها' },
            { id: 'reviews',     label: `نظرات (${product.reviewCount.toLocaleString('fa-IR')})` },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-5 px-6 text-sm font-bold transition-colors relative ${
                activeTab === tab.id ? 'text-pink-600' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
        <div className="p-6 lg:p-10" role="tabpanel">
          {activeTab === 'description' && (
            <p className="text-sm leading-8 text-gray-700 text-justify">
              {product.description} این محصول با فرمولاسیونی خاص، لب‌هایی زیبا و جذاب برای شما به ارمغان می‌آورد. این محصول با بافت نرم و سبک، به راحتی روی لب‌ها پخش می‌شود و تا ساعت‌ها ماندگاری دارد. مناسب برای انواع پوست و استفاده روزانه.
            </p>
          )}
          {activeTab === 'specs' && (
             <div className="max-w-2xl">
              <dl className="space-y-4">
                {Object.entries(product.specs).map(([key, val]) => (
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
               بخش نظرات به زودی فعال می‌شود.
             </p>
          )}
        </div>
      </div>

      {/* ── Related Products ──────────────────────────── */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-6 pr-2">
            <h2 id="related-title" className="text-lg font-black text-gray-800">محصولات مرتبط</h2>
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
