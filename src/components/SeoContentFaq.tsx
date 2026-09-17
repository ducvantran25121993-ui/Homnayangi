import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  BookOpen,
  Clock,
  Coins,
  ShieldCheck,
  HeartPulse,
  Utensils,
  CheckCircle2,
  Flame,
  Award,
  CalendarDays,
  ShoppingBag,
  Share2,
  ArrowRight,
  Compass,
  Wand2,
  Moon,
  Sun,
  Layers,
  Zap,
  Users,
  Target,
  Lightbulb,
  RotateCcw,
  Bot,
  BrainCircuit,
  Cpu,
  CloudSun,
  MapPin,
  MessageSquare,
  Check,
  X,
  Smile,
  ThermometerSun,
  Sliders
} from 'lucide-react';
import { TabType } from '../utils/navigation';

interface FaqItem {
  question: string;
  answer: string;
}

const COMMON_FAQ_DATA: Record<
  string,
  {
    title: string;
    badge: string;
    desc: string;
    faqs: FaqItem[];
  }
> = {
  tarot: {
    badge: 'CHIÊM TINH VỊ GIÁC',
    title: 'Tarot Ẩm Thực: Khám Phá Quẻ Bói Món Ăn Hôm Nay',
    desc: 'Băn khoăn "Hôm nay ăn gì?", hãy để bài Tarot chiêm tinh ẩm thực 12 cung hoàng đạo khai mở thông điệp vị giác cho bạn. Không đơn thuần là giải trí, mỗi quẻ bài liên kết hài hòa giữa cung hoàng đạo, ngũ hành ẩm thực và gợi ý quán ngon chuẩn vị gần bạn.',
    faqs: [
      {
        question: 'Tarot Ẩm Thực hoạt động như thế nào?',
        answer:
          'Hệ thống kết hợp biểu tượng 10 Đại Khái Niệm Tarot (The Magician, The Empress, The Sun...) với 12 Cung Hoàng Đạo và thuật toán chống trùng lặp, giúp bạn bốc được món ăn độc nhất vô nhị phù hợp với năng lượng ngày mới.',
      },
      {
        question: 'Làm sao để đặt món trúng quẻ Tarot?',
        answer:
          'Sau khi lật bài Tarot, bạn chỉ cần bấm vào nút đặt món của ShopeeFood, GrabFood hoặc BeFood để hệ thống tự động tìm quán ngon chuẩn vị gần vị trí của bạn với nhiều mã giảm giá hấp dẫn.',
      },
      {
        question: 'Lá bùa hộ mệnh ẩm thực có tác dụng gì?',
        answer:
          'Sau khi mở quẻ, bạn có thể tải lá bùa may mắn với số seri độc bản về máy điện thoại để lưu giữ tài lộc và chia sẻ cùng bạn bè trên mạng xã hội.',
      },
    ],
  },
  wheel: {
    badge: 'QUYẾT ĐỊNH NHANH 3 GIÂY',
    title: 'Vòng Quay Ăn Gì: Quyết Định Bữa Ăn Trong 3 Giây',
    desc: 'Giải pháp hoàn hảo cho hội bạn thân hoặc dân văn phòng mỗi khi đến giờ trưa mà không ai biết nên ăn gì. Vòng quay ngẫu nhiên tích hợp đầy đủ các nhóm món ăn phổ biến từ cơm, bún, phở đến trà sữa, ăn vặt.',
    faqs: [
      {
        question: 'Vòng quay ăn gì có thực sự ngẫu nhiên không?',
        answer:
          'Hoàn toàn ngẫu nhiên và công bằng 100%! Vòng quay sử dụng thuật toán vật lý với lực ma sát giảm tốc tự nhiên, mang lại cảm giác hồi hộp và minh bạch cho mọi lần quay.',
      },
      {
        question: 'Tôi có thể tự thêm món ăn yêu thích vào vòng quay không?',
        answer:
          'Có! Bạn có thể dễ dàng thêm bớt món ăn, tùy chỉnh danh sách món theo khẩu vị cá nhân hoặc chọn nhanh các chủ đề có sẵn (Healthy, Cơm trưa, Đồ nước, Ăn vặt).',
      },
      {
        question: 'Sau khi quay trúng món, làm sao để tìm quán bán?',
        answer:
          'Món trúng thưởng sẽ hiển thị kèm nút đặt món trực tiếp qua các ứng dụng giao thức ăn hàng đầu như ShopeeFood, GrabFood và BeFood kèm định vị khu vực của bạn.',
      },
    ],
  },
  ai: {
    badge: 'TRỢ LÝ THÔNG MINH GEMINI',
    title: 'Trợ Lý AI Gợi Ý Món Ăn: Đầu Bếp Ảo Thông Minh',
    desc: 'Ứng dụng mô hình AI Gemini tiên tiến để lắng nghe nhu cầu của bạn. Cho dù bạn đang buồn chán cần món giải tỏa, ăn theo chế độ giảm cân, hay trời đang mưa lạnh cần nồi lẩu ấm bụng, AI đều đưa ra thực đơn hoàn hảo nhất.',
    faqs: [
      {
        question: 'AI gợi ý món dựa trên những yếu tố nào?',
        answer:
          'Trợ lý AI phân tích đa chiều: Bữa ăn trong ngày (sáng/trưa/tối), mức ngân sách dự kiến, thời tiết thực tế, tâm trạng hiện tại và chế độ ăn kiêng (eat clean, chay, low-carb).',
      },
      {
        question: 'Món ăn gợi ý có dễ đặt ship không?',
        answer:
          'Tất cả gợi ý từ AI đều là những món ăn phổ biến, quen thuộc và có mặt trên khắp các ứng dụng giao hàng tại Việt Nam, đảm bảo bạn tìm thấy quán phục vụ chỉ trong vài giây.',
      },
      {
        question: 'Trợ lý AI gợi ý món ăn có miễn phí không?',
        answer:
          'Hoàn toàn miễn phí 100%! Bạn có thể trò chuyện và yêu cầu gợi ý thực đơn không giới hạn số lần mỗi ngày.',
      },
    ],
  },
  catalog: {
    badge: 'BÁCH KHOA TOÀN THƯ ẨM THỰC',
    title: 'Thực Đơn Món Ngon: Bách Khoa Toàn Thư Ẩm Thực Việt',
    desc: 'Tuyển tập hơn 160 món ăn đặc sản tiêu biểu trải dài từ Bắc chí Nam. Phân loại khoa học theo món nước, cơm xôi, đồ nướng, đồ cuốn, món chay và tráng miệng giúp bạn khám phá thế giới ẩm thực phong phú.',
    faqs: [
      {
        question: 'Danh mục món ăn có đầy đủ thông tin dinh dưỡng không?',
        answer:
          'Mỗi món ăn đều cung cấp thông tin chi tiết về mức calo ước tính, khoảng giá trung bình, nguyên liệu đặc trưng và các món ăn kèm lý tưởng.',
      },
      {
        question: 'Làm thế nào để tìm món ăn theo khu vực quận/huyện của tôi?',
        answer:
          'Bạn chỉ cần chọn vị trí của mình (Hà Nội, TP.HCM, Đà Nẵng...) ở góc trên, hệ thống sẽ tự động tối ưu đường dẫn tìm quán ăn gần nhất tương ứng với vị trí đó.',
      },
    ],
  },
  discover: {
    badge: 'CẨM NANG KHÁM PHÁ ẨM THỰC',
    title: 'Khám Phá Ẩm Thực 3 Miền, Thực Đơn Mỗi Ngày & Cách Nấu Món Ngon',
    desc: 'Chuyên trang cẩm nang ẩm thực tổng hợp: Tìm hiểu nét độc đáo văn hóa ăn uống Bắc - Trung - Nam, tham khảo lịch thực đơn mỗi ngày cân đối dinh dưỡng và xem cặn kẽ cách nấu, mẹo ướp gia vị hơn 160+ món ngon gia đình Việt Nam.',
    faqs: [
      {
        question: 'Ẩm thực 3 miền Bắc - Trung - Nam có gì khác biệt về khẩu vị?',
        answer:
          'Ẩm thực miền Bắc chuộng sự thanh tao, vị ngọt tự nhiên của nước hầm xương và thơm nhẹ mùi tiêu gừng; miền Trung thiên về vị đậm đà sâu thẳm, cay nồng nàn của ớt và mắm ruốc; còn miền Nam và miền Tây lại nổi bật với vị béo thơm của nước cốt dừa, nước dừa tươi ngọt lành và nguồn rau đồng sông nước phong phú.',
      },
      {
        question: 'Thực đơn mỗi ngày được thiết kế theo tiêu chí dinh dưỡng nào?',
        answer:
          'Thực đơn mỗi ngày từ Thứ 2 đến Chủ Nhật được cân bằng khoa học: Bữa sáng giàu protein nạp năng lượng tỉnh táo, bữa trưa chắc dạ dễ tiêu hóa, xế chiều giải khát bổ sung vitamin, và bữa tối ấm cúng nhẹ bụng giúp giấc ngủ sâu.',
      },
      {
        question: 'Mục "Cách Nấu" lấy thông tin từ đâu và có dễ làm theo không?',
        answer:
          'Mục Cách Nấu được đúc kết trực tiếp từ kho dữ liệu 160+ Món Ngon của ứng dụng, phân tích chi tiết định lượng nguyên liệu, các bước sơ chế, tẩm ướp, căn chỉnh nhiệt độ lửa và bí quyết gia truyền của bếp trưởng để bạn có thể tự tin nấu thành công ngay tại nhà.',
      },
      {
        question: 'Nếu tôi không có thời gian tự nấu thì có thể đặt ship món ngay không?',
        answer:
          'Hoàn toàn có thể! Mỗi công thức nấu ăn đều tích hợp nút "Đặt Món Ship Ngay" kết nối đến ShopeeFood, GrabFood hoặc BeFood giúp bạn tìm ngay các quán gần nhà bán món đó khi bận rộn.',
      },
    ],
  },
};

