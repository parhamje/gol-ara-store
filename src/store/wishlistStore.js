import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (product) => {
        const { items } = get();
        const exists = items.some((i) => i.id === product.id);
        if (exists) {
          set({ items: items.filter((i) => i.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },

      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((i) => i.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-store',
    }
  )
);

export default useWishlistStore;
