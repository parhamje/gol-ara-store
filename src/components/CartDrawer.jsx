import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useCartDrawerStore from '../store/cartDrawerStore';
import { formatToman } from '../utils/formatCurrency';
import { useTranslation } from 'react-i18next';

export default function CartDrawer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const items      = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty  = useCartStore((s) => s.updateQuantity);
  const totalPrice = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  const open        = useCartDrawerStore((s) => s.open);
  const closeDrawer = useCartDrawerStore((s) => s.closeDrawer);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="drawer-overlay"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      <div
        className="drawer-panel flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={t('cart.title')}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: 'var(--color-primary)' }} />
            <h2 className="font-bold text-base">{t('cart.title')}</h2>
            {items.length > 0 && (
              <span className="badge badge-pink text-xs">
                {isRtl ? items.length.toLocaleString('fa-IR') : items.length} {t('cart.items', { count: isRtl ? items.length.toLocaleString('fa-IR') : items.length }).split(' ').slice(1).join(' ')}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 rounded-xl hover:bg-pink-50 transition-colors"
            aria-label={t('cart.title')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ShoppingBag size={48} className="mb-4 opacity-20" style={{ color: 'var(--color-primary)' }} />
              <p className="font-semibold text-sm mb-1">{t('cart.empty')}</p>
              <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                {t('cart.empty_sub')}
              </p>
              <button
                onClick={closeDrawer}
                className="btn-ghost mt-5 text-sm px-4 py-2"
              >
                {t('cart.continue_shopping')}
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => {
                const productName = isRtl ? product.name : product.name_en;
                const productBrand = isRtl ? product.brand : product.brand_en;
                return (
                  <li key={product.id} className="flex gap-3 animate-fade-in">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={closeDrawer}
                      className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-gray-50"
                    >
                      <img
                        src={product.image}
                        alt={productName}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold line-clamp-2 mb-1" style={{ color: 'var(--color-text)' }}>
                        {productName}
                      </p>
                      <p className="text-xs mb-2" style={{ color: 'var(--color-muted)' }}>
                        {productBrand}
                      </p>
                      <p className="price-main text-sm">{isRtl ? formatToman(product.price) : `${product.price.toLocaleString()} T`}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(product.id, quantity - 1)}
                          aria-label="-"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">
                          {isRtl ? quantity.toLocaleString('fa-IR') : quantity}
                        </span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(product.id, quantity + 1)}
                          aria-label="+"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          className="mr-auto p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          onClick={() => removeItem(product.id)}
                          style={{ color: '#ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-pink-100 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
                {t('cart.total')}
              </span>
              <span className="price-main text-lg">{isRtl ? formatToman(totalPrice) : `${totalPrice.toLocaleString()} T`}</span>
            </div>
            <Link
              to="/checkout"
              onClick={closeDrawer}
              className="btn-primary w-full text-center"
            >
              {t('cart.checkout')}
            </Link>
            <Link
              to="/cart"
              onClick={closeDrawer}
              className="btn-ghost w-full text-center text-sm"
            >
              {t('cart.title')}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
