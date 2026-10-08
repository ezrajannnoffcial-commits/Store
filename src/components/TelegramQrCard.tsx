import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Send, Copy, Check, Sparkles } from 'lucide-react';
import { getStoredTelegramUsername, getTelegramUrl, TELEGRAM_ACCOUNT_NAME, TELEGRAM_ACCOUNT_INITIALS } from '../config/storeConfig';

interface TelegramQrCardProps {
  customMessage?: string;
  compact?: boolean;
}

export const TelegramQrCard: React.FC<TelegramQrCardProps> = ({ customMessage, compact = false }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const telegramUsername = getStoredTelegramUsername();
  const directUrl = getTelegramUrl(customMessage, telegramUsername);

  useEffect(() => {
    // Generate high-resolution scannable QR code
    QRCode.toDataURL(directUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#1C2E82', // Deep royal navy/purple matching official Telegram QR theme
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR', err));
  }, [directUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`@${telegramUsername}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mx-auto w-full max-w-[320px] rounded-[32px] bg-[#0A0D18] p-5 shadow-2xl border border-[#F8C8D8]/30 overflow-hidden text-center">
      {/* Background cute doodle decoration ambiance matching Telegram theme */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none text-[#EF9FB8]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="15" cy="20" r="4" />
          <path d="M75 15 L80 25 L70 25 Z" />
          <path d="M20 70 Q 25 60 30 70" />
          <circle cx="85" cy="80" r="5" />
          <path d="M10 45 L15 50 L10 55" />
          <circle cx="50" cy="90" r="3" />
        </svg>
      </div>

      {/* White Telegram QR Card Container */}
      <div className="relative bg-white rounded-[24px] pt-7 pb-5 px-4 shadow-md">
        
        {/* Floating Avatar Circle: "SM" (SORM MAKARA) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FFA74F] text-white font-bold text-base flex items-center justify-center shadow-md border-2 border-white tracking-wide">
          {TELEGRAM_ACCOUNT_INITIALS}
        </div>

        {/* QR Code Graphic Frame */}
        <div className="relative mx-auto w-44 h-44 sm:w-48 sm:h-48 bg-white rounded-2xl p-1 flex items-center justify-center">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt={`Telegram QR code for @${telegramUsername}`}
              className="w-full h-full object-contain rounded-xl"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#FAF6F0] rounded-xl text-xs text-[#8F7B7A]">
              កំពុងដំណើរការ QR...
            </div>
          )}

          {/* Center Telegram Logo Circle Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-9 h-9 rounded-full bg-[#2AABEE] text-white flex items-center justify-center shadow-md border-2 border-white">
              <Send className="w-4 h-4 -rotate-12 translate-x-[-1px] translate-y-[-1px]" />
            </div>
          </div>
        </div>

        {/* Telegram Profile Name matching IMG_7481.jpeg */}
        <div className="mt-2.5">
          <h4 className="font-sans font-bold text-[#1C2E82] text-sm tracking-wide uppercase">
            {TELEGRAM_ACCOUNT_NAME}
          </h4>
          <p className="text-[11px] text-[#8F7B7A] font-medium">
            @{telegramUsername}
          </p>
        </div>
      </div>

      {/* Interactive Quick Actions */}
      <div className="mt-4 space-y-2">
        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-[#DE7294]/30"
        >
          <Send className="w-3.5 h-3.5" />
          <span>បើក Telegram ឥឡូវនេះ ♡</span>
        </a>

        <div className="flex items-center justify-center gap-2 text-[11px] text-white/70">
          <span>ស្កេន ឬចម្លង ID:</span>
          <button
            onClick={handleCopy}
            className="text-[#F8C8D8] hover:text-white font-medium underline underline-offset-2 flex items-center gap-1 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">បានចម្លង!</span>
              </>
            ) : (
              <span>@{telegramUsername}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
