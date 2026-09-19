import React from 'react';
import { FileText, CheckCircle2, AlertCircle, ShoppingBag, ShieldAlert, Scale, ArrowRight } from 'lucide-react';
import { TabType } from '../utils/navigation';

interface TermsOfServicePageProps {
  onNavigate: (tab: TabType) => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigate }) => {
  return (
    <article className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-stone-800">
      {/* Header Banner */}
      <header className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200/70">
          <Scale className="w-3.5 h-3.5 text-blue-600" />
          <span>Quy Định & Thỏa Thuận • Hôm Nay Ăn Gì</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight leading-tight mb-4">
          Điều Khoản Sử Dụng
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Chào mừng bạn đến với <strong className="text-stone-900 font-bold">Hôm Nay Ăn Gì (angigio.com)</strong>. Khi truy cập và sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản và quy định được nêu rõ dưới đây.
        </p>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-6 sm:space-y-8">

        {/* Giới thiệu dịch vụ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-blue-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h2>1. Bản Chất Dịch Vụ Của Chúng Tôi</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              <strong>Hôm Nay Ăn Gì</strong> là một nền tảng hỗ trợ ra quyết định ẩm thực độc lập và miễn phí. Chúng tôi cung cấp các công cụ như:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Tarot Ẩm Thực:</strong> Trải nghiệm bốc quẻ món ăn theo chiêm tinh 12 cung hoàng đạo mang tính giải trí và khơi nguồn cảm hứng ăn uống mỗi ngày.</li>
              <li><strong>Vòng Quay Ăn Gì:</strong> Bánh xe chọn món ngẫu nhiên hỗ trợ cá nhân và nhóm giải quyết nhanh tình huống &quot;không biết ăn gì&quot;.</li>
              <li><strong>Lịch Ăn Theo Tuần & Trợ Lý AI:</strong> Công cụ gợi ý thực đơn cân bằng dinh dưỡng, tính toán ngân sách và năng lượng tham khảo.</li>
              <li><strong>Cẩm Nang Ẩm Thực 3 Miền:</strong> Kho tàng thông tin về văn hóa ẩm thực đặc sản Việt Nam và công thức nấu nướng truyền thống.</li>
            </ul>
          </div>
        </section>

        {/* Miễn trừ trách nhiệm về giao hàng & giá cả */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-blue-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h2>2. Tính Năng Đặt Món & Liên Kết Đối Tác Giao Hàng</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              Hôm Nay Ăn Gì <strong className="text-stone-900">không phải là đơn vị chế biến thực phẩm, quán ăn, hay dịch vụ vận chuyển trực tiếp</strong>. Các nút bấm kết nối như <em>ShopeeFood, GrabFood, BeFood, Google Maps</em> đóng vai trò là cầu nối liên kết ngoài nhằm tạo sự tiện lợi tối đa cho thực khách.
            </p>
            <p>
              Mức giá, lượng calo và thực đơn hiển thị trên hệ thống mang tính chất gợi ý và tham khảo. Giá bán thực tế, khuyến mãi, phí giao hàng, thời gian giao và chất lượng món ăn phụ thuộc hoàn toàn vào từng quán ăn và chính sách của các ứng dụng giao nhận tại thời điểm bạn đặt hàng.
            </p>
          </div>
        </section>

        {/* Quyền sở hữu trí tuệ & Điều khoản nghiêm cấm sao chép ý tưởng web */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-blue-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2>3. Quyền Sở Hữu Trí Tuệ & Quy Định Nghiêm Cấm Sao Chép Ý Tưởng</h2>
          </div>
          <div className="space-y-4 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              Toàn bộ nền tảng <strong className="text-stone-900">Hôm Nay Ăn Gì (angigio.com)</strong> bao gồm: ý tưởng sản phẩm, khái niệm trải nghiệm Tarot Ẩm Thực kết hợp cung hoàng đạo, kịch bản bói quẻ & bùa hộ mệnh ẩm thực, thuật toán Vòng quay may mắn, hệ thống phân loại món ăn & cẩm nang ẩm thực 3 miền, nhận diện thương hiệu, giao diện đồ họa (UI/UX), hình ảnh minh họa độc quyền và toàn bộ mã nguồn đều thuộc <strong className="text-stone-900">quyền sở hữu trí tuệ độc quyền của ban sáng lập Hôm Nay Ăn Gì</strong> và được pháp luật bảo vệ.
            </p>
            
            <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200/80 text-amber-900 text-sm sm:text-base space-y-2.5">
              <div className="font-bold flex items-center gap-2 text-amber-950">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Nghiêm cấm mọi hành vi sao chép ý tưởng và đạo nhái sản phẩm:</span>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-amber-900/90 text-sm">
                <li>
                  <strong>Sao chép ý tưởng & mô hình hoạt động:</strong> Nghiêm cấm mọi cá nhân, tổ chức, hoặc doanh nghiệp sao chép nguyên mẫu hoặc mô phỏng lại ý tưởng cốt lõi, cơ chế vận hành độc đáo, cấu trúc tính năng hoặc phong cách thiết kế đặc trưng của website nhằm tạo ra sản phẩm tương tự phục vụ mục đích thương mại hoặc cạnh tranh không lành mạnh.
                </li>
                <li>
                  <strong>Sao chép nội dung & hình ảnh:</strong> Tuyệt đối không được sao chép văn bản mô tả món ăn, bài luận cẩm nang ẩm thực, bộ thẻ quẻ Tarot, lời bình bùa hộ mệnh hay tải về và tái sử dụng hình ảnh món ăn được tối ưu độc quyền trên trang web mà không có sự chấp thuận chính thức bằng văn bản.
                </li>
                <li>
                  <strong>Cào dữ liệu (Web Scraping) & Đảo ngược mã nguồn:</strong> Nghiêm cấm sử dụng các công cụ bot tự động, crawler, script hoặc kỹ thuật đảo ngược mã nguồn (reverse engineering) để trích xuất cơ sở dữ liệu món ăn, thuật toán gợi ý hoặc nhân bản mã nguồn của chúng tôi.
                </li>
              </ul>
              <p className="text-xs text-amber-800/90 pt-1 italic">
                * Bất kỳ hành vi vi phạm nào bị phát hiện sẽ được lập vi bằng, báo cáo gỡ bỏ theo Đạo luật bản quyền kỹ thuật số (DMCA) và chuyển giao cho cơ quan pháp luật có thẩm quyền xử lý theo quy định về sở hữu trí tuệ và cạnh tranh không lành mạnh.
              </p>
            </div>

            <p className="text-stone-600 text-sm">
              Bạn được cấp quyền cá nhân, có giới hạn và không thể chuyển nhượng để truy cập, sử dụng các công cụ trên website phục vụ nhu cầu tra cứu và giải trí ẩm thực cá nhân hoàn toàn miễn phí.
            </p>
          </div>
        </section>

        {/* Trách nhiệm của người dùng */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-blue-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2>4. Trách Nhiệm Của Người Sử Dụng</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>Khi trải nghiệm nền tảng, bạn cam kết:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Không thực hiện bất kỳ hành vi nào gây cản trở, làm quá tải máy chủ hoặc phá hoại tính ổn định của hệ thống.</li>
              <li>Không gửi thư rác, thông tin sai lệch hoặc nội dung vi phạm pháp luật qua biểu mẫu liên hệ hoặc góp ý món ăn.</li>
              <li>Tự chủ động xem xét các khuyến cáo dinh dưỡng đối với các tình trạng sức khỏe, dị ứng thực phẩm hoặc chế độ ăn kiêng cá nhân của mình trước khi quyết định thưởng thức món ăn.</li>
            </ul>
          </div>
        </section>

        {/* Giới hạn trách nhiệm pháp lý */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-blue-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h2>5. Giới Hạn Trách Nhiệm Pháp Lý</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              Dịch vụ được cung cấp theo nguyên tắc &quot;nguyên trạng&quot; (as is) và &quot;sẵn có&quot;. Mặc dù chúng tôi luôn nỗ lực hết mình để đảm bảo hệ thống vận hành liên tục và thông tin món ăn chính xác, Hôm Nay Ăn Gì không cam kết hay bảo đảm dịch vụ hoàn toàn không có lỗi thời điểm hoặc gián đoạn kỹ thuật do đường truyền mạng.
            </p>
            <p>
              Trong mọi trường hợp, Hôm Nay Ăn Gì không chịu trách nhiệm đối với các tranh chấp phát sinh giữa bạn và bên thứ ba (bao gồm quán ăn, tài xế giao hàng hoặc các đơn vị cung cấp dịch vụ giao đồ ăn).
            </p>
          </div>
        </section>

        {/* Thay đổi điều khoản */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-blue-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h2>6. Điều Chỉnh Điều Khoản & Liên Hệ</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              Chúng tôi có quyền sửa đổi các điều khoản này vào bất kỳ lúc nào để phù hợp với định hướng phát triển và pháp luật Việt Nam. Việc bạn tiếp tục sử dụng website sau khi các thay đổi được đăng tải đồng nghĩa với việc bạn đồng ý với các điều khoản sửa đổi đó.
            </p>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về bản Điều khoản sử dụng này, xin vui lòng truy cập trang{' '}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-orange-600 hover:text-orange-700 font-bold underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>Liên Hệ</span>
                <ArrowRight className="w-3.5 h-3.5 inline" />
              </button>{' '}
              để gửi tin nhắn cho ban quản trị.
            </p>
          </div>
        </section>

      </div>

      {/* Schema.org WebPage / TermsOfService Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Điều Khoản Sử Dụng - Hôm Nay Ăn Gì",
            "url": "https://www.angigio.com/dieu-khoan-su-dung",
            "description": "Điều khoản sử dụng dịch vụ Hôm Nay Ăn Gì: Quy định về trải nghiệm gợi ý món ăn, bách khoa ẩm thực, tính năng liên kết đối tác và quyền sở hữu trí tuệ.",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Hôm Nay Ăn Gì",
              "url": "https://www.angigio.com/"
            },
            "inLanguage": "vi-VN"
          })
        }}
      />
    </article>
  );
};
