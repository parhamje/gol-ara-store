import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { formatToman } from '../utils/formatCurrency';

export default function CartPage() {
  const items      = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty  = useCartStore((s) => s.updateQuantity);
  const clearCart  = useCartStore((s) => s.clearCart);
  const total      = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center animate-fade-in">
        <ShoppingBag size={72} className="mx-auto mb-5 opacity-20" style={{ color: 'var(--color-primary)' }} />
        <h1 className="text-2xl font-bold mb-2">سبد خرید خالی است</h1>
        <p className="mb-8 text-sm" style={{ color: 'var(--color-muted)' }}>
          محصولات مورد علاقه‌تان را به سبد اضافه کنید
        </p>
        <Link to="/shop" className="btn-primary inline-flex">
          <ArrowLeft size={16} />
          ادامه خرید
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-black mb-8" style={{ color: 'var(--color-text)' }}>
        سبد خرید
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 p-4 rounded-2xl animate-fade-in"
              style={{ background: 'white', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(212,87,138,.08)' }}
            >
              {/* Image */}
              <Link to={`/product/${product.id}`}
                    className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </Link>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{product.brand}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm mt-0.5 mb-2 hover:text-pink-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="price-main text-base">{formatToman(product.price)}</p>
              </div>

              {/* Quantity + remove */}
              <div className="flex flex-col items-end justify-between gap-2">
                <button
                  onClick={() => removeItem(product.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  style={{ color: '#ef4444' }}
                  aria-label={`حذف ${product.name}`}
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-2 p-1 rounded-xl border" style={{ borderColor: '#e9d5e8' }}>
                  <button className="qty-btn" onClick={() => updateQty(product.id, quantity - 1)} aria-label="کاهش">
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-bold w-6 text-center">{quantity.toLocaleString('fa-IR')}</span>
                  <button className="qty-btn" onClick={() => updateQty(product.id, quantity + 1)} aria-label="افزایش">
                    <Plus size={12} />
                  </button>
                </div>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                  {formatToman(product.price * quantity)}
                </p>
              </div>
            </div>
          ))}

          {/* Clear cart */}
          <div className="flex justify-end">
            <button
              onClick={clearCart}
              className="text-sm hover:text-red-600 transition-colors flex items-center gap-1"
              style={{ color: 'var(--color-muted)' }}
            >
              <Trash2 size={14} />
              پاک‌کردن سبد
            </button>
          </div>
        </div>

        {/* Order summary */}
        <aside
          className="rounded-2xl p-6 sticky top-20"
          style={{ background: 'white', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(212,87,138,.08)' }}
          aria-label="خلاصه سفارش"
        >
          <h2 className="font-bold text-base mb-5">خلاصه سفارش</h2>
          <div className="space-y-3 mb-5 text-sm">
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-muted)' }}>
                {items.length.toLocaleString('fa-IR')} محصول
              </span>
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
          <Link to="/checkout" className="btn-primary w-full text-center block mb-3">
            پرداخت
          </Link>
          <Link to="/shop" className="btn-ghost w-full text-center block text-sm">
            ادامه خرید
          </Link>
        </aside>
      </div>
    </div>
  );
}
