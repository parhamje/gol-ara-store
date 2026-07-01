import useAuthStore from '../../store/authStore';

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-sm border border-pink-50 min-h-[500px]">
      <h1 className="text-2xl font-black text-gray-800 mb-6">پروفایل کاربری</h1>
      
      <div className="max-w-md space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">نام و نام خانوادگی</label>
          <input type="text" readOnly value={user?.name || ''} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">ایمیل</label>
          <input type="email" readOnly value={user?.email || ''} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700 text-left" dir="ltr" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">نقش کاربری</label>
          <input type="text" readOnly value={user?.role === 'admin' ? 'مدیر سیستم' : 'کاربر عادی'} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-gray-700" />
        </div>
        <button disabled className="w-full py-3 bg-gray-100 text-gray-400 font-bold rounded-2xl cursor-not-allowed">
          ذخیره تغییرات (نسخه دمو)
        </button>
      </div>
    </div>
  );
}
