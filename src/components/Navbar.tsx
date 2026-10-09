import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import {
  UtensilsCrossed,
  Sparkles,
  Disc,
  Compass,
  Share2,
  MapPin,
  CalendarDays,
  ChevronDown,
  Check,
  Camera,
  Coffee,
  Store,
  BookOpen,
  ChefHat,
} from 'lucide-react';
import { UserLocation } from '../types';
import { TAB_CONFIG, TabType } from '../utils/navigation';
import { PWAInstallButton } from './PWAInstallButton';

const ShareModal = lazy(() => import('./ShareModal').then(m => ({ default: m.ShareModal })));

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
  const [isWheelDropdownOpen, setIsWheelDropdownOpen] = useState(false);
  const [isFoodDropdownOpen, setIsFoodDropdownOpen] = useState(false);
  const [isDiscoverDropdownOpen, setIsDiscoverDropdownOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>('/logo.webp?v=8');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoToast, setLogoToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wheelDropdownRef = useRef<HTMLDivElement>(null);
  const foodDropdownRef = useRef<HTMLDivElement>(null);
  const discoverDropdownRef = useRef<HTMLDivElement>(null);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const foodTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const discoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const res = await fetch('/api/upload-logo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 }),
        });
        const data = await res.json();
        if (res.ok) {
          setLogoSrc(`/logo.png?t=${Date.now()}`);
          setLogoToast('Đã tải và lưu logo gốc thành công!');
          setTimeout(() => setLogoToast(null), 3500);
        } else {
          alert(data.error || 'Không thể lưu logo');
        }
        setUploadingLogo(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingLogo(false);
    }
  };

  const handleOpenShare = () => {
    setIsShareModalOpen(true);
  };

  const handleNavClick = (tab: TabType, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    setActiveTab(tab);
    setIsWheelDropdownOpen(false);
    setIsFoodDropdownOpen(false);
    setIsDiscoverDropdownOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wheelDropdownRef.current && !wheelDropdownRef.current.contains(event.target as Node)) {
        setIsWheelDropdownOpen(false);
      }
      if (foodDropdownRef.current && !foodDropdownRef.current.contains(event.target as Node)) {
        setIsFoodDropdownOpen(false);
      }
      if (discoverDropdownRef.current && !discoverDropdownRef.current.contains(event.target as Node)) {
        setIsDiscoverDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      if (foodTimeoutRef.current) clearTimeout(foodTimeoutRef.current);
      if (discoverTimeoutRef.current) clearTimeout(discoverTimeoutRef.current);
    };
  }, []);

  const handleWheelMouseEnter = () => {
    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    setIsWheelDropdownOpen(true);
  };

  const handleWheelMouseLeave = () => {
    wheelTimeoutRef.current = setTimeout(() => {
      setIsWheelDropdownOpen(false);
    }, 180);
  };

  const handleFoodMouseEnter = () => {
    if (foodTimeoutRef.current) clearTimeout(foodTimeoutRef.current);
    setIsFoodDropdownOpen(true);
  };

  const handleFoodMouseLeave = () => {
    foodTimeoutRef.current = setTimeout(() => {
      setIsFoodDropdownOpen(false);
    }, 180);
  };

  const handleDiscoverMouseEnter = () => {
    if (discoverTimeoutRef.current) clearTimeout(discoverTimeoutRef.current);
    setIsDiscoverDropdownOpen(true);
  };

  const handleDiscoverMouseLeave = () => {
    discoverTimeoutRef.current = setTimeout(() => {
      setIsDiscoverDropdownOpen(false);
    }, 180);
  };

  const isWheelGroupActive = activeTab === 'wheel' || activeTab === 'ai';
  const isFoodGroupActive = activeTab === 'catalog' || activeTab === 'snacks' || activeTab === 'planner';
  const isDiscoverGroupActive = activeTab === 'discover' || activeTab === 'blog';

  const discoverSubItems: Array<{
    id: 'blog' | 'discover';
    label: string;
    description: string;
    path: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'blog',
      label: 'Blog Ẩm Thực',
      description: 'Cẩm nang món ngon & bí quyết ẩm thực',
      path: TAB_CONFIG.blog.path,
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'discover',
      label: 'Khám Phá Vùng Miền',
      description: 'Tinh hoa đặc sản 3 miền Bắc, Trung, Nam & Miền Tây',
      path: TAB_CONFIG.discover.path,
      icon: <Compass className="w-4 h-4" />,
    },
  ];

  const wheelSubItems: Array<{
    id: 'wheel' | 'ai';
    label: string;
    description: string;
    path: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'wheel',
      label: 'Vòng Quay Ăn Gì',
      description: 'Quay chọn món ngẫu nhiên trong 3 giây',
      path: TAB_CONFIG.wheel.path,
      icon: <Disc className="w-4 h-4" />,
    },
    {
      id: 'ai',
      label: 'Trợ Lý AI',
      description: 'Gợi ý món ăn thông minh theo tâm trạng & thời tiết',
      path: TAB_CONFIG.ai.path,
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  const foodSubItems: Array<{
    id: 'catalog' | 'snacks' | 'planner';
    label: string;
    description: string;
    path: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'catalog',
      label: 'Món Ngon',
      description: 'Khám phá 160+ món ngon Việt Nam 3 miền',
      path: TAB_CONFIG.catalog.path,
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    {
      id: 'snacks',
      label: 'Đồ Uống & Ăn Vặt',
      description: 'Trà sữa, cà phê, trà trái cây & ăn vặt xế chiều',
      path: TAB_CONFIG.snacks.path,
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      id: 'planner',
      label: 'Lịch Ăn Tuần',
      description: 'Lên thực đơn 7 ngày ngon & tiết kiệm',
      path: TAB_CONFIG.planner.path,
      icon: <CalendarDays className="w-4 h-4" />,
    },
  ];

  const mobileNavItems: Array<{
    id: TabType;
    shortLabel: string;
    path: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'tarot',
      shortLabel: 'Tarot',
      path: TAB_CONFIG.tarot.path,
      icon: <Compass className="w-3.5 h-3.5" />,
    },
    {
      id: 'wheel',
      shortLabel: 'Vòng Quay',
      path: TAB_CONFIG.wheel.path,
      icon: <Disc className="w-3.5 h-3.5" />,
    },
    {
      id: 'catalog',
      shortLabel: 'Món Ngon',
      path: TAB_CONFIG.catalog.path,
      icon: <UtensilsCrossed className="w-3.5 h-3.5" />,
    },
    {
      id: 'restaurants',
      shortLabel: 'Quán Ngon',
      path: TAB_CONFIG.restaurants.path,
      icon: <Store className="w-3.5 h-3.5" />,
    },
    {
      id: 'discover',
      shortLabel: 'Ẩm Thực',
      path: TAB_CONFIG.discover.path,
      icon: <ChefHat className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-stone-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand logo & Identity */}
          <div className="relative flex items-center gap-3 group shrink-0 select-none">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleLogoUpload} 
              accept="image/png,image/jpeg,image/webp,image/svg+xml" 
              className="hidden" 
              id="brand-logo-file-input"
              aria-label="Tải lên tệp logo thương hiệu"
            />
            <div className="relative">
              <a 
                href={TAB_CONFIG.tarot.path}
                onClick={(e) => handleNavClick('tarot', e)}
                className="block cursor-pointer"
                aria-label="Về trang chủ Hôm Nay Ăn Gì"
              >
                <picture>
                  <source srcSet="/logo.webp?v=8" type="image/webp" />
                  <img 
                    src={logoSrc} 
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/logo.svg')) {
                        target.src = '/logo.svg?v=8';
                      }
                    }}
                    alt="Logo Hôm Nay Ăn Gì" 
                    width="44"
                    height="44"
                    fetchPriority="high"
                    decoding="async"
                    className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0" 
                  />
                </picture>
              </a>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={uploadingLogo}
                aria-label="Tải lên hình ảnh logo thương hiệu"
                title="Bấm để chọn file logo gốc (.png, .svg)"
                className="absolute -bottom-1 -right-1 p-1 bg-stone-900/80 hover:bg-orange-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-xs cursor-pointer"
              >
                <Camera className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>

            <a 
              href={TAB_CONFIG.tarot.path}
              onClick={(e) => handleNavClick('tarot', e)}
              className="flex flex-col cursor-pointer"
            >
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-stone-900 leading-tight">
                Hôm Nay <span className="text-orange-600">Ăn Gì?</span>
              </span>
              <span className="text-[11px] sm:text-xs text-stone-400 font-medium hidden sm:block tracking-wide">
                Gợi ý ẩm thực thông minh
              </span>
            </a>
          </div>

          {/* Minimalist Modern Pill Tab Menu with Fluid Motion Slider */}
          <nav 
            aria-label="Menu điều hướng chính" 
            className="hidden md:flex items-center bg-stone-100/80 p-1.5 rounded-full border border-stone-200/60 shadow-xs"
          >
            {/* 1. Tarot Ẩm Thực */}
            <a
              href={TAB_CONFIG.tarot.path}
              onClick={(e) => handleNavClick('tarot', e)}
              className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors select-none cursor-pointer ${
                activeTab === 'tarot' ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {activeTab === 'tarot' && (
                <div className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50 transition-all duration-200" />
              )}
              <span className={`relative z-10 transition-colors ${
                activeTab === 'tarot' ? 'text-orange-600' : 'text-stone-400 group-hover:text-stone-600'
              }`}>
                <Compass className="w-4 h-4" />
              </span>
              <span className="relative z-10 tracking-tight">Tarot Ẩm Thực</span>
            </a>

            {/* 2. Vòng Quay (with Trợ Lý AI Dropdown) */}
            <div 
              ref={wheelDropdownRef}
              className="relative"
              onMouseEnter={handleWheelMouseEnter}
              onMouseLeave={handleWheelMouseLeave}
            >
              <a
                href={TAB_CONFIG.wheel.path}
                onClick={(e) => handleNavClick(activeTab === 'ai' ? 'ai' : 'wheel', e)}
                className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors select-none cursor-pointer ${
                  isWheelGroupActive ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {isWheelGroupActive && (
                  <div className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50 transition-all duration-200" />
                )}

                <span className={`relative z-10 transition-colors ${
                  isWheelGroupActive ? 'text-orange-600' : 'text-stone-400'
                }`}>
                  {activeTab === 'ai' ? <Sparkles className="w-4 h-4" /> : <Disc className="w-4 h-4" />}
                </span>

                <span className="relative z-10 tracking-tight">
                  {activeTab === 'ai' ? 'Trợ Lý AI' : 'Vòng Quay'}
                </span>

                <ChevronDown className={`relative z-10 w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                  isWheelDropdownOpen ? 'rotate-180 text-orange-600' : ''
                }`} />
              </a>

              {/* Desktop Submenu Dropdown for Vòng Quay & Trợ Lý AI */}
              {isWheelDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200/80 p-2 z-50 overflow-hidden animate-fade-in transition-all">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Chọn món thông minh
                  </div>
                    <div className="space-y-1">
                      {wheelSubItems.map((sub) => {
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
                              <span className={`text-xs font-bold block ${
                                isSubActive ? 'text-orange-950' : 'text-stone-900 group-hover:text-orange-600'
                              }`}>
                                {sub.label}
                              </span>
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
                </div>
              )}
            </div>

            {/* 3. Món Ngon with Dropdown Submenu for Lịch Ăn Tuần & Đồ Uống */}
            <div 
              ref={foodDropdownRef}
              className="relative"
              onMouseEnter={handleFoodMouseEnter}
              onMouseLeave={handleFoodMouseLeave}
            >
              <a
                href={TAB_CONFIG.catalog.path}
                onClick={(e) => handleNavClick('catalog', e)}
                className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors select-none cursor-pointer ${
                  isFoodGroupActive ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {isFoodGroupActive && (
                  <div className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50 transition-all duration-200" />
                )}

                <span className={`relative z-10 transition-colors ${
                  isFoodGroupActive ? 'text-orange-600' : 'text-stone-400'
                }`}>
                  <UtensilsCrossed className="w-4 h-4" />
                </span>

                <span className="relative z-10 tracking-tight">
                  {activeTab === 'planner'
                    ? 'Lịch Ăn Tuần'
                    : activeTab === 'snacks'
                    ? 'Đồ Uống & Ăn Vặt'
                    : 'Món Ngon'}
                </span>

                <ChevronDown className={`relative z-10 w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                  isFoodDropdownOpen ? 'rotate-180 text-orange-600' : ''
                }`} />
              </a>

              {/* Desktop Submenu Dropdown Card for Món Ngon */}
              {isFoodDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200/80 p-2 z-50 overflow-hidden animate-fade-in transition-all">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Chuyên mục món ăn
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
                            <span className={`text-xs font-bold block ${
                              isSubActive ? 'text-orange-950' : 'text-stone-900 group-hover:text-orange-600'
                            }`}>
                              {sub.label}
                            </span>
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
                </div>
              )}
            </div>

            {/* 4. Quán Ngon (Mới thêm) */}
            <a
              href={TAB_CONFIG.restaurants.path}
              onClick={(e) => handleNavClick('restaurants', e)}
              className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors select-none cursor-pointer ${
                activeTab === 'restaurants' ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {activeTab === 'restaurants' && (
                <div className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50 transition-all duration-200" />
              )}
              <span className={`relative z-10 transition-colors ${
                activeTab === 'restaurants' ? 'text-orange-600' : 'text-stone-400 group-hover:text-stone-600'
              }`}>
                <Store className="w-4 h-4" />
              </span>
              <span className="relative z-10 tracking-tight">Quán Ngon</span>
            </a>

            {/* 5. Khám Phá / Ẩm Thực with Dropdown Submenu for Blog Ẩm Thực */}
            <div
              ref={discoverDropdownRef}
              className="relative"
              onMouseEnter={handleDiscoverMouseEnter}
              onMouseLeave={handleDiscoverMouseLeave}
            >
              <a
                href={activeTab === 'blog' ? TAB_CONFIG.blog.path : TAB_CONFIG.discover.path}
                onClick={(e) => handleNavClick(activeTab === 'blog' ? 'blog' : 'discover', e)}
                className={`relative flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-colors select-none cursor-pointer ${
                  isDiscoverGroupActive ? 'text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {isDiscoverGroupActive && (
                  <div className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50 transition-all duration-200" />
                )}

                <span className={`relative z-10 transition-colors ${
                  isDiscoverGroupActive ? 'text-orange-600' : 'text-stone-400 group-hover:text-stone-600'
                }`}>
                  {activeTab === 'blog' ? <BookOpen className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
                </span>

                <span className="relative z-10 tracking-tight">
                  {activeTab === 'blog' ? 'Blog Ẩm Thực' : 'Ẩm Thực'}
                </span>

                <ChevronDown className={`relative z-10 w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                  isDiscoverDropdownOpen ? 'rotate-180 text-orange-600' : ''
                }`} />
              </a>

              {/* Desktop Submenu Dropdown Card for Ẩm Thực & Blog */}
              {isDiscoverDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200/80 p-2 z-50 overflow-hidden animate-fade-in transition-all">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Cẩm nang & Khám phá
                  </div>
                  <div className="space-y-1">
                    {discoverSubItems.map((sub) => {
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
                            <span className={`text-xs font-bold block ${
                              isSubActive ? 'text-orange-950' : 'text-stone-900 group-hover:text-orange-600'
                            }`}>
                              {sub.label}
                            </span>
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
                </div>
              )}
            </div>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {onOpenLocationModal && (
              <button
                type="button"
                onClick={onOpenLocationModal}
                aria-label={`Chọn vị trí địa lý giao món. Hiện tại: ${userLocation?.district ? `${userLocation.district}, ` : ''}${userLocation?.city || 'Việt Nam'}`}
                title={`Vị trí: ${userLocation?.district ? `${userLocation.district}, ` : ''}${userLocation?.city || 'Việt Nam'}${userLocation?.source === 'gps' ? ' (Định vị GPS tự động)' : ''}`}
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full border border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700 transition-colors text-xs font-medium cursor-pointer shadow-2xs group"
              >
                <div className="relative shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
                  {userLocation?.source === 'gps' && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                  )}
                </div>
                <span className="max-w-[80px] sm:max-w-[120px] truncate font-semibold text-stone-800">
                  {userLocation?.district || userLocation?.city || 'Vị trí'}
                </span>
              </button>
            )}

            {/* PWA Install App Button */}
            <PWAInstallButton variant="navbar" />

            <button
              type="button"
              onClick={handleOpenShare}
              aria-label="Chia sẻ trang web Hôm Nay Ăn Gì cùng bạn bè qua mạng xã hội"
              title="Chia sẻ cùng bạn bè qua mạng xã hội"
              className="px-3.5 py-1.5 rounded-full border border-stone-200/80 bg-white hover:bg-stone-50 hover:border-orange-300 text-stone-700 transition-all duration-200 flex items-center gap-1.5 text-xs font-medium cursor-pointer shadow-2xs group"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-500 group-hover:text-orange-600 transition-colors" />
              <span className="hidden sm:inline font-semibold">Chia sẻ</span>
            </button>
          </div>
        </div>

        {/* Mobile Modern Pill Slider (5 direct items: Tarot | Vòng Quay | Món Ngon | Quán Ngon | Ẩm Thực) */}
        <nav 
          aria-label="Menu điều hướng di động" 
          className="md:hidden flex items-center justify-between p-1 my-1.5 rounded-full bg-stone-100/90 border border-stone-200/60"
        >
          {mobileNavItems.map((item) => {
            const isActive = item.id === 'catalog' 
              ? (activeTab === 'catalog' || activeTab === 'snacks' || activeTab === 'planner') 
              : item.id === 'wheel'
              ? (activeTab === 'wheel' || activeTab === 'ai')
              : (activeTab === item.id);
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-full text-xs font-medium transition-colors select-none text-center cursor-pointer ${
                  isActive ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white rounded-full shadow-xs border border-stone-200/50 transition-all duration-200" />
                )}
                <span className={`relative z-10 ${isActive ? 'text-orange-600' : 'text-stone-400'}`}>
                  {item.icon}
                </span>
                <span className="relative z-10 text-[10px] min-[360px]:text-[11px] sm:text-xs leading-none whitespace-nowrap">
                  {item.shortLabel}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Share to Social Media Modal (Rendered lazily on demand) */}
      {isShareModalOpen && (
        <Suspense fallback={null}>
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            title="Hôm Nay Ăn Gì? • Gợi ý món ngon chuẩn vị"
            text="Cùng quay bánh xe may mắn, bốc quẻ Tarot, lên lịch ăn tuần và tìm món ngon nhé!"
          />
        </Suspense>
      )}

      {/* Toast message for logo upload */}
      {logoToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 border border-orange-500/30 animate-fade-in">
          <Check className="w-4 h-4 text-orange-400" />
          <span>{logoToast}</span>
        </div>
      )}
    </header>
  );
};

