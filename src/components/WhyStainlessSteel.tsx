import React from 'react';
import { Sparkles, Shield, HeartHandshake, Heart, Palette, Sparkle } from 'lucide-react';

export const WhyStainlessSteel: React.FC = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'រឹងមាំ',
      description: 'សាកសមសម្រាប់ការពាក់ប្រចាំថ្ងៃ។ ធន់នឹងការប៉ះទង្គិចធម្មតា មិនងាយបាក់ ឬខូចទ្រង់ទ្រាយ។',
    },
    {
      icon: Palette,
      title: 'ងាយស្រួលផ្គូផ្គង',
      description: 'ងាយផ្គូផ្គងជាមួយ Outfit ជាច្រើនស្ទាយ មិនថាទៅរៀន ធ្វើការ ឬដើរលេងចុងសប្តាហ៍។',
    },
    {
      icon: Sparkle,
      title: 'ស្ទាយមិនងាយធុញ',
      description: 'រចនាបែបសាមញ្ញ និងងាយពាក់។ ម៉ូដបែប Minimalist ទាន់សម័យ ដែលពាក់បានយូរអង្វែង។',
    },
    {
      icon: Heart,
      title: 'ងាយថែទាំ',
      description: 'ងាយស្រួលសម្អាត និងថែរក្សា។ គ្រាន់តែជូតដោយក្រណាត់ទន់ស្អាត គ្រឿងអលង្ការនឹងភ្លឺរលោងស្អាតជានិច្ច។',
    },
    {
      icon: HeartHandshake,
      title: 'តម្លៃសមរម្យ គុណភាពល្អ',
      description: 'គ្រឿងអលង្ការមើលទៅថ្លៃថ្នូរ តែតម្លៃសមរម្យសម្រាប់យុវវ័យ និងសិស្សនិស្សិត។',
    },
    {
      icon: Sparkles,
      title: 'ខ្ចប់ជាមួយកញ្ចប់ស្អាតៗ ♡',
      description: 'គ្រប់ការកម្មង់សុទ្ធតែមានថង់ក្រណាត់ពណ៌ផ្កាឈូកយ៉ាងស្រស់ស្អាត អាចទិញពាក់ខ្លួនឯង ឬធ្វើជាកាដូជូនមិត្តភក្តិក៏បាន។',
    },
  ];

  return (
    <section id="why-stainless-steel" className="py-14 bg-[#FFF8FA] border-y border-[#FCE2EB] relative overflow-hidden khmer-text">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header (Exact requested title: "ស្អាត ហើយសាកសមសម្រាប់ពាក់រាល់ថ្ងៃ ♡") */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="text-xs font-semibold text-[#B57C8E] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#DE7294]" />
            <span>Ma Nith Store Guarantee</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#382B2A]">
            ស្អាត ហើយសាកសមសម្រាប់ពាក់រាល់ថ្ងៃ ♡
          </h2>
          <p className="text-xs sm:text-sm text-[#554443] leading-relaxed">
            គ្រឿងអលង្ការធ្វើពី Stainless Steel ផ្តល់នូវភាពស្រស់ស្អាត និងភាពធន់ ធ្វើឱ្យអ្នកមានទំនុកចិត្តក្នុងការពាក់រាល់ថ្ងៃ។
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-[#FAD9E5] shadow-xs hover:border-[#DE7294] transition-colors space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF0F4] text-[#DE7294] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#382B2A]">
                  {b.title}
                </h3>
                <p className="text-xs text-[#554443] leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
