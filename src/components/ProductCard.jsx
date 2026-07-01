import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import { formatToman, discountPercent } from '../utils/formatCurrency';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = (e) => {
    e.preventDefault(); // Don't navigate
    if (!product.inStock) return;
    addItem(product);
    toast.success('محصول به سبد خرید اضافه شد!', { icon: '🛍️' });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = discountPercent(product.originalPrice, product.price);

  return (
    <article className="product-card group" aria-label={product.name}>
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges overlay */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
          {discount > 0 && (
            <span className="discount-badge">٪{discount.toLocaleString('fa-IR')} تخفیف</span>
          )}
          {product.tags.filter(t => t !== 'ناموجود').map((tag) => (
            <span key={tag} className="badge badge-pink text-xs">{tag}</span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-2 left-2 p-2 bg-white/80 hover:bg-white rounded-full text-pink-500 shadow-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
          aria-label="افزودن به علاقه‌مندی"
        >
          <Heart size={16} className={isInWishlist ? "fill-pink-500 text-pink-500" : ""} />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="badge badge-red text-sm">ناموجود</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        {/* Brand */}
        <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
          {product.brand}
        </p>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-pink-600 transition-colors"
              style={{ color: 'var(--color-text)' }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} size={13} />
          <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
            ({product.reviewCount.toLocaleString('fa-IR')})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between mt-1 gap-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="price-original text-xs">
                {formatToman(product.originalPrice)}
              </span>
            )}
            <span className="price-main text-base">
              {formatToman(product.price)}
            </span>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`افزودن ${product.name} به سبد خرید`}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0
              ${added ? 'bg-green-500' : 'btn-primary p-0'}
              ${!product.inStock ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {added
              ? <Check size={16} className="text-white" />
              : <ShoppingBag size={16} className="text-white" />
            }
          </button>
        </div>
      </div>
    </article>
  );
}
