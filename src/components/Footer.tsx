import React, { useState } from 'react';
import { Heart, Share2, Info, Mail, Lock } from 'lucide-react';
import { TabType } from '../utils/navigation';
import { ShareModal } from './ShareModal';
import { PWAInstallButton } from './PWAInstallButton';

export const Footer: React.FC<{
  onOpenAffiliateModal: () => void;
  onNavigate?: (tab: TabType) => void;
  onOpenAdminInbox?: () => void;
}> = ({ onNavigate, onOpenAdminInbox }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    if (onNavigate) {
      e.preventDefault();
      onNavigate('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    if (onNavigate) {
      e.preventDefault();
      onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-stone-200 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png?v=6" 
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('/logo.svg')) {
                  target.src = '/logo.svg?v=6';
                }
              }}
              alt="Logo Hôm Nay Ăn Gì" 
              className="w-11 h-11 object-contain drop-shadow-xs shrink-0" 
            />
            <div>
              <div className="font-extrabold text-stone-900 text-sm">
                Hôm Nay Ăn Gì? • Smart Food Decider
              </div>
              <p className="text-xs text-stone-500">
                Gợi ý ẩm thực 3 miền, vòng quay may mắn & liên kết đặt món nhanh
              </p>
            </div>
          </div>

          {/* Trang Giới Thiệu (/gioi-thieu) & Liên Hệ (/lien-he) là trang riêng chuẩn SEO */}
          <nav aria-label="Liên kết chân trang" className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-600">
            <a
              href="/gioi-thieu"
              onClick={handleAboutClick}
              className="inline-flex items-center gap-1.5 hover:text-orange-600 transition-colors py-1 px-2 rounded-lg hover:bg-stone-50"
            >
              <Info className="w-3.5 h-3.5 text-stone-500" />
              <span>Giới Thiệu</span>
            </a>

            <span className="text-stone-300">•</span>

            <a
              href="/lien-he"
              onClick={handleContactClick}
              className="inline-flex items-center gap-1.5 hover:text-orange-600 transition-colors py-1 px-2 rounded-lg hover:bg-stone-50"
            >
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              <span>Liên Hệ</span>
            </a>

            <span className="text-stone-300">•</span>

            <PWAInstallButton variant="footer" />

            <span className="text-stone-300">•</span>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-orange-50/60"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ MXH</span>
            </button>
          </nav>

        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Hôm Nay Ăn Gì. Nền tảng gợi ý món ngon và hỗ trợ đặt món trực tuyến qua ShopeeFood, GrabFood, BeFood.</span>
            {onOpenAdminInbox && (
              <button
                type="button"
                onClick={onOpenAdminInbox}
                title="Quản trị"
                className="opacity-20 hover:opacity-100 transition-opacity p-0.5 cursor-pointer text-stone-400 hover:text-stone-700"
              >
                <Lock className="w-2.5 h-2.5" />
              </button>
            )}
          </p>
          <div className="flex items-center gap-1">
            <span>Thiết kế vì người yêu ẩm thực Việt Nam</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Hôm Nay Ăn Gì? • Gợi ý món ngon chuẩn vị"
        text="Rủ bạn bè cùng tìm món ngon, quay bánh xe ẩm thực và bốc quẻ Tarot!"
      />
    </footer>
  );
};
