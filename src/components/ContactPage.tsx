import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Building2,
} from 'lucide-react';
import { TabType } from '../utils/navigation';
import { saveContactMessage } from '../utils/contactStorage';

interface ContactPageProps {
  onNavigate: (tab: TabType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Góp ý món mới & Cải tiến');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !message.trim()) return;

    // Save message to storage
    saveContactMessage({
      fullName: fullName.trim(),
      email: email.trim() || '',
      phone: phone.trim() || undefined,
      subject,
      message: message.trim(),
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4500);
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-stone-800">
      {/* Header */}
      <header className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/70 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-200/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kênh Kết Nối Trực Tiếp</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-black text-stone-900 tracking-tight leading-tight mb-4 md:whitespace-nowrap">
          Liên Hệ Đội Ngũ{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">
            Hôm Nay Ăn Gì (Angigio.com)
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 leading-relaxed">
          Bạn có đề xuất món ăn mới, muốn hợp tác truyền thông quán ăn, hay cần hỗ trợ kỹ thuật? Đừng ngần ngại để lại lời nhắn, chúng tôi luôn sẵn sàng lắng nghe bạn!
        </p>
      </header>

      {/* Grid: 2 Columns (Info & Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Email & Hotline */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-4">
            <h2 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-600" />
              <span>Thông Tin Liên Lạc Trực Tiếp</span>
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-orange-50/60 border border-orange-100/80">
                <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Hòm thư điện tử
                  </span>
                  <a
                    href="mailto:tranduc474@gmail.com"
                    className="font-bold text-stone-900 hover:text-orange-600 transition-colors"
                  >
                    tranduc474@gmail.com
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Tiếp nhận thư góp ý, hợp tác & đối tác nhà hàng 24/7
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100/80">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Hotline & Zalo Hỗ Trợ
                  </span>
                  <a
                    href="tel:0385522474"
                    className="font-bold text-stone-900 hover:text-emerald-600 transition-colors"
                  >
                    038 5522 474
                  </a>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Hỗ trợ nhanh trong giờ hành chính (8h00 - 18h00)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50/60 border border-blue-100/80">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                    Thời gian phản hồi
                  </span>
                  <span className="font-bold text-stone-900">
                    Trong vòng 2 - 4 giờ làm việc
                  </span>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Từ Thứ Hai đến Chủ Nhật hàng tuần
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Khu vực hoạt động */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs space-y-3">
            <h2 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-600" />
              <span>Phạm Vi & Khu Vực Hoạt Động</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-stone-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-800">Phạm vi phủ sóng:</strong> Toàn quốc (Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Cần Thơ và 63 tỉnh thành).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Partnership Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-black text-stone-900 mb-1">
                Gửi Lời Nhắn Trực Tuyến
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Vui lòng điền thông tin bên dưới, chuyên viên hỗ trợ của chúng tôi sẽ liên hệ lại với bạn sớm nhất.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-base sm:text-lg font-bold text-emerald-900">
                  Gửi Tin Nhắn Thành Công!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700 mt-2 max-w-md mx-auto leading-relaxed">
                  Cảm ơn bạn đã quan tâm và liên hệ. Chúng tôi đã nhận được thông tin và sẽ phản hồi {email ? <>qua email <span className="font-bold underline">{email}</span></> : (phone ? <>qua Zalo/SĐT <span className="font-bold underline">{phone}</span></> : 'cho bạn')} trong thời gian sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Họ và tên của bạn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn An"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Địa chỉ Email tiếp nhận
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Số điện thoại (Zalo)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Chủ đề liên hệ
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white text-stone-800"
                    >
                      <option value="Góp ý món mới & Cải tiến">Góp ý món mới & Cải tiến tính năng</option>
                      <option value="Đặt suất xuất hiện: Quán Ngon Đề Xuất (Theo Món)">Đặt suất xuất hiện: Quán Ngon Đề Xuất (Theo Món)</option>
                      <option value="Hợp tác quảng cáo nhà hàng / quán ăn">Hợp tác quảng cáo nhà hàng / quán ăn</option>
                      <option value="Hợp tác đối tác giao đồ ăn">Hợp tác đối tác giao đồ ăn (ShopeeFood, Grab, Be)</option>
                      <option value="Báo cáo lỗi kỹ thuật hoặc nội dung">Báo cáo lỗi kỹ thuật hoặc nội dung</option>
                      <option value="Chủ đề khác">Chủ đề khác</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Nội dung chi tiết <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập nội dung chia sẻ, góp ý, tên món ăn muốn bổ sung hoặc yêu cầu hợp tác chi tiết của bạn tại đây..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Thông Điệp Ngay</span>
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2">
                    Thông tin của bạn được cam kết bảo mật tuyệt đối theo chính sách quyền riêng tư.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
