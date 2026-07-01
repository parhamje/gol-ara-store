import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { formatToman } from '../utils/formatCurrency';

export default function CartDrawer() {
  const items        = useCartStore((s) => s.items);
  const removeItem   = useCartStore((s) => s.removeItem);
  const updateQty    = useCartStore((s) => s.updateQuantity);
  const totalPrice   = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  // Listen for open event dispatched by Navbar
  const [open, setOpen] = useCartDrawerState();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-cart-drawer', handler);
    return () => window.removeEventListener('open-cart-drawer', handler);
  }, [setOpen]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="drawer-overlay"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="drawer-panel flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: 'var(--color-primary)' }} />
            <h2 className="font-bold text-base">سبد خرید</h2>
            {items.length > 0 && (
              <span className="badge badge-pink text-xs">
                {items.length.toLocaleString('fa-IR')} محصول
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl hover:bg-pink-50 transition-colors"
            aria-label="بستن سبد خرید"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag size={48} className="mb-4 opacity-20" style={{ color: 'var(--color-primary)' }} />
              <p className="font-semibold text-sm mb-1">سبد خرید خالی است</p>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                محصولات مورد علاقه‌تان را اضافه کنید
              </p>
              <button
                onClick={() => setOpen(false)}
                className="btn-ghost mt-5 text-sm px-4 py-2"
              >
                ادامه خرید
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-3 animate-fade-in">
                  {/* Thumbnail */}
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setOpen(false)}
                    className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-50"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold line-clamp-2 mb-1" style={{ color: 'var(--color-text)' }}>
                      {product.name}
                    </p>
                    <p className="text-xs mb-2" style={{ color: 'var(--color-muted)' }}>
                      {product.brand}
                    </p>
                    <p className="price-main text-sm">{formatToman(product.price)}</p>

                    {/* Qty + remove */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(product.id, quantity - 1)}
                        aria-label="کاهش تعداد"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-bold w-5 text-center">
                        {quantity.toLocaleString('fa-IR')}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(product.id, quantity + 1)}
                        aria-label="افزایش تعداد"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        className="mr-auto p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        onClick={() => removeItem(product.id)}
                        aria-label={`حذف ${product.name}`}
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-pink-100 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
                جمع کل
              </span>
              <span className="price-main text-lg">{formatToman(totalPrice)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              className="btn-primary w-full text-center"
            >
              پرداخت
            </Link>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="btn-ghost w-full text-center text-sm"
            >
              مشاهده سبد خرید
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

// Tiny internal state manager for the drawer open/close
import { useState as useDrawerState } from 'react';
let _setOpen;
function useCartDrawerState() {
  const [open, setOpen] = useDrawerState(false);
  _setOpen = setOpen;
  return [open, setOpen];
}
