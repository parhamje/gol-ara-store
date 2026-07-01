import { PackageOpen } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';

export default function ProductList() {
  const products = useProducts();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <PackageOpen size={56} className="mb-4 opacity-30" style={{ color: 'var(--color-primary)' }} />
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
          محصولی یافت نشد
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          فیلترها را تغییر دهید یا عبارت جستجو را اصلاح کنید
        </p>
      </div>
    );
  }

  return (
    <div className="products-grid stagger-children">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
