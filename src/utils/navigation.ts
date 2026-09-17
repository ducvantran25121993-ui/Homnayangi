export type TabType = 'tarot' | 'wheel' | 'planner' | 'ai' | 'catalog' | 'discover' | 'about' | 'contact';

export type DiscoverSubSection = 'region' | 'daily' | 'recipe';

export interface TabMeta {
  path: string;
  title: string;
  description: string;
  label: string;
  shortLabel: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
}

const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80';

export const DISCOVER_SUB_CONFIG: Record<DiscoverSubSection, TabMeta> = {
  region: {
    path: '/am-thuc-vung-mien',
    title: 'Ẩm Thực Vùng Miền - Tinh Hoa Ẩm Thực 3 Miền Bắc, Trung, Nam & Miền Tây | Hôm Nay Ăn Gì',
    description: 'Bản đồ ẩm thực 3 miền Việt Nam: Khám phá hương vị thanh tao miền Bắc, đậm đà cay nồng miền Trung, phóng khoáng miền Nam và trù phú miền Tây sông nước.',
    label: 'Ẩm Thực Vùng Miền',
    shortLabel: 'Vùng Miền',
    keywords: 'ẩm thực vùng miền, ẩm thực 3 miền, ẩm thực việt nam, món ngon miền bắc, món ngon miền trung, món ngon miền nam, ẩm thực miền tây, đặc sản vùng miền việt nam',
    ogImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Ẩm Thực Vùng Miền - Tinh Hoa Ẩm Thực Bắc Trung Nam',
  },
  daily: {
    path: '/thuc-don-moi-ngay',
    title: 'Thực Đơn Mỗi Ngày - Gợi Ý Thực Đơn Gia Đình & Bữa Ăn Đủ Dinh Dưỡng | Hôm Nay Ăn Gì',
    description: 'Gợi ý thực đơn mỗi ngày từ Thứ 2 đến Chủ Nhật, thực đơn cơm nhà mẹ nấu, ăn trưa văn phòng, eat clean giảm cân và tiệc lẩu nướng cuối tuần chuẩn vị.',
    label: 'Thực Đơn Mỗi Ngày',
    shortLabel: 'Thực Đơn',
    keywords: 'thực đơn mỗi ngày, thực đơn hôm nay, gợi ý thực đơn, cơm nhà mẹ nấu, thực đơn trưa văn phòng, eat clean giảm cân, thực đơn gia đình, món ngon mỗi ngày',
    ogImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Thực Đơn Mỗi Ngày - Bữa Cơm Gia Đình Đủ Dinh Dưỡng',
  },
  recipe: {
    path: '/cach-nau-mon-ngon',
    title: 'Cách Nấu Món Ngon - Công Thức Nấu Ăn Chuẩn Vị & Bí Quyết Bếp Trưởng | Hôm Nay Ăn Gì',
    description: 'Hướng dẫn chi tiết cách nấu hơn 160+ món ngon chuẩn vị gia đình Việt Nam: Định lượng nguyên liệu chuẩn xác, các bước thực hiện dễ hiểu và mẹo bí quyết bếp trưởng.',
    label: 'Cách Nấu Món Ngon',
    shortLabel: 'Cách Nấu',
    keywords: 'cách nấu món ngon, công thức nấu ăn, hướng dẫn nấu ăn, bí quyết nấu ăn ngon, cách nấu phở, cách nấu bún bò huế, món ngon mỗi ngày, công thức chuẩn vị',
    ogImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Cách Nấu Món Ngon - Công Thức Chuẩn Vị Gia Đình',
  },
};

