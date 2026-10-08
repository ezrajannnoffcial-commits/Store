import React from 'react';
import { Send, QrCode } from 'lucide-react';
import { getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';

interface FinalBlushCTAProps {
  onOpenQR: () => void;
}

export const FinalBlushCTA: React.FC<FinalBlushCTAProps> = ({ onOpenQR }) => {
  const telegramUsername = getStoredTelegramUsername();

  return (
    <section className="py-14 sm:py-16 bg-[#FFF0F4] border-b border-[#FCE2EB] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
        
        <span className="text-[#DE7294] text-xl inline-block animate-gentle-pulse">
          ♡
        </span>

        {/* Heading: ឃើញរបស់ដែលអ្នកចូលចិត្តហើយមែនទេ? ♡ */}
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#382B2A] leading-snug">
          ឃើញរបស់ដែលអ្នកចូលចិត្តហើយមែនទេ? ♡
        </h2>

        {/* Text */}
        <p className="text-xs sm:text-sm text-[#554443] max-w-lg mx-auto leading-relaxed">
          ផ្ញើសារមកយើងតាម Telegram ដើម្បីសួរព័ត៌មាន ឬធ្វើការកម្មង់បានភ្លាមៗ។ យើងរីករាយនឹងជួយអ្នកជានិច្ច!
        </p>

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Button: ទាក់ទងតាម Telegram 🎀 */}
          <a
            href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំបានឃើញរបស់ដែលខ្ញុំចូលចិត្ត ហើយចង់សួរព័ត៌មានបន្ថែម!")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#DE7294] hover:bg-[#C24A71] text-white text-sm font-semibold tracking-wide shadow-md shadow-[#DE7294]/30 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ទាក់ទងតាម Telegram 🎀</span>
            <Send className="w-4 h-4" />
          </a>

          {/* QR Code button */}
          <button
            onClick={onOpenQR}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[#FFF8FA] text-[#382B2A] border border-[#FAD9E5] text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#DE7294]" />
            <span>ស្កេន QR Code (SORM MAKARA)</span>
          </button>
        </div>

        <p className="text-[11px] text-[#8F7B7A] pt-1">
          Telegram Handle: @{telegramUsername} · ឆ្លើយតបរហ័ស
        </p>

      </div>
    </section>
  );
};
