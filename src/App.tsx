import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { LuckyWheel } from './components/LuckyWheel';
import { AIAssistant } from './components/AIAssistant';
import { FoodTarot } from './components/FoodTarot';
import { DishCatalog } from './components/DishCatalog';
import { SnacksTeaPage } from './components/SnacksTeaPage';
import { MealPlanner } from './components/MealPlanner';
import { FoodDiscoveryPage } from './components/FoodDiscoveryPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { AdminInboxModal } from './components/AdminInboxModal';
import { AffiliateModal } from './components/AffiliateModal';
import { DishDetailModal } from './components/DishDetailModal';
import { LocationModal } from './components/LocationModal';
import { OrderToast } from './components/OrderToast';
import { Footer } from './components/Footer';
import { Dish, AffiliateConfig, ClickRecord, UserLocation } from './types';
import { DEFAULT_AFFILIATE_CONFIG } from './utils/affiliate';
import {
  getStoredUserLocation,
  saveUserLocation,
  autoDetectUserLocation,
  formatLocationDisplay,
  isAutoDetectLocationEnabled,
} from './utils/location';
import { getTabFromUrl, updateTabSEO, TAB_CONFIG, TabType } from './utils/navigation';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SeoContentFaq } from './components/SeoContentFaq';
import { OfflineIndicator } from './components/OfflineIndicator';

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
  const [isAdminInboxOpen, setIsAdminInboxOpen] = useState(false);
  const [gpsToast, setGpsToast] = useState<{ message: string; city: string; district?: string } | null>(null);

  // Navigate tab with clean URL & History API
  const handleNavigateTab = useCallback((newTab: TabType) => {
    setActiveTab(newTab);
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    // If navigating to discover and already on a discover subpath, don't overwrite it
    let targetPath = TAB_CONFIG[newTab]?.path || '/';
    if (newTab === 'discover') {
      if (currentPath === '/thuc-don-moi-ngay' || currentPath === '/cach-nau-mon-ngon' || currentPath === '/am-thuc-vung-mien') {
        targetPath = currentPath;
      } else {
        targetPath = '/am-thuc-vung-mien';
      }
    }
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab: newTab }, '', targetPath);
    }
    updateTabSEO(newTab);
    // Cuộn lên đầu trang ngay lập tức khi chuyển tab hoặc chuyển trang
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Sync with browser Back/Forward buttons, secret admin URL query, and keyboard shortcut
  useEffect(() => {
    // Initial SEO update & scroll to top on tab change
    updateTabSEO(activeTab);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Check if URL has secret query ?admin=1 or ?admin=inbox
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1' || params.get('admin') === 'inbox') {
      setIsAdminInboxOpen(true);
      // Clean query parameter from address bar without page reload
      params.delete('admin');
      const newQuery = params.toString() ? `?${params.toString()}` : '';
      window.history.replaceState(null, '', window.location.pathname + newQuery);
    }

    const handlePopState = () => {
      const currentTab = getTabFromUrl();
      setActiveTab(currentTab);
      updateTabSEO(currentTab);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    // Secret shortcut: Press Shift + A to toggle Admin Inbox
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminInboxOpen((prev) => !prev);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handlePopState);
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

  // Fetch initial config and click stats from server
  const fetchAffiliateData = async () => {
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
  };

  useEffect(() => {
    fetchAffiliateData();
    // Poll stats occasionally (every 60s)
    const interval = setInterval(fetchAffiliateData, 60000);
    return () => clearInterval(interval);
  }, []);

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

    const timer = setTimeout(triggerAutoDetect, 900);
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

      {/* Breadcrumbs navigation for subpages */}
      <Breadcrumbs activeTab={activeTab} onNavigate={handleNavigateTab} />

      {/* Main Container */}
      <main className="flex-1 pb-12">
        {activeTab === 'wheel' && (
          <LuckyWheel
            affiliateConfig={affiliateConfig}
            onDishSelect={(dish) => setSelectedDish(dish)}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
          />
        )}

        {activeTab === 'planner' && (
          <MealPlanner
            affiliateConfig={affiliateConfig}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
            onSelectDish={(dish) => setSelectedDish(dish)}
            onNavigate={handleNavigateTab}
          />
        )}

        {activeTab === 'ai' && (
          <AIAssistant
            affiliateConfig={affiliateConfig}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
            onSelectDish={(dish) => setSelectedDish(dish)}
            selectedDish={selectedDish}
          />
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
          <DishCatalog
            affiliateConfig={affiliateConfig}
            onSelectDish={(dish) => setSelectedDish(dish)}
            selectedDish={selectedDish}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
            onNavigate={handleNavigateTab}
          />
        )}

        {activeTab === 'snacks' && (
          <SnacksTeaPage
            affiliateConfig={affiliateConfig}
            onSelectDish={(dish) => setSelectedDish(dish)}
            selectedDish={selectedDish}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
            onNavigate={handleNavigateTab}
          />
        )}

        {activeTab === 'discover' && (
          <FoodDiscoveryPage
            onSelectDish={(dish) => setSelectedDish(dish)}
            onNavigate={handleNavigateTab}
            userLocation={userLocation}
            affiliateConfig={affiliateConfig}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigateTab}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            onNavigate={handleNavigateTab}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPolicyPage
            onNavigate={handleNavigateTab}
          />
        )}

        {activeTab === 'terms' && (
          <TermsOfServicePage
            onNavigate={handleNavigateTab}
          />
        )}

        {/* Editorial SEO Content & FAQ Accordion */}
        <SeoContentFaq activeTab={activeTab} onNavigate={handleNavigateTab} />
      </main>

      {/* Dish Detail Modal (Displays with integrated location and food apps) */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        affiliateConfig={affiliateConfig}
        userLocation={userLocation}
        onOpenLocationModal={openLocationPicker}
      />

      {/* Location Picker Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={userLocation}
        onLocationChange={handleLocationSelected}
        onSelectLocation={handleLocationSelected}
        targetDishName={locationTargetDish}
        pendingDishName={locationTargetDish}
      />

      {/* Offline Status Connectivity Banner */}
      <OfflineIndicator />

      {/* Order Toast */}
      <OrderToast />

      {/* Affiliate Management & Analytics Modal */}
      <AffiliateModal
        isOpen={isAffiliateModalOpen}
        onClose={() => setIsAffiliateModalOpen(false)}
        config={affiliateConfig}
        onSaveConfig={handleSaveAffiliateConfig}
        clickStats={clickStats}
      />

      {/* Admin Inbox Modal (Quản lý tin nhắn khách gửi) */}
      <AdminInboxModal
        isOpen={isAdminInboxOpen}
        onClose={() => setIsAdminInboxOpen(false)}
      />

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
              onClick={() => setIsLocationModalOpen(true)}
              className="text-[11px] font-bold text-orange-400 hover:text-orange-300 underline cursor-pointer px-1 py-0.5"
            >
              Đổi
            </button>
            <button
              onClick={() => setGpsToast(null)}
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
        onOpenAdminInbox={() => setIsAdminInboxOpen(true)}
      />
    </div>
  );
}
