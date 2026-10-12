import { create } from 'zustand';

const useCartDrawerStore = create((set) => ({
  open: false,
  openDrawer: () => set({ open: true }),
  closeDrawer: () => set({ open: false }),
  toggleDrawer: () => set((s) => ({ open: !s.open })),
}));

export default useCartDrawerStore;
