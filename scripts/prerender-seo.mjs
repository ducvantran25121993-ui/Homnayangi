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
    description: "Hướng dẫn chi tiết công thức nấu ăn chuẩn vị quán: Định lượng nguyên liệu chuẩn xác, các bước thực hiện dễ hiểu và mẹo bí quyết bếp trưởng.",
    keywords: "cách nấu món ngon, công thức nấu ăn, hướng dẫn nấu ăn, bí quyết nấu ăn ngon, cách nấu phở bò tái lăn, cách nấu cơm tấm sườn bì chả, cách làm cơm gà xối mỡ, món ngon mỗi ngày",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Cách Nấu Món Ngon - Công Thức Nấu Ăn Chuẩn Vị & Bí Quyết Bếp Trưởng",
  },
  // 1. Phở Bò Tái Lăn Hà Nội (Crucial fix for Google Search Console 404)
  "/cach-nau-pho-bo-tai-lan": {
    path: "/cach-nau-pho-bo-tai-lan",
    title: "Cách Nấu Phở Bò Tái Lăn Hà Nội Thơm Nức, Đậm Đà Chuẩn Vị Phố Cổ | Hôm Nay Ăn Gì",
    description: "Bí quyết nấu Phở Bò Tái Lăn Hà Nội chuẩn vị Phố Cổ: Nước dùng hầm xương trong veo thơm mùi quế hồi, thịt bò thăn xào tái lăn chảo gang lửa lớn mềm ngọt và bánh phở mướt mềm.",
    keywords: "cách nấu phở bò tái lăn hà nội, cách nấu phở bò tái lăn, phở bò tái lăn hà nội chuẩn vị, công thức phở bò, phở hà nội, ẩm thực miền bắc",
    image: "/images/dishes/pho_bo_tai_lan.webp",
    imageAlt: "Cách Nấu Phở Bò Tái Lăn Hà Nội Thơm Nức Đậm Đà Chuẩn Vị",
  },
  // 2. Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn
  "/cach-nau-com-tam-suon-bi-cha": {
    path: "/cach-nau-com-tam-suon-bi-cha",
    title: "Cách Nấu Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Hướng dẫn cách nấu Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn: Bí quyết ướp sườn nướng than hoa mềm mọng đậm vị, hấp chả trứng vàng ươm và nước mắm chua ngọt chuẩn vị quán cơm tấm.",
    keywords: "cách nấu cơm tấm sườn bì chả đặc biệt sài gòn chuẩn vị, cách làm cơm tấm sườn bì chả, ướp sườn cơm tấm, chả trứng hấp, cơm tấm sài gòn",
    image: "/images/dishes/com_tam_suon_bi_cha.webp",
    imageAlt: "Cách Nấu Cơm Tấm Sườn Bì Chả Đặc Biệt Sài Gòn Chuẩn Vị",
  },
  // 3. Bún Bò Huế
  "/cach-nau-bun-bo-hue": {
    path: "/cach-nau-bun-bo-hue",
    title: "Cách Nấu Bún Bò Huế Chả Cua Đậm Đà Chuẩn Vị Cố Đô | Hôm Nay Ăn Gì",
    description: "Công thức chi tiết cách nấu Bún Bò Huế chả cua đậm đà chuẩn vị Cố Đô: Nước lèo hầm xương thơm lừng mùi mắm ruốc sả cây, chả cua giòn ngọt và nạm bắp hoa mềm thơm.",
    keywords: "cách nấu bún bò huế chả cua đậm đà chuẩn vị cố đô, cách nấu bún bò huế, công thức bún bò huế chuẩn vị, bún bò huế, ẩm thực huế",
    image: "/images/dishes/bun_bo_hue.webp",
    imageAlt: "Cách Nấu Bún Bò Huế Chả Cua Đậm Đà Chuẩn Vị Cố Đô",
  },
  // 4. Thịt Kho Tàu
  "/cach-nau-thit-kho-tau": {
    path: "/cach-nau-thit-kho-tau",
    title: "Cách Nấu Thịt Kho Tàu Nước Dừa Trứng Cút Mềm Tan Đậm Đà | Hôm Nay Ăn Gì",
    description: "Bí quyết nấu Thịt Kho Tàu nước dừa xiêm cùng trứng cút mềm tan đậm đà: Thịt ba chỉ trong veo béo ngậy không ngấy, nước kho màu cánh gián tự nhiên chuẩn vị Tết Nam Bộ.",
    keywords: "cách nấu thịt kho tàu nước dừa trứng cút mềm tan đậm đà, cách nấu thịt kho tàu, thịt kho nước dừa, thịt kho tàu miền nam",
    image: "/images/dishes/thit_kho_tau.webp",
    imageAlt: "Cách Nấu Thịt Kho Tàu Nước Dừa Trứng Cút Mềm Tan Đậm Đà",
  },
  // 5. Nem Nướng Nha Trang
  "/cach-nau-nem-nuong-nha-trang": {
    path: "/cach-nau-nem-nuong-nha-trang",
    title: "Cách Làm Nem Nướng Nha Trang Cuốn Bánh Tráng Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Hướng dẫn cách làm Nem Nướng Nha Trang cuốn bánh tráng rau sống giòn rụm: Công thức quết nem dai ngọt tự nhiên và bí quyết nấu nước sốt chấm tương bơ đậu phộng béo bùi độc quyền.",
    keywords: "cách làm nem nướng nha trang cuốn bánh tráng chuẩn vị, cách làm nem nướng nha trang, sốt chấm nem nướng, nem nướng cuốn bánh tráng",
    image: "/images/dishes/nem_nuong_nha_trang.webp",
    imageAlt: "Cách Làm Nem Nướng Nha Trang Cuốn Bánh Tráng Chuẩn Vị",
  },
  // 6. Canh Chua Cá Lóc
  "/cach-nau-canh-chua-ca-loc": {
    path: "/cach-nau-canh-chua-ca-loc",
    title: "Cách Nấu Canh Chua Cá Lóc Nam Bộ Thanh Mát Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Cách nấu Canh Chua Cá Lóc Nam Bộ thanh mát giải nhiệt chuẩn vị: Bí quyết khử tanh cá lóc đồng, nước canh chua thanh dịu từ me chín, bạc hà giòn và ngò gai rau ngổ thơm lừng.",
    keywords: "cách nấu canh chua cá lóc nam bộ thanh mát chuẩn vị, cách nấu canh chua cá lóc, canh chua nam bộ, món canh ngon gia đình",
    image: "/images/dishes/canh_chua_ca_loc.webp",
    imageAlt: "Cách Nấu Canh Chua Cá Lóc Nam Bộ Thanh Mát Chuẩn Vị",
  },
  // 7. Bao Tử Hầm Tiêu
  "/cach-nau-bao-tu-ham-tieu": {
    path: "/cach-nau-bao-tu-ham-tieu",
    title: "Cách Nấu Bao Tử Hầm Tiêu Xanh Giòn Ngon Đậm Đà Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Hướng dẫn cách nấu Bao Tử Hầm Tiêu Xanh nước dừa tươi giòn sần sật: Mẹo làm sạch bao tử heo không hôi, nước hầm ngọt thanh cay the ấm bụng bồi bổ sức khỏe.",
    keywords: "cách nấu bao tử hầm tiêu xanh giòn ngon đậm đà chuẩn vị, cách nấu bao tử hầm tiêu, bao tử hầm tiêu xanh, món hầm bổ dưỡng",
    image: "/images/dishes/bao_tu_ham_tieu.webp",
    imageAlt: "Cách Nấu Bao Tử Hầm Tiêu Xanh Giòn Ngon Đậm Đà Chuẩn Vị",
  },
  // 8. Lòng Nướng
  "/cach-nau-long-nuong": {
    path: "/cach-nau-long-nuong",
    title: "Cách Làm Lòng Nướng Sa Tế Giòn Cay Than Hoa Chuẩn Vị | Hôm Nay Ăn Gì",
    description: "Công thức cách làm Lòng Nướng Sa Tế giòn sần sật cay thơm than hoa: Bí quyết sơ chế lòng heo trắng sạch không đắng, ướp sốt sa tế óng ả và nước chấm muối ớt xanh chuẩn vị mồi nhậu.",
    keywords: "cách làm lòng nướng sa tế giòn cay than hoa chuẩn vị, cách làm lòng nướng sa tế, lòng nướng than hoa, món nhậu ngon",
    image: "/images/dishes/long_nuong.webp",
    imageAlt: "Cách Làm Lòng Nướng Sa Tế Giòn Cay Than Hoa Chuẩn Vị",
  },
  // 9. Tiệc Buffet
  "/cach-nau-buffet": {
    path: "/cach-nau-buffet",
    title: "Cách Làm Tiệc Lẩu Nướng Thập Cẩm Đậm Đà Tại Nhà | Hôm Nay Ăn Gì",
    description: "Bí quyết chuẩn bị đại tiệc buffet lẩu nướng thập cẩm tại nhà cho gia đình và bạn bè: Tẩm ướp thịt bò, hải sản tươi sống, pha chế sốt chấm BBQ và nước lẩu chua cay chuẩn vị nhà hàng.",
    keywords: "cách làm tiệc lẩu nướng thập cẩm đậm đà tại nhà, lẩu nướng tại nhà, tiệc nướng gia đình, cách ướp thịt nướng lẩu",
    image: "/images/dishes/buffet.webp",
    imageAlt: "Cách Làm Tiệc Lẩu Nướng Thập Cẩm Đậm Đà Tại Nhà",
  },
  // 10. Bê Thui Cầu Mống
  "/cach-nau-be-thui": {
    path: "/cach-nau-be-thui",
    title: "Cách Làm Bê Thui Cầu Mống Chấm Mắm Nêm Chuẩn Vị Xứ Quảng | Hôm Nay Ăn Gì",
    description: "Hướng dẫn cách làm Bê Thui Cầu Mống chuẩn vị Xứ Quảng: Da giòn rụm thịt mềm ngọt mọng nước, pha chén mắm nêm cá cơm đậm đà ăn kèm chuối chát, khế chua và rau rừng tươi non.",
    keywords: "cách làm bê thui cầu mống chấm mắm nêm chuẩn vị xứ quảng, cách làm bê thui, bê thui cầu mống, mắm nêm bê thui, đặc sản quảng nam",
    image: "/images/dishes/be_thui.webp",
    imageAlt: "Cách Làm Bê Thui Cầu Mống Chấm Mắm Nêm Chuẩn Vị Xứ Quảng",
  },
  // 11. Bánh Bèo Chén
  "/cach-nau-banh-beo": {
    path: "/cach-nau-banh-beo",
    title: "Cách Làm Bánh Bèo Chén Tôm Chấy Tóp Mỡ Chuẩn Vị Huế | Hôm Nay Ăn Gì",
    description: "Công thức làm Bánh Bèo Chén tôm chấy tóp mỡ chuẩn vị Cố Đô Huế: Bột bánh mềm mướt xoáy sâu lòng chén, tôm chấy đỏ cam ngọt thanh, tóp mỡ giòn rụm và nước mắm ruốc pha ngọt thanh tao.",
    keywords: "cách làm bánh bèo chén tôm chấy tóp mỡ chuẩn vị huế, cách làm bánh bèo huế, bánh bèo chén, tôm chấy bánh bèo, ẩm thực huế",
    image: "/images/dishes/banh_beo.webp",
    imageAlt: "Cách Làm Bánh Bèo Chén Tôm Chấy Tóp Mỡ Chuẩn Vị Huế",
  },
  // 12. Cơm Gà Xối Mỡ
  "/cach-nau-com-ga-xoi-mo": {
    path: "/cach-nau-com-ga-xoi-mo",
    title: "Cách Làm Cơm Gà Xối Mỡ Thơm Ngon Đậm Đà Chuẩn Quán | Hôm Nay Ăn Gì",
    description: "Hướng dẫn chi tiết cách làm Cơm Gà Xối Mỡ da giòn rụm màu cánh gián, hạt cơm vàng óng dẻo thơm: Bí quyết sơ chế ướp gà ngũ vị hương, nấu cơm nghệ béo thơm và kỹ thuật xối mỡ giòn tan chuẩn tiệm.",
    keywords: "cách làm cơm gà xối mỡ thơm ngon đậm đà chuẩn quán, cách làm cơm gà xối mỡ, cơm gà xối mỡ da giòn, cơm gà xối mỡ, món ngon mỗi ngày",
    image: "/images/com_ga_xoi_mo.jpg",
    imageAlt: "Cách Làm Cơm Gà Xối Mỡ Thơm Ngon Đậm Đà Chuẩn Quán",
  },
  // 13. Xôi Xéo Hà Nội
  "/cach-nau-xoi-xeo-ha-noi": {
    path: "/cach-nau-xoi-xeo-ha-noi",
    title: "Cách Nấu Xôi Xéo Hà Nội Dẻo Thơm Óng Ả Chuẩn Vị Truyền Thống Phố Cổ | Hôm Nay Ăn Gì",
    description: "Bí quyết nấu Xôi Xéo Hà Nội dẻo thơm óng ả chuẩn vị phố cổ: Kỹ thuật đồ xôi 2 lửa nếp cái hoa vàng bóng mượt, giã nén đậu xanh thái xéo mỏng như lụa, mỡ gà vàng ươm và hành phi giòn tan.",
    keywords: "cách nấu xôi xéo hà nội dẻo thơm óng ả chuẩn vị truyền thống, cách nấu xôi xéo hà nội, bí quyết đồ xôi xéo, xôi xéo phố cổ, mỡ gà hành phi xôi xéo",
    image: "/images/xoi_xeo_ha_noi.jpg",
    imageAlt: "Cách Nấu Xôi Xéo Hà Nội Dẻo Thơm Óng Ả Chuẩn Vị Truyền Thống",
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
    title: "Giới Thiệu Hôm Nay Ăn Gì - Nền Tảng Gợi Ý Ẩm Thực Thông Minh",
    description: "Khám phá Hôm Nay Ăn Gì (Angigio.com) - Nền tảng gợi ý món ngon thông minh qua Tarot, vòng quay và đầu bếp AI. Chấm dứt nỗi lo ăn gì mỗi ngày chỉ trong 3 giây!",
    keywords: "giới thiệu hôm nay ăn gì, câu chuyện hôm nay ăn gì, về chúng tôi, sứ mệnh ẩm thực việt nam, bạn đồng hành bữa ăn, gợi ý món ăn hôm nay",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    imageAlt: "Giới Thiệu Hôm Nay Ăn Gì - Nền Tảng Gợi Ý Ẩm Thực Thông Minh",
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
  const isRecipeRoute =
    meta.path.startsWith("/cach-nau-") ||
    meta.path.startsWith("/cach-lam-") ||
    meta.path.startsWith("/cach-nau-mon-ngon/");

  let updated = html
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

  if (isRecipeRoute) {
    updated = updated.replace(
      /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:type" content="article" />\n    <meta property="article:published_time" content="2024-01-15T08:00:00+07:00" />\n    <meta property="article:modified_time" content="2026-09-23T00:00:00+07:00" />\n    <meta property="article:author" content="Hôm Nay Ăn Gì" />\n    <meta property="article:section" content="Công thức món ngon" />`
    );
  }

  return updated;
}

