import { PackageOpen } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useTranslation } from 'react-i18next';

export default function ProductList() {
  const { t } = useTranslation();
  const products = useProducts();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
        <PackageOpen size={56} className="mb-4 opacity-30" style={{ color: 'var(--color-primary)' }} />
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
          {t('filter.no_results')}
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {t('filter.no_results_sub')}
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
