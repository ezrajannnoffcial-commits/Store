import React from 'react';
import { Send, Sparkles, ShieldCheck, Heart, QrCode } from 'lucide-react';
import { FloatingDecorations } from './FloatingDecorations';
import { getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';

interface HeroProps {
  onShopClick: () => void;
  onOpenQrModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onOpenQrModal }) => {
  const telegramUsername = getStoredTelegramUsername();

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-[#FFF8FA] via-[#FFFDF9] to-[#FFFDF9] border-b border-[#F5EBE6] pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Subtle Floating Ambient Decorations */}
      <FloatingDecorations />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Headline in Khmer */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            {/* Tagline / Kicker */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold tracking-wider text-[#B57C8E] khmer-text">
              <Sparkles className="w-3.5 h-3.5 text-[#DE7294]" />
              <span>Ma Nith Store ♡ — your little jewelry corner</span>
            </div>

            {/* Main Headline (Exact user request: "ស្អាតបន្តិច សម្រាប់គ្រប់ថ្ងៃរបស់អ្នក ♡") */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#382B2A] leading-[1.3] text-balance khmer-text">
              ស្អាតបន្តិច សម្រាប់គ្រប់ថ្ងៃរបស់អ្នក{' '}
              <span className="text-[#DE7294] font-normal inline-block hover:scale-110 transition-transform">
                ♡
              </span>
            </h1>

            {/* Supporting Text (Exact user request: "គ្រឿងអលង្ការធ្វើពី Stainless Steel ស្អាតៗ សម្រាប់បន្ថែមភាពស្រស់ស្អាតដល់ Outfit ប្រចាំថ្ងៃរបស់អ្នក។") */}
            <p className="text-sm sm:text-base text-[#554443] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal khmer-text">
              គ្រឿងអលង្ការធ្វើពី Stainless Steel ស្អាតៗ សម្រាប់បន្ថែមភាពស្រស់ស្អាតដល់ Outfit ប្រចាំថ្ងៃរបស់អ្នក។
            </p>

            {/* Delicate Secondary Phrase */}
            <p className="font-serif italic text-sm text-[#9E5D74] tracking-wide">
              Made with love, Ma Nith ♡
            </p>

            {/* Action Buttons (Exact user labels: "មើលគ្រឿងអលង្ការ ♡" and "ទាក់ទងមកយើង") */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 khmer-text">
              {/* Primary Button */}
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#DE7294] hover:bg-[#C24A71] text-white text-sm font-semibold tracking-wide shadow-md shadow-[#DE7294]/30 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>មើលគ្រឿងអលង្ការ ♡</span>
              </button>

              {/* Secondary Button */}
              <a
                href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំចាប់អារម្មណ៍លើគ្រឿងអលង្ការ ហើយចង់សួរព័ត៌មានបន្ថែម!")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FFF0F4] hover:bg-[#FCE2EB] text-[#A63C62] text-sm font-semibold tracking-wide border border-[#FAD9E5] transition-all active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#DE7294] group-hover:translate-x-0.5 transition-transform" />
                <span>ទាក់ទងមកយើង</span>
              </a>

              {/* QR Code Quick Button */}
              <button
                onClick={onOpenQrModal}
                className="w-full sm:w-auto px-4 py-3.5 rounded-full bg-white hover:bg-[#FAF6F0] text-[#554443] text-xs font-medium border border-[#F3EBE1] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="ស្កេន Telegram QR Code"
              >
                <QrCode className="w-4 h-4 text-[#DE7294]" />
                <span>ស្កេន QR Code</span>
              </button>
            </div>

            {/* Stainless Steel Assurance Points in Natural Khmer */}
            <div className="pt-4 border-t border-[#F5EBE6] grid grid-cols-3 gap-3 text-center sm:text-left khmer-text">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
                <ShieldCheck className="w-4 h-4 text-[#DE7294] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-[#382B2A]">រឹងមាំ</span>
                  <span className="text-[11px] text-[#8F7B7A]">សាកសមពាក់រាល់ថ្ងៃ</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
                <Sparkles className="w-4 h-4 text-[#DE7294] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-[#382B2A]">ងាយផ្គូផ្គង</span>
                  <span className="text-[11px] text-[#8F7B7A]">ត្រូវគ្រប់ Outfit</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-2">
                <Heart className="w-4 h-4 text-[#DE7294] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold text-[#382B2A]">ងាយថែទាំ</span>
                  <span className="text-[11px] text-[#8F7B7A]">ស្អាតយូរអង្វែង</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Jewelry Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Soft decorative background glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#FCE2EB] to-[#FFF0F4] rounded-3xl blur-xl opacity-70 -z-10" />

              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-[#DE7294]/10 bg-[#FFFDF9] group">
                <img
                  src="/src/assets/images/hero_jewelry_showcase_1791447852835.jpg"
                  alt="Ma Nith Store stainless steel jewelry collection"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />

                {/* Subtle bottom gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />

                {/* Floating Aesthetic Taglet in Khmer */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-[#FAD9E5] flex items-center justify-between shadow-sm khmer-text">
                  <div>
                    <p className="text-[11px] font-semibold text-[#9E5D74] tracking-wide">
                      របស់ពេញនិយមប្រចាំហាង ♡
                    </p>
                    <p className="font-serif text-sm font-bold text-[#382B2A]">
                      Coquette Bow & Mini Heart
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#C24A71]">
                    <span>ចាប់ពី $11</span>
                    <Heart className="w-3.5 h-3.5 fill-[#DE7294] text-[#DE7294]" />
                  </div>
                </div>
              </div>

              {/* Cute Floating Social Proof Pin */}
              <div className="absolute -top-3 -right-2 bg-white px-3 py-1.5 rounded-full shadow-md border border-[#FCE2EB] flex items-center gap-1.5 text-xs text-[#554443] khmer-text">
                <span className="text-[#DE7294]">♡</span>
                <span className="font-medium text-[11px]">ពេញនិយមលើ TikTok</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
