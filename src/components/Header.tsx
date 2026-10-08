import React, { useState } from 'react';
import { Heart, Send, Menu, X, Settings2, QrCode, Lock } from 'lucide-react';
import { getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';

interface HeaderProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenSettings: () => void;
  onOpenQrModal: () => void;
  onNavigate: (sectionId: string) => void;
  onNavigateToAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenSettings,
  onOpenQrModal,
  onNavigate,
  onNavigateToAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const telegramUsername = getStoredTelegramUsername();

  const navLinks = [
    { label: 'ទំព័រដើម', id: 'hero' },
    { label: 'ហាង', id: 'catalog' },
    { label: 'អំពីយើង', id: 'about' },
    { label: 'ទំនាក់ទំនង', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F5EBE6]">
      {/* Top Announcement Banner */}
      <div className="bg-[#FFF0F4] border-b border-[#FCE2EB] py-1.5 px-4 text-center text-xs text-[#9E5D74] flex items-center justify-center gap-1.5 font-medium khmer-text">
        <span className="text-[#DE7294]">♡</span>
        <span>គ្រឿងអលង្ការ Stainless Steel ស្អាតៗ</span>
        <span className="text-[#DE7294]/60 mx-1">·</span>
        <span>កម្មង់ងាយៗតាម Telegram @{telegramUsername}</span>
        <span className="text-[#DE7294]">♡</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Keep Ma Nith Store in English as requested) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-left group transition-transform active:scale-95 cursor-pointer"
            aria-label="Ma Nith Store home"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#382B2A] group-hover:text-[#C24A71] transition-colors">
                Ma Nith
              </span>
              <span className="text-xs font-semibold tracking-widest text-[#B57C8E] uppercase">
                STORE
              </span>
              <span className="text-[#DE7294] text-base font-normal group-hover:scale-125 transition-transform">
                ♡
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-[#8F7B7A] tracking-wider -mt-1 font-sans">
              your little jewelry corner
            </p>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean natural Khmer text) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#554443] khmer-text">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="hover:text-[#C24A71] transition-colors relative py-1 text-sm tracking-wide font-medium cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Telegram QR Scanner Trigger */}
          <button
            onClick={onOpenQrModal}
            title="ស្កេន Telegram QR Code"
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#DE7294] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
            aria-label="Telegram QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>

          {/* Settings / Config trigger */}
          <button
            onClick={onOpenSettings}
            title={`កំណត់ Telegram Username (@${telegramUsername})`}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#DE7294] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
            aria-label="Telegram Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Admin portal shortcut */}
          {onNavigateToAdmin && (
            <button
              onClick={onNavigateToAdmin}
              title="ផ្ទាំងគ្រប់គ្រងហាង (Admin Portal)"
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#DE7294] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Wishlist Button with Heart Counter */}
          <button
            onClick={onOpenWishlist}
            className="relative min-h-[40px] min-w-[40px] px-2.5 py-1.5 flex items-center gap-1.5 rounded-full bg-[#FFF0F4] text-[#C24A71] hover:bg-[#FCE2EB] transition-colors border border-[#FAD9E5] cursor-pointer"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#DE7294] text-[#DE7294]' : 'text-[#DE7294]'}`} />
            <span className="text-xs font-semibold tabular-nums">
              {wishlistCount}
            </span>
          </button>

          {/* Primary Action: Telegram Contact (Exact required label: "ទាក់ទងមកយើង ♡") */}
          <a
            href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំចង់សួរព័ត៌មានបន្ថែមអំពីគ្រឿងអលង្ការបន្តិច!")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#DE7294] hover:bg-[#C24A71] rounded-full shadow-sm shadow-[#DE7294]/25 transition-all active:scale-95 whitespace-nowrap khmer-text cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ទាក់ទងមកយើង ♡</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-[#554443] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
            aria-label="បើកម៉ឺនុយ"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-[#F5EBE6] px-5 py-4 space-y-3 shadow-lg khmer-text animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#554443] hover:bg-[#FFF0F4] hover:text-[#C24A71] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#F5EBE6] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQrModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-[#554443] bg-[#FAF6F0] border border-[#F3EBE1] transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-[#DE7294]" />
              <span>ស្កេន Telegram QR Code (SORM MAKARA)</span>
            </button>

            {onNavigateToAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium text-[#8F7B7A] bg-white border border-[#F3EBE1] hover:text-[#DE7294] transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#DE7294]" />
                <span>ផ្ទាំងគ្រប់គ្រងហាង (Admin Portal)</span>
              </button>
            )}

            <a
              href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំចង់សួរព័ត៌មានបន្ថែមអំពីគ្រឿងអលង្ការបន្តិច!")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#DE7294] hover:bg-[#C24A71] transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ទាក់ទងមកយើង ♡</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
