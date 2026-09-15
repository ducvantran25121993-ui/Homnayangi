import React, { useState, useRef, useEffect } from 'react';
import { UtensilsCrossed, Sparkles, Disc, Compass, Share2, MapPin, CalendarDays, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserLocation } from '../types';
import { TAB_CONFIG, TabType } from '../utils/navigation';
import { ShareModal } from './ShareModal';
import { PWAInstallButton } from './PWAInstallButton';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenShare = () => {
    setIsShareModalOpen(true);
  };

  const handleNavClick = (tab: TabType, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    setActiveTab(tab);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 180);
  };

  const isFoodGroupActive = activeTab === 'catalog' || activeTab === 'planner';

  const mainNavItems: Array<{
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
  ];

  const foodSubItems: Array<{
    id: 'catalog' | 'planner';
    label: string;
    description: string;
    path: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'catalog',
      label: 'Tất Cả Món Ngon',
      description: 'Khám phá 160+ món ngon Việt Nam 3 miền',
      path: TAB_CONFIG.catalog.path,
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    {
      id: 'planner',
      label: 'Lịch Ăn Tuần',
      description: 'Lên thực đơn 7 ngày ngon & tiết kiệm',
      path: TAB_CONFIG.planner.path,
      icon: <CalendarDays className="w-4 h-4" />,
      badge: 'Mới',
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
            {mainNavItems.map((item) => {
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

            {/* Món Ngon dropdown with Submenu: Tất Cả Món Ngon & Lịch Ăn Tuần */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors select-none cursor-pointer ${
                  isFoodGroupActive ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
                }`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {isFoodGroupActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className={`relative z-10 transition-colors ${
                  isFoodGroupActive ? 'text-orange-600' : 'text-stone-400'
                }`}>
                  <UtensilsCrossed className="w-4 h-4" />
                </span>

                <span className="relative z-10 tracking-tight">
                  {activeTab === 'planner' ? 'Lịch Ăn Tuần' : 'Món Ngon'}
                </span>

                <ChevronDown className={`relative z-10 w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180 text-orange-600' : ''
                }`} />
              </button>

              {/* Desktop Submenu Dropdown Card */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200/80 p-2 z-50 overflow-hidden"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Danh mục ẩm thực
                    </div>
                    <div className="space-y-1">
                      {foodSubItems.map((sub) => {
                        const isSubActive = activeTab === sub.id;
                        return (
                          <a
                            key={sub.id}
                            href={sub.path}
                            onClick={(e) => handleNavClick(sub.id, e)}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all cursor-pointer group ${
                              isSubActive
                                ? 'bg-orange-50/80 text-orange-900 border border-orange-200/70'
                                : 'hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                              isSubActive
                                ? 'bg-orange-600 text-white'
                                : 'bg-stone-100 text-stone-500 group-hover:bg-orange-100 group-hover:text-orange-600'
                            }`}>
                              {sub.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-xs font-bold ${
                                  isSubActive ? 'text-orange-950' : 'text-stone-900 group-hover:text-orange-600'
                                }`}>
                                  {sub.label}
                                </span>
                                {sub.badge && (
                                  <span className="px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                                {sub.description}
                              </p>
                            </div>
                            {isSubActive && (
                              <Check className="w-4 h-4 text-orange-600 shrink-0 self-center" />
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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

            {/* PWA Install App Button */}
            <PWAInstallButton variant="navbar" />

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

        {/* Mobile Modern Pill Slider (4 compact items) */}
        <nav 
          aria-label="Menu điều hướng di động" 
          className="md:hidden flex items-center justify-between p-1 my-1.5 rounded-full bg-stone-100/90 border border-stone-200/60"
        >
          {mainNavItems.map((item) => {
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

          {/* Món Ngon pill with Submenu toggle on Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={`relative flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-xs font-medium transition-colors select-none text-center cursor-pointer ${
              isFoodGroupActive ? 'text-stone-900 font-semibold' : 'text-stone-500'
            }`}
          >
            {isFoodGroupActive && (
              <motion.div
                layoutId="mobile-navbar-active-pill"
                className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${isFoodGroupActive ? 'text-orange-600' : 'text-stone-400'}`}>
              {activeTab === 'planner' ? <CalendarDays className="w-3.5 h-3.5" /> : <UtensilsCrossed className="w-3.5 h-3.5" />}
            </span>
            <span className="relative z-10 text-[11.5px] leading-none truncate max-w-[65px]">
              {activeTab === 'planner' ? 'Lịch Tuần' : 'Món Ngon'}
            </span>
            <ChevronDown className={`relative z-10 w-3 h-3 text-stone-400 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </nav>
      </div>

      {/* Mobile Submenu Dropdown Popover */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-stone-900/30 backdrop-blur-2xs z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute left-4 right-4 top-full mt-1 bg-white rounded-2xl shadow-2xl border border-stone-200 p-3 z-50 md:hidden space-y-1.5"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-xs font-bold text-stone-500 px-1">
                <span>Chọn chuyên mục Món Ngon</span>
                <span className="text-[10px] text-orange-600 font-semibold">2 tính năng</span>
              </div>

              {foodSubItems.map((sub) => {
                const isSubActive = activeTab === sub.id;
                return (
                  <a
                    key={sub.id}
                    href={sub.path}
                    onClick={(e) => handleNavClick(sub.id, e)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                      isSubActive
                        ? 'bg-orange-50 border border-orange-200 text-orange-950 font-semibold'
                        : 'hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isSubActive ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {sub.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold">{sub.label}</span>
                        {sub.badge && (
                          <span className="px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">
                            {sub.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1">{sub.description}</p>
                    </div>
                    {isSubActive && <Check className="w-4 h-4 text-orange-600 shrink-0" />}
                  </a>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share to Social Media Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Hôm Nay Ăn Gì? • Gợi ý món ngon chuẩn vị"
        text="Cùng quay bánh xe may mắn, bốc quẻ Tarot, lên lịch ăn tuần và tìm món ngon nhé!"
      />
    </header>
  );
};
