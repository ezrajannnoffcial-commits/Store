import React, { useState } from 'react';
import { X, Send, Copy, Check, Heart, QrCode } from 'lucide-react';
import { Product } from '../data/products';
import { generateTelegramOrderMessage, getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';
import { TelegramQrCard } from './TelegramQrCard';

interface TelegramOrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramOrderModal: React.FC<TelegramOrderModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen || !product) return null;

  const telegramUsername = getStoredTelegramUsername();
  const prefilledMessage = generateTelegramOrderMessage(product.name, product.price);
  const telegramUrl = getTelegramUrl(prefilledMessage, telegramUsername);

  const handleCopy = () => {
    navigator.clipboard.writeText(prefilledMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto khmer-text">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#382B2A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#F8C8D8] p-6 z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#382B2A] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
          aria-label="បិទ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-4">
          {/* Cute icon badge */}
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF0F4] border border-[#FCE2EB] flex items-center justify-center text-[#DE7294]">
            <Heart className="w-6 h-6 fill-[#DE7294]" />
          </div>

          <div>
            <div className="text-xs font-semibold text-[#B57C8E]">
              កម្មង់ទិញតាម Telegram · Ma Nith Store ♡
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#382B2A] mt-1">
              កម្មង់ {product.name}
            </h3>
            <p className="text-xs text-[#554443] mt-1">
              ផ្ញើសារតាម Telegram ដើម្បីសួរព័ត៌មាន ឬធ្វើការកម្មង់បានភ្លាមៗ!
            </p>
          </div>

          {/* Product Mini Preview */}
          <div className="flex items-center gap-3 p-3 bg-[#FFF8FA] rounded-2xl border border-[#FCE2EB] text-left">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[#382B2A] truncate">
                {product.name}
              </p>
              <p className="text-xs text-[#DE7294] font-semibold tabular-nums mt-0.5">
                តម្លៃ ${product.price.toFixed(2)} USD
              </p>
              <p className="text-[11px] text-[#8F7B7A] truncate">
                {product.stockStatus}
              </p>
            </div>
          </div>

          {/* Message Preview */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[#8F7B7A]">
                សារដែលត្រូវផ្ញើ៖
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] font-semibold text-[#DE7294] hover:text-[#C24A71] flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600">បានចម្លង!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>ចម្លងសារ</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#F3EBE1] text-xs text-[#554443] leading-relaxed">
              "{prefilledMessage}"
            </div>
          </div>

          {/* Toggle between QR Code and Direct Button */}
          {showQr ? (
            <div className="pt-2 animate-in fade-in duration-150">
              <TelegramQrCard customMessage={prefilledMessage} />
              <button
                onClick={() => setShowQr(false)}
                className="mt-3 text-xs text-[#8F7B7A] hover:text-[#DE7294] underline"
              >
                ត្រឡប់ទៅប៊ូតុងបើក Telegram ធម្មតា
              </button>
            </div>
          ) : (
            <div className="pt-2 space-y-2.5">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-sm font-semibold tracking-wide shadow-md shadow-[#DE7294]/30 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>បើក Telegram (@{telegramUsername})</span>
              </a>

              <button
                onClick={() => setShowQr(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#554443] text-xs font-medium border border-[#F3EBE1] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#DE7294]" />
                <span>បង្ហាញ QR Code សម្រាប់ស្កេន (SORM MAKARA)</span>
              </button>

              <p className="text-[11px] text-[#8F7B7A]">
                យើងឆ្លើយតបយ៉ាងរហ័ស និងផ្ញើជូនព័ត៌មានលម្អិតភ្លាមៗ ♡
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
