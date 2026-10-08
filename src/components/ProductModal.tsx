import React, { useState } from 'react';
import { X, Heart, Send, Check, Copy, Sparkles, ShieldCheck, Ruler, Lightbulb, QrCode } from 'lucide-react';
import { Product } from '../data/products';
import { generateTelegramOrderMessage, getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenOrderTelegram: (product: Product) => void;
  onOpenQrModal: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onOpenOrderTelegram,
  onOpenQrModal,
}) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  const currentImage = activeImage || product.image;
  const telegramUsername = getStoredTelegramUsername();
  const prefilledMessage = generateTelegramOrderMessage(product.name, product.price);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(prefilledMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const galleryImages = [product.image, ...(product.secondaryImage ? [product.secondaryImage] : [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto khmer-text">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#382B2A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#F8C8D8] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sticky Close & Action Bar */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleWishlist(product)}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#554443] hover:text-[#DE7294] border border-[#F5EBE6] shadow-sm transition-transform active:scale-90 cursor-pointer"
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#DE7294] text-[#DE7294]' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#554443] hover:text-[#382B2A] border border-[#F5EBE6] shadow-sm transition-colors cursor-pointer"
            aria-label="បិទផ្ទាំង"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#F3EBE1] relative">
                <img
                  src={currentImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#382B2A] text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex gap-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        currentImage === img
                          ? 'border-[#DE7294] ring-2 ring-[#DE7294]/20'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Stainless Steel Assurance Box */}
              <div className="bg-[#FFF8FA] rounded-2xl p-4 border border-[#FCE2EB] space-y-2 text-xs text-[#554443]">
                <div className="font-semibold text-[#9E5D74] flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#DE7294]" />
                  <span>ការធានាគុណភាពពី Ma Nith Store ♡</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DE7294] shrink-0" />
                    <span>រឹងមាំ ពាក់រាល់ថ្ងៃ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#DE7294] shrink-0" />
                    <span>ស្ទាយមិនងាយធុញ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#DE7294] shrink-0" />
                    <span>ងាយស្រួលផ្គូផ្គង</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#DE7294] shrink-0" />
                    <span>ងាយស្រួលថែទាំ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details & Specifications Column (Exact required headings) */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <div className="text-xs font-semibold text-[#B57C8E]">
                  {product.category} · Ma Nith Store ♡
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#382B2A] mt-1">
                  {product.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-xs text-[#8F7B7A]">តម្លៃ</span>
                  <span className="text-2xl font-bold text-[#DE7294] tabular-nums font-sans">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-[#8F7B7A]">USD · ខ្ចប់ជាមួយកញ្ចប់ស្អាតៗ ♡</span>
                </div>
              </div>

              {/* Product Specifications Matrix in Natural Khmer */}
              <div className="bg-[#FAF6F0] rounded-2xl p-4 border border-[#F3EBE1] space-y-2.5 text-xs text-[#554443]">
                <h3 className="font-semibold text-sm text-[#382B2A] border-b border-[#EAE0D5] pb-1.5">
                  ព័ត៌មានអំពីផលិតផល
                </h3>

                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  <div>
                    <span className="text-[#8F7B7A] block">សម្ភារៈ៖</span>
                    <span className="font-semibold text-[#382B2A]">Stainless Steel</span>
                  </div>

                  <div>
                    <span className="text-[#8F7B7A] block">ពណ៌៖</span>
                    <span className="font-semibold text-[#382B2A]">{product.color}</span>
                  </div>

                  <div>
                    <span className="text-[#8F7B7A] block">ទំហំ៖</span>
                    <span className="font-semibold text-[#382B2A]">{product.lengthOrSize}</span>
                  </div>

                  <div>
                    <span className="text-[#8F7B7A] block">នៅសល់ក្នុងស្តុក៖</span>
                    <span className="font-semibold text-[#C24A71]">{product.stockStatus}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-[#554443] leading-relaxed">
                <p>{product.description}</p>
              </div>

              {/* Care Guide (ការណែនាំអំពីការថែទាំ) */}
              <div className="p-3 bg-[#FFF8FA] rounded-xl border border-[#FCE2EB] text-xs space-y-1">
                <span className="font-semibold text-[#A63C62] block">
                  ការណែនាំអំពីការថែទាំ៖
                </span>
                <p className="text-[#554443] leading-relaxed">
                  {product.careGuide}
                </p>
              </div>

              {/* Styling Tip */}
              <div className="flex items-start gap-2.5 text-xs text-[#554443] bg-[#FAF6F0] p-3 rounded-xl border border-[#F3EBE1]">
                <Lightbulb className="w-4 h-4 text-[#DE7294] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#A63C62]">ស្ទាយគួរឱ្យស្រលាញ់ ♡: </span>
                  <span>{product.stylingTip}</span>
                </div>
              </div>

              {/* Main Buy Button (Exact required label: "♡ ទិញឥឡូវនេះ") */}
              <div className="pt-2 border-t border-[#F5EBE6] space-y-3">
                <button
                  onClick={() => onOpenOrderTelegram(product)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-sm font-semibold shadow-md shadow-[#DE7294]/30 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>♡ ទិញឥឡូវនេះ</span>
                </button>

                {/* Subtext under button (Exact user requirement) */}
                <p className="text-center text-xs text-[#9E5D74]">
                  មានសំណួរអំពីផលិតផលនេះ? ទាក់ទងមកយើងតាម Telegram ♡
                </p>

                {/* Pre-filled Message Preview with 1-Tap Copy */}
                <div className="bg-[#FAF6F0] rounded-xl p-3 border border-[#F3EBE1] text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-[#8F7B7A]">
                      សារដែលបានរៀបចំទុកជាស្រេចសម្រាប់ Telegram:
                    </span>
                    <button
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#DE7294] hover:text-[#C24A71] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">បានចម្លងរួចរាល់!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>ចម្លងសារ</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#554443] bg-white p-2.5 rounded-lg border border-[#F5EBE6] leading-relaxed">
                    "{prefilledMessage}"
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
