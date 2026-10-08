import React from 'react';
import { Heart, Sparkles, Send } from 'lucide-react';
import { BRAND, getTelegramUrl } from '../config/storeConfig';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-16 bg-[#FFFDF9] border-b border-[#F5EBE6] relative overflow-hidden khmer-text">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        
        {/* Cute Icon */}
        <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF0F4] border border-[#FCE2EB] flex items-center justify-center text-[#DE7294]">
          <Heart className="w-6 h-6 fill-[#DE7294]" />
        </div>

        {/* Heading (Exact user request: "រឿងរ៉ាវរបស់ Ma Nith Store ♡") */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[#B57C8E] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#DE7294]" />
            <span>Our Little Jewelry Story</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#382B2A]">
            រឿងរ៉ាវរបស់ Ma Nith Store ♡
          </h2>
          <p className="font-serif italic text-sm text-[#9E5D74]">
            {BRAND.secondaryPhrase}
          </p>
        </div>

        {/* Personal & Warm Story */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#FAD9E5] shadow-xs text-xs sm:text-sm text-[#554443] leading-relaxed space-y-4 text-left sm:text-center max-w-2xl mx-auto">
          <p>
            សួស្តីអ្នកទាំងអស់គ្នា! ♡ Ma Nith Store កើតចេញពីក្តីស្រលាញ់ចំពោះគ្រឿងអលង្ការតូចៗ ម៉ូដ cute និងសាមញ្ញ ដែលជួយបន្ថែមភាពជឿជាក់ដល់មនុស្សស្រីយើងគ្រប់ៗរូប។
          </p>
          <p>
            យើងយល់ច្បាស់ថា ការជ្រើសរើសគ្រឿងអលង្ការសម្រាប់ពាក់ប្រចាំថ្ងៃ ត្រូវតែមានទាំង <strong>ភាពស្រស់ស្អាត</strong> និង <strong>ភាពធន់រឹងមាំ</strong>។ ហេតុនេះហើយ ទើប Ma Nith Store ផ្តោតលើការជ្រើសរើសគ្រឿងអលង្ការធ្វើពី <strong>Stainless Steel</strong> ដែលមានគុណភាពល្អ មិនងាយខូច ងាយស្រួលថែទាំ និងមានតម្លៃសមរម្យបំផុត។
          </p>
          <p className="text-[#DE7294] font-medium">
            គោលបំណងរបស់យើងគឺចង់ឃើញអ្នកទាំងអស់គ្នា ញញឹម និងមានអារម្មណ៍ពិសេសជាមួយ Outfit ប្រចាំថ្ងៃរបស់អ្នក ♡
          </p>
        </div>

        {/* Chat Callout */}
        <div className="pt-2">
          <a
            href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំបានអានរឿងរ៉ាវរបស់ហាង ហើយចង់សួរនាំពីគ្រឿងអលង្ការបន្តិច!")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFF0F4] hover:bg-[#FCE2EB] text-[#A63C62] text-xs font-semibold border border-[#FAD9E5] transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#DE7294]" />
            <span>និយាយលេងជាមួយ Ma Nith Store តាម Telegram ♡</span>
          </a>
        </div>

      </div>
    </section>
  );
};
