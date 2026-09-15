import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Info,
  Mail,
  Phone,
  MapPin,
  UtensilsCrossed,
  Sparkles,
  ShieldCheck,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveContactMessage } from '../utils/contactStorage';

export type AboutContactTab = 'about' | 'contact';

interface AboutContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: AboutContactTab;
}

export const AboutContactModal: React.FC<AboutContactModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'about',
}) => {
  const [activeTab, setActiveTab] = useState<AboutContactTab>(initialTab);
  const [mounted, setMounted] = useState(false);

  // Contact form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Góp ý / Hợp tác ẩm thực');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setIsSubmitted(false);
    }
  }, [isOpen, initialTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !message.trim()) return;

    saveContactMessage({
      fullName: fullName.trim(),
      email: email.trim() || '',
      phone: phone.trim() || undefined,
      subject,
      message: message.trim(),
    });

    setIsSubmitted(true);
    setTimeout(() => {
      // Clear form
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.18 }}
          className="relative z-10 w-full max-w-lg sm:max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200/80 overflow-hidden text-stone-900 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 via-white to-orange-50/40 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                {activeTab === 'about' ? (
                  <Info className="w-4 h-4" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('about')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'about'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Giới Thiệu
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'contact'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Liên Hệ
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="Đóng"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm text-stone-600">
            {activeTab === 'about' ? (
              <div className="space-y-4">
                {/* Brand overview card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 border border-orange-100/80">
                  <div className="flex items-center gap-2 text-orange-600 font-extrabold text-base mb-1.5">
                    <UtensilsCrossed className="w-5 h-5" />
                    <span>Hôm Nay Ăn Gì? (Angigio.com)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    Nền tảng ẩm thực thông minh hàng đầu Việt Nam — nơi giải quyết triệt để câu hỏi kinh điển <strong className="text-orange-700 font-bold">&quot;Hôm nay ăn gì?&quot;</strong> chỉ trong vài giây thông qua công nghệ Tarot chiêm tinh ẩm thực, vòng quay ngẫu nhiên và trí tuệ nhân tạo AI.
                  </p>
                </div>

                {/* Core values */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/70">
                    <div className="flex items-center gap-2 font-bold text-stone-900 text-xs sm:text-sm mb-1">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span>Tarot Ẩm Thực Độc Bản</span>
                    </div>
                    <p className="text-xs text-stone-500 leading-normal">
                      Trải bài chiêm tinh 12 cung hoàng đạo, kết hợp 4 cõi Thực Cảnh, Đồ Miên, Thủy Dược, Túy Vị với linh ấn sấm truyền đặc sắc.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/70">
                    <div className="flex items-center gap-2 font-bold text-stone-900 text-xs sm:text-sm mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Thực Đơn 160+ Món Chuẩn Vị</span>
                    </div>
                    <p className="text-xs text-stone-500 leading-normal">
                      Tuyển tập tinh hoa ẩm thực 3 miền Bắc - Trung - Nam, hỗ trợ kết nối định vị tìm quán ngon và đặt hàng ShopeeFood, GrabFood, BeFood.
                    </p>
                  </div>
                </div>

                {/* Sứ mệnh */}
                <div className="pt-2 border-t border-stone-100 text-xs text-stone-500 space-y-1.5 leading-relaxed">
                  <p>
                    <strong className="text-stone-800">Sứ mệnh của chúng tôi:</strong> Tôn vinh văn hóa ẩm thực truyền thống Việt Nam, mang lại niềm vui khám phá hương vị mỗi ngày cho hàng triệu thực khách khắp mọi miền.
                  </p>
                  <p>
                    Website cam kết trải nghiệm người dùng hoàn toàn miễn phí, mượt mà, bảo mật và thân thiện trên cả điện thoại di động lẫn máy tính.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Contact channels card */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col items-center text-center">
                    <Mail className="w-4 h-4 text-orange-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800">Email</span>
                    <a
                      href="mailto:tranduc474@gmail.com"
                      className="text-[11px] text-stone-500 hover:text-orange-600 truncate max-w-full"
                    >
                      tranduc474@gmail.com
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col items-center text-center">
                    <Phone className="w-4 h-4 text-emerald-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800">Hotline / Zalo</span>
                    <a
                      href="tel:0385522474"
                      className="text-[11px] text-stone-500 hover:text-emerald-600 font-medium"
                    >
                      038 5522 474
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col items-center text-center">
                    <MapPin className="w-4 h-4 text-blue-600 mb-1" />
                    <span className="text-[11px] font-bold text-stone-800">Phạm vi</span>
                    <span className="text-[11px] text-stone-500">Toàn quốc (63 tỉnh thành)</span>
                  </div>
                </div>

                {/* Contact form */}
                {isSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center py-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-emerald-900">
                      Cảm ơn bạn đã gửi liên hệ!
                    </h4>
                    <p className="text-xs text-emerald-700 mt-1">
                      Đội ngũ Hôm Nay Ăn Gì sẽ phản hồi qua email của bạn trong thời gian sớm nhất.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ví dụ: Nguyễn Văn A"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Email nhận phản hồi
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Số điện thoại (Zalo)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09xx xxx xxx"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">
                          Chủ đề liên hệ
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white text-stone-800"
                        >
                          <option value="Góp ý / Hợp tác ẩm thực">Góp ý món mới & Hợp tác ẩm thực</option>
                          <option value="Báo lỗi hoặc đề xuất cải tiến">Báo lỗi hoặc đề xuất cải tiến</option>
                          <option value="Hợp tác quảng cáo & Nhà hàng">Hợp tác quảng cáo nhà hàng / quán ăn</option>
                          <option value="Khác">Chủ đề khác</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        Nội dung tin nhắn <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nhập nội dung chia sẻ, góp ý hoặc yêu cầu hợp tác của bạn..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi Tin Nhắn Cho Chúng Tôi</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
