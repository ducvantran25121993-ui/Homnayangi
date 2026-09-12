import React from 'react';
import { ShoppingBag, Compass, ExternalLink, X, MapPin, Sparkles, Utensils, Info } from 'lucide-react';
import { Dish, AffiliateConfig, UserLocation } from '../types';
import { trackAndOpenAffiliateLink } from '../utils/affiliate';
import { formatLocationDisplay } from '../utils/location';

interface SelectedDishDockProps {
  dish: Dish | null;
  onClearDish: () => void;
  onViewDetails: (dish: Dish) => void;
  affiliateConfig: AffiliateConfig;
  userLocation: UserLocation;
  onOpenLocationModal: (dishName?: string) => void;
}

export const SelectedDishDock: React.FC<SelectedDishDockProps> = ({
  dish,
  onClearDish,
  onViewDetails,
  affiliateConfig,
  userLocation,
  onOpenLocationModal,
}) => {
  if (!dish) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-orange-500/40 shadow-2xl p-3 sm:p-4 pointer-events-auto transition-all animate-slide-up">
        
        {/* Top Info Row */}
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-stone-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-xs">
              <img
                src={dish.image}
                alt={`${dish.vietnameseName || dish.name} đặc sản ${dish.category} đã chọn - Hôm Nay Ăn Gì`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-orange-600/90 text-white text-[9px] font-black text-center py-0.5">
                ĐÃ CHỌN
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider">
                  Món bạn đang chọn:
                </span>
                <span className="text-[11px] font-bold text-stone-500 hidden sm:inline-block">
                  ({dish.priceRange})
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-stone-900 truncate">
                {dish.name}
              </h3>
            </div>
          </div>

          {/* Right actions: Location & Details & Dismiss */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onOpenLocationModal(dish.name)}
              className="text-[11px] font-bold text-stone-600 hover:text-orange-600 bg-stone-100 hover:bg-orange-50 px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
              title="Đổi địa chỉ giao món"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span className="max-w-[80px] sm:max-w-[120px] truncate">
                {formatLocationDisplay(userLocation)}
              </span>
            </button>

            <button
              onClick={() => onViewDetails(dish)}
              className="text-[11px] font-bold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded-xl hidden sm:flex items-center gap-1 transition-colors cursor-pointer"
              title="Xem thông tin chi tiết món"
            >
              <Info className="w-3.5 h-3.5 text-stone-500" />
              <span>Chi tiết</span>
            </button>

            <button
              onClick={onClearDish}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              title="Bỏ chọn món này"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons Row: Switch to Food App */}
        <div className="pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-[11px] font-bold text-stone-700 flex items-center gap-1">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span>Bấm nút để chuyển qua app tìm kiếm <strong>"{dish.name}"</strong>:</span>
          </div>

          <div className="grid grid-cols-3 sm:flex items-center gap-2">
            <button
              onClick={() => trackAndOpenAffiliateLink('shopeefood', dish, affiliateConfig, userLocation)}
              title={`Chuyển qua ShopeeFood tìm ${dish.name} (${userLocation.city})`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-xs transition-transform active:scale-95 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>ShopeeFood</span>
            </button>

            <button
              onClick={() => trackAndOpenAffiliateLink('grabfood', dish, affiliateConfig, userLocation)}
              title={`Chuyển qua GrabFood định vị quán ${dish.name} gần bạn`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-xs transition-transform active:scale-95 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>GrabFood</span>
            </button>

            <button
              onClick={() => trackAndOpenAffiliateLink('befood', dish, affiliateConfig, userLocation)}
              title={`Chuyển qua BeFood tìm ${dish.name}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 font-extrabold text-xs transition-transform active:scale-95 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>BeFood</span>
            </button>

            <button
              onClick={() => trackAndOpenAffiliateLink('googlemaps', dish, affiliateConfig, userLocation)}
              title={`Mở Google Maps tìm quán ${dish.name} quanh toạ độ hiện tại`}
              className="col-span-3 sm:col-span-1 flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 font-bold text-[11px] transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="sm:hidden">Google Maps (Quán quanh đây)</span>
              <span className="hidden sm:inline">Maps</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
