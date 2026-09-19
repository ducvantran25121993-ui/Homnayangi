import React from 'react';
import { ShieldCheck, Lock, Eye, Server, UserCheck, Bell, ArrowRight } from 'lucide-react';
import { TabType } from '../utils/navigation';

interface PrivacyPolicyPageProps {
  onNavigate: (tab: TabType) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <article className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-stone-800">
      {/* Header Banner */}
      <header className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200/70">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Bảo Mật & Quyền Riêng Tư • Hôm Nay Ăn Gì</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight leading-tight mb-4">
          Chính Sách Bảo Mật
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Chúng tôi coi trọng việc bảo vệ dữ liệu cá nhân và quyền riêng tư của bạn. Bản chính sách này giải thích minh bạch cách thông tin được xử lý khi bạn trải nghiệm nền tảng <strong className="text-stone-900 font-bold">Hôm Nay Ăn Gì (angigio.com)</strong>.
        </p>
      </header>

      {/* Main Sections */}
      <div className="space-y-6 sm:space-y-8">
        
        {/* Cam kết cốt lõi */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-emerald-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h2>1. Nguyên Tắc Bảo Mật Quyền Riêng Tư Cốt Lõi</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              Hôm Nay Ăn Gì được xây dựng với phương châm <strong className="text-stone-900">tối giản thu thập dữ liệu</strong>: Chúng tôi không yêu cầu bạn tạo tài khoản bắt buộc, không bắt nhập mật khẩu, và không bán bất kỳ thông tin cá nhân nào cho bên thứ ba vì bất kỳ mục đích tiếp thị thương mại nào.
            </p>
            <p>
              Toàn bộ trải nghiệm gợi ý món ăn, xoay vòng quay ngẫu nhiên, bốc quẻ Tarot và lên lịch ăn tuần được thiết kế để hoạt động nhanh chóng, mượt mà và tôn trọng sự tự do của người dùng.
            </p>
          </div>
        </section>

        {/* Thông tin chúng tôi thu thập */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-emerald-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h2>2. Thông Tin Được Xử Lý Khi Bạn Sử Dụng</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-stone-900">Vị trí địa lý (Tùy chọn):</strong> Khi bạn bật tính năng tìm quán gần bạn hoặc cho phép định vị GPS, trình duyệt sẽ yêu cầu quyền truy cập tọa độ. Vị trí này chỉ được dùng trong phiên làm việc để xác định Tỉnh/Thành phố hoặc Quận/Huyện nhằm ưu tiên mở danh sách quán ăn gần bạn nhất trên ShopeeFood, GrabFood, BeFood hoặc Google Maps. Bạn có thể tự do thay đổi hoặc xóa vị trí này bất cứ lúc nào qua nút Vị trí trên thanh điều hướng.
              </li>
              <li>
                <strong className="text-stone-900">Dữ liệu lưu cục bộ trên thiết bị của bạn (Local Storage):</strong> Để mang lại sự tiện ích, hệ thống lưu trữ trên trình duyệt của chính bạn các thông tin như: lịch ăn tuần bạn đã lập, danh sách món yêu thích, lịch sử quẻ Tarot trong ngày, và thiết lập vị trí đã chọn. Các dữ liệu này chỉ nằm trên thiết bị cá nhân của bạn.
              </li>
              <li>
                <strong className="text-stone-900">Thông tin bạn chủ động gửi qua biểu mẫu Liên hệ:</strong> Khi bạn gửi góp ý món mới hoặc liên hệ hợp tác, họ tên, email, số điện thoại (nếu có) và nội dung tin nhắn sẽ được chuyển an toàn đến hộp thư quản trị viên để chúng tôi phản hồi lại cho bạn.
              </li>
            </ul>
          </div>
        </section>

        {/* Dịch vụ liên kết và Đối tác thứ ba */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-emerald-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h2>3. Liên Kết Ứng Dụng Đối Tác (ShopeeFood, Grab, BeFood, Maps)</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              Khi bạn bấm chọn đặt món hoặc tìm quán, ứng dụng sẽ chuyển hướng bạn qua liên kết thông minh mở app hoặc website của các nền tảng đối tác giao đồ ăn (ShopeeFood, GrabFood, BeFood) hoặc bản đồ Google Maps.
            </p>
            <p>
              Khi bạn chuyển sang các ứng dụng đối tác này, các hoạt động đặt món, thanh toán, nhập địa chỉ giao nhận của bạn sẽ chịu sự quản lý trực tiếp theo Chính sách bảo mật và Điều khoản riêng của đơn vị đó. Hôm Nay Ăn Gì không trực tiếp thu thập hay lưu trữ thông tin thẻ ngân hàng hoặc thông tin thanh toán của bạn.
            </p>
          </div>
        </section>

        {/* Quyền của bạn đối với dữ liệu */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-emerald-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2>4. Quyền Kiểm Soát Dữ Liệu Của Bạn</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>Bạn có toàn quyền kiểm soát trải nghiệm cá nhân của mình trên Hôm Nay Ăn Gì:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Bạn có thể bật hoặc tắt quyền truy cập định vị bất cứ lúc nào trong phần cài đặt trình duyệt.</li>
              <li>Bạn có thể xóa toàn bộ lịch ăn tuần hoặc lịch sử duyệt món chỉ bằng thao tác xóa bộ nhớ cache/cookies của trình duyệt.</li>
              <li>Nếu bạn có bất kỳ thắc mắc hoặc yêu cầu kiểm tra dữ liệu liên hệ đã gửi, bạn có thể liên hệ ngay với chúng tôi qua trang Liên Hệ.</li>
            </ul>
          </div>
        </section>

        {/* Cập nhật chính sách */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3 text-emerald-600 font-extrabold text-lg sm:text-xl mb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <h2>5. Cập Nhật Và Liên Hệ</h2>
          </div>
          <div className="space-y-3.5 text-stone-600 leading-relaxed text-sm sm:text-base">
            <p>
              Chính sách bảo mật này có thể được điều chỉnh theo thời gian để phản ánh các cải tiến tính năng mới hoặc tuân thủ các quy định pháp luật hiện hành. Mọi thay đổi sẽ được công bố minh bạch tại trang này cùng ngày cập nhật.
            </p>
            <p>
              Mọi thắc mắc hoặc đóng góp về bảo mật, xin vui lòng gửi thư cho chúng tôi tại trang{' '}
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-orange-600 hover:text-orange-700 font-bold underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>Liên Hệ</span>
                <ArrowRight className="w-3.5 h-3.5 inline" />
              </button>
              .
            </p>
          </div>
        </section>

      </div>

      {/* Schema.org WebPage / PrivacyPolicy Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Chính Sách Bảo Mật - Hôm Nay Ăn Gì",
            "url": "https://www.angigio.com/chinh-sach-bao-mat",
            "description": "Chính sách bảo mật minh bạch của Hôm Nay Ăn Gì: Tối giản thu thập dữ liệu, tôn trọng quyền riêng tư, an toàn khi trải nghiệm gợi ý ẩm thực và liên kết đặt món.",
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
