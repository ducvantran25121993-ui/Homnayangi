import React from 'react';
import { UtensilsCrossed, Sparkles, Disc, Compass, Share2 } from 'lucide-react';
import { UserLocation } from '../types';
import { TAB_CONFIG, TabType } from '../utils/navigation';

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
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavClick = (tab: TabType, e: React.MouseEvent<HTMLAnchorElement>) => {
    // If middle click or holding ctrl/meta, allow default browser behavior (open new tab)
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand logo */}
          <a 
            href={TAB_CONFIG.tarot.path}
            onClick={(e) => handleNavClick('tarot', e)}
            className="flex items-center gap-3 group"
            role="img"
            aria-label="Logo thương hiệu Hôm Nay Ăn Gì - Ứng dụng gợi ý món ăn chuẩn vị"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">
                  Hôm Nay <span className="text-orange-600">Ăn Gì?</span>
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Gợi ý món chuẩn vị
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav aria-label="Menu điều hướng chính" className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-xl border border-stone-200/60">
            <a
              href={TAB_CONFIG.tarot.path}
              onClick={(e) => handleNavClick('tarot', e)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'tarot'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>{TAB_CONFIG.tarot.label}</span>
            </a>

            <a
              href={TAB_CONFIG.wheel.path}
              onClick={(e) => handleNavClick('wheel', e)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'wheel'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Disc className="w-4 h-4" />
              <span>{TAB_CONFIG.wheel.label}</span>
            </a>

            <a
              href={TAB_CONFIG.ai.path}
              onClick={(e) => handleNavClick('ai', e)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'ai'
                  ? 'bg-white text-purple-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>{TAB_CONFIG.ai.label}</span>
            </a>

            <a
              href={TAB_CONFIG.catalog.path}
              onClick={(e) => handleNavClick('catalog', e)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>{TAB_CONFIG.catalog.label}</span>
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Share button */}
            <button
              onClick={handleShare}
              title="Chia sẻ đường dẫn trang hiện tại"
              className="px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors flex items-center gap-1.5 text-xs font-medium shadow-2xs cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Đã sao chép link!' : 'Chia sẻ'}</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <nav aria-label="Menu điều hướng di động" className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-stone-100 no-scrollbar gap-1">
          <a
            href={TAB_CONFIG.tarot.path}
            onClick={(e) => handleNavClick('tarot', e)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'tarot' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-stone-600'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            {TAB_CONFIG.tarot.shortLabel}
          </a>
          <a
            href={TAB_CONFIG.wheel.path}
            onClick={(e) => handleNavClick('wheel', e)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'wheel' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-stone-600'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            {TAB_CONFIG.wheel.shortLabel}
          </a>
          <a
            href={TAB_CONFIG.ai.path}
            onClick={(e) => handleNavClick('ai', e)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'ai' ? 'bg-purple-50 text-purple-600 font-bold' : 'text-stone-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {TAB_CONFIG.ai.shortLabel}
          </a>
          <a
            href={TAB_CONFIG.catalog.path}
            onClick={(e) => handleNavClick('catalog', e)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'catalog' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-stone-600'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            {TAB_CONFIG.catalog.shortLabel}
          </a>
        </nav>
      </div>
    </header>
  );
};
