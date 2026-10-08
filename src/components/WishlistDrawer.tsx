import React, { useState } from 'react';
import { X, Trash2, Send, Copy, Check, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { generateWishlistOrderMessage, getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveItem: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveItem,
  onSelectProduct,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const telegramUsername = getStoredTelegramUsername();
  const totalPrice = wishlist.reduce((acc, item) => acc + item.price, 0);
  const itemNames = wishlist.map((item) => `${item.name} ($${item.price.toFixed(2)})`);
  const wishlistMessage = generateWishlistOrderMessage(itemNames);
  const telegramUrl = getTelegramUrl(wishlistMessage, telegramUsername);

  const handleCopy = () => {
    navigator.clipboard.writeText(wishlistMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end khmer-text">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#382B2A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-[#FCE2EB] z-10 flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-[#F5EBE6] flex items-center justify-between bg-[#FFF8FA]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#DE7294] fill-[#DE7294]" />
            <h2 className="text-base sm:text-lg font-bold text-[#382B2A]">
              របស់ដែលខ្ញុំស្រលាញ់ ♡
            </h2>
            <span className="text-xs font-semibold text-[#8F7B7A] tabular-nums">
              ({wishlist.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#382B2A] hover:bg-white transition-colors cursor-pointer"
            aria-label="បិទ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-[#8F7B7A]">
              <div className="w-16 h-16 rounded-full bg-[#FFF0F4] flex items-center justify-center text-[#DE7294]">
                <Heart className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-base font-semibold text-[#382B2A]">
                មិនទាន់មានគ្រឿងអលង្ការក្នុងបញ្ជីទេ
              </p>
              <p className="text-xs max-w-xs text-[#554443] leading-relaxed">
                ចុចរូបបេះដូងលើគ្រឿងអលង្ការដែលអ្នកស្រលាញ់ ដើម្បីរក្សាទុកមើលពេលក្រោយ ឬកម្មង់ជាមួយគ្នា!
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-[#FFFDF9] rounded-2xl border border-[#F3EBE1] hover:border-[#F8C8D8] transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover cursor-pointer"
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      onSelectProduct(item);
                      onClose();
                    }}
                    className="text-xs sm:text-sm font-semibold text-[#382B2A] truncate cursor-pointer hover:text-[#DE7294]"
                  >
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-[#DE7294] tabular-nums font-sans">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#8F7B7A]">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700">
                    {item.stockStatus}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-red-500 hover:bg-[#FFF0F4] transition-colors cursor-pointer"
                  aria-label={`ដក ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Telegram Order CTA */}
        {wishlist.length > 0 && (
          <div className="p-5 border-t border-[#F5EBE6] bg-[#FFF8FA] space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-[#554443]">តម្លៃសរុបប្រហែល</span>
              <span className="font-bold text-base sm:text-lg text-[#382B2A] tabular-nums font-sans">
                ${totalPrice.toFixed(2)} USD
              </span>
            </div>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-[#DE7294]/30 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>កម្មង់ទាំងអស់តាម Telegram ♡</span>
            </a>

            <div className="flex items-center justify-between text-[11px] text-[#8F7B7A]">
              <span>ផ្ញើសារទៅកាន់ @{telegramUsername}</span>
              <button
                onClick={handleCopy}
                className="text-[#DE7294] hover:text-[#C24A71] font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'បានចម្លង' : 'ចម្លងបញ្ជី'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
