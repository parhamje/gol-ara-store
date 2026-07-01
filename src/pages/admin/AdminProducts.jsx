import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { products as initialProducts } from '../../data/products';
import { formatToman } from '../../utils/formatCurrency';

export default function AdminProducts() {
  // Mock state for products in admin
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => p.name.includes(search) || p.brand.includes(search));

  const handleDelete = (id) => {
    if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('محصول با موفقیت حذف شد.', { icon: '🗑️' });
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-black text-gray-800">مدیریت محصولات</h1>
        <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2">
          <Plus size={18} />
          افزودن محصول جدید
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در نام یا برند محصول..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-gray-400 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold">تصویر</th>
                <th className="px-6 py-4 font-bold">نام محصول</th>
                <th className="px-6 py-4 font-bold">برند</th>
                <th className="px-6 py-4 font-bold">قیمت</th>
                <th className="px-6 py-4 font-bold">موجودی</th>
                <th className="px-6 py-4 font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                  </td>
                  <td className="px-6 py-3 font-bold text-gray-800">{product.name}</td>
                  <td className="px-6 py-3 text-gray-500">{product.brand}</td>
                  <td className="px-6 py-3 font-bold">{formatToman(product.price)}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'موجود' : 'ناموجود'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" aria-label="ویرایش">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" aria-label="حذف">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    محصولی یافت نشد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
