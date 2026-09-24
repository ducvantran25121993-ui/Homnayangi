import { INITIAL_DISHES } from './dishes';
import { REGIONAL_CUISINES } from './regionalCuisine';
import { getDishRecipe, getRecipeSlug, getRecipeArticleTitle, formatRecipeSeoTitle, RECIPE_SLUG_ALIASES } from './recipes';

export interface RouteSeoMeta {
  path: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  imageAlt: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: string;
  isArticle?: boolean;
}

export const BASE_SEO_ROUTES: Record<string, RouteSeoMeta> = {
  '/': {
    path: '/',
    title: 'Hôm Nay Ăn Gì - Tarot Ẩm Thực 12 Cung Hoàng Đạo Chuẩn Vị',
    description: 'Hôm nay Vũ Trụ mách bạn ăn gì? Trải bài Tarot ẩm thực 12 cung hoàng đạo, khám phá quẻ bói món ăn định mệnh mỗi ngày và đặt món nhanh chóng.',
    keywords: 'hôm nay ăn gì, tarot ẩm thực, quẻ bói món ăn, bói bài ăn gì, 12 cung hoàng đạo, vòng quay ăn gì, trưa nay ăn gì, tối nay ăn gì, món ngon mỗi ngày, ẩm thực việt nam, gợi ý món ăn, đặt món shopeefood, grabfood, befood',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Hôm Nay Ăn Gì - Tarot Ẩm Thực 12 Cung Hoàng Đạo & Gợi Ý Món Chuẩn Vị',
    priority: 1.0,
    changefreq: 'daily',
    lastmod: '2026-09-24',
  },
  '/vong-quay': {
    path: '/vong-quay',
    title: 'Vòng Quay Ăn Gì - Quay Món Ngẫu Nhiên Trong 3 Giây | Hôm Nay Ăn Gì',
    description: 'Quay vòng quay ăn gì ngẫu nhiên giúp bạn chốt món chỉ trong 3 giây. Tùy chỉnh danh sách món ngon, chọn chủ đề cơm trưa, bún phở, lẩu nướng và kết nối đặt ship ngay.',
    keywords: 'vòng quay ăn gì, vòng quay món ăn, bánh xe món ăn, hôm nay ăn gì, trưa nay ăn gì, vòng quay may mắn, chọn món ngẫu nhiên, quyết định món ăn, đặt món shopeefood, grabfood, befood',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Vòng Quay Ăn Gì - Quyết Định Bữa Ăn Nhanh 3 Giây',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: '2026-09-24',
  },
  '/lich-an-theo-tuan': {
    path: '/lich-an-theo-tuan',
    title: 'Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị & Tiết Kiệm | Hôm Nay Ăn Gì',
    description: 'Lịch ăn theo tuần thông minh từ Thứ 2 đến Chủ Nhật: Tự động chống trùng món, tính calo & chi phí, đổi món linh hoạt, gợi ý bữa sáng trưa tối chuẩn ngon.',
    keywords: 'lịch ăn theo tuần, lịch ăn tuần, thực đơn theo tuần, thực đơn 7 ngày, lên lịch ăn, thực đơn gia đình theo tuần, thực đơn giảm cân theo tuần, ăn gì hôm nay',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị',
    priority: 0.95,
    changefreq: 'daily',
    lastmod: '2026-09-24',
  },
  '/ai-goi-y-mon-an': {
    path: '/ai-goi-y-mon-an',
    title: 'Trợ Lý AI Gợi Ý Món Ăn - Chọn Món Ngon Theo Gu & Đặt Ship Gần Bạn | Hôm Nay Ăn Gì',
    description: 'Gợi ý món ăn thông minh và gần gũi: Chọn món ngon mỗi ngày theo tâm trạng, thời tiết, ngân sách và sở thích ăn uống. Tự động kết nối quán ngon gần bạn.',
    keywords: 'trợ lý ai món ăn, ai gợi ý món ăn, hôm nay ăn gì ai, gợi ý món ăn thông minh, tìm món theo thời tiết, tìm món theo tâm trạng, đặt món giao tận nơi',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Trợ Lý AI Gợi Ý Món Ăn Chuẩn Vị - Hôm Nay Ăn Gì',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: '2026-09-24',
  },
  '/mon-ngon': {
    path: '/mon-ngon',
    title: 'Thực Đơn 160+ Món Ngon Việt Nam - Danh Mục Món Ăn 3 Miền | Hôm Nay Ăn Gì',
    description: 'Khám phá danh mục hơn 160 món ngon Việt Nam đặc sắc 3 miền Bắc - Trung - Nam: Cơm, bún, phở, lẩu nướng, đồ chay kèm gợi ý calo, giá cả và đặt ship nhanh.',
    keywords: 'món ngon việt nam, thực đơn món ngon, 160 món ngon, món ngon 3 miền, món ăn bắc trung nam, danh sách món ngon, đặt món online, tra cứu món ăn',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Thực Đơn Hơn 160 Món Ngon Việt Nam Chuẩn Vị 3 Miền',
    priority: 0.85,
    changefreq: 'weekly',
    lastmod: '2026-09-24',
  },
  '/do-uong-an-vat': {
    path: '/do-uong-an-vat',
    title: 'Đồ Uống & Ăn Vặt - Trà Sữa, Cà Phê, Sinh Tố & Món Ăn Vặt Xế Chiều Hot Trend | Hôm Nay Ăn Gì',
    description: 'Thưởng thức thế giới trà sữa trân châu, cà phê muối, trà trái cây tươi mát cùng bánh tráng trộn, nem chua rán, bánh tráng nướng giòn rụm kèm liên kết đặt ship hỏa tốc gần bạn.',
    keywords: 'đồ uống ăn vặt, trà sữa ăn vặt, trà sữa trân châu, đồ ăn vặt, ăn vặt đường phố, trà đào cam sả, cà phê muối, bánh tráng trộn, bánh tráng nướng, ăn xế chiều',
    image: 'https://images.unsplash.com/photo-1558857563-b37cf5429e5a?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Đồ Uống & Ăn Vặt - Trà Sữa & Đồ Ăn Xế Chiều Hot Trend',
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: '2026-09-24',
  },
  '/am-thuc-vung-mien': {
    path: '/am-thuc-vung-mien',
    title: 'Ẩm Thực Vùng Miền - Tinh Hoa Ẩm Thực 3 Miền Bắc, Trung, Nam & Miền Tây | Hôm Nay Ăn Gì',
    description: 'Bản đồ ẩm thực 3 miền Việt Nam: Khám phá hương vị thanh tao miền Bắc, đậm đà cay nồng miền Trung, phóng khoáng miền Nam và trù phú miền Tây sông nước.',
    keywords: 'ẩm thực vùng miền, ẩm thực 3 miền, ẩm thực việt nam, món ngon miền bắc, món ngon miền trung, món ngon miền nam, ẩm thực miền tây, đặc sản vùng miền việt nam',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Ẩm Thực Vùng Miền - Tinh Hoa Ẩm Thực Bắc Trung Nam',
    priority: 0.95,
    changefreq: 'daily',
    lastmod: '2026-09-24',
  },
  '/thuc-don-moi-ngay': {
    path: '/thuc-don-moi-ngay',
    title: 'Thực Đơn Mỗi Ngày - Gợi Ý Thực Đơn Gia Đình & Bữa Ăn Đủ Dinh Dưỡng | Hôm Nay Ăn Gì',
    description: 'Gợi ý thực đơn mỗi ngày từ Thứ 2 đến Chủ Nhật, thực đơn cơm nhà mẹ nấu, ăn trưa văn phòng, eat clean giảm cân và tiệc lẩu nướng cuối tuần chuẩn vị.',
    keywords: 'thực đơn mỗi ngày, thực đơn hôm nay, gợi ý thực đơn, cơm nhà mẹ nấu, thực đơn trưa văn phòng, eat clean giảm cân, thực đơn gia đình, món ngon mỗi ngày',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Thực Đơn Mỗi Ngày - Bữa Cơm Gia Đình Đủ Dinh Dưỡng',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: '2026-09-24',
  },
  '/cach-nau-mon-ngon': {
    path: '/cach-nau-mon-ngon',
    title: 'Cách Nấu Món Ngon - Công Thức Nấu Ăn Chuẩn Vị & Bí Quyết Bếp Trưởng | Hôm Nay Ăn Gì',
    description: 'Hướng dẫn chi tiết cách nấu hơn 210+ món ngon chuẩn vị gia đình Việt Nam: Định lượng nguyên liệu chuẩn xác, các bước thực hiện dễ hiểu và mẹo bí quyết bếp trưởng.',
    keywords: 'cách nấu món ngon, công thức nấu ăn, hướng dẫn nấu ăn, bí quyết nấu ăn ngon, cách nấu phở, cách nấu bún bò huế, món ngon mỗi ngày, công thức chuẩn vị',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Cách Nấu Món Ngon - Công Thức Nấu Ăn Chuẩn Vị & Bí Quyết Bếp Trưởng',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: '2026-09-24',
  },
  '/gioi-thieu': {
    path: '/gioi-thieu',
    title: 'Hôm Nay Ăn Gì - Câu Chuyện Về Người Bạn Đồng Hành Bữa Ăn Ngon',
    description: 'Không còn đau đầu nghĩ "Hôm nay ăn gì?". Khám phá câu chuyện của tụi mình – người bạn thân giúp bạn chọn món ngon mỗi bữa cực nhanh, dễ dàng và tràn đầy niềm vui!',
    keywords: 'giới thiệu hôm nay ăn gì, câu chuyện hôm nay ăn gì, về chúng tôi, sứ mệnh ẩm thực việt nam, bạn đồng hành bữa ăn',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Giới Thiệu Hôm Nay Ăn Gì - Nền Tảng Gợi Ý Ẩm Thực Hàng Đầu',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2026-09-24',
  },
  '/lien-he': {
    path: '/lien-he',
    title: 'Hôm Nay Ăn Gì - Góp Ý Món Ngon, Hợp Tác Quảng Cáo & Nhà Hàng',
    description: 'Kết nối cùng đội ngũ Hôm Nay Ăn Gì (Angigio.com): Góp ý món ngon mới, đề xuất cải tiến tính năng hoặc hợp tác truyền thông và đăng ký đối tác nhà hàng nhanh chóng.',
    keywords: 'liên hệ hôm nay ăn gì, góp ý món ngon, hợp tác nhà hàng, quảng cáo ẩm thực, đối tác ẩm thực angigio',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Liên Hệ Hôm Nay Ăn Gì - Góp Ý Món Ngon & Hợp Tác Nhà Hàng',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: '2026-09-24',
  },
  '/chinh-sach-bao-mat': {
    path: '/chinh-sach-bao-mat',
    title: 'Chính Sách Bảo Mật - Bảo Vệ Quyền Riêng Tư & An Toàn Dữ Liệu | Hôm Nay Ăn Gì',
    description: 'Chính sách bảo mật minh bạch của Hôm Nay Ăn Gì: Tối giản thu thập dữ liệu, tôn trọng quyền riêng tư, an toàn khi trải nghiệm gợi ý ẩm thực và liên kết đặt món.',
    keywords: 'chính sách bảo mật, bảo mật hôm nay ăn gì, quyền riêng tư, an toàn thông tin angigio',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Chính Sách Bảo Mật - Hôm Nay Ăn Gì',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2026-09-24',
  },
  '/dieu-khoan-su-dung': {
    path: '/dieu-khoan-su-dung',
    title: 'Điều Khoản Sử Dụng - Thỏa Thuận Người Dùng & Quy Định Dịch Vụ | Hôm Nay Ăn Gì',
    description: 'Điều khoản sử dụng dịch vụ Hôm Nay Ăn Gì: Quy định về trải nghiệm gợi ý món ăn, bách khoa ẩm thực, tính năng liên kết đối tác và quyền sở hữu trí tuệ.',
    keywords: 'điều khoản sử dụng, quy định hôm nay ăn gì, thỏa thuận dịch vụ, điều khoản angigio',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Điều Khoản Sử Dụng - Hôm Nay Ăn Gì',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: '2026-09-24',
  },
};

