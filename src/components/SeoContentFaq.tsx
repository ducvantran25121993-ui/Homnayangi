import React, { useState, useEffect } from 'react';
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
  Sliders,
  CupSoda,
  Cookie
} from 'lucide-react';
import { TabType, DiscoverSubSection, getDiscoverSubSectionFromUrl } from '../utils/navigation';
import { getRegionFromUrl, getRegionById, isRegionPath } from '../data/regionalCuisine';
import { INITIAL_DISHES } from '../data/dishes';

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
  snacks: {
    badge: 'THẾ GIỚI ĂN VẶT & ĐỒ UỐNG',
    title: 'Đồ Uống & Ăn Vặt Giờ Xế Chiều: Trà Sữa, Cà Phê & Bánh Tráng Chuẩn Gu',
    desc: 'Cứ mỗi 3 - 4 giờ chiều lại buồn miệng? Khám phá trọn bộ trà sữa trân châu hoàng gia, cà phê muối béo ngậy, trà đào cam sả cùng bánh tráng trộn sa tế, nem chua rán, bánh tráng nướng Đà Lạt giòn rụm với liên kết đặt món hỏa tốc gần bạn.',
    faqs: [
      {
        question: 'Chuyên mục Đồ Uống & Ăn Vặt gồm những món nào?',
        answer:
          'Chuyên mục tập hợp đầy đủ các dòng trà sữa trân châu, trà trái cây tươi, cà phê truyền thống, sinh tố nước ép giải nhiệt cùng các món ăn vặt đường phố hot trend như bánh tráng trộn, bánh tráng nướng, bắp xào tép mỡ, nem chua rán, chân gà sả tắc...',
      },
      {
        question: 'Làm thế nào để lọc món theo mức giá túi tiền học sinh, sinh viên?',
        answer:
          'Trang tích hợp bộ lọc nhanh thông minh: Dưới 30k, từ 30k - 50k và trên 50k, giúp bạn dễ dàng chọn món hợp khẩu vị lẫn ngân sách trong nháy mắt.',
      },
      {
        question: 'Đặt ship đồ uống và đồ ăn vặt qua ứng dụng nào nhanh nhất?',
        answer:
          'Tại mỗi món, bạn có thể bấm trực tiếp vào biểu tượng ShopeeFood, GrabFood, BeFood hoặc Google Maps để hệ thống tự động tìm các quán trà sữa và quán ăn vặt gần bạn nhất với nhiều mã freeship.',
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

interface DiscoverEditorialSection {
  heading: string;
  paragraphs: string[];
  cards?: {
    tag?: string;
    title: string;
    desc: string;
  }[];
  quote?: string;
}

interface DiscoverSeoItem {
  badge: string;
  title: string;
  desc: string;
  schemaUrl: string;
  sections?: DiscoverEditorialSection[];
  faqs: FaqItem[];
}

const DISCOVER_SEO_DETAILS: Record<string, DiscoverSeoItem> = {
  bac: {
    badge: 'CẨM NANG ẨM THỰC MIỀN BẮC',
    title: 'Ẩm Thực Miền Bắc: Tinh Hoa Vị Giác Kinh Kỳ, Thanh Tao & Hài Hòa Đất Tràng An',
    desc: 'Ẩm thực miền Bắc mang chiều sâu văn hóa ngàn năm Thăng Long - Hà Nội, nổi bật với triết lý cân bằng âm dương và nghệ thuật nêm nếm gia vị vừa vặn, không thiên quá ngọt, không quá béo cũng không cay gắt. Tinh hoa món Bắc nằm ở vị ngọt nguyên bản từ nước hầm xương ống, hương thơm ấm nồng của tiêu bắc, gừng già, hành hoa và vị chua thanh tao từ giấm bỗng nếp lên men tự nhiên. Thưởng thức món Bắc là thưởng thức sự cầu kỳ, tinh tế từ thị giác đến khứu giác, từ bát phở bò bốc khói nghi ngút, đĩa bún chả thơm nức than hoa đến mẹt bún đậu mắm tôm nồng đượm vị phố cổ.',
    schemaUrl: 'https://www.angigio.com/am-thuc-mien-bac',
    sections: [
      {
        heading: '1. Triết Lý Ẩm Thực Kinh Kỳ & Nghệ Thuật Nêm Nếm Cân Bằng Âm Dương',
        paragraphs: [
          'Nền ẩm thực đất Tràng An không chỉ là việc chế biến món ăn mà là một phong cách sống, một nghệ thuật giao hòa giữa con người với bốn mùa xuân hạ thu đông. Người miền Bắc đặc biệt coi trọng sự chuẩn mực và cân bằng: món ăn thanh tao nhưng không hề nhạt nhẽo, đậm đà mà không nồng gắt, béo nhưng không ngấy.',
          'Để đạt được đỉnh cao của vị ngọt thanh tự nhiên, người đầu bếp kinh kỳ kiên trì hầm xương ống hàng giờ liền ở mức lửa nhỏ liu riu thay vì lạm dụng phụ gia hay đường ngọt. Vị chua trong món Bắc cũng mang sắc thái riêng biệt: chua dịu êm từ giấm bỗng nếp lên men tự nhiên, chua thanh mát từ quả sấu đầu mùa, hay vị chua giòn từ tai chua phơi khô.'
        ],
        cards: [
          {
            tag: 'VỊ GIÁC CHỦ ĐẠO',
            title: 'Thanh Đạm & Nguyên Bản',
            desc: 'Tôn vinh trọn vẹn vị ngọt tinh khiết của nguyên liệu tươi sống, tiết chế gia vị gắt để giữ sự hài hòa dễ chịu.'
          },
          {
            tag: 'GIA VỊ LINH HỒN',
            title: 'Giấm Bỗng & Mắm Tôm',
            desc: 'Hèm rượu nếp lên men cùng mắm tôm Thanh Hóa đánh sủi bọt quất ớt tạo chiều sâu vị giác khó quên.'
          },
          {
            tag: 'THẢO MỘC ĐẶC SẢN',
            title: 'Rau Thơm Bản Địa',
            desc: 'Mỗi món ăn luôn gắn liền với một loại rau thơm tương ứng: chả cá với thì là, bún ốc với tía tô, bún chả với kinh giới.'
          }
        ],
        quote: 'Nước dùng phở bò và bún ốc miền Bắc muốn trong vắt, thơm thanh thì xương phải nướng qua, luộc trần sạch máu bầm và ninh mở vung. Chỉ nêm nước mắm cốt ngon ở những phút cuối cùng để nước dùng không bị chua gắt.'
      },
      {
        heading: '2. Những Món Ăn Làm Nên Hồn Cốt Ẩm Thực Đất Bắc',
        paragraphs: [
          'Nhắc đến miền Bắc là nhắc đến những món ăn đã vượt qua ranh giới địa lý để trở thành biểu tượng quốc hồn quốc túy trên bản đồ ẩm thực thế giới. Từng món ăn mang theo câu chuyện văn hóa phố phường, từ góc phố cổ Hà Nội đến làng quê đồng bằng Bắc Bộ.',
          'Sự tinh tế còn thể hiện ở cách bài trí: mẹt bún đậu xanh mướt lá chuối, bát bún thang rực rỡ như một bức tranh ngũ sắc, hay đĩa bánh cuốn tráng mỏng tang điểm xuyết những lát hành phi giòn rụm thơm lừng.'
        ],
        cards: [
          {
            tag: 'BIỂU TƯỢNG KINH KỲ',
            title: 'Phở Bò Hà Nội',
            desc: 'Bánh phở mềm mướt, thịt bò tái lăn mềm ngọt hòa cùng nước dùng hầm xương ống thơm ngào ngạt quế, hồi, gừng nướng.'
          },
          {
            tag: 'ĐẬM ĐÀ THAN HOA',
            title: 'Bún Chả Nướng Que Tre',
            desc: 'Chả miếng ba chỉ giòn xém cạnh, chả băm kẹp que tre đượm mùi khói nướng, chấm nước mắm giấm đường ấm nóng.'
          },
          {
            tag: 'ĐẲNG CẤP HOÀNG GIA',
            title: 'Chả Cá Lã Vọng',
            desc: 'Cá lăng ướp riềng mẻ nướng vàng rồi xào lăn trên chảo nóng cùng hành hoa, thì là ngập tràn hương sắc.'
          },
          {
            tag: 'CẦU KỲ TỈ MỈ',
            title: 'Bún Thang Phố Cổ',
            desc: 'Bức tranh ẩm thực kết hợp từ giò lụa thái chỉ, gà xé, trứng tráng mỏng sợi, nấm hương và củ cải dầm chua ngọt.'
          },
          {
            tag: 'DÂN DÃ PHỐ PHƯỜNG',
            title: 'Bún Đậu Mắm Tôm',
            desc: 'Đậu phụ Mơ chiên vàng lướt ván giòn tan, chả cốm dẻo quánh, thịt luộc chân giò chấm mắm tôm quất ớt sủi bọt.'
          },
          {
            tag: 'MỀM MƯỚT THANH TAO',
            title: 'Bánh Cuốn Thanh Trì',
            desc: 'Từng lớp bánh tráng mỏng như cánh ve, thoa lớp mỡ hành bóng bẩy, chấm nước mắm cà cuống thơm lừng khó cưỡng.'
          }
        ]
      },
      {
        heading: '3. Mùa Nào Thức Nấy: Nghệ Thuật Thưởng Thức Theo Tiết Trời 4 Mùa',
        paragraphs: [
          'Khác với miền Nam chỉ có hai mùa mưa nắng, miền Bắc đón trọn vẹn 4 mùa xuân, hạ, thu, đông rõ rệt. Chính sự biến chuyển nhịp nhàng của đất trời đã tạo nên thói quen ăn uống thuận tự nhiên: mùa hè thanh nhiệt giải độc, mùa đông giữ ấm bồi bổ, mùa thu tận hưởng sản vật thanh tao và mùa xuân sum vầy ấm cúng.'
        ],
        cards: [
          {
            tag: 'MÙA XUÂN',
            title: 'Ấm Cúng & Sum Vầy',
            desc: 'Bánh chưng xanh, canh măng hầm chân giò, dưa hành giòn chua và xôi gấc đỏ tươi cầu may mắn thịnh vượng.'
          },
          {
            tag: 'MÙA HẠ',
            title: 'Thanh Mát & Giải Nhiệt',
            desc: 'Canh cua đồng mồng tơi mướp hương ăn kèm cà pháo, bún ốc giấm bỗng chua dịu xua tan cái nắng oi ả.'
          },
          {
            tag: 'MÙA THU',
            title: 'Hương Sắc Lãng Mạn',
            desc: 'Cốm non làng Vòng dẻo thơm hạt ngọc, chả rươi đượm vỏ quýt nồng nàn và hồng ngâm giòn ngọt đầu mùa.'
          },
          {
            tag: 'MÙA ĐÔNG',
            title: 'Nồng Ấm Tê Tái',
            desc: 'Nồi lẩu riêu cua bắp bò sườn sụn bốc khói nghi ngút, đĩa thịt đông dưa cải chua và bát chè sắn nóng dẻo ấm lòng.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Ẩm thực miền Bắc có nét đặc trưng gì khác biệt so với miền Trung và miền Nam?',
        answer: 'Ẩm thực miền Bắc chuộng sự thanh đạm, hài hòa và tiết chế gia vị tối đa để tôn vinh vị ngọt tự nhiên của nguyên liệu tươi sống. Nước dùng miền Bắc thường trong veo, ngọt thanh từ tủy xương hầm kỹ chứ không lạm dụng đường hay nước cốt dừa như miền Nam, cũng không cay nồng xé lưỡi như miền Trung. Món Bắc còn đặc trưng bởi sự kết hợp tinh tế cùng các loại rau thơm bản địa như thì là, tía tô, kinh giới, lá lốt và húng láng.',
      },
      {
        question: 'Những món ăn đại diện cho tinh hoa ẩm thực miền Bắc nhất định phải thử?',
        answer: 'Khi khám phá ẩm thực miền Bắc, bạn nhất định không thể bỏ qua: Phở bò tái lăn Hà Nội với nước dùng thơm quế hồi; Bún chả than hoa nướng kẹp que tre đượm vị khói; Chả cá Lã Vọng thơm nức thì là; Bún thang cầu kỳ chuẩn vị Tràng An; Bún đậu mắm tôm Thanh Hóa; Xôi xéo mỡ hành vàng óng đậu xanh và Bánh cuốn Thanh Trì mỏng mướt thơm hành phi.',
      },
      {
        question: 'Bí quyết nấu nước dùng phở bò và bún chuẩn vị Bắc trong veo, ngọt thanh tự nhiên?',
        answer: 'Để nước dùng trong vắt ngọt thanh, xương ống bò phải được nướng xém cạnh, luộc trần sạch máu bầm và rửa thật kỹ trước khi ninh lửa nhỏ liu riu từ 8–10 tiếng. Gia vị tạo mùi gồm hành tây nướng, gừng ta nướng cạo sạch vỏ, thảo quả, hoa hồi, quế chi rang thơm bọc trong túi lọc. Tuyệt đối không đậy vung kín khi ninh và thường xuyên hớt bọt để nước dùng giữ được độ trong veo óng ánh.',
      },
      {
        question: 'Tại sao người miền Bắc chuộng dùng giấm bỗng và các gia vị lên men truyền thống?',
        answer: 'Giấm bỗng nếp được chắt lọc từ hèm rượu nếp lên men tự nhiên, sở hữu vị chua dịu êm ái, thanh thoát và hương thơm nồng ấm đặc trưng mà chanh tươi hay giấm công nghiệp không thể thay thế. Giấm bỗng có công dụng khử sạch mùi tanh của thủy sản (như ốc, cá, riêu cua), kích thích men tiêu hóa và tạo nên linh hồn cho các món bún ốc, bún riêu, canh chua cá lóc chuẩn vị kinh kỳ.',
      },
      {
        question: 'Làm sao để đặt ship món ngon đặc sản miền Bắc chuẩn vị giao tận nơi nhanh nhất?',
        answer: 'Ngay trên ứng dụng, bạn chỉ cần chọn món ăn miền Bắc ưa thích (phở, bún chả, bún thang...) và bấm nút "Đặt Món Ship". Hệ thống tự động xác định vị trí của bạn và kết nối trực tiếp đến các quán ăn miền Bắc chuẩn vị được đánh giá cao nhất trên ShopeeFood, GrabFood hoặc BeFood với nhiều mã ưu đãi freeship.',
      },
    ],
  },
  trung: {
    badge: 'CẨM NANG ẨM THỰC MIỀN TRUNG',
    title: 'Ẩm Thực Miền Trung: Đậm Đà Cay Nồng Cố Đô & Nắng Gió Duyên Hải Rực Rỡ',
    desc: 'Ẩm thực miền Trung kết tinh từ vẻ đẹp cung đình Cố Đô Huế cầu kỳ trang nhã cùng sự hào sảng, kiên cường của người dân duyên hải quanh năm đối mặt nắng gió bão táp. Món ăn miền Trung sở hữu cá tính vô cùng rõ rệt: vị đậm đà sâu lắng, cay nồng xé lưỡi từ ớt chỉ thiên và tiêu cay, hòa quyện hương thơm nức mũi của mắm ruốc nguyên chất và sả cây đập dập. Màu sắc món ăn rực rỡ với sắc đỏ của dầu màu điều và ớt tươi, khơi dậy mọi giác quan từ những tô bún bò Huế thơm nức, đĩa mì Quảng trứ danh, nem nướng Nha Trang giòn rụm đến từng chén bánh bèo tôm cháy thanh tao.',
    schemaUrl: 'https://www.angigio.com/am-thuc-mien-trung',
    sections: [
      {
        heading: '1. Bản Sắc Đậm Đà, Cay Nồng Cố Đô & Nắng Gió Duyên Hải',
        paragraphs: [
          'Miền Trung - dải đất hẹp gánh hai đầu đất nước với lưng tựa dãy Trường Sơn hùng vĩ, mặt hướng ra biển Đông mênh mông bão gió. Chính sự khắc nghiệt của thiên nhiên cùng chiều sâu văn hóa triều Nguyễn đã tạo nên một nền ẩm thực mang cá tính vô cùng quyết liệt: mặn mà sâu sắc, cay nồng xé lưỡi nhưng cũng vô cùng tinh tế, hoa mỹ.',
          'Người miền Trung yêu thích vị ớt không đơn thuần để kích thích vị giác mà còn là cách thức bảo vệ sức khỏe, giữ ấm cơ thể trong những ngày đông mưa dầm gió bấc và khử mùi tanh của tôm cá biển tươi sống.'
        ],
        cards: [
          {
            tag: 'CÁ TÍNH HƯƠNG VỊ',
            title: 'Cay Nồng Xé Lưỡi',
            desc: 'Ớt hiểm, ớt chỉ thiên, ớt bột xào dầu điều tạo nên sắc đỏ bắt mắt và hơi ấm nồng rực rỡ trong từng ngụm nước dùng.'
          },
          {
            tag: 'LINH HỒN BIỂN CẢ',
            title: 'Mắm Ruốc & Mắm Nêm',
            desc: 'Mắm ruốc Huế và mắm nêm cá cơm ủ thủ công đem lại vị mặn mòi umami sâu lắng, không thể nhầm lẫn.'
          },
          {
            tag: 'PHONG THÁI CUNG ĐÌNH',
            title: 'Ngũ Sắc Tinh Tế',
            desc: 'Chú trọng lối trình bày nhỏ nhắn, thanh lịch trong từng chén bánh bèo, đĩa bánh nậm gói lá chuối thơm tho.'
          }
        ],
        quote: 'Khi nấu bún bò Huế, mắm ruốc phải được hòa tan trong nước lạnh rồi gạn lấy phần nước trong châm vào nồi khi đang sôi. Sả cây đập dập bó tròn thả vào cùng ớt sa tế phi dầu màu điều giúp nồi nước dùng thơm lừng dậy mùi ngạt ngào.'
      },
      {
        heading: '2. Những Món Ăn Đại Diện Cho Tinh Hoa Đất Miền Trung',
        paragraphs: [
          'Từ ẩm thực cung đình Huế cầu kỳ cho đến những món ăn dân dã xứ Quảng, xứ Nẫu hay duyên hải Nam Trung Bộ, mỗi món ăn đều chứa đựng lòng hiếu khách và sự chịu thương chịu khó của người dân nơi đây.'
        ],
        cards: [
          {
            tag: 'BIỂU TƯỢNG HUẾ',
            title: 'Bún Bò Huế Chân Giò',
            desc: 'Nước dùng ngạt ngào sả ớt và mắm ruốc, sợi bún to tròn ăn kèm tiết luộc, chả cua và rau bắp chuối thái mỏng.'
          },
          {
            tag: 'HỒN CỐT XỨ QUẢNG',
            title: 'Mì Quảng Tôm Thịt',
            desc: 'Sợi mì gạo dai mềm chan nước nhưn đậm đà tôm thịt rim keo, rắc đậu phộng rang và bánh tráng mè nướng giòn rụm.'
          },
          {
            tag: 'ĐẶC SẢN NHA TRANG',
            title: 'Nem Nướng Nha Trang',
            desc: 'Nem thịt quết dẻo nướng than hoa thơm phức, cuốn bánh tráng, ram giòn và xoài xanh chấm sốt tương gan nếp béo bùi.'
          },
          {
            tag: 'DẺO THƠM PHỐ CỔ',
            title: 'Cơm Gà Tam Kỳ - Hội An',
            desc: 'Cơm nấu nước luộc gà óng vàng mỡ gà, thịt gà ta xé phay bóp gỏi hành tây, rau răm thơm nồng vị tiêu sọ.'
          },
          {
            tag: 'DẺO DAI XỨ THẦN KINH',
            title: 'Bộ Sưu Tập Bánh Huế',
            desc: 'Bánh bèo chén tôm cháy giòn rụm, bánh nậm mềm mịn tan trong miệng và bánh bột lọc trong veo tôm đỏ au đậm vị.'
          },
          {
            tag: 'THANH NGỌT BIỂN KHƠI',
            title: 'Bánh Canh Chả Cá',
            desc: 'Nước dùng nấu từ xương cá biển ngọt lịm tự nhiên, chả cá chiên và chả cá hấp dai giòn không pha bột.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Vì sao ẩm thực miền Trung lại có khẩu vị cay nồng và đậm đà hơn các vùng miền khác?',
        answer: 'Khí hậu miền Trung khắc nghiệt với mùa hè nắng gắt và mùa đông mưa dầm lạnh giá. Để giữ ấm cơ thể, kích thích tỳ vị và khử tanh nguồn hải sản dồi dào từ biển cả, người miền Trung sử dụng ớt tươi, ớt bột, tiêu sọ, sả và mắm ruốc như một phương thức cân bằng thân nhiệt tự nhiên. Vị cay nồng xé lưỡi cũng giúp người lao động biển tăng cường thể lực và thưởng thức bữa ăn ngon miệng hơn.',
      },
      {
        question: 'Những món ăn miền Trung nổi tiếng nào không thể bỏ lỡ khi trải nghiệm?',
        answer: 'Top món ngon miền Trung trứ danh bao gồm: Bún bò Huế chân giò thơm nức mắm ruốc sả ớt; Mì Quảng tôm thịt đậm đà ăn kèm bánh tráng mè nướng; Nem nướng Nha Trang cuốn bánh tráng chấm tương đậu gan béo bùi; Cơm gà Tam Kỳ - Hội An dẻo thơm mỡ gà; Bánh canh chả cá ngừ đại dương nước dùng ngọt thanh; Bánh bèo, bánh nậm, bánh lọc xứ Huế dẻo dai nhân tôm thịt đậm vị.',
      },
      {
        question: 'Vai trò của mắm ruốc Huế trong nghệ thuật nấu nướng món ăn miền Trung?',
        answer: 'Mắm ruốc Huế là "linh hồn vị giác" tạo nên chiều sâu umami mặn mà cho nước dùng bún bò, canh chua hay món thịt kho sả ớt. Bí quyết của các mệ xứ Huế là lấy mắm ruốc hòa tan trong nước lạnh, khuấy đều rồi để lắng cặn trong 15–20 phút, sau đó chỉ gạn lấy phần nước trong châm vào nồi nước dùng đang sôi sùng sục. Cách làm này giúp món ăn thơm phức dậy mùi ngạt ngào mà không hề bị nồng gắt.',
      },
      {
        question: 'Sự khác biệt giữa ẩm thực Cung Đình Huế và ẩm thực dân gian xứ Quảng - Duyên Hải?',
        answer: 'Ẩm thực Cung Đình Huế kế thừa lối phục vụ hoàng gia, chú trọng phép tắc ngũ sắc, bài trí khẩu phần nhỏ nhắn tao nhã trong các chén đĩa sứ tinh xảo, thiên về sự trang nhã. Ngược lại, ẩm thực xứ Quảng (Đà Nẵng, Quảng Nam) và Nam Trung Bộ lại mộc mạc, phóng khoáng, khẩu phần đầy đặn, sợi mì to dày, nước nhưn sánh vàng nghệ và luôn đi kèm rổ rau sống đồng nội xanh tươi phong phú.',
      },
      {
        question: 'Làm sao để đặt ship các món ăn đặc sản miền Trung chuẩn gốc gần tôi nhất?',
        answer: 'Bạn chỉ cần bấm nút "Đặt Món Ship" ngay tại từng thẻ món ăn miền Trung trên trang web. Hệ thống sẽ lọc ra các quán bún bò Huế gốc Cố Đô, quán mì Quảng chuẩn vị Hội An xung quanh bạn trên ShopeeFood, GrabFood hoặc BeFood để bạn thưởng thức nóng hổi tận bàn ăn.',
      },
    ],
  },
  nam: {
    badge: 'CẨM NANG ẨM THỰC MIỀN NAM & SÀI GÒN',
    title: 'Ẩm Thực Miền Nam & Sài Gòn: Hào Sảng Phóng Khoáng, Béo Ngọt Đậm Chất Phố Thị',
    desc: 'Được mệnh danh là miền đất hứa hội tụ tinh hoa đa văn hóa (Kinh, Hoa, Chăm, Khmer), ẩm thực Sài Gòn và miền Nam mang đậm tính cách con người nơi đây: hào sảng, chân chất và phóng khoáng. Món ăn miền Nam có phong vị rõ ràng dứt khoát: ngọt ra ngọt, cay ra cay, béo ngậy nước cốt dừa và thoảng thơm nức mũi mùi mỡ hành tóp mỡ giòn rụm. Đĩa cơm tấm sườn bì chả mọng nước, tô hủ tiếu Nam Vang thanh ngọt nước xương hầm mực khô, chảo bánh mì xíu mại pate bốc khói hay cuốn gỏi tôm thịt chấm tương đen đều là những mảnh ghép ẩm thực không thể thiếu của nhịp sống đô thị sôi động.',
    schemaUrl: 'https://www.angigio.com/am-thuc-mien-nam',
    sections: [
      {
        heading: '1. Vùng Đất Hào Sảng & Ngọt Béo Tự Nhiên Của Phố Thị Phương Nam',
        paragraphs: [
          'Miền Nam và Sài Gòn là mảnh đất của sự giao thoa kỳ diệu. Người phương Nam đón nhận tinh hoa từ khắp bốn phương: nét tinh tế của người Hoa Chợ Lớn, phong vị ngọt béo của người Khmer, kỹ thuật bánh mì của phương Tây để tạo nên một diện mạo ẩm thực sôi động bậc nhất.',
          'Khẩu vị của người miền Nam rất rõ ràng, dứt khoát: cay ra cay, ngọt ra ngọt, chua ra chua. Đặc biệt, thiên nhiên ưu đãi bạt ngàn dừa tươi đã tạo nên thói quen dùng nước dừa xiêm để kho thịt cá, hầm phá lấu và nước cốt dừa béo ngậy để làm nên những món chè, bánh canh thơm phức.'
        ],
        cards: [
          {
            tag: 'ĐẶC TRƯNG HƯƠNG VỊ',
            title: 'Béo Ngậy Nước Cốt Dừa',
            desc: 'Dừa tươi Bến Tre mang lại vị ngọt thanh tự nhiên cho món kho và độ béo ngậy mịn màng cho các món cari, chè ngọt.'
          },
          {
            tag: 'ĐIỂM NHẤN SÀI THÀNH',
            title: 'Mỡ Hành & Tóp Mỡ Giòn',
            desc: 'Lá hành tươi xắt nhuyễn xối mỡ nóng hổi cùng tóp mỡ giòn rụm là điểm nhấn không thể thiếu trên đĩa cơm tấm, bánh hỏi.'
          },
          {
            tag: 'NƯỚC CHẤM THẦN THÁNH',
            title: 'Nước Mắm Kẹo Tỏi Ớt',
            desc: 'Nấu sánh dẻo từ nước mắm cốt, đường vàng và nước dừa, tỏi ớt băm nhuyễn nổi bồng bềnh đỏ au bắt mắt.'
          }
        ],
        quote: 'Bí quyết để sườn nướng cơm tấm mềm mọng không bị khô là ướp cùng mật ong, đầu hành lá giã nát, chút sữa đặc và dầu ăn. Nướng trên than hoa đượm lửa, quét mỡ hành đều tay để miếng sườn óng ánh vàng ươm.'
      },
      {
        heading: '2. Những Món Ăn Đường Phố Bất Hủ Của Sài Gòn - Nam Bộ',
        paragraphs: [
          'Ẩm thực đường phố Sài Gòn không chỉ phục vụ nhu cầu ăn uống mà đã trở thành nếp sống, nhịp thở của đô thị không ngủ. Từ sáng sớm tinh mơ đến đêm muộn, những gánh hàng rong, tiệm ăn nhỏ luôn tấp nập khách với hương vị ngây ngất.'
        ],
        cards: [
          {
            tag: 'BIỂU TƯỢNG SÀI GÒN',
            title: 'Cơm Tấm Sườn Bì Chả',
            desc: 'Hạt tấm thơm bùi ăn cùng sườn nướng than hoa thơm lừng, bì thính giòn dai, chả trứng chưng và chén nước mắm kẹo ngọt.'
          },
          {
            tag: 'NGỌT THANH TÔM MỰC',
            title: 'Hủ Tiếu Nam Vang',
            desc: 'Nước lèo ninh xương ống, mực khô và tôm nõn trong veo ngọt lịm, đầy ắp tôm tươi, thịt nạc, tim gan và rau cần tây.'
          },
          {
            tag: 'NÓNG BỎNG BỮA SÁNG',
            title: 'Bánh Mì Chảo Thập Cẩm',
            desc: 'Trứng ốp la lòng đào béo ngậy, pate gan bùi ngậy, xíu mại sốt cà xèo xèo trên chảo gang ăn kèm bánh mì giòn rụm.'
          },
          {
            tag: 'ĂN VẶT ĐÊM MUỘN',
            title: 'Phá Lấu Bò Nước Dừa',
            desc: 'Nội tạng bò hầm nước dừa tươi thơm ngát ngũ vị hương, chấm nước mắm me chua ngọt cay the kích thích vị giác.'
          },
          {
            tag: 'THANH MÁT LÀNH MẠNH',
            title: 'Gỏi Cuốn Tôm Thịt',
            desc: 'Tôm luộc đỏ au, thịt ba chỉ, bún tươi và hẹ cuộn tròn trong bánh tráng dai, chấm tương đen sốt bơ đậu phộng béo bùi.'
          },
          {
            tag: 'GIÒN RỤM VÀNG ÓNG',
            title: 'Cơm Gà Xối Mỡ',
            desc: 'Miếng đùi gà góc tư chiên xối mỡ da giòn rụm màu cánh gián, thịt bên trong mềm mọng nước, ăn cùng cơm chiên cà chua đỏ au.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Nét văn hóa ẩm thực đặc trưng nhất của người Sài Gòn và miền Nam là gì?',
        answer: 'Người miền Nam chuộng sự cởi mở, nhanh nhẹn và đa dạng văn hóa. Bữa ăn phương Nam là bản giao hưởng giữa ẩm thực thuần Việt với nét tinh tế của ẩm thực Chợ Lớn (người Hoa), phong vị béo ngọt của người Khmer và kỹ thuật bánh mì của Pháp. Món ăn luôn đi kèm rổ rau sống tươi tốt quanh năm (xà lách, rau thơm, giá sống, hẹ) và chén nước mắm chua ngọt tỏi ớt đỏ au bắt mắt.',
      },
      {
        question: 'Top các món ăn đường phố bất hủ tại Sài Gòn nhất định phải thưởng thức?',
        answer: 'Những món ăn biểu tượng làm nên thương hiệu ẩm thực Sài Gòn bao gồm: Cơm tấm sườn bì chả nướng than hoa rưới mỡ hành; Hủ tiếu Nam Vang nước xương ngọt lịm tôm thịt lòng non; Bánh mì chảo pa-tê xíu mại trứng lòng đào; Phá lấu bò nước cốt dừa chấm bánh mì; Gỏi cuốn tôm thịt chấm tương bơ đậu phộng ngậy bùi; Cơm gà xối mỡ da giòn rụm và Bò kho bánh mì sả ớt.',
      },
      {
        question: 'Vì sao món ăn miền Nam lại có khẩu vị ngọt béo và sử dụng nhiều nước dừa tự nhiên?',
        answer: 'Miền Nam có thổ nhưỡng dồi dào kênh rạch và bạt ngàn dừa tươi (đặc biệt là Bến Tre). Người dân có thói quen dùng nước dừa xiêm ngọt lịm để kho thịt, kho cá, hầm phá lấu giúp thịt mềm rục tự nhiên mà không cần nhiều mì chính; đồng thời vắt nước cốt dừa đậm đặc để tạo vị béo thơm sánh mịn cho các món cà ri, bánh canh tôm nước cốt dừa và chè ngọt truyền thống.',
      },
      {
        question: 'Bí quyết làm nước mắm kẹo tỏi ớt chấm cơm tấm sườn nướng chuẩn phong cách Sài Gòn?',
        answer: 'Bí quyết nằm ở tỷ lệ vàng: Đun sôi nhẹ 1 phần nước mắm cốt ngon, 1 phần đường cát vàng và 1 phần nước dừa tươi cho đến khi đường tan hoàn toàn và hỗn hợp sánh lại như mật ong lỏng. Để nước mắm nguội hoàn toàn rồi mới cho tỏi ớt băm nhuyễn và nước cốt chanh vào. Nhờ tỷ lệ sánh đặc, tỏi ớt sẽ nổi bồng bềnh đỏ au trên mặt bát nước mắm cực kỳ bắt mắt.',
      },
      {
        question: 'Làm sao để đặt ship bữa trưa văn phòng hoặc món ăn vặt Sài Gòn siêu tốc?',
        answer: 'Chỉ cần nhấn vào món ăn trên web và chọn "Đặt Món Ship", hệ thống sẽ tự động chuyển tiếp vị trí của bạn sang ứng dụng ShopeeFood, GrabFood hoặc BeFood để tìm quán gần nhất trong bán kính 1–3km, giao hàng nóng sốt chỉ trong 15–25 phút.',
      },
    ],
  },
  mientay: {
    badge: 'CẨM NANG ẨM THỰC MIỀN TÂY SÔNG NƯỚC',
    title: 'Ẩm Thực Miền Tây Sông Nước: Hương Đồng Gió Nội & Đậm Đà Tình Nghĩa Phù Sa',
    desc: 'Đồng bằng sông Cửu Long với hệ thống kênh rạch chằng chịt và phù sa màu mỡ đã ban tặng cho miền Tây một kho tàng sản vật thiên nhiên vô giá: mùa nước nổi cá linh non, ốc bươu đồng, cá lóc, cá kèo tươi sống cùng cả thiên đường rau dại hoa đồng như bông điên điển, bông súng, rau đắng, lục bình. Ẩm thực miền Tây không câu nệ khuôn mẫu, mộc mạc hoang sơ nhưng chan chứa ân tình. Hương vị mặn mà đậm đà của các loại mắm cá đồng, vị chua thanh ngọt ngào của me dốt và dừa xiêm tạo nên những kiệt tác dân dã: nồi lẩu mắm nghi ngút khói bên rổ rau rừng hơn 20 loại, ơ cá kho tộ tiêu ớt sánh keo, hay chiếc bánh xèo vỏ giòn rụm vàng thơm nước cốt dừa.',
    schemaUrl: 'https://www.angigio.com/am-thuc-mien-tay',
    sections: [
      {
        heading: '1. Kho Tàng Sản Vật Phù Sa Cửu Long & Mùa Nước Nổi',
        paragraphs: [
          'Đồng bằng sông Cửu Long với 9 nhánh sông rồng đổ ra biển cả đã bồi đắp nên một vùng đất trù phú bậc nhất Đông Nam Á. Ẩm thực miền Tây mang đậm dấu ấn hào sảng, chân chất và hòa hợp tuyệt đối với thiên nhiên.',
          'Khi con nước lũ tràn về mang theo phù sa màu mỡ cũng là lúc miền Tây bước vào "mùa ăn chơi" thịnh soạn nhất trong năm: cá linh non xương mềm như sụn béo ngậy, từng vạt bông điên điển vàng rực bờ đê, bông súng ma thân dài giòn ngọt và cua đồng mầm gạch béo bùi.'
        ],
        cards: [
          {
            tag: 'SẢN VẬT ĐỒNG BẰNG',
            title: 'Cá Tôm Nước Ngọt',
            desc: 'Cá linh, cá lóc đồng, cá bống cát, tôm càng xanh tươi sống bắt từ kênh rạch, giữ trọn vị ngọt tự nhiên không cần ướp nhiều gia vị.'
          },
          {
            tag: 'ĐẶC SẢN MÙA NƯỚC NỔI',
            title: 'Bông Điên Điển & Bông Súng',
            desc: 'Những loài hoa dại mọc ven sông trở thành nguyên liệu rau sạch thượng hạng cho nồi canh chua và lẩu cá linh.'
          },
          {
            tag: 'TINH HOA Ủ CHƯỢP',
            title: 'Mắm Cá Sặc & Cá Linh',
            desc: 'Thủ phủ mắm Châu Đốc nức danh với nghệ thuật ủ cá đồng cùng thính gạo rang thơm và đường thốt nốt sánh quện.'
          }
        ],
        quote: 'Nấu cá kho tộ chuẩn miền Tây phải dùng tộ đất, ướp cá cùng nước màu dừa Bến Tre và đường thốt nốt. Kho lửa liu riu cho nước dừa tươi rút cạn dần thành lớp sốt keo sánh màu hổ phách, rắc nhiều tiêu sọ và hành lá trước khi tắt bếp.'
      },
      {
        heading: '2. Những Món Ăn Mộc Mạc Chan Chứa Nghĩa Tình Nam Bộ',
        paragraphs: [
          'Món ăn miền Tây không kiểu cách, cầu kỳ trong hình thức nhưng lại chinh phục thực khách bằng sự tươi ngon nguyên bản và sự phong phú của các loại rau cỏ đồng nội đi kèm.'
        ],
        cards: [
          {
            tag: 'VUA LẨU MIỀN TÂY',
            title: 'Lẩu Mắm Đồng Quê',
            desc: 'Nồi lẩu ninh từ mắm cá linh, cá sặc lọc bỏ xương, phi sả ớt thơm lừng, nhúng cùng rổ rau đồng hơn 20 loại xanh tươi mướt mắt.'
          },
          {
            tag: 'ĐẬM ĐÀ ĐƯA CƠM',
            title: 'Cá Lóc / Cá Ba Sa Kho Tộ',
            desc: 'Thịt cá săn chắc, nước sốt keo đỏ au sóng sánh vị mặn ngọt hài hòa, thơm nức tiêu cay ăn cùng cơm nóng và dưa leo giòn rụm.'
          },
          {
            tag: 'MÙA NƯỚC NỔI',
            title: 'Canh Chua Cá Linh Điên Điển',
            desc: 'Cá linh non béo ngậy nấu cùng bông điên điển vàng ươm, dầm me dốt chua thanh dịu ngọt, ăn tới đâu ấm lòng tới đó.'
          },
          {
            tag: 'GIÒN RỤM VÀNG THƠM',
            title: 'Bánh Xèo Vành Giòn Miền Tây',
            desc: 'Bánh xèo chảo lớn đổ mỏng giòn rụm, nhân tép trấu, củ hủ dừa và thịt ba rọi, cuốn cải bẹ xanh chấm nước mắm tỏi ớt.'
          },
          {
            tag: 'HƯƠNG VỊ NGẢI BÚN',
            title: 'Bún Nước Lèo Sóc Trăng',
            desc: 'Nước lèo trong vắt ngọt lịm từ mắm bò hóc và ngải bún khử mùi, ăn cùng cá lóc luộc gỡ xương, thịt quay và tôm luộc.'
          },
          {
            tag: 'DÂN DÃ TUYỆT HẢO',
            title: 'Cơm Cháy Kho Quẹt',
            desc: 'Miếng cơm cháy đáy nồi vàng giòn rụm quẹt vào ơ mắm kho quẹt tóp mỡ tôm khô sền sệt, cay nồng ớt hiểm.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Mùa nước nổi miền Tây mang lại những đặc sản ẩm thực độc nhất vô nhị nào?',
        answer: 'Mùa nước nổi (từ tháng 8 đến tháng 11 âm lịch) là mùa của sản vật tự nhiên trù phú bậc nhất: Cá linh non xương mềm ngọt béo, bông điên điển vàng rực bờ đê, bông súng ma thân dài giòn ngọt, cua đồng mầm gạch. Các món ngon bất hủ mùa nước nổi gồm: Canh chua cá linh bông điên điển, Cá linh kho lạt dầm me dốt ăn kèm bông súng, và Lẩu cá linh nhúng giấm chua thanh giải nhiệt.',
      },
      {
        question: 'Nghệ thuật thưởng thức Lẩu Mắm miền Tây: Nấu từ mắm gì và ăn kèm những loại rau nào?',
        answer: 'Nồi lẩu mắm miền Tây đạt chuẩn phải phối trộn hài hòa giữa mắm cá linh (tạo vị ngọt béo bùi) và mắm cá sặc (tạo hương thơm đậm đà nồng đượm), ninh kỹ lọc bỏ xương, phi thơm cùng sả băm ớt hiểm và nước dừa tươi ngọt lành. Điểm tinh túy là đĩa rau đồng nội hơn 15–20 loại: bông điên điển, bông súng, cù nèo, rau đắng đất, bắp chuối bào, rau muống đồng, rau nhút, lục bình non.',
      },
      {
        question: 'Những món ăn dân dã làm nên thương hiệu của vùng đất Tây Nam Bộ?',
        answer: 'Du khách đến miền Tây nhất định phải thưởng thức: Canh chua cá lóc đồng bông súng; Cá lóc/cá bống kho tộ nước màu dừa sánh quánh; Lẩu cá kèo lá giang chua cay xé lưỡi; Bánh xèo miền Tây vành giòn rụm nhân tép trấu củ hủ dừa; Bún nước lèo Sóc Trăng nước lèo trong ngọt vị ngải bún; và Cơm cháy kho quẹt tóp mỡ giòn rụm.',
      },
      {
        question: 'Bí quyết kho cá tộ kiểu miền Tây sao cho thịt cá săn chắc, nước sốt sánh keo đỏ au?',
        answer: 'Cá lóc hoặc cá ba sa tươi cắt khúc dày, ướp với nước mắm ngon, đường thốt nốt, đầu hành lá đập dập, tiêu xay và nước màu dừa Bến Tre nguyên chất ít nhất 30 phút. Kho trong tộ đất lửa lớn cho thịt cá săn cứng lại, sau đó châm nước dừa tươi đun liu riu cho nước sốt ngấm sâu rút cạn sánh kẹo lại. Rưới thêm chút mỡ gà hoặc tóp mỡ và rắc tiêu sọ cay nồng trước khi bắc xuống.',
      },
      {
        question: 'Tôi có thể tìm quán bán món miền Tây chính gốc ở thành phố lớn như thế nào?',
        answer: 'Bạn chỉ cần bấm nút "Đặt Món Ship" ngay tại thẻ món lẩu mắm, cá kho tộ hoặc canh chua cá lóc trên ứng dụng. Hệ thống sẽ tự động đề xuất những nhà hàng quán ăn miền Tây chính gốc có điểm đánh giá cao gần vị trí của bạn trên ShopeeFood, GrabFood hoặc BeFood.',
      },
    ],
  },
  daily: {
    badge: 'CẨM NANG THỰC ĐƠN MỖI NGÀY',
    title: 'Thực Đơn Mỗi Ngày: Gợi Ý Mâm Cơm Gia Đình 7 Ngày Cân Bằng Dinh Dưỡng, Ngon Miệng & Tiết Kiệm',
    desc: 'Băn khoăn "Hôm nay ăn gì?", "Trưa nay nấu món gì?", "Tối nay ăn cơm với gì?" là trăn trở thường trực của hàng triệu người nội trợ mỗi ngày. Chuyên trang Thực Đơn Mỗi Ngày mang đến giải pháp toàn diện: Lịch mâm cơm gia đình khoa học từ Thứ 2 đến Chủ Nhật, chuẩn hóa theo tỷ lệ vàng 4 món (Món mặn giàu protein + Món xào chất xơ + Canh thanh nhiệt + Món chua/đồ ăn kèm đưa cơm). Thực đơn được thiết kế thông minh giúp chống ngấy, tránh lặp món giữa các ngày, cân đối calo hợp lý cho cả người lớn lẫn trẻ nhỏ và tối ưu hóa thời gian đứng bếp chỉ còn 30–45 phút mỗi bữa.',
    schemaUrl: 'https://www.angigio.com/thuc-don-moi-ngay',
    sections: [
      {
        heading: '1. Nguyên Tắc "Tỷ Lệ Vàng 4 Món" Cho Bữa Cơm Gia Đình Đạt Chuẩn Dinh Dưỡng',
        paragraphs: [
          'Một mâm cơm gia đình hoàn hảo không nhất thiết phải có sơn hào hải vị mà cần sự cân bằng khoa học giữa các nhóm chất: đạm (protein), chất xơ, vitamin, nước khoáng và men tiêu hóa. Áp dụng quy tắc 4 món giúp cơ thể hấp thu dưỡng chất tối ưu, chống ngấy và bảo vệ sức khỏe tim mạch cho cả nhà.',
          'Sự kết hợp giữa món mặn đậm đà, đĩa rau xào giòn ngọt, bát canh thanh mát giải nhiệt và đĩa dưa chua/cà muối giòn rụm chính là công thức tạo nên bữa ăn đưa cơm mà không một nhà hàng sang trọng nào có thể thay thế.'
        ],
        cards: [
          {
            tag: 'MÓN ĐẠM CHÍNH (PROTEIN)',
            title: 'Thịt Kho, Cá Rán, Gà Rang',
            desc: 'Chiếm 25-30% khẩu phần ăn, cung cấp năng lượng và axit amin thiết yếu để tái tạo cơ bắp và phục hồi thể lực.'
          },
          {
            tag: 'CHẤT XƠ & VITAMIN',
            title: 'Rau Xào, Củ Quả Luộc',
            desc: 'Cung cấp chất xơ hòa tan, kích thích nhu động ruột, giảm cholesterol xấu và bổ sung vitamin tươi nguyên.'
          },
          {
            tag: 'GIẢI NHIỆT & BÙ NƯỚC',
            title: 'Bát Canh Thanh Mát',
            desc: 'Canh chua, canh sườn rau củ hoặc canh cua mồng tơi giúp bữa cơm dễ nuốt, bổ sung khoáng chất và bù nước sau ngày dài.'
          },
          {
            tag: 'KÍCH THÍCH VỊ GIÁC',
            title: 'Món Ăn Kèm Chua Ngọt',
            desc: 'Cà pháo muối, dưa cải chua hoặc nộm đu đủ giúp kích thích tiết dịch vị tiêu hóa, chống ngấy hiệu quả.'
          }
        ],
        quote: 'Mẹo tối ưu thời gian nấu cơm chỉ trong 30–45 phút: Cắm cơm điện trước, bắc nồi thịt kho/om lửa nhỏ, trong lúc chờ thì xào nhanh đĩa rau trên lửa lớn và dùng nước luộc hoặc nước dùng ninh sẵn nấu nhanh bát canh.'
      },
      {
        heading: '2. Lịch Mâm Cơm Gia Đình 7 Ngày Khoa Học - Chống Trùng Món',
        paragraphs: [
          'Bảng thực đơn mẫu từ Thứ 2 đến Chủ Nhật được thiết kế thông minh với các nhóm nguyên liệu luân chuyển đều đặn: thịt heo, cá sông/biển, thịt bò, gia cầm, hải sản và thanh đạm cuối tuần.'
        ],
        cards: [
          {
            tag: 'THỨ 2 • HỨNG KHỞI TUẦN MỚI',
            title: 'Sườn Rim Mặn Ngọt',
            desc: 'Sườn non rim dứa chua ngọt + Rau muống xào tỏi + Canh sườn nấu chua sấu + Cà pháo muối giòn.'
          },
          {
            tag: 'THỨ 3 • ĐẬM ĐÀ BIỂN KHƠI',
            title: 'Cá Bống Kho Tiêu Tộ',
            desc: 'Cá kho keo tiêu cay + Đậu cô ve xào thịt băm + Canh mồng tơi nấu tôm tươi + Dưa chuột xắt lát.'
          },
          {
            tag: 'THỨ 4 • TĂNG CƯỜNG ĐỀ KHÁNG',
            title: 'Bò Xào Cần Tây',
            desc: 'Thịt bò xào mềm ngọt cần tỏi + Trứng cuộn hành hoa + Canh bí đỏ hầm xương heo + Kim chi chua ngọt.'
          },
          {
            tag: 'THỨ 5 • ĐỒNG QUÊ ẤM CÚNG',
            title: 'Gà Ta Rang Gừng Sả',
            desc: 'Gà rang sả ớt vàng ươm + Bắp cải luộc chấm trứng dầm mắm + Canh nước luộc bắp cải vắt chanh + Đậu rán giòn.'
          },
          {
            tag: 'THỨ 6 • THANH NHẸ ĐỔI VỊ',
            title: 'Tôm Rim Thịt Ba Rọi',
            desc: 'Tôm rim ba chỉ bóng bẩy + Canh riêu cua đồng đậu rán mướp hương + Rau sống hoa chuối + Nộm tai heo.'
          },
          {
            tag: 'THỨ 7 • SUM HỌP MÓN CUỐN',
            title: 'Bánh Tráng Cuốn Thịt Luộc',
            desc: 'Ba chỉ heo luộc thái mỏng cuốn bánh tráng tôm chua, dưa leo, rau rừng chấm mắm nêm đậm đà.'
          },
          {
            tag: 'CHỦ NHẬT • ĐỔI VỊ GIA ĐÌNH',
            title: 'Bún Chả Hà Nội Nướng Than',
            desc: 'Chả viên, chả miếng nướng than hoa vàng óng, bún tươi, rổ rau kinh giới tía tô và nước chấm ấm nóng.'
          }
        ]
      }
    ],
    faqs: [
      {
        question: 'Nguyên tắc "Tỷ lệ vàng 4 món" trong mâm cơm gia đình hàng ngày là gì?',
        answer: 'Một mâm cơm gia đình chuẩn dinh dưỡng và ngon miệng nên bao gồm: 1 Món đạm chính (thịt kho, cá rán, sườn rim, gà hấp) cung cấp protein xây dựng năng lượng; 1 Món xào hoặc luộc (rau muống xào tỏi, su su xào, bông cải hấp) cung cấp chất xơ và vitamin; 1 Bát canh thanh mát giải nhiệt (canh chua, canh cua rau đay, canh sườn hầm rau củ) giúp dễ nuốt và bù nước; và 1 Món ăn kèm chua ngọt (cà pháo muối, dưa cải chua, nộm đu đủ, kim chi) kích thích vị giác đưa cơm.',
      },
      {
        question: 'Làm sao để nấu bữa cơm gia đình đủ 4 món chỉ trong 30 đến 45 phút?',
        answer: 'Áp dụng nguyên tắc nấu song song và chuẩn bị thông minh: Sơ chế, ướp thịt cá và nhặt rau từ sáng hoặc tối hôm trước cất ngăn mát tủ lạnh. Khi nấu, bạn bật nồi cơm điện trước; bắc nồi thịt kho/om lên bếp nhỏ lửa; trong lúc chờ thịt mềm, bạn xào nhanh đĩa rau trên lửa lớn; đồng thời dùng nước luộc rau hoặc nước ninh để nấu nhanh bát canh. Nếu có nồi chiên không dầu, bạn có thể nướng cá/thịt tự động mà không mất công canh bếp.',
      },
      {
        question: 'Làm thế nào để lên thực đơn 7 ngày không bị trùng lặp nguyên liệu gây nhàm chán?',
        answer: 'Hãy luân phiên các nhóm chất đạm theo chu kỳ tuần: Thứ 2 thịt heo (sườn rim mặn ngọt), Thứ 3 cá biển hoặc cá đồng (cá kho tộ), Thứ 4 thịt bò hoặc hải sản tôm mực (bò xào cần tây, tôm rim thịt), Thứ 5 thịt gà/vịt (gà rang gừng sả), Thứ 6 thanh nhẹ với đậu phụ và trứng (canh riêu cua đậu rán), Thứ 7 sum họp với món cuốn/lẩu (bò nhúng giấm, gỏi cuốn), Chủ Nhật đổi vị với bún chả hoặc phở gà.',
      },
      {
        question: 'Tính năng "Danh Sách Đi Chợ" trên ứng dụng hỗ trợ người nội trợ như thế nào?',
        answer: 'Tại mỗi ngày trong tuần trên chuyên mục Thực Đơn Mỗi Ngày, ứng dụng tự động tổng hợp toàn bộ nguyên liệu cần mua kèm theo định lượng chính xác (ví dụ: 500g sườn non, 1 bó rau muống, 2 quả cà chua) dành cho gia đình từ 3–5 người. Bạn có thể tích chọn đánh dấu món đã mua trên điện thoại hoặc bấm nút "Sao chép danh sách" để gửi nhanh qua tin nhắn Zalo cho người thân đi chợ hộ.',
      },
      {
        question: 'Nếu ngày nào bận rộn không kịp nấu thì có thể đặt mâm cơm giao tận nhà không?',
        answer: 'Có! Ứng dụng tích hợp liên kết trực tiếp với ShopeeFood, GrabFood và BeFood. Bạn chỉ cần bấm vào món ăn trong mâm cơm hàng ngày, hệ thống sẽ đề xuất các quán cơm niêu, quán cơm gia đình uy tín quanh khu vực của bạn với hàng ngàn mã giảm giá và giao nóng hổi trong 20–30 phút.',
      },
    ],
  },
  recipe: {
    badge: 'CẨM NANG CÁCH NẤU MÓN NGON',
    title: 'Công Thức Nấu Ăn Chuẩn Vị & Bí Quyết Nấu Ngon Tại Nhà',
    desc: `Tuyển tập hướng dẫn chi tiết cách nấu hơn ${INITIAL_DISHES.length}+ món ngon Việt Nam từ bữa cơm nhà mộc mạc, bình dị đến những món tiệc xôm tụ cuối tuần. Không còn bỡ ngỡ với câu hỏi "Hôm nay nấu thế nào cho ngon?", cẩm nang đồng hành cùng bạn qua từng bước định lượng nguyên liệu vừa vặn, bí quyết khử mùi tanh dân dã, cách căn chỉnh ngọn lửa và mẹo nêm nếm gia truyền để mâm cơm gia đình lúc nào cũng đượm tình, tròn vị.`,
    schemaUrl: 'https://www.angigio.com/cach-nau-mon-ngon',
    sections: [
      {
        heading: '1. Bước Vào Gian Bếp Bằng Niềm Vui: Quy Trình 3 Bước Dành Cho Mọi Người',
        paragraphs: [
          'Vào bếp không phải là một bài kiểm tra áp lực hay nghĩa vụ nhọc nhằn, mà là cách chúng ta tìm lại sự an yên sau ngày dài bộn bề, gửi gắm yêu thương vào từng món ăn nóng hổi. Nấu ăn ngon thực ra không hề khó như bạn nghĩ, điều quan trọng nhất là nắm vững nhịp điệu phối hợp giữa khâu chuẩn bị nguyên liệu, thời gian tẩm ướp và cách điều tiết ngọn lửa.',
          'Dù bạn là người trẻ lần đầu tự tay cầm dao thái thịt hay người đã nhiều năm gắn bó với mâm cơm gia đình, từng chỉ dẫn tại đây đều được đúc kết từ kinh nghiệm thực tế của các nghệ nhân ẩm thực và những người mẹ, người bà khéo léo. Hãy xem gian bếp như một góc sáng tạo đầy cảm hứng, nơi mỗi nguyên liệu mộc mạc đều có thể trở thành món ngon nhớ đời.'
        ],
        cards: [
          {
            tag: 'BƯỚC 1: SƠ CHẾ THẢNH THƠI',
            title: 'Khử Mùi Tự Nhiên & Giữ Vị Tươi',
            desc: 'Dùng chút muối hạt, lát gừng tươi hay giọt chanh giấm mộc mạc làm sạch lòng mề, khử tanh cá tôm, thịt gia cầm mà vẫn giữ trọn vẹn vị ngọt nguyên bản.'
          },
          {
            tag: 'BƯỚC 2: TẨM ƯỚP VỪA VẶN',
            title: 'Thời Gian Vàng Cho Gia Vị Ngấm',
            desc: 'Ướp thịt cá thong thả từ 20–30 phút trước khi bật bếp. Gia vị mặn ngọt sẽ len lỏi sâu vào từng thớ thịt, lúc nấu lên thơm nức mũi mà không hề bị chảy nước.'
          },
          {
            tag: 'BƯỚC 3: LẮNG NGHE NGỌN LỬA',
            title: 'Hiểu Tiếng Xèo Xèo Của Chảo',
            desc: 'Xào rau lửa lớn đảo nhanh tay giữ trọn màu xanh mướt và độ giòn ngọt; còn kho thịt cá thì hạ nhỏ lửa liu riu cho nước sốt sánh mịn quyện chặt.'
          }
        ],
        quote: 'Bí quyết ngon nhất của mọi món ăn không nằm ở gia vị đắt đỏ, mà là sự kiên nhẫn khi sơ chế và một tâm trạng thoải mái, vui vẻ khi đứng trước bếp lửa.'
      },
      {
        heading: '2. Nghệ Thuật Nêm Nếm "Vị Nhà": Bí Kíp Cân Bằng Mặn - Ngọt - Chua - Cay',
        paragraphs: [
          'Mỗi gia đình Việt Nam đều có một "vị nhà" thân thuộc — đó là mùi nước mắm nhĩ thơm lừng khi vừa trút vào nồi canh sôi sùng sục, là đĩa cá kho tiêu cay tê đầu lưỡi vào chiều mưa rả rích, hay bát canh cua mồng tơi thanh mát xua tan cái oi ả ngày hè.',
          'Nghệ thuật nêm nếm món Việt chính là sự hòa hợp triết lý âm dương ngũ hành. Gia vị không chỉ để tạo vị giác kích thích, mà còn giúp cơ thể dễ tiêu hóa, giữ ấm bụng và nâng niu sức khỏe của từng thành viên trong gia đình.'
        ],
        cards: [
          {
            tag: 'NƯỚC MẮM NHĨ TRUYỀN THỐNG',
            title: 'Linh Hồn Của Bữa Cơm Việt',
            desc: 'Nêm nước mắm ngon vào canh lúc vừa tắt bếp để giữ trọn hương thơm nồng nàn; ướp thịt kho với nước mắm giúp thớ thịt săn chắc và dậy màu hổ phách.'
          },
          {
            tag: 'HÀNH TỎI DẬY MÙI',
            title: 'Khởi Đầu Hoàn Hảo Cho Món Xào',
            desc: 'Phi thơm hành tím, tỏi băm ở mức lửa vừa đến khi dậy mùi thơm dìu dịu và chuyển vàng ươm là lúc lý tưởng nhất để trút nguyên liệu vào xào.'
          },
          {
            tag: 'RAU THƠM ĐI KÈM',
            title: 'Hòa Hợp Tính Hàn & Nhiệt',
            desc: 'Thịt vịt tính hàn đi cùng gừng ớt ấm nồng; ốc đồng lạnh bụng luôn nấu cùng lá lốt tía tô thơm lừng; trứng vịt lộn không thể thiếu rau răm cay ấm.'
          }
        ],
        quote: 'Nêm nếm chuẩn vị không phải là công thức cân đo khô cứng, mà là thói quen nếm thử bằng chiếc muỗng nhỏ, cảm nhận sự vừa miệng và ấm áp cho người mình thương.'
      },
      {
        heading: '3. Mẹo Bỏ Túi "Cứu Cánh" Gian Bếp: Xử Lý Món Lỡ Tay Nhanh Chóng',
        paragraphs: [
          'Trong căn bếp hàng ngày, ngay cả những người nấu ăn lão luyện nhất cũng có lúc lỡ tay nêm hơi mặn, nấu canh bị cay nồng hay xào rau bị ngả vàng. Đừng vội buồn hay bỏ đi món ăn vừa nấu, vì gian bếp luôn có những "phép màu" mộc mạc để cứu nguy trong tích tắc.',
          'Nắm vững những mẹo nhỏ này, bạn sẽ luôn bình tĩnh, tự tin xử lý mọi tình huống và biến những khoảnh khắc vụng về thành những trải nghiệm vào bếp nhẹ nhàng, thú vị.'
        ],
        cards: [
          {
            tag: 'KHI MÓN ĂN QUÁ MẶN',
            title: 'Khoai Tây Hoặc Vài Giọt Chanh',
            desc: 'Thả vài lát khoai tây sống hoặc lòng trắng trứng vào nồi canh/kho để hút bớt lượng muối thừa; hoặc vắt thêm vài giọt chanh để làm dịu vị mặn.'
          },
          {
            tag: 'KHI MÓN ĂN QUÁ CAY',
            title: 'Bổ Sung Cà Chua Hoặc Nước Dừa',
            desc: 'Thêm cà chua thái múi cau, chút đường cát hoặc nước dừa tươi ngọt thanh sẽ trung hòa chất capsaicin gây cay, giúp món ăn dịu vị êm ái.'
          },
          {
            tag: 'GIỮ RAU XANH MƯỚT',
            title: 'Chần Nước Sôi & Ngâm Nước Đá',
            desc: 'Luộc rau với chút muối hạt, mở vung khi sôi, vớt ngay ra âu nước đá lạnh 2–3 phút để rau giòn sần sật và giữ trọn sắc xanh tươi rói.'
          }
        ],
        quote: 'Nấu ăn là một hành trình trải nghiệm và gắn kết yêu thương. Đừng sợ một vài lần chưa như ý, bởi mỗi lần vào bếp là một lần ta hiểu hơn về hương vị cuộc sống.'
      }
    ],
    faqs: [],
  },
};

export const SeoContentFaq: React.FC<{
  activeTab: TabType;
  onNavigate?: (tab: TabType) => void;
}> = ({ activeTab, onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
        setOpenIndex(0);
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('locationchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('locationchange', handleLocationChange);
    };
  }, []);

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

  // Dedicated Rich SEO Editorial Article for Snacks & Drinks (Đồ Uống & Ăn Vặt /do-uong-an-vat)
  if (activeTab === 'snacks') {
    const snacksFaqs: FaqItem[] = [
      {
        question: 'Chuyên trang Đồ Uống & Ăn Vặt gồm những nhóm món đặc trưng nào?',
        answer:
          'Chuyên trang tuyển tập hơn 31+ món hot trend được giới trẻ và dân văn phòng săn đón nhất hiện nay, chia làm 2 nhánh chính: (1) Trà sữa & Đồ uống (Trà sữa trân châu đường đen, Cà phê muối Huế, Cà phê sữa đá Sài Gòn, Trà đào cam sả, Trà dâu tằm tuyết, Trà chanh giã tay, Sinh tố bơ sáp, Matcha latte...) và (2) Đồ ăn vặt xế chiều (Bánh tráng trộn sa tế bò khô tép mỡ, Bánh tráng nướng Đà Lạt, Chè khúc bạch, Chè bưởi An Giang, Bắp xào bơ tép, Khoai lang lắc phô mai, Cá viên chiên nước mắm tỏi ớt, Nem chua rán phố cổ...).',
      },
      {
        question: 'Tại sao thời điểm 3 - 4 giờ chiều lại thích hợp đặt đồ ăn vặt & trà sữa?',
        answer:
          'Khoảng 15h - 16h là thời điểm lượng đường huyết tự nhiên sau bữa trưa có xu hướng hạ thấp, dễ gây mỏi mệt, uể oải và giảm hiệu suất công việc. Một ly trà trái cây giàu vitamin C, một ngụm trà sữa thơm béo hay đĩa bánh tráng giòn cay chua ngọt giúp kích thích vị giác tức thì, kích hoạt dopamine mang lại năng lượng sảng khoái cho cả nhóm bạn hay phòng ban văn phòng.',
      },
      {
        question: 'Làm thế nào để tìm quán trà sữa hay ăn vặt ship gần vị trí của tôi nhanh nhất?',
        answer:
          'Tại từng thẻ món, hệ thống tích hợp sẵn 4 nút bấm tiện lợi: ShopeeFood, GrabFood, BeFood và Google Maps. Khi bạn nhấn vào, ứng dụng sẽ tự động kết nối và ưu tiên hiển thị các quán ngon có cự ly ship gần nhất quanh khu vực bạn đang đứng (Hà Nội, TP.HCM, Đà Nẵng...), kèm các mã freeship và khuyến mãi hỏa tốc.',
      },
      {
        question: 'Tôi có ngân sách tiết kiệm (học sinh, sinh viên) thì lọc món như thế nào?',
        answer:
          'Ngay dưới thanh tìm kiếm, ứng dụng trang bị bộ lọc ngân sách thông minh 1 chạm: Dưới 30k (bánh chuối nướng, xoài lắc, bánh tráng nướng, cà phê sữa đá...), từ 30k - 50k (trà sữa trân châu, trà đào cam sả, bingsu, cá viên chiên mắm...) và Trên 50k giúp bạn cân đối chi tiêu dễ dàng.',
      },
      {
        question: 'Thông tin calo và mức giá dự tính có đáng tin cậy không?',
        answer:
          'Mỗi món đều được nghiên cứu và niêm yết khoảng calo chuẩn xác (ví dụ: trà đào ~120-180 kcal, bánh tráng trộn ~320-420 kcal) cùng khoảng giá thị trường thực tế, giúp bạn vừa thỏa thích tận hưởng ẩm thực đường phố vừa dễ dàng kiểm soát chế độ dinh dưỡng hàng ngày.',
      },
    ];

    return (
      <article
        aria-label="Cẩm nang Đồ Uống & Ăn Vặt Xế Chiều Hot Trend"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-10 sm:mb-14"
      >
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-12">
          {/* Header & Lead Hero Section */}
          <header className="border-b border-stone-100 pb-8 sm:pb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3.5 border border-amber-200/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>THẾ GIỚI ĂN VẶT &amp; ĐỒ UỐNG HOT TREND</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight leading-snug mb-4">
              Cẩm Nang Đồ Uống &amp; Ăn Vặt: Vũ Điệu Vị Giác Giờ Xế Chiều &amp; Trà Chiều Dân Văn Phòng
            </h2>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-4">
              Văn hóa ăn vặt xế chiều và nhâm nhi trà sữa đã trở thành một phần không thể thiếu trong nhịp sống hiện đại của giới trẻ và dân công sở Việt Nam. Cứ mỗi độ 3 đến 4 giờ chiều, tiếng gọi <em>&quot;Lên đơn trà sữa chưa cả nhà ơi?&quot;</em> hay <em>&quot;Bánh tráng nướng, nem chua rán ship chung không?&quot;</em> lại vang lên rộn rã khắp các văn phòng làm việc.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
              Chuyên trang <strong>Đồ Uống &amp; Ăn Vặt</strong> của <em>Hôm Nay Ăn Gì</em> được xây dựng độc lập nhằm giúp bạn tra cứu siêu tốc các món giải khát mát lạnh, đồ ăn đường phố chuẩn gu với bảng calo minh bạch, khoảng giá sinh viên và liên kết đặt hàng tức thì đến các shipper gần bạn nhất.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Bộ Sưu Tập</div>
                <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">31+ Món Hot Trend</div>
                <div className="text-[11px] text-amber-800 font-medium">Trà sữa &amp; ăn vặt đường phố</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Thời Gian Vàng</div>
                <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">14h30 - 17h00</div>
                <div className="text-[11px] text-orange-800 font-medium">Bơm dopamine tan biến mệt mỏi</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Mức Giá Túi Tiền</div>
                <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">Từ 20k - 55k</div>
                <div className="text-[11px] text-emerald-800 font-medium">Hợp ví học sinh &amp; văn phòng</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Giao Hỏa Tốc</div>
                <div className="text-lg sm:text-xl font-black text-stone-900 mt-0.5">Shopee • Grab • Be</div>
                <div className="text-[11px] text-blue-800 font-medium">Tìm quán bán gần nhất quanh bạn</div>
              </div>
            </div>
          </header>

          {/* Section 1: Top đồ uống giải nhiệt */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <CupSoda className="w-5 h-5 text-amber-600" />
              <span>Top Đồ Uống Giải Khát &amp; Bừng Tỉnh Năng Lượng</span>
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Từ ly cà phê sữa đá đậm đà vị truyền thống, cà phê muối béo mặn xứ Huế gây nghiện, cho tới các dòng trà ô long thanh mát kết hợp đào miếng giòn sần sật hay trà chanh giã tay thơm lừng tinh dầu chanh nước hoa. Dù bạn cần nạp caffeine để tập trung chạy deadline hay cần ngụm trà trái cây mát lạnh xua tan cái oi ả của thời tiết, menu đều sẵn sàng phục vụ.
            </p>
          </section>

          {/* Section 2: Top đồ ăn vặt xế chiều */}
          <section className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Cookie className="w-5 h-5 text-orange-600" />
              <span>Thiên Đường Ăn Vặt Đường Phố Ba Miền Giòn Cay Khó Cưỡng</span>
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Không thể thiếu linh hồn của các buổi tụ tập chiều: Bánh tráng trộn sa tế bò khô dai mềm, bánh tráng nướng Đà Lạt giòn rụm béo ngậy trứng cút mỡ hành, mẹt cá viên chiên xóc nước mắm tỏi ớt thơm nức mũi, hay đĩa nem chua rán phố cổ Hà Nội vỏ xù giòn tan bên trong dẻo ngọt. Tất cả tạo nên sự cân bằng hương vị chua - cay - mặn - ngọt bùng nổ vị giác.
            </p>
          </section>

          {/* Section 3: FAQ Accordion */}
          <section className="space-y-5 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Câu Hỏi Thường Gặp Về Đồ Uống &amp; Ăn Vặt
              </h3>
            </div>

            <div className="space-y-3">
              {snacksFaqs.map((faq, index) => {
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

          {/* Section 4: Internal Cross-Linking */}
          <section className="pt-6 border-t border-stone-100">
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-orange-600" />
              <span>Khám Phá Thêm Những Trải Nghiệm Ẩm Thực Khác</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    Thực Đơn Món Ngon
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Hơn 160+ món chính đặc sản 3 miền chuẩn vị
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
                    Thực đơn 7 ngày khoa học, không lo trùng món
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
            </div>
          </section>

          {/* Structured Data (Schema.org JSON-LD for Snacks and Drinks) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebPage",
                    "@id": "https://www.angigio.com/do-uong-an-vat#webpage",
                    "url": "https://www.angigio.com/do-uong-an-vat",
                    "name": "Đồ Uống & Ăn Vặt - Trà Sữa, Cà Phê, Sinh Tố & Món Ăn Vặt Xế Chiều Hot Trend | Hôm Nay Ăn Gì",
                    "description": "Thưởng thức thế giới trà sữa trân châu, cà phê muối, trà trái cây tươi mát cùng bánh tráng trộn, nem chua rán, bánh tráng nướng giòn rụm kèm liên kết đặt ship hỏa tốc gần bạn.",
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
                    "@id": "https://www.angigio.com/do-uong-an-vat#breadcrumb",
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
                        "name": "Đồ Uống & Ăn Vặt",
                        "item": "https://www.angigio.com/do-uong-an-vat"
                      }
                    ]
                  },
                  {
                    "@type": "FAQPage",
                    "@id": "https://www.angigio.com/do-uong-an-vat#faq",
                    "mainEntity": snacksFaqs.map((faq) => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer,
                      },
                    })),
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
  let data = COMMON_FAQ_DATA[activeTab];

  // If activeTab is 'discover', customize data based on regional cuisine or discovery sub-section
  let currentRegionData: DiscoverSeoItem | null = null;

  if (activeTab === 'discover') {
    const regionId = getRegionFromUrl();
    const subSection = getDiscoverSubSectionFromUrl();

    if (regionId && DISCOVER_SEO_DETAILS[regionId]) {
      currentRegionData = DISCOVER_SEO_DETAILS[regionId];
    } else if (subSection === 'daily' || currentPath.includes('/thuc-don-moi-ngay')) {
      currentRegionData = DISCOVER_SEO_DETAILS['daily'];
    } else if (subSection === 'recipe' || currentPath.includes('/cach-nau-')) {
      currentRegionData = DISCOVER_SEO_DETAILS['recipe'];
    } else if (currentPath.includes('/am-thuc-mien-bac')) {
      currentRegionData = DISCOVER_SEO_DETAILS['bac'];
    } else if (currentPath.includes('/am-thuc-mien-trung')) {
      currentRegionData = DISCOVER_SEO_DETAILS['trung'];
    } else if (currentPath.includes('/am-thuc-mien-nam')) {
      currentRegionData = DISCOVER_SEO_DETAILS['nam'];
    } else if (currentPath.includes('/am-thuc-mien-tay')) {
      currentRegionData = DISCOVER_SEO_DETAILS['mientay'];
    } else if (currentPath === '/am-thuc-vung-mien' || currentPath === '/am-thuc-vung-mien/') {
      currentRegionData = DISCOVER_SEO_DETAILS['bac'];
    }
  }

  const finalData = currentRegionData || data;
  if (!finalData) return null;

  return (
    <section
      aria-label="Nội dung giới thiệu & Câu hỏi thường gặp"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 mb-10 sm:mb-14"
    >
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-6 sm:p-10">
        {/* Editorial Content Section */}
        <div className={finalData.faqs && finalData.faqs.length > 0 ? "mb-8 pb-8 border-b border-stone-100" : ""}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-orange-600" />
            <span>{finalData.badge}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3 tracking-tight">
            {finalData.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6">
            {finalData.desc}
          </p>

          {/* Render In-depth Editorial Content if present */}
          {Boolean('sections' in finalData && (finalData as DiscoverSeoItem).sections && (finalData as DiscoverSeoItem).sections!.length > 0) && (
            <div className="space-y-8 mt-6">
              {(finalData as DiscoverSeoItem).sections!.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3.5">
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                    <span className="w-1.5 h-5 rounded-full bg-orange-500 inline-block shrink-0" />
                    <span>{section.heading}</span>
                  </h3>

                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-stone-600 leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {section.cards && section.cards.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                      {section.cards.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-stone-50/80 rounded-2xl p-4 sm:p-5 border border-stone-200/70 hover:border-orange-200 transition-colors"
                        >
                          {c.tag && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[11px] font-bold mb-2">
                              {c.tag}
                            </span>
                          )}
                          <h4 className="font-bold text-stone-900 text-sm sm:text-base mb-1.5">
                            {c.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                            {c.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.quote && (
                    <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-2xl p-4 sm:p-5 text-stone-700 text-xs sm:text-sm italic leading-relaxed my-3">
                      <strong className="not-italic text-stone-900 font-semibold block mb-1">
                        Bí quyết nhà bếp:
                      </strong>
                      "{section.quote}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        {Boolean(finalData.faqs && finalData.faqs.length > 0) && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Câu Hỏi Thường Gặp
              </h3>
            </div>

            <div className="space-y-3">
              {finalData.faqs.map((faq, index) => {
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
        )}

        {/* Schema.org FAQPage Structured Data for dynamic sub-section / region */}
        {Boolean(currentRegionData && currentRegionData.schemaUrl && currentRegionData.faqs && currentRegionData.faqs.length > 0) && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "@id": `${currentRegionData.schemaUrl}#faq`,
                "mainEntity": currentRegionData.faqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })
            }}
          />
        )}
      </div>
    </section>
  );
};
