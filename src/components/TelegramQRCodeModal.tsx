import React, { useState } from 'react';
import { X, Send, Copy, Check, QrCode } from 'lucide-react';
import { OWNER_NAME, getStoredTelegramUsername, getTelegramUrl } from '../config/storeConfig';

interface TelegramQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramQRCodeModal: React.FC<TelegramQRCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const telegramUsername = getStoredTelegramUsername();
  const telegramUrl = getTelegramUrl();

  const handleCopy = () => {
    navigator.clipboard.writeText(telegramUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#382B2A]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#1E1724] to-[#130E17] text-white rounded-3xl shadow-2xl border border-[#DE7294]/30 p-6 z-10 animate-in fade-in zoom-in-95 duration-200 text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="បិទ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#F8C8D8]">
              Ma Nith Store ♡ Telegram
            </span>
            <h3 className="font-serif text-xl font-bold text-white mt-1">
              ស្កេន QR Code ដើម្បីទាក់ទង
            </h3>
            <p className="text-xs text-white/70 mt-1">
              បើកកាមេរ៉ា ឬ Telegram លើទូរស័ព្ទដៃដើម្បីស្កេន
            </p>
          </div>

          {/* SORM MAKARA QR Card Container */}
          <div className="bg-white rounded-3xl p-5 shadow-xl text-[#1E1724] relative overflow-hidden max-w-[270px] mx-auto border-2 border-[#FCE2EB]">
            
            {/* Top Avatar Circle "SM" */}
            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-[#FFA040] to-[#FFB766] flex items-center justify-center text-white font-bold text-lg shadow-md -mt-1 mb-3">
              SM
            </div>

            {/* QR Code SVG with Telegram branding */}
            <div className="relative mx-auto w-48 h-48 bg-white p-2 rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#1E439B]">
                {/* QR Finder patterns */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="11" y="11" width="14" height="14" rx="2" fill="currentColor" />
                
                <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="75" y="11" width="14" height="14" rx="2" fill="currentColor" />

                <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                <rect x="11" y="75" width="14" height="14" rx="2" fill="currentColor" />

                {/* Decorative QR data bits (gradient dots) */}
                <g fill="currentColor">
                  <rect x="36" y="8" width="5" height="5" rx="1.5" />
                  <rect x="46" y="8" width="5" height="5" rx="1.5" />
                  <rect x="56" y="8" width="5" height="5" rx="1.5" />

                  <rect x="36" y="18" width="5" height="5" rx="1.5" />
                  <rect x="46" y="24" width="5" height="5" rx="1.5" />
                  <rect x="56" y="18" width="5" height="5" rx="1.5" />

                  <rect x="8" y="36" width="5" height="5" rx="1.5" />
                  <rect x="18" y="36" width="5" height="5" rx="1.5" />
                  <rect x="28" y="36" width="5" height="5" rx="1.5" />

                  <rect x="8" y="46" width="5" height="5" rx="1.5" />
                  <rect x="18" y="56" width="5" height="5" rx="1.5" />
                  <rect x="28" y="48" width="5" height="5" rx="1.5" />

                  <rect x="68" y="36" width="5" height="5" rx="1.5" />
                  <rect x="78" y="36" width="5" height="5" rx="1.5" />
                  <rect x="88" y="44" width="5" height="5" rx="1.5" />
                  <rect x="68" y="48" width="5" height="5" rx="1.5" />
                  <rect x="78" y="56" width="5" height="5" rx="1.5" />

                  <rect x="36" y="68" width="5" height="5" rx="1.5" />
                  <rect x="46" y="68" width="5" height="5" rx="1.5" />
                  <rect x="56" y="76" width="5" height="5" rx="1.5" />
                  <rect x="46" y="84" width="5" height="5" rx="1.5" />
                  <rect x="68" y="76" width="5" height="5" rx="1.5" />
                  <rect x="78" y="84" width="5" height="5" rx="1.5" />
                  <rect x="88" y="76" width="5" height="5" rx="1.5" />
                </g>

                {/* Center Telegram Logo Circle */}
                <circle cx="50" cy="50" r="13" fill="#2AABEE" />
                <path d="M43 50L56 44L53 55L48 52L46 54L45.5 51.5L43 50Z" fill="white" />
              </svg>
            </div>

            {/* Account Name */}
            <div className="mt-2 pt-2 border-t border-[#F5EBE6]">
              <p className="font-bold text-sm tracking-wide text-[#1A4294]">
                {OWNER_NAME}
              </p>
              <p className="text-[11px] text-[#8F7B7A]">
                @{telegramUsername}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-5 rounded-2xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs font-semibold tracking-wide uppercase transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>បើក Telegram ដោយផ្ទាល់</span>
            </a>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">បានចម្លង Link រួចរាល់!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>ចម្លង Link Telegram</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
