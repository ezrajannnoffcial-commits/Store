import React from 'react';
import { Send, Heart, Sparkles, QrCode } from 'lucide-react';
import { BRAND, getTelegramUrl, getStoredTelegramUsername, TELEGRAM_ACCOUNT_NAME } from '../config/storeConfig';

interface FooterProps {
  onOpenSettings: () => void;
  onOpenQrModal: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSettings,
  onOpenQrModal,
  onNavigate,
  onSelectCategory,
}) => {
  const telegramUsername = getStoredTelegramUsername();

  const navLinks = [
    { label: 'ទំព័រដើម', id: 'hero' },
    { label: 'ហាង', id: 'catalog' },
    { label: 'អំពីយើង', id: 'about' },
    { label: 'ទំនាក់ទំនង', id: 'contact' },
  ];

  const categories = ['ខ្សែក', 'ចិញ្ចៀន', 'ក្រវិល', 'ខ្សែដៃ', 'ឈុតគ្រឿងអលង្ការ'];

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    onNavigate('catalog');
  };

  return (
    <footer className="bg-[#FFF8FA] border-t border-[#FCE2EB] pt-12 pb-24 md:pb-12 text-[#554443] khmer-text">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#FCE2EB]">
          
          {/* Brand Info Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#382B2A]">
                {BRAND.logoText}
              </span>
              <span className="text-xs font-semibold tracking-widest text-[#B57C8E] uppercase">
                {BRAND.logoSubtext}
              </span>
              <span className="text-[#DE7294] text-lg">♡</span>
            </div>

            {/* Exact required Khmer tagline: "គ្រឿងអលង្ការស្អាតៗ សម្រាប់រាល់ថ្ងៃរបស់អ្នក។" */}
            <p className="text-sm font-medium text-[#9E5D74]">
              {BRAND.tagline}
            </p>

            <p className="text-xs text-[#554443] max-w-sm leading-relaxed">
              ហាងគ្រឿងអលង្ការ Stainless Steel តូចមួយរបស់អ្នក ដែលរចនាឡើងយ៉ាងយកចិត្តទុកដាក់សម្រាប់ Outfit ប្រចាំថ្ងៃ។ កម្មង់យ៉ាងងាយស្រួលតាមរយៈ Telegram។
            </p>

            <p className="text-xs font-serif italic text-[#A63C62]">
              {BRAND.secondaryPhrase}
            </p>

            {/* Direct Telegram Handle / QR Trigger */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href={getTelegramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FAD9E5] text-xs font-semibold text-[#DE7294] hover:bg-[#DE7294] hover:text-white transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram: @{telegramUsername} ({TELEGRAM_ACCOUNT_NAME})</span>
              </a>

              <button
                onClick={onOpenQrModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F4] border border-[#FCE2EB] text-xs font-medium text-[#554443] hover:text-[#DE7294] transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#DE7294]" />
                <span>QR Code</span>
              </button>
            </div>
          </div>

          {/* Nav Links Column (ទំព័រដើម, ហាង, អំពីយើង, ទំនាក់ទំនង) */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#382B2A]">
              តំណភ្ជាប់
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="hover:text-[#DE7294] transition-colors cursor-pointer"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column (ខ្សែក, ចិញ្ចៀន, ក្រវិល, ខ្សែដៃ, ឈុតគ្រឿងអលង្ការ) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#382B2A]">
              ប្រភេទគ្រឿងអលង្ការ
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-[#DE7294] transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Column (Telegram, Instagram, TikTok) */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#382B2A]">
              បណ្តាញសង្គម
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={getTelegramUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DE7294] transition-colors flex items-center gap-1.5"
                >
                  <span>Telegram</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DE7294] transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://tiktok.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DE7294] transition-colors flex items-center gap-1.5"
                >
                  <span>TikTok</span>
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenSettings}
                  className="text-[11px] text-[#8F7B7A] hover:text-[#382B2A] transition-colors underline cursor-pointer"
                >
                  កំណត់ Telegram ID
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8F7B7A]">
          <p>© {new Date().getFullYear()} {BRAND.name}. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
          <div className="flex items-center gap-1.5 text-xs text-[#DE7294]">
            <span>Ma Nith Store ♡ — {BRAND.vibe}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
