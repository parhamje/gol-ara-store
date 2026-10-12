import { Link } from 'react-router-dom';
import { Heart, Camera, Phone, Mail, Send, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  return (
    <footer className="mt-20 border-t border-pink-100 bg-[#fdf4f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 stagger-children">
          
          {/* Brand & About */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-black text-pink-600 mb-4">{t('footer.brand') || 'Gol Ara Center'}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {t('footer.about')}
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram"
                 className="w-10 h-10 rounded-xl bg-white shadow-sm border border-pink-50 flex items-center justify-center transition-all hover:bg-pink-50 hover:text-pink-600 text-gray-400">
                <Camera size={18} />
              </a>
              <a href="tel:02100000000" aria-label="Phone"
                 className="w-10 h-10 rounded-xl bg-white shadow-sm border border-pink-50 flex items-center justify-center transition-all hover:bg-pink-50 hover:text-pink-600 text-gray-400">
                <Phone size={18} />
              </a>
              <a href="mailto:info@medino.ir" aria-label="Email"
                 className="w-10 h-10 rounded-xl bg-white shadow-sm border border-pink-50 flex items-center justify-center transition-all hover:bg-pink-50 hover:text-pink-600 text-gray-400">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-gray-800 mb-5 relative inline-block">
              {t('footer.links')}
              <span className="absolute -bottom-2 end-0 w-1/2 h-1 bg-pink-200 rounded-full"></span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              {[
                { to: '/',     label: t('nav.home') },
                { to: '/shop', label: t('nav.shop') },
                { to: '/dashboard/orders', label: t('footer.track_orders') || 'Track Orders' },
                { to: '/login', label: t('footer.login') || 'Login / Register' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-pink-500 hover:pe-2 transition-all flex items-center gap-1">
                    <span className="text-pink-300 text-xs">{isRtl ? '◀' : '▶'}</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-bold text-gray-800 mb-5 relative inline-block">
              {t('footer.contact')}
              <span className="absolute -bottom-2 end-0 w-1/2 h-1 bg-pink-200 rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-pink-400 shrink-0 mt-0.5" />
                <span>{t('footer.address') || 'Tehran, Valiasr St, Gol Ara Center'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-pink-400 shrink-0" />
                <span dir="ltr">021 - 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-pink-400 shrink-0" />
                <span>info@golara-center.ir</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-bold text-gray-800 mb-5 relative inline-block">
              {t('footer.newsletter') || 'Newsletter'}
              <span className="absolute -bottom-2 end-0 w-1/2 h-1 bg-pink-200 rounded-full"></span>
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              {t('footer.newsletter_desc') || 'Get notified about the latest discounts!'}
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('footer.newsletter_placeholder') || 'Enter your email...'} 
                className="w-full bg-white border border-pink-100 rounded-2xl py-3 pe-4 ps-12 text-sm outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all text-start"
              />
              <button 
                type="submit"
                className="absolute start-1.5 w-9 h-9 rounded-xl bg-pink-500 hover:bg-pink-600 flex items-center justify-center text-white transition-colors"
                aria-label="Subscribe"
              >
                <Send size={16} className={isRtl ? 'me-1 transform rotate-180' : 'ms-1'} />
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-500">
            {t('footer.rights')}
          </p>
          <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-pink-50">
            {t('footer.designed_by')} <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" /> {t('footer.by')} 
            <a 
              href="https://parhamjenani.ir" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-400 hover:opacity-80 transition-opacity pt-1"
              style={{ fontFamily: 'Lalezar, system-ui, sans-serif' }}
            >
              Parham Jenani
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