export const TAB_CONFIG: Record<TabType, TabMeta> = {
  tarot: {
    path: '/',
    title: 'Hôm Nay Ăn Gì - Tarot Ẩm Thực 12 Cung Hoàng Đạo Chuẩn Vị',
    description: 'Hôm nay Vũ Trụ mách bạn ăn gì? Trải bài Tarot ẩm thực 12 cung hoàng đạo, khám phá quẻ bói món ăn định mệnh mỗi ngày và đặt món nhanh chóng.',
    label: 'Tarot Ẩm Thực',
    shortLabel: 'Tarot',
    keywords: 'hôm nay ăn gì, tarot ẩm thực, quẻ bói món ăn, bói bài ăn gì, 12 cung hoàng đạo, vòng quay ăn gì, trưa nay ăn gì, tối nay ăn gì, món ngon mỗi ngày, ẩm thực việt nam, gợi ý món ăn, đặt món shopeefood, grabfood, befood',
    ogImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Hôm Nay Ăn Gì - Tarot Ẩm Thực 12 Cung Hoàng Đạo & Gợi Ý Món Chuẩn Vị',
  },
  wheel: {
    path: '/vong-quay',
    title: 'Vòng Quay Ăn Gì - Quay Món Ngẫu Nhiên Trong 3 Giây | Hôm Nay Ăn Gì',
    description: 'Quay vòng quay ăn gì ngẫu nhiên giúp bạn chốt món chỉ trong 3 giây. Tùy chỉnh danh sách món ngon, chọn chủ đề cơm trưa, bún phở, lẩu nướng và kết nối đặt ship ngay.',
    label: 'Vòng Quay',
    shortLabel: 'Vòng Quay',
    keywords: 'vòng quay ăn gì, vòng quay món ăn, bánh xe món ăn, hôm nay ăn gì, trưa nay ăn gì, vòng quay may mắn, chọn món ngẫu nhiên, quyết định món ăn, đặt món shopeefood, grabfood, befood',
    ogImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Vòng Quay Ăn Gì - Quyết Định Bữa Ăn Nhanh 3 Giây',
  },
  planner: {
    path: '/lich-an-theo-tuan',
    title: 'Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị & Tiết Kiệm | Hôm Nay Ăn Gì',
    description: 'Lịch ăn theo tuần thông minh từ Thứ 2 đến Chủ Nhật: Tự động chống trùng món, tính calo & chi phí, đổi món linh hoạt, gợi ý bữa sáng trưa tối chuẩn ngon.',
    label: 'Lịch Ăn Tuần',
    shortLabel: 'Lịch Ăn Tuần',
    keywords: 'lịch ăn theo tuần, lịch ăn tuần, thực đơn theo tuần, thực đơn 7 ngày, lên lịch ăn, thực đơn gia đình theo tuần, thực đơn giảm cân theo tuần, ăn gì hôm nay',
    ogImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị',
  },
  ai: {
    path: '/ai-goi-y-mon-an',
    title: 'Trợ Lý AI Gợi Ý Món Ăn - Chọn Món Ngon Theo Gu & Đặt Ship Gần Bạn | Hôm Nay Ăn Gì',
    description: 'Gợi ý món ăn thông minh và gần gũi: Chọn món ngon mỗi ngày theo tâm trạng, thời tiết, ngân sách và sở thích ăn uống. Tự động kết nối quán ngon gần bạn.',
    label: 'Trợ Lý AI',
    shortLabel: 'Trợ Lý AI',
    keywords: 'trợ lý ai món ăn, ai gợi ý món ăn, hôm nay ăn gì ai, gợi ý món ăn thông minh, tìm món theo thời tiết, tìm món theo tâm trạng, đặt món giao tận nơi',
    ogImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Trợ Lý AI Gợi Ý Món Ăn Chuẩn Vị - Hôm Nay Ăn Gì',
  },
  catalog: {
    path: '/mon-ngon',
    title: 'Thực Đơn 160+ Món Ngon Việt Nam - Danh Mục Món Ăn 3 Miền | Hôm Nay Ăn Gì',
    description: 'Khám phá danh mục hơn 160 món ngon Việt Nam đặc sắc 3 miền Bắc - Trung - Nam: Cơm, bún, phở, lẩu nướng, đồ chay kèm gợi ý calo, giá cả và đặt ship nhanh.',
    label: 'Món Ngon',
    shortLabel: 'Món Ngon',
    keywords: 'món ngon việt nam, thực đơn món ngon, 160 món ngon, món ngon 3 miền, món ăn bắc trung nam, danh sách món ngon, đặt món online, tra cứu món ăn',
    ogImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Thực Đơn Hơn 160 Món Ngon Việt Nam Chuẩn Vị 3 Miền',
  },
  discover: {
    path: '/am-thuc-vung-mien',
    title: 'Ẩm Thực Vùng Miền - Tinh Hoa Ẩm Thực 3 Miền Bắc, Trung, Nam & Miền Tây | Hôm Nay Ăn Gì',
    description: 'Bản đồ ẩm thực 3 miền Việt Nam: Khám phá hương vị thanh tao miền Bắc, đậm đà cay nồng miền Trung, phóng khoáng miền Nam và trù phú miền Tây sông nước.',
    label: 'Ẩm Thực Vùng Miền',
    shortLabel: 'Ẩm Thực',
    keywords: 'ẩm thực vùng miền, ẩm thực 3 miền, ẩm thực việt nam, món ngon miền bắc, món ngon miền trung, món ngon miền nam, ẩm thực miền tây, đặc sản vùng miền việt nam',
    ogImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Ẩm Thực Vùng Miền - Tinh Hoa Ẩm Thực Bắc Trung Nam',
  },
  about: {
    path: '/gioi-thieu',
    title: 'Hôm Nay Ăn Gì - Câu Chuyện Về Người Bạn Đồng Hành Bữa Ăn Ngon',
    description: 'Không còn đau đầu nghĩ "Hôm nay ăn gì?". Khám phá câu chuyện của tụi mình – người bạn thân giúp bạn chọn món ngon mỗi bữa cực nhanh, dễ dàng và tràn đầy niềm vui!',
    label: 'Giới Thiệu',
    shortLabel: 'Giới Thiệu',
    keywords: 'giới thiệu hôm nay ăn gì, câu chuyện hôm nay ăn gì, về chúng tôi, sứ mệnh ẩm thực việt nam, bạn đồng hành bữa ăn',
    ogImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Giới Thiệu Hôm Nay Ăn Gì - Nền Tảng Gợi Ý Ẩm Thực Hàng Đầu',
  },
  contact: {
    path: '/lien-he',
    title: 'Hôm Nay Ăn Gì - Góp Ý Món Ngon, Hợp Tác Quảng Cáo & Nhà Hàng',
    description: 'Kết nối cùng đội ngũ Hôm Nay Ăn Gì (Angigio.com): Góp ý món ngon mới, đề xuất cải tiến tính năng hoặc hợp tác truyền thông và đăng ký đối tác nhà hàng nhanh chóng.',
    label: 'Liên Hệ',
    shortLabel: 'Liên Hệ',
    keywords: 'liên hệ hôm nay ăn gì, góp ý món ngon, hợp tác nhà hàng, quảng cáo ẩm thực, đối tác ẩm thực angigio',
    ogImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    ogImageAlt: 'Liên Hệ Hôm Nay Ăn Gì - Góp Ý Món Ăn & Hợp Tác Truyền Thông',
  },
};

