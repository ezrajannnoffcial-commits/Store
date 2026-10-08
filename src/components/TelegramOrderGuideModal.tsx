import React from 'react';
import { X, Send, Heart, Package, MessageCircleHeart, QrCode } from 'lucide-react';
import { OWNER_NAME, getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';

interface TelegramOrderGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQR: () => void;
}

export const TelegramOrderGuideModal: React.FC<TelegramOrderGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenQR,
}) => {
  if (!isOpen) return null;

  const telegramUsername = getStoredTelegramUsername();

  const steps = [
    {
      step: '01',
      title: 'ជ្រើសរើសរបស់ដែលអ្នកចូលចិត្ត',
      desc: 'រុករកគ្រឿងអលង្ការ Stainless Steel ស្អាតៗនៅក្នុងហាង ហើយចុចលើប៊ូតុង ♡ ទិញឥឡូវនេះ។',
      icon: Heart,
    },
    {
      step: '02',
      title: 'ជជែកតាម Telegram',
      desc: `សារសួរនាំអំពីផលិតផលនឹងត្រូវបានរៀបចំដោយស្វ័យប្រវត្តិ។ អ្នកគ្រាន់តែចុចផ្ញើទៅកាន់ @${telegramUsername} (${OWNER_NAME})។`,
      icon: MessageCircleHeart,
    },
    {
      step: '03',
      title: 'បញ្ជាក់ការកម្មង់ និងដឹកជញ្ជូន',
      desc: 'យើងនឹងពិនិត្យមើលស្តុកភ្លាមៗ បញ្ជាក់ទីតាំងទទួល និងខ្ចប់គ្រឿងអលង្ការផ្ញើជូនអ្នកដោយក្តីស្រលាញ់ ♡',
      icon: Package,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#382B2A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#F8C8D8] p-6 sm:p-7 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#382B2A] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
          aria-label="បិទ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF0F4] border border-[#FCE2EB] flex items-center justify-center text-[#DE7294]">
            <Send className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#382B2A] leading-snug">
            របៀបកម្មង់តាម Telegram ♡
          </h3>
          <p className="text-xs text-[#554443] max-w-sm mx-auto leading-relaxed">
            មើលផលិតផល → ចូលចិត្ត → ចុចទិញ → Telegram → ទាក់ទងអ្នកលក់
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 bg-[#FFF8FA] rounded-2xl border border-[#FCE2EB]"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-[#FAD9E5] text-[#DE7294] font-bold text-xs flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#382B2A]">
                    {s.title}
                  </h4>
                  <p className="text-xs text-[#554443] mt-0.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <a
            href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំចង់សាកសួរព័ត៌មានអំពីរបៀបកម្មង់គ្រឿងអលង្ការ!")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-[#DE7294]/30 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>ទាក់ទងមកយើងតាម Telegram (@{telegramUsername})</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenQR();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#554443] text-xs font-medium border border-[#F3EBE1] flex items-center justify-center gap-2 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#DE7294]" />
            <span>បង្ហាញ QR Code (SORM MAKARA)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
