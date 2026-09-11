import React, { useState } from 'react';
import { X, DollarSign, BarChart3, Settings, HelpCircle, Check, ExternalLink, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { AffiliateConfig, ClickRecord } from '../types';
import { formatVND } from '../utils/affiliate';

interface AffiliateModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AffiliateConfig;
  onSaveConfig: (newConfig: AffiliateConfig) => void;
  clickStats: {
    totalClicks: number;
    estimatedTotalCommission: number;
    clicksByPlatform: {
      shopeefood: number;
      grabfood: number;
      befood: number;
    };
    recentClicks: ClickRecord[];
  };
}

export const AffiliateModal: React.FC<AffiliateModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  clickStats,
}) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'settings' | 'guide'>('stats');
  const [formData, setFormData] = useState<AffiliateConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900">
                Trung Tâm Hoa Hồng & Tiếp Thị Liên Kết (Affiliate)
              </h2>
              <p className="text-xs text-stone-500">
                Theo dõi chuyển đổi đơn đồ ăn & cấu hình mã nhận hoa hồng app food
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 px-6 gap-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'stats'
                ? 'border-emerald-600 text-emerald-600 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Thống Kê & Hoa Hồng
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-emerald-600 text-emerald-600 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            Cấu Hình Mã Affiliate
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'guide'
                ? 'border-emerald-600 text-emerald-600 font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Hướng Dẫn Kiếm Tiền
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: STATS & ANALYTICS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Stat summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                    Ước tính hoa hồng
                  </div>
                  <div className="text-2xl font-black text-emerald-900">
                    {formatVND(clickStats.estimatedTotalCommission)}
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-1">
                    Dựa trên tỷ lệ {config.averageCommissionRate}%
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Tổng lượt click đặt món
                  </div>
                  <div className="text-2xl font-black text-stone-900">
                    {clickStats.totalClicks} lượt
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Mở app ShopeeFood, Grab, Be
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
                  <div className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">
                    Tỷ lệ hoa hồng TB
                  </div>
                  <div className="text-2xl font-black text-orange-900">
                    {config.averageCommissionRate}%
                  </div>
                  <div className="text-[11px] text-orange-600 mt-1">
                    ~2.500đ - 8.000đ / đơn
                  </div>
                </div>
              </div>

              {/* Platform Distribution */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                  Phân Bổ Lượt Click Theo Nền Tảng
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="text-xs font-bold text-[#EE4D2D]">ShopeeFood</div>
                    <div className="text-lg font-black text-stone-900 mt-1">
                      {clickStats.clicksByPlatform.shopeefood}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="text-xs font-bold text-[#00B14F]">GrabFood</div>
                    <div className="text-lg font-black text-stone-900 mt-1">
                      {clickStats.clicksByPlatform.grabfood}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="text-xs font-bold text-amber-600">BeFood</div>
                    <div className="text-lg font-black text-stone-900 mt-1">
                      {clickStats.clicksByPlatform.befood}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Click Logs */}
              <div>
                <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Lịch Sử Click Chuyển Đổi Gần Đây
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {clickStats.recentClicks.length > 0 ? (
                    clickStats.recentClicks.map((clk) => (
                      <div
                        key={clk.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              clk.platform === 'shopeefood'
                                ? 'bg-[#EE4D2D]'
                                : clk.platform === 'grabfood'
                                ? 'bg-[#00B14F]'
                                : 'bg-[#FFD100]'
                            }`}
                          />
                          <span className="font-bold text-stone-900">{clk.dishName}</span>
                          <span className="text-stone-400 capitalize">({clk.platform})</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-emerald-700">
                            +{formatVND(clk.estimatedCommission)}
                          </span>
                          <div className="text-[10px] text-stone-400">
                            {new Date(clk.timestamp).toLocaleTimeString('vi-VN')}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-stone-400 text-xs">
                      Chưa có lượt click nào được ghi nhận hôm nay.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AFFILIATE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs leading-relaxed">
                Nhập mã định danh Affiliate của bạn dưới đây. Khi người dùng bấm nút đặt món, hệ thống sẽ tự động chèn mã tiếp thị liên kết này vào đường dẫn tới ShopeeFood, GrabFood hoặc BeFood.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Shopee Affiliate ID / Tracking ID
                  </label>
                  <input
                    type="text"
                    value={formData.shopeeAffiliateId}
                    onChange={(e) =>
                      setFormData({ ...formData, shopeeAffiliateId: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-emerald-500 font-mono"
                    placeholder="VD: VN_FOOD_88899"
                  />
                  <span className="text-[11px] text-stone-500 mt-0.5 block">
                    Mã đối tác được cấp từ Shopee Affiliate Program hoặc Accesstrade.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Shopee SubID (Theo dõi nguồn)
                  </label>
                  <input
                    type="text"
                    value={formData.shopeeSubId}
                    onChange={(e) =>
                      setFormData({ ...formData, shopeeSubId: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-emerald-500 font-mono"
                    placeholder="VD: homnayangi_web"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      GrabFood Referral / Partner ID
                    </label>
                    <input
                      type="text"
                      value={formData.grabfoodAffiliateId}
                      onChange={(e) =>
                        setFormData({ ...formData, grabfoodAffiliateId: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-emerald-500 font-mono"
                      placeholder="VD: GRAB_AFF_VN_777"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      BeFood Partner ID
                    </label>
                    <input
                      type="text"
                      value={formData.befoodPartnerId}
                      onChange={(e) =>
                        setFormData({ ...formData, befoodPartnerId: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-emerald-500 font-mono"
                      placeholder="VD: BEFOOD_VN_666"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tỷ lệ hoa hồng ước tính (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="20"
                    value={formData.averageCommissionRate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        averageCommissionRate: Number(e.target.value),
                      })
                    }
                    className="w-32 px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-hidden focus:border-emerald-500"
                  />
                  <span className="text-[11px] text-stone-500 ml-2">
                    (Mặc định 5.5% đối với ngành hàng F&B Thực phẩm)
                  </span>
                </div>
              </div>

              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Đã lưu cấu hình thành công! Mọi liên kết đặt món sẽ áp dụng mã mới.
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
                >
                  Lưu Cấu Hình Affiliate
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: STEP-BY-STEP GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h3 className="font-extrabold text-emerald-950 text-sm mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  Cách Kiếm 5 - 15 Triệu/Tháng từ Web App "Hôm Nay Ăn Gì":
                </h3>
                <p className="text-emerald-800 text-xs">
                  Mỗi ngày có hàng triệu dân văn phòng và sinh viên đau đầu với câu hỏi "Hôm nay ăn gì?". Ứng dụng này giải quyết đúng nhu cầu đó và chuyển đổi trực tiếp thành đơn đặt món app food!
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900 mb-1">
                    Bước 1: Đăng ký chương trình tiếp thị liên kết F&B
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 text-xs">
                    <li>
                      <strong>Shopee Affiliate:</strong> Đăng ký trực tiếp tại{' '}
                      <span className="font-mono text-blue-600">affiliate.shopee.vn</span> hoặc thông qua mạng lưới <strong>Accesstrade Việt Nam</strong> (chiến dịch ShopeeFood).
                    </li>
                    <li>
                      <strong>GrabFood Partner:</strong> Tham gia chương trình Grab Affiliate hoặc Accesstrade Grab Food CPS.
                    </li>
                  </ul>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900 mb-1">
                    Bước 2: Dán mã ID vào tab "Cấu Hình Mã Affiliate"
                  </div>
                  <p className="text-stone-600 text-xs">
                    Nhập mã Affiliate ID của bạn vào tab Cấu hình ở trên. Toàn bộ các nút bấm trên Vòng quay may mắn, Trợ lý AI và Menu sẽ tự động chuyển hướng qua link có hoa hồng của bạn.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900 mb-1">
                    Bước 3: Chia sẻ ứng dụng vào các kênh có lượng người đói bụng cao
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-stone-600 text-xs">
                    <li>Nhóm chat đồng nghiệp cơ quan / công ty lúc 11h trưa & 16h chiều.</li>
                    <li>Các hội nhóm cư dân chung cư, group sinh viên các trường đại học.</li>
                    <li>Video ngắn TikTok / Reels chia sẻ mẹo "Quay vòng ăn gì khi không biết ăn gì".</li>
                  </ul>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900 mb-1">
                    Bước 4: Nhận tiền hoa hồng đối soát
                  </div>
                  <p className="text-stone-600 text-xs">
                    Mạng tiếp thị liên kết sẽ đối soát định kỳ hàng tháng và chuyển khoản tiền hoa hồng trực tiếp vào tài khoản ngân hàng của bạn.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
