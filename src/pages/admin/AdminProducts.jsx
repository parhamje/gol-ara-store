import { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { products as initialProducts } from '../../data/products';
import { formatToman } from '../../utils/formatCurrency';
import { useTranslation } from 'react-i18next';

export default function AdminProducts() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'fa';

  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => {
    const name = isRtl ? p.name : p.name_en;
    const brand = isRtl ? p.brand : p.brand_en;
    return name.includes(search) || brand.includes(search);
  });

  const handleDelete = (id) => {
    if (window.confirm(isRtl ? 'آیا از حذف این محصول اطمینان دارید؟' : 'Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success(isRtl ? 'محصول با موفقیت حذف شد.' : 'Product deleted successfully.', { icon: '🗑️' });
    }
  };

  const formatPrice = (amount) => isRtl ? formatToman(amount) : `${amount.toLocaleString()} T`;

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-black text-gray-800">
          {isRtl ? 'مدیریت محصولات' : 'Product Management'}
        </h1>
        <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2">
          <Plus size={18} />
          {isRtl ? 'افزودن محصول جدید' : 'Add New Product'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
            <input
              type="text"
              placeholder={isRtl ? 'جستجو در نام یا برند محصول...' : 'Search by name or brand...'}
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
                <th className="px-6 py-4 font-bold">{isRtl ? 'تصویر' : 'Image'}</th>
                <th className="px-6 py-4 font-bold">{isRtl ? 'نام محصول' : 'Product Name'}</th>
                <th className="px-6 py-4 font-bold">{isRtl ? 'برند' : 'Brand'}</th>
                <th className="px-6 py-4 font-bold">{isRtl ? 'قیمت' : 'Price'}</th>
                <th className="px-6 py-4 font-bold">{isRtl ? 'موجودی' : 'Stock'}</th>
                <th className="px-6 py-4 font-bold text-center">{isRtl ? 'عملیات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((product) => {
                const productName = isRtl ? product.name : product.name_en;
                const productBrand = isRtl ? product.brand : product.brand_en;
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <img src={product.image} alt={productName} className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                    </td>
                    <td className="px-6 py-3 font-bold text-gray-800">{productName}</td>
                    <td className="px-6 py-3 text-gray-500">{productBrand}</td>
                    <td className="px-6 py-3 font-bold">{formatPrice(product.price)}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.inStock ? (isRtl ? 'موجود' : 'In Stock') : (isRtl ? 'ناموجود' : 'Out of Stock')}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    {isRtl ? 'محصولی یافت نشد.' : 'No products found.'}
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
