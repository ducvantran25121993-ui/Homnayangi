import React from 'react';
import { X, ShoppingBag, ExternalLink, Flame, Check, Utensils, Tag, MapPin, Compass } from 'lucide-react';
import { Dish, AffiliateConfig, UserLocation } from '../types';
import { trackAndOpenAffiliateLink } from '../utils/affiliate';
import { DeliveryLocationBadge } from './DeliveryLocationBadge';

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
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Header Image */}
        <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900/80 text-white backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-white/95 backdrop-blur-xs text-orange-700 shadow-sm">
              {dish.priceRange}
            </span>
          </div>

          <div className="absolute bottom-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-900/80 backdrop-blur-xs text-white">
              {dish.calories}
            </span>
          </div>
        </div>

        {/* Modal content */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {dish.popularTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-black text-stone-900">
              {dish.name}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {dish.description}
          </p>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2 text-xs">
            {dish.bestPairedWith && (
              <div className="flex items-start gap-2">
                <Utensils className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-800">Khuyên gọi kèm:</strong>{' '}
                  <span className="text-stone-600">{dish.bestPairedWith}</span>
                </span>
              </div>
            )}

            {dish.idealWeather && (
              <div className="flex items-start gap-2">
                <Flame className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-800">Thời điểm thích hợp:</strong>{' '}
                  <span className="text-stone-600">{dish.idealWeather}</span>
                </span>
              </div>
            )}
          </div>

          {/* Location Bar */}
          <DeliveryLocationBadge
            location={userLocation}
            onClick={() => onOpenLocationModal(dish.name)}
            variant="card"
          />

          {/* Action buttons - App Switch Section */}
          <div className="pt-2 border-t border-stone-100">
            <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-3.5 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase text-orange-900 tracking-wide mb-1">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span>Chuyển qua app tìm kiếm món này:</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Bấm vào một trong các nút bên dưới, hệ thống sẽ mở ứng dụng và tìm ngay các quán bán <strong>"{dish.name}"</strong> gần bạn nhất.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('shopeefood', dish, affiliateConfig, userLocation)
                }
                title={`Chuyển qua ShopeeFood tìm ${dish.name} (${userLocation.city})`}
                className="py-3 px-3 rounded-2xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm hover:shadow-md cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] opacity-85 font-medium leading-none">Chuyển qua app</div>
                  <div className="text-xs font-black leading-tight">ShopeeFood</div>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('grabfood', dish, affiliateConfig, userLocation)
                }
                title={`Chuyển qua GrabFood định vị quán ${dish.name} gần bạn`}
                className="py-3 px-3 rounded-2xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm hover:shadow-md cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] opacity-85 font-medium leading-none">Chuyển qua app</div>
                  <div className="text-xs font-black leading-tight">GrabFood</div>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('befood', dish, affiliateConfig, userLocation)
                }
                title={`Chuyển qua BeFood tìm ${dish.name} (${userLocation.city})`}
                className="py-3 px-3 rounded-2xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 font-extrabold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm hover:shadow-md cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] opacity-85 font-medium leading-none">Chuyển qua app</div>
                  <div className="text-xs font-black leading-tight">BeFood</div>
                </div>
                <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
              </button>
            </div>

            {/* Google Maps Nearby Option */}
            <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('googlemaps', dish, affiliateConfig, userLocation)
                }
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1.5 cursor-pointer transition-colors p-1"
              >
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Hoặc mở Google Maps tìm quán "{dish.name}" quanh đây</span>
              </button>
              <span className="text-[10px] text-stone-400 font-medium hidden sm:inline">Toạ độ GPS thực tế</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
