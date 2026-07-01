// Zustand filter + search store
import { create } from 'zustand';

const useFilterStore = create((set) => ({
  search: '',
  category: 'all',
  priceMin: 0,
  priceMax: 1000000,
  minRating: 0,
  sort: 'default',

  setSearch:    (v) => set({ search: v }),
  setCategory:  (v) => set({ category: v }),
  setPriceMin:  (v) => set({ priceMin: v }),
  setPriceMax:  (v) => set({ priceMax: v }),
  setMinRating: (v) => set({ minRating: v }),
  setSort:      (v) => set({ sort: v }),
  reset: () =>
    set({ search: '', category: 'all', priceMin: 0, priceMax: 1000000, minRating: 0, sort: 'default' }),
}));

export default useFilterStore;
