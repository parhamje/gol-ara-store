import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Settings, LogOut, Store, Menu, X } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function AdminLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', end: true, label: 'داشبورد', icon: LayoutDashboard },
    { to: '/admin/products', label: 'مدیریت محصولات', icon: Package },
    { to: '/admin/users', label: 'کاربران', icon: Users },
    { to: '/admin/settings', label: 'تنظیمات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden" dir="rtl">
      
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30 shadow-sm">
          <span className="text-xl font-black text-gray-800 hidden md:block" style={{ fontFamily: 'Lalezar, system-ui, sans-serif' }}>مدیریت گل آرا</span>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-white border-l border-gray-200 flex flex-col fixed inset-y-0 right-0 z-50 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full md:translate-x-0 md:shadow-none'}
      `}>
        <div className="h-20 flex items-center justify-center border-b border-gray-200 bg-white gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-pink-100 flex items-center justify-center">
            <img src="/logo.png" alt="لوگو" className="w-[120%] h-[120%] object-cover mix-blend-multiply" />
          </div>
          <span className="text-3xl font-black pt-1 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-400" style={{ fontFamily: 'Lalezar, system-ui, sans-serif' }}>گل آرا</span>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden absolute left-4 p-1 text-white/80 hover:text-white hover:bg-white/20 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <img src={user?.avatar} alt={user?.name} className="w-12 h-12 rounded-full bg-gray-100" />
            <div>
              <p className="font-bold text-sm text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">مدیر سیستم</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] ${
                    isActive 
                      ? 'bg-gray-800 text-white shadow-md md:translate-x-[-4px]' 
                      : 'text-gray-600 hover:bg-gray-100'
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
        </div>

        <div className="mt-auto p-6 border-t border-gray-100">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Store size={18} />
            مشاهده فروشگاه
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            خروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 md:mr-64 p-4 pt-24 md:p-8 md:pt-8">
        <div key={location.pathname} className="animate-fade-in-up" style={{ animationFillMode: 'both' }}>
          <Outlet />
        </div>
      </main>

    </div>
  );
}
