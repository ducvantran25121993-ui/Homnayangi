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
