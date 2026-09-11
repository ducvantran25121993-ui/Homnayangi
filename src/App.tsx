import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LuckyWheel } from './components/LuckyWheel';
import { AIAssistant } from './components/AIAssistant';
import { FoodTarot } from './components/FoodTarot';
import { DishCatalog } from './components/DishCatalog';
import { AffiliateModal } from './components/AffiliateModal';
import { DishDetailModal } from './components/DishDetailModal';
import { Footer } from './components/Footer';
import { Dish, AffiliateConfig, ClickRecord } from './types';
import { DEFAULT_AFFILIATE_CONFIG } from './utils/affiliate';

export default function App() {
  const [activeTab, setActiveTab] = useState<'wheel' | 'ai' | 'tarot' | 'catalog'>('wheel');
  const [affiliateConfig, setAffiliateConfig] = useState<AffiliateConfig>(DEFAULT_AFFILIATE_CONFIG);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-stone-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1">
        {activeTab === 'wheel' && (
          <LuckyWheel
            affiliateConfig={affiliateConfig}
            onDishSelect={(dish) => setSelectedDish(dish)}
          />
        )}

        {activeTab === 'ai' && (
          <AIAssistant affiliateConfig={affiliateConfig} />
        )}

        {activeTab === 'tarot' && (
          <FoodTarot affiliateConfig={affiliateConfig} />
        )}

        {activeTab === 'catalog' && (
          <DishCatalog
            affiliateConfig={affiliateConfig}
            onSelectDish={(dish) => setSelectedDish(dish)}
          />
        )}
      </main>

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        affiliateConfig={affiliateConfig}
      />

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
