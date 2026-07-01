import { useMemo } from 'react';
import { products } from '../data/products';
import useFilterStore from '../store/filterStore';

export function useProducts() {
  const { search, category, priceMin, priceMax, minRating, sort } =
    useFilterStore();

  return useMemo(() => {
    let result = [...products];

    // Search filter (name, brand, tags)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= priceMin && p.price <= priceMax
    );

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sort
    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }

    return result;
  }, [search, category, priceMin, priceMax, minRating, sort]);
}
