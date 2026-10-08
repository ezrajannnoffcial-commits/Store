import React, { useState } from 'react';
import { X, Check, RotateCcw, Send, Settings2, Lock } from 'lucide-react';
import {
  DEFAULT_TELEGRAM_USERNAME,
  getStoredTelegramUsername,
  saveTelegramUsername,
  TELEGRAM_ACCOUNT_NAME,
} from '../config/storeConfig';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (newUsername: string) => void;
  onNavigateToAdmin?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  onNavigateToAdmin,
}) => {
  const currentUsername = getStoredTelegramUsername();
  const [usernameInput, setUsernameInput] = useState(currentUsername);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = usernameInput.trim().replace(/^@/, '');
    saveTelegramUsername(cleaned || DEFAULT_TELEGRAM_USERNAME);
    onSaved(cleaned || DEFAULT_TELEGRAM_USERNAME);
    setIsSavedFeedback(true);
    setTimeout(() => {
      setIsSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setUsernameInput(DEFAULT_TELEGRAM_USERNAME);
    saveTelegramUsername(DEFAULT_TELEGRAM_USERNAME);
    onSaved(DEFAULT_TELEGRAM_USERNAME);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 khmer-text">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#382B2A]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#F8C8D8] p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-full text-[#8F7B7A] hover:text-[#382B2A] hover:bg-[#FFF0F4] transition-colors cursor-pointer"
          aria-label="បិទ"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3 text-[#DE7294]">
          <Settings2 className="w-5 h-5" />
          <h3 className="text-base sm:text-lg font-bold text-[#382B2A]">
            ការកំណត់គណនី Telegram
          </h3>
        </div>

        <p className="text-xs text-[#554443] mb-4 leading-relaxed">
          ប៊ូតុង <strong>♡ ទិញឥឡូវនេះ</strong> និងតំណភ្ជាប់ទាំងអស់ នឹងបើកទៅកាន់គណនី Telegram នេះដោយស្វ័យប្រវត្តិ។ ម្ចាស់គណនីបច្ចុប្បន្ន៖ <strong>{TELEGRAM_ACCOUNT_NAME}</strong>
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#382B2A] mb-1.5">
              Telegram Username:
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-sm font-semibold text-[#8F7B7A]">
                @
              </span>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="YOUR_TELEGRAM_USERNAME"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] focus:ring-2 focus:ring-[#DE7294]/20 outline-none text-sm text-[#382B2A] font-medium transition-all"
                autoFocus
              />
            </div>
            <p className="text-[11px] text-[#8F7B7A] mt-1.5">
              តំណភ្ជាប់ Telegram ផ្ទាល់៖ <code className="text-[#DE7294] bg-[#FFF0F4] px-1.5 py-0.5 rounded">https://t.me/{usernameInput || 'sormmakara'}</code>
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#8F7B7A] hover:text-[#DE7294] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>កំណត់ដូចដើម</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#DE7294]/20"
            >
              {isSavedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>បានរក្សាទុក!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>រក្សាទុក</span>
                </>
              )}
            </button>
          </div>
        </form>

        {onNavigateToAdmin && (
          <div className="mt-5 pt-4 border-t border-[#F5EBE6] flex items-center justify-between text-xs">
            <span className="text-[#8F7B7A]">គ្រប់គ្រងផលិតផល & ស្តុក:</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateToAdmin();
              }}
              className="text-[#DE7294] hover:text-[#C24A71] font-semibold flex items-center gap-1 cursor-pointer bg-[#FFF0F4] px-3 py-1.5 rounded-xl border border-[#FCE2EB] transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>ចូល Admin Dashboard →</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