/**
 * Builds the complete dictionary of SEO routes dynamically:
 * - Base static routes (home, wheel, planner, ai, catalog, snacks, discovery tabs, pages)
 * - 4 Regional cuisine pages (/am-thuc-mien-bac, /am-thuc-mien-trung, /am-thuc-mien-nam, /am-thuc-mien-tay)
 * - All 211 recipe routes (/cach-nau-:id)
 * - Legacy alias routes mapped to canonical
 */
export function getAllSeoRoutes(): Record<string, RouteSeoMeta> {
  const routes: Record<string, RouteSeoMeta> = { ...BASE_SEO_ROUTES };

  // 1. Regional Cuisines
  for (const region of REGIONAL_CUISINES) {
    const image =
      region.id === 'bac'
        ? 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80'
        : region.id === 'trung'
        ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80'
        : region.id === 'nam'
        ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&auto=format&fit=crop&q=80';

    routes[region.path] = {
      path: region.path,
      title: region.metaTitle,
      description: region.metaDescription,
      keywords: `${region.name.toLowerCase()}, món ngon ${region.name.toLowerCase()}, đặc sản ${region.name.toLowerCase()}, ẩm thực việt nam`,
      image,
      imageAlt: `${region.name} - ${region.title}`,
      priority: 0.9,
      changefreq: 'weekly',
      lastmod: '2026-09-24',
    };
  }

  // 2. All 211 Dishes & Recipes
  for (const dish of INITIAL_DISHES) {
    const recipe = getDishRecipe(dish);
    const slug = getRecipeSlug(dish);
    const path = `/${slug}`;
    const articleTitle = getRecipeArticleTitle(dish, recipe);
    const title = formatRecipeSeoTitle(articleTitle);
    const description =
      dish.description ||
      `Hướng dẫn chi tiết cách làm ${dish.name} thơm ngon chuẩn vị gia đình Việt Nam: Định lượng nguyên liệu chuẩn xác, các bước thực hiện dễ hiểu và mẹo bí quyết bếp trưởng.`;
    const image = dish.image?.startsWith('http') ? dish.image : dish.image;
    const keywords = `${articleTitle.toLowerCase()}, cách nấu ${dish.name.toLowerCase()}, công thức ${dish.name.toLowerCase()}, cách làm ${dish.name.toLowerCase()}, hướng dẫn nấu ${dish.name.toLowerCase()}, món ngon mỗi ngày, ẩm thực việt nam`;

    routes[path] = {
      path,
      title,
      description,
      keywords,
      image,
      imageAlt: articleTitle,
      priority: 0.85,
      changefreq: 'weekly',
      lastmod: '2026-09-24',
      isArticle: true,
    };
  }

  // 3. Aliases
  for (const [aliasSlug, canonicalDishId] of Object.entries(RECIPE_SLUG_ALIASES)) {
    const aliasPath = `/${aliasSlug}`;
    if (!routes[aliasPath]) {
      const targetDish = INITIAL_DISHES.find((d) => d.id === canonicalDishId);
      if (targetDish) {
        const canonicalPath = `/${getRecipeSlug(targetDish)}`;
        if (routes[canonicalPath]) {
          routes[aliasPath] = {
            ...routes[canonicalPath],
            path: aliasPath,
          };
        }
      }
    }
  }

  return routes;
}
