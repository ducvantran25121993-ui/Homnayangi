import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, MapPin, Share2, Sparkles, Building2, ChevronRight } from 'lucide-react';
import { Dish, AffiliateConfig, UserLocation } from '../types';
import { trackAndOpenAffiliateLink } from '../utils/affiliate';
import { formatLocationDisplay } from '../utils/location';
import { ShareModal } from './ShareModal';
import { findSponsoredPartnerForDish } from '../data/sponsoredPartners';
import { SponsoredRestaurantCard } from './SponsoredRestaurantCard';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  affiliateConfig: AffiliateConfig;
  userLocation: UserLocation;
  onOpenLocationModal: (dishName?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  affiliateConfig,
  userLocation,
  onOpenLocationModal,
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Check if there is an active sponsored partner restaurant for this dish
  const sponsoredPartner = dish
    ? findSponsoredPartnerForDish(dish.id, userLocation.city)
    : undefined;

  // Support Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!dish) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[28px] sm:rounded-[32px] max-w-[520px] sm:max-w-[600px] md:max-w-[640px] w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200/80 flex flex-col transition-all relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
          <img
            src={dish.image}
            alt={`${dish.vietnameseName || dish.name} đặc sản ${dish.category} chuẩn vị thơm ngon - Hôm Nay Ăn Gì`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Action buttons at top right: Share & Close */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
            <button
              onClick={() => setIsShareModalOpen(true)}
              aria-label="Chia sẻ món này lên mạng xã hội"
              title="Chia sẻ món ăn cùng bạn bè"
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md backdrop-blur-xs"
            >
              <Share2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onClose}
              aria-label="Đóng"
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md backdrop-blur-xs"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>
          </div>

          {/* Bottom Left Badge: Price Range */}
          <div className="absolute bottom-3 left-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-white text-[#D9381E] shadow-sm tracking-tight">
              {dish.priceRange}
            </span>
          </div>

          {/* Bottom Right Badge: Calories */}
          <div className="absolute bottom-3 right-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/75 text-white shadow-sm backdrop-blur-xs">
              {dish.calories}
            </span>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 space-y-3.5">
          {/* Tags */}
          {dish.popularTags && dish.popularTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {dish.popularTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF0E6] text-[#C2410C]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Dish Name */}
          <h2 className="text-2xl sm:text-[26px] font-black text-stone-900 tracking-tight leading-snug">
            {dish.name}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {dish.description}
          </p>

          {/* Location Box (Integrated right inside modal as shown in user's image) */}
          <div className="bg-[#FFF8F2] border border-[#FED7AA]/70 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#EE4D2D] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-stone-500 font-medium leading-none mb-1">
                  Vị trí tìm quán giao tới:
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900 leading-tight truncate">
                  {formatLocationDisplay(userLocation)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenLocationModal(dish.name)}
              className="text-xs sm:text-sm font-bold text-[#EE4D2D] hover:text-[#C2410C] underline underline-offset-2 shrink-0 cursor-pointer"
            >
              Đổi vị trí
            </button>
          </div>

          {/* SPONSORED PARTNER / QUÁN ĐƯỢC ĐỀ XUẤT */}
          {sponsoredPartner ? (
            <div className="pt-1">
              <SponsoredRestaurantCard partner={sponsoredPartner} dishName={dish.name} />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-2.5 sm:p-3 flex items-center justify-between gap-2 text-xs text-amber-900">
              <div className="flex items-center gap-2 min-w-0">
                <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate text-[11px] sm:text-xs">
                  Bạn là chủ quán <strong>{dish.name}</strong>? Đăng ký xuất hiện tại đây
                </span>
              </div>
              <a
                href="/lien-he"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.history.pushState({ tab: 'contact' }, '', '/lien-he');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                className="shrink-0 font-bold text-orange-600 hover:text-orange-700 underline flex items-center gap-0.5 text-[11px] sm:text-xs"
              >
                Đặt chỗ
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Action Row: Order Delivery with Promo Code */}
          <div className="pt-1 space-y-2.5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-stone-900 flex-wrap gap-1">
              <span>
                Tìm quán giao tại{' '}
                <strong className="text-orange-600 underline decoration-orange-300">
                  {userLocation.district || userLocation.city}
                </strong>
                :
              </span>
              <span className="text-[11px] font-semibold text-[#00A862] bg-[#E8F8F0] px-2.5 py-0.5 rounded-md">
                Tích lũy hoa hồng
              </span>
            </div>

            {/* 4 Food App & Map Buttons side-by-side */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('shopeefood', dish, affiliateConfig, userLocation)
                }
                title={`Chuyển qua ShopeeFood tìm quán ${dish.name} tại ${userLocation.district || userLocation.city}`}
                className="py-3 px-2 sm:px-2.5 rounded-2xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>ShopeeFood</span>
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('grabfood', dish, affiliateConfig, userLocation)
                }
                title={`Chuyển qua GrabFood tìm quán ${dish.name} tại ${userLocation.district || userLocation.city}`}
                className="py-3 px-2 sm:px-2.5 rounded-2xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>GrabFood</span>
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('befood', dish, affiliateConfig, userLocation)
                }
                title={`Chuyển qua BeFood tìm quán ${dish.name} tại ${userLocation.district || userLocation.city}`}
                className="py-3 px-2 sm:px-2.5 rounded-2xl bg-[#FFC400] hover:bg-[#F2BA00] text-stone-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4 shrink-0 text-stone-950" />
                <span>BeFood</span>
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('googlemaps', dish, affiliateConfig, userLocation)
                }
                title={`Mở Google Maps tìm quán ${dish.name} gần bạn`}
                className="py-3 px-2 sm:px-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 shrink-0 text-white" />
                <span>Google Maps</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`${dish.name} - Món ngon chuẩn vị tại Hôm Nay Ăn Gì!`}
        text={`Ghé xem món ngon "${dish.name}" (${dish.calories}, ${dish.priceRange}): ${dish.description}`}
      />
    </div>
  );
};
