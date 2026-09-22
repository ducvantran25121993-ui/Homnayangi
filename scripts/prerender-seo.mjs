import fs from 'fs';
import path from 'path';

// Mapping of static HTML routes and their corresponding SEO metadata
const SEO_ROUTES_CONFIG = {
  "/": {
    path: "/",
    title: "Hôm Nay Ăn Gì - Tarot Ẩm Thực 12 Cung Hoàng Đạo Chuẩn Vị",
    description: "Hôm nay Vũ Trụ mách bạn ăn gì? Trải bài Tarot ẩm thực 12 cung hoàng đạo, khám phá quẻ bói món ăn định mệnh mỗi ngày và đặt món nhanh chóng.",
    keywords: "hôm nay ăn gì, tarot ẩm thực, quẻ bói món ăn, bói bài ăn gì, 12 cung hoàng đạo, vòng quay ăn gì, trưa nay ăn gì, tối nay ăn gì, món ngon mỗi ngày, ẩm thực việt nam, gợi ý món ăn, đặt món shopeefood, grabfood, befood",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Hôm Nay Ăn Gì - Tarot Ẩm Thực 12 Cung Hoàng Đạo & Gợi Ý Món Chuẩn Vị",
  },
  "/am-thuc-vung-mien": {
    path: "/am-thuc-vung-mien",
    title: "Ẩm Thực Vùng Miền - Tinh Hoa Ẩm Thực 3 Miền Bắc, Trung, Nam & Miền Tây | Hôm Nay Ăn Gì",
    description: "Bản đồ ẩm thực 3 miền Việt Nam: Khám phá hương vị thanh tao miền Bắc, đậm đà cay nồng miền Trung, phóng khoáng miền Nam và trù phú miền Tây sông nước.",
    keywords: "ẩm thực vùng miền, ẩm thực 3 miền, ẩm thực việt nam, món ngon miền bắc, món ngon miền trung, món ngon miền nam, ẩm thực miền tây, đặc sản vùng miền việt nam",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Ẩm Thực Vùng Miền - Tinh Hoa Ẩm Thực Bắc Trung Nam",
  },
  "/am-thuc-mien-bac": {
    path: "/am-thuc-mien-bac",
    title: "Ẩm Thực Miền Bắc - Tinh Hoa Hương Vị Thanh Tao Đất Kinh Kỳ | Hôm Nay Ăn Gì",
    description: "Khám phá tinh hoa ẩm thực miền Bắc: Hương vị thanh tao, hài hòa gia vị của phở bò tái lăn, bún chả than hoa, chả cá Lã Vọng, bún thang, xôi xéo và phở cuốn trứ danh.",
    keywords: "ẩm thực miền bắc, món ngon miền bắc, đặc sản miền bắc, ẩm thực hà nội, phở bò tái lăn, bún chả hà nội, chả cá lã vọng, bún thang, xôi xéo, phở cuốn",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Ẩm Thực Miền Bắc - Tinh Hoa Hương Vị Thanh Tao Đất Kinh Kỳ",
  },
  "/am-thuc-mien-trung": {
    path: "/am-thuc-mien-trung",
    title: "Ẩm Thực Miền Trung - Đậm Đà Cay Nồng Nàn Xứ Cố Đô | Hôm Nay Ăn Gì",
    description: "Khám phá ẩm thực miền Trung đặc sắc: Vị cay nồng nàn, đậm đà mắm ruốc của bún bò Huế, mì Quảng, nem nướng Nha Trang, bánh canh chả cá, cơm gà Hội An và bánh bèo chén.",
    keywords: "ẩm thực miền trung, món ngon miền trung, đặc sản miền trung, ẩm thực huế, ẩm thực đà nẵng, bún bò huế, mì quảng, nem nướng nha trang, cơm gà hội an, bánh bèo chén",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Ẩm Thực Miền Trung - Đậm Đà Cay Nồng Nàn Xứ Cố Đô",
  },
  "/am-thuc-mien-nam": {
    path: "/am-thuc-mien-nam",
    title: "Ẩm Thực Miền Nam & Sài Gòn - Hào Sảng & Đậm Vị Phố Thị | Hôm Nay Ăn Gì",
    description: "Thưởng thức ẩm thực miền Nam & Sài Gòn: Hương vị béo ngọt, hào sảng phóng khoáng với cơm tấm sườn bì chả, hủ tiếu Nam Vang, bánh mì chảo, bò kho, phá lấu và gỏi cuốn tôm thịt.",
    keywords: "ẩm thực miền nam, ẩm thực sài gòn, món ngon miền nam, món ngon sài gòn, cơm tấm sườn bì chả, hủ tiếu nam vang, bánh mì thịt nướng, phá lấu bò, gỏi cuốn tôm thịt",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Ẩm Thực Miền Nam & Sài Gòn - Hào Sảng Phóng Khoáng",
  },
  "/am-thuc-mien-tay": {
    path: "/am-thuc-mien-tay",
    title: "Ẩm Thực Miền Tây Sông Nước - Hương Đồng Gió Nội & Đậm Tình Phù Sa | Hôm Nay Ăn Gì",
    description: "Khám phá ẩm thực miền Tây Nam Bộ: Nét mộc mạc dân dã, thơm ngon ngây ngất với lẩu mắm miền Tây, cá kho tộ, canh chua cá lóc, lẩu cá kèo lá giang và bánh xèo giòn rụm.",
    keywords: "ẩm thực miền tây, ẩm thực miền tây sông nước, đặc sản miền tây, món ngon miền tây, lẩu mắm miền tây, canh chua cá lóc, cá kho tộ, lẩu cá kèo, bánh xèo miền tây",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Ẩm Thực Miền Tây Sông Nước - Hương Đồng Gió Nội",
  },
  "/thuc-don-moi-ngay": {
    path: "/thuc-don-moi-ngay",
    title: "Thực Đơn Mỗi Ngày - Gợi Ý Thực Đơn Gia Đình & Bữa Ăn Đủ Dinh Dưỡng | Hôm Nay Ăn Gì",
    description: "Gợi ý thực đơn mỗi ngày từ Thứ 2 đến Chủ Nhật, thực đơn cơm nhà mẹ nấu, ăn trưa văn phòng, eat clean giảm cân và tiệc lẩu nướng cuối tuần chuẩn vị.",
    keywords: "thực đơn mỗi ngày, thực đơn hôm nay, gợi ý thực đơn, cơm nhà mẹ nấu, thực đơn trưa văn phòng, eat clean giảm cân, thực đơn gia đình, món ngon mỗi ngày",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Thực Đơn Mỗi Ngày - Bữa Cơm Gia Đình Đủ Dinh Dưỡng",
  },
  "/cach-nau-mon-ngon": {
    path: "/cach-nau-mon-ngon",
    title: "Cách Nấu Món Ngon - Công Thức Nấu Ăn Chuẩn Vị & Bí Quyết Bếp Trưởng | Hôm Nay Ăn Gì",
    description: "Hướng dẫn chi tiết cách nấu hơn 160+ món ngon chuẩn vị gia đình Việt Nam: Định lượng nguyên liệu chuẩn xác, các bước thực hiện dễ hiểu và mẹo bí quyết bếp trưởng.",
    keywords: "cách nấu món ngon, công thức nấu ăn, hướng dẫn nấu ăn, bí quyết nấu ăn ngon, cách nấu phở, cách nấu bún bò huế, món ngon mỗi ngày, công thức chuẩn vị",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Cách Nấu Món Ngon - Công Thức Nấu Ăn Chuẩn Vị & Bí Quyết Bếp Trưởng",
  },
  "/cach-nau-mon-ngon/cach-nau-pho-bo-tai-lan": {
    path: "/cach-nau-mon-ngon/cach-nau-pho-bo-tai-lan",
    title: "Cách Nấu Phở Bò Tái Lăn Hà Nội Thơm Ngon Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Hướng dẫn chi tiết cách nấu Phở Bò Tái Lăn Hà Nội chuẩn vị: Bí quyết xào thịt bò tái lăn lửa lớn thơm mùi tỏi gừng, nước dùng xương bò hầm trong ngọt thanh và bánh phở mềm mướt.",
    keywords: "cách nấu phở bò tái lăn hà nội thơm ngon chuẩn vị, cách nấu phở bò tái lăn, công thức phở bò tái lăn, phở hà nội, cách làm phở bò, món ngon mỗi ngày",
    image: "/images/dishes/pho_bo_tai_lan.webp",
    imageAlt: "Cách Nấu Phở Bò Tái Lăn Hà Nội Thơm Ngon Chuẩn Vị",
  },
  "/cach-nau-mon-ngon/cach-nau-com-tam-suon-bi-cha": {
    path: "/cach-nau-mon-ngon/cach-nau-com-tam-suon-bi-cha",
    title: "Cách Nấu Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Hướng dẫn cách nấu Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn: Bí quyết ướp sườn nướng than hoa mềm mọng đậm vị, hấp chả trứng vàng ươm và nước mắm chua ngọt chuẩn vị quán cơm tấm.",
    keywords: "cách nấu cơm tấm sườn bì chả đặc biệt sài gòn chuẩn vị, cách làm cơm tấm sườn bì chả, ướp sườn cơm tấm, chả trứng hấp, cơm tấm sài gòn",
    image: "/images/dishes/com_tam_suon_bi_cha.webp",
    imageAlt: "Cách Nấu Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn Chuẩn Vị",
  },
  "/cach-nau-mon-ngon/cach-nau-bun-bo-hue": {
    path: "/cach-nau-mon-ngon/cach-nau-bun-bo-hue",
    title: "Cách Nấu Bún Bò Huế Chả Cua Đậm Đà Chuẩn Vị Cố Đô | Hôm Nay Ăn Gì",
    description: "Công thức chi tiết cách nấu Bún Bò Huế chả cua đậm đà chuẩn vị Cố Đô: Nước lèo hầm xương thơm lừng mùi mắm ruốc sả cây, chả cua giòn ngọt và nạm bắp hoa mềm thơm.",
    keywords: "cách nấu bún bò huế chả cua đậm đà chuẩn vị cố đô, cách nấu bún bò huế, công thức bún bò huế chuẩn vị, bún bò huế, ẩm thực huế",
    image: "/images/dishes/bun_bo_hue.webp",
    imageAlt: "Cách Nấu Bún Bò Huế Chả Cua Đậm Đà Chuẩn Vị Cố Đô",
  },
  "/cach-nau-mon-ngon/cach-nau-thit-kho-tau": {
    path: "/cach-nau-mon-ngon/cach-nau-thit-kho-tau",
    title: "Cách Nấu Thịt Kho Tàu Nước Dừa Trứng Cút Mềm Tan Đậm Đà | Hôm Nay Ăn Gì",
    description: "Bí quyết nấu Thịt Kho Tàu nước dừa xiêm cùng trứng cút mềm tan đậm đà: Thịt ba chỉ trong veo béo ngậy không ngấy, nước kho màu cánh gián tự nhiên chuẩn vị Tết Nam Bộ.",
    keywords: "cách nấu thịt kho tàu nước dừa trứng cút mềm tan đậm đà, cách nấu thịt kho tàu, thịt kho nước dừa, thịt kho tàu miền nam",
    image: "/images/dishes/thit_kho_tau.webp",
    imageAlt: "Cách Nấu Thịt Kho Tàu Nước Dừa Trứng Cút Mềm Tan Đậm Đà",
  },
  "/cach-nau-mon-ngon/cach-nau-nem-nuong-nha-trang": {
    path: "/cach-nau-mon-ngon/cach-nau-nem-nuong-nha-trang",
    title: "Cách Làm Nem Nướng Nha Trang Cuốn Bánh Tráng Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Hướng dẫn cách làm Nem Nướng Nha Trang cuốn bánh tráng rau sống giòn rụm: Công thức quết nem dai ngọt tự nhiên và bí quyết nấu nước sốt chấm tương bơ đậu phộng béo bùi độc quyền.",
    keywords: "cách làm nem nướng nha trang cuốn bánh tráng chuẩn vị, cách làm nem nướng nha trang, sốt chấm nem nướng, nem nướng cuốn bánh tráng",
    image: "/images/dishes/nem_nuong_nha_trang.webp",
    imageAlt: "Cách Làm Nem Nướng Nha Trang Cuốn Bánh Tráng Chuẩn Vị",
  },
  "/cach-nau-mon-ngon/cach-nau-canh-chua-ca-loc": {
    path: "/cach-nau-mon-ngon/cach-nau-canh-chua-ca-loc",
    title: "Cách Nấu Canh Chua Cá Lóc Nam Bộ Thanh Mát Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Cách nấu Canh Chua Cá Lóc Nam Bộ thanh mát giải nhiệt chuẩn vị: Bí quyết khử tanh cá lóc đồng, nước canh chua thanh dịu từ me chín, bạc hà giòn và ngò gai rau ngổ thơm lừng.",
    keywords: "cách nấu canh chua cá lóc nam bộ thanh mát chuẩn vị, cách nấu canh chua cá lóc, canh chua nam bộ, món canh ngon gia đình",
    image: "/images/dishes/canh_chua_ca_loc.webp",
    imageAlt: "Cách Nấu Canh Chua Cá Lóc Nam Bộ Thanh Mát Chuẩn Vị",
  },
  "/cach-nau-mon-ngon/cach-nau-bao-tu-ham-tieu": {
    path: "/cach-nau-mon-ngon/cach-nau-bao-tu-ham-tieu",
    title: "Cách Nấu Bao Tử Hầm Tiêu Xanh Giòn Ngon Đậm Đà Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Hướng dẫn cách nấu Bao Tử Hầm Tiêu Xanh nước dừa tươi giòn sần sật: Mẹo làm sạch bao tử heo không hôi, nước hầm ngọt thanh cay the ấm bụng bồi bổ sức khỏe.",
    keywords: "cách nấu bao tử hầm tiêu xanh giòn ngon đậm đà chuẩn vị, cách nấu bao tử hầm tiêu, bao tử hầm tiêu xanh, món hầm bổ dưỡng",
    image: "/images/dishes/bao_tu_ham_tieu.webp",
    imageAlt: "Cách Nấu Bao Tử Hầm Tiêu Xanh Giòn Ngon Đậm Đà Chuẩn Vị",
  },
  "/cach-nau-mon-ngon/cach-nau-long-nuong": {
    path: "/cach-nau-mon-ngon/cach-nau-long-nuong",
    title: "Cách Làm Lòng Nướng Sa Tế Giòn Cay Than Hoa Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Công thức cách làm Lòng Nướng Sa Tế giòn sần sật cay thơm than hoa: Bí quyết sơ chế lòng heo trắng sạch không đắng, ướp sốt sa tế óng ả và nước chấm muối ớt xanh chuẩn vị mồi nhậu.",
    keywords: "cách làm lòng nướng sa tế giòn cay than hoa chuẩn vị, cách làm lòng nướng sa tế, lòng nướng than hoa, món nhậu ngon",
    image: "/images/dishes/long_nuong.webp",
    imageAlt: "Cách Làm Lòng Nướng Sa Tế Giòn Cay Than Hoa Chuẩn Vị",
  },
  "/cach-nau-mon-ngon/cach-nau-buffet": {
    path: "/cach-nau-mon-ngon/cach-nau-buffet",
    title: "Cách Làm Tiệc Lẩu Nướng Thập Cẩm Đậm Đà Tại Nhà | Hôm Nay Ăn Gì",
    description: "Bí quyết chuẩn bị đại tiệc buffet lẩu nướng thập cẩm tại nhà cho gia đình và bạn bè: Tẩm ướp thịt bò, hải sản tươi sống, pha chế sốt chấm BBQ và nước lẩu chua cay chuẩn vị nhà hàng.",
    keywords: "cách làm tiệc lẩu nướng thập cẩm đậm đà tại nhà, lẩu nướng tại nhà, tiệc nướng gia đình, cách ướp thịt nướng lẩu",
    image: "/images/dishes/buffet.webp",
    imageAlt: "Cách Làm Tiệc Lẩu Nướng Thập Cẩm Đậm Đà Tại Nhà",
  },
  "/cach-nau-mon-ngon/cach-nau-be-thui": {
    path: "/cach-nau-mon-ngon/cach-nau-be-thui",
    title: "Cách Làm Bê Thui Cầu Mống Chấm Mắm Nêm Chuẩn Vị Xứ Quảng | Hôm Nay Ăn Gì",
    description: "Hướng dẫn cách làm Bê Thui Cầu Mống chuẩn vị Xứ Quảng: Da giòn rụm thịt mềm ngọt mọng nước, pha chén mắm nêm cá cơm đậm đà ăn kèm chuối chát, khế chua và rau rừng tươi non.",
    keywords: "cách làm bê thui cầu mống chấm mắm nêm chuẩn vị xứ quảng, cách làm bê thui, bê thui cầu mống, mắm nêm bê thui, đặc sản quảng nam",
    image: "/images/dishes/be_thui.webp",
    imageAlt: "Cách Làm Bê Thui Cầu Mống Chấm Mắm Nêm Chuẩn Vị Xứ Quảng",
  },
  "/cach-nau-mon-ngon/cach-nau-banh-beo": {
    path: "/cach-nau-mon-ngon/cach-nau-banh-beo",
    title: "Cách Làm Bánh Bèo Chén Tôm Chấy Tóp Mỡ Chuẩn Vị Huế | Hôm Nay Ăn Gì",
    description: "Công thức làm Bánh Bèo Chén tôm chấy tóp mỡ chuẩn vị Cố Đô Huế: Bột bánh mềm mướt xoáy sâu lòng chén, tôm chấy đỏ cam ngọt thanh, tóp mỡ giòn rụm và nước mắm ruốc pha ngọt thanh tao.",
    keywords: "cách làm bánh bèo chén tôm chấy tóp mỡ chuẩn vị huế, cách làm bánh bèo huế, bánh bèo chén, tôm chấy bánh bèo, ẩm thực huế",
    image: "/images/dishes/banh_beo.webp",
    imageAlt: "Cách Làm Bánh Bèo Chén Tôm Chấy Tóp Mỡ Chuẩn Vị Huế",
  },
  "/lich-an-theo-tuan": {
    path: "/lich-an-theo-tuan",
    title: "Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị & Tiết Kiệm | Hôm Nay Ăn Gì",
    description: "Lịch ăn theo tuần thông minh từ Thứ 2 đến Chủ Nhật: Tự động chống trùng món, tính calo & chi phí, đổi món linh hoạt, gợi ý bữa sáng trưa tối chuẩn ngon.",
    keywords: "lịch ăn theo tuần, lịch ăn tuần, thực đơn theo tuần, thực đơn 7 ngày, lên lịch ăn, thực đơn gia đình theo tuần, thực đơn giảm cân theo tuần, ăn gì hôm nay",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị",
  },
  "/mon-ngon": {
    path: "/mon-ngon",
    title: "Thực Đơn 160+ Món Ngon Việt Nam - Danh Mục Món Ăn 3 Miền | Hôm Nay Ăn Gì",
    description: "Khám phá danh mục hơn 160 món ngon Việt Nam đặc sắc 3 miền Bắc - Trung - Nam: Cơm, bún, phở, lẩu nướng, đồ chay kèm gợi ý calo, giá cả và đặt ship nhanh.",
    keywords: "món ngon việt nam, thực đơn món ngon, 160 món ngon, món ngon 3 miền, món ăn bắc trung nam, danh sách món ngon, đặt món online, tra cứu món ăn",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Thực Đơn Hơn 160 Món Ngon Việt Nam Chuẩn Vị 3 Miền",
  },
  "/do-uong-an-vat": {
    path: "/do-uong-an-vat",
    title: "Đồ Uống & Ăn Vặt - Trà Sữa, Cà Phê, Sinh Tố & Món Ăn Vặt Xế Chiều Hot Trend | Hôm Nay Ăn Gì",
    description: "Thưởng thức thế giới trà sữa trân châu, cà phê muối, trà trái cây tươi mát cùng bánh tráng trộn, nem chua rán, bánh tráng nướng giòn rụm kèm liên kết đặt ship hỏa tốc gần bạn.",
    keywords: "đồ uống ăn vặt, trà sữa ăn vặt, trà sữa trân châu, đồ ăn vặt, ăn vặt đường phố, trà đào cam sả, cà phê muối, bánh tráng trộn, bánh tráng nướng, ăn xế chiều",
    image: "https://images.unsplash.com/photo-1558857563-b37cf5429e5a?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Đồ Uống & Ăn Vặt - Trà Sữa & Đồ Ăn Xế Chiều Hot Trend",
  },
  "/tra-sua-an-vat": {
    path: "/do-uong-an-vat",
    title: "Đồ Uống & Ăn Vặt - Trà Sữa, Cà Phê, Sinh Tố & Món Ăn Vặt Xế Chiều Hot Trend | Hôm Nay Ăn Gì",
    description: "Thưởng thức thế giới trà sữa trân châu, cà phê muối, trà trái cây tươi mát cùng bánh tráng trộn, nem chua rán, bánh tráng nướng giòn rụm kèm liên kết đặt ship hỏa tốc gần bạn.",
    keywords: "đồ uống ăn vặt, trà sữa ăn vặt, trà sữa trân châu, đồ ăn vặt, ăn vặt đường phố, trà đào cam sả, cà phê muối, bánh tráng trộn, bánh tráng nướng, ăn xế chiều",
    image: "https://images.unsplash.com/photo-1558857563-b37cf5429e5a?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Đồ Uống & Ăn Vặt - Trà Sữa & Đồ Ăn Xế Chiều Hot Trend",
  },
  "/vong-quay": {
    path: "/vong-quay",
    title: "Vòng Quay Ăn Gì - Quay Món Ngẫu Nhiên Trong 3 Giây | Hôm Nay Ăn Gì",
    description: "Quay vòng quay ăn gì ngẫu nhiên giúp bạn chốt món chỉ trong 3 giây. Tùy chỉnh danh sách món ngon, chọn chủ đề cơm trưa, bún phở, lẩu nướng và kết nối đặt ship ngay.",
    keywords: "vòng quay ăn gì, vòng quay món ăn, bánh xe món ăn, hôm nay ăn gì, trưa nay ăn gì, vòng quay may mắn, chọn món ngẫu nhiên, quyết định món ăn, đặt món shopeefood, grabfood, befood",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Vòng Quay Ăn Gì - Quyết Định Bữa Ăn Nhanh 3 Giây",
  },
  "/ai-goi-y-mon-an": {
    path: "/ai-goi-y-mon-an",
    title: "Trợ Lý AI Gợi Ý Món Ăn - Chọn Món Ngon Theo Gu & Đặt Ship Gần Bạn | Hôm Nay Ăn Gì",
    description: "Gợi ý món ăn thông minh và gần gũi: Chọn món ngon mỗi ngày theo tâm trạng, thời tiết, ngân sách và sở thích ăn uống. Tự động kết nối quán ngon gần bạn.",
    keywords: "trợ lý ai món ăn, ai gợi ý món ăn, hôm nay ăn gì ai, gợi ý món ăn thông minh, tìm món theo thời tiết, tìm món theo tâm trạng, đặt món giao tận nơi",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Trợ Lý AI Gợi Ý Món Ăn Chuẩn Vị - Hôm Nay Ăn Gì",
  },
  "/gioi-thieu": {
    path: "/gioi-thieu",
    title: "Hôm Nay Ăn Gì - Câu Chuyện Về Người Bạn Đồng Hành Bữa Ăn Ngon",
    description: "Không còn đau đầu nghĩ \"Hôm nay ăn gì?\". Khám phá câu chuyện của tụi mình – người bạn thân giúp bạn chọn món ngon mỗi bữa cực nhanh, dễ dàng và tràn đầy niềm vui!",
    keywords: "giới thiệu hôm nay ăn gì, câu chuyện hôm nay ăn gì, về chúng tôi, sứ mệnh ẩm thực việt nam, bạn đồng hành bữa ăn",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Giới Thiệu Hôm Nay Ăn Gì - Nền Tảng Gợi Ý Ẩm Thực Hàng Đầu",
  },
  "/lien-he": {
    path: "/lien-he",
    title: "Hôm Nay Ăn Gì - Góp Ý Món Ngon, Hợp Tác Quảng Cáo & Nhà Hàng",
    description: "Kết nối cùng đội ngũ Hôm Nay Ăn Gì (Angigio.com): Góp ý món ngon mới, đề xuất cải tiến tính năng hoặc hợp tác truyền thông và đăng ký đối tác nhà hàng nhanh chóng.",
    keywords: "liên hệ hôm nay ăn gì, góp ý món ngon, hợp tác nhà hàng, quảng cáo ẩm thực, đối tác ẩm thực angigio",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Liên Hệ Hôm Nay Ăn Gì - Góp Ý Món Ngon & Hợp Tác Nhà Hàng",
  },
  "/chinh-sach-bao-mat": {
    path: "/chinh-sach-bao-mat",
    title: "Chính Sách Bảo Mật - Bảo Vệ Quyền Riêng Tư & An Toàn Dữ Liệu | Hôm Nay Ăn Gì",
    description: "Chính sách bảo mật minh bạch của Hôm Nay Ăn Gì: Tối giản thu thập dữ liệu, tôn trọng quyền riêng tư, an toàn khi trải nghiệm gợi ý ẩm thực và liên kết đặt món.",
    keywords: "chính sách bảo mật, bảo mật hôm nay ăn gì, quyền riêng tư, an toàn thông tin angigio",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Chính Sách Bảo Mật - Hôm Nay Ăn Gì",
  },
  "/dieu-khoan-su-dung": {
    path: "/dieu-khoan-su-dung",
    title: "Điều Khoản Sử Dụng - Thỏa Thuận Người Dùng & Quy Định Dịch Vụ | Hôm Nay Ăn Gì",
    description: "Điều khoản sử dụng dịch vụ Hôm Nay Ăn Gì: Quy định về trải nghiệm gợi ý món ăn, bách khoa ẩm thực, tính năng liên kết đối tác và quyền sở hữu trí tuệ.",
    keywords: "điều khoản sử dụng, quy định hôm nay ăn gì, thỏa thuận dịch vụ, điều khoản angigio",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Điều Khoản Sử Dụng - Hôm Nay Ăn Gì",
  },
};

