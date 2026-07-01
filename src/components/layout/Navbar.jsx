import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Tag, ChevronDown, Flower2 } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useFilterStore from '../../store/filterStore';
import useAuthStore from '../../store/authStore';
import { useDebounce } from '../../hooks/useDebounce';

// A small store to toggle the cart drawer (lifted to window for simplicity)
export const cartDrawerEvents = {
  open: () => window.dispatchEvent(new Event('open-cart-drawer')),
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const setSearch = useFilterStore((s) => s.setSearch);
  const debouncedSearch = useDebounce(localSearch, 300);

  // Sync debounced search to filter store
  useState(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(localSearch);
    navigate('/shop');
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#fcf1f5]/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo (Right) */}
          <Link to="/" className="flex items-center flex-shrink-0 gap-2">
            <div className="w-11 h-11 rounded-full overflow-hidden shadow-sm border border-pink-100 bg-white flex items-center justify-center">
              <img src="/logo.png" alt="لوگو گل آرا" className="w-[120%] h-[120%] object-cover mix-blend-multiply" />
            </div>
            <span className="text-3xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-400 pt-1" style={{ fontFamily: 'Lalezar, system-ui, sans-serif' }}>
              گل آرا
            </span>
          </Link>

          {/* Nav links (Center) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
            <Link to="/" className="text-sm font-bold text-gray-700 hover:text-pink-500 transition-colors">
              خانه
            </Link>
            <Link to="/shop" className="text-sm font-bold text-gray-700 hover:text-pink-500 transition-colors flex items-center gap-1">
              فروشگاه
              <ChevronDown size={14} className="text-gray-400 mt-0.5" />
            </Link>
            <Link to="/shop" className="text-sm font-bold text-gray-700 hover:text-pink-500 transition-colors">
              برندها
            </Link>
            <Link to="/shop" className="text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1">
              <Tag size={14} className="fill-pink-500" />
              تخفیف‌ها
            </Link>
            <Link to="/" className="text-sm font-bold text-gray-700 hover:text-pink-500 transition-colors">
              تماس با ما
            </Link>
          </nav>

          {/* Actions & Search (Left) */}
          <div className="flex items-center gap-4">
            
            {/* Desktop search */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
              <div className="relative w-64">
                <Search size={18} strokeWidth={1.5} className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400 pointer-events-none" />
                <input
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-transparent rounded-full focus:bg-white focus:border-pink-200 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                  type="text"
                  placeholder="جستجو در محصولات..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  aria-label="جستجو"
                />
              </div>
            </form>

            <div className="flex items-center gap-2 pr-4 border-r border-gray-100">
              {/* Mobile search toggle */}
              <button className="md:hidden p-2 text-gray-500 hover:text-pink-500 transition-colors"
                      onClick={() => setSearchOpen((v) => !v)} aria-label="جستجو">
                <Search size={22} strokeWidth={1.5} />
              </button>

              {/* User button */}
              <Link to={useAuthStore((s) => s.isAuthenticated) ? (useAuthStore((s) => s.user?.role) === 'admin' ? '/admin' : '/dashboard') : '/login'} 
                    className="hidden sm:flex p-2 text-gray-500 hover:text-pink-500 transition-colors">
                <User size={22} strokeWidth={1.5} />
              </Link>

              {/* Cart button */}
              <button
                onClick={cartDrawerEvents.open}
                className="relative p-2 text-gray-500 hover:text-pink-500 transition-colors"
                aria-label={`سبد خرید — ${totalItems} محصول`}
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold shadow-sm">
                    {totalItems.toLocaleString('fa-IR')}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 text-gray-500 hover:text-pink-500 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="منو"
              >
                {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="md:hidden pb-4 animate-fade-in">
            <div className="relative">
              <Search size={16} className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
              <input
                autoFocus
                className="w-full pl-10 pr-4 py-3 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-pink-300 outline-none transition-all"
                type="text"
                placeholder="جستجو در محصولات..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          </form>
        )}

        {/* Mobile nav menu */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-pink-50 py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors">
                خانه
              </Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors">
                فروشگاه
              </Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors">
                برندها
              </Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-2xl text-sm font-bold text-pink-500 bg-pink-50 flex items-center gap-2 transition-colors">
                <Tag size={16} className="fill-pink-500" />
                تخفیف‌ها
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