export const SeoContentFaq: React.FC<{
  activeTab: TabType;
  onNavigate?: (tab: TabType) => void;
}> = ({ activeTab, onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Do not display SEO FAQ block on About and Contact pages as they are standalone pages
  if (activeTab === 'about' || activeTab === 'contact') {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Dedicated Rich SEO Editorial Guide for Tarot Food Reading
  if (activeTab === 'tarot') {
    const tarotFaqs: FaqItem[] = [
      {
        question: 'Tarot Ẩm Thực là gì và vì sao lại giúp giải quyết băn khoăn "Hôm nay ăn gì?"',
        answer:
          'Tarot Ẩm Thực là sự kết hợp độc đáo giữa biểu tượng 10 Đại Khái Niệm Tarot kinh điển (The Magician, The Empress, The Sun, The Wheel of Fortune...), năng lượng 12 Cung Hoàng Đạo và triết lý Ngũ Hành âm dương Á Đông. Thay vì mất từ 30 đến 45 phút lướt thực đơn trong vô định, việc rút một quẻ bài giúp bạn giải tỏa bế tắc tâm lý, kích hoạt trực giác và nhận ngay một món ăn hoàn hảo, tương thích với cảm xúc và từ trường may mắn của ngày mới.',
      },
      {
        question: 'Kết quả bốc bài Tarot có thực sự ngẫu nhiên và chống trùng lặp món không?',
        answer:
          'Hoàn toàn ngẫu nhiên và thông minh! Hệ thống tích hợp thuật toán phân phối ngẫu nhiên đa tầng kết hợp cơ chế chống trùng lặp món ăn. Điều này đảm bảo mỗi quẻ bài bạn rút đều mang đến một bất ngờ vị giác mới lạ từ kho dữ liệu hơn 160 đặc sản 3 miền thuần Việt, tránh tình trạng ăn lặp lại các món quen thuộc ngày hôm trước.',
      },
      {
        question: 'Lá bùa hộ mệnh ẩm thực có ý nghĩa phong thủy gì và sử dụng như thế nào?',
        answer:
          'Sau khi lật bài, bạn sẽ nhận được một lá Bùa Hộ Mệnh Ẩm Thực độc bản mang đậm phong cách chiêm tinh huyền bí, gồm số seri định danh duy nhất (Unique Token ID), linh phù phong thủy tương ứng và lời chúc tài lộc. Bạn có thể nhấn nút "Tải Bùa May Mắn" để lưu vào máy làm hình nền điện thoại thu hút vận may, hoặc chia sẻ lên Story Zalo, Facebook, Instagram để lan tỏa niềm vui cùng bạn bè.',
      },
      {
        question: 'Làm thế nào để đặt ngay món ăn trúng quẻ bài qua ứng dụng giao hàng?',
        answer:
          'Ngay dưới quẻ bài đã mở, hệ thống tích hợp sẵn liên kết thông minh đến 3 ứng dụng giao đồ ăn hàng đầu Việt Nam: ShopeeFood, GrabFood và BeFood. Ứng dụng tự động đính kèm định vị khu vực của bạn (Hà Nội, TP.HCM, Đà Nẵng...), đưa bạn đến thẳng các quán ngon chuẩn vị gần nhất kèm theo nhiều mã giảm giá hấp dẫn.',
      },
      {
        question: 'Nếu tôi bốc trúng món đang ăn kiêng, ăn chay hoặc bị dị ứng thì sao?',
        answer:
          'Rất đơn giản! Bạn hoàn toàn có thể nhấn nút "Bốc Quẻ Mới" để khai mở một thông điệp vị giác khác phù hợp hơn. Ngoài ra, bạn cũng có thể chuyển sang dùng Vòng Quay Ăn Gì (tự chọn món), Trợ Lý AI (gợi ý riêng cho người ăn chay, giảm cân) hoặc mở Thực Đơn Món Ngon 3 Miền để tra cứu theo từng nhóm nguyên liệu.',
      },
      {
        question: 'Ứng dụng Tarot Ẩm Thực có thu phí hay yêu cầu tạo tài khoản không?',
        answer:
          'Không hề! Ứng dụng hoàn toàn miễn phí 100%, không yêu cầu đăng ký tài khoản và không chèn quảng cáo phiền toái. Bạn có thể mở web trên điện thoại hoặc máy tính để bốc quẻ bất cứ lúc nào khi cần tìm cảm hứng ăn uống.',
      },
    ];

    return (
      <article
        aria-label="Cẩm nang Tarot Ẩm Thực & Bói Món Ăn Hôm Nay"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-10 sm:mb-14"
      >
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 space-y-10">
          
          {/* Header & Lead */}
          <header className="border-b border-stone-100 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-3.5 border border-purple-200/60">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>CHIÊM TINH VỊ GIÁC & PHONG THỦY ẨM THỰC</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
              Tarot Ẩm Thực: Khám Phá Quẻ Bói Món Ăn Hôm Nay & Vận Mệnh Vị Giác
            </h2>
            
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-4">
              Bạn đang băn khoăn <strong className="text-orange-600 font-bold">&quot;Hôm nay ăn gì?&quot;</strong> và cảm thấy bế tắc giữa hàng trăm lựa chọn quen thuộc mỗi giờ cơm trưa hay xế chiều? Hãy để những lá bài <strong className="text-purple-700 font-semibold">Tarot Ẩm Thực</strong> kết nối với trực giác của bạn. Bằng sự giao thoa tinh tế giữa chiêm tinh học phương Tây (12 Cung Hoàng Đạo & 10 Đại Khái Niệm Tarot) với thuyết Ngũ Hành tương sinh của ẩm thực Việt, mỗi quẻ bài được lật mở là một lời hồi đáp định mệnh giúp bạn lựa chọn bữa ăn ngon miệng và tràn đầy năng lượng tích cực.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Không chỉ là một trò chơi giải trí thú vị, bói bài Tarot món ăn còn là liệu pháp tâm lý giúp bạn thoát khỏi hội chứng &quot;áp lực lựa chọn&quot; (decision fatigue), mở rộng trải nghiệm ẩm thực với hơn 160 đặc sản ba miền Bắc - Trung - Nam và đón nhận lá bùa hộ mệnh may mắn cho công việc hanh thông suốt cả ngày.
            </p>
          </header>

          {/* 4 Core Pillars of Tarot Food Reading */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              <span>4 Giá Trị Khác Biệt Khi Khám Phá Tarot Ẩm Thực</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center font-bold mb-3">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    1. 12 Cung Hoàng Đạo Vị Giác
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Liên kết nguyên tố bản mệnh (Lửa, Đất, Khí, Thủy) với hương vị tương thích, giúp tinh thần sảng khoái và khơi dậy đam mê ẩm thực đúng điệu.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold mb-3">
                    <Wand2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    2. 10 Đại Khái Niệm Tarot
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Khám phá thông điệp từ The Magician, The Empress, The Sun, The Wheel of Fortune... tái hiện sinh động dưới lăng kính ẩm thực truyền thống.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold mb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    3. Chống Trùng Món Thông Minh
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Thuật toán ngẫu nhiên thông minh loại bỏ tình trạng lặp món quen thuộc, mở ra hành trình khám phá 160+ món ăn phong phú khắp mọi miền đất nước.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-700 flex items-center justify-center font-bold mb-3">
                    <Flame className="w-5 h-5 text-rose-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    4. Bùa Hộ Mệnh & Đặt Món Nhanh
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Nhận lá bùa may mắn độc bản với số seri riêng biệt để lưu về máy, kết nối 1 chạm mở app ShopeeFood, GrabFood và BeFood đặt món ngay gần bạn.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Zodiac Elements & Culinary Harmony */}
          <section className="bg-stone-50/70 p-6 sm:p-8 rounded-2xl border border-stone-200/70">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>Bí Quyết Chọn Món Hợp Mệnh Theo 4 Nguyên Tố Cung Hoàng Đạo</span>
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
              Mỗi chòm sao mang một nguồn năng lượng vũ trụ riêng biệt, tác động trực tiếp đến khẩu vị và khả năng chuyển hóa dinh dưỡng của cơ thể. Dưới đây là cách phối hợp ẩm thực chuẩn chiêm tinh:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-bold shrink-0">
                    NGUYÊN TỐ HỎA (LỬA)
                  </span>
                  <span className="text-xs font-semibold text-stone-500">Bạch Dương • Sư Tử • Nhân Mã</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                  Hương Vị Cay Nồng, Đậm Đà & Giàu Năng Lượng
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Người nhóm Lửa sở hữu tính cách nhiệt huyết, cần những món ăn đánh thức giác quan nhanh chóng như <em>Bún bò Huế cay nồng, Cơm tấm sườn nướng than hoa, Lẩu Thái chua cay, Gà nướng muối ớt</em> để tiếp thêm lửa sáng tạo.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0">
                    NGUYÊN TỐ THỔ (ĐẤT)
                  </span>
                  <span className="text-xs font-semibold text-stone-500">Kim Ngưu • Xử Nữ • Ma Kết</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                  Món Cơm Dẻo Canh Ngọt, Ấm Áp & Chắc Bụng
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Người nhóm Đất chuộng sự ổn định, kiên định và dinh dưỡng đủ đầy. Những món ăn truyền thống như <em>Cơm niêu cá kho tộ, Canh cua rau đay cà pháo, Bún chả nướng Hà Nội, Bò kho bánh mì</em> mang lại cảm giác no lâu và an tâm.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-100 text-cyan-800 text-xs font-bold shrink-0">
                    NGUYÊN TỐ KHÍ (GIÓ)
                  </span>
                  <span className="text-xs font-semibold text-stone-500">Song Tử • Thiên Bình • Bảo Bình</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                  Món Cuốn Thanh Nhẹ, Tươi Mới & Dễ Biến Tấu
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Người nhóm Khí yêu thích sự tự do, linh hoạt và giao lưu xã hội. Các món ăn nhẹ bụng, phong phú về sắc màu như <em>Phở cuốn thịt bò, Bánh tráng cuốn thịt heo, Mì trộn xá xíu, Gỏi cuốn tôm thịt</em> là lựa chọn hoàn hảo cho giờ giải lao.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold shrink-0">
                    NGUYÊN TỐ THỦY (NƯỚC)
                  </span>
                  <span className="text-xs font-semibold text-stone-500">Cự Giải • Bọ Cạp • Song Ngư</span>
                </div>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                  Nước Dùng Ninh Ngọt Lành, Xoa Dịu & Bồi Bổ Cảm Xúc
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Người nhóm Thủy giàu cảm xúc và nhạy cảm với năng lượng. Món nước ấm áp chứa chan vị ngọt từ xương và hải sản như <em>Phở bò gia truyền Hà Nội, Bún riêu cua đồng, Hủ tiếu Nam Vang, Canh chua cá lóc</em> giúp thư giãn tinh thần và phục hồi năng lượng.
                </p>
              </div>
            </div>
          </section>

          {/* 3 Steps Guide */}
          <section className="bg-gradient-to-br from-stone-900 to-purple-950 text-white p-6 sm:p-8 rounded-3xl">
            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-amber-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>3 Bước Bốc Quẻ Tarot Ẩm Thực Khai Mở May Mắn Chuẩn Xác</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-900 flex items-center justify-center font-extrabold text-sm mb-2.5">
                  1
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base mb-1">
                  Chọn Cung Hoàng Đạo
                </h4>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Nhập tên và chọn cung hoàng đạo ngày sinh của bạn để kích hoạt từ trường vị giác tương thích với vũ trụ.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-900 flex items-center justify-center font-extrabold text-sm mb-2.5">
                  2
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base mb-1">
                  Tĩnh Tâm & Bốc Quẻ
                </h4>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Nghĩ về câu hỏi &quot;Hôm nay ăn gì mang lại may mắn?&quot; trong 3 giây và chạm nhẹ vào tụ bài Tarot đang tỏa hào quang.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-900 flex items-center justify-center font-extrabold text-sm mb-2.5">
                  3
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base mb-1">
                  Nhận Bùa & Đặt Món
                </h4>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Đọc thông điệp quẻ bài, tải lá bùa may mắn về máy và bấm nút đặt quán ngon gần bạn trên ShopeeFood, GrabFood, BeFood.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="pt-2">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Câu Hỏi Thường Gặp Về Tarot Ẩm Thực (FAQ)
              </h3>
            </div>

            <div className="space-y-3">
              {tarotFaqs.map((faq, index) => {
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
          </section>

          {/* Internal Cross-Linking Section */}
          <section className="pt-6 border-t border-stone-100">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-600" />
              <span>Khám Phá Thêm Các Công Cụ Chọn Món Chuẩn Vị Khác</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="/vong-quay"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('wheel');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Vòng Quay Ăn Gì
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Quay ngẫu nhiên chỉ trong 3 giây
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/lich-an-theo-tuan"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('planner');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Lịch Ăn Tuần
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Thực đơn 7 ngày chống trùng lặp
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/ai-goi-y-mon-an"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('ai');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Trợ Lý AI Chọn Món
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Gợi ý theo tâm trạng & thời tiết
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </section>

          {/* Structured Data (Schema.org JSON-LD for Tarot Food Reading) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebPage",
                    "@id": "https://www.angigio.com/#webpage",
                    "url": "https://www.angigio.com/",
                    "name": "Hôm Nay Ăn Gì - Tarot Ẩm Thực 12 Cung Hoàng Đạo Chuẩn Vị",
                    "description": "Hôm nay Vũ Trụ mách bạn ăn gì? Trải bài Tarot ẩm thực 12 cung hoàng đạo, khám phá quẻ bói món ăn định mệnh mỗi ngày và đặt món nhanh chóng.",
                    "inLanguage": "vi-VN",
                    "isPartOf": {
                      "@type": "WebSite",
                      "@id": "https://www.angigio.com/#website",
                      "name": "Hôm Nay Ăn Gì",
                      "url": "https://www.angigio.com/"
                    }
                  },
                  {
                    "@type": "BreadcrumbList",
                    "@id": "https://www.angigio.com/#breadcrumb",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Trang Chủ",
                        "item": "https://www.angigio.com/"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Tarot Ẩm Thực",
                        "item": "https://www.angigio.com/"
                      }
                    ]
                  },
                  {
                    "@type": "FAQPage",
                    "@id": "https://www.angigio.com/#faq",
                    "mainEntity": tarotFaqs.map((faq) => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                      }
                    }))
                  }
                ]
              })
            }}
          />
        </div>
      </article>
    );
  }

  // Dedicated Rich SEO Editorial Guide for Lucky Wheel (No Accordion - Unique Visual Layout)
  if (activeTab === 'wheel') {
    return (
      <article
        aria-label="Cẩm nang Vòng Quay Ăn Gì & Giải Pháp Chọn Món Nhanh"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-10 sm:mb-14"
      >
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 space-y-10">
          
          {/* Header & Lead */}
          <header className="border-b border-stone-100 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3.5 border border-amber-200/60">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>CÔNG CỤ QUYẾT ĐỊNH ẨM THỰC TỨC THÌ</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
              Quyết Định Món Ăn Trong 3 Giây & Xóa Bỏ Nỗi Lo &quot;Hôm Nay Ăn Gì?&quot;
            </h2>
            
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-4">
              Cứ đến 11h30 trưa hoặc 6h tối, câu hỏi quen thuộc <strong className="text-orange-600 font-bold">&quot;Trưa nay ăn gì?&quot;</strong> lại khiến cả nhóm bạn thân hay đồng nghiệp cùng phòng rơi vào vòng lặp do dự kéo dài. Hàng loạt câu trả lời như <em>&quot;Ăn gì cũng được&quot;</em>, <em>&quot;Tùy mọi người&quot;</em> không những không giải quyết được vấn đề mà còn làm tiêu tốn từ 20 đến 45 phút quý giá mỗi ngày.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              <strong className="text-amber-700 font-semibold">Vòng Quay Ăn Gì</strong> trên <em>Hôm Nay Ăn Gì (Angigio.com)</em> được thiết kế như một trọng tài vị giác độc lập và vui nhộn. Ứng dụng thuật toán vật lý giảm tốc tự nhiên, vòng quay trao cơ hội cho vận may đưa ra phán quyết công bằng 100%, biến giờ chọn món thành trải nghiệm giải trí hào hứng và kích thích vị giác ngay lập tức.
            </p>

            {/* Quick Stat Callout Banner */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Thống kê thực tế giờ cơm công sở
                  </div>
                  <div className="text-sm sm:text-base font-bold text-stone-900">
                    Người trưởng thành lãng phí ~250 giờ mỗi năm chỉ để nghĩ món ăn
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 text-white font-bold text-xs sm:text-sm shrink-0 shadow-xs">
                <Zap className="w-4 h-4" />
                <span>Chốt Món Chỉ 3 Giây</span>
              </div>
            </div>
          </header>

          {/* Cấu trúc Trình bày 1: Bảng Ma Trận Gợi Ý Theo Tình Huống Thực Tế */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Ma Trận Chọn Chủ Đề Vòng Quay Theo Tình Huống Thực Tế
              </h3>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
              Không cần băn khoăn tìm từng món, bạn chỉ cần chọn ngay bộ chủ đề (preset) phù hợp với ngữ cảnh hiện tại để vòng quay tự động lọc danh sách món ăn lý tưởng nhất:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kịch bản 1 */}
              <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-orange-200 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-800 text-xs font-bold">
                    🏢 DÂN VĂN PHÒNG (11h30 - 13h00)
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">Giao nhanh • Đủ no</span>
                </div>
                <h4 className="font-bold text-stone-900 text-base mb-1.5">
                  Preset &quot;Cơm Trưa Công Sở & Xôi&quot;
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
                  Tập trung các món chắc bụng, giàu tinh bột và đạm để nạp đầy năng lượng cho buổi chiều làm việc: <em>Cơm tấm sườn bì chả, Cơm gà xối mỡ, Cơm niêu văn phòng, Xôi xéo gà xé</em>.
                </p>
                <div className="text-xs text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200/60 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span><strong>Mẹo gom đơn:</strong> Rủ 3-5 đồng nghiệp cùng quay để gom đơn chung được freeship trên ShopeeFood / GrabFood.</span>
                </div>
              </div>

              {/* Kịch bản 2 */}
              <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-emerald-200 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                    🎓 TIẾT KIỆM CUỐI THÁNG (&lt; 35K)
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">Giá rẻ • Ngon miệng</span>
                </div>
                <h4 className="font-bold text-stone-900 text-base mb-1.5">
                  Preset &quot;Món Ngon Bình Dân Sinh Viên&quot;
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
                  Giải pháp ăn ngon mà ví tiền vẫn an toàn: <em>Bánh mì chả thịt nướng, Hủ tiếu gõ nóng hổi, Bún riêu cua bình dân, Bánh cuốn nóng, Cơm rang dưa bò</em>.
                </p>
                <div className="text-xs text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200/60 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span><strong>Mẹo tiết kiệm:</strong> Săn voucher giảm giá 20k - 30k vào các khung giờ vàng 11h và 17h trên app đặt món.</span>
                </div>
              </div>

              {/* Kịch bản 3 */}
              <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-purple-200 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-3 py-1 rounded-lg bg-purple-100 text-purple-800 text-xs font-bold">
                    👥 HỘI BẠN THÂN & CUỐI TUẦN
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">Rôm rả • Tụ họp</span>
                </div>
                <h4 className="font-bold text-stone-900 text-base mb-1.5">
                  Preset &quot;Lẩu Nướng & Món Nhậu Tụ Tập&quot;
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
                  Dành riêng cho những buổi gặp mặt đông vui: <em>Lẩu Thái chua cay, Lẩu riêu cua bắp bò, Nướng ngói BBQ, Ốc xào me, Bánh tráng cuốn thịt heo</em>.
                </p>
                <div className="text-xs text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200/60 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span><strong>Quy tắc vui vẻ:</strong> Dùng vòng quay chọn món chính, ai thua phải đãi tiền nước hoặc trà sữa tráng miệng!</span>
                </div>
              </div>

              {/* Kịch bản 4 */}
              <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 hover:border-teal-200 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-3 py-1 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold">
                    🥗 GIỮ DÁNG & EAT CLEAN
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">Ít calo • Thanh nhẹ</span>
                </div>
                <h4 className="font-bold text-stone-900 text-base mb-1.5">
                  Preset &quot;Salad & Món Thanh Nhẹ&quot;
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3">
                  Kiểm soát lượng calo nạp vào cơ thể nhưng vẫn đủ dinh dưỡng: <em>Salad ức gà áp chảo, Bún gạo lứt trộn rau củ, Phở cuốn chay, Gỏi cuốn tôm thịt</em>.
                </p>
                <div className="text-xs text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200/60 flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span><strong>Kiểm soát calo:</strong> Sau khi quay trúng món, bảng thông tin sẽ hiện ngay lượng calo ước tính chuẩn xác.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Cấu trúc Trình bày 2: Quy Trình 4 Bước "Quay Là Ăn - Không Tranh Cãi" */}
          <section className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white p-6 sm:p-8 rounded-3xl">
            <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2 text-amber-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Quy Trình 4 Bước &quot;Quay Là Ăn - Không Tranh Cãi&quot;</span>
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
              Được thiết kế tối giản, trực quan và chạy mượt mà ngay trên trình duyệt điện thoại lẫn máy tính mà không cần cài đặt ứng dụng:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-extrabold text-sm mb-3">
                    01
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1.5">
                    Chọn Hoặc Tùy Biến
                  </h4>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Chọn nhanh 1 trong 10+ bộ chủ đề có sẵn hoặc tự nhập thêm tên các quán quen thuộc quanh công ty của bạn.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-extrabold text-sm mb-3">
                    02
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1.5">
                    Bấm Nút &quot;Quay Ngay&quot;
                  </h4>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Vòng quay chuyển động với lực ma sát vật lý chân thực kèm âm thanh tick-tick hồi hộp tạo cảm giác hứng khởi.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-extrabold text-sm mb-3">
                    03
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1.5">
                    Pháo Hoa & Kết Quả
                  </h4>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Món chiến thắng hiện ra cùng hiệu ứng pháo hoa rực rỡ, kèm định mức calo, mức giá và hương vị đặc trưng.
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-extrabold text-sm mb-3">
                    04
                  </div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1.5">
                    Đặt Ship 1 Chạm
                  </h4>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Bấm trực tiếp nút ShopeeFood, GrabFood hoặc BeFood để mở app đặt ngay quán ngon chuẩn vị gần bạn nhất.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cấu trúc Trình bày 3: 3 Bí Quyết "Dân Chơi Vòng Quay" Không Thể Bỏ Qua */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                3 Bí Quyết Biến Giờ Cơm Thành Trải Nghiệm Thú Vị
              </h3>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
              Để vòng quay phát huy tối đa công năng giải quyết dứt điểm mâu thuẫn chọn món, hãy áp dụng 3 quy tắc vàng dưới đây:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-700 flex items-center justify-center font-bold mb-3">
                    <RotateCcw className="w-5 h-5 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    1. Quy Tắc &quot;Quay Là Ăn&quot;
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Tuyệt đối không quay lại lần hai nếu món trúng không như ý ban đầu. Tôn trọng quyết định của vòng quay giúp bạn rèn luyện tính dứt khoát và xua tan áp lực chọn lựa.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold mb-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    2. Quyền Phủ Quyết Trước Khi Quay
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Khi đi nhóm đông người, mỗi thành viên được quyền bấm xóa bỏ trước 1 món bị dị ứng hoặc không ăn được khỏi danh sách để kết quả cuối cùng làm hài lòng tất cả.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold mb-3">
                    <Flame className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    3. Thử Thách Khám Phá Món Mới
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Nếu vòng quay chỉ định một món ăn bạn chưa từng thử qua, hãy đón nhận nó như một cơ hội trải nghiệm hương vị mới. Rất nhiều người đã tìm thấy quán ruột nhờ sự ngẫu nhiên này!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cấu trúc Trình bày 4: 3 Thẻ Tính Năng Cốt Lõi Trải Phẳng (Thay thế hoàn toàn Accordion FAQ) */}
          <section className="bg-stone-50/70 p-6 sm:p-8 rounded-2xl border border-stone-200/70">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Nền Tảng Công Nghệ & Tiện Ích Độc Quyền</span>
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
              Những tính năng vượt trội giúp Vòng Quay Ăn Gì trở thành công cụ chọn món được yêu thích nhất:
            </p>

            <div className="space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-600 shrink-0" />
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                      Thuật Toán Vật Lý Giảm Tốc Minh Bạch 100%
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-4">
                    Vòng quay hoạt động dựa trên phương trình ma sát góc ngẫu nhiên, mô phỏng chân thực chuyển động quán tính của vòng quay cơ học ngoài đời thực, đảm bảo mọi ô món ăn đều có cơ hội trúng đồng đều và công bằng.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold shrink-0 self-start sm:self-center border border-orange-200/60">
                  Công Bằng 100%
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                      Tự Do Cá Nhân Hóa & Lưu Trữ Tự Động Trên Thiết Bị
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-4">
                    Bạn có thể tự do thêm tên các quán ăn ruột gần nhà, xóa bớt các món không thích và lưu trữ danh sách riêng. Hệ thống tự động ghi nhớ tùy biến của bạn cho những lần quay tiếp theo mà không cần đăng ký tài khoản.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold shrink-0 self-start sm:self-center border border-blue-200/60">
                  Lưu Tự Động
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                      Tự Động Định Vị Vùng Miền & Kết Nối Đặt Ship Liền Tay
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-4">
                    Tích hợp thông minh với định vị khu vực của bạn (Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ...), đưa bạn đến thẳng các quán đang mở bán gần nhất trên ShopeeFood, GrabFood và BeFood kèm các chương trình ưu đãi hấp dẫn.
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold shrink-0 self-start sm:self-center border border-emerald-200/60">
                  Giao Tận Nơi
                </div>
              </div>
            </div>
          </section>

          {/* Cấu trúc Trình bày 5: Liên Kết Khám Phá Thêm */}
          <section className="pt-6 border-t border-stone-100">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-600" />
              <span>Khám Phá Thêm Các Công Cụ Chọn Món Chuẩn Vị Khác</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="/"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('tarot');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Tarot Ẩm Thực
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Quẻ bói 12 cung hoàng đạo & lá bùa may mắn
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/lich-an-theo-tuan"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('planner');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Lịch Ăn Tuần
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Thực đơn 7 ngày chống trùng lặp & tính calo
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/ai-goi-y-mon-an"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('ai');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Trợ Lý AI Chọn Món
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Gợi ý thực đơn theo tâm trạng & thời tiết
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </section>

          {/* Structured Data (Schema.org JSON-LD for Lucky Wheel) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebPage",
                    "@id": "https://www.angigio.com/vong-quay#webpage",
                    "url": "https://www.angigio.com/vong-quay",
                    "name": "Vòng Quay Ăn Gì - Quay Món Ngẫu Nhiên Trong 3 Giây | Hôm Nay Ăn Gì",
                    "description": "Quay vòng quay ăn gì ngẫu nhiên giúp bạn chốt món chỉ trong 3 giây. Tùy chỉnh danh sách món ngon, chọn chủ đề cơm trưa, bún phở, lẩu nướng và kết nối đặt ship ngay.",
                    "inLanguage": "vi-VN",
                    "isPartOf": {
                      "@type": "WebSite",
                      "@id": "https://www.angigio.com/#website",
                      "name": "Hôm Nay Ăn Gì",
                      "url": "https://www.angigio.com/"
                    }
                  },
                  {
                    "@type": "BreadcrumbList",
                    "@id": "https://www.angigio.com/vong-quay#breadcrumb",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Trang Chủ",
                        "item": "https://www.angigio.com/"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Vòng Quay Ăn Gì",
                        "item": "https://www.angigio.com/vong-quay"
                      }
                    ]
                  },
                  {
                    "@type": "HowTo",
                    "@id": "https://www.angigio.com/vong-quay#howto",
                    "name": "Cách dùng Vòng Quay Ăn Gì để chọn món ăn trong 3 giây",
                    "description": "Hướng dẫn 4 bước sử dụng vòng quay may mắn chọn món ăn ngẫu nhiên cho bữa trưa và bữa tối.",
                    "step": [
                      {
                        "@type": "HowToStep",
                        "position": 1,
                        "name": "Chọn hoặc tùy biến thực đơn",
                        "text": "Chọn một trong các chủ đề có sẵn như Cơm & Xôi, Bún/Phở, Món bình dân, Healthy hoặc tự gõ thêm món ăn."
                      },
                      {
                        "@type": "HowToStep",
                        "position": 2,
                        "name": "Bấm nút Quay Ngay",
                        "text": "Vòng quay khởi động với vận tốc góc ngẫu nhiên và hãm phanh bằng lực ma sát vật lý chân thực."
                      },
                      {
                        "@type": "HowToStep",
                        "position": 3,
                        "name": "Xem kết quả món ăn thắng cuộc",
                        "text": "Món ăn được chọn ngẫu nhiên minh bạch 100% kèm thông số calo và mức giá dự tính."
                      },
                      {
                        "@type": "HowToStep",
                        "position": 4,
                        "name": "Đặt món qua ứng dụng giao hàng",
                        "text": "Nhấn nút ShopeeFood, GrabFood hoặc BeFood để mở app và đặt món tại quán gần nhất."
                      }
                    ]
                  }
                ]
              })
            }}
          />
        </div>
      </article>
    );
  }

  // Dedicated Rich SEO Editorial Guide for Meal Planner
  if (activeTab === 'planner') {
    return (
      <article
        aria-label="Cẩm nang Lịch Ăn Tuần Chuẩn Vị & Tiết Kiệm"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-10 sm:mb-14"
      >
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 space-y-10">
          
          {/* Header & Lead */}
          <header className="border-b border-stone-100 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3.5 border border-orange-200/60">
              <BookOpen className="w-3.5 h-3.5 text-orange-600" />
              <span>CẨM NANG DINH DƯỠNG & ĐỜI SỐNG ẨM THỰC</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
              Lịch Ăn Tuần: Thực Đơn Tuần Chuẩn Vị & Tiết Kiệm Thời Gian
            </h2>
            
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-4">
              Mỗi sáng thức dậy hoặc cứ đến 11h trưa, câu hỏi muôn thuở <strong className="text-orange-600 font-bold">&quot;Hôm nay ăn gì?&quot;</strong> lại khiến không ít gia đình và dân văn phòng phải đau đầu tranh luận. Việc lướt qua hàng chục ứng dụng giao thức ăn mà không có kế hoạch vừa làm tiêu tốn từ 30 đến 45 phút quý báu mỗi ngày, vừa dễ dẫn đến tình trạng ăn uống thất thường, mất cân bằng dinh dưỡng và chi tiêu vượt ngân sách.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Giải pháp tối ưu và hiện đại nhất chính là <strong>Lên lịch ăn tuần (Weekly Meal Planner)</strong>. Với tính năng thông minh của Hôm Nay Ăn Gì, bạn hoàn toàn có thể chủ động sắp xếp 21 bữa ăn từ Thứ 2 đến Chủ Nhật thật ngon miệng, chuẩn vị truyền thống 3 miền, đảm bảo khoa học và tối ưu chi phí sinh hoạt.
            </p>
          </header>

          {/* 4 Pillars of Weekly Meal Planning */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span>4 Lợi Ích Vàng Khi Lập Kế Hoạch Bữa Ăn Theo Tuần</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold mb-3">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    1. Tiết Kiệm 30 - 45 Phút Mỗi Ngày
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Giải phóng tâm trí khỏi nỗi lo chọn món giờ cao điểm. Bạn và đồng nghiệp hoặc gia đình chỉ cần mở lịch có sẵn để gọi món hoặc đi chợ nấu nướng chỉ trong 1 nốt nhạc.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold mb-3">
                    <Coins className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    2. Tối Ưu Chi Phí Từ 20% Đến 35%
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Kiểm soát chính xác ngân sách chi tiêu hàng tuần (~30k - 50k/bữa). Chủ động gom đơn đặt chung và săn mã giảm giá ShopeeFood, GrabFood, BeFood vào các khung giờ flash sale.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-700 flex items-center justify-center font-bold mb-3">
                    <HeartPulse className="w-5 h-5 text-rose-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    3. Dinh Dưỡng Cân Bằng & Giữ Dáng
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Cân đối tỷ lệ Đạm - Xơ - Tinh bột theo từng ngày. Luân phiên giữa món nước, món chiên xào, món canh rau và đồ luộc giúp hệ tiêu hóa khỏe mạnh, nhẹ bụng suốt ngày dài.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold mb-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    4. Khác Biệt 100% - Không Lo Trùng Món
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Kho dữ liệu hơn 160 món đặc sản phong phú. Thuật toán tự động loại trừ các món đã ăn ở tuần trước để đảm bảo mỗi tuần mang đến một chuyến phiêu lưu vị giác hoàn toàn mới.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Nutritional Balance Guidelines */}
          <section className="bg-stone-50/80 rounded-2xl p-5 sm:p-7 border border-stone-200/70">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-600" />
              <span>Quy Tắc &quot;3 Bữa Vàng&quot; Cho Thực Đơn Tuần Chuẩn Khoa Học</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              Các chuyên gia dinh dưỡng khuyến nghị phân bổ năng lượng trong ngày theo tỷ lệ lý tưởng: <strong>Bữa Sáng (30%) - Bữa Trưa (45%) - Bữa Tối (25%)</strong>. Dưới đây là cách hệ thống gợi ý thực đơn tuần sắp xếp hợp lý:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800 text-xs font-bold shrink-0">
                      BUỔI SÁNG
                    </span>
                    <span className="text-xs font-semibold text-stone-500">~400 - 550 kcal</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                    Khởi Động Năng Lượng
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Ưu tiên các món nước ấm nóng, dễ hấp thu như <em>Phở bò Hà Nội, Bún mọc, Hủ tiếu Nam Vang, Bánh cuốn nóng, Bánh mì kẹp chả</em>. Cung cấp carbohydrate lành mạnh giúp não bộ minh mẫn làm việc.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold shrink-0">
                      BUỔI TRƯA
                    </span>
                    <span className="text-xs font-semibold text-stone-500">~600 - 800 kcal</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                    Duy Trì Tỉnh Táo & Đủ Chất
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Bữa ăn no và giàu protein nạc như <em>Cơm tấm sườn nướng, Cơm gà xối mỡ, Bún chả nướng, Mì Quảng, Cơm văn phòng thịt kho tàu</em>. Luôn kèm canh rau để giải nhiệt và tránh ngấy.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-bold shrink-0">
                      BUỔI TỐI
                    </span>
                    <span className="text-xs font-semibold text-stone-500">~400 - 550 kcal</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1">
                    Thanh Nhẹ & Hồi Phục
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Hạn chế dầu mỡ nặng bụng trước giờ đi ngủ. Lựa chọn tuyệt vời gồm <em>Canh chua cá lóc, Lẩu gà lá é, Đậu hũ sốt cà chua, Cháo sườn yến mạch, Salad ức gà</em> giúp dạ dày nghỉ ngơi và ngủ sâu giấc hơn.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Anti-Duplication & Week Rotation Guide */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              <span>Cơ Chế Xoay Vòng Thông Minh: Bí Quyết &quot;Mỗi Tuần Mỗi Khác&quot;</span>
            </h3>
            
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Điểm vượt trội của công cụ <strong>Lịch Ăn Tuần</strong> trên <em>Hôm Nay Ăn Gì (Angigio.com)</em> so với các bảng thực đơn tĩnh thông thường chính là <strong>thuật toán xoay vòng chống trùng lặp theo lịch thực tế (Calendar ISO Week)</strong>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <span className="font-extrabold text-orange-600 text-base mb-1 block">
                  1. Tự Động Theo Lịch Thực
                </span>
                <p className="text-xs sm:text-sm text-stone-600">
                  Hệ thống tự động đồng bộ theo tuần hiện tại của năm (Ví dụ: Tuần 38). Sang Thứ Hai tuần mới, thực đơn tự động luân chuyển mà không cần thao tác thủ công.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <span className="font-extrabold text-orange-600 text-base mb-1 block">
                  2. Chống Trùng Đa Tầng
                </span>
                <p className="text-xs sm:text-sm text-stone-600">
                  21 bữa trong tuần là 21 món khác nhau 100%. Đồng thời, toàn bộ món của tuần trước sẽ được đưa vào danh sách loại trừ để tuần mới ngập tràn món mới mẻ.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <span className="font-extrabold text-orange-600 text-base mb-1 block">
                  3. Đa Dạng 5 Chế Độ
                </span>
                <p className="text-xs sm:text-sm text-stone-600">
                  Dễ dàng đổi qua lại giữa 5 chế độ: <em>Cân bằng, Dân văn phòng tiết kiệm, Eat clean giảm mỡ, Đặc sản 3 miền và Thuần chay</em> chỉ trong 1 chạm.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Tips for Saving & Ordering Online */}
          <section className="bg-orange-50/60 rounded-2xl p-5 sm:p-7 border border-orange-200/60">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-600" />
              <span>Mẹo Đặt Món Tiết Kiệm & Tiện Lợi Trên Ứng Dụng Ăn Uống</span>
            </h3>
            
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Canh giờ vàng săn mã:</strong> Đặt món trưa trước 11h00 hoặc món tối trước 17h00 trên ShopeeFood, GrabFood, BeFood để nhận voucher freeship và giảm tới 30k - 50k.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Gom đơn đặt chung:</strong> Chia sẻ thực đơn cho đồng nghiệp trong công ty để đặt cùng 1 quán, tiết kiệm phí vận chuyển và đạt điều kiện áp mã khuyến mãi lớn.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Chia sẻ nhanh 1 chạm:</strong> Sử dụng nút <em>&quot;Sao chép lịch&quot;</em> trên ứng dụng để gửi định dạng lịch ăn qua Zalo, Messenger, Threads hoặc in ra dán tại tủ lạnh gia đình.
                </span>
              </li>
            </ul>
          </section>

          {/* Naturally Integrated FAQ Accordion at the bottom */}
          <section className="pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2 mb-5">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Giải Đáp Thắc Mắc Thường Gặp Khi Lên Lịch Ăn Tuần
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  question: 'Lịch ăn tuần có thể tùy chỉnh từng món theo sở thích cá nhân không?',
                  answer:
                    'Có! Bạn hoàn toàn có thể chủ động bấm nút đổi ngẫu nhiên cho từng bữa ăn riêng lẻ, hoặc nhấp vào nút cây bút (chỉnh sửa) để mở kho hơn 160 món ngon Việt Nam và chọn chính xác món bạn và gia đình muốn thưởng thức.',
                },
                {
                  question: 'Thực đơn tuần có bị mất đi khi tôi đóng trình duyệt hoặc tắt máy không?',
                  answer:
                    'Không hề! Toàn bộ lịch ăn tuần của bạn được hệ thống tự động lưu trữ trên bộ nhớ thiết bị (LocalStorage). Lần tới khi quay lại, thực đơn của tuần hiện tại và các tuần trước/sau vẫn nguyên vẹn mà không yêu cầu bạn phải đăng ký tài khoản.',
                },
                {
                  question: 'Làm sao để lịch ăn của tuần sau không bị trùng với các món vừa ăn tuần này?',
                  answer:
                    'Hệ thống đã tích hợp sẵn bộ lọc loại trừ đa tầng. Khi bước sang tuần mới hoặc khi bạn bấm xem "Tuần sau", thuật toán sẽ tự động ghi nhận các món bạn đã ăn tuần này và ưu tiên chọn các món mới lạ từ kho 160+ món để thực đơn luôn phong phú và không ngán.',
                },
                {
                  question: 'Tôi có thể xuất lịch ăn để gửi cho gia đình hoặc đồng nghiệp không?',
                  answer:
                    'Rất đơn giản! Bạn chỉ cần nhấn nút "Sao chép lịch" để copy toàn bộ thực đơn 7 ngày với đầy đủ thông tin calo, chi phí và định dạng văn bản đẹp mắt. Sau đó bạn có thể dán vào nhóm Zalo, Messenger, Threads hoặc bấm nút "In lịch" để in ra giấy dán tủ lạnh.',
                },
              ].map((faq, index) => {
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
          </section>

          {/* Internal Cross-Linking / Khám Phá Thêm */}
          <section className="pt-6 border-t border-stone-100">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-600" />
              <span>Khám Phá Thêm Các Công Cụ Chọn Món Chuẩn Vị Khác</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="/vong-quay"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('wheel');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Vòng Quay Ăn Gì
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Quay ngẫu nhiên chỉ trong 3 giây
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/ai-goi-y-mon-an"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('ai');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Trợ Lý AI Chọn Món
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Gợi ý theo tâm trạng & thời tiết
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/mon-ngon"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('catalog');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Thực Đơn 160+ Món Ngon
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Đặc sản 3 miền kết nối đặt món
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </section>

          {/* Structured Data (Schema.org JSON-LD for Weekly Meal Planner) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebPage",
                    "@id": "https://www.angigio.com/lich-an-theo-tuan#webpage",
                    "url": "https://www.angigio.com/lich-an-theo-tuan",
                    "name": "Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị & Tiết Kiệm | Hôm Nay Ăn Gì",
                    "description": "Lên lịch ăn tuần thông minh từ Thứ 2 đến Chủ Nhật: Tự động chống trùng món, tính calo & chi phí, đổi món linh hoạt, gợi ý bữa sáng trưa tối chuẩn ngon.",
                    "inLanguage": "vi-VN",
                    "isPartOf": {
                      "@type": "WebSite",
                      "@id": "https://www.angigio.com/#website",
                      "name": "Hôm Nay Ăn Gì",
                      "url": "https://www.angigio.com/"
                    }
                  },
                  {
                    "@type": "BreadcrumbList",
                    "@id": "https://www.angigio.com/lich-an-theo-tuan#breadcrumb",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Trang Chủ",
                        "item": "https://www.angigio.com/"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Lịch Ăn Theo Tuần",
                        "item": "https://www.angigio.com/lich-an-theo-tuan"
                      }
                    ]
                  },
                  {
                    "@type": "FAQPage",
                    "@id": "https://www.angigio.com/lich-an-theo-tuan#faq",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "Lịch ăn tuần có thể tùy chỉnh từng món theo sở thích cá nhân không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Có! Bạn hoàn toàn có thể chủ động bấm nút đổi ngẫu nhiên cho từng bữa ăn riêng lẻ, hoặc nhấp vào nút cây bút (chỉnh sửa) để mở kho hơn 160 món chính thuần Việt và chọn chính xác món bạn muốn thưởng thức."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Thực đơn tuần có bị mất đi khi tôi đóng trình duyệt hoặc tắt máy không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Không hề! Toàn bộ lịch ăn tuần của bạn được hệ thống tự động lưu trữ trên bộ nhớ thiết bị (LocalStorage). Lần tới khi quay lại, thực đơn vẫn nguyên vẹn mà không yêu cầu bạn phải đăng ký tài khoản."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Làm sao để lịch ăn của tuần sau không bị trùng với các món vừa ăn tuần này?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Hệ thống đã tích hợp sẵn thuật toán xoay vòng đa tầng theo Calendar ISO Week, tự động ghi nhận các món bạn đã ăn tuần này và ưu tiên chọn các món mới lạ từ kho 160+ món chính để thực đơn luôn phong phú và không ngán."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Tôi có thể xuất lịch ăn để gửi cho gia đình hoặc đồng nghiệp không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Rất đơn giản! Bạn chỉ cần nhấn nút Sao chép lịch để copy toàn bộ thực đơn 7 ngày dán vào nhóm Zalo, Messenger, Threads hoặc bấm nút In lịch để in ra giấy dán tủ lạnh."
                        }
                      }
                    ]
                  }
                ]
              })
            }}
          />
        </div>
      </article>
    );
  }

  // Dedicated Rich SEO Editorial Guide for AI Culinary Assistant (Trợ Lý Gợi Ý Món Ăn)
  // Viết bằng giọng văn gần gũi, mộc mạc, sẻ chia nỗi niềm "Hôm nay ăn gì" của người dùng mỗi bữa
  if (activeTab === 'ai') {
    return (
      <article
        aria-label="Cẩm nang Trợ Lý Gợi Ý Món Ăn - Người Bạn Đồng Hành Cho Từng Bữa Cơm Ngon"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-10 sm:mb-14"
      >
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-12">
          
          {/* Header & Lead Hero Section */}
          <header className="border-b border-stone-100 pb-8 sm:pb-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight leading-snug mb-4">
              Trợ Lý Gợi Ý Món Ăn: Người Bạn Đồng Hành Gỡ Rối Câu Hỏi &quot;Hôm Nay Ăn Gì?&quot;
            </h2>
            
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-4">
              Mỗi ngày cứ đến bữa trưa hay bữa tối, câu hỏi quen thuộc nhất mà ai trong chúng ta cũng từng thở dài tự hỏi chính là: <strong>&quot;Hôm nay ăn gì bây giờ?&quot;</strong>. Mở các ứng dụng đặt đồ ăn lên lướt mỏi cả tay giữa hàng trăm quán xá, quay sang hỏi đồng nghiệp hay người thân thì ai cũng bảo <em>&quot;Ăn gì cũng được&quot;</em>. Rốt cuộc, bụng thì đói meo mà đầu óc vẫn luẩn quẩn chưa chọn xong món.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
              Hiểu được nỗi niềm rất đỗi đời thường ấy, <strong>Trợ Lý Gợi Ý Món Ăn</strong> của <em>Hôm Nay Ăn Gì</em> ra đời như một người bạn sành ăn kề bên. Không cần công thức phức tạp, chỉ cần bạn chia sẻ một chút về cảm xúc hôm nay, thời tiết ngoài trời se lạnh hay oi ả, túi tiền muốn chi tiêu, hay khẩu vị thích ăn thanh đạm... trợ lý sẽ gợi ý ngay cho bạn những món ngon chuẩn vị, dễ tìm và ấm lòng nhất.
            </p>

            {/* Quick Metrics Bar (Các điểm tựa thân quen) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Chọn Món Nhanh</div>
                <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">Trong Vài Giây</div>
                <div className="text-[11px] text-amber-700 font-medium">Không còn đau đầu nghĩ ngợi</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200/70">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Món Ngon 3 Miền</div>
                <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">160+ Món Thuần Việt</div>
                <div className="text-[11px] text-stone-600 font-medium">Từ cơm nhà đến bún phở</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Hợp Ví Tiền</div>
                <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">Vừa Túi &amp; Hợp Gu</div>
                <div className="text-[11px] text-emerald-700 font-medium">Từ bình dân đến tiệc tùng</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/70">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Giao Tận Cửa</div>
                <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">Quán Gần Quanh Bạn</div>
                <div className="text-[11px] text-blue-700 font-medium">ShopeeFood &amp; GrabFood</div>
              </div>
            </div>
          </header>

          {/* CẤU TRÚC 1: BẢNG SO SÁNH ĐỐI LẬP TRỰC QUAN GẦN GŨI */}
          <section className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  Chuyện Ăn Uống: Tự Đắn Đo So Với Có Bạn Gợi Ý Món
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Tại sao có một người bạn gợi ý món ăn lại giúp bữa cơm mỗi ngày của bạn vui vẻ hơn nhiều?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Cột 1: Cách chọn món cũ */}
              <div className="p-6 rounded-3xl bg-rose-50/40 border border-rose-200/70 relative flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-rose-200/60">
                    <span className="text-sm font-black text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                      <X className="w-4 h-4 text-rose-600" />
                      Những Lúc Tự Đắn Đo Chọn Món
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold">
                      Mệt Mỏi &amp; Tốn Giờ
                    </span>
                  </div>
                  
                  <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✕</div>
                      <span><strong>Lướt app đến hoa cả mắt:</strong> Mở ứng dụng giao hàng kéo lên kéo xuống 30-40 phút, xem qua hàng chục quán mà bụng đói meo vẫn chưa chốt được.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✕</div>
                      <span><strong>Ăn đi ăn lại vài món quen:</strong> Vì ngại nghĩ nên tuần nào cũng chỉ lặp lại cơm sườn, bún chả hay mì xào, lâu dần thấy bữa ăn nhạt nhẽo.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✕</div>
                      <span><strong>Đùn đẩy nhau khi đi ăn chung:</strong> Cả nhóm bạn hay đồng nghiệp cùng lúng túng câu &quot;Ăn gì cũng được&quot;, đứng tần ngần giữa trưa nắng.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✕</div>
                      <span><strong>Ăn uống thất thường:</strong> Quá giờ trưa đành gọi đại món nhiều dầu mỡ hay đồ ăn nhanh, vừa tốn kém vừa không tốt cho sức khỏe.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cột 2: Với Trợ Lý Gợi Ý */}
              <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-300/80 relative flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-200/80">
                    <span className="text-sm font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Khi Có Trợ Lý Gợi Ý Cùng Bạn
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Thảnh Thơi &amp; Ấm Bụng
                    </span>
                  </div>
                  
                  <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✓</div>
                      <span><strong>Chốt món nhẹ nhàng trong chớp mắt:</strong> Chỉ cần chọn vài mong muốn đơn giản, có ngay gợi ý món ngon chuẩn gu kèm lý do ấm lòng.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✓</div>
                      <span><strong>Đổi món mỗi ngày cho vị giác:</strong> Luân phiên kho tàng hơn 160 món Việt thân thương (món nước, cơm niêu, gỏi cuốn, lẩu nướng, đồ chay).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✓</div>
                      <span><strong>Hợp thời tiết và tâm trạng:</strong> Mưa lạnh nhớ bát phở nóng hổi, trưa nắng có bát canh chua thanh mát, làm việc mệt mỏi có món tiếp sức.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">✓</div>
                      <span><strong>Dễ dàng tìm quán gần bạn:</strong> Tự động tìm kiếm quán ngon quanh khu vực bạn ở trên GrabFood, ShopeeFood, BeFood để món giao tới còn nóng hổi.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CẤU TRÚC 2: 5 ĐIỀU NHỎ BÉ GIÚP CHỌN ĐÚNG MÓN BẠN THÍCH */}
          <section className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  5 Điều Nhỏ Bé Giúp Trợ Lý Hiểu Và Gợi Ý Đúng Gu Bạn
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Một bữa ăn trọn vẹn bắt nguồn từ sự thấu hiểu những điều bình dị quanh bạn:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Chiều 1: Tâm trạng */}
              <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200/90 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                    <Smile className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-1.5">
                    1. Tâm Trạng Hôm Nay Của Bạn
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Có những ngày bạn cảm thấy mệt mỏi vì công việc bận rộn, chỉ cần một bát phở bò bốc khói hay đĩa cơm niêu thơm giòn để tiếp thêm năng lượng. Lại có những ngày vui vẻ muốn rủ bạn bè nhâm nhi bún đậu mắm tôm hay đĩa ốc cay xè chuyện trò rôm rả.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] font-bold text-amber-800">
                  Gợi ý: Món ăn vỗ về cảm xúc &amp; nạp lại năng lượng
                </div>
              </div>

              {/* Chiều 2: Thời tiết */}
              <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200/90 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                    <ThermometerSun className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-1.5">
                    2. Tiết Trời Ngoài Phố
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Người Việt mình luôn thích ăn uống theo thời tiết. Trưa hè oi ả thèm bát canh cua mồng tơi ăn cùng cà pháo giòn tan, hay đĩa bún chả quạt than thơm lừng. Chiều thu đông mưa rả rích lại chẳng gì sánh bằng nồi lẩu riêu cua hay đĩa bánh xèo giòn rụm.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] font-bold text-blue-800">
                  Gợi ý: Món ăn điều hòa theo từng mùa trong năm
                </div>
              </div>

              {/* Chiều 3: Ngân sách */}
              <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200/90 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                    <Coins className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-1.5">
                    3. Vừa Vặn Chiếc Ví Của Bạn
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Dù hôm nay bạn là sinh viên tìm suất cơm bình dân 30.000đ - 45.000đ cuối tháng thật ấm bụng, hay nhân ngày lĩnh lương muốn tự thưởng cho mình và người thân một bữa ăn thịnh soạn 150.000đ - 300.000đ, trợ lý đều luôn có lựa chọn vừa vặn nhất.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] font-bold text-emerald-800">
                  Gợi ý: Từ đĩa cơm sinh viên đến mâm tiệc sum vầy
                </div>
              </div>

              {/* Chiều 4: Chế độ dinh dưỡng */}
              <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200/90 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-1.5">
                    4. Khẩu Vị &amp; Thói Quen Ăn Uống
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Bạn đang theo đuổi lối sống lành mạnh Eat Clean, ăn chay vào ngày mùng một rằm, muốn giảm dầu mỡ hay kiêng ăn cay? Trợ lý sẽ lắng nghe để chọn lọc những món thanh đạm, lành bụng mà vẫn giữ trọn vẹn hương vị thơm ngon của ẩm thực quê nhà.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] font-bold text-purple-800">
                  Gợi ý: Ăn chay, Eat Clean, lành bụng và thanh mát
                </div>
              </div>

              {/* Chiều 5: Vị trí & Bán kính giao hàng */}
              <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200/90 hover:border-orange-300 hover:shadow-xs transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-2">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-1.5">
                    5. Quán Ngon Tiện Đường Ngay Quanh Bạn
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Một món ăn ngon nhất là khi thưởng thức lúc còn nóng hổi. Không để chiếc bụng đói của bạn phải đợi lâu, trợ lý luôn ưu tiên tìm các món ăn phổ biến có quán gần nơi bạn ở (Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Cần Thơ...), tiện ghé quán ăn ngay hoặc đặt ship giao tới trong chớp mắt.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-bold text-orange-800">
                  <span>Tiện lợi đặt ngay: ShopeeFood, GrabFood, BeFood</span>
                  <span className="text-stone-500 font-normal">Ưu tiên quán gần bạn</span>
                </div>
              </div>
            </div>
          </section>

          {/* CẤU TRÚC 3: TRÌNH DIỄN HỘI THOẠI MẪU (PROMPT SHOWCASE GẦN GŨI) */}
          <section className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  Gợi Ý Câu Hỏi Thân Quen: Bạn Có Thể Hỏi Trợ Lý Như Thế Nào?
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Cứ nhắn tin thoải mái và tự nhiên như đang trò chuyện với một người bạn thân:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Kịch bản 1 */}
              <div className="p-5 rounded-3xl bg-stone-50/80 border border-stone-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Bữa Trưa Văn Phòng
                </div>
                <div className="p-3 bg-white rounded-2xl border border-stone-200/70 text-xs text-stone-800 font-medium italic shadow-2xs">
                  &quot;Trưa nay trời mưa se lạnh, ví còn khoảng 50k - 60k, ăn gì cho ấm bụng mà tỉnh táo làm việc chiều nhỉ?&quot;
                </div>
                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/60 text-xs text-stone-700 space-y-1">
                  <div className="font-bold text-orange-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Gợi ý: Cơm Niêu Bò Sốt Tiêu Đen
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Hương tiêu đen cay thơm nồng xua tan cái lạnh, thịt bò đậm đà ăn cùng lớp cơm cháy giòn rụm sẽ giúp bạn tỉnh táo suốt buổi chiều.
                  </p>
                </div>
              </div>

              {/* Kịch bản 2 */}
              <div className="p-5 rounded-3xl bg-stone-50/80 border border-stone-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Bữa Tối Nhẹ Bụng &amp; Lành Sạch
                </div>
                <div className="p-3 bg-white rounded-2xl border border-stone-200/70 text-xs text-stone-800 font-medium italic shadow-2xs">
                  &quot;Tối nay muốn ăn nhẹ nhàng thanh đạm, nhiều rau củ xanh, ít dầu mỡ để ngủ cho ngon giấc.&quot;
                </div>
                <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/60 text-xs text-stone-700 space-y-1">
                  <div className="font-bold text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Gợi ý: Gỏi Cuốn Tôm Thịt &amp; Canh Chua
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Tôm thịt luộc thanh ngọt cuốn cùng nhiều rau sống giòn mát chấm tương bùi, kèm thêm bát canh chua giải nhiệt nhẹ bụng.
                  </p>
                </div>
              </div>

              {/* Kịch bản 3 */}
              <div className="p-5 rounded-3xl bg-stone-50/80 border border-stone-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  Cuối Tuần Tụ Tập Bạn Bè
                </div>
                <div className="p-3 bg-white rounded-2xl border border-stone-200/70 text-xs text-stone-800 font-medium italic shadow-2xs">
                  &quot;Tối thứ 7 hội bạn 4 người muốn đi ăn gì vui vui lai rai, tầm 120k mỗi người quanh khu vực này.&quot;
                </div>
                <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-200/60 text-xs text-stone-700 space-y-1">
                  <div className="font-bold text-blue-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Gợi ý: Nồi Lẩu Riêu Cua Bắp Bò
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Nước dùng chua thanh đậm vị từ giấm bỗng, riêu cua thơm nức và đĩa bắp bò nhúng giòn sần sật, vừa ăn vừa chuyện trò rôm rả.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CẤU TRÚC 4: FAQ CHUYÊN SÂU 2 CỘT GẦN GŨI (THAY THẾ ACCORDION THƯỜNG) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  Những Điều Bạn Có Thể Thắc Mắc Về Trợ Lý Gợi Ý Món Ăn (FAQ)
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Giải đáp chi tiết và chân thành những câu hỏi thường gặp khi dùng tiện ích:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">1</span>
                  <span>Trợ lý gợi ý món ăn dựa vào những thông tin gì?</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Trợ lý sẽ lắng nghe thời điểm trong ngày (bữa sáng, trưa hay tối), mức tiền bạn muốn chi, cảm xúc hiện tại của bạn, thời tiết bên ngoài và cả những mong muốn riêng như thích ăn thanh đạm, ăn chay hay hạn chế đồ dầu mỡ.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">2</span>
                  <span>Món ăn được gợi ý có dễ tìm mua trên các app giao hàng không?</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Rất dễ tìm! Toàn bộ hơn 160 món ăn trong danh sách đều là những món ăn quen thuộc, phổ biến khắp mọi ngõ phố Việt Nam. Kèm theo mỗi món luôn có sẵn nút mở nhanh ShopeeFood, GrabFood hoặc BeFood để bạn đặt ngay.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">3</span>
                  <span>Dùng trợ lý gợi ý món ăn có mất phí hay bắt buộc đăng ký không?</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Hoàn toàn miễn phí và không cần đăng ký tài khoản! Bạn có thể thoải mái hỏi và nhận gợi ý món ăn bao nhiêu lần tùy thích mỗi ngày mà không bị làm phiền bởi quảng cáo.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">4</span>
                  <span>Nếu mình bị dị ứng đồ ăn hay ăn chay thì trợ lý có giúp được không?</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Chắc chắn có! Bạn chỉ cần gõ yêu cầu như &quot;mình không ăn được hải sản&quot;, &quot;hôm nay mình ăn chay&quot; hay &quot;không ăn cay&quot;, trợ lý sẽ tự động chọn lọc những món an toàn và thơm ngon nhất cho bạn.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">5</span>
                  <span>Trợ lý có biết mình ở thành phố nào để gợi ý đúng món địa phương không?</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Có! Bạn có thể chọn nhanh tỉnh/thành phố trên thanh menu hoặc cho phép định vị. Trợ lý sẽ ưu tiên những món ăn mang nét đặc sắc và các quán ngon đúng điệu quanh nơi bạn sinh sống.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h3 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">6</span>
                  <span>Nếu muốn tự nấu cơm tại nhà thì có xem được nguyên liệu không?</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Có sẵn luôn! Mỗi món ăn đều có ghi rõ nguyên liệu chính, mức calo ước tính và mẹo nhỏ khi ăn giúp bạn dễ dàng ghé chợ mua đồ và vào bếp nấu bữa cơm ấm cúng cho gia đình.
                </p>
              </div>
            </div>
          </section>

          {/* CẤU TRÚC 5: HỆ SINH THÁI KHÁM PHÁ THÊM (INTERNAL CROSS-LINKING) */}
          <section className="pt-6 border-t border-stone-100">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-600" />
              <span>Khám Phá Thêm Những Cách Chọn Món Thú Vị Khác</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="/"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('tarot');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Tarot Ẩm Thực
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Quẻ bói 12 cung hoàng đạo &amp; lá bùa may mắn
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/vong-quay"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('wheel');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Vòng Quay Ăn Gì
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Chốt món ngẫu nhiên vui vẻ trong 3 giây
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/lich-an-theo-tuan"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('planner');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Lịch Ăn Tuần
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Thực đơn 7 ngày ngon miệng &amp; không lo trùng món
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </section>

          {/* Structured Data (Schema.org JSON-LD for AI Culinary Assistant) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebPage",
                    "@id": "https://www.angigio.com/ai-goi-y-mon-an#webpage",
                    "url": "https://www.angigio.com/ai-goi-y-mon-an",
                    "name": "Trợ Lý Gợi Ý Món Ăn - Người Bạn Đồng Hành Bữa Cơm Ngon | Hôm Nay Ăn Gì",
                    "description": "Trợ lý gợi ý món ăn thông minh và gần gũi, giúp bạn chọn món theo tâm trạng, thời tiết, ngân sách và khẩu vị, kết nối tìm quán ngon gần nhất.",
                    "inLanguage": "vi-VN",
                    "isPartOf": {
                      "@type": "WebSite",
                      "@id": "https://www.angigio.com/#website",
                      "name": "Hôm Nay Ăn Gì",
                      "url": "https://www.angigio.com/"
                    }
                  },
                  {
                    "@type": "SoftwareApplication",
                    "name": "Trợ Lý Gợi Ý Món Ăn - Hôm Nay Ăn Gì",
                    "operatingSystem": "Web, iOS, Android",
                    "applicationCategory": "FoodAndDrinkApplication",
                    "offers": {
                      "@type": "Offer",
                      "price": "0",
                      "priceCurrency": "VND"
                    },
                    "description": "Người bạn đồng hành giải đáp câu hỏi Hôm nay ăn gì mỗi ngày"
                  },
                  {
                    "@type": "BreadcrumbList",
                    "@id": "https://www.angigio.com/ai-goi-y-mon-an#breadcrumb",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Trang Chủ",
                        "item": "https://www.angigio.com/"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Trợ Lý Gợi Ý Món Ăn",
                        "item": "https://www.angigio.com/ai-goi-y-mon-an"
                      }
                    ]
                  },
                  {
                    "@type": "FAQPage",
                    "@id": "https://www.angigio.com/ai-goi-y-mon-an#faq",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "Trợ lý gợi ý món ăn dựa vào những thông tin gì?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Trợ lý sẽ lắng nghe thời điểm trong ngày (bữa sáng, trưa hay tối), mức tiền bạn muốn chi, cảm xúc hiện tại của bạn, thời tiết bên ngoài và cả những mong muốn riêng như thích ăn thanh đạm, ăn chay hay hạn chế đồ dầu mỡ."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Món ăn được gợi ý có dễ tìm mua trên các app giao hàng không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Rất dễ tìm! Toàn bộ hơn 160 món ăn trong danh sách đều là những món ăn quen thuộc, phổ biến khắp mọi ngõ phố Việt Nam. Kèm theo mỗi món luôn có sẵn nút mở nhanh ShopeeFood, GrabFood hoặc BeFood để bạn đặt ngay."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Dùng trợ lý gợi ý món ăn có mất phí hay bắt buộc đăng ký không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Hoàn toàn miễn phí và không cần đăng ký tài khoản! Bạn có thể thoải mái hỏi và nhận gợi ý món ăn bao nhiêu lần tùy thích mỗi ngày mà không bị làm phiền bởi quảng cáo."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Nếu mình bị dị ứng đồ ăn hay ăn chay thì trợ lý có giúp được không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Chắc chắn có! Bạn chỉ cần gõ yêu cầu như 'mình không ăn được hải sản', 'hôm nay mình ăn chay' hay 'không ăn cay', trợ lý sẽ tự động chọn lọc những món an toàn và thơm ngon nhất cho bạn."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Trợ lý có biết mình ở thành phố nào để gợi ý đúng món địa phương không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Có! Bạn có thể chọn nhanh tỉnh/thành phố trên thanh menu hoặc cho phép định vị. Trợ lý sẽ ưu tiên những món ăn mang nét đặc sắc và các quán ngon đúng điệu quanh nơi bạn sinh sống."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Nếu muốn tự nấu cơm tại nhà thì có xem được nguyên liệu không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Có sẵn luôn! Mỗi món ăn đều có ghi rõ nguyên liệu chính, mức calo ước tính và mẹo nhỏ khi ăn giúp bạn dễ dàng ghé chợ mua đồ và vào bếp nấu bữa cơm ấm cúng cho gia đình."
                        }
                      }
                    ]
                  }
                ]
              })
            }}
          />
        </div>
      </article>
    );
  }

  // Dedicated Rich SEO Editorial Guide for Dish Catalog (Thực Đơn 160+ Món Ngon Việt Nam)
  if (activeTab === 'catalog') {
    return (
      <article
        aria-label="Cẩm nang Thực Đơn 160+ Món Ngon 3 Miền & Bách Khoa Toàn Thư Ẩm Thực Việt Nam"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-10 sm:mb-14"
      >
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10 space-y-10">
          
          {/* Header & Lead */}
          <header className="border-b border-stone-100 pb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3.5 border border-orange-200/60">
              <Utensils className="w-3.5 h-3.5 text-orange-600" />
              <span>BÁCH KHOA TOÀN THƯ ẨM THỰC 3 MIỀN VIỆT NAM</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight mb-4">
              Thực Đơn Món Ngon 3 Miền: Tuyển Tập 160+ Đặc Sản Việt Nam Chuẩn Vị
            </h2>
            
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-4">
              Nền ẩm thực Việt Nam là một bức tranh muôn màu rực rỡ với sự hòa quyện hoàn hảo giữa hương thơm thảo mộc tươi mát, vị mặn mòi của nước mắm cá cơm truyền thống và nghệ thuật cân bằng âm dương ngũ hành. Bách khoa toàn thư <strong className="text-orange-600 font-bold">160+ Món Ngon 3 Miền</strong> của chúng tôi được dày công chọn lọc nhằm mang đến cho bạn danh mục món ăn phong phú, từ những bát phở Hà Nội nước trong ngọt thanh, đĩa cơm tấm Sài Gòn sườn bì chả mỡ hành thơm ngậy, cho đến tô bún bò xứ Huế cay nồng thơm lừng mùi sả.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Mỗi món ăn đều được tổng hợp đầy đủ thông tin dinh dưỡng hữu ích: lượng calo ước tính, phân loại bữa ăn (sáng, trưa, xế chiều, tối, ăn đêm), tầm giá trung bình, thành phần nguyên liệu chính và gợi ý các món ăn kèm tròn vị nhất. Đặc biệt, bạn có thể bấm đặt món ngay trên ShopeeFood, GrabFood hoặc BeFood với định vị quán chuẩn xác gần vị trí của bạn.
            </p>
          </header>

          {/* 4 Giá Trị Nổi Bật Của Danh Mục Món Ngon */}
          <section>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-600" />
              <span>4 Lợi Ích Vượt Trội Khi Tra Cứu Thực Đơn Món Ngon</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-700 flex items-center justify-center font-bold mb-3">
                    <Utensils className="w-5 h-5 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    1. 160+ Món Ngon Chọn Lọc
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Bao quát trọn vẹn đặc sản 3 miền Bắc - Trung - Nam, từ món nước giải nhiệt, cơm văn phòng chắc bụng đến đồ ăn vặt xế chiều và lẩu nướng sum vầy.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold mb-3">
                    <Flame className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    2. Minh Bạch Calo & Dinh Dưỡng
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Cung cấp mức calo ước tính chuẩn khoa học cho từng khẩu phần, hỗ trợ hiệu quả cho người đang tập gym, giảm mỡ hoặc theo đuổi chế độ ăn lành mạnh.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold mb-3">
                    <Coins className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    3. Khoảng Giá Phù Hợp Ví Tiền
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Phân khúc giá rõ ràng từ 25.000đ cho sinh viên đến các set ăn liên hoan, giúp bạn chủ động chi tiêu hợp lý mà bữa ăn vẫn luôn thịnh soạn.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold mb-3">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-base mb-1.5">
                    4. Đặt Món Ship Nhanh 1 Chạm
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Tích hợp nút kết nối trực tiếp đến ShopeeFood, GrabFood và BeFood theo địa bàn bạn sinh sống, giao đồ ăn còn nóng hổi tới tận cửa nhà.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Phân Loại 6 Nhóm Món Ăn Tiêu Biểu */}
          <section className="bg-stone-50/70 p-6 sm:p-8 rounded-2xl border border-stone-200/70">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-600" />
              <span>Khám Phá Các Nhóm Ẩm Thực Đặc Trưng Của Bữa Cơm Việt</span>
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
              Để bạn dễ dàng tìm kiếm theo sở thích và hoàn cảnh, 160+ món ngon được phân chia thành các nhóm ẩm thực khoa học và dễ lựa chọn:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍚</span>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                    Cơm & Xôi Chắc Bụng
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Trọng tâm của bữa trưa và bữa tối gia đình: Cơm tấm sườn bì chả, cơm gà Hội An, cơm niêu cá kho tộ, xôi xéo gà xé, xôi khúc bùi béo dẻo thơm.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍜</span>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                    Bún, Phở & Mì Đậm Vị
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Lựa chọn hoàn hảo cho bữa sáng hoặc đổi gió ngày nóng: Phở bò tái nạm, bún chả Hà Nội, bún bò Huế, bánh đa cua Hải Phòng, hủ tiếu Nam Vang.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🥖</span>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                    Bánh Mì & Món Cuốn
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Nhanh gọn, tiện lợi và giàu rau xanh: Bánh mì pate trứng chả giòn rụm, gỏi cuốn tôm thịt, phở cuốn thanh mát chấm nước mắm chua ngọt.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍲</span>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                    Lẩu & Cháo Ấm Lòng
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Lý tưởng cho những buổi tụ tập hay ngày mưa lạnh: Lẩu riêu cua bắp bò, lẩu gà lá é, lẩu mắm miền Tây, cháo sườn sụn, cháo ếch Singapore.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🍗</span>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                    Nướng & Chiên Giòn Rụm
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Khơi dậy vị giác cho bữa tối rộn ràng: Nem nướng Nha Trang, bò nướng lá lốt, gà rán giòn cay, cánh gà chiên mắm thơm ngậy.
                </p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200/80">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🥬</span>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                    Món Chay Thanh Tịnh
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Nhẹ bụng, thanh lọc cơ thể cho ngày rằm mùng một: Cơm hạt sen nấm đông cô, bún riêu chay tàu hũ ky, lẩu nấm dưỡng sinh bổ dưỡng.
                </p>
              </div>
            </div>
          </section>

          {/* Bí Quyết Cân Bằng Dinh Dưỡng Bữa Cơm Việt */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-emerald-600" />
              <span>Quy Tắc Vàng Giúp Bữa Ăn Ngon Miệng Mà Không Lo Tăng Cân</span>
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Theo các chuyên gia dinh dưỡng, một bữa ăn hoàn chỉnh nên tuân thủ nguyên tắc &quot;Chiếc đĩa lành mạnh&quot; (Healthy Plate):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl border border-stone-200 bg-white">
                <div className="text-xs font-bold text-emerald-700 uppercase mb-1">50% Rau Củ & Chất Xơ</div>
                <div className="text-sm font-semibold text-stone-900 mb-1">Canh rau & Rau luộc</div>
                <p className="text-xs text-stone-500">Giúp làm chậm quá trình hấp thu đường, tạo cảm giác no lâu và cung cấp vitamin dồi dào.</p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-white">
                <div className="text-xs font-bold text-orange-700 uppercase mb-1">25% Chất Đạm (Protein)</div>
                <div className="text-sm font-semibold text-stone-900 mb-1">Thịt nạc, Cá & Trứng</div>
                <p className="text-xs text-stone-500">Nuôi dưỡng cơ bắp, hỗ trợ trao đổi chất và duy trì năng lượng làm việc suốt buổi chiều.</p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-white">
                <div className="text-xs font-bold text-amber-700 uppercase mb-1">25% Tinh Bột Phức Hợp</div>
                <div className="text-sm font-semibold text-stone-900 mb-1">Cơm, Bún, Khoai lang</div>
                <p className="text-xs text-stone-500">Cung cấp glucose cho não bộ hoạt động linh hoạt, ưu tiên các loại ngũ cốc nguyên cám.</p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-white">
                <div className="text-xs font-bold text-blue-700 uppercase mb-1">Đủ Nước & Khoáng Chất</div>
                <div className="text-sm font-semibold text-stone-900 mb-1">Nước lọc & Nước canh</div>
                <p className="text-xs text-stone-500">Thưởng thức một bát canh thanh mát cuối bữa giúp hệ tiêu hóa vận hành trơn tru và dễ chịu.</p>
              </div>
            </div>
          </section>

          {/* FAQ Chuyên Sâu Chuẩn Schema */}
          <section className="pt-6 border-t border-stone-100">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Câu Hỏi Thường Gặp Về Thực Đơn Món Ngon (FAQ)
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">1</span>
                  <span>Danh mục 160+ món ăn này được tổng hợp dựa trên tiêu chí nào?</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Toàn bộ món ăn được đội ngũ biên tập chọn lọc kỹ lưỡng dựa trên mức độ phổ biến, sự đón nhận của thực khách ba miền và tính sẵn có trên các ứng dụng giao thức ăn tại các thành phố lớn (Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Cần Thơ...). Bạn hoàn toàn yên tâm sẽ dễ dàng tìm thấy quán phục vụ ngon miệng ngay gần mình.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">2</span>
                  <span>Mức calo hiển thị trên mỗi món ăn có chuẩn xác không?</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Lượng calo được ước tính dựa trên khẩu phần tiêu chuẩn của Viện Dinh Dưỡng Quốc Gia và các bảng tra cứu thực phẩm Việt Nam. Tùy thuộc vào cách nêm nếm gia vị, lượng dầu mỡ hoặc các món ăn kèm của từng quán ăn cụ thể, con số này có thể chênh lệch khoảng 10 - 15%, đủ tin cậy để bạn theo dõi năng lượng nạp vào mỗi ngày.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">3</span>
                  <span>Làm thế nào để tìm quán ngon bán đúng món ăn quanh khu vực của tôi?</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Rất đơn giản! Bạn chỉ cần nhấn vào bất kỳ món ăn nào bạn thích, bấm nút &quot;Đặt Món Ngay&quot; và chọn ứng dụng giao hàng bạn yêu thích (ShopeeFood, GrabFood hoặc BeFood). Nếu bạn đã cấp quyền định vị hoặc chọn khu vực ở thanh đầu trang, hệ thống sẽ mở danh sách quán ăn gần bạn nhất kèm đánh giá sao và cự ly ship.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">4</span>
                  <span>Tôi đang ăn chay hoặc ăn kiêng thì có bộ lọc món riêng không?</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Có! Ngay phía trên danh sách món ăn, bạn có thể bấm vào tab &quot;Đồ chay&quot; hoặc &quot;Salad & món nhẹ&quot; để lọc nhanh các món ăn thanh đạm, giàu chất xơ và không chứa thịt. Ngoài ra, bạn cũng có thể gõ các từ khóa như &quot;chay&quot;, &quot;healthy&quot;, &quot;nấm&quot; vào thanh tìm kiếm để tra cứu trong 1 giây.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">5</span>
                  <span>Tôi có thể đưa các món ăn yêu thích này vào Lịch Ăn Tuần không?</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Chắc chắn có! Toàn bộ 160+ món ăn trong danh mục đều được liên kết đồng bộ với tính năng Lịch Ăn Tuần. Khi xem thực đơn tuần, bạn có thể bấm nút &quot;Đổi Món&quot; ở bất kỳ bữa ăn nào để chọn ngay món ăn bạn thích từ danh mục này.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">6</span>
                  <span>Trang web có thu phí tra cứu hay xem công thức món ăn không?</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pl-7">
                  Hoàn toàn miễn phí 100%! Bạn có thể tra cứu món ăn, xem dinh dưỡng, bốc bài Tarot, quay vòng quay hay tạo lịch ăn tuần không giới hạn mà không phải trả bất kỳ chi phí nào.
                </p>
              </div>
            </div>
          </section>

          {/* CẤU TRÚC: HỆ SINH THÁI KHÁM PHÁ THÊM (INTERNAL CROSS-LINKING) */}
          <section className="pt-6 border-t border-stone-100">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-600" />
              <span>Khám Phá Thêm Những Cách Chọn Món Thú Vị Khác</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="/"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('tarot');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Tarot Ẩm Thực
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Quẻ bói 12 cung hoàng đạo &amp; lá bùa may mắn
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/vong-quay"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('wheel');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Vòng Quay Ăn Gì
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Chốt món ngẫu nhiên vui vẻ trong 3 giây
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="/lich-an-theo-tuan"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('planner');
                  }
                }}
                className="p-4 rounded-2xl bg-stone-50/80 hover:bg-orange-50/80 border border-stone-200/80 hover:border-orange-200 transition-all group flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-stone-900 group-hover:text-orange-600 text-sm">
                    Lịch Ăn Tuần
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Thực đơn 7 ngày ngon miệng &amp; không lo trùng món
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </section>

          {/* Structured Data (Schema.org JSON-LD for Dish Catalog) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebPage",
                    "@id": "https://www.angigio.com/mon-ngon#webpage",
                    "url": "https://www.angigio.com/mon-ngon",
                    "name": "Thực Đơn 160+ Món Ngon Việt Nam - Món Ngon 3 Miền Chuẩn Vị | Hôm Nay Ăn Gì",
                    "description": "Bách khoa toàn thư ẩm thực với hơn 160 món ngon đặc sản 3 miền Bắc - Trung - Nam, minh bạch calo, nguyên liệu, tầm giá và đặt ship ShopeeFood, GrabFood.",
                    "inLanguage": "vi-VN",
                    "isPartOf": {
                      "@type": "WebSite",
                      "@id": "https://www.angigio.com/#website",
                      "name": "Hôm Nay Ăn Gì",
                      "url": "https://www.angigio.com/"
                    }
                  },
                  {
                    "@type": "BreadcrumbList",
                    "@id": "https://www.angigio.com/mon-ngon#breadcrumb",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Trang Chủ",
                        "item": "https://www.angigio.com/"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Thực Đơn Món Ngon",
                        "item": "https://www.angigio.com/mon-ngon"
                      }
                    ]
                  },
                  {
                    "@type": "FAQPage",
                    "@id": "https://www.angigio.com/mon-ngon#faq",
                    "mainEntity": [
                      {
                        "@type": "Question",
                        "name": "Danh mục 160+ món ăn này được tổng hợp dựa trên tiêu chí nào?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Toàn bộ món ăn được đội ngũ biên tập chọn lọc kỹ lưỡng dựa trên mức độ phổ biến, sự đón nhận của thực khách ba miền và tính sẵn có trên các ứng dụng giao thức ăn tại các thành phố lớn."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Mức calo hiển thị trên mỗi món ăn có chuẩn xác không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Lượng calo được ước tính dựa trên khẩu phần tiêu chuẩn của Viện Dinh Dưỡng Quốc Gia và các bảng tra cứu thực phẩm Việt Nam, đủ tin cậy để bạn theo dõi năng lượng nạp vào mỗi ngày."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Làm thế nào để tìm quán ngon bán đúng món ăn quanh khu vực của tôi?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Bạn chỉ cần nhấn vào món ăn bất kỳ và chọn ứng dụng giao hàng bạn yêu thích (ShopeeFood, GrabFood, BeFood). Hệ thống sẽ mở danh sách quán ăn gần bạn nhất kèm đánh giá sao và cự ly ship."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Tôi đang ăn chay hoặc ăn kiêng thì có bộ lọc món riêng không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Có! Ngay phía trên danh sách món ăn, bạn có thể bấm vào tab 'Đồ chay' hoặc 'Salad & món nhẹ' để lọc nhanh các món ăn thanh đạm, giàu chất xơ và không chứa thịt."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Tôi có thể đưa các món ăn yêu thích này vào Lịch Ăn Tuần không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Chắc chắn có! Toàn bộ 160+ món ăn trong danh mục đều được liên kết đồng bộ với tính năng Lịch Ăn Tuần, cho phép bạn đổi món linh hoạt theo sở thích."
                        }
                      },
                      {
                        "@type": "Question",
                        "name": "Trang web có thu phí tra cứu hay xem công thức món ăn không?",
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": "Hoàn toàn miễn phí 100%! Bạn có thể tra cứu món ăn, xem dinh dưỡng, bốc bài Tarot, quay vòng quay hay tạo lịch ăn tuần không giới hạn số lần."
                        }
                      }
                    ]
                  }
                ]
              })
            }}
          />
        </div>
      </article>
    );
  }

  // Standard FAQ section for other tabs fallback
  const data = COMMON_FAQ_DATA[activeTab];
  if (!data) return null;

  return (
    <section
      aria-label="Nội dung giới thiệu & Câu hỏi thường gặp"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-10 sm:mb-14"
    >
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10">
        {/* Editorial Content Section */}
        <div className="mb-8 pb-8 border-b border-stone-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" />
            <span>{data.badge}</span>
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
              Câu Hỏi Thường Gặp
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
