import { Heart } from 'lucide-react';
import useWishlistStore from '../../store/wishlistStore';
import ProductCard from '../../components/ProductCard';

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-pink-50 min-h-[500px]">
      <h1 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
        <Heart size={24} className="text-pink-500 fill-pink-500" />
        لیست علاقه‌مندی‌ها
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-300 mb-4">
            <Heart size={32} />
          </div>
          <p className="text-gray-500 font-bold">لیست علاقه‌مندی‌های شما خالی است.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
