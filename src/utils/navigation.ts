export type TabType = 'tarot' | 'wheel' | 'ai' | 'catalog';

export interface TabMeta {
  path: string;
  title: string;
  description: string;
  label: string;
  shortLabel: string;
}

export const TAB_CONFIG: Record<TabType, TabMeta> = {
  tarot: {
    path: '/',
    title: 'Hôm Nay Ăn Gì - Tarot Ẩm Thực, Vòng Quay & Gợi Ý Món Chuẩn Vị',
    description: 'Hôm nay Vũ Trụ mách bạn ăn gì? Trải bài Tarot ẩm thực 12 cung hoàng đạo, khám phá quẻ bói món ăn định mệnh mỗi ngày và đặt món nhanh chóng.',
    label: 'Tarot Ẩm Thực',
    shortLabel: 'Tarot',
  },
  wheel: {
    path: '/vong-quay',
    title: 'Vòng Quay Ăn Gì - Vòng Quay Món Ăn May Mắn Ngẫu Nhiên',
    description: 'Quay vòng quay ăn gì ngẫu nhiên giúp bạn giải quyết câu hỏi "Hôm nay ăn gì?" trong 3 giây. Tùy chỉnh danh sách món ăn, quay số may mắn và đặt món ngay.',
    label: 'Vòng Quay',
    shortLabel: 'Vòng Quay',
  },
  ai: {
    path: '/ai-goi-y-mon-an',
    title: 'Trợ Lý AI Gợi Ý Món Ăn Chuẩn Vị Theo Tâm Trạng & Thời Tiết',
    description: 'Trí tuệ nhân tạo AI Gemini thông minh gợi ý món ngon chuẩn vị dựa trên bữa ăn, tâm trạng, thời tiết và ngân sách của bạn. Tìm quán ngon gần nhất.',
    label: 'Trợ Lý AI',
    shortLabel: 'Trợ Lý AI',
  },
  catalog: {
    path: '/mon-ngon',
    title: 'Thực Đơn 160+ Món Ngon Việt Nam Chuẩn Vị 3 Miền',
    description: 'Khám phá danh mục hơn 160 món ngon Việt Nam đặc sắc: Cơm, Bún, Phở, Lẩu, Đồ nướng, Món chay, Tráng miệng kèm liên kết đặt món ShopeeFood, GrabFood, BeFood.',
    label: 'Món Ngon',
    shortLabel: 'Món Ngon',
  },
};

/**
 * Get Tab from current pathname or search parameters
 */
export function getTabFromUrl(): TabType {
  if (typeof window === 'undefined') return 'tarot';

  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  
  if (pathname === '/vong-quay') return 'wheel';
  if (pathname === '/ai-goi-y-mon-an') return 'ai';
  if (pathname === '/mon-ngon') return 'catalog';
  if (pathname === '/') {
    // Check fallback query param ?tab=
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'vong-quay' || tabParam === 'wheel') return 'wheel';
    if (tabParam === 'ai-goi-y-mon-an' || tabParam === 'ai' || tabParam === 'tro-ly-ai' || tabParam === 'goi-y-mon') return 'ai';
    if (tabParam === 'mon-ngon' || tabParam === 'catalog') return 'catalog';
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

  // 1. Title
  document.title = meta.title;

  // 2. Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', meta.description);
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