function injectMeta(html, meta) {
  const fullUrl = `https://www.angigio.com${meta.path === "/" ? "/" : meta.path}`;
  return html
    .replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`)
    .replace(/<meta\s+name="title"\s+content=".*?"\s*\/?>/i, `<meta name="title" content="${meta.title}" />`)
    .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${meta.description}" />`)
    .replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/i, `<meta name="keywords" content="${meta.keywords}" />`)
    .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${fullUrl}" />`)
    .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${fullUrl}" />`)
    .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${meta.image}" />`)
    .replace(/<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/i, `<meta property="og:image:alt" content="${meta.imageAlt}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${meta.description}" />`)
    .replace(/<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:url" content="${fullUrl}" />`)
    .replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${meta.image}" />`);
}

function generateStaticHtmlPages() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const [routePath, meta] of Object.entries(SEO_ROUTES_CONFIG)) {
    if (routePath === '/') {
      // Root index.html
      const customizedHtml = injectMeta(baseHtml, meta);
      fs.writeFileSync(indexHtmlPath, customizedHtml, 'utf-8');
      console.log(`Generated SEO HTML for: ${routePath}`);
    } else {
      // Sub-route e.g. /lien-he -> dist/lien-he/index.html & dist/lien-he.html
      const cleanSub = routePath.replace(/^\//, '');
      const subDir = path.join(distDir, cleanSub);
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
      const customizedHtml = injectMeta(baseHtml, meta);
      fs.writeFileSync(path.join(subDir, 'index.html'), customizedHtml, 'utf-8');
      fs.writeFileSync(path.join(distDir, `${cleanSub}.html`), customizedHtml, 'utf-8');
      console.log(`Generated SEO HTML for: ${routePath} -> dist/${cleanSub}/index.html & dist/${cleanSub}.html`);
    }
  }

  console.log('Prerender SEO HTML pages completed successfully!');
}

generateStaticHtmlPages();
