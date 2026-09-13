import React, { useState } from 'react';
import { UtensilsCrossed, Sparkles, Disc, Compass, Share2, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { UserLocation } from '../types';
import { TAB_CONFIG, TabType } from '../utils/navigation';
import { ShareModal } from './ShareModal';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenAffiliateModal?: () => void;
  clickCount?: number;
  totalEstimatedCommission?: number;
  userLocation?: UserLocation;
  onOpenLocationModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userLocation,
  onOpenLocationModal,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleOpenShare = () => {
    setIsShareModalOpen(true);
  };

  const handleNavClick = (tab: TabType, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    setActiveTab(tab);
  };

  const navItems: Array<{
    id: TabType;
    label: string;
    shortLabel: string;
    path: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'tarot',
      label: TAB_CONFIG.tarot.label,
      shortLabel: TAB_CONFIG.tarot.shortLabel,
      path: TAB_CONFIG.tarot.path,
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'wheel',
      label: TAB_CONFIG.wheel.label,
      shortLabel: TAB_CONFIG.wheel.shortLabel,
      path: TAB_CONFIG.wheel.path,
      icon: <Disc className="w-4 h-4" />,
    },
    {
      id: 'ai',
      label: TAB_CONFIG.ai.label,
      shortLabel: TAB_CONFIG.ai.shortLabel,
      path: TAB_CONFIG.ai.path,
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'catalog',
      label: TAB_CONFIG.catalog.label,
      shortLabel: TAB_CONFIG.catalog.shortLabel,
      path: TAB_CONFIG.catalog.path,
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand logo & Identity */}
          <a 
            href={TAB_CONFIG.tarot.path}
            onClick={(e) => handleNavClick('tarot', e)}
            className="flex items-center gap-3 group shrink-0 select-none"
            role="img"
            aria-label="Logo thương hiệu Hôm Nay Ăn Gì"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-stone-900 leading-tight">
                Hôm Nay <span className="text-orange-600">Ăn Gì?</span>
              </span>
              <span className="text-[11px] text-stone-400 font-medium hidden sm:block tracking-wide">
                Gợi ý ẩm thực thông minh
              </span>
            </div>
          </a>

          {/* Minimalist Modern Pill Tab Menu with Fluid Motion Slider */}
          <nav 
            aria-label="Menu điều hướng chính" 
            className="hidden md:flex items-center bg-stone-100/80 p-1.5 rounded-full border border-stone-200/60 shadow-xs"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleNavClick(item.id, e)}
                  className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors select-none cursor-pointer ${
                    isActive ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {/* Fluid active animated pill sliding underneath */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className={`relative z-10 transition-colors ${
                    isActive ? 'text-orange-600' : 'text-stone-400 group-hover:text-stone-600'
                  }`}>
                    {item.icon}
                  </span>
                  <span className="relative z-10 tracking-tight">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenLocationModal && (
              <button
                onClick={onOpenLocationModal}
                title="Vị trí của bạn"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700 transition-colors text-xs font-medium cursor-pointer shadow-2xs"
              >
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span className="max-w-[110px] truncate">
                  {userLocation?.city || 'Vị trí'}
                </span>
              </button>
            )}

            <button
              onClick={handleOpenShare}
              title="Chia sẻ cùng bạn bè qua mạng xã hội"
              className="px-3.5 py-1.5 rounded-full border border-stone-200/80 bg-white hover:bg-stone-50 hover:border-orange-300 text-stone-700 transition-all duration-200 flex items-center gap-1.5 text-xs font-medium cursor-pointer shadow-2xs group"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-500 group-hover:text-orange-600 transition-colors" />
              <span className="hidden sm:inline font-semibold">Chia sẻ</span>
            </button>
          </div>
        </div>

        {/* Mobile Modern Pill Slider */}
        <nav 
          aria-label="Menu điều hướng di động" 
          className="md:hidden flex items-center justify-between p-1 my-1.5 rounded-full bg-stone-100/90 border border-stone-200/60"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`relative flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-xs font-medium transition-colors select-none text-center ${
                  isActive ? 'text-stone-900 font-semibold' : 'text-stone-500'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-navbar-active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-orange-600' : 'text-stone-400'}`}>
                  {item.icon}
                </span>
                <span className="relative z-10 text-[11.5px] leading-none">{item.shortLabel}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Share to Social Media Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Hôm Nay Ăn Gì? • Gợi ý món ngon chuẩn vị"
        text="Cùng quay bánh xe may mắn, bốc quẻ Tarot và tìm món ngon hôm nay nhé!"
      />
    </header>
  );
};
