import useAuthStore from '../../store/authStore';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-pink-50 min-h-[500px]">
      <h1 className="text-2xl font-black text-gray-800 mb-6">
        {isRtl ? 'پروفایل کاربری' : 'User Profile'}
      </h1>

      <div className="max-w-md space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">{t('checkout.name')}</label>
          <input type="text" readOnly value={user?.name || ''} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">{isRtl ? 'ایمیل' : 'Email'}</label>
          <input type="email" readOnly value={user?.email || ''} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 text-left" dir="ltr" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">{isRtl ? 'نقش کاربری' : 'Role'}</label>
          <input type="text" readOnly value={user?.role === 'admin' ? (isRtl ? 'مدیر سیستم' : 'Admin') : (isRtl ? 'کاربر عادی' : 'User')} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700" />
        </div>
        <button disabled className="w-full py-3 bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed">
          {isRtl ? 'ذخیره تغییرات (نسخه دمو)' : 'Save Changes (Demo)'}
        </button>
      </div>
    </div>
  );
}
