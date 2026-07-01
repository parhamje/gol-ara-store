import { Link } from 'react-router-dom';
import { Heart, Camera, Phone, Mail, Send, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-pink-100 bg-[#fdf4f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 stagger-children">
          
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-pink-600 mb-4">گل آرا سنتر</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              ارائه‌دهنده لوکس‌ترین و باکیفیت‌ترین محصولات آرایشی و مراقبت از پوست. زیبایی طبیعی خود را با محصولات اورجینال ما دوچندان کنید.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="اینستاگرام"
                 className="w-10 h-10 rounded-xl bg-white shadow-sm border border-pink-50 flex items-center justify-center transition-all hover:bg-pink-50 hover:text-pink-600 text-gray-400">
                <Camera size={18} />
              </a>
              <a href="tel:02100000000" aria-label="تلفن"
                 className="w-10 h-10 rounded-xl bg-white shadow-sm border border-pink-50 flex items-center justify-center transition-all hover:bg-pink-50 hover:text-pink-600 text-gray-400">
                <Phone size={18} />
              </a>
              <a href="mailto:info@medino.ir" aria-label="ایمیل"
                 className="w-10 h-10 rounded-xl bg-white shadow-sm border border-pink-50 flex items-center justify-center transition-all hover:bg-pink-50 hover:text-pink-600 text-gray-400">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-gray-800 mb-5 relative inline-block">
              دسترسی سریع
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-pink-200 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              {[
                { to: '/',     label: 'صفحه اصلی' },
                { to: '/shop', label: 'فروشگاه'   },
                { to: '/dashboard/orders', label: 'پیگیری سفارشات' },
                { to: '/login', label: 'ورود / ثبت‌نام' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-pink-500 hover:pr-2 transition-all flex items-center gap-1">
                    <span className="text-pink-300 text-xs">◀</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-bold text-gray-800 mb-5 relative inline-block">
              تماس با ما
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-pink-200 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-pink-400 shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، نرسیده به میدان ونک، مجتمع تجاری گل آرا، طبقه همکف</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-pink-400 shrink-0" />
                <span dir="ltr">۰۲۱ - ۱۲۳۴ ۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-pink-400 shrink-0" />
                <span>info@medino-center.ir</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-bold text-gray-800 mb-5 relative inline-block">
              خبرنامه گل آرا
              <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-pink-200 rounded-full"></span>
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              از جدیدترین تخفیف‌ها و محصولات زودتر از بقیه باخبر شوید!
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید..." 
                className="w-full bg-white border border-pink-100 rounded-2xl py-3 pr-4 pl-12 text-sm outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all text-left"
                dir="ltr"
              />
              <button 
                type="submit"
                className="absolute left-1.5 w-9 h-9 rounded-xl bg-pink-500 hover:bg-pink-600 flex items-center justify-center text-white transition-colors"
                aria-label="عضویت در خبرنامه"
              >
                <Send size={16} className="mr-1" />
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-500">
            © ۱۴۰۳ گل آرا سنتر. تمامی حقوق مادی و معنوی محفوظ است.
          </p>
          <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-pink-50">
            طراحی شده با <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" /> توسط 
            <a 
              href="https://parhamjenani.ir" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-400 hover:opacity-80 transition-opacity pt-1"
              style={{ fontFamily: 'Lalezar, system-ui, sans-serif' }}
            >
              پرهام جنانی
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
