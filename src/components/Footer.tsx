import React from 'react';
import { UtensilsCrossed, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC<{ onOpenAffiliateModal: () => void }> = ({ onOpenAffiliateModal }) => {
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

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-600">
            <span className="text-stone-400">
              Đặt món nhanh qua: ShopeeFood, GrabFood, BeFood
            </span>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <p>
            © {new Date().getFullYear()} Hôm Nay Ăn Gì. Nền tảng gợi ý món ngon và hỗ trợ đặt món trực tuyến.
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
