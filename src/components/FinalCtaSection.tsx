import React from 'react';
import { Send, QrCode } from 'lucide-react';
import { getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';
import { TelegramQrCard } from './TelegramQrCard';

interface FinalCtaSectionProps {
  onOpenQrModal: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenQrModal }) => {
  const telegramUsername = getStoredTelegramUsername();

  return (
    <section id="contact" className="py-14 sm:py-20 bg-gradient-to-b from-[#FFFDF9] via-[#FFF0F4] to-[#FFF8FA] border-t border-[#FCE2EB] relative overflow-hidden khmer-text">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Large Blush Pink CTA Card */}
        <div className="bg-gradient-to-tr from-[#FFF0F4] via-white to-[#FCE2EB] rounded-[36px] p-8 sm:p-12 border-2 border-[#FAD9E5] shadow-xl shadow-[#DE7294]/10 text-center space-y-6">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-[#DE7294] text-xl font-normal">♡</span>
            
            {/* Heading (Exact user requirement: "ឃើញរបស់ដែលអ្នកចូលចិត្តហើយមែនទេ? ♡") */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#382B2A] leading-snug">
              ឃើញរបស់ដែលអ្នកចូលចិត្តហើយមែនទេ? ♡
            </h2>

            {/* Supporting Text (Exact user requirement) */}
            <p className="text-xs sm:text-sm text-[#554443] leading-relaxed">
              ផ្ញើសារមកយើងតាម Telegram ដើម្បីសួរព័ត៌មាន ឬធ្វើការកម្មង់បានเลย។
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary Telegram Button (Exact user label: "ទាក់ទងតាម Telegram 🎀") */}
            <a
              href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំឃើញគ្រឿងអលង្ការស្អាតៗ ហើយចង់សួរព័ត៌មាន ឬកម្មង់ឥឡូវនេះ!")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#DE7294] hover:bg-[#C24A71] text-white text-sm font-semibold tracking-wide shadow-lg shadow-[#DE7294]/30 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>ទាក់ទងតាម Telegram 🎀</span>
            </a>

            <button
              onClick={onOpenQrModal}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#FAF6F0] text-[#382B2A] text-sm font-medium border border-[#FAD9E5] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#DE7294]" />
              <span>ស្កេន QR Code (SORM MAKARA)</span>
            </button>
          </div>

          {/* Embedded Telegram QR Card Preview */}
          <div className="pt-6">
            <div className="inline-block">
              <TelegramQrCard />
            </div>
          </div>

          <p className="text-[11px] text-[#8F7B7A]">
            Ma Nith Store ♡ ឆ្លើយតបសារយ៉ាងរហ័ស និងរួសរាយរាក់ទាក់ជានិច្ច
          </p>

        </div>

      </div>
    </section>
  );
};
