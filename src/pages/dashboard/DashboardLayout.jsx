import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { User, Heart, Package, LogOut, Store } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function DashboardLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', end: true, label: 'پروفایل کاربری', icon: User },
    { to: '/dashboard/wishlist', label: 'علاقه‌مندی‌ها', icon: Heart },
    { to: '/dashboard/orders', label: 'سفارشات من', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-[#fdf4f8]" dir="rtl">
      
      {/* Simple Top Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-2xl font-black text-pink-600 tracking-tighter pt-1" style={{ fontFamily: 'Lalezar, system-ui, sans-serif' }}>پنل کاربری گل آرا</span>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-pink-600 transition-colors"
          >
            بازگشت به فروشگاه
            <Store size={16} />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Rounded Sidebar */}
          <aside className="w-full md:w-72 flex-shrink-0 animate-slide-in-right">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 sticky top-24 hover:shadow-md transition-shadow duration-500">
              <div className="flex flex-col items-center text-center mb-6 group">
                <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl bg-pink-50 mb-3 object-cover shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" />
                <p className="font-black text-gray-800 text-lg group-hover:text-pink-600 transition-colors">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-pink-100 to-transparent mb-6" />

              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] ${
                        isActive 
                          ? 'bg-pink-500 text-white shadow-md shadow-pink-200 translate-x-[-4px]' 
                          : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={18} className={isActive ? 'animate-pulse' : ''} />
                        {item.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  خروج از حساب
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div key={location.pathname} className="animate-fade-in-up" style={{ animationFillMode: 'both' }}>
              <Outlet />
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
