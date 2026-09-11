import React from 'react';
import { X, ShoppingBag, ExternalLink, Flame, Check, Utensils, Tag } from 'lucide-react';
import { Dish, AffiliateConfig } from '../types';
import { trackAndOpenAffiliateLink } from '../utils/affiliate';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  affiliateConfig: AffiliateConfig;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  affiliateConfig,
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

          {/* Action buttons */}
          <div className="pt-2">
            <div className="text-xs font-bold text-stone-700 mb-2 flex items-center justify-between">
              <span>Đặt giao tận nơi với mã giảm giá:</span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                Tích lũy hoa hồng
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('shopeefood', dish, affiliateConfig)
                }
                className="py-2.5 px-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                ShopeeFood
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('grabfood', dish, affiliateConfig)
                }
                className="py-2.5 px-2 rounded-xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                GrabFood
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('befood', dish, affiliateConfig)
                }
                className="py-2.5 px-2 rounded-xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                BeFood
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
