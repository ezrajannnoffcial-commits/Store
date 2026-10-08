import React from 'react';
import { X, Heart } from 'lucide-react';
import { TelegramQrCard } from './TelegramQrCard';

interface TelegramQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelegramQrModal: React.FC<TelegramQrModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto khmer-text">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#382B2A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-[#F8C8D8] p-6 z-10 my-auto text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#382B2A] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
          aria-label="បិទ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="text-xs font-semibold text-[#DE7294] flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-[#DE7294]" />
            <span>Ma Nith Store ♡ Official Telegram</span>
          </div>
          <h3 className="text-lg font-bold text-[#382B2A]">
            ស្កេន Telegram QR Code
          </h3>
          <p className="text-xs text-[#554443]">
            បើកកាមេរ៉ាទូរស័ព្ទ ឬកម្មវិធី Telegram ដើម្បីស្កេន ឬចុចប៊ូតុងខាងក្រោមដើម្បីផ្ញើសារ!
          </p>
        </div>

        {/* QR Card Component */}
        <div className="pt-1">
          <TelegramQrCard />
        </div>
      </div>
    </div>
  );
};