/**
 * Get Discover Sub-Section from pathname
 */
export function getDiscoverSubSectionFromUrl(): DiscoverSubSection {
  if (typeof window === 'undefined') return 'region';
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  if (pathname === '/thuc-don-moi-ngay' || pathname === '/kham-pha-am-thuc/thuc-don-moi-ngay') return 'daily';
  if (pathname === '/cach-nau-mon-ngon' || pathname === '/kham-pha-am-thuc/cach-nau-mon-ngon') return 'recipe';
  return 'region';
}

/**
 * Get Tab from current pathname or search parameters
 */
export function getTabFromUrl(): TabType {
  if (typeof window === 'undefined') return 'tarot';

  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  
  if (pathname === '/vong-quay') return 'wheel';
  if (pathname === '/lich-an-theo-tuan' || pathname === '/mon-ngon/lich-an-theo-tuan' || pathname === '/len-lich-an' || pathname === '/lich-an' || pathname === '/thuc-don-tuan' || pathname === '/meal-planner') return 'planner';
  if (pathname === '/ai-goi-y-mon-an') return 'ai';
  if (pathname === '/mon-ngon') return 'catalog';
  if (
    pathname === '/am-thuc-vung-mien' ||
    pathname === '/thuc-don-moi-ngay' ||
    pathname === '/cach-nau-mon-ngon' ||
    pathname === '/kham-pha-am-thuc' ||
    pathname.startsWith('/kham-pha-am-thuc/') ||
    pathname === '/kham-pha' ||
    pathname === '/cam-nang' ||
    pathname === '/cam-nang-am-thuc'
  ) return 'discover';
  if (pathname === '/gioi-thieu' || pathname === '/about') return 'about';
  if (pathname === '/lien-he' || pathname === '/contact') return 'contact';
  if (pathname === '/') {
    // Check fallback query param ?tab=
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'vong-quay' || tabParam === 'wheel') return 'wheel';
    if (tabParam === 'lich-an-theo-tuan' || tabParam === 'mon-ngon/lich-an-theo-tuan' || tabParam === 'len-lich-an' || tabParam === 'planner' || tabParam === 'lich-an' || tabParam === 'thuc-don-tuan') return 'planner';
    if (tabParam === 'ai-goi-y-mon-an' || tabParam === 'ai' || tabParam === 'tro-ly-ai' || tabParam === 'goi-y-mon') return 'ai';
    if (tabParam === 'mon-ngon' || tabParam === 'catalog') return 'catalog';
    if (tabParam === 'am-thuc-vung-mien' || tabParam === 'thuc-don-moi-ngay' || tabParam === 'cach-nau-mon-ngon' || tabParam === 'kham-pha-am-thuc' || tabParam === 'kham-pha' || tabParam === 'discover' || tabParam === 'cam-nang') return 'discover';
    if (tabParam === 'gioi-thieu' || tabParam === 'about') return 'about';
    if (tabParam === 'lien-he' || tabParam === 'contact') return 'contact';
    return 'tarot';
  }

  return 'tarot';
}

