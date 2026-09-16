import React from 'react';
import {
  UtensilsCrossed,
  Sparkles,
  Compass,
  Disc,
  ShieldCheck,
  Heart,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { TAB_CONFIG, TabType } from '../utils/navigation';

interface AboutPageProps {
  onNavigate: (tab: TabType) => void;
  onOpenContact?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-stone-800">
      {/* Hero Banner */}
      <header className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/70 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Về Chúng Tôi • Hôm Nay Ăn Gì</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
          Nền Tảng Gợi Ý Ẩm Thực Thông Minh <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">
            Hàng Đầu Cho Người Việt
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 leading-relaxed">
          Chúng tôi ra đời để giải quyết dứt điểm câu hỏi nan giải mỗi ngày: <strong className="text-stone-900 font-bold">&quot;Hôm nay ăn gì?&quot;</strong>, mang đến nguồn cảm hứng vị giác bất tận cùng trải nghiệm đặt món nhanh gọn, tiện lợi nhất.
        </p>
      </header>

      {/* Main Story & Sứ mệnh */}
      <div className="space-y-8">
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-orange-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h2>Câu Chuyện Khởi Nguồn & Sứ Mệnh</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              Mỗi ngày, hàng triệu bạn trẻ, giới văn phòng và các gia đình Việt Nam mất từ 15 đến 30 phút chỉ để suy nghĩ xem trưa nay hay tối nay ăn món gì. Sự chần chừ này không chỉ gây mất thời gian mà còn làm giảm đi niềm vui thưởng thức ẩm thực.
            </p>
            <p>
              <strong>Hôm Nay Ăn Gì (Angigio.com)</strong> được phát triển nhằm biến việc chọn món từ một nỗi đắn đo mệt mỏi thành trải nghiệm giải trí kỳ thú, tràn đầy cảm xúc và đậm chất văn hóa Việt.
            </p>
          </div>
        </section>

        {/* 4 Trụ Cột Tính Năng Đột Phá */}
        <section>
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              Công Nghệ Độc Đáo Giúp Bạn Quyết Định Trong Tích Tắc
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Sự kết hợp hoàn hảo giữa chiêm tinh học, xác suất thống kê và trí tuệ nhân tạo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* 1. Tarot */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base sm:text-lg mb-2 group-hover:text-purple-700 transition-colors">
                  Tarot Ẩm Thực Chiêm Tinh
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Lần đầu tiên tại Việt Nam, trải bài Tarot được ứng dụng vào ẩm thực theo 12 cung hoàng đạo và 4 cõi: Thực Cảnh, Đồ Miên, Thủy Dược, Túy Vị. Mỗi lá bài là một thông điệp vị giác định mệnh kèm lá bùa hộ mệnh độc bản.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('tarot')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-800 cursor-pointer"
              >
                <span>Trải bài Tarot ngay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Vòng Quay */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between hover:border-orange-300 transition-all group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mb-3">
                  <Disc className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base sm:text-lg mb-2 group-hover:text-orange-700 transition-colors">
                  Vòng Quay May Mắn Ngẫu Nhiên
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Vòng quay vật lý chuẩn xác, công bằng 100%. Phù hợp cho hội nhóm văn phòng chọn món ăn trưa trong 3 giây. Hỗ trợ tùy biến thêm bớt món ăn hoặc lọc theo chủ đề Ăn Vặt, Cơm Trưa, Healthy.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('wheel')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:text-orange-800 cursor-pointer"
              >
                <span>Quay vòng quay ăn gì</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. AI Gợi Ý */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-all group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base sm:text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                  Trợ Lý AI Gợi Ý Món Ăn
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Đầu bếp ảo thấu hiểu tâm lý: Lắng nghe tâm trạng, thời tiết, ngân sách và nhu cầu ăn kiêng (eat clean, chay, keto) để gợi ý bữa ăn hoàn mỹ và cân bằng dinh dưỡng.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('ai')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                <span>Nhờ AI gợi ý món</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4. Thực Đơn 160+ Món */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between hover:border-red-300 transition-all group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mb-3">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-base sm:text-lg mb-2 group-hover:text-red-700 transition-colors">
                  Từ Điển 160+ Món Ngon 3 Miền
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Bộ sưu tập tinh hoa ẩm thực Bắc - Trung - Nam được phân loại bài bản theo nguyên liệu, mùi vị, mức giá kèm liên kết đặt món trực tiếp qua ShopeeFood, GrabFood, BeFood.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('catalog')}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 cursor-pointer"
              >
                <span>Khám phá thực đơn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Cam Kết & Giá Trị Cốt Lõi */}
        <section className="bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 font-extrabold text-lg sm:text-xl text-orange-400 mb-4">
            <ShieldCheck className="w-6 h-6" />
            <h2>Cam Kết Của Chúng Tôi</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-300">
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60">
              <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Miễn Phí</span>
              </h4>
              <p>Mọi tính năng bốc bài Tarot, quay vòng quay, tư vấn AI đều hoàn toàn miễn phí cho tất cả người dùng.</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60">
              <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Khách Quan & Đa Dạng</span>
              </h4>
              <p>Không thiên vị bất kỳ quán ăn nào, thuật toán phân phối đều dựa trên sở thích và vị trí thực tế của bạn.</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60">
              <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bảo Mật Quyền Riêng Tư</span>
              </h4>
              <p>Không lưu trữ dữ liệu cá nhân nhạy cảm; vị trí địa lý chỉ dùng phục vụ tìm kiếm quán ngon gần bạn nhất.</p>
            </div>
          </div>
        </section>

        {/* Thông tin liên hệ nhanh & Kêu gọi hành động */}
        <section className="bg-orange-50 border border-orange-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="font-black text-stone-900 text-lg sm:text-xl mb-1.5">
              Bạn có đóng góp ý kiến hoặc muốn hợp tác?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Chúng tôi luôn chào đón các đề xuất món ăn mới, đánh giá trải nghiệm hoặc hợp tác truyền thông cùng các thương hiệu ẩm thực tại Việt Nam.
            </p>
          </div>
          <a
            href="/lien-he"
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey || e.button === 1) return;
              e.preventDefault();
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-all shrink-0 text-center"
          >
            Liên Hệ Với Chúng Tôi
          </a>
        </section>
      </div>
    </article>
  );
};
