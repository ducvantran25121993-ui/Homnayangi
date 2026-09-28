export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: 'Mẹo Nhà Bếp' | 'Văn Hóa Ẩm Thực' | 'Bí Quyết Nấu Ăn' | 'Dinh Dưỡng & Sức Khỏe' | 'Gợi Ý Thực Đơn';
  tags: string[];
  author: BlogAuthor;
  publishDate: string;
  readTime: string;
  featured?: boolean;
  relatedDishIds?: string[];
  content: string;
}

export const BLOG_CATEGORIES = [
  'Tất Cả',
  'Mẹo Nhà Bếp',
  'Bí Quyết Nấu Ăn',
  'Văn Hóa Ẩm Thực',
  'Dinh Dưỡng & Sức Khỏe',
  'Gợi Ý Thực Đơn',
] as const;

export const BLOG_SLUG_ALIASES: Record<string, string> = {};

/**
 * Danh sách bài viết Blog ẩm thực
 * Để trống để bạn có thể tự viết các bài viết mới theo ý thích.
 */
export const INITIAL_BLOG_POSTS: BlogPost[] = [];

export function getAllBlogPosts(): BlogPost[] {
  return INITIAL_BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.replace(/^\/?blog\//, '').replace(/^\//, '').replace(/\/$/, '');
  const canonicalSlug = BLOG_SLUG_ALIASES[cleanSlug] || cleanSlug;
  return INITIAL_BLOG_POSTS.find((p) => p.slug === canonicalSlug || p.id === canonicalSlug || p.slug === cleanSlug);
}

export function isBlogPostSlug(slug: string): boolean {
  if (!slug) return false;
  const clean = slug.replace(/^\/?blog\//, '').replace(/^\//, '').replace(/\/$/, '');
  const canonical = BLOG_SLUG_ALIASES[clean] || clean;
  return INITIAL_BLOG_POSTS.some((p) => p.slug === canonical || p.id === canonical || p.slug === clean);
}

export function getBlogPostUrl(post: BlogPost): string {
  return `/${post.slug}`;
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return INITIAL_BLOG_POSTS.filter((p) => p.featured);
}
