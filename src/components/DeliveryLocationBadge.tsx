import React from 'react';
import { MapPin, Crosshair, ChevronDown } from 'lucide-react';
import { UserLocation } from '../types';
import { formatLocationDisplay } from '../utils/location';

interface DeliveryLocationBadgeProps {
  location: UserLocation;
  onClick: () => void;
  className?: string;
  variant?: 'navbar' | 'compact' | 'card';
}

export const DeliveryLocationBadge: React.FC<DeliveryLocationBadgeProps> = ({
  location,
  onClick,
  className = '',
  variant = 'compact',
}) => {
  const displayText = formatLocationDisplay(location);

  if (variant === 'navbar') {
    return (
      <button
        onClick={onClick}
        title="Bấm để thay đổi vị trí giao hàng hoặc bật định vị GPS"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100/80 text-orange-950 border border-orange-200/80 transition-all text-xs font-semibold shadow-2xs group cursor-pointer ${className}`}
      >
        <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline text-stone-500 font-normal">Giao tới:</span>
        <span className="truncate max-w-[140px] sm:max-w-[180px] font-bold text-stone-900">
          {displayText}
        </span>
        <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
      </button>
    );
  }

  if (variant === 'card') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center justify-between p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/70 hover:bg-orange-100/60 transition-colors cursor-pointer text-xs ${className}`}
      >
        <div className="flex items-center gap-2 truncate">
          <div className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div className="truncate text-left">
            <span className="text-stone-500 text-[10px] block leading-tight font-medium">
              Vị trí tìm quán giao tới:
            </span>
            <span className="font-bold text-stone-900 truncate block">
              {displayText}
            </span>
          </div>
        </div>

        <span className="text-[11px] font-bold text-orange-600 hover:text-orange-700 shrink-0 ml-2 underline decoration-orange-300">
          Đổi vị trí
        </span>
      </div>
    );
  }

  // Compact variant
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-medium transition-colors cursor-pointer ${className}`}
    >
      <MapPin className="w-3 h-3 text-orange-600" />
      <span className="truncate max-w-[130px] font-semibold">{displayText}</span>
      <span className="text-stone-400 text-[10px] underline ml-0.5">Đổi</span>
    </button>
  );
};
