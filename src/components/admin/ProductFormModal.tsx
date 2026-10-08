import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertCircle, Eye, EyeOff, Sparkles, Image as ImageIcon } from 'lucide-react';
import { AdminProduct, adminUploadImage } from '../../services/api';
import { Category, ProductBadge, StockStatus } from '../../data/products';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: AdminProduct | null;
  onSave: (productData: Partial<AdminProduct>) => Promise<void>;
  categories: string[];
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
  categories,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('14.00');
  const [category, setCategory] = useState<string>('ខ្សែក');
  const [customCategory, setCustomCategory] = useState('');
  const [badge, setBadge] = useState<ProductBadge | ''>('');
  const [stockStatus, setStockStatus] = useState<StockStatus>('មានក្នុងស្តុក');
  const [isHidden, setIsHidden] = useState(false);
  const [image, setImage] = useState('');
  const [secondaryImage, setSecondaryImage] = useState('');
  const [material, setMaterial] = useState('Stainless Steel');
  const [color, setColor] = useState('ពណ៌មាស (Gold)');
  const [lengthOrSize, setLengthOrSize] = useState('ប្រវែង 40cm + 5cm');
  const [description, setDescription] = useState('');
  const [careGuide, setCareGuide] = useState('ជូតសម្អាតដោយក្រណាត់ទន់ស្ងួតក្រោយពេលពាក់។');
  const [stylingTip, setStylingTip] = useState('ងាយស្រួលពាក់ជាមួយគ្រប់ Outfit ប្រចាំថ្ងៃ។');

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price !== undefined ? product.price.toString() : '14.00');
      setCategory(product.category || 'ខ្សែក');
      setCustomCategory('');
      setBadge(product.badge || '');
      setStockStatus(product.stockStatus || 'មានក្នុងស្តុក');
      setIsHidden(Boolean(product.isHidden));
      setImage(product.image || '');
      setSecondaryImage(product.secondaryImage || '');
      setMaterial(product.material || 'Stainless Steel');
      setColor(product.color || 'ពណ៌មាស (Gold)');
      setLengthOrSize(product.lengthOrSize || '');
      setDescription(product.description || '');
      setCareGuide(product.careGuide || '');
      setStylingTip(product.stylingTip || '');
    } else {
      // Defaults for new product
      setName('');
      setPrice('14.00');
      setCategory('ខ្សែក');
      setCustomCategory('');
      setBadge('ថ្មី');
      setStockStatus('មានក្នុងស្តុក');
      setIsHidden(false);
      setImage('/src/assets/images/hero_jewelry_showcase_1791447852835.jpg');
      setSecondaryImage('');
      setMaterial('Stainless Steel');
      setColor('ពណ៌មាស (Gold)');
      setLengthOrSize('ប្រវែង 40cm + 5cm (អាចសារ៉េបាន)');
      setDescription('គ្រឿងអលង្ការ Stainless Steel ស្អាតៗ និងគួរឱ្យស្រលាញ់ សម្រាប់ពាក់ប្រចាំថ្ងៃ។');
      setCareGuide('ជូតសម្អាតដោយក្រណាត់ទន់ស្ងួតបន្ទាប់ពីពាក់រួច។');
      setStylingTip('ងាយស្រួលផ្គូផ្គងជាមួយ Outfit ជាច្រើនស្ទាយ។');
    }
    setError('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const url = await adminUploadImage(file);
      setImage(url);
    } catch (err: any) {
      setError(err.message || 'បរាជ័យក្នុងការ Upload រូបភាព');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('សូមបញ្ចូលឈ្មោះផលិតផល');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
      setError('សូមបញ្ចូលតម្លៃត្រឹមត្រូវ');
      return;
    }
    if (!image.trim()) {
      setError('សូមបញ្ចូលរូបភាពផលិតផល');
      return;
    }

    const finalCategory = customCategory.trim() || category;

    setSaving(true);
    setError('');

    try {
      await onSave({
        name: name.trim(),
        price: numPrice,
        category: finalCategory as any,
        badge: badge ? (badge as ProductBadge) : undefined,
        stockStatus,
        isHidden,
        image: image.trim(),
        secondaryImage: secondaryImage.trim() || undefined,
        material: material.trim(),
        color: color.trim(),
        lengthOrSize: lengthOrSize.trim(),
        description: description.trim(),
        careGuide: careGuide.trim(),
        stylingTip: stylingTip.trim(),
        details: [
          material.trim(),
          lengthOrSize.trim(),
          'រឹងមាំ សាកសមសម្រាប់ការពាក់ប្រចាំថ្ងៃ',
          'ងាយស្រួលថែទាំ និងសម្អាត',
        ],
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'បរាជ័យក្នុងការរក្សាទុក');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto khmer-text">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#382B2A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#F8C8D8] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-[#F5EBE6] flex items-center justify-between bg-[#FFF8FA]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#DE7294]" />
            <h3 className="font-serif text-lg font-bold text-[#382B2A]">
              {product ? 'កែសម្រួលផលិតផល (Edit Product)' : 'បន្ថែមផលិតផលថ្មី ♡ (Add Product)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#382B2A] hover:bg-white transition-colors cursor-pointer"
            aria-label="បិទ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            <div className="sm:col-span-8">
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                ឈ្មោះផលិតផល (Product Name) *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ឧ. ខ្សែកបូរ Coquette Bow Necklace"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] focus:ring-2 focus:ring-[#DE7294]/20 outline-none text-xs text-[#382B2A]"
                required
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                តម្លៃ ($ USD) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="14.00"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] focus:ring-2 focus:ring-[#DE7294]/20 outline-none text-xs text-[#382B2A] tabular-nums"
                required
              />
            </div>

          </div>

          {/* Categories, Badges, Stock & Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                ប្រភេទ (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] outline-none text-xs text-[#382B2A] bg-white"
              >
                {categories.filter((c) => c !== 'ទាំងអស់').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Badge */}
            <div>
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                ផ្លាកសម្គាល់ (Badge)
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] outline-none text-xs text-[#382B2A] bg-white"
              >
                <option value="">គ្មាន (None)</option>
                <option value="ថ្មី">ថ្មី (New Arrival)</option>
                <option value="លក់ដាច់">លក់ដាច់ (Bestseller)</option>
                <option value="ពេញនិយម">ពេញនិយម (Popular)</option>
              </select>
            </div>

            {/* Stock Status */}
            <div>
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                ស្ថានភាពស្តុក (Stock Status)
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] outline-none text-xs text-[#382B2A] bg-white"
              >
                <option value="មានក្នុងស្តុក">មានក្នុងស្តុក (In Stock)</option>
                <option value="នៅសល់តិចតួច ♡">នៅសល់តិចតួច ♡ (Low Stock)</option>
                <option value="អស់ពីស្តុក">អស់ពីស្តុក (Sold Out)</option>
              </select>
            </div>

          </div>

          {/* Visibility Checkbox */}
          <div className="p-3 bg-[#FFF8FA] rounded-xl border border-[#FCE2EB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isHidden ? <EyeOff className="w-4 h-4 text-[#8F7B7A]" /> : <Eye className="w-4 h-4 text-[#DE7294]" />}
              <div>
                <span className="text-xs font-semibold text-[#382B2A] block">
                  {isHidden ? 'ផលិតផលនេះត្រូវបានលាក់ (Hidden)' : 'បង្ហាញជាសាធារណៈលើ Storefront (Visible)'}
                </span>
                <span className="text-[11px] text-[#8F7B7A]">
                  {isHidden ? 'អតិថិជននឹងមើលមិនឃើញផលិតផលនេះលើវេបសាយទេ' : 'អតិថិជនអាចមើលឃើញ និងកម្មង់បានធម្មតា'}
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isHidden}
                onChange={(e) => setIsHidden(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#DE7294]"></div>
            </label>
          </div>

          {/* Image Upload & Preview */}
          <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#F3EBE1] space-y-3">
            <label className="block text-xs font-semibold text-[#382B2A]">
              រូបភាពផលិតផល (Product Image) *
            </label>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Image Preview Box */}
              <div className="w-24 h-24 rounded-2xl bg-white border border-[#F0E6D8] overflow-hidden shrink-0 flex items-center justify-center relative shadow-xs">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-[#B57C8E]" />
                )}
              </div>

              {/* Upload & URL Controls */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2">
                  <label className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF0F4] border border-[#FAD9E5] text-xs font-semibold text-[#DE7294] cursor-pointer flex items-center gap-1.5 transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'កំពុង Upload...' : 'ជ្រើសរើសរូបភាពពីម៉ាស៊ីន (Upload)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  <span className="text-[11px] text-[#8F7B7A]">ឬ ដាក់តំណភ្ជាប់ URL</span>
                </div>

                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://... ឬ /uploads/..."
                  className="w-full px-3 py-2 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] outline-none text-xs text-[#382B2A] bg-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Specifications: Material, Color, Size */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                សម្ភារៈ (Material)
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Stainless Steel"
                className="w-full px-3 py-2 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                ពណ៌ (Color)
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="ពណ៌មាស (Gold)"
                className="w-full px-3 py-2 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                ទំហំ / ប្រវែង (Size)
              </label>
              <input
                type="text"
                value={lengthOrSize}
                onChange={(e) => setLengthOrSize(e.target.value)}
                placeholder="40cm + 5cm"
                className="w-full px-3 py-2 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
              />
            </div>
          </div>

          {/* Description & Notes */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                ការពិពណ៌នាអំពីផលិតផល (Description)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="រៀបរាប់ពីភាពស្រស់ស្អាត និងលក្ខណៈពិសេសនៃគ្រឿងអលង្ការ..."
                className="w-full px-3 py-2 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] outline-none text-xs text-[#382B2A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  ការណែនាំអំពីការថែទាំ (Care Guide)
                </label>
                <input
                  type="text"
                  value={careGuide}
                  onChange={(e) => setCareGuide(e.target.value)}
                  placeholder="ជូតសម្អាតដោយក្រណាត់ទន់..."
                  className="w-full px-3 py-2 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382B2A] mb-1">
                  ស្ទាយគួរឱ្យស្រលាញ់ (Styling Tip)
                </label>
                <input
                  type="text"
                  value={stylingTip}
                  onChange={(e) => setStylingTip(e.target.value)}
                  placeholder="ពាក់ផ្គូផ្គងជាមួយអាវ..."
                  className="w-full px-3 py-2 rounded-xl border border-[#F3EBE1] text-xs text-[#382B2A]"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#F5EBE6] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#F3EBE1] hover:bg-[#FAF6F0] text-xs font-medium text-[#554443] transition-colors cursor-pointer"
            >
              បោះបង់ (Cancel)
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-6 py-2.5 rounded-xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs font-semibold shadow-md shadow-[#DE7294]/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              {saving ? (
                <span>កំពុងរក្សាទុក...</span>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>រក្សាទុកផលិតផល ♡</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
