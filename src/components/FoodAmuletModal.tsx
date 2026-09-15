import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Copy,
  Check,
  MapPin,
  Flame,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Share2,
} from 'lucide-react';
import { Dish, UserLocation, AffiliateConfig } from '../types';
import { trackAndOpenAffiliateLink, formatVND } from '../utils/affiliate';
import { formatLocationDisplay } from '../utils/location';
import { ShareModal } from './ShareModal';

export interface FoodAmuletData {
  dish: Dish;
  tarotName: string;
  romanNumeral: string;
  latin: string;
  isUpright: boolean;
  zodiacName: string;
  zodiacSymbol: string;
  zodiacElement: string;
  oracleQuote: string;
  warningQuote?: string;
  luckyNumber: number;
  luckyHours: string;
  serialNumber: string;
}

interface FoodAmuletModalProps {
  data: FoodAmuletData | null;
  onClose: () => void;
  userLocation: UserLocation;
  affiliateConfig: AffiliateConfig;
}

export const FoodAmuletModal: React.FC<FoodAmuletModalProps> = ({
  data,
  onClose,
  userLocation,
  affiliateConfig,
}) => {
  const [copied, setCopied] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!data) return null;

  const dishName = data.dish.vietnameseName || data.dish.name;
  const targetArea = userLocation.district || userLocation.city;

  const handleCopyTalisman = () => {
    const textToCopy = `🏮 TẤM BÙA HỘ MỆNH ẨM THỰC 🏮\n✦ Quẻ Bài: ${data.romanNumeral} - ${data.tarotName} (${data.latin})\n✦ Trạng Thái: ${data.isUpright ? 'Thuận Chiều (Đại Cát Vị Giác)' : 'Nghịch Chiều (Cảnh Báo Vũ Trụ)'}\n✦ Cung Mệnh: ${data.zodiacSymbol} ${data.zodiacName} (${data.zodiacElement})\n✦ Món Định Mệnh: ${dishName}\n✦ Lời Sấm Truyền: ${data.oracleQuote}\n${!data.isUpright && data.warningQuote ? `✦ Cảnh Báo: ${data.warningQuote}\n` : ''}✦ Con Số Thần Tài: #${data.luckyNumber} | Giờ Hoàng Đạo: ${data.luckyHours}\n✦ Khu Vực Tìm Quán: ${targetArea}\n---\nKhám phá tại Hôm Nay Ăn Gì?`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToDevice = () => {
    handleCopyTalisman();
    setSavedLocally(true);
    setTimeout(() => setSavedLocally(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-auto rounded-3xl bg-gradient-to-b from-[#1b1035] via-[#100924] to-[#0a0518] border-2 border-amber-400/60 shadow-[0_0_50px_rgba(245,158,11,0.35)] p-5 sm:p-6 text-white text-center overflow-hidden">
        {/* Mystic Background Ornaments */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Ribbon */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/25 to-amber-500/20 border border-amber-300/50 text-amber-300 text-[11px] font-black uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          Bùa Hộ Mệnh Ẩm Thực • Linh Phù Vị Giác
        </div>

        {/* Antique Frame Container */}
        <div className="relative rounded-2xl border-2 border-amber-400/40 p-3.5 sm:p-4 bg-gradient-to-b from-[#241344]/80 to-[#120926]/90 shadow-inner my-2">
          {/* Top Mystic Seal Info */}
          <div className="flex items-center justify-between text-[11px] border-b border-amber-400/25 pb-2 mb-3 text-amber-200/90">
            <span className="font-bold tracking-wider">
              {data.romanNumeral} • {data.tarotName}
            </span>
            <span className="text-amber-400 font-mono text-[10px]">
              MÃ: {data.serialNumber}
            </span>
          </div>

          {/* Dish Image with Antique Vignette */}
          <div className="relative w-full h-40 sm:h-44 rounded-xl overflow-hidden border border-amber-300/40 mb-3 group">
            <img
              src={data.dish.image}
              alt={`Lá bùa hộ mệnh ẩm thực: ${dishName} quẻ ${data.tarotName} mang may mắn tài lộc - Hôm Nay Ăn Gì`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-3 text-left">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 font-black text-[10px] uppercase">
                  <Flame className="w-3 h-3 fill-red-600 text-red-600" />
                  Món Thụ Lộc Định Mệnh
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${
                  data.isUpright
                    ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400/50'
                    : 'bg-purple-500/30 text-purple-300 border-purple-400/50'
                }`}>
                  {data.isUpright ? '✦ Thuận Chiều' : '✦ Nghịch Chiều'}
                </span>
              </div>
              <h3 className="text-lg font-black text-white drop-shadow">
                {dishName}
              </h3>
              <div className="text-xs text-amber-300 font-extrabold mt-0.5">
                {formatVND(data.dish.estimatedPrice)}
              </div>
            </div>
          </div>

          {/* Horoscope & Elemental Alignment */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-[11px]">
            <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-400/30 text-left flex items-center gap-2">
              <span className="text-lg">{data.zodiacSymbol}</span>
              <div>
                <div className="text-[9px] text-purple-300 uppercase font-bold">Cung Hoàng Đạo</div>
                <div className="font-extrabold text-white line-clamp-1">{data.zodiacName}</div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-400/30 text-left flex items-center gap-2">
              <span className="text-base">🔥</span>
              <div>
                <div className="text-[9px] text-amber-300 uppercase font-bold">Nguyên Tố</div>
                <div className="font-extrabold text-white line-clamp-1">{data.zodiacElement}</div>
              </div>
            </div>
          </div>

          {/* Sacred Oracle Blessing */}
          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-left text-xs sm:text-[13px] text-amber-100 italic leading-relaxed mb-3">
            <div className="not-italic text-[10px] font-black uppercase text-amber-300 tracking-wider flex items-center gap-1 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Lời Chú Hộ Mệnh Vị Giác:
            </div>
            {data.oracleQuote}
            {!data.isUpright && data.warningQuote && (
              <div className="mt-2 pt-2 border-t border-amber-400/20 text-purple-200 text-xs not-italic font-sans">
                ⚠️ <strong className="text-amber-300 font-bold">Chỉ dẫn nghịch chiều:</strong> {data.warningQuote}
              </div>
            )}
          </div>

          {/* Lucky Numbers & Hour Bar */}
          <div className="flex items-center justify-around py-2 px-3 rounded-xl bg-black/40 border border-amber-400/20 text-xs mb-3">
            <div>
              <span className="text-[9px] text-stone-400 uppercase font-bold block">Số Thần Tài</span>
              <span className="text-base font-black text-amber-400">#{data.luckyNumber}</span>
            </div>
            <div className="w-[1px] h-6 bg-white/10" />
            <div>
              <span className="text-[9px] text-stone-400 uppercase font-bold block">Giờ Thụ Lộc</span>
              <span className="text-xs font-black text-emerald-300">{data.luckyHours}</span>
            </div>
            <div className="w-[1px] h-6 bg-white/10" />
            <div>
              <span className="text-[9px] text-stone-400 uppercase font-bold block">Khu Vực</span>
              <span className="text-xs font-black text-amber-300">{targetArea}</span>
            </div>
          </div>

          {/* Direct District Food App Buttons */}
          <div className="pt-1">
            <div className="text-[11px] text-stone-300 font-bold mb-2 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>Tìm quán giao tại <strong>{targetArea}</strong>:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('shopeefood', data.dish, affiliateConfig, userLocation)
                }
                title={`Tìm quán ${dishName} tại ${targetArea} trên ShopeeFood`}
                className="py-2.5 px-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-transform active:scale-95 shadow cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span>Shopee</span>
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('grabfood', data.dish, affiliateConfig, userLocation)
                }
                title={`Tìm quán ${dishName} tại ${targetArea} trên GrabFood`}
                className="py-2.5 px-2 rounded-xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-transform active:scale-95 shadow cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span>Grab</span>
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('befood', data.dish, affiliateConfig, userLocation)
                }
                title={`Tìm quán ${dishName} tại ${targetArea} trên BeFood`}
                className="py-2.5 px-2 rounded-xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 font-extrabold text-xs flex items-center justify-center gap-1 transition-transform active:scale-95 shadow cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                <span>BeFood</span>
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('googlemaps', data.dish, affiliateConfig, userLocation)
                }
                title={`Mở Google Maps tìm quán ${dishName} gần bạn`}
                className="py-2.5 px-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs flex items-center justify-center gap-1 transition-transform active:scale-95 shadow cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0 text-white" />
                <span>Maps</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons: Copy Talisman, Share to Socials, Close */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={handleCopyTalisman}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-lg shadow-amber-500/25 cursor-pointer uppercase tracking-wider"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                <span>Đã Sao Chép</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-950" />
                <span>Sao Chép Bùa</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            title="Chia sẻ bùa hộ mệnh lên mạng xã hội"
            className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-md shadow-purple-900/30 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-amber-300" />
            <span>Chia sẻ MXH</span>
          </button>
        </div>

        {savedLocally && (
          <div className="mt-2.5 text-xs text-emerald-400 font-bold animate-fade-in">
            ✓ Đã sao chép nội dung bùa hộ mệnh để lưu giữ hoặc chia sẻ lên Facebook/Story!
          </div>
        )}
      </div>

      {/* Social Share Modal for Amulet */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`🏮 Tấm Bùa Hộ Mệnh Ẩm Thực: ${data.tarotName} - Món ${dishName}!`}
        text={`Tôi vừa thỉnh được Tấm Bùa Hộ Mệnh Ẩm Thực "${data.tarotName}" (${data.romanNumeral}) cho món "${dishName}". Số thần tài #${data.luckyNumber}, giờ hoàng đạo ${data.luckyHours}!`}
      />
    </div>
  );
};