/**
 * Helper to set or create a meta tag
 */
function setOrCreateMeta(selector: string, attributeName: 'name' | 'property', attributeValue: string, content: string): void {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attributeName, attributeValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Apply metadata to DOM tags
 */
function applyMetaToDOM(meta: TabMeta): void {
  if (typeof document === 'undefined') return;

  const fullUrl = 'https://www.angigio.com' + meta.path;
  const image = meta.ogImage || DEFAULT_OG_IMAGE;
  const imageAlt = meta.ogImageAlt || meta.title;

  // 1. Title & meta[name="title"]
  document.title = meta.title;
  setOrCreateMeta('meta[name="title"]', 'name', 'title', meta.title);

  // 2. Meta description & keywords
  setOrCreateMeta('meta[name="description"]', 'name', 'description', meta.description);
  if (meta.keywords) {
    setOrCreateMeta('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
  }

  // 3. Open Graph
  setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
  setOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Hôm Nay Ăn Gì');
  setOrCreateMeta('meta[property="og:locale"]', 'property', 'og:locale', 'vi_VN');
  setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', fullUrl);
  setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', image);
  setOrCreateMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
  setOrCreateMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
  setOrCreateMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', imageAlt);

  // 4. Twitter Cards
  setOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  setOrCreateMeta('meta[name="twitter:url"]', 'name', 'twitter:url', fullUrl);
  setOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);

  // 5. Canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);
}

/**
 * Update document title, meta tags, and canonical link for SEO on tab change
 */
export function updateTabSEO(tab: TabType): void {
  if (typeof document === 'undefined') return;

  if (tab === 'discover') {
    const sub = getDiscoverSubSectionFromUrl();
    const subMeta = DISCOVER_SUB_CONFIG[sub];
    if (subMeta) {
      applyMetaToDOM(subMeta);
      return;
    }
  }

  const meta = TAB_CONFIG[tab];
  if (!meta) return;
  applyMetaToDOM(meta);
}

/**
 * Update document title, meta tags, and canonical link specifically for Discover Sub-Section
 */
export function updateDiscoverSubSEO(sub: DiscoverSubSection): void {
  const meta = DISCOVER_SUB_CONFIG[sub];
  if (meta) {
    applyMetaToDOM(meta);
  }
}
