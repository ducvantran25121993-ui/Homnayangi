import React, { useEffect, useState } from 'react';
import { MapPin, ShoppingBag, ExternalLink, X, CheckCircle2 } from 'lucide-react';
import { UserLocation } from '../types';
import { formatLocationDisplay } from '../utils/location';

export interface OrderEventDetail {
  dishName: string;
  platform: 'shopeefood' | 'grabfood' | 'befood' | 'googlemaps';
  location: UserLocation;
  url: string;
}

export const OrderToast: React.FC = () => {
  const [toastData, setToastData] = useState<OrderEventDetail | null>(null);

  useEffect(() => {
    const handleOrderOpened = (e: Event) => {
      const customEvent = e as CustomEvent<OrderEventDetail>;
      if (customEvent.detail) {
        setToastData(customEvent.detail);
      }
    };

    window.addEventListener('affiliate-order-opened', handleOrderOpened);
    return () => {
      window.removeEventListener('affiliate-order-opened', handleOrderOpened);
    };
  }, []);

  useEffect(() => {
    if (!toastData) return;
    const timer = setTimeout(() => {
      setToastData(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [toastData]);

  if (!toastData) return null;

  const platformMeta = {
    shopeefood: {
      name: 'ShopeeFood',
      bg: 'bg-[#EE4D2D]',
      textColor: 'text-[#EE4D2D]',
      borderColor: 'border-[#EE4D2D]/30',
    },
    grabfood: {
      name: 'GrabFood',
      bg: 'bg-[#00B14F]',
      textColor: 'text-[#00B14F]',
      borderColor: 'border-[#00B14F]/30',
    },
    befood: {
      name: 'BeFood',
      bg: 'bg-[#FFD100]',
      textColor: 'text-amber-800',
      borderColor: 'border-[#FFD100]/50',
    },
    googlemaps: {
      name: 'Google Maps',
      bg: 'bg-blue-600',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-300',
    },
  }[toastData.platform];

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 max-w-sm w-full animate-slide-up shadow-2xl rounded-2xl overflow-hidden bg-white border border-stone-200">
      <div className="p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl ${platformMeta.bg} text-white flex items-center justify-center shrink-0 shadow-sm`}
            >
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] font-black uppercase tracking-wide text-stone-500">
                  Đã mở tìm kiếm quán
                </span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  Chính xác
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-stone-900 leading-tight">
                Tìm "{toastData.dishName}"
              </h4>
              <div className="flex items-center gap-1 text-xs text-stone-600 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Khu vực: <strong>{formatLocationDisplay(toastData.location)}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setToastData(null)}
            className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
          <span className="text-[11px] text-stone-600">
            Ứng dụng: <strong className={platformMeta.textColor}>{platformMeta.name}</strong>
          </span>
          <a
            href={toastData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-stone-900 hover:bg-stone-800 text-white px-2.5 py-1 rounded-lg text-xs font-bold transition-transform active:scale-95 shadow-xs"
          >
            Mở app ngay <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
