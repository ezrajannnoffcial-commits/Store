import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { BRAND, getTelegramUrl } from '../config/storeConfig';

export const CommunityReviews: React.FC = () => {
  const reviews = [
    {
      handle: '@chloe.sweetly',
      item: 'Coquette Bow Necklace',
      date: '២ ថ្ងៃមុន',
      rating: '♡♡♡♡♡',
      comment: 'ពាក់ខ្សែកបូរ Coquette Bow ជាប់រហូត ៣ សប្តាហ៍ហើយ! ងូតទឹក ពាក់ទៅរៀន ទៅធ្វើការ នៅតែស្អាតរលោង មិនប្តូរពណ៌ ថែមទាំងកញ្ចប់ខ្ចប់ cute ខ្លាំង 🎀',
    },
    {
      handle: '@dara.aesthetic',
      item: 'Baby Pearl + Mini Heart Stack',
      date: '៥ ថ្ងៃមុន',
      rating: '♡♡♡♡♡',
      comment: 'ឆាតទៅកម្មង់តាម Telegram អ្នកលក់ឆ្លើយតបរហ័ស ហើយរួសរាយរាក់ទាក់ខ្លាំងណាស់ ♡ របស់ស្អាតដូចក្នុងរូប ពេញចិត្ត ១០០%!',
    },
    {
      handle: '@sophie.khmer',
      item: 'Everyday Hoop Earrings',
      date: '១ សប្តាហ៍មុន',
      rating: '♡♡♡♡♡',
      comment: 'ត្រចៀកខ្ញុំងាយរងប្រតិកម្មខ្លាំង តែក្រវិលកង Stainless Steel របស់ Ma Nith Store ស្រាលស្រួលពាក់ មិនឈឺត្រចៀកសូម្បីតែបន្តិច!',
    },
    {
      handle: '@clara.sweet',
      item: 'Pink Heart Bracelet',
      date: '២ សប្តាហ៍មុន',
      rating: '♡♡♡♡♡',
      comment: 'ខ្សែដៃបេះដូងផ្កាឈូក cute លើសពីក្នុងរូបទៅទៀត! លាងដៃញឹកញាប់ពេលធ្វើការក៏នៅតែស្អាត ស្រលាញ់ខ្លាំងណាស់ ឱ្យ 10/10 ហ្មង!',
    },
  ];

  return (
    <section className="py-14 bg-[#FFFDF9] border-b border-[#F5EBE6] khmer-text">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <div className="text-xs font-semibold text-[#B57C8E] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#DE7294]" />
            <span>Seen on TikTok & Instagram ♡</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#382B2A]">
            មតិយោបល់ពីអតិថិជនជាទីស្រលាញ់ ♡
          </h2>
          <p className="text-xs sm:text-sm text-[#554443]">
            អារម្មណ៍ពិតៗពីអ្នកដែលបានពាក់គ្រឿងអលង្ការ Ma Nith Store។ កុំភ្លេច Tag ពួកយើងពេលថតរូប Outfit ស្អាតៗណា!
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F3EBE1] hover:border-[#F8C8D8] transition-all flex flex-col justify-between shadow-xs hover:shadow-md hover:shadow-[#F8C8D8]/15"
            >
              <div className="space-y-2.5">
                {/* User & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#382B2A]">
                    {r.handle}
                  </span>
                  <span className="text-[#DE7294] text-xs tracking-widest font-serif">
                    {r.rating}
                  </span>
                </div>

                <p className="text-[11px] font-medium text-[#B57C8E]">
                  បានទិញ៖ {r.item}
                </p>

                <p className="text-xs text-[#554443] leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#F5EBE6] flex items-center justify-between text-[11px] text-[#8F7B7A]">
                <span>អតិថិជនពិតប្រាកដ</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram / TikTok Banner CTA */}
        <div className="mt-8 p-5 bg-[#FFF0F4] rounded-2xl border border-[#FCE2EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-sm sm:text-base font-bold text-[#382B2A]">
              ចែករំលែក Outfit ស្អាតៗរបស់អ្នកជាមួយ {BRAND.instagram} ♡
            </p>
            <p className="text-xs text-[#554443]">
              Tag ពួកយើងលើ TikTok ឬ IG Stories សម្រាប់ឱកាសបង្ហាញខ្លួនលើផេក!
            </p>
          </div>

          <a
            href={getTelegramUrl("សួស្តី Ma Nith Store ♡ ខ្ញុំចង់សួរព័ត៌មានបន្ថែមបន្តិច!")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white text-[#C24A71] hover:bg-[#DE7294] hover:text-white border border-[#FAD9E5] text-xs font-semibold transition-all whitespace-nowrap shadow-xs cursor-pointer"
          >
            ផ្ញើសារតាម Telegram ♡
          </a>
        </div>

      </div>
    </section>
  );
};
