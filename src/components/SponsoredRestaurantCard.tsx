import React from 'react';
import { Star, MapPin, Tag, ExternalLink, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { SponsoredPartner } from '../types';
import { safeOpenExternalUrl } from '../utils/affiliate';

interface SponsoredRestaurantCardProps {
  partner: SponsoredPartner;
  dishName: string;
}

export const SponsoredRestaurantCard: React.FC<SponsoredRestaurantCardProps> = ({
  partner,
  dishName,
}) => {
  const handleOpenLink = (url?: string) => {
    if (!url) return;
    safeOpenExternalUrl(url);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 border-2 border-amber-300/80 p-3.5 sm:p-4 shadow-sm transition-all hover:shadow-md hover:border-amber-400">
      {/* Top Banner Tag: Sponsored Badge */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
          <Sparkles className="w-3 h-3 text-yellow-200 fill-yellow-200" />
          <span>{partner.verifiedBadge || 'Quán Ngon Đề Xuất'}</span>
        </div>

        <span className="text-[10px] font-semibold text-amber-800/80 bg-amber-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-amber-700" />
          Đối tác thẩm định
        </span>
      </div>

      {/* Main Content: Restaurant Info */}
      <div className="flex items-start gap-3">
        {/* Logo / Thumbnail */}
        {partner.logo && (
          <img
            src={partner.logo}
            alt={partner.restaurantName}
            referrerPolicy="no-referrer"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover border border-amber-200/80 shrink-0 shadow-2xs"
          />
        )}

        <div className="min-w-0 flex-1">
          {/* Restaurant Name */}
          <h4 className="text-sm sm:text-base font-black text-stone-900 leading-snug truncate">
            {partner.restaurantName}
          </h4>

          {/* Rating & Location */}
          <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5 flex-wrap">
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{partner.rating.toFixed(1)}</span>
              {partner.reviewCount && (
                <span className="text-stone-400 font-normal">({partner.reviewCount})</span>
              )}
            </div>
            <span className="text-stone-300">•</span>
            <div className="flex items-center gap-1 text-stone-600 truncate max-w-[200px]">
              <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
              <span className="truncate">{partner.district || partner.address}</span>
            </div>
          </div>

          {/* Promo Offer Badge if any */}
          {partner.promoBadge && (
            <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200/70 text-[11px] font-bold">
              <Tag className="w-3 h-3 text-red-600 shrink-0" />
              <span className="truncate">{partner.promoBadge}</span>
            </div>
          )}
        </div>
      </div>

      {/* CTA Direct Booking / Order at Restaurant buttons */}
      <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between gap-2">
        <div className="text-[11px] text-stone-500 truncate hidden sm:block">
          Ghé quán hoặc đặt trực tiếp để nhận ưu đãi
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          {partner.phone && (
            <a
              href={`tel:${partner.phone.replace(/\s+/g, '')}`}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 font-bold text-xs flex items-center gap-1 transition-all shrink-0 cursor-pointer"
              title={`Gọi hotline ${partner.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xs:inline">Gọi quán</span>
            </a>
          )}

          {partner.googleMapsUrl && (
            <button
              onClick={() => handleOpenLink(partner.googleMapsUrl)}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 font-bold text-xs flex items-center gap-1 transition-all shrink-0 cursor-pointer"
              title="Xem vị trí quán trên Google Maps"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden xs:inline">Chỉ đường</span>
            </button>
          )}

          {(partner.shopeeFoodUrl || partner.grabFoodUrl || partner.directBookingUrl) && (
            <button
              onClick={() =>
                handleOpenLink(
                  partner.shopeeFoodUrl || partner.grabFoodUrl || partner.directBookingUrl
                )
              }
              className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span>Đặt quán này</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
