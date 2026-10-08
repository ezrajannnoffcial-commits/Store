import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Sparkles, ArrowLeft, Heart, ShieldCheck } from 'lucide-react';
import { adminLogin, StoreSettings } from '../../services/api';

interface AdminLoginProps {
  onLoginSuccess: (settings?: StoreSettings) => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStore }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('សូមបញ្ចូលពាក្យសម្ងាត់');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await adminLogin(password.trim());
      if (res.success) {
        onLoginSuccess(res.settings);
      } else {
        setErrorMessage(res.error || 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ');
      }
    } catch {
      setErrorMessage('មានបញ្ហាក្នុងការតភ្ជាប់ សូមព្យាយាមម្តងទៀត');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0F4] via-[#FFFDF9] to-[#FFF8FA] flex flex-col justify-center items-center p-4 khmer-text">
      
      {/* Top Back Link */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
        <button
          onClick={onBackToStore}
          className="text-xs font-semibold text-[#8F7B7A] hover:text-[#C24A71] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ត្រឡប់ទៅកាន់ Storefront</span>
        </button>
        <span className="text-xs font-serif text-[#DE7294]">Ma Nith Store ♡</span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#FAD9E5] shadow-xl shadow-[#DE7294]/10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#FFF0F4] border border-[#FCE2EB] flex items-center justify-center text-[#DE7294] shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div className="flex items-baseline justify-center gap-1.5 mt-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#382B2A]">
              Ma Nith
            </span>
            <span className="text-xs font-semibold tracking-widest text-[#B57C8E] uppercase">
              STORE
            </span>
            <span className="text-[#DE7294] text-base">♡</span>
          </div>

          <h2 className="text-lg font-bold text-[#382B2A]">
            ផ្ទាំងគ្រប់គ្រងហាង (Admin Portal)
          </h2>
          <p className="text-xs text-[#8F7B7A]">
            សម្រាប់ម្ចាស់ហាងគ្រប់គ្រងផលិតផល តម្លៃ ស្តុក និង Telegram
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-150">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#382B2A] mb-1.5">
              ពាក្យសម្ងាត់ Admin (Admin Password):
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="បញ្ចូលពាក្យសម្ងាត់..."
                className="w-full pl-4 pr-11 py-3 rounded-xl border border-[#F3EBE1] focus:border-[#DE7294] focus:ring-2 focus:ring-[#DE7294]/20 outline-none text-sm text-[#382B2A] transition-all bg-[#FFFDF9]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F7B7A] hover:text-[#382B2A] p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#DE7294] hover:bg-[#C24A71] text-white text-sm font-semibold tracking-wide shadow-md shadow-[#DE7294]/30 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span>កំពុងផ្ទៀងផ្ទាត់...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>ចូលទៅកាន់ផ្ទាំងគ្រប់គ្រង ♡</span>
              </>
            )}
          </button>
        </form>

        {/* Production Security Note */}
        <div className="pt-2 text-center">
          <p className="text-[11px] text-[#8F7B7A] flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3 text-[#DE7294]" />
            <span>តំបន់សុវត្ថិភាពសម្រាប់ម្ចាស់ហាង Ma Nith Store ប៉ុណ្ណោះ</span>
          </p>
        </div>

      </div>
    </div>
  );
};