function extractAllSitemapPaths() {
  const sitemapPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  const paths = new Set();
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    const matches = sitemapContent.matchAll(/<loc>https:\/\/www\.angigio\.com([^<]*)<\/loc>/g);
    for (const match of matches) {
      const p = match[1] || '/';
      paths.add(p.replace(/\/$/, '') || '/');
    }
  }
  return paths;
}

function generateStaticHtmlPages() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  // Collect all targets from SEO_ROUTES_CONFIG and sitemap.xml
  const allRoutes = new Map();

  for (const [routePath, meta] of Object.entries(SEO_ROUTES_CONFIG)) {
    allRoutes.set(routePath, meta);
  }

  // Also read public/sitemap.xml to ensure 100% coverage
  const sitemapPaths = extractAllSitemapPaths();
  for (const sPath of sitemapPaths) {
    if (!allRoutes.has(sPath)) {
      const cleanSlug = sPath.replace(/^\//, '');
      const normalizedName = cleanSlug
        .replace(/^cach-(?:nau|lam)-/, '')
        .split('-')
        .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
        .join(' ')
        .trim();

      allRoutes.set(sPath, {
        path: sPath,
        title: `Cách Nấu ${normalizedName} Thơm Ngon Chuẩn Vị | Hôm Nay Ăn Gì`,
        description: `Hướng dẫn chi tiết từng bước nấu món ${normalizedName} thơm ngon, chuẩn vị gia đình Việt Nam: Định lượng nguyên liệu, mẹo sơ chế và bí quyết nêm nếm.`,
        keywords: `cách nấu ${normalizedName.toLowerCase()}, công thức nấu ${normalizedName.toLowerCase()}, hướng dẫn làm ${normalizedName.toLowerCase()}, món ngon mỗi ngày, ẩm thực việt nam`,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop&q=80",
        imageAlt: `Cách Nấu ${normalizedName} Thơm Ngon Chuẩn Vị`,
      });
    }
  }

  // Also support the alternate URL structure /cach-nau-mon-ngon/:slug
  const recipeRoutes = Array.from(allRoutes.entries()).filter(([p]) =>
    p.startsWith('/cach-nau-') || p.startsWith('/cach-lam-')
  );
  for (const [p, meta] of recipeRoutes) {
    const altPath = `/cach-nau-mon-ngon${p}`;
    if (!allRoutes.has(altPath)) {
      allRoutes.set(altPath, {
        ...meta,
        path: altPath,
      });
    }
  }

  let generatedCount = 0;

  for (const [routePath, meta] of allRoutes.entries()) {
    const customizedHtml = injectMeta(baseHtml, meta);

    if (routePath === '/') {
      // Root index.html
      fs.writeFileSync(indexHtmlPath, customizedHtml, 'utf-8');
      generatedCount++;
    } else {
      const cleanSub = routePath.replace(/^\//, '');
      const subDir = path.join(distDir, cleanSub);
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }

      // Generate both /path/index.html AND /path.html for maximum static host compatibility (Vercel, Netlify, Cloudflare, S3, Nginx)
      const indexPath = path.join(subDir, 'index.html');
      const flatHtmlPath = path.join(distDir, `${cleanSub}.html`);

      fs.writeFileSync(indexPath, customizedHtml, 'utf-8');

      // Make sure parent dir of flatHtmlPath exists if path has slashes (e.g. /cach-nau-mon-ngon/...)
      const flatParent = path.dirname(flatHtmlPath);
      if (!fs.existsSync(flatParent)) {
        fs.mkdirSync(flatParent, { recursive: true });
      }
      fs.writeFileSync(flatHtmlPath, customizedHtml, 'utf-8');
      generatedCount++;
    }
  }

  console.log(`Prerendered SEO HTML for ${generatedCount} routes successfully!`);
}

generateStaticHtmlPages();
