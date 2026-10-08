import React from 'react';

export const FloatingDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {/* Sparkle 1 */}
      <div className="absolute top-[8%] left-[6%] text-[#F8C8D8] opacity-65 animate-gentle-float">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      {/* Bow icon top right */}
      <div className="absolute top-[12%] right-[8%] text-[#EF9FB8] opacity-55 animate-gentle-float-delayed">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 11C11.2 9.5 9.5 8 7 8C4 8 2 10.5 2 13C2 15.5 4.5 17 7 17C10 17 11.5 14 12 13C12.5 14 14 17 17 17C19.5 17 22 15.5 22 13C22 10.5 20 8 17 8C14.5 8 12.8 9.5 12 11ZM7 15C5.5 15 4 14 4 13C4 11.8 5.2 10 7 10C8.8 10 10.2 11.5 10.8 12.5C10.1 13.7 8.8 15 7 15ZM17 15C15.2 15 13.9 13.7 13.2 12.5C13.8 11.5 15.2 10 17 10C18.8 10 20 11.8 20 13C20 14 18.5 15 17 15Z" />
        </svg>
      </div>

      {/* Heart 1 */}
      <div className="absolute top-[48%] left-[3%] text-[#FCE2EB] opacity-75 animate-gentle-pulse">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Tiny star */}
      <div className="absolute top-[75%] left-[8%] text-[#E6C280] opacity-50 animate-gentle-float">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15 9L22 10L17 15L18 22L12 18.5L6 22L7 15L2 10L9 9L12 2Z" />
        </svg>
      </div>

      {/* Sparkle 2 bottom right */}
      <div className="absolute top-[65%] right-[5%] text-[#F8C8D8] opacity-60 animate-gentle-float">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>

      {/* Tiny heart floating */}
      <div className="absolute top-[28%] right-[14%] text-[#F8C8D8] opacity-45 animate-gentle-float-delayed">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
};
