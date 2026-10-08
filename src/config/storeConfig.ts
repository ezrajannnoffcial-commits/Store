/**
 * Ma Nith Store - Brand & Telegram Configuration (Khmer Localization)
 * 
 * Centralized settings for Ma Nith Store.
 * The TELEGRAM_USERNAME can easily be changed here or via the settings drawer.
 */

// Default Telegram username for Ma Nith Store / Sorm Makara
export const DEFAULT_TELEGRAM_USERNAME = "sormmakara";

// Owner name matching the official Telegram QR card (IMG_7481.jpeg)
export const TELEGRAM_ACCOUNT_NAME = "SORM MAKARA";
export const OWNER_NAME = "SORM MAKARA";
export const TELEGRAM_ACCOUNT_INITIALS = "SM";

// Retrieve active username (with fallback to default)
export function getStoredTelegramUsername(): string {
  try {
    const saved = localStorage.getItem("manith_telegram_username");
    if (saved && saved.trim().length > 0) {
      return saved.trim().replace(/^@/, '');
    }
  } catch {
    // ignore local storage errors
  }
  return DEFAULT_TELEGRAM_USERNAME;
}

export function saveTelegramUsername(username: string): void {
  try {
    const cleaned = username.trim().replace(/^@/, '');
    localStorage.setItem("manith_telegram_username", cleaned);
  } catch {
    // ignore
  }
}

/**
 * Builds the natural Khmer pre-filled inquiry message for Telegram.
 * Specified requirement:
 * “សួស្តី Ma Nith Store ♡ ខ្ញុំចាប់អារម្មណ៍លើ [PRODUCT NAME]។ តើផលិតផលនេះនៅមានក្នុងស្តុកទេ?”
 */
export function generateTelegramOrderMessage(productName: string, price?: number): string {
  const priceText = price !== undefined ? ` (តម្លៃ $${price.toFixed(2)})` : '';
  return `សួស្តី Ma Nith Store ♡ ខ្ញុំចាប់អារម្មណ៍លើ ${productName}${priceText}។ តើផលិតផលនេះនៅមានក្នុងស្តុកទេ?`;
}

/**
 * Builds a multi-item wishlist inquiry message in natural Khmer.
 */
export function generateWishlistOrderMessage(itemNames: string[]): string {
  const itemsList = itemNames.map((name) => `• ${name}`).join('\n');
  return `សួស្តី Ma Nith Store ♡ ខ្ញុំចង់កម្មង់របស់ទាំងនេះពី Wishlist របស់ខ្ញុំ៖\n\n${itemsList}\n\nតើនៅមានក្នុងស្តុកទេ? អរគុណច្រើន! ♡`;
}

/**
 * Generates direct Telegram link with prefilled text
 */
export function getTelegramUrl(message?: string, customUsername?: string): string {
  const username = customUsername || getStoredTelegramUsername();
  if (!message) {
    return `https://t.me/${username}`;
  }
  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}

export const BRAND = {
  name: "Ma Nith Store",
  logoText: "Ma Nith",
  logoSubtext: "STORE",
  tagline: "គ្រឿងអលង្ការស្អាតៗ សម្រាប់រាល់ថ្ងៃរបស់អ្នក។",
  secondaryPhrase: "Made with love, Ma Nith ♡",
  heroHeadline: "ស្អាតបន្តិច សម្រាប់គ្រប់ថ្ងៃរបស់អ្នក ♡",
  heroSubtitle: "គ្រឿងអលង្ការធ្វើពី Stainless Steel ស្អាតៗ សម្រាប់បន្ថែមភាពស្រស់ស្អាតដល់ Outfit ប្រចាំថ្ងៃរបស់អ្នក។",
  vibe: "កន្លែងគ្រឿងអលង្ការតូចមួយរបស់អ្នក ♡",
  telegramName: "SORM MAKARA",
  instagram: "@manithstore",
  tiktok: "@manithstore.official",
};
