/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Sparkles, Send, Heart, ArrowUpDown, QrCode, Lock } from 'lucide-react';
import { Product, Category } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { TelegramOrderModal } from './components/TelegramOrderModal';
import { TelegramQrModal } from './components/TelegramQrModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SettingsModal } from './components/SettingsModal';
import { WhyStainlessSteel } from './components/WhyStainlessSteel';
import { AboutSection } from './components/AboutSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { CommunityReviews } from './components/CommunityReviews';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { fetchProducts, fetchSettings, checkAdminAuth, StoreSettings } from './services/api';
import { saveTelegramUsername } from './config/storeConfig';

export default function App() {
  // Routing State: Check if user is in /admin route
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash.startsWith('#admin') ||
      new URLSearchParams(window.location.search).get('view') === 'admin'
    );
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Store Settings (synced with persistent backend)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    telegramUsername: 'sormmakara',
    ownerName: 'SORM MAKARA',
    currency: 'USD',
    khrExchangeRate: 4100,
    storeName: 'Ma Nith Store',
    tagline: 'គ្រឿងអលង្ការស្អាតៗ សម្រាប់រាល់ថ្ងៃរបស់អ្នក។',
    announcement: '♡ គ្រឿងអលង្ការ Stainless Steel ស្អាតៗ សម្រាប់រាល់ថ្ងៃ · កម្មង់តាម Telegram @sormmakara ♡',
  });

  // Persistent Products from Backend
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  // Category and Search Filtering
  const [selectedCategory, setSelectedCategory] = useState<Category>('ទាំងអស់');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  // Modals & Drawers State
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [selectedProductForTelegram, setSelectedProductForTelegram] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  // Wishlist State (persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('manith_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('manith_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Load public products & settings from backend
  const loadStoreData = useCallback(async () => {
    setProductsLoading(true);
    try {
      const [fetchedProds, fetchedSett] = await Promise.all([
        fetchProducts(),
        fetchSettings(),
      ]);
      if (fetchedProds && fetchedProds.length > 0) {
        setProducts(fetchedProds);
      }
      if (fetchedSett) {
        setStoreSettings(fetchedSett);
        saveTelegramUsername(fetchedSett.telegramUsername);
      }
    } catch (err) {
      console.warn('Using existing products state:', err);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  // Check auth and load data on mount
  useEffect(() => {
    loadStoreData();

    // Check if admin is currently authenticated
    checkAdminAuth().then((isAuthed) => {
      setIsAdminAuthenticated(isAuthed);
      setAuthChecking(false);
    });

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const isNowAdmin =
        window.location.pathname.startsWith('/admin') ||
        window.location.hash.startsWith('#admin') ||
        new URLSearchParams(window.location.search).get('view') === 'admin';
      setIsAdminRoute(isNowAdmin);
      if (!isNowAdmin) {
        loadStoreData();
      }
    };

    // Auto-refresh data when user switches back to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !window.location.pathname.startsWith('/admin')) {
        loadStoreData();
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadStoreData]);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToStore = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    loadStoreData(); // Refresh storefront data with any admin changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  // Dynamic Categories from active products + defaults
  const categories: Category[] = useMemo(() => {
    const defaultCats: Category[] = ['ទាំងអស់', 'ខ្សែក', 'ចិញ្ចៀន', 'ក្រវិល', 'ខ្សែដៃ', 'ឈុតគ្រឿងអលង្ការ'];
    const dynamicCats = new Set<string>(defaultCats);
    products.forEach((p) => {
      if (p.category) dynamicCats.add(p.category);
    });
    return Array.from(dynamicCats) as Category[];
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = selectedCategory === 'ទាំងអស់' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.material && product.material.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.color && product.color.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (a.badge === 'ថ្មី' ? -1 : 1));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Bestsellers list: "របស់ដែលអ្នកទាំងអស់គ្នាចូលចិត្ត ♡"
  const bestsellerProducts = useMemo(() => {
    const flagged = products.filter((p) => p.badge === 'លក់ដាច់' || p.badge === 'ពេញនិយម');
    return flagged.length > 0 ? flagged : products.slice(0, 4);
  }, [products]);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ----------------------------------------------------
  // ADMIN VIEW ROUTING
  // ----------------------------------------------------
  if (isAdminRoute) {
    if (authChecking) {
      return (
        <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center p-4">
          <div className="text-center space-y-2">
            <Sparkles className="w-8 h-8 text-[#DE7294] animate-spin mx-auto" />
            <p className="text-xs text-[#8F7B7A]">កំពុងដំណើរការ Admin...</p>
          </div>
        </div>
      );
    }

    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={(newSettings) => {
            setIsAdminAuthenticated(true);
            if (newSettings) setStoreSettings(newSettings);
          }}
          onBackToStore={navigateToStore}
        />
      );
    }

    return (
      <AdminDashboard
        onBackToStore={navigateToStore}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          navigateToStore();
        }}
      />
    );
  }

  // ----------------------------------------------------
  // PUBLIC STOREFRONT VIEW
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#382B2A] flex flex-col font-sans selection:bg-[#FCE2EB] selection:text-[#C24A71] khmer-text">
      
      {/* Top Header */}
      <Header
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onNavigate={handleNavigateSection}
        onNavigateToAdmin={navigateToAdmin}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onShopClick={() => handleNavigateSection('catalog')}
          onOpenQrModal={() => setIsQrModalOpen(true)}
        />

        {/* Categories Navigation Bar (Exact Heading: "ជ្រើសរើសអ្វីដែលអ្នកចូលចិត្ត ♡") */}
        <section className="py-8 bg-[#FFF8FA] border-b border-[#FCE2EB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-4">
              <h3 className="text-base sm:text-lg font-bold text-[#382B2A]">
                ជ្រើសរើសអ្វីដែលអ្នកចូលចិត្ត ♡
              </h3>
              <p className="text-xs text-[#8F7B7A] mt-0.5">
                ចុចជ្រើសរើសប្រភេទគ្រឿងអលង្ការដែលអ្នកចង់ស្វែងរក
              </p>
            </div>

            {/* Interactive Category Buttons */}
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2 sm:gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    handleNavigateSection('catalog');
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-[#DE7294] text-white shadow-md shadow-[#DE7294]/30'
                      : 'bg-white text-[#554443] hover:bg-[#FFF0F4] hover:text-[#C24A71] border border-[#F3EBE1]'
                  }`}
                >
                  {cat === 'ទាំងអស់' ? 'ទាំងអស់ ♡' : cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section (Exact Heading: "របស់ដែលកំពុងពេញនិយម ♡") */}
        <section id="catalog" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <div className="text-xs font-semibold text-[#B57C8E] flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#DE7294]" />
              <span>Ma Nith Store Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#382B2A]">
              របស់ដែលកំពុងពេញនិយម ♡
            </h2>
            <p className="text-xs sm:text-sm text-[#554443]">
              រាល់ការកម្មង់ គ្រាន់តែចុចលើ <strong>♡ ទិញឥឡូវនេះ</strong> នោះសារនឹងបើកទៅ Telegram ផ្ទាល់ភ្លាមៗ!
            </p>
          </div>

          {/* Search Bar & Sorter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
            {/* Search Box (Exact Placeholder: "ស្វែងរកគ្រឿងអលង្ការដែលអ្នកចូលចិត្ត…") */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="w-4 h-4 text-[#8F7B7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ស្វែងរកគ្រឿងអលង្ការដែលអ្នកចូលចិត្ត…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#F3EBE1] focus:border-[#DE7294] focus:ring-2 focus:ring-[#DE7294]/20 outline-none text-xs text-[#382B2A] transition-all placeholder:text-[#8F7B7A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8F7B7A] hover:text-[#382B2A] cursor-pointer"
                  aria-label="លុបពាក្យស្វែងរក"
                >
                  ×
                </button>
              )}
            </div>

            {/* Status & Sort Dropdown */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 text-xs text-[#8F7B7A]">
              <span className="tabular-nums">
                បង្ហាញ <strong>{filteredProducts.length}</strong> មុខ
              </span>

              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-[#F3EBE1]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#B57C8E]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-[#554443] font-medium outline-none cursor-pointer"
                >
                  <option value="featured">របស់ពេញនិយម</option>
                  <option value="newest">មកដល់ថ្មី</option>
                  <option value="price-asc">តម្លៃ៖ ទាបទៅខ្ពស់</option>
                  <option value="price-desc">តម្លៃ៖ ខ្ពស់ទៅទាប</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {productsLoading ? (
            <div className="py-20 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-[#DE7294] animate-spin mx-auto opacity-70" />
              <p className="text-xs text-[#8F7B7A]">កំពុងទាញយកគ្រឿងអលង្ការស្អាតៗ...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-[#F3EBE1] p-8">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF0F4] flex items-center justify-center text-[#DE7294]">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-base font-bold text-[#382B2A]">
                មិនមានគ្រឿងអលង្ការត្រូវនឹងពាក្យ "{searchQuery}" ទេ
              </p>
              <p className="text-xs text-[#554443]">
                សាកល្បងស្វែងរក "ខ្សែក", "បូរ", ឬ "បេះដូង" ឬជ្រើសរើសប្រភេទទាំងអស់ឡើងវិញ។
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ទាំងអស់');
                }}
                className="px-5 py-2 text-xs font-semibold text-[#DE7294] bg-[#FFF0F4] hover:bg-[#FCE2EB] rounded-full transition-colors cursor-pointer"
              >
                បង្ហាញគ្រឿងអលង្ការទាំងអស់ឡើងវិញ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                  onSelectProduct={(p) => setSelectedProductForModal(p)}
                  onOrderTelegram={(p) => setSelectedProductForTelegram(p)}
                />
              ))}
            </div>
          )}

          {/* Telegram QR Callout Card within Catalog */}
          <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-[#FFF0F4] via-[#FFF8FA] to-[#FFF0F4] rounded-3xl border border-[#FCE2EB] text-center space-y-3 shadow-xs">
            <span className="text-[#DE7294] text-lg">♡</span>
            <h3 className="text-lg sm:text-xl font-bold text-[#382B2A]">
              មានសំណួរ ឬចង់ឱ្យយើងជួយរើសម៉ូដដែលត្រូវនឹង Outfit របស់អ្នក?
            </h3>
            <p className="text-xs sm:text-sm text-[#554443] max-w-lg mx-auto leading-relaxed">
              ផ្ញើសារមកកាន់ Telegram <strong>@{storeSettings.telegramUsername}</strong> ({storeSettings.ownerName}) យើងរីករាយនឹងជួយប្រឹក្សាយ៉ាងរួសរាយរាក់ទាក់ ♡
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://t.me/${storeSettings.telegramUsername}?text=${encodeURIComponent("សួស្តី Ma Nith Store ♡ ខ្ញុំចង់សួរព័ត៌មានបន្ថែមបន្តិច!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#DE7294] hover:bg-[#C24A71] text-white text-xs font-semibold shadow-md shadow-[#DE7294]/30 transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ឆាតជាមួយ Ma Nith Store ♡</span>
              </a>

              <button
                onClick={() => setIsQrModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white hover:bg-[#FAF6F0] text-[#382B2A] text-xs font-medium border border-[#FAD9E5] transition-all cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#DE7294]" />
                <span>បង្ហាញ QR Code</span>
              </button>
            </div>
          </div>

        </section>

        {/* Dedicated Bestsellers Section (Exact Heading: "របស់ដែលអ្នកទាំងអស់គ្នាចូលចិត្ត ♡") */}
        <section className="py-12 bg-[#FFF8FA] border-y border-[#FCE2EB]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto space-y-1.5 mb-8">
              <div className="text-xs font-semibold text-[#B57C8E] flex items-center justify-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-[#DE7294] text-[#DE7294]" />
                <span>Most Loved Items</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#382B2A]">
                របស់ដែលអ្នកទាំងអស់គ្នាចូលចិត្ត ♡
              </h2>
              <p className="text-xs text-[#554443]">
                ម៉ូដដែលលក់ដាច់បំផុតប្រចាំហាង សាកសមសម្រាប់គ្រប់វ័យ និងងាយស្រួលពាក់រាល់ថ្ងៃ
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {bestsellerProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={`bestseller-${product.id}`}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                  onSelectProduct={(p) => setSelectedProductForModal(p)}
                  onOrderTelegram={(p) => setSelectedProductForTelegram(p)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Stainless Steel Section (Exact Heading: "ស្អាត ហើយសាកសមសម្រាប់ពាក់រាល់ថ្ងៃ ♡") */}
        <WhyStainlessSteel />

        {/* About Section (Exact Heading: "រឿងរ៉ាវរបស់ Ma Nith Store ♡") */}
        <AboutSection />

        {/* Community Reviews & TikTok/IG Love */}
        <CommunityReviews />

        {/* Large Final Blush Pink CTA (Exact Heading: "ឃើញរបស់ដែលអ្នកចូលចិត្តហើយមែនទេ? ♡") */}
        <FinalCtaSection onOpenQrModal={() => setIsQrModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onNavigate={handleNavigateSection}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as Category);
          handleNavigateSection('catalog');
        }}
      />

      {/* Discreet Admin Portal Link in bottom footer bar */}
      <div className="bg-[#FFF8FA] py-2 text-center border-t border-[#FCE2EB]/50">
        <button
          onClick={navigateToAdmin}
          className="text-[11px] text-[#8F7B7A] hover:text-[#DE7294] transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <Lock className="w-3 h-3" />
          <span>ផ្ទាំងគ្រប់គ្រងហាង (Admin Portal)</span>
        </button>
      </div>

      {/* Mobile Bottom Navigation (Ergonomic thumb zone, within 15% sticky cap) */}
      <MobileBottomNav
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigateHome={() => handleNavigateSection('hero')}
        onNavigateShop={() => handleNavigateSection('catalog')}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProductForModal}
        isOpen={!!selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        isWishlisted={selectedProductForModal ? wishlistIds.includes(selectedProductForModal.id) : false}
        onToggleWishlist={toggleWishlist}
        onOpenOrderTelegram={(p) => {
          setSelectedProductForModal(null);
          setSelectedProductForTelegram(p);
        }}
        onOpenQrModal={() => setIsQrModalOpen(true)}
      />

      {/* Telegram Order Confirmation Modal */}
      <TelegramOrderModal
        product={selectedProductForTelegram}
        isOpen={!!selectedProductForTelegram}
        onClose={() => setSelectedProductForTelegram(null)}
      />

      {/* Dedicated Telegram QR Code Modal for SORM MAKARA */}
      <TelegramQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistedProducts}
        onRemoveItem={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onSelectProduct={(p) => setSelectedProductForModal(p)}
      />

      {/* Telegram Username Configuration Modal (Store owner helper) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaved={(newUsername) => {
          setStoreSettings((prev) => ({ ...prev, telegramUsername: newUsername }));
        }}
        onNavigateToAdmin={navigateToAdmin}
      />
    </div>
  );
}
