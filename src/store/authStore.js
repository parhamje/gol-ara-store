import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        // Mock authentication logic
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (email === 'admin@golara.ir' && password === 'admin') {
              const adminUser = {
                id: '1',
                name: 'مدیر کل',
                email,
                role: 'admin',
                avatar: import.meta.env.BASE_URL + 'images/default-avatar.svg'
              };
              set({ user: adminUser, isAuthenticated: true });
              resolve(adminUser);
            } else if (email && password) {
              const normalUser = {
                id: '2',
                name: 'کاربر تستی',
                email,
                role: 'user',
                avatar: import.meta.env.BASE_URL + 'images/default-avatar.svg'
              };
              set({ user: normalUser, isAuthenticated: true });
              resolve(normalUser);
            } else {
              reject(new Error('ایمیل یا رمز عبور نامعتبر است.'));
            }
          }, 600); // simulate network delay
        });
      },

      register: (name, email, password) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (name && email && password) {
              const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                email,
                role: 'user',
                avatar: import.meta.env.BASE_URL + 'images/default-avatar.svg'
              };
              set({ user: newUser, isAuthenticated: true });
              resolve(newUser);
            } else {
              reject(new Error('لطفاً تمامی فیلدها را پر کنید.'));
            }
          }, 600);
        });
      },

      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store', // saved in local storage
    }
  )
);

export default useAuthStore;
