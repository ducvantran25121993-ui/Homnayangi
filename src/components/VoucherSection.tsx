import React, { useState } from 'react';
import { Ticket, Copy, Check, ExternalLink, Flame, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { HOT_VOUCHERS } from '../data/dishes';
import { Voucher, AffiliateConfig } from '../types';
import { trackAndOpenAffiliateLink } from '../utils/affiliate';

interface VoucherSectionProps {
  affiliateConfig: AffiliateConfig;
}

export const VoucherSection: React.FC<VoucherSectionProps> = ({ affiliateConfig }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyAndRedirect = (voucher: Voucher) => {
    navigator.clipboard.writeText(voucher.code);
    setCopiedCode(voucher.code);
    setTimeout(() => setCopiedCode(null), 3000);

    // Open affiliate link for that platform
    trackAndOpenAffiliateLink(
      voucher.platform,
      { name: 'Khuyen-Mai-' + voucher.platform, estimatedPrice: 70000 },
      affiliateConfig
    );
  };

  const getPlatformBadge = (platform: Voucher['platform']) => {
    switch (platform) {
      case 'shopeefood':
        return {
          name: 'ShopeeFood',
          bg: 'bg-[#EE4D2D]',
          text: 'text-white',
          border: 'border-[#EE4D2D]',
        };
      case 'grabfood':
        return {
          name: 'GrabFood',
          bg: 'bg-[#00B14F]',
          text: 'text-white',
          border: 'border-[#00B14F]',
        };
      case 'befood':
        return {
          name: 'BeFood',
          bg: 'bg-[#FFD100]',
          text: 'text-stone-900',
          border: 'border-[#FFD100]',
        };
    }
  };

  return (
    <div className="py-6 sm:py-8 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <Ticket className="w-3.5 h-3.5 text-emerald-600" />
          KHO DEAL & MÃ GIẢM GIÁ APP FOOD
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-stone-900 tracking-tight mb-2 md:whitespace-nowrap">
          Săn Voucher <span className="text-emerald-600">Tiết Kiệm Tới 50k</span>
        </h2>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl mx-auto">
          Thu thập mã giảm giá độc quyền ShopeeFood, GrabFood & BeFood. Bấm "Lấy mã" để tự động sao chép mã và mở app đặt món!
        </p>
      </div>

      {/* Notice Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Mẹo săn deal:</strong> Bấm <strong>"Lấy mã & Đặt app"</strong> để mã được lưu vào bộ nhớ tạm và mở thẳng trang áp mã voucher của ứng dụng.
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-700 bg-amber-200/60 px-2.5 py-1 rounded-lg flex-shrink-0">
          Cập nhật mỗi ngày
        </span>
      </div>

      {/* Vouchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {HOT_VOUCHERS.map((voucher) => {
          const badge = getPlatformBadge(voucher.platform);
          const isCopied = copiedCode === voucher.code;

          return (
            <div
              key={voucher.id}
              className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Corner ribbon */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${badge.bg} ${badge.text}`}>
                  {badge.name}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {voucher.expireDate}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-stone-900 mb-1">
                  {voucher.discountText}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {voucher.description}
                </p>
                <div className="text-[11px] font-medium text-stone-500 mb-4 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  {voucher.minOrder}
                </div>
              </div>

              {/* Coupon Box */}
              <div className="pt-3 border-t border-dashed border-stone-200">
                <div className="flex items-center justify-between bg-stone-100/90 rounded-2xl p-2 border border-stone-300/80 mb-2">
                  <div className="px-3 font-mono font-black text-sm text-stone-800 tracking-wider">
                    {voucher.code}
                  </div>
                  <button
                    onClick={() => handleCopyAndRedirect(voucher)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Đã chép & Mở app
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Lấy mã & Đặt app
                      </>
                    )}
                  </button>
                </div>
                <div className="text-center text-[10px] text-stone-400">
                  Tự động chuyển tiếp qua đối tác affiliate chính thức
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
