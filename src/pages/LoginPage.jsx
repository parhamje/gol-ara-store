import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, Lock, Loader2, Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import useAuthStore from '../store/authStore';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@golara.ir');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const user = await login(email, password);
        toast.success(`${isRtl ? 'خوش آمدید' : 'Welcome'}, ${user.name}!`, { icon: '👋' });
        if (user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        const user = await register(name, email, password);
        toast.success(`${isRtl ? 'ثبت نام موفقیت آمیز بود' : 'Registration successful'}, ${user.name}!`, { icon: '🎉' });
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = (role) => {
    setIsLogin(true);
    if (role === 'admin') {
      setEmail('admin@golara.ir');
      setPassword('admin');
    } else {
      setEmail('user@golara.ir');
      setPassword('user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 bg-[#fcf1f5]">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-sm border border-pink-50 p-8 animate-fade-in-up">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-800 mb-2">
            {isLogin ? (isRtl ? 'ورود به حساب کاربری' : 'Login to Your Account') : (isRtl ? 'ثبت نام در گل آرا سنتر' : 'Register at Gol Ara Center')}
          </h1>
          <p className="text-sm text-gray-500">
            {isLogin
              ? (isRtl ? 'برای ادامه، لطفاً اطلاعات خود را وارد کنید.' : 'Please enter your credentials to continue.')
              : (isRtl ? 'برای ایجاد حساب کاربری، اطلاعات زیر را تکمیل کنید.' : 'Fill in the form below to create your account.')}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-6 flex items-center gap-2 animate-scale-in">
            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="name">
                {isRtl ? 'نام و نام خانوادگی' : 'Full Name'}
              </label>
              <div className="relative">
                <User size={18} className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  required={!isLogin}
                  className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-pink-300 outline-none transition-all"
                  placeholder={isRtl ? 'مثال: سارا محمدی' : 'e.g. Sara Mohammadi'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="email">
              {isRtl ? 'ایمیل' : 'Email'}
            </label>
            <div className="relative">
              <Mail size={18} className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
              <input
                id="email"
                type="email"
                required
                dir="ltr"
                className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-pink-300 outline-none transition-all text-left"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5" htmlFor="password">
              {isRtl ? 'رمز عبور' : 'Password'}
            </label>
            <div className="relative">
              <Lock size={18} className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400" />
              <input
                id="password"
                type="password"
                required
                dir="ltr"
                className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-pink-300 outline-none transition-all text-left"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password || (!isLogin && !name)}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                {isLogin ? (isRtl ? 'ورود' : 'Login') : (isRtl ? 'ثبت نام' : 'Register')}
                {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors"
          >
            {isLogin
              ? (isRtl ? 'حساب کاربری ندارید؟ ثبت نام کنید' : "Don't have an account? Register")
              : (isRtl ? 'قبلاً ثبت نام کرده‌اید؟ وارد شوید' : 'Already have an account? Login')}
          </button>
        </div>

        {isLogin && (
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center font-bold mb-3">
              {isRtl ? 'دسترسی سریع (نسخه دمو):' : 'Quick Access (Demo):'}
            </p>
            <div className="flex gap-2">
              <button onClick={() => handleDemoFill('user')} className="flex-1 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-xl text-xs font-bold transition-colors">
                {isRtl ? 'ورود به عنوان کاربر' : 'Login as User'}
              </button>
              <button onClick={() => handleDemoFill('admin')} className="flex-1 py-2 bg-pink-50 text-pink-600 hover:bg-pink-100 rounded-xl text-xs font-bold transition-colors">
                {isRtl ? 'ورود به عنوان مدیر' : 'Login as Admin'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
