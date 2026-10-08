import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Settings as SettingsIcon,
  Package,
  Layers,
  Send,
  ExternalLink,
  Shield,
  Check,
  AlertCircle,
  TrendingUp,
  Key,
} from 'lucide-react';
import {
  AdminProduct,
  StoreSettings,
  adminFetchProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminUpdateSettings,
  adminChangePassword,
  adminLogout,
} from '../../services/api';
import { ProductFormModal } from './ProductFormModal';

interface AdminDashboardProps {
  onBackToStore: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'security'>('products');
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [settings, setSettings] = useState<StoreSettings>({
    telegramUsername: 'sormmakara',
    ownerName: 'SORM MAKARA',
    currency: 'USD',
    khrExchangeRate: 4100,
    storeName: 'Ma Nith Store',
    tagline: 'គ្រឿងអលង្ការស្អាតៗ សម្រាប់រាល់ថ្ងៃរបស់អ្នក។',
    announcement: '♡ គ្រឿងអលង្ការ Stainless Steel ស្អាតៗ សម្រាប់រាល់ថ្ងៃ · កម្មង់តាម Telegram @sormmakara ♡',
  });

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ទាំងអស់');
  const [selectedStock, setSelectedStock] = useState('ទាំងអស់');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings Feedback
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsError, setSettingsError] = useState('');

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodsRes, settRes] = await Promise.all([
        adminFetchProducts(),
        fetch('/api/settings').then((r) => r.json()),
      ]);
      setProducts(prodsRes);
      if (settRes) setSettings(settRes);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute stats
  const totalCount = products.length;
  const inStockCount = products.filter((p) => p.stockStatus === 'មានក្នុងស្តុក' && !p.isHidden).length;
  const lowStockCount = products.filter((p) => p.stockStatus === 'នៅសល់តិចតួច ♡' && !p.isHidden).length;
  const soldOutCount = products.filter((p) => p.stockStatus === 'អស់ពីស្តុក' && !p.isHidden).length;
  const hiddenCount = products.filter((p) => p.isHidden).length;

  const categories = ['ទាំងអស់', 'ខ្សែក', 'ចិញ្ចៀន', 'ក្រវិល', 'ខ្សែដៃ', 'ឈុតគ្រឿងអលង្ការ'];

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'ទាំងអស់' || p.category === selectedCategory;
    const matchStock = selectedStock === 'ទាំងអស់' || p.stockStatus === selectedStock;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchStock && matchSearch;
  });

  const handleSaveProduct = async (productData: Partial<AdminProduct>) => {
    if (editingProduct) {
      const updated = await adminUpdateProduct(editingProduct.id, productData);
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } else {
      const created = await adminCreateProduct(productData);
      setProducts((prev) => [created, ...prev]);
    }
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    setDeletingLoading(true);
    try {
      await adminDeleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setToastMessage(`បានលុបផលិតផល "${productToDelete.name}" ដោយជោគជ័យ`);
      setProductToDelete(null);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'បរាជ័យក្នុងការលុប';
      setToastMessage(errorMsg);
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setDeletingLoading(false);
    }
  };

  const handleToggleHidden = async (product: AdminProduct) => {
    try {
      const updated = await adminUpdateProduct(product.id, { isHidden: !product.isHidden });
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setToastMessage(updated.isHidden ? 'បានលាក់ផលិតផលពី Storefront' : 'បានបង្ហាញផលិតផលលើ Storefront');
      setTimeout(() => setToastMessage(null), 2500);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'បរាជ័យក្នុងការកែសម្រួលស្ថានភាព';
      setToastMessage(errorMsg);
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(false);
    setSettingsError('');
    try {
      const updated = await adminUpdateSettings(settings);
      setSettings(updated);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2500);
    } catch (err: any) {
      setSettingsError(err.message || 'Failed to save settings');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordFeedback(null);
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ success: false, msg: 'ពាក្យសម្ងាត់ថ្មី និងផ្ទៀងផ្ទាត់មិនដូចគ្នាទេ' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordFeedback({ success: false, msg: 'ពាក្យសម្ងាត់ថ្មីត្រូវមានយ៉ាងតិច ៦ តួ' });
      return;
    }

    try {
      const res = await adminChangePassword(oldPassword, newPassword);
      if (res.success) {
        setPasswordFeedback({ success: true, msg: 'បានផ្លាស់ប្តូរពាក្យសម្ងាត់ដោយជោគជ័យ!' });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordFeedback({ success: false, msg: res.error || 'បរាជ័យក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់' });
      }
    } catch {
      setPasswordFeedback({ success: false, msg: 'មានបញ្ហាក្នុងការតភ្ជាប់' });
    }
  };

  const handleLogoutClick = async () => {
    await adminLogout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#382B2A] flex flex-col khmer-text">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#F5EBE6] px-4 sm:px-6 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#382B2A]">
                Ma Nith
              </span>
              <span className="text-xs font-semibold tracking-widest text-[#B57C8E] uppercase">
                ADMIN
              </span>
              <span className="text-[#DE7294] text-sm">♡</span>
            </div>
            <span className="hidden sm:inline-block text-xs bg-[#FFF0F4] text-[#C24A71] border border-[#FCE2EB] px-2.5 py-0.5 rounded-full font-medium">
              ផ្ទាំងគ្រប់គ្រងផលិតផល & ហាង
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Live Storefront */}
            <button
              onClick={onBackToStore}
              className="px-3.5 py-1.5 rounded-xl border border-[#FAD9E5] hover:bg-[#FFF0F4] text-xs font-semibold text-[#DE7294] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>មើល Storefront ↗</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogoutClick}
              className="px-3.5 py-1.5 rounded-xl bg-[#FAF6F0] hover:bg-red-50 text-xs font-medium text-[#8F7B7A] hover:text-red-600 border border-[#F3EBE1] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ចាកចេញ</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-[#F3EBE1] shadow-xs">
            <span className="text-[11px] text-[#8F7B7A] block">ផលិតផលសរុប</span>
            <span className="text-xl font-bold text-[#382B2A] tabular-nums">{totalCount}</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#F3EBE1] shadow-xs">
            <span className="text-[11px] text-emerald-700 block">មានក្នុងស្តុក</span>
            <span className="text-xl font-bold text-emerald-800 tabular-nums">{inStockCount}</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#F3EBE1] shadow-xs">
            <span className="text-[11px] text-[#C24A71] block">នៅសល់តិចតួច</span>
            <span className="text-xl font-bold text-[#C24A71] tabular-nums">{lowStockCount}</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#F3EBE1] shadow-xs">
            <span className="text-[11px] text-red-600 block">អស់ពីស្តុក</span>
            <span className="text-xl font-bold text-red-700 tabular-nums">{soldOutCount}</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#F3EBE1] shadow-xs">
            <span className="text-[11px] text-gray-500 block">លាក់មិនបង្ហាញ</span>
            <span className="text-xl font-bold text-gray-600 tabular-nums">{hiddenCount}</span>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-[#F3EBE1] shadow-xs">
            <span className="text-[11px] text-[#DE7294] block">Telegram បច្ចុប្បន្ន</span>
            <span className="text-xs font-semibold text-[#382B2A] truncate block mt-1">
              @{settings.telegramUsername}
            </span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-[#F5EBE6] gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'products'
                ? 'border-[#DE7294] text-[#DE7294]'
                : 'border-transparent text-[#8F7B7A] hover:text-[#382B2A]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>គ្រប់គ្រងផលិតផល ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#DE7294] text-[#DE7294]'
                : 'border-transparent text-[#8F7B7A] hover:text-[#382B2A]'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>ការកំណត់ហាង & Telegram</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#DE7294] text-[#DE7294]'
                : 'border-transparent text-[#8F7B7A] hover:text-[#382B2A]'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>សុវត្ថិភាព & ពាក្យសម្ងាត់</span>
          </button>
        </div>

        {/* TAB 1: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            {/* Action Bar: Search, Filters & Add Product */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              <div className="flex flex-1 flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
                  <Search className="w-4 h-4 text-[#8F7B7A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ស្វែងរកតាមឈ្មោះផលិតផល..."
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A] outline-none focus:border-[#DE7294]"
                  />
                </div>

                {/* Category filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-[#F3EBE1] text-xs text-[#554443] outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'ទាំងអស់' ? 'គ្រប់ប្រភេទ' : c}
                    </option>
                  ))}
                </select>

                {/* Stock filter */}
                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-[#F3EBE1] text-xs text-[#554443] outline-none"
                >
                  <option value="ទាំងអស់">គ្រប់ស្ថានភាពស្តុក</option>
                  <option value="មានក្នុងស្តុក">មានក្នុងស្តុក</option>
                  <option value="នៅសល់តិចតួច ♡">នៅសល់តិចតួច</option>
                  <option value="អស់ពីស្តុក">អស់ពីស្តុក</option>
                </select>
              </div>

              {/* Add New Product Button */}
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs font-semibold shadow-md shadow-[#DE7294]/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>បន្ថែមផលិតផលថ្មី ♡</span>
              </button>

            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-[#F3EBE1] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF8FA] border-b border-[#F5EBE6] text-[#8F7B7A] font-semibold">
                    <tr>
                      <th className="py-3 px-4">រូបភាព</th>
                      <th className="py-3 px-4">ឈ្មោះផលិតផល</th>
                      <th className="py-3 px-4">ប្រភេទ</th>
                      <th className="py-3 px-4">តម្លៃ ($)</th>
                      <th className="py-3 px-4">ស្ថានភាពស្តុក</th>
                      <th className="py-3 px-4">ផ្លាក (Badge)</th>
                      <th className="py-3 px-4 text-center">ការបង្ហាញ</th>
                      <th className="py-3 px-4 text-right">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5EBE6]">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-[#8F7B7A]">
                          មិនមានផលិតផលណាត្រូវនឹងការស្វែងរកទេ
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FFFDF9] transition-colors">
                          {/* Image */}
                          <td className="py-2.5 px-4">
                            <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] overflow-hidden border border-[#F0E6D8] shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                          </td>

                          {/* Name */}
                          <td className="py-2.5 px-4 font-semibold text-[#382B2A] max-w-[200px] truncate">
                            {p.name}
                          </td>

                          {/* Category */}
                          <td className="py-2.5 px-4 text-[#8F7B7A]">
                            {p.category}
                          </td>

                          {/* Price */}
                          <td className="py-2.5 px-4 font-bold text-[#DE7294] tabular-nums font-sans">
                            ${p.price.toFixed(2)}
                          </td>

                          {/* Stock Status */}
                          <td className="py-2.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                                p.stockStatus === 'មានក្នុងស្តុក'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : p.stockStatus === 'នៅសល់តិចតួច ♡'
                                  ? 'bg-[#FFF0F4] text-[#C24A71]'
                                  : 'bg-red-50 text-red-600'
                              }`}
                            >
                              {p.stockStatus}
                            </span>
                          </td>

                          {/* Badge */}
                          <td className="py-2.5 px-4">
                            {p.badge ? (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#FAF6F0] text-[#554443] border border-[#F3EBE1]">
                                {p.badge}
                              </span>
                            ) : (
                              <span className="text-[#8F7B7A] text-[11px]">-</span>
                            )}
                          </td>

                          {/* Visibility toggle */}
                          <td className="py-2.5 px-4 text-center">
                            <button
                              onClick={() => handleToggleHidden(p)}
                              title={p.isHidden ? 'ផលិតផលកំពុងលាក់ (ចុចដើម្បីបង្ហាញ)' : 'ផលិតផលកំពុងបង្ហាញ (ចុចដើម្បីលាក់)'}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                p.isHidden
                                  ? 'text-gray-400 hover:text-gray-600 bg-gray-50'
                                  : 'text-emerald-600 hover:text-emerald-700 bg-emerald-50'
                              }`}
                            >
                              {p.isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-2.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg text-[#8F7B7A] hover:text-[#DE7294] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
                                title="កែសម្រួល"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setProductToDelete(p)}
                                className="p-1.5 rounded-lg text-[#8F7B7A] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                title="លុប"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#F3EBE1] shadow-xs space-y-6">
            
            <div>
              <h3 className="font-serif text-lg font-bold text-[#382B2A]">
                ការកំណត់ហាង & Telegram (Store Settings)
              </h3>
              <p className="text-xs text-[#8F7B7A] mt-0.5">
                កំណត់ Telegram Username និងរូបិយប័ណ្ណដែលបង្ហាញលើគេហទំព័រ
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>បានរក្សាទុកការកំណត់ដោយជោគជ័យ!</span>
              </div>
            )}

            {settingsError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{settingsError}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  Telegram Username របស់ហាង (@username):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8F7B7A]">
                    @
                  </span>
                  <input
                    type="text"
                    value={settings.telegramUsername}
                    onChange={(e) => setSettings({ ...settings, telegramUsername: e.target.value.replace(/^@/, '') })}
                    placeholder="sormmakara"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] text-xs text-[#382B2A]"
                    required
                  />
                </div>
                <p className="text-[11px] text-[#8F7B7A] mt-1">
                  រាល់ការចុចទិញពីអតិថិជន នឹងបញ្ជូនទៅកាន់ <code className="text-[#DE7294] font-mono">https://t.me/{settings.telegramUsername}</code>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  ឈ្មោះគណនី Telegram (Account Display Name):
                </label>
                <input
                  type="text"
                  value={settings.ownerName}
                  onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                  placeholder="SORM MAKARA"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] text-xs text-[#382B2A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                    រូបិយប័ណ្ណបង្ហាញលើហាង (Currency):
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A] bg-white"
                  >
                    <option value="USD">USD ($ ដុល្លារអាមេរិក)</option>
                    <option value="KHR">KHR (៛ ប្រាក់រៀល)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                    អត្រាប្តូរប្រាក់ (Exchange Rate 1$ = ៛):
                  </label>
                  <input
                    type="number"
                    value={settings.khrExchangeRate}
                    onChange={(e) => setSettings({ ...settings, khrExchangeRate: Number(e.target.value) || 4100 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  បដាប្រកាសខាងលើគេហទំព័រ (Top Announcement Banner):
                </label>
                <input
                  type="text"
                  value={settings.announcement}
                  onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  ពាក្យស្លោករបស់ហាង (Tagline):
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs font-semibold shadow-md shadow-[#DE7294]/25 transition-all cursor-pointer"
                >
                  រក្សាទុកការកំណត់ ♡
                </button>
              </div>

            </form>

          </div>
        )}

        {/* TAB 3: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#F3EBE1] shadow-xs space-y-5">
            
            <div>
              <h3 className="font-serif text-lg font-bold text-[#382B2A]">
                ផ្លាស់ប្តូរពាក្យសម្ងាត់ Admin
              </h3>
              <p className="text-xs text-[#8F7B7A] mt-0.5">
                សូមរក្សាទុកពាក្យសម្ងាត់ថ្មីឱ្យបានល្អិតល្អន់
              </p>
            </div>

            {passwordFeedback && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  passwordFeedback.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {passwordFeedback.success ? <Check className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                <span>{passwordFeedback.msg}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  ពាក្យសម្ងាត់បច្ចុប្បន្ន (Current Password):
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="បញ្ចូលពាក្យសម្ងាត់ចាស់..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  ពាក្យសម្ងាត់ថ្មី (New Password):
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="យ៉ាងតិច ៦ តួ..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ថ្មី (Confirm New Password):
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="វាយបញ្ចូលពាក្យសម្ងាត់ថ្មីម្តងទៀត..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs font-semibold shadow-md shadow-[#DE7294]/25 transition-all cursor-pointer"
                >
                  ផ្លាស់ប្តូរពាក្យសម្ងាត់
                </button>
              </div>
            </form>

          </div>
        )}

      </div>

      {/* Product Form Modal (Add / Edit) */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSave={handleSaveProduct}
        categories={categories}
      />

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#382B2A]/40 backdrop-blur-xs transition-opacity"
            onClick={() => !deletingLoading && setProductToDelete(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border-2 border-[#FAD9E5] shadow-2xl z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-500 border border-red-200 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#382B2A]">
                តើអ្នកពិតជាចង់លុបមែនទេ?
              </h3>
              <p className="text-xs text-[#8F7B7A] leading-relaxed">
                តើអ្នកចង់លុបផលិតផល <span className="font-semibold text-[#382B2A]">"{productToDelete.name}"</span> មែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={deletingLoading}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#F3EBE1] text-xs font-semibold text-[#554443] hover:bg-[#FFF8FA] transition-colors cursor-pointer"
              >
                បោះបង់
              </button>
              <button
                type="button"
                onClick={confirmDeleteProduct}
                disabled={deletingLoading}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-md shadow-red-500/20 transition-all cursor-pointer disabled:opacity-60"
              >
                {deletingLoading ? 'កំពុងលុប...' : 'យល់ព្រមលុប'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#382B2A] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
