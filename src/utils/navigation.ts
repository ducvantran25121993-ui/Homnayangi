export type TabType = 'tarot' | 'wheel' | 'planner' | 'ai' | 'catalog' | 'about' | 'contact';

export interface TabMeta {
  path: string;
  title: string;
  description: string;
  label: string;
  shortLabel: string;
  keywords?: string;
  ogImageAlt?: string;
}

export const TAB_CONFIG: Record<TabType, TabMeta> = {
  tarot: {
    path: '/',
    title: 'Hôm Nay Ăn Gì - Tarot Ẩm Thực, Vòng Quay & Gợi Ý Món Chuẩn Vị',
    description: 'Hôm nay Vũ Trụ mách bạn ăn gì? Trải bài Tarot ẩm thực 12 cung hoàng đạo, khám phá quẻ bói món ăn định mệnh mỗi ngày và đặt món nhanh chóng.',
    label: 'Tarot Ẩm Thực',
    shortLabel: 'Tarot',
    keywords: 'hôm nay ăn gì, tarot ẩm thực, quẻ bói món ăn, 12 cung hoàng đạo, chọn món ngẫu nhiên, đặt món shopeefood, grabfood',
    ogImageAlt: 'Hôm Nay Ăn Gì - Tarot Ẩm Thực & Gợi Ý Món Ngon',
  },
  wheel: {
    path: '/vong-quay',
    title: 'Vòng Quay Ăn Gì - Quay Món Ngẫu Nhiên Trong 3 Giây | Hôm Nay Ăn Gì',
    description: 'Quay vòng quay ăn gì ngẫu nhiên giúp bạn chốt món chỉ trong 3 giây. Tùy chỉnh danh sách món ngon, chọn chủ đề cơm trưa, bún phở, lẩu nướng và kết nối đặt ship ngay.',
    label: 'Vòng Quay',
    shortLabel: 'Vòng Quay',
    keywords: 'vòng quay ăn gì, vòng quay món ăn, bánh xe món ăn, hôm nay ăn gì, trưa nay ăn gì, vòng quay may mắn, chọn món ngẫu nhiên, quyết định món ăn, đặt món shopeefood, grabfood, befood',
    ogImageAlt: 'Vòng Quay Ăn Gì - Quyết Định Bữa Ăn Nhanh 3 Giây',
  },
  planner: {
    path: '/lich-an-theo-tuan',
    title: 'Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị & Tiết Kiệm | Hôm Nay Ăn Gì',
    description: 'Lịch ăn theo tuần thông minh từ Thứ 2 đến Chủ Nhật: Tự động chống trùng món, tính calo & chi phí, đổi món linh hoạt, gợi ý bữa sáng trưa tối chuẩn ngon.',
    label: 'Lịch Ăn Tuần',
    shortLabel: 'Lịch Ăn Tuần',
    keywords: 'lịch ăn theo tuần, lịch ăn tuần, thực đơn theo tuần, thực đơn 7 ngày, lên lịch ăn, thực đơn gia đình theo tuần, thực đơn giảm cân theo tuần, ăn gì hôm nay',
    ogImageAlt: 'Lịch Ăn Theo Tuần - Thực Đơn 7 Ngày Chuẩn Vị',
  },
  ai: {
    path: '/ai-goi-y-mon-an',
    title: 'Trợ Lý Gợi Ý Món Ăn - Chọn Món Ngon Theo Gu & Đặt Ship Gần Bạn | Hôm Nay Ăn Gì',
    description: 'Gợi ý món ăn thông minh và gần gũi: Chọn món ngon mỗi ngày theo tâm trạng, thời tiết, ngân sách và sở thích ăn uống. Tự động kết nối quán ngon gần bạn.',
    label: 'Trợ Lý AI',
    shortLabel: 'Trợ Lý AI',
  },
  catalog: {
    path: '/mon-ngon',
    title: 'Thực Đơn 160+ Món Ngon Việt Nam - Danh Mục Món Ăn 3 Miền | Hôm Nay Ăn Gì',
    description: 'Khám phá danh mục hơn 160 món ngon Việt Nam đặc sắc 3 miền Bắc - Trung - Nam: Cơm, bún, phở, lẩu nướng, đồ chay kèm gợi ý calo, giá cả và đặt ship nhanh.',
    label: 'Món Ngon',
    shortLabel: 'Món Ngon',
  },
  about: {
    path: '/gioi-thieu',
    title: 'Hôm Nay Ăn Gì - Câu Chuyện Về Người Bạn Đồng Hành Bữa Ăn Ngon',
    description: 'Không còn đau đầu nghĩ "Hôm nay ăn gì?". Khám phá câu chuyện của tụi mình – người bạn thân giúp bạn chọn món ngon mỗi bữa cực nhanh, dễ dàng và tràn đầy niềm vui!',
    label: 'Giới Thiệu',
    shortLabel: 'Giới Thiệu',
  },
  contact: {
    path: '/lien-he',
    title: 'Hôm Nay Ăn Gì - Góp Ý Món Ngon, Hợp Tác Quảng Cáo & Nhà Hàng',
    description: 'Kết nối cùng đội ngũ Hôm Nay Ăn Gì (Angigio.com): Góp ý món ngon mới, đề xuất cải tiến tính năng hoặc hợp tác truyền thông và đăng ký đối tác nhà hàng nhanh chóng.',
    label: 'Liên Hệ',
    shortLabel: 'Liên Hệ',
  },
};

