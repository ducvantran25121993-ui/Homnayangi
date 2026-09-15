import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { LuckyWheel } from './components/LuckyWheel';
import { AIAssistant } from './components/AIAssistant';
import { FoodTarot } from './components/FoodTarot';
import { DishCatalog } from './components/DishCatalog';
import { MealPlanner } from './components/MealPlanner';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminInboxModal } from './components/AdminInboxModal';
import { AffiliateModal } from './components/AffiliateModal';
import { DishDetailModal } from './components/DishDetailModal';
import { LocationModal } from './components/LocationModal';
import { OrderToast } from './components/OrderToast';
import { Footer } from './components/Footer';
import { Dish, AffiliateConfig, ClickRecord, UserLocation } from './types';
import { DEFAULT_AFFILIATE_CONFIG } from './utils/affiliate';
import { getStoredUserLocation, saveUserLocation } from './utils/location';
import { getTabFromUrl, updateTabSEO, TAB_CONFIG, TabType } from './utils/navigation';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SeoContentFaq } from './components/SeoContentFaq';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(getTabFromUrl);
  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(DEFAULT_AFFILIATE_CONFIG);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation>(getStoredUserLocation);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationTargetDish, setLocationTargetDish] = useState<string | undefined>(undefined);
  const [isAdminInboxOpen, setIsAdminInboxOpen] = useState(false);

  // Navigate tab with clean URL & History API
  const handleNavigateTab = useCallback((newTab: TabType) => {
    setActiveTab(newTab);
    const targetPath = TAB_CONFIG[newTab]?.path || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab: newTab }, '', targetPath);
    }
    updateTabSEO(newTab);
  }, []);

  // Sync with browser Back/Forward buttons, secret admin URL query, and keyboard shortcut
  useEffect(() => {
    // Initial SEO update
    updateTabSEO(activeTab);

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
    // Poll stats occasionally
    const interval = setInterval(fetchAffiliateData, 15000);
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

      {/* Footer */}
      <Footer
        onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
        onNavigate={handleNavigateTab}
        onOpenAdminInbox={() => setIsAdminInboxOpen(true)}
      />
    </div>
  );
}
