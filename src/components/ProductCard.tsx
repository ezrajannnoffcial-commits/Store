import React, { useState } from 'react';
import { Heart, Send, Eye, Sparkles } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onOrderTelegram: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onOrderTelegram,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOrderTelegram(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white rounded-2xl border border-[#F3EBE1] hover:border-[#F8C8D8] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#F8C8D8]/20 hover:-translate-y-1 cursor-pointer flex flex-col khmer-text"
    >
      {/* Visual Slot */}
      <div className="relative aspect-square w-full bg-[#FAF6F0] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#FFF0F4] to-[#FAF6F0] text-[#DE7294] p-4 text-center">
            <Sparkles className="w-8 h-8 mb-2 opacity-70 animate-gentle-pulse" />
            <span className="font-serif text-sm font-semibold">{product.name}</span>
          </div>
        )}

        {/* Product Badges (Exact requested Khmer values: ថ្មី / លក់ដាច់ / ពេញនិយម) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs ${
                product.badge === 'លក់ដាច់'
                  ? 'bg-[#382B2A] text-white'
                  : product.badge === 'ថ្មី'
                  ? 'bg-[#FFF0F4] text-[#C24A71] border border-[#FCE2EB] font-bold'
                  : 'bg-[#DE7294] text-white'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-2.5 right-2.5 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#554443] hover:text-[#DE7294] transition-all active:scale-90 shadow-sm border border-[#F5EBE6] cursor-pointer"
          aria-label={isWishlisted ? `ដក ${product.name} ចេញពី wishlist` : `រក្សាទុក ${product.name}`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#DE7294] text-[#DE7294]' : 'text-[#8F7B7A]'
            }`}
          />
        </button>

        {/* Inventory status pill on image */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="text-[10px] font-medium text-[#554443] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md border border-[#F5EBE6]">
            {product.stockStatus}
          </span>
        </div>

        {/* Quick View Button on Hover: "មើលលម្អិត" */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="w-full py-2 bg-white/95 backdrop-blur-md rounded-xl text-xs font-semibold text-[#382B2A] hover:text-[#C24A71] border border-[#FAD9E5] shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>មើលលម្អិត</span>
          </button>
        </div>
      </div>

      {/* Product Information in Natural Khmer */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Material kicker */}
          <div className="text-[11px] font-medium text-[#8F7B7A] flex items-center gap-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-[#DE7294]/60">·</span>
            <span className="truncate">Stainless Steel</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-semibold text-[#382B2A] group-hover:text-[#C24A71] transition-colors line-clamp-1 mt-0.5 leading-snug">
            {product.name}
          </h3>

          {/* Price (Exact requested format with តម្លៃ) */}
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="text-xs text-[#8F7B7A]">តម្លៃ</span>
            <span className="text-base sm:text-lg font-bold text-[#DE7294] tabular-nums font-sans">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Main Purchase Button: "♡ ទិញឥឡូវនេះ" */}
        <div className="pt-1">
          <button
            onClick={handleBuyNowClick}
            className="w-full py-2.5 px-3 rounded-xl bg-[#FFF0F4] hover:bg-[#DE7294] text-[#A63C62] hover:text-white border border-[#FCE2EB] hover:border-[#DE7294] text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 group/btn cursor-pointer active:scale-98 shadow-xs"
          >
            <Heart className="w-3.5 h-3.5 text-[#DE7294] group-hover/btn:text-white group-hover/btn:fill-white transition-colors" />
            <span>♡ ទិញឥឡូវនេះ</span>
            <Send className="w-3 h-3 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
