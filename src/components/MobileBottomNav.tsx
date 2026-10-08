import React from 'react';
import { Sparkles, Heart, Send, Home } from 'lucide-react';
import { getTelegramUrl, getStoredTelegramUsername } from '../config/storeConfig';

interface MobileBottomNavProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  wishlistCount,
  onOpenWishlist,
  onNavigateHome,
  onNavigateShop,
}) => {
  const telegramUsername = getStoredTelegramUsername();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F8C8D8] px-3 py-2 shadow-lg">
      <div className="grid grid-cols-4 items-center gap-1 max-w-md mx-auto">
        
        {/* Home: ទំព័រដើម */}
        <button
          onClick={onNavigateHome}
          className="flex flex-col items-center justify-center py-1 text-[#554443] hover:text-[#DE7294] transition-colors cursor-pointer"
          aria-label="ទំព័រដើម"
        >
          <Home className="w-4 h-4 text-[#8F7B7A]" />
          <span className="text-[10px] font-medium mt-0.5 tracking-tight">ទំព័រដើម</span>
        </button>

        {/* Shop: ហាង */}
        <button
          onClick={onNavigateShop}
          className="flex flex-col items-center justify-center py-1 text-[#554443] hover:text-[#DE7294] transition-colors cursor-pointer"
          aria-label="ហាង"
        >
          <Sparkles className="w-4 h-4 text-[#DE7294]" />
          <span className="text-[10px] font-medium mt-0.5 tracking-tight">ហាង</span>
        </button>

        {/* Wishlist: បញ្ជីចូលចិត្ត */}
        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center justify-center py-1 text-[#554443] hover:text-[#DE7294] transition-colors relative cursor-pointer"
          aria-label={`បញ្ជីចូលចិត្ត (${wishlistCount})`}
        >
          <div className="relative">
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#DE7294] text-[#DE7294]' : 'text-[#8F7B7A]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#DE7294] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5 tracking-tight">បញ្ជីចូលចិត្ត</span>
        </button>

        {/* Telegram Direct Chat */}
        <a
          href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំចង់សាកសួរព័ត៌មានបន្តិច!")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[#C24A71] hover:text-[#DE7294] transition-colors cursor-pointer"
          aria-label={`Telegram chat with @${telegramUsername}`}
        >
          <Send className="w-4 h-4 text-[#DE7294]" />
          <span className="text-[10px] font-medium mt-0.5 tracking-tight">Telegram</span>
        </a>

      </div>
    </div>
  );
};
