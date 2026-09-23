import React from 'react';
import {
  UtensilsCrossed,
  Sparkles,
  Compass,
  Disc,
  ShieldCheck,
  Heart,
  CheckCircle2,
  ArrowRight,
  Flame,
  BookOpen,
  ChefHat,
  Send,
} from 'lucide-react';
import { TabType } from '../utils/navigation';

interface AboutPageProps {
  onNavigate: (tab: TabType) => void;
  onOpenContact?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://angigio.com/gioi-thieu#webpage',
        url: 'https://angigio.com/gioi-thieu',
        name: 'Giới Thiệu Hôm Nay Ăn Gì - Nền Tảng Gợi Ý Ẩm Thực Thông Minh',
        headline: 'Giới Thiệu Hôm Nay Ăn Gì - Nền Tảng Gợi Ý Ẩm Thực Thông Minh',
        description:
          'Khám phá Hôm Nay Ăn Gì (Angigio.com) - Nền tảng gợi ý món ngon thông minh qua Tarot, vòng quay và đầu bếp AI. Chấm dứt nỗi lo ăn gì mỗi ngày chỉ trong 3 giây!',
        inLanguage: 'vi-VN',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://angigio.com/#website',
          name: 'Hôm Nay Ăn Gì',
          url: 'https://angigio.com',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Trang chủ',
              item: 'https://angigio.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Giới thiệu',
              item: 'https://angigio.com/gioi-thieu',
            },
          ],
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://angigio.com/#organization',
        name: 'Hôm Nay Ăn Gì',
        url: 'https://angigio.com',
        logo: 'https://angigio.com/icons/icon-512x512.png',
        slogan: 'Gợi ý ẩm thực thông minh, chốt món nhanh gọn',
        knowsAbout: [
          'Ẩm thực Việt Nam',
          'Món ngon 3 miền Bắc Trung Nam',
          'Gợi ý món ăn hàng ngày',
          'Vòng quay chọn món ăn gì',
          'Tarot ẩm thực',
          'Công thức nấu ăn ngon',
          'Gợi ý ăn uống dân văn phòng',
        ],
      },
    ],
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    tab: TabType
  ) => {
    if (e.ctrlKey || e.metaKey || e.button === 1) return;
    e.preventDefault();
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article
      itemScope
      itemType="https://schema.org/AboutPage"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-stone-800"
    >
      {/* Schema.org Structured Data for Rich Search Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* 1. Hero Header */}
      <header className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
          <span>Về Chúng Tôi • Người Bạn Đồng Hành Bữa Ăn Ngon</span>
        </div>

        <h1
          itemProp="headline"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-stone-900 tracking-tight leading-tight sm:leading-snug mb-5"
        >
          Giới Thiệu Hôm Nay Ăn Gì -{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">
            Nền Tảng Gợi Ý Ẩm Thực Thông Minh
          </span>
        </h1>

        <p
          itemProp="description"
          className="max-w-3xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed font-normal"
        >
          Chúng tôi ra đời từ một sứ mệnh giản dị: <strong className="text-stone-900 font-bold">Chấm dứt nỗi đắn đo &quot;Trưa nay ăn gì, tối nay ăn gì?&quot;</strong> của hàng triệu người Việt mỗi ngày. Biến từng bữa ăn trở thành nguồn cảm hứng vị giác bất tận, nhẹ nhàng và tràn đầy niềm vui!
        </p>
      </header>

      <div className="space-y-12 sm:space-y-16">
        {/* 2. Câu Chuyện Khởi Nguồn - Thấu Hiểu & Gần Gũi */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-orange-100/40 via-amber-50/20 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

          <div className="flex items-center gap-3 text-orange-600 font-extrabold text-xl sm:text-2xl mb-6">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 shrink-0">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h2>Câu Chuyện Khởi Nguồn: Từ Điệp Khúc &quot;Ăn Gì Cũng Được&quot; Đến Hôm Nay Ăn Gì</h2>
          </div>

          <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
            <p className="text-base sm:text-lg font-medium text-stone-800 italic border-l-4 border-orange-500 pl-4 py-1 bg-orange-50/50 rounded-r-xl">
              &quot;Trưa nay ăn gì cả nhà ơi?&quot; — &quot;Gì cũng được!&quot;... nhưng gợi ý cơm thì ngấy, phở thì nóng, bún thì ngại mùi, và thế là hết nửa tiếng nghỉ trưa quý giá vẫn chưa chốt được món.
            </p>
            <p>
              Bạn có nhận ra rằng mỗi ngày, chúng ta phải đưa ra hàng trăm quyết định mệt mỏi trong công việc, học tập, nhưng đôi khi áp lực lớn nhất vào lúc 11h30 trưa hay 6h30 tối lại chỉ gói gọn trong ba chữ: <strong className="text-orange-600 font-bold">Hôm nay ăn gì?</strong>
            </p>
            <p>
              Theo khảo sát hành vi đời sống, trung bình một người Việt mất từ <strong>15 đến 30 phút mỗi ngày</strong> chỉ để lướt qua hàng chục trang mạng xã hội, app giao thức ăn trong trạng thái bụng đói nhưng đầu óc trống rỗng. Sự phân vân kéo dài này không chỉ gây mất thời gian mà còn làm vơi đi cảm giác ngon miệng nguyên bản của bữa ăn.
            </p>
            <p>
              Đó chính là lý do <strong>Hôm Nay Ăn Gì (Angigio.com)</strong> ra đời. Chúng tôi không phải là một danh bạ quán ăn khô cứng, mà là <span className="font-semibold text-stone-900">người bạn tri kỷ của chiếc bụng đói</span>. Chúng tôi gom góp những tinh hoa vị giác từ khắp mọi miền Tổ quốc, kết hợp cùng các công cụ công nghệ thông minh, hài hước và độc đáo để bạn tìm ra chân ái ẩm thực chỉ trong 3 giây.
            </p>
          </div>
        </section>

        {/* 3. Con Số Biết Nói (Stats Section) */}
        <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl border border-stone-700/60">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-semibold mb-3">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Dấu Ấn Vị Giác Đồng Hành</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Những Con Số Thay Lời Khẳng Định
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-2">
              Chúng tôi tự hào là điểm dừng chân mỗi ngày của hàng chục nghìn thực thần khắp mọi nẻo đường
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 hover:border-orange-500/50 transition-colors">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-2">
                200+
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-200">Món Ngon Chọn Lọc</div>
              <div className="text-xs text-stone-400 mt-1">Chuẩn vị 3 miền Bắc - Trung - Nam</div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 hover:border-orange-500/50 transition-colors">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 mb-2">
                3 Giây
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-200">Quyết Định Bữa Ăn</div>
              <div className="text-xs text-stone-400 mt-1">Tiết kiệm 90% thời gian phân vân</div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 hover:border-orange-500/50 transition-colors">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-2">
                100.000+
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-200">Lượt Chốt Món / Tháng</div>
              <div className="text-xs text-stone-400 mt-1">Được cộng đồng tin yêu chia sẻ</div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 hover:border-orange-500/50 transition-colors">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-300 mb-2">
                100%
              </div>
              <div className="text-sm sm:text-base font-bold text-stone-200">Miễn Phí Vì Cộng Đồng</div>
              <div className="text-xs text-stone-400 mt-1">Không thu phí, không ép tài khoản</div>
            </div>
          </div>
        </section>

        {/* 4. Hệ Sinh Thái Công Nghệ Trải Nghiệm Độc Đáo */}
        <section>
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Giải Pháp Vượt Trội</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
              4 Công Cụ Độc Đáo Giúp Bạn Chốt Món Trong Tích Tắc
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              Sự giao thoa hoàn hảo giữa cảm hứng chiêm tinh học, xác suất ngẫu nhiên và trí tuệ nhân tạo hiện đại
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Tarot Ẩm Thực */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col justify-between hover:border-purple-300 hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2 group-hover:text-purple-700 transition-colors">
                  Tarot Ẩm Thực Chiêm Tinh
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Lần đầu tiên tại Việt Nam, huyền học Tarot kết hợp cùng văn hóa ẩm thực theo 12 cung hoàng đạo và 4 cõi: Thực Cảnh, Đồ Miên, Thủy Dược, Túy Vị. Mỗi lá bài là một thông điệp vị giác định mệnh kèm lá bùa may mắn bình an.
                </p>
              </div>
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, 'tarot')}
                title="Bốc bài Tarot ẩm thực hôm nay"
                className="mt-6 inline-flex items-center justify-between text-xs font-bold text-purple-700 hover:text-purple-800 cursor-pointer pt-3 border-t border-stone-100 group-hover:text-purple-900"
              >
                <span>Trải bài Tarot ngay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 2. Vòng Quay May Mắn */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col justify-between hover:border-orange-300 hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Disc className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2 group-hover:text-orange-700 transition-colors">
                  Vòng Quay May Mắn Ăn Gì
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Vòng quay vật lý chuẩn xác, công bằng 100%, cứu cánh vĩ đại cho hội bạn bè và dân văn phòng giờ trưa. Chỉ cần bấm quay, định mệnh ẩm thực sẽ được quyết định công tâm trong đúng 3 giây không ai cãi được!
                </p>
              </div>
              <a
                href="/vong-quay"
                onClick={(e) => handleLinkClick(e, 'wheel')}
                title="Quay vòng quay may mắn ăn gì"
                className="mt-6 inline-flex items-center justify-between text-xs font-bold text-orange-700 hover:text-orange-800 cursor-pointer pt-3 border-t border-stone-100 group-hover:text-orange-900"
              >
                <span>Quay vòng quay ăn gì</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 3. Đầu Bếp AI */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col justify-between hover:border-emerald-300 hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ChefHat className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">
                  Trợ Lý Đầu Bếp AI Cá Nhân
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Đầu bếp ảo thấu hiểu tâm can: Lắng nghe tâm trạng buồn vui, thời tiết se lạnh hay nắng gắt, số tiền trong ví (20k hay 100k) và chế độ ăn riêng (Eat Clean, giảm cân, ăn chay) để đưa ra thực đơn hoàn mỹ nhất.
                </p>
              </div>
              <a
                href="/ai-goi-y-mon-an"
                onClick={(e) => handleLinkClick(e, 'ai')}
                title="Hỏi trợ lý AI gợi ý món ăn"
                className="mt-6 inline-flex items-center justify-between text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer pt-3 border-t border-stone-100 group-hover:text-emerald-900"
              >
                <span>Tâm sự cùng đầu bếp AI</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 4. Từ Điển Món Ngon & Đặt Món */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col justify-between hover:border-red-300 hover:shadow-lg transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 text-lg mb-2 group-hover:text-red-700 transition-colors">
                  Từ Điển Món & Bí Kíp Gia Truyền
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Kho tàng hơn 200+ món ngon Bắc - Trung - Nam kèm công thức nấu nướng tỉ mỉ, mẹo vặt đầu bếp độc quyền và nút gọi món trực tiếp qua ShopeeFood, GrabFood hoặc tìm quán gần bạn trên bản đồ.
                </p>
              </div>
              <a
                href="/mon-ngon"
                onClick={(e) => handleLinkClick(e, 'catalog')}
                title="Khám phá thực đơn 200+ món ngon"
                className="mt-6 inline-flex items-center justify-between text-xs font-bold text-red-700 hover:text-red-800 cursor-pointer pt-3 border-t border-stone-100 group-hover:text-red-900"
              >
                <span>Khám phá thực đơn</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* 5. Triết Lý Phát Triển & Cam Kết Vàng */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/90 shadow-sm">
          <div className="flex items-center gap-3 font-extrabold text-xl sm:text-2xl text-stone-900 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2>Triết Lý Hoạt Động & 4 Cam Kết Vàng</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base text-stone-600">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 hover:bg-orange-50/40 transition-colors">
              <div className="flex items-center gap-2.5 font-bold text-stone-900 mb-2 text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>1. Tôn Vinh Văn Hóa Ẩm Thực Bản Địa</span>
              </div>
              <p className="leading-relaxed text-stone-600">
                Từ tô Phở bò Hà Nội nghi ngút khói, bún bò Huế cay nồng thơm lừng ruốc sả, đĩa cơm tấm Sài Gòn sườn bì chả mỡ hành giòn rụm đến những gánh bánh tráng trộn vỉa hè... Chúng tôi luôn nỗ lực gìn giữ và lan tỏa linh hồn ẩm thực phong phú của người Việt.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 hover:bg-orange-50/40 transition-colors">
              <div className="flex items-center gap-2.5 font-bold text-stone-900 mb-2 text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>2. Khách Quan & Tuyệt Đối Không Thiên Vị</span>
              </div>
              <p className="leading-relaxed text-stone-600">
                Thuật toán quay số và gợi ý của chúng tôi hoàn toàn ngẫu nhiên và trung thực. Chúng tôi không bao giờ ưu tiên hiển thị món ăn hay quán xá kém chất lượng chỉ vì tiền quảng cáo. Sự hài lòng và chiếc bụng vui vẻ của bạn là ưu tiên số một.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 hover:bg-orange-50/40 transition-colors">
              <div className="flex items-center gap-2.5 font-bold text-stone-900 mb-2 text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>3. Trải Nghiệm Nhẹ Nhàng, Không Phiền Toái</span>
              </div>
              <p className="leading-relaxed text-stone-600">
                Không bắt buộc tạo tài khoản rườm rà, không spam thông báo rác, không thu thập dữ liệu cá nhân nhạy cảm. Bạn chỉ việc mở trang web lên, bấm chọn và tận hưởng bữa ăn ngay lập tức.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 hover:bg-orange-50/40 transition-colors">
              <div className="flex items-center gap-2.5 font-bold text-stone-900 mb-2 text-base sm:text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>4. Đồng Hành Cùng Sinh Viên & Dân Văn Phòng</span>
              </div>
              <p className="leading-relaxed text-stone-600">
                Chúng tôi luôn thiết kế các bộ lọc ngân sách tiết kiệm (bữa ăn dưới 35k), các combo ăn xế chia tiền dễ dàng cho nhóm đông người, giúp mọi người vừa ăn ngon miệng vừa nhẹ gánh chi tiêu mỗi tháng.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Thông Tin Liên Hệ & Gửi Gắm Tình Cảm (CTA Section) */}
        <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-current text-white" />
              <span>Gửi Gắm Yêu Thương</span>
            </div>
            <h3 className="font-black text-2xl sm:text-3xl text-white mb-3">
              Cùng Chúng Tôi Lan Tỏa Tình Yêu Ẩm Thực Việt
            </h3>
            <p className="text-sm sm:text-base text-orange-50 leading-relaxed">
              Bạn có công thức nấu ăn gia truyền muốn chia sẻ? Bạn muốn bổ sung quán ruột gần nhà vào danh bạ hay có ý tưởng cải tiến tính năng? Đừng ngần ngại nhắn gửi cho chúng mình nhé, mỗi lời nhắn từ bạn đều là động lực vô giá!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="/lien-he"
              onClick={(e) => handleLinkClick(e, 'contact')}
              title="Liên hệ và đóng góp ý kiến"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-black text-sm shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Liên Hệ & Góp Ý</span>
            </a>

            <a
              href="/vong-quay"
              onClick={(e) => handleLinkClick(e, 'wheel')}
              title="Chốt món ăn ngay bằng vòng quay"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-orange-700/60 hover:bg-orange-700/80 text-white border border-white/30 font-bold text-sm transition-all text-center flex items-center justify-center gap-2"
            >
              <Disc className="w-4 h-4" />
              <span>Chốt Món Ngay</span>
            </a>
          </div>
        </section>
      </div>
    </article>
  );
};
