import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, BookOpen } from 'lucide-react';
import { TabType } from '../utils/navigation';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<TabType, { title: string; desc: string; faqs: FaqItem[] }> = {
  tarot: {
    title: 'Tarot Ẩm Thực: Khám Phá Quẻ Bói Món Ăn Hôm Nay',
    desc: 'Băn khoăn "Hôm nay ăn gì?", hãy để bài Tarot chiêm tinh ẩm thực 12 cung hoàng đạo khai mở thông điệp vị giác cho bạn. Không đơn thuần là giải trí, mỗi quẻ bài liên kết hài hòa giữa cung hoàng đạo, ngũ hành ẩm thực và gợi ý quán ngon chuẩn vị gần bạn.',
    faqs: [
      {
        question: 'Tarot Ẩm Thực hoạt động như thế nào?',
        answer: 'Hệ thống kết hợp biểu tượng 10 Đại Khái Niệm Tarot (The Magician, The Empress, The Sun...) với 12 Cung Hoàng Đạo và thuật toán chống trùng lặp, giúp bạn bốc được món ăn độc nhất vô nhị phù hợp với năng lượng ngày mới.',
      },
      {
        question: 'Làm sao để đặt món trúng quẻ Tarot?',
        answer: 'Sau khi lật bài Tarot, bạn chỉ cần bấm vào nút đặt món của ShopeeFood, GrabFood hoặc BeFood để hệ thống tự động tìm quán ngon chuẩn vị gần vị trí của bạn với nhiều mã giảm giá hấp dẫn.',
      },
      {
        question: 'Lá bùa hộ mệnh ẩm thực có tác dụng gì?',
        answer: 'Sau khi mở quẻ, bạn có thể tải lá bùa may mắn với số seri độc bản về máy điện thoại để lưu giữ tài lộc và chia sẻ cùng bạn bè trên mạng xã hội.',
      },
    ],
  },
  wheel: {
    title: 'Vòng Quay Ăn Gì: Quyết Định Bữa Ăn Trong 3 Giây',
    desc: 'Giải pháp hoàn hảo cho hội bạn thân hoặc dân văn phòng mỗi khi đến giờ trưa mà không ai biết nên ăn gì. Vòng quay ngẫu nhiên tích hợp đầy đủ các nhóm món ăn phổ biến từ cơm, bún, phở đến trà sữa, ăn vặt.',
    faqs: [
      {
        question: 'Vòng quay ăn gì có thực sự ngẫu nhiên không?',
        answer: 'Hoàn toàn ngẫu nhiên và công bằng 100%! Vòng quay sử dụng thuật toán vật lý với lực ma sát giảm tốc tự nhiên, mang lại cảm giác hồi hộp và minh bạch cho mọi lần quay.',
      },
      {
        question: 'Tôi có thể tự thêm món ăn yêu thích vào vòng quay không?',
        answer: 'Có! Bạn có thể dễ dàng thêm bớt món ăn, tùy chỉnh danh sách món theo khẩu vị cá nhân hoặc chọn nhanh các chủ đề có sẵn (Healthy, Cơm trưa, Đồ nước, Ăn vặt).',
      },
      {
        question: 'Sau khi quay trúng món, làm sao để tìm quán bán?',
        answer: 'Món trúng thưởng sẽ hiển thị kèm nút đặt món trực tiếp qua các ứng dụng giao thức ăn hàng đầu như ShopeeFood, GrabFood và BeFood kèm định vị khu vực của bạn.',
      },
    ],
  },
  ai: {
    title: 'Trợ Lý AI Gợi Ý Món Ăn: Đầu Bếp Ảo Thông Minh',
    desc: 'Ứng dụng mô hình AI Gemini tiên tiến để lắng nghe nhu cầu của bạn. Cho dù bạn đang buồn chán cần món giải tỏa, ăn theo chế độ giảm cân, hay trời đang mưa lạnh cần nồi lẩu ấm bụng, AI đều đưa ra thực đơn hoàn hảo nhất.',
    faqs: [
      {
        question: 'AI gợi ý món dựa trên những yếu tố nào?',
        answer: 'Trợ lý AI phân tích đa chiều: Bữa ăn trong ngày (sáng/trưa/tối), mức ngân sách dự kiến, thời tiết thực tế, tâm trạng hiện tại và chế độ ăn kiêng (eat clean, chay, low-carb).',
      },
      {
        question: 'Món ăn gợi ý có dễ đặt ship không?',
        answer: 'Tất cả gợi ý từ AI đều là những món ăn phổ biến, quen thuộc và có mặt trên khắp các ứng dụng giao hàng tại Việt Nam, đảm bảo bạn tìm thấy quán phục vụ chỉ trong vài giây.',
      },
      {
        question: 'Trợ lý AI gợi ý món ăn có miễn phí không?',
        answer: 'Hoàn toàn miễn phí 100%! Bạn có thể trò chuyện và yêu cầu gợi ý thực đơn không giới hạn số lần mỗi ngày.',
      },
    ],
  },
  catalog: {
    title: 'Thực Đơn Món Ngon: Bách Khoa Toàn Thư Ẩm Thực Việt',
    desc: 'Tuyển tập hơn 160 món ăn đặc sản tiêu biểu trải dài từ Bắc chí Nam. Phân loại khoa học theo món nước, cơm xôi, đồ nướng, đồ cuốn, món chay và tráng miệng giúp bạn khám phá thế giới ẩm thực phong phú.',
    faqs: [
      {
        question: 'Danh mục món ăn có đầy đủ thông tin dinh dưỡng không?',
        answer: 'Mỗi món ăn đều cung cấp thông tin chi tiết về mức calo ước tính, khoảng giá trung bình, nguyên liệu đặc trưng và các món ăn kèm lý tưởng.',
      },
      {
        question: 'Làm thế nào để tìm món ăn theo khu vực quận/huyện của tôi?',
        answer: 'Bạn chỉ cần chọn vị trí của mình (Hà Nội, TP.HCM, Đà Nẵng...) ở góc trên, hệ thống sẽ tự động tối ưu đường dẫn tìm quán ăn gần nhất tương ứng với vị trí đó.',
      },
    ],
  },
};

export const SeoContentFaq: React.FC<{ activeTab: TabType }> = ({ activeTab }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const data = FAQ_DATA[activeTab] || FAQ_DATA.tarot;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-label="Nội dung giới thiệu & Câu hỏi thường gặp" className="w-full max-w-5xl mx-auto px-4 mt-12 mb-6">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10">
        
        {/* Editorial Content Section */}
        <div className="mb-8 pb-8 border-b border-stone-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" />
            CẨM NANG ẨM THỰC CHUẨN VỊ
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3 tracking-tight">
            {data.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {data.desc}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <HelpCircle className="w-5 h-5 text-orange-600" />
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              Câu Hỏi Thường Gặp (FAQ)
            </h3>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200/80 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between text-left gap-4 bg-stone-50/70 hover:bg-stone-100/80 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-stone-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-orange-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-white text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
