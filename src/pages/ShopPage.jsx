import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import FilterPanel from '../components/FilterPanel';
import ProductList from '../components/ProductList';
import { useProducts } from '../hooks/useProducts';

export default function ShopPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const products = useProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--color-text)' }}>
          فروشگاه
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {products.length.toLocaleString('fa-IR')} محصول آرایشی و بهداشتی
        </p>
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setFilterOpen(true)}
          className="btn-ghost text-sm flex items-center gap-2"
          aria-expanded={filterOpen}
          aria-controls="filter-panel"
        >
          <SlidersHorizontal size={16} />
          فیلتر و مرتب‌سازی
        </button>
      </div>

      {/* Mobile filter overlay */}
      {filterOpen && (
        <>
          <div
            className="drawer-overlay lg:hidden"
            onClick={() => setFilterOpen(false)}
            aria-hidden="true"
          />
          <div
            id="filter-panel"
            className="fixed inset-y-0 right-0 w-80 bg-white z-50 overflow-y-auto p-4 shadow-2xl lg:hidden animate-slide-in-left"
            role="dialog"
            aria-modal="true"
            aria-label="فیلترها"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">فیلترها</span>
              <button onClick={() => setFilterOpen(false)} className="p-2 rounded-xl hover:bg-pink-50"
                      aria-label="بستن فیلترها">
                <X size={18} />
              </button>
            </div>
            <FilterPanel resultCount={products.length} />
          </div>
        </>
      )}

      {/* Layout: sidebar + grid */}
      <div className="flex gap-6 items-start">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <FilterPanel resultCount={products.length} />
        </div>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
