import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LuckyWheel } from './components/LuckyWheel';
import { AIAssistant } from './components/AIAssistant';
import { FoodTarot } from './components/FoodTarot';
import { DishCatalog } from './components/DishCatalog';
import { AffiliateModal } from './components/AffiliateModal';
import { DishDetailModal } from './components/DishDetailModal';
import { SelectedDishDock } from './components/SelectedDishDock';
import { LocationModal } from './components/LocationModal';
import { OrderToast } from './components/OrderToast';
import { Footer } from './components/Footer';
import { Dish, AffiliateConfig, ClickRecord, UserLocation } from './types';
import { DEFAULT_AFFILIATE_CONFIG } from './utils/affiliate';
import { getStoredUserLocation, saveUserLocation } from './utils/location';

export default function App() {
  const [activeTab, setActiveTab] = useState<'wheel' | 'ai' | 'tarot' | 'catalog'>('wheel');
  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(DEFAULT_AFFILIATE_CONFIG);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [detailModalDish, setDetailModalDish] = useState<Dish | null>(null);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation>(getStoredUserLocation);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [locationTargetDish, setLocationTargetDish] = useState<string | undefined>(undefined);

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
        setActiveTab={setActiveTab}
        onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)}
        userLocation={userLocation}
        onOpenLocationModal={() => openLocationPicker()}
      />

      {/* Main Container */}
      <main className="flex-1 pb-24">
        {activeTab === 'wheel' && (
          <LuckyWheel
            affiliateConfig={affiliateConfig}
            onDishSelect={(dish) => {
              setSelectedDish(dish);
              setDetailModalDish(dish);
            }}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
          />
        )}

        {activeTab === 'ai' && (
          <AIAssistant
            affiliateConfig={affiliateConfig}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
            onSelectDish={(dish) => {
              setSelectedDish(dish);
            }}
            selectedDish={selectedDish}
          />
        )}

        {activeTab === 'tarot' && (
          <FoodTarot
            affiliateConfig={affiliateConfig}
            onSelectDish={(dish) => {
              setSelectedDish(dish);
              setDetailModalDish(dish);
            }}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
          />
        )}

        {activeTab === 'catalog' && (
          <DishCatalog
            affiliateConfig={affiliateConfig}
            onSelectDish={(dish) => {
              setSelectedDish(dish);
            }}
            selectedDish={selectedDish}
            userLocation={userLocation}
            onOpenLocationModal={openLocationPicker}
          />
        )}
      </main>

      {/* Persistent Selected Dish Dock */}
      <SelectedDishDock
        dish={selectedDish}
        onClearDish={() => setSelectedDish(null)}
        onViewDetails={(dish) => setDetailModalDish(dish)}
        affiliateConfig={affiliateConfig}
        userLocation={userLocation}
        onOpenLocationModal={openLocationPicker}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={detailModalDish}
        onClose={() => setDetailModalDish(null)}
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

      {/* Footer */}
      <Footer onOpenAffiliateModal={() => setIsAffiliateModalOpen(true)} />
    </div>
  );
}
