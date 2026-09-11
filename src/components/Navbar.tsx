import React from 'react';
import { UtensilsCrossed, Sparkles, Disc, Compass, Share2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'wheel' | 'ai' | 'tarot' | 'catalog';
  setActiveTab: (tab: 'wheel' | 'ai' | 'tarot' | 'catalog') => void;
  onOpenAffiliateModal?: () => void;
  clickCount?: number;
  totalEstimatedCommission?: number;
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand logo */}
          <div 
            onClick={() => setActiveTab('wheel')}
            className="flex items-center gap-3 cursor-pointer group"
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
                Gợi ý món chuẩn vị • Đặt ngay qua ShopeeFood & GrabFood
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-xl border border-stone-200/60">
            <button
              onClick={() => setActiveTab('wheel')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'wheel'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Disc className="w-4 h-4" />
              <span>Vòng Quay</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'ai'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Trợ Lý AI</span>
            </button>

            <button
              onClick={() => setActiveTab('tarot')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'tarot'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Tarot Ẩm Thực</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Món Ngon</span>
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            
            {/* Share button */}
            <button
              onClick={handleShare}
              title="Chia sẻ link"
              className="px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors flex items-center gap-1.5 text-xs font-medium shadow-2xs"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Đã sao chép link!' : 'Chia sẻ'}</span>
            </button>

          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-stone-100 no-scrollbar gap-1">
          <button
            onClick={() => setActiveTab('wheel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'wheel' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-stone-600'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            Vòng Quay
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'ai' ? 'bg-purple-50 text-purple-600 font-bold' : 'text-stone-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Trợ Lý AI
          </button>
          <button
            onClick={() => setActiveTab('tarot')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'tarot' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-stone-600'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Tarot
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'catalog' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-stone-600'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Món Ngon
          </button>
        </div>
      </div>
    </header>
  );
};
