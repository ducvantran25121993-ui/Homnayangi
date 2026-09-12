import React from 'react';
import { UtensilsCrossed, Heart } from 'lucide-react';
import { TAB_CONFIG, TabType } from '../utils/navigation';

export const Footer: React.FC<{
  onOpenAffiliateModal: () => void;
  onNavigate?: (tab: TabType) => void;
}> = ({ onNavigate }) => {
  const handleLinkClick = (tab: TabType, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    if (onNavigate) {
      e.preventDefault();
      onNavigate(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-stone-200 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-xs">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-stone-900 text-sm">
                Hôm Nay Ăn Gì? • Smart Food Decider
              </div>
              <p className="text-xs text-stone-500">
                Gợi ý ẩm thực 3 miền, vòng quay may mắn & liên kết đặt món nhanh
              </p>
            </div>
          </div>

          {/* Internal links for SEO & fast navigation */}
          <nav aria-label="Liên kết chân trang" className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-600">
            <a
              href={TAB_CONFIG.tarot.path}
              onClick={(e) => handleLinkClick('tarot', e)}
              className="hover:text-orange-600 transition-colors"
            >
              Tarot Ẩm Thực
            </a>
            <span className="text-stone-300">•</span>
            <a
              href={TAB_CONFIG.wheel.path}
              onClick={(e) => handleLinkClick('wheel', e)}
              className="hover:text-orange-600 transition-colors"
            >
              Vòng Quay Ăn Gì
            </a>
            <span className="text-stone-300">•</span>
            <a
              href={TAB_CONFIG.ai.path}
              onClick={(e) => handleLinkClick('ai', e)}
              className="hover:text-orange-600 transition-colors"
            >
              AI Gợi Ý Món Ăn
            </a>
            <span className="text-stone-300">•</span>
            <a
              href={TAB_CONFIG.catalog.path}
              onClick={(e) => handleLinkClick('catalog', e)}
              className="hover:text-orange-600 transition-colors"
            >
              Món Ngon 3 Miền
            </a>
          </nav>

        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <p>
            © {new Date().getFullYear()} Hôm Nay Ăn Gì. Nền tảng gợi ý món ngon và hỗ trợ đặt món trực tuyến qua ShopeeFood, GrabFood, BeFood.
          </p>
          <div className="flex items-center gap-1">
            <span>Thiết kế vì người yêu ẩm thực Việt Nam</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
