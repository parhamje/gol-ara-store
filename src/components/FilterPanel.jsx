import { SlidersHorizontal, RotateCcw, ChevronDown } from 'lucide-react';
import useFilterStore from '../store/filterStore';
import { categories } from '../data/products';
import { useTranslation } from 'react-i18next';

export default function FilterPanel({ resultCount }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const {
    category, setCategory,
    priceMin, priceMax, setPriceMin, setPriceMax,
    minRating, setMinRating,
    sort, setSort,
    reset,
  } = useFilterStore();

  const SORT_OPTIONS = [
    { value: 'default',   label: t('filter.sort_options.default') },
    { value: 'price_asc', label: t('filter.sort_options.price_asc') },
    { value: 'price_desc',label: t('filter.sort_options.price_desc') },
    { value: 'rating',    label: t('filter.sort_options.rating') },
    { value: 'newest',    label: t('filter.sort_options.newest') },
  ];

  const RATINGS = [
    { value: 0,   label: isRtl ? 'همه' : 'All' },
    { value: 4,   label: isRtl ? '۴+ ستاره' : '4+ Stars' },
    { value: 4.5, label: isRtl ? '۴.۵+ ستاره' : '4.5+ Stars' },
  ];

  const hasActiveFilter =
    category !== 'all' || priceMin !== 0 || priceMax !== 1000000 || minRating > 0 || sort !== 'default';

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="rounded-2xl p-5 sticky top-20"
           style={{ background: 'white', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(212,87,138,.08)' }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} style={{ color: 'var(--color-primary)' }} />
            <span className="font-semibold text-sm">{t('filter.title')}</span>
          </div>
          {hasActiveFilter && (
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs hover:text-pink-600 transition-colors"
              style={{ color: 'var(--color-muted)' }}
            >
              <RotateCcw size={12} />
              {t('filter.reset')}
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-xs mb-5 px-3 py-2 rounded-lg"
           style={{ background: 'rgba(212,87,138,.06)', color: 'var(--color-primary)' }}>
          {t('filter.results', { count: isRtl ? resultCount.toLocaleString('fa-IR') : resultCount })}
        </p>

        {/* Sort */}
        <section className="mb-5">
          <label className="block text-xs font-semibold mb-2 uppercase tracking-wide"
                 style={{ color: 'var(--color-muted)' }}>
            {t('filter.sort')}
          </label>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-base text-sm appearance-none pe-8"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute top-1/2 -translate-y-1/2 left-3 pointer-events-none"
                         style={{ color: 'var(--color-muted)' }} />
          </div>
        </section>

        {/* Category */}
        <section className="mb-5">
          <p className="text-xs font-semibold mb-2 uppercase tracking-wide"
             style={{ color: 'var(--color-muted)' }}>
            {t('filter.category')}
          </p>
          <div className="flex flex-col gap-1">
            {categories.map((cat) => {
              const label = isRtl ? cat.label : cat.label_en;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`text-right px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    category === cat.id
                      ? 'text-white'
                      : 'hover:bg-pink-50'
                  }`}
                  style={
                    category === cat.id
                      ? { background: 'var(--color-primary)' }
                      : { color: 'var(--color-text)' }
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Price Range */}
        <section className="mb-5">
          <p className="text-xs font-semibold mb-3 uppercase tracking-wide"
             style={{ color: 'var(--color-muted)' }}>
            {t('filter.price_range')}
          </p>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">{isRtl ? 'از' : 'From'}</label>
              <input
                type="number"
                className="input-base text-sm py-2"
                value={priceMin}
                min={0}
                max={priceMax}
                step={10000}
                onChange={(e) => setPriceMin(Number(e.target.value))}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">{isRtl ? 'تا' : 'To'}</label>
              <input
                type="number"
                className="input-base text-sm py-2"
                value={priceMax}
                min={priceMin}
                max={2000000}
                step={10000}
                onChange={(e) => setPriceMax(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
            <span>{priceMin.toLocaleString('fa-IR')}</span>
            <span>{priceMax.toLocaleString('fa-IR')}</span>
          </div>
        </section>

        {/* Rating */}
        <section>
          <p className="text-xs font-semibold mb-2 uppercase tracking-wide"
             style={{ color: 'var(--color-muted)' }}>
            {t('filter.min_rating')}
          </p>
          <div className="flex flex-col gap-1">
            {RATINGS.map((r) => (
              <button
                key={r.value}
                onClick={() => setMinRating(r.value)}
                className={`text-right px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  minRating === r.value ? 'text-white' : 'hover:bg-pink-50'
                }`}
                style={
                  minRating === r.value
                    ? { background: 'var(--color-primary)' }
                    : { color: 'var(--color-text)' }
                }
              >
                {r.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
