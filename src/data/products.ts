export type Category = 'ទាំងអស់' | 'ខ្សែក' | 'ចិញ្ចៀន' | 'ក្រវិល' | 'ខ្សែដៃ' | 'ឈុតគ្រឿងអលង្ការ';

export type ProductBadge = 'ថ្មី' | 'លក់ដាច់' | 'ពេញនិយម';

export type StockStatus = 'មានក្នុងស្តុក' | 'នៅសល់តិចតួច ♡' | 'អស់ពីស្តុក';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'ខ្សែក' | 'ចិញ្ចៀន' | 'ក្រវិល' | 'ខ្សែដៃ' | 'ឈុតគ្រឿងអលង្ការ';
  badge?: ProductBadge;
  image: string;
  secondaryImage?: string;
  material: string;
  color: string;
  description: string;
  lengthOrSize: string;
  stylingTip: string;
  stockStatus: StockStatus;
  careGuide: string;
  details: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'coquette-bow-necklace',
    name: 'Coquette Bow Necklace (ខ្សែកបូរ)',
    price: 16.00,
    category: 'ខ្សែក',
    badge: 'លក់ដាច់',
    image: '/src/assets/images/product_bow_necklace_1791447866961.jpg',
    secondaryImage: '/src/assets/images/hero_jewelry_showcase_1791447852835.jpg',
    material: 'Stainless Steel ស្រោបពណ៌មាស 18k',
    color: 'ពណ៌មាស (Gold)',
    description: 'ខ្សែកបន្តោងបូរ Coquette Bow ដ៏គួរឱ្យស្រលាញ់ និងពេញនិយមបំផុត! រចនាបថទន់ភ្លន់ គួរឱ្យស្រលាញ់ សាកសមសម្រាប់ពាក់រាល់ថ្ងៃ។ ធ្វើពី Stainless Steel រឹងមាំ និងស្រាលស្រួលពាក់។',
    lengthOrSize: 'ប្រវែង 40cm + ខ្សែបន្ថែម 5cm (អាចសារ៉េបាន)',
    stylingTip: 'ពាក់ផ្គូផ្គងជាមួយអាវ Cardigan ឬរ៉ូបផ្កាតូចៗ មើលទៅ cute និង soft ខ្លាំងណាស់ ♡',
    stockStatus: 'នៅសល់តិចតួច ♡',
    careGuide: 'ជូតសម្អាតដោយក្រណាត់ទន់ស្ងួតបន្ទាប់ពីពាក់រួច និងរក្សាទុកក្នុងថង់ក្រណាត់។',
    details: [
      'ទំហំបន្តោងបូរ៖ 14mm x 11mm',
      'គន្លឹះចាក់សោប្រភេទ Lobster Claw ងាយស្រួលពាក់',
      'គ្មានសារធាតុនីកែល (Nickel-Free) មិនរមាស់ស្បែក',
      'រឹងមាំ សាកសមសម្រាប់ការពាក់ប្រចាំថ្ងៃ'
    ]
  },
  {
    id: 'baby-pearl-necklace',
    name: 'Baby Pearl Necklace (ខ្សែកគជ់ខ្យងតូច)',
    price: 15.50,
    category: 'ខ្សែក',
    badge: 'ថ្មី',
    image: '/src/assets/images/product_pearl_necklace_1791447891729.jpg',
    secondaryImage: '/src/assets/images/hero_jewelry_showcase_1791447852835.jpg',
    material: 'Stainless Steel & គ្រាប់គជ់ទឹកសាបតូចៗ',
    color: 'ពណ៌គជ់ធម្មជាតិ & ពណ៌មាស',
    description: 'ខ្សែកគជ់គ្រាប់តូចៗម៉ូដសុភាព និងថ្លៃថ្នូរ។ គ្រាប់គជ់រលោងស្អាត ផ្គុំជាមួយខ្សែ Stainless Steel មិនងាយបាក់ និងងាយស្រួលថែទាំ។',
    lengthOrSize: 'ប្រវែង 38cm + ខ្សែបន្ថែម 6cm',
    stylingTip: 'ពាក់តែមួយក៏ស្អាត ឬពាក់ជង់ជាមួយខ្សែកបន្តោងបេះដូងក៏កាន់តែទាក់ទាញ!',
    stockStatus: 'មានក្នុងស្តុក',
    careGuide: 'ជៀសវាងការប៉ះពាល់ជាមួយជាតិអាល់កុល ឬទឹកអប់ខ្លាំងៗដោយផ្ទាល់។',
    details: [
      'គ្រាប់គជ់ខ្យងទំហំ 3-4mm ស្រស់ស្អាតស្មើគ្នា',
      'ខ្សែទំពក់ Stainless Steel រឹងមាំ',
      'ទម្ងន់ស្រាល មិនធ្ងន់ក',
      'ងាយស្រួលផ្គូផ្គងជាមួយគ្រប់ Outfit'
    ]
  },
  {
    id: 'mini-heart-necklace',
    name: 'Mini Heart Necklace (ខ្សែកបេះដូងតូច)',
    price: 14.00,
    category: 'ខ្សែក',
    badge: 'ពេញនិយម',
    image: '/src/assets/images/product_heart_necklace_1791447881045.jpg',
    secondaryImage: '/src/assets/images/hero_jewelry_showcase_1791447852835.jpg',
    material: 'Stainless Steel ខាត់រលោងបែបកញ្ចក់',
    color: 'ពណ៌មាស (Gold)',
    description: 'ខ្សែកបន្តោងបេះដូងតូចប៉ោងបែប 3D គួរឱ្យស្រលាញ់ និងរលោងស្អាតខ្លាំង។ ម៉ូដបែប Minimalist ដែលសាកសមបំផុតសម្រាប់ពាក់ទៅរៀន ឬទៅធ្វើការរាល់ថ្ងៃ។',
    lengthOrSize: 'ប្រវែង 42cm + ខ្សែបន្ថែម 5cm',
    stylingTip: 'សាកសមជាមួយអាវយឺតសាមញ្ញ ឬអាវសាច់ក្រណាត់ក V ដើម្បីបង្ហាញភាពទាក់ទាញ។',
    stockStatus: 'មានក្នុងស្តុក',
    careGuide: 'លាងសម្អាតដោយទឹកធម្មតា រួចជូតឱ្យស្ងួតស្អាតជាការស្រេច។',
    details: [
      'បន្តោងបេះដូង 3D ទំហំ 8mm គួរឱ្យស្រលាញ់',
      'ខ្សែច្រវ៉ាក់តូចម៉ត់ រលោងមិនទាក់សក់',
      'សម្ភារៈ Stainless Steel គុណភាពខ្ពស់',
      'ស្ទាយមិនងាយធុញ រចនាបែបសាមញ្ញ និងងាយពាក់'
    ]
  },
  {
    id: 'everyday-hoop-earrings',
    name: 'Everyday Hoop Earrings (ក្រវិលកងមូល)',
    price: 12.50,
    category: 'ក្រវិល',
    badge: 'លក់ដាច់',
    image: '/src/assets/images/product_hoop_earrings_1791447903039.jpg',
    secondaryImage: '/src/assets/images/hero_jewelry_showcase_1791447852835.jpg',
    material: 'Stainless Steel ប្រហោងក្នុង (ស្រាលស្រួលពាក់)',
    color: 'ពណ៌មាស (Gold)',
    description: 'ក្រវិលកងមាសម៉ូដ Classic ដែលមនុស្សស្រីគ្រប់រូបគួរតែមាន! រចនាប្រហោងក្នុង ធ្វើឱ្យមានទម្ងន់ស្រាលខ្លាំង មិនឈឺត្រចៀកពេលពាក់ពេញមួយថ្ងៃ។',
    lengthOrSize: 'ទំហំមុខកាត់ 20mm, កម្រាស់ 3.5mm',
    stylingTip: 'បួងសក់ឡើងលើ ហើយពាក់ក្រវិលនេះ មើលទៅស្អាត និងទាន់សម័យខ្លាំងណាស់!',
    stockStatus: 'មានក្នុងស្តុក',
    careGuide: 'ជូតម្ជុលក្រវិលដោយក្រដាសទន់ស្អាតមុនពេលពាក់។',
    details: [
      'គន្លឹះចុចជាប់ល្អ មិនងាយរបូតជ្រុះ',
      'ទម្ងន់ស្រាលត្រឹមតែ 4g ក្នុងមួយគូ',
      'សុភាពចំពោះស្បែកត្រចៀកដែលងាយរងប្រតិកម្ម',
      'សាកសមសម្រាប់ការពាក់ប្រចាំថ្ងៃ'
    ]
  },
  {
    id: 'pink-heart-bracelet',
    name: 'Pink Heart Bracelet (ខ្សែដៃបេះដូងផ្កាឈូក)',
    price: 13.50,
    category: 'ខ្សែដៃ',
    badge: 'ថ្មី',
    image: '/src/assets/images/product_heart_bracelet_1791447914211.jpg',
    secondaryImage: '/src/assets/images/hero_jewelry_showcase_1791447852835.jpg',
    material: 'Stainless Steel & ស្រោបពណ៌ផ្កាឈូក pastel',
    color: 'ពណ៌មាស & ពណ៌ផ្កាឈូក (Blush Pink)',
    description: 'ខ្សែដៃច្រវ៉ាក់មាសតូច បំពាក់ដោយបន្តោងបេះដូងពណ៌ផ្កាឈូក pastel ដ៏ផ្អែមល្ហែម។ រចនាឡើងយ៉ាងយកចិត្តទុកដាក់សម្រាប់អ្នកដែលស្រលាញ់ស្ទាយ girly និង cute។',
    lengthOrSize: 'ប្រវែង 16cm + ខ្សែបន្ថែម 4cm (ត្រូវគ្រប់ទំហំកដៃ)',
    stylingTip: 'ពាក់ផ្គូផ្គងជាមួយនាឡិកាដៃ ឬខ្សែដៃមាសផ្សេងទៀត បង្កើតជា Layer ដ៏ទាក់ទាញ។',
    stockStatus: 'នៅសល់តិចតួច ♡',
    careGuide: 'រក្សាទុកក្នុងកន្លែងស្ងួត ជៀសវាងការកកិតខ្លាំង។',
    details: [
      'បន្តោងបេះដូងពណ៌ផ្កាឈូកទឹកថ្នាំរលោងស្អាត',
      'ខ្សែច្រវ៉ាក់ Stainless Steel រឹងមាំមិនងាយដាច់',
      'អាចសារ៉េទំហំតាមទំហំកដៃបាន',
      'ពណ៌ផ្អែមល្ហែម មើលទៅក្មេងជាងវ័យ'
    ]
  },
  {
    id: 'simple-stainless-steel-ring',
    name: 'Simple Stainless Steel Ring (ចិញ្ចៀនរលោងសាមញ្ញ)',
    price: 11.00,
    category: 'ចិញ្ចៀន',
    image: '/src/assets/images/hero_jewelry_showcase_1791447852835.jpg',
    secondaryImage: '/src/assets/images/product_bow_necklace_1791447866961.jpg',
    material: 'Stainless Steel 316L រឹងមាំខ្ពស់',
    color: 'ពណ៌មាស (Gold)',
    description: 'ចិញ្ចៀនរលោងម៉ូដ Minimalist សាមញ្ញតែមានភាពទាក់ទាញខ្ពស់។ ផ្ទៃខាងក្នុងកោងរលោង (Comfort Fit) ធ្វើឱ្យពាក់ទៅស្រួលដៃ មិនទើស ឬឈឺម្រាមដៃឡើយ។',
    lengthOrSize: 'មានលេខ 5, 6, 7, 8 (ខ្នាតស្តង់ដារ)',
    stylingTip: 'ពាក់ជង់គ្នា ២ ឬ ៣ វង់លើម្រាមដៃតែមួយ ឬពាក់នៅម្រាមចង្អុលដើម្បីបង្កើនភាពទាន់សម័យ។',
    stockStatus: 'មានក្នុងស្តុក',
    careGuide: 'ងាយស្រួលថែទាំ អាចលាងសម្អាតជាមួយសាប៊ូកក់សក់ ឬសាប៊ូដុសខ្លួនបាន។',
    details: [
      'កម្រាស់ចិញ្ចៀន 2mm ល្មមស្អាតលើម្រាមដៃ',
      'រចនា Comfort Fit មិនរឹបម្រាមដៃ',
      'រឹងមាំ មិនងាយវៀច ឬខូចទ្រង់ទ្រាយ',
      'សាកសមសម្រាប់ការពាក់ប្រចាំថ្ងៃ'
    ]
  },
  {
    id: 'layered-necklace-set',
    name: 'Layered Necklace Set (ឈុតខ្សែកជង់ ២ ខ្សែ)',
    price: 24.00,
    category: 'ឈុតគ្រឿងអលង្ការ',
    badge: 'លក់ដាច់',
    image: '/src/assets/images/hero_jewelry_showcase_1791447852835.jpg',
    secondaryImage: '/src/assets/images/product_heart_necklace_1791447881045.jpg',
    material: 'Stainless Steel គុណភាពពិសេស ២ ខ្សែ',
    color: 'ពណ៌មាស (Gold)',
    description: 'ឈុតខ្សែកជង់ដែលរួមបញ្ចូលគ្នានូវខ្សែ Snake Chain រលោង និងខ្សែកបន្តោងបេះដូងតូច។ អាចពាក់ជាមួយគ្នា ឬពាក់ដាច់ដោយឡែកពីគ្នាក៏បានតាមចំណូលចិត្ត។',
    lengthOrSize: 'ខ្សែលើ 38cm, ខ្សែក្រោម 44cm + 5cm បន្ថែម',
    stylingTip: 'ពាក់តែមួយឈុតនេះជាមួយអាវ Blazer ឬអាវសាមញ្ញ Outfit របស់អ្នកនឹងមើលទៅថ្លៃថ្នូរភ្លាមៗ!',
    stockStatus: 'នៅសល់តិចតួច ♡',
    careGuide: 'ដាក់ព្យួរដាច់ដោយឡែកដើម្បីកុំឱ្យខ្សែជំពាក់គ្នា។',
    details: [
      'មាន ២ ខ្សែដាច់ដោយឡែកពីគ្នា អាចពាក់តាមចិត្ត',
      'តម្លៃចំណេញជាងទិញដាច់ដោយឡែក',
      'រឹងមាំ សាកសមសម្រាប់ការពាក់ប្រចាំថ្ងៃ',
      'ងាយស្រួលផ្គូផ្គងជាមួយ Outfit ជាច្រើនស្ទាយ'
    ]
  },
  {
    id: 'dainty-bow-huggie-hoops',
    name: 'Dainty Bow Huggie Hoops (ក្រវិលបូរតូច)',
    price: 13.00,
    category: 'ក្រវិល',
    badge: 'ថ្មី',
    image: '/src/assets/images/product_bow_necklace_1791447866961.jpg',
    secondaryImage: '/src/assets/images/product_hoop_earrings_1791447903039.jpg',
    material: 'Stainless Steel & បន្តោងបូរតូច',
    color: 'ពណ៌មាស (Gold)',
    description: 'ក្រវិល Huggie គន្លឹះខ្ទាស់ជាប់ត្រចៀក មានបន្តោងបូរតូចយោលចុះក្រោមយ៉ាងគួរឱ្យស្រលាញ់។ ទម្ងន់ស្រាលខ្លាំង មិនរំខានសូម្បីតែពេលគេង។',
    lengthOrSize: 'ទំហំកង 12mm, បន្តោងបូរ 9mm',
    stylingTip: 'សាកសមសម្រាប់ពាក់រន្ធត្រចៀកទីមួយ ឬរន្ធទីពីរជាមួយក្រវិលកងធំ។',
    stockStatus: 'មានក្នុងស្តុក',
    careGuide: 'ជូតដោយក្រណាត់ទន់ស្ងួតក្រោយពេលប្រើប្រាស់។',
    details: [
      'គន្លឹះខ្ទាស់ចុច Snap-lock ងាយស្រួលដោះពាក់',
      'បន្តោងបូរខាត់រលោងគ្មានគែមមុត',
      'សុភាពចំពោះស្បែកត្រចៀក',
      'ស្ទាយមិនងាយធុញ រចនាបែបសាមញ្ញ និងងាយពាក់'
    ]
  },
  {
    id: 'croissant-dome-ring',
    name: 'Croissant Dome Ring (ចិញ្ចៀននំបុ័ងខ្វាត់)',
    price: 13.50,
    category: 'ចិញ្ចៀន',
    badge: 'ពេញនិយម',
    image: '/src/assets/images/hero_jewelry_showcase_1791447852835.jpg',
    secondaryImage: '/src/assets/images/product_hoop_earrings_1791447903039.jpg',
    material: 'Stainless Steel រចនាបទបែបបារាំង',
    color: 'ពណ៌មាស (Gold)',
    description: 'ចិញ្ចៀនរាងប៉ោងម៉ូដ Croissant បែបបារាំងដ៏ទាន់សម័យ។ ជួយឱ្យម្រាមដៃមើលទៅស្រឡូន និងទាក់ទាញ ថតរូបឡើងស្អាតខ្លាំងណាស់!',
    lengthOrSize: 'ខ្នាតស្តង់ដារ លេខ 6, 7, 8',
    stylingTip: 'ពាក់នៅម្រាមមេដៃ ឬម្រាមចង្អុល ពេលកាន់កែវកាហ្វេ ឬថតរូប Selfie មើលទៅ chic ខ្លាំង!',
    stockStatus: 'មានក្នុងស្តុក',
    careGuide: 'ជូតសម្អាតជាមួយក្រណាត់ស្ងួតជាប្រចាំ។',
    details: [
      'គន្លាក់រលោងបែបនំបុ័ង Croissant',
      'ផ្ទៃខាងក្នុងរលោងស្រួលពាក់',
      'សម្ភារៈ Stainless Steel រឹងមាំ មិនងាយឆ្កូត',
      'ងាយស្រួលផ្គូផ្គងជាមួយ Outfit ជាច្រើនស្ទាយ'
    ]
  }
];