/**
 * Get Tab from current pathname or search parameters
 */
export function getTabFromUrl(): TabType {
  if (typeof window === 'undefined') return 'tarot';

  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  
  if (pathname === '/vong-quay') return 'wheel';
  if (pathname === '/lich-an-theo-tuan' || pathname === '/len-lich-an' || pathname === '/lich-an' || pathname === '/thuc-don-tuan' || pathname === '/meal-planner') return 'planner';
  if (pathname === '/ai-goi-y-mon-an') return 'ai';
  if (pathname === '/mon-ngon') return 'catalog';
  if (pathname === '/gioi-thieu' || pathname === '/about') return 'about';
  if (pathname === '/lien-he' || pathname === '/contact') return 'contact';
  if (pathname === '/') {
    // Check fallback query param ?tab=
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'vong-quay' || tabParam === 'wheel') return 'wheel';
    if (tabParam === 'lich-an-theo-tuan' || tabParam === 'len-lich-an' || tabParam === 'planner' || tabParam === 'lich-an' || tabParam === 'thuc-don-tuan') return 'planner';
    if (tabParam === 'ai-goi-y-mon-an' || tabParam === 'ai' || tabParam === 'tro-ly-ai' || tabParam === 'goi-y-mon') return 'ai';
    if (tabParam === 'mon-ngon' || tabParam === 'catalog') return 'catalog';
    if (tabParam === 'gioi-thieu' || tabParam === 'about') return 'about';
    if (tabParam === 'lien-he' || tabParam === 'contact') return 'contact';
    return 'tarot';
  }

  return 'tarot';
}

/**
 * Update document title, meta tags, and canonical link for SEO on tab change
 */
export function updateTabSEO(tab: TabType): void {
  if (typeof document === 'undefined') return;

  const meta = TAB_CONFIG[tab];
  if (!meta) return;

  // 1. Title & meta[name="title"]
  document.title = meta.title;
  const metaTitle = document.querySelector('meta[name="title"]');
  if (metaTitle) {
    metaTitle.setAttribute('content', meta.title);
  }

  // 2. Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', meta.description);
  }

  // 2b. Meta keywords
  if (meta.keywords) {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', meta.keywords);
    }
  }

  // 3. Open Graph & Twitter
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', meta.title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', meta.description);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', window.location.origin + meta.path);
  }

  if (meta.ogImageAlt) {
    const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (ogImageAlt) {
      ogImageAlt.setAttribute('content', meta.ogImageAlt);
    }
  }

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', meta.title);
  }

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) {
    twitterDesc.setAttribute('content', meta.description);
  }

  // 4. Canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', window.location.origin + meta.path);
}
