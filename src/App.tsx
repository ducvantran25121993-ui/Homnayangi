import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { FoodTarot } from './components/FoodTarot';
import { OrderToast } from './components/OrderToast';
import { Footer } from './components/Footer';
import { Dish, AffiliateConfig, ClickRecord, UserLocation } from './types';
import { INITIAL_DISHES } from './data/dishes';
import { DEFAULT_AFFILIATE_CONFIG } from './utils/affiliate';
import {
  getStoredUserLocation,
  saveUserLocation,
  autoDetectUserLocation,
  formatLocationDisplay,
  isAutoDetectLocationEnabled,
} from './utils/location';
import { getTabFromUrl, updateTabSEO, updateRegionSEO, TAB_CONFIG, TabType } from './utils/navigation';
import { getRegionFromUrl, isRegionPath } from './data/regionalCuisine';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ErrorBoundary } from './components/ErrorBoundary';

// Code-split heavy pages and modals for lightning-fast mobile loading
const Breadcrumbs = lazy(() => import('./components/Breadcrumbs').then((m) => ({ default: m.Breadcrumbs })));
const LuckyWheel = lazy(() => import('./components/LuckyWheel').then((m) => ({ default: m.LuckyWheel })));
const AIAssistant = lazy(() => import('./components/AIAssistant').then((m) => ({ default: m.AIAssistant })));
const DishCatalog = lazy(() => import('./components/DishCatalog').then((m) => ({ default: m.DishCatalog })));
const SnacksTeaPage = lazy(() => import('./components/SnacksTeaPage').then((m) => ({ default: m.SnacksTeaPage })));
const MealPlanner = lazy(() => import('./components/MealPlanner').then((m) => ({ default: m.MealPlanner })));
const FoodDiscoveryPage = lazy(() => import('./components/FoodDiscoveryPage').then((m) => ({ default: m.FoodDiscoveryPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then((m) => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./components/TermsOfServicePage').then((m) => ({ default: m.TermsOfServicePage })));
const BlogPage = lazy(() => import('./components/BlogPage').then((m) => ({ default: m.BlogPage })));
const AdminBlogPage = lazy(() => import('./components/AdminBlogPage').then((m) => ({ default: m.AdminBlogPage })));
const RestaurantsPage = lazy(() => import('./components/RestaurantsPage').then((m) => ({ default: m.RestaurantsPage })));
const AffiliateModal = lazy(() => import('./components/AffiliateModal').then((m) => ({ default: m.AffiliateModal })));
const DishDetailModal = lazy(() => import('./components/DishDetailModal').then((m) => ({ default: m.DishDetailModal })));
const LocationModal = lazy(() => import('./components/LocationModal').then((m) => ({ default: m.LocationModal })));
const SeoContentFaq = lazy(() => import('./components/SeoContentFaq').then((m) => ({ default: m.SeoContentFaq })));

const DeferredSeoContentFaq: React.FC<{ activeTab: TabType; onNavigate: (tab: TabType) => void }> = ({ activeTab, onNavigate }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('IntersectionObserver' in window && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: '350px' }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-[40px]">
      {shouldLoad && (
        <Suspense fallback={null}>
          <SeoContentFaq activeTab={activeTab} onNavigate={onNavigate} />
        </Suspense>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const tab = getTabFromUrl();
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.replace(/\/$/, '') || '/';
      if (pathname === '/mon-ngon/lich-an-theo-tuan' || pathname === '/len-lich-an' || pathname === '/lich-an' || pathname === '/thuc-don-tuan' || pathname === '/meal-planner') {
        window.history.replaceState({ tab: 'planner' }, '', '/lich-an-theo-tuan');
      } else if (pathname === '/tra-sua-an-vat' || pathname === '/tra-sua' || pathname === '/an-vat') {
        window.history.replaceState({ tab: 'snacks' }, '', '/do-uong-an-vat');
      } else if (pathname === '/kham-pha-am-thuc/am-thuc-vung-mien' || pathname === '/kham-pha-am-thuc' || pathname === '/kham-pha') {
        window.history.replaceState({ tab: 'discover', sub: 'region' }, '', '/am-thuc-vung-mien');
      } else if (pathname === '/kham-pha-am-thuc/thuc-don-moi-ngay') {
        window.history.replaceState({ tab: 'discover', sub: 'daily' }, '', '/thuc-don-moi-ngay');
      } else if (pathname === '/kham-pha-am-thuc/cach-nau-mon-ngon') {
        window.history.replaceState({ tab: 'discover', sub: 'recipe' }, '', '/cach-nau-mon-ngon');
      } else if (pathname === '/am-thuc-vung-mien/mien-bac') {
        window.history.replaceState({ tab: 'discover', sub: 'region', region: 'bac' }, '', '/am-thuc-mien-bac');
      } else if (pathname === '/am-thuc-vung-mien/mien-trung') {
        window.history.replaceState({ tab: 'discover', sub: 'region', region: 'trung' }, '', '/am-thuc-mien-trung');
      } else if (pathname === '/am-thuc-vung-mien/mien-nam' || pathname === '/am-thuc-mien-nam-sai-gon') {
        window.history.replaceState({ tab: 'discover', sub: 'region', region: 'nam' }, '', '/am-thuc-mien-nam');
      } else if (pathname === '/am-thuc-vung-mien/mien-tay' || pathname === '/am-thuc-mien-tay-song-nuoc') {
        window.history.replaceState({ tab: 'discover', sub: 'region', region: 'mientay' }, '', '/am-thuc-mien-tay');
      }
    }
    return tab;
  });
  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(DEFAULT_AFFILIATE_CONFIG);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation>(getStoredUserLocation);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationTargetDish, setLocationTargetDish] = useState<string | undefined>(undefined);
  const [gpsToast, setGpsToast] = useState<{ message: string; city: string; district?: string } | null>(null);

  // Navigate tab with clean URL & History API
  const handleNavigateTab = useCallback((newTab: TabType) => {
    setActiveTab(newTab);
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const isRecipePath =
      currentPath.startsWith('/cach-nau-') ||
      currentPath.startsWith('/cach-lam-') ||
      currentPath.startsWith('/cach-nau-mon-ngon/');
    const isRegionCurrentPath = isRegionPath(currentPath);

    // If navigating to discover and already on a discover subpath, don't overwrite it
    let targetPath = TAB_CONFIG[newTab]?.path || '/';
    if (newTab === 'discover') {
      if (
        currentPath === '/thuc-don-moi-ngay' ||
        currentPath === '/cach-nau-mon-ngon' ||
        isRecipePath ||
        isRegionCurrentPath ||
        currentPath === '/am-thuc-vung-mien'
      ) {
        targetPath = currentPath;
      } else {
        targetPath = '/am-thuc-vung-mien';
      }
    }
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab: newTab }, '', targetPath);
    }
    const targetIsRecipe =
      targetPath.startsWith('/cach-nau-') ||
      targetPath.startsWith('/cach-lam-') ||
      targetPath.startsWith('/cach-nau-mon-ngon/');
    const targetRegionId = getRegionFromUrl();
    if (!targetIsRecipe && !targetRegionId) {
      updateTabSEO(newTab);
    } else if (targetRegionId) {
      updateRegionSEO(targetRegionId);
    }
    // Cuộn lên đầu trang mượt mà qua requestAnimationFrame để tránh forced reflow
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, []);

  // Sync with browser Back/Forward buttons, secret admin URL query, and keyboard shortcut
  useEffect(() => {
    const isCurrentPathRecipe =
      window.location.pathname.startsWith('/cach-nau-') ||
      window.location.pathname.startsWith('/cach-lam-') ||
      window.location.pathname.startsWith('/cach-nau-mon-ngon/');
    const currentRegionId = getRegionFromUrl();

    // Initial SEO update on tab change
    if (!isCurrentPathRecipe && !currentRegionId) {
      updateTabSEO(activeTab);
    } else if (currentRegionId) {
      updateRegionSEO(currentRegionId);
    }
    // Note: Do not call window.scrollTo synchronously on mount to avoid forced reflow during first paint!

    // Defer blog custom post sync so it NEVER blocks initial mobile FCP or LCP
    const pathname = window.location.pathname.replace(/\/$/, '') || '/';
    const isBlogRoute = pathname.startsWith('/blog') || pathname === '/admin' || (pathname !== '/' && !['/vong-quay', '/mon-ngon', '/do-uong-an-vat', '/lich-an-theo-tuan', '/quan-ngon', '/kham-pha-am-thuc'].includes(pathname));

    if (isBlogRoute) {
      const syncBlog = async () => {
        const { fetchAndSyncCustomPosts } = await import('./data/blogPosts');
        return fetchAndSyncCustomPosts();
      };

      syncBlog().then((syncedPosts) => {
        if (syncedPosts && syncedPosts.length > 0) {
          const cleanSlug = pathname.replace(/^\/?blog\//, '').replace(/^\//, '');
          const isCustomPost = syncedPosts.some(
            (p) => p.slug === cleanSlug || p.id === cleanSlug
          );
          if (isCustomPost && activeTab !== 'blog') {
            setActiveTab('blog');
          }
        }
      });
    }

    // Check if URL has secret query ?admin=1 or ?admin=inbox
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1' || params.get('admin') === 'inbox') {
      const isInbox = params.get('admin') === 'inbox';
      handleNavigateTab('admin');
      if (isInbox) {
        window.history.replaceState({ tab: 'admin' }, '', '/admin?tab=inbox');
      } else {
        window.history.replaceState({ tab: 'admin' }, '', '/admin');
      }
    }

    const handlePopState = () => {
      const currentTab = getTabFromUrl();
      setActiveTab(currentTab);
      const isPopRecipe =
        window.location.pathname.startsWith('/cach-nau-') ||
        window.location.pathname.startsWith('/cach-lam-') ||
        window.location.pathname.startsWith('/cach-nau-mon-ngon/');
      const popRegionId = getRegionFromUrl();
      if (!isPopRecipe && !popRegionId) {
        updateTabSEO(currentTab);
      } else if (popRegionId) {
        updateRegionSEO(popRegionId);
      }
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
    };

    // Shortcut: Press Shift + A to open Admin (Inbox tab)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleNavigateTab('admin');
        window.history.pushState({ tab: 'admin' }, '', '/admin?tab=inbox');
        window.dispatchEvent(new Event('locationchange'));
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('locationchange', handlePopState);
    window.addEventListener('custom-posts-updated', handlePopState);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('locationchange', handlePopState);
      window.removeEventListener('custom-posts-updated', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab]);

  const [clickStats, setClickStats] = useState<{
    totalClicks: number;
    estimatedTotalCommission: number;
    clicksByPlatform: {
      shopeefood: number;
      grabfood: number;
      befood: number;
    };
    recentClicks: ClickRecord[];
  }>({
    totalClicks: 4,
    estimatedTotalCommission: 14300,
    clicksByPlatform: {
      shopeefood: 2,
      grabfood: 1,
      befood: 1,
    },
    recentClicks: [
      {
        id: 'clk_1',
        dishId: 'com-tam',
        dishName: 'Cơm tấm sườn bì chả',
        platform: 'shopeefood',
        timestamp: new Date().toISOString(),
        estimatedCommission: 3500,
      },
    ],
  });

  // Fetch config and click stats from server when affiliate modal opens or in idle
  const fetchAffiliateData = useCallback(async () => {
    try {
      const res = await fetch('/api/affiliate/config');
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setAffiliateConfig(data.config);
        }
        if (data.stats) {
          setClickStats(data.stats);
        }
      }
    } catch {
      // Fallback in case of network issue
    }
  }, []);

  useEffect(() => {
    if (isAffiliateModalOpen) {
      fetchAffiliateData();
    }
  }, [isAffiliateModalOpen, fetchAffiliateData]);

  // Sync custom blog posts only on blog / admin route or idle
  useEffect(() => {
    const pathname = window.location.pathname.replace(/\/$/, '') || '/';
    const isBlog = pathname.startsWith('/blog') || pathname === '/admin';
    if (!isBlog) return;

    const syncCustomBlogPosts = async () => {
      try {
        const res = await fetch('/api/admin/posts');
        if (res.ok) {
          const data = await res.json();
          if (data.customPosts && Array.isArray(data.customPosts) && typeof window !== 'undefined') {
            localStorage.setItem('angigio_custom_blog_posts', JSON.stringify(data.customPosts));
          }
        }
      } catch {
        // Fallback silently
      }
    };
    syncCustomBlogPosts();
  }, [activeTab]);

  // Listen for global location events
  useEffect(() => {
    const handleLocationUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<UserLocation>;
      if (customEvent.detail) {
        setUserLocation(customEvent.detail);
      }
    };

    const handleOpenLocationModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ dishName?: string }>;
      setLocationTargetDish(customEvent.detail?.dishName);
      setIsLocationModalOpen(true);
    };

    window.addEventListener('user-location-updated', handleLocationUpdated);
    window.addEventListener('open-location-modal', handleOpenLocationModal);

    return () => {
      window.removeEventListener('user-location-updated', handleLocationUpdated);
      window.removeEventListener('open-location-modal', handleOpenLocationModal);
    };
  }, []);

  // Tự động định vị vị trí thực tế của người dùng khi truy cập app
  useEffect(() => {
    let isCancelled = false;
    const triggerAutoDetect = async () => {
      if (!isAutoDetectLocationEnabled()) return;
      try {
        const detected = await autoDetectUserLocation();
        if (!isCancelled && detected) {
          setUserLocation(detected);
          setGpsToast({
            message: 'Đã tự động xác định vị trí của bạn',
            city: detected.city,
            district: detected.district,
          });
          setTimeout(() => {
            if (!isCancelled) setGpsToast(null);
          }, 4500);
        }
      } catch {
        // Silent fallback
      }
    };

    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(triggerAutoDetect);
      } else {
        triggerAutoDetect();
      }
    }, 3500);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const handleSaveAffiliateConfig = async (newConfig: AffiliateConfig) => {
    setAffiliateConfig(newConfig);
    try {
      await fetch('/api/affiliate/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig),
      });
      fetchAffiliateData();
    } catch (err) {
      console.warn('Failed to update config on server', err);
    }
  };

  const handleLocationSelected = (newLocation: UserLocation) => {
    setUserLocation(newLocation);
    saveUserLocation(newLocation);
  };

  const openLocationPicker = (dishName?: string) => {
    setLocationTargetDish(dishName);
    setIsLocationModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
        userLocation={userLocation}
        onOpenLocationModal={() => openLocationPicker()}
      />

      {/* Breadcrumbs navigation for subpages (Lazy loaded, omitted on tarot homepage) */}
      {activeTab !== 'tarot' && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Breadcrumbs activeTab={activeTab} onNavigate={handleNavigateTab} />
          </Suspense>
        </ErrorBoundary>
      )}

      {/* Main Container */}
      <ErrorBoundary>
        <main className="flex-1 pb-12">
        {activeTab === 'wheel' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải Vòng Quay...</div>}>
            <LuckyWheel
              affiliateConfig={affiliateConfig}
              onDishSelect={(dish) => setSelectedDish(dish)}
              userLocation={userLocation}
              onOpenLocationModal={openLocationPicker}
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'planner' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải Lên Lịch Ăn...</div>}>
            <MealPlanner
              affiliateConfig={affiliateConfig}
              userLocation={userLocation}
              onOpenLocationModal={openLocationPicker}
              onSelectDish={(dish) => setSelectedDish(dish)}
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'ai' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải Trợ lý AI...</div>}>
            <AIAssistant
              affiliateConfig={affiliateConfig}
              userLocation={userLocation}
              onOpenLocationModal={openLocationPicker}
              onSelectDish={(dish) => setSelectedDish(dish)}
              selectedDish={selectedDish}
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'tarot' && (
          <FoodTarot
            affiliateConfig={affiliateConfig}
            onSelectDish={(dish) => setSelectedDish(dish)}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
          />
        )}

        {activeTab === 'catalog' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải Danh bạ Món Ngon...</div>}>
            <DishCatalog
              affiliateConfig={affiliateConfig}
              onSelectDish={(dish) => setSelectedDish(dish)}
              selectedDish={selectedDish}
              userLocation={userLocation}
              onOpenLocationModal={openLocationPicker}
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'snacks' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải Trà Sữa & Ăn Vặt...</div>}>
            <SnacksTeaPage
              affiliateConfig={affiliateConfig}
              onSelectDish={(dish) => setSelectedDish(dish)}
              selectedDish={selectedDish}
              userLocation={userLocation}
              onOpenLocationModal={openLocationPicker}
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'discover' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải Khám Phá Ẩm Thực...</div>}>
            <FoodDiscoveryPage
              onSelectDish={(dish) => setSelectedDish(dish)}
              onNavigate={handleNavigateTab}
              userLocation={userLocation}
              affiliateConfig={affiliateConfig}
            />
          </Suspense>
        )}

        {activeTab === 'about' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải...</div>}>
            <AboutPage
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'contact' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải...</div>}>
            <ContactPage
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'privacy' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải...</div>}>
            <PrivacyPolicyPage
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'terms' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải...</div>}>
            <TermsOfServicePage
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'blog' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải Blog Ẩm Thực...</div>}>
            <BlogPage
              onNavigate={handleNavigateTab}
              onSelectDish={(dish) => setSelectedDish(dish)}
            />
          </Suspense>
        )}

        {activeTab === 'admin' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang mở Quản Trị...</div>}>
            <AdminBlogPage
              onNavigate={handleNavigateTab}
            />
          </Suspense>
        )}

        {activeTab === 'restaurants' && (
          <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center text-stone-400 text-xs">Đang tải Quán Ngon...</div>}>
            <RestaurantsPage
              userLocation={userLocation}
              onOpenLocationModal={openLocationPicker}
              onSelectDish={(dishId) => {
                const found = INITIAL_DISHES.find(d => d.id === dishId);
                if (found) setSelectedDish(found);
              }}
              onNavigateContact={() => handleNavigateTab('contact')}
            />
          </Suspense>
        )}

        {/* Editorial SEO Content & FAQ Accordion (Loaded on demand as user scrolls near bottom) */}
        <DeferredSeoContentFaq activeTab={activeTab} onNavigate={handleNavigateTab} />
      </main>
      </ErrorBoundary>

      {/* Dish Detail Modal (Rendered only on demand) */}
      {selectedDish && (
        <Suspense fallback={null}>
          <DishDetailModal
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
            affiliateConfig={affiliateConfig}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
          />
        </Suspense>
      )}

      {/* Location Picker Modal (Rendered only on demand) */}
      {isLocationModalOpen && (
        <Suspense fallback={null}>
          <LocationModal
            isOpen={isLocationModalOpen}
            onClose={() => setIsLocationModalOpen(false)}
            currentLocation={userLocation}
            onLocationChange={handleLocationSelected}
            onSelectLocation={handleLocationSelected}
            targetDishName={locationTargetDish}
            pendingDishName={locationTargetDish}
          />
        </Suspense>
      )}

      {/* Offline Status Connectivity Banner */}
      <OfflineIndicator />

      {/* Order Toast */}
      <OrderToast />

      {/* Affiliate Management & Analytics Modal (Rendered only on demand) */}
      {isAffiliateModalOpen && (
        <Suspense fallback={null}>
          <AffiliateModal
            isOpen={isAffiliateModalOpen}
            onClose={() => setIsAffiliateModalOpen(false)}
            config={affiliateConfig}
            onSaveConfig={handleSaveAffiliateConfig}
            clickStats={clickStats}
          />
        </Suspense>
      )}

      {/* GPS Auto-Detection Toast Notification */}
      {gpsToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm bg-stone-900/95 backdrop-blur-md text-white p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-stone-700/80 flex items-center justify-between gap-3 animate-fade-in text-xs"
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="truncate text-left">
              <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Định vị GPS tự động
              </div>
              <div className="font-extrabold text-stone-100 truncate">
                {gpsToast.district ? `${gpsToast.district}, ` : ''}{gpsToast.city}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              aria-label="Thay đổi vị trí nhận gợi ý món ăn"
              className="text-[11px] font-bold text-orange-400 hover:text-orange-300 underline cursor-pointer px-1 py-0.5"
            >
              Đổi
            </button>
            <button
              type="button"
              onClick={() => setGpsToast(null)}
              aria-label="Đóng thông báo định vị GPS tự động"
              className="text-stone-400 hover:text-stone-200 p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              title="Đóng thông báo"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
        onNavigate={handleNavigateTab}
        onOpenAdminInbox={() => {
          handleNavigateTab('admin');
          window.history.pushState({ tab: 'admin' }, '', '/admin?tab=inbox');
          window.dispatchEvent(new Event('locationchange'));
        }}
      />
    </div>
  );
}
