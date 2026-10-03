import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  PlusCircle,
  Check,
  Copy,
  ChefHat,
  ChevronRight,
  Utensils,
  ExternalLink,
  X,
  Eye,
  Edit3,
  Trash2,
  Home,
  Database,
} from 'lucide-react';
import {
  BlogPost,
  BLOG_CATEGORIES,
  INITIAL_BLOG_POSTS,
  getBlogPostBySlug,
  getCustomBlogPosts,
  fetchAndSyncCustomPosts,
} from '../data/blogPosts';
import { INITIAL_DISHES } from '../data/dishes';
import { findDishByRecipeSlug, getRecipePath } from '../data/recipes';
import { Dish } from '../types';
import { TabType } from '../utils/navigation';

interface BlogPageProps {
  onNavigate?: (tab: TabType) => void;
  onSelectDish?: (dish: Dish) => void;
}

const LOCAL_STORAGE_CUSTOM_POSTS = 'angigio_custom_blog_posts';

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onSelectDish }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customPosts, setCustomPosts] = useState<BlogPost[]>(() => {
    return getCustomBlogPosts();
  });

  // Current active post when viewing detail
  const [activePost, setActivePost] = useState<BlogPost | null>(() => {
    if (typeof window === 'undefined') return null;
    const pathname = window.location.pathname.replace(/\/$/, '') || '';
    if (pathname === '/blog' || pathname === '') return null;
    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '');
      return getBlogPostBySlug(slug) || null;
    }
    const slug = pathname.replace(/^\//, '');
    return getBlogPostBySlug(slug) || null;
  });

  // Modal create post state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // Form state for creating new post
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<BlogPost['category']>('Mẹo Nhà Bếp');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCoverImage, setNewCoverImage] = useState(
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80'
  );
  const [newAuthorName, setNewAuthorName] = useState('Bếp Trưởng Hôm Nay Ăn Gì');
  const [newAuthorRole, setNewAuthorRole] = useState('Chuyên gia ẩm thực');
  const [newTags, setNewTags] = useState('Món ngon, Mẹo nhà bếp, Nấu ăn ngon');
  const [newReadTime, setNewReadTime] = useState('5 phút đọc');
  const [newContent, setNewContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  // All posts combined (custom + initial, custom posts take precedence so admin edits update the website)
  const allPosts = useMemo(() => {
    const postMap = new Map<string, BlogPost>();
    INITIAL_BLOG_POSTS.forEach((p) => {
      postMap.set(p.slug, p);
    });
    customPosts.forEach((p) => {
      postMap.set(p.slug, p);
    });
    return Array.from(postMap.values());
  }, [customPosts]);

  // Load latest posts from server API or static json on mount
  useEffect(() => {
    const fetchLatestPosts = async () => {
      const synced = await fetchAndSyncCustomPosts();
      if (synced && synced.length > 0) {
        setCustomPosts(synced);
      }
    };
    fetchLatestPosts();
  }, []);

  // Sync browser back/forward and URL change
  useEffect(() => {
    const handleUrlChange = () => {
      const pathname = window.location.pathname.replace(/\/$/, '') || '';
      if (pathname === '/blog' || pathname === '') {
        setActivePost(null);
      } else if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '');
        const post = allPosts.find((p) => p.slug === slug || p.id === slug) || getBlogPostBySlug(slug) || null;
        setActivePost(post);
      } else {
        const slug = pathname.replace(/^\//, '');
        const post = allPosts.find((p) => p.slug === slug || p.id === slug) || getBlogPostBySlug(slug) || null;
        setActivePost(post);
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('locationchange', handleUrlChange);

    const handleCustomPostsUpdated = () => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS);
        if (saved) {
          setCustomPosts(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('custom-posts-updated', handleCustomPostsUpdated);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('locationchange', handleUrlChange);
      window.removeEventListener('custom-posts-updated', handleCustomPostsUpdated);
    };
  }, [allPosts]);

  // Auto-resolve active post if allPosts updates (e.g. after API fetch finishes)
  useEffect(() => {
    const pathname = window.location.pathname.replace(/\/$/, '') || '';
    if (pathname !== '/blog' && pathname !== '') {
      const slug = pathname.replace(/^\/?blog\//, '').replace(/^\//, '');
      const found = allPosts.find((p) => p.slug === slug || p.id === slug) || getBlogPostBySlug(slug);
      if (found && (!activePost || activePost.slug !== found.slug)) {
        setActivePost(found);
      }
    }
  }, [allPosts]);

  // Update document title, meta tags, and structured JSON-LD schema when activePost changes
  useEffect(() => {
    if (activePost) {
      document.title = `${activePost.title} | Blog Ẩm Thực Hôm Nay Ăn Gì`;
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://angigio.com/${activePost.slug}`);
      }

      // Smoothly normalize address bar to canonical URL if opened via an alias
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname.replace(/\/$/, '') || '';
        if (currentPath && currentPath !== `/${activePost.slug}` && !currentPath.startsWith('/blog/')) {
          window.history.replaceState({ tab: 'blog', slug: activePost.slug }, '', `/${activePost.slug}`);
        }
      }

      // Update description & OG tags
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', activePost.excerpt);

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', `${activePost.title} | Blog Ẩm Thực Hôm Nay Ăn Gì`);
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', activePost.excerpt);
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', activePost.coverImage);

      // JSON-LD Schema for Article & Breadcrumbs
      const scriptId = 'blog-post-jsonld';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': `https://angigio.com/${activePost.slug}#article`,
            isPartOf: {
              '@type': 'WebSite',
              '@id': 'https://angigio.com/#website',
              name: 'Hôm Nay Ăn Gì',
              url: 'https://angigio.com/',
            },
            headline: activePost.title,
            description: activePost.excerpt,
            image: [activePost.coverImage],
            datePublished: '2026-09-28T08:00:00+07:00',
            dateModified: '2026-09-29T00:00:00+07:00',
            author: {
              '@type': 'Person',
              name: activePost.author.name,
              jobTitle: activePost.author.role,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Hôm Nay Ăn Gì',
              url: 'https://angigio.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://angigio.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://angigio.com/${activePost.slug}`,
            },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `https://angigio.com/${activePost.slug}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Trang chủ',
                item: 'https://angigio.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog Ẩm Thực',
                item: 'https://angigio.com/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: activePost.title,
                item: `https://angigio.com/${activePost.slug}`,
              },
            ],
          },
        ],
      });
    } else {
      document.title = 'Blog Ẩm Thực - Cẩm Nang Món Ngon & Bí Quyết Nấu Nướng | Hôm Nay Ăn Gì';
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', 'https://angigio.com/blog');
      }
      const existingScript = document.getElementById('blog-post-jsonld');
      if (existingScript) existingScript.remove();
    }
  }, [activePost]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchCategory =
        selectedCategory === 'Tất Cả' || post.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  // Open an article detail (Concise root URL without blog/)
  const handleOpenPost = (post: BlogPost) => {
    setActivePost(post);
    window.history.pushState({ tab: 'blog', slug: post.slug }, '', `/${post.slug}`);
    window.dispatchEvent(new Event('locationchange'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to blog list
  const handleBackToList = () => {
    setActivePost(null);
    window.history.pushState({ tab: 'blog' }, '', '/blog');
    window.dispatchEvent(new Event('locationchange'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Copy share link
  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2500);
    }
  };

  // Delete a custom post
  const handleDeletePost = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window !== 'undefined' && !window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
      return;
    }
    const updated = customPosts.filter((p) => p.id !== postId);
    setCustomPosts(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_POSTS, JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (activePost && activePost.id === postId) {
      handleBackToList();
    }
  };

  // Clear all custom posts
  const handleClearAllCustomPosts = () => {
    if (typeof window !== 'undefined' && !window.confirm('Bạn có chắc chắn muốn xóa toàn bộ bài viết để bắt đầu viết mới từ đầu không?')) {
      return;
    }
    setCustomPosts([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_CUSTOM_POSTS);
    } catch {
      // ignore
    }
    handleBackToList();
  };

  // Handle create new post submit
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      return;
    }

    const slug = newTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const createdPost: BlogPost = {
      id: slug || `post-${Date.now()}`,
      slug: slug || `post-${Date.now()}`,
      title: newTitle.trim(),
      excerpt:
        newExcerpt.trim() ||
        newContent.replace(/[#*`>]/g, '').slice(0, 160).trim() + '...',
      coverImage: newCoverImage.trim() || '/images/an-gi-cho-do-ngan.jpg',
      category: newCategory,
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      author: {
        name: newAuthorName.trim() || 'Bếp Trưởng Hôm Nay Ăn Gì',
        role: newAuthorRole.trim() || 'Người yêu ẩm thực',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      },
      publishDate: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      readTime: newReadTime.trim() || '5 phút đọc',
      content: newContent.trim(),
    };

    // 1. Sync to server API
    try {
      await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdPost),
      });
    } catch (err) {
      console.warn('API post error:', err);
    }

    // 2. Persist locally
    const updated = [createdPost, ...customPosts.filter((p) => p.slug !== createdPost.slug)];
    setCustomPosts(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_POSTS, JSON.stringify(updated));
    } catch {
      // LocalStorage quota fallback
    }

    window.dispatchEvent(new Event('custom-posts-updated'));

    setIsCreateModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setActivePost(createdPost);
    window.history.pushState({ tab: 'blog', slug: createdPost.slug }, '', `/${createdPost.slug}`);
    window.dispatchEvent(new Event('locationchange'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate code snippet to paste into blogPosts.ts
  const generatePostCodeSnippet = () => {
    const slug = newTitle
      ? newTitle
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[đĐ]/g, 'd')
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
      : 'tieu-de-bai-viet';

    return `  {
    id: '${slug}',
    slug: '${slug}',
    title: '${newTitle.replace(/'/g, "\\'") || 'Tiêu đề bài viết'}',
    excerpt: '${newExcerpt.replace(/'/g, "\\'") || 'Tóm tắt bài viết...'}',
    coverImage: '${newCoverImage}',
    category: '${newCategory}',
    tags: ${JSON.stringify(newTags.split(',').map((t) => t.trim()).filter(Boolean))},
    author: {
      name: '${newAuthorName}',
      role: '${newAuthorRole}',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&auto=format&fit=crop&q=80',
    },
    publishDate: '${new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}',
    readTime: '${newReadTime}',
    content: \`
${newContent}
\`,
  },`;
  };

  // Helper to parse inline markdown: images, bold and links
  const parseInlineContent = (text: string) => {
    // Regex splits by: ![img](url) OR [link](url) OR **bold**
    const parts = text.split(/(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

    return parts.map((part, index) => {
      if (!part) return null;

      // Check markdown image: ![alt](src)
      const imgMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        const [, alt, src] = imgMatch;
        return (
          <figure
            key={`inline-img-${index}`}
            className="my-8 mx-auto w-full max-w-[420px] sm:max-w-[460px] rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs bg-stone-50 block text-center"
          >
            <div className="w-full aspect-square overflow-hidden bg-stone-100 flex items-center justify-center">
              <img
                src={src}
                alt={alt || 'Hình ảnh minh họa'}
                loading="lazy"
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {alt && (
              <figcaption className="text-center text-xs sm:text-sm text-stone-600 py-2.5 px-4 bg-stone-100/80 italic font-medium border-t border-stone-200/60">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }

      // Check markdown link: [label](href)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternal = href.startsWith('/');
        return (
          <a
            key={`inline-link-${index}`}
            href={href}
            onClick={(e) => {
              if (e.ctrlKey || e.metaKey || e.button === 1) return;
              if (isInternal) {
                e.preventDefault();
                // Check if this link points to a dish recipe (e.g. /suon-nuong-bbq or /cach-nau-suon-nuong-bbq)
                const matchedDish = findDishByRecipeSlug(href, INITIAL_DISHES);
                if (matchedDish) {
                  const targetRecipePath = getRecipePath(matchedDish);
                  window.history.pushState({ section: 'recipe', dishId: matchedDish.id }, '', targetRecipePath);
                  window.dispatchEvent(new Event('locationchange'));
                  if (onSelectDish) {
                    onSelectDish(matchedDish);
                  }
                  if (onNavigate) {
                    onNavigate('discover');
                  }
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  return;
                }

                window.history.pushState(null, '', href);
                window.dispatchEvent(new Event('locationchange'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="text-orange-600 hover:text-orange-700 underline font-bold decoration-orange-300 hover:decoration-orange-600 transition-colors cursor-pointer"
            {...(!isInternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {label}
          </a>
        );
      }

      // Check bold: **text**
      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={`inline-bold-${index}`} className="font-extrabold text-stone-900">
            {boldMatch[1]}
          </strong>
        );
      }

      return <React.Fragment key={`inline-txt-${index}`}>{part}</React.Fragment>;
    });
  };

  // Render markdown-like text nicely (Headings, Tables, Blockquotes, Lists, Links, Paragraphs)
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentKey = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 1. Markdown Table Check
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }
        i--; // Step back one line since loop increments

        if (tableLines.length >= 2) {
          const headerCells = tableLines[0]
            .split('|')
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
            .map((c) => c.trim());

          // Check if row 1 is separator (e.g. |---|---|)
          const isSeparator = /^\|(\s*[-:]+\s*\|)+$/.test(tableLines[1]);
          const bodyStartIdx = isSeparator ? 2 : 1;

          const bodyRows = tableLines.slice(bodyStartIdx).map((rowLine) =>
            rowLine
              .split('|')
              .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
              .map((c) => c.trim())
          );

          elements.push(
            <div
              key={`table-${currentKey++}`}
              className="overflow-x-auto my-6 rounded-2xl border border-stone-200/90 shadow-2xs bg-white"
            >
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
                <thead className="bg-orange-50/80 border-b border-orange-100 text-orange-950 font-black">
                  <tr>
                    {headerCells.map((h, hIdx) => (
                      <th key={hIdx} className="px-4 py-3 font-black text-stone-900">
                        {parseInlineContent(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bodyRows.map((r, rIdx) => (
                    <tr
                      key={rIdx}
                      className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/60 hover:bg-orange-50/30'}
                    >
                      {r.map((c, cIdx) => (
                        <td key={cIdx} className="px-4 py-3 text-stone-700 leading-relaxed font-medium">
                          {parseInlineContent(c)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // 1.5 Horizontal Rule (--- or ***)
      if (line.trim() === '---' || line.trim() === '***') {
        elements.push(
          <hr key={`hr-${currentKey++}`} className="my-8 border-t border-stone-200" />
        );
        continue;
      }

      // 2. Headings
      if (line.startsWith('### ')) {
        const headingText = line.replace('### ', '');
        elements.push(
          <h3
            key={`h3-${currentKey++}`}
            className="text-xl sm:text-2xl font-black text-stone-900 mt-8 mb-4 flex items-center gap-2 border-b border-orange-100 pb-2.5"
          >
            <span className="w-2 h-6 bg-orange-500 rounded-full inline-block shrink-0" />
            <span>{parseInlineContent(headingText)}</span>
          </h3>
        );
      } else if (line.startsWith('## ')) {
        const headingText = line.replace('## ', '');
        elements.push(
          <h2
            key={`h2-${currentKey++}`}
            className="text-2xl sm:text-3xl font-black text-stone-900 mt-10 mb-4"
          >
            {parseInlineContent(headingText)}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        const headingText = line.replace('# ', '');
        elements.push(
          <h2
            key={`h1-as-h2-${currentKey++}`}
            className="text-2xl sm:text-3xl font-black text-stone-900 mt-10 mb-4"
          >
            {parseInlineContent(headingText)}
          </h2>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={`quote-${currentKey++}`}
            className="my-6 p-4 sm:p-5 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-2xl text-stone-800 italic text-sm sm:text-base leading-relaxed"
          >
            {parseInlineContent(line.replace('> ', ''))}
          </blockquote>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.startsWith('- ') ? line.replace('- ', '') : line.replace('* ', '');
        elements.push(
          <li
            key={`li-${currentKey++}`}
            className="ml-5 list-disc text-stone-700 my-2 leading-relaxed text-sm sm:text-base"
          >
            {parseInlineContent(itemText)}
          </li>
        );
      } else if (/^!\[([^\]]*)\]\(([^)]+)\)$/.test(line.trim())) {
        const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (imgMatch) {
          const [, alt, src] = imgMatch;
          elements.push(
            <figure
              key={`img-${currentKey++}`}
              className="my-8 mx-auto w-full max-w-[420px] sm:max-w-[460px] rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs bg-stone-50 text-center"
            >
              <div className="w-full aspect-square overflow-hidden bg-stone-100 flex items-center justify-center">
                <img
                  src={src}
                  alt={alt || 'Hình ảnh món ngon'}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              {alt && (
                <figcaption className="text-center text-xs sm:text-sm text-stone-600 py-2.5 px-4 bg-stone-100/80 font-medium italic border-t border-stone-200/60">
                  {alt}
                </figcaption>
              )}
            </figure>
          );
        }
      } else if (line.trim().length > 0) {
        elements.push(
          <p
            key={`p-${currentKey++}`}
            className="text-stone-700 my-3 leading-relaxed text-sm sm:text-base"
          >
            {parseInlineContent(line)}
          </p>
        );
      }
    }

    return elements;
  };

  // Find related dishes for active post
  const relatedDishes = useMemo(() => {
    if (!activePost) return [];
    if (activePost.relatedDishIds && activePost.relatedDishIds.length > 0) {
      const matched = INITIAL_DISHES.filter((d) => activePost.relatedDishIds?.includes(d.id));
      if (matched.length > 0) return matched;
    }
    const slug = activePost.slug.toLowerCase();
    if (slug.includes('thit-heo') || slug.includes('ba-chi') || slug.includes('suon')) {
      return INITIAL_DISHES.filter((d) => ['com-thit-kho-tau', 'suon-nuong-bbq', 'heo-quay-banh-hoi'].includes(d.id));
    }
    if (slug.includes('ga')) {
      return INITIAL_DISHES.filter((d) => ['pho-ga-ta-la-chanh', 'ga-nuong-com-lam'].includes(d.id));
    }
    if (slug.includes('bo')) {
      return INITIAL_DISHES.filter((d) => ['pho-cuon-thit-bo', 'com-rang-dua-bo'].includes(d.id));
    }
    return INITIAL_DISHES.filter((d) => ['com-thit-kho-tau', 'suon-nuong-bbq'].includes(d.id));
  }, [activePost]);

  // Featured post for hero section
  const featuredPost = useMemo(() => {
    return allPosts.find((p) => p.featured) || allPosts[0];
  }, [allPosts]);

  return (
    <div className="min-h-screen bg-stone-50/60 pb-16">
      {/* 1. ARTICLE DETAIL VIEW */}
      {activePost ? (
        <article className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 animate-fade-in">
          {/* Action Header: Back button & Share */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-orange-600 bg-white hover:bg-orange-50 px-3.5 py-2 rounded-xl border border-stone-200 shadow-2xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tất cả bài viết</span>
            </button>

            <div className="flex items-center gap-2">
              {customPosts.some((p) => p.id === activePost.id) && (
                <button
                  onClick={(e) => handleDeletePost(activePost.id, e)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl border border-red-200 shadow-2xs transition-all cursor-pointer"
                  title="Xóa bài viết này"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Xóa bài viết</span>
                </button>
              )}

              <button
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-orange-600 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs transition-all cursor-pointer"
                title="Sao chép liên kết bài viết"
              >
                {copiedShareLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Đã chép link!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Chia sẻ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Article Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/80 shadow-xs mb-8">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider rounded-lg">
                {activePost.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <Calendar className="w-3.5 h-3.5" />
                {activePost.publishDate}
              </span>
              <span className="text-stone-300">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                <Clock className="w-3.5 h-3.5" />
                {activePost.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-stone-900 leading-tight mb-4 tracking-tight">
              {activePost.title}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-600 leading-relaxed font-medium mb-6 max-w-5xl">
              {activePost.excerpt}
            </p>

            {/* Author info */}
            <div className="flex items-center gap-3.5 pt-4 border-t border-stone-100">
              <img
                src={activePost.author.avatar}
                alt={activePost.author.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-orange-500/20 shadow-2xs"
              />
              <div>
                <div className="font-extrabold text-stone-900 text-sm">
                  {activePost.author.name}
                </div>
                <div className="text-xs text-stone-500">{activePost.author.role}</div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden shadow-md border border-stone-200 mb-8 max-h-[520px] aspect-16/9 sm:aspect-21/9 bg-stone-100">
            <img
              src={activePost.coverImage}
              alt={activePost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Article Content */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-stone-200/80 shadow-xs mb-8 prose prose-stone max-w-none">
            {renderFormattedContent(activePost.content)}

            {/* Tags footer */}
            <div className="mt-10 pt-6 border-t border-stone-100">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
                <Tag className="w-3.5 h-3.5" />
                Thẻ chủ đề:
              </div>
              <div className="flex flex-wrap gap-2">
                {activePost.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-semibold rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related Dishes / Recipes section */}
          {relatedDishes.length > 0 && (
            <div className="bg-gradient-to-br from-orange-50/80 via-white to-amber-50/50 rounded-3xl p-6 sm:p-8 border border-orange-200/60 shadow-xs mb-8">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs">
                  <ChefHat className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  Món Ngon & Công Thức Đề Xuất Trong Bài Viết
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mb-5">
                Bấm vào món để xem ngay công thức nấu chuẩn vị và thông tin dinh dưỡng chi tiết:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {relatedDishes.map((dish) => (
                  <div
                    key={dish.id}
                    onClick={() => onSelectDish && onSelectDish(dish)}
                    className="group bg-white rounded-2xl p-3 border border-orange-100 shadow-2xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative rounded-xl overflow-hidden aspect-4/3 mb-2.5 bg-stone-100">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold rounded-md">
                          {dish.calories}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-orange-600 text-sm line-clamp-1 mb-1 group-hover:text-orange-700 transition-colors">
                        {dish.vietnameseName || dish.name}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-orange-600">{dish.priceRange}</span>
                      <span className="inline-flex items-center gap-0.5 font-bold text-orange-600 group-hover:text-orange-700">
                        Xem công thức <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs mb-8">
            <h3 className="text-lg sm:text-xl font-black text-stone-900 mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              Bài Viết Cùng Chuyên Mục
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allPosts
                .filter((p) => p.id !== activePost.id)
                .slice(0, 4)
                .map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleOpenPost(post)}
                    className="flex gap-3.5 p-3 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-all cursor-pointer group"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black uppercase text-orange-700 bg-orange-50 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 mt-1 mb-1">
                        {post.title}
                      </h4>
                      <div className="text-[11px] text-stone-400 flex items-center gap-2">
                        <span>{post.publishDate}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </article>
      ) : (
        /* 2. BLOG LIST & DISCOVERY VIEW */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {/* Breadcrumb Navigation for Blog List */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs sm:text-sm text-stone-500 font-medium">
            <a
              href="/"
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey || e.button === 1) return;
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('tarot');
                } else {
                  window.location.href = '/';
                }
              }}
              className="inline-flex items-center gap-1 text-stone-600 hover:text-orange-600 transition-colors py-1 px-1.5 rounded-md hover:bg-stone-100 font-semibold"
            >
              <Home className="w-3.5 h-3.5 text-stone-400" />
              <span>Trang chủ</span>
            </a>

            <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />

            <span className="text-orange-800 font-bold">Blog Ẩm Thực</span>
          </nav>

          {/* Hero Banner Header */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white p-6 sm:p-12 mb-8 shadow-lg">
            <div className="relative z-10 max-w-3xl lg:max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                <BookOpen className="w-3.5 h-3.5 text-amber-200" />
                <span>Cẩm Nang Ẩm Thực & Bếp Việt</span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-black leading-tight mb-4 tracking-tight sm:whitespace-nowrap">
                Blog Ẩm Thực Hôm Nay Ăn Gì
              </h1>
              <p className="text-sm sm:text-base text-orange-50 leading-relaxed font-medium mb-6 max-w-2xl">
                Kho tàng mẹo vặt nhà bếp, kinh nghiệm đi chợ, cẩm nang nấu ăn chuẩn vị và những câu chuyện văn hóa mâm cơm ba miền Việt Nam.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-orange-700 hover:bg-amber-50 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <PlusCircle className="w-4 h-4 text-orange-600" />
                  <span>Viết bài mới</span>
                </button>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('discover')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Xem 211+ công thức món ngon</span>
                  </button>
                )}
              </div>
            </div>

            {/* Background decorative illustrations */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
              <svg viewBox="0 0 200 200" className="w-full h-full text-white fill-current">
                <path d="M45,-75C58,-69,69,-58,76,-45C83,-32,86,-16,84,-1C82,14,75,28,67,41C59,54,50,66,38,73C26,80,13,82,-1,84C-15,86,-30,88,-43,82C-56,76,-67,62,-74,47C-81,32,-84,16,-82,1C-80,-14,-73,-28,-64,-40C-55,-52,-44,-62,-32,-68C-20,-74,-10,-76,3,-81C16,-86,32,-81,45,-75Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>

          {/* Search bar & Category filters */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bài viết, mẹo vặt, chủ đề..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post Card (Show when viewing "Tất Cả" and no search query) */}
          {selectedCategory === 'Tất Cả' && !searchQuery && featuredPost && (
            <div
              onClick={() => handleOpenPost(featuredPost)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 mb-10 cursor-pointer grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-7 relative overflow-hidden aspect-16/10 lg:aspect-auto min-h-[260px] lg:min-h-[380px]">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm">
                    Bài viết nổi bật
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-500 mb-3 font-semibold">
                    <span className="text-orange-600 font-extrabold uppercase">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishDate}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 group-hover:text-orange-600 transition-colors leading-snug mb-3">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium line-clamp-3 mb-4">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredPost.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 bg-stone-100 text-stone-600 text-[11px] font-semibold rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-100"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 font-bold text-xs sm:text-sm text-orange-600 group-hover:translate-x-1 transition-transform">
                    Đọc tiếp <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              {searchQuery
                ? `Kết quả tìm kiếm cho "${searchQuery}" (${filteredPosts.length})`
                : selectedCategory === 'Tất Cả'
                ? 'Tất Cả Bài Viết'
                : `Chuyên mục: ${selectedCategory} (${filteredPosts.length})`}
            </h2>

            <div className="flex items-center gap-3">
              {customPosts.length > 0 && (
                <button
                  onClick={handleClearAllCustomPosts}
                  className="text-xs font-bold text-stone-500 hover:text-stone-700 inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Xóa tất cả ({customPosts.length})
                </button>
              )}

              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('admin');
                  } else {
                    window.location.href = '/admin';
                  }
                }}
                className="text-xs font-bold text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 cursor-pointer transition-colors px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200"
                title="Quản trị bài viết & Mục Lưu Data"
              >
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mục Lưu Data</span>
              </button>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Thêm bài viết mới
              </button>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-4 text-orange-500">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-stone-900 mb-2">
                Chưa có bài viết nào
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mb-6 max-w-md mx-auto leading-relaxed">
                Tất cả bài viết mẫu đã được dọn sạch. Bạn hãy bấm vào nút bên dưới để viết những bài viết ẩm thực mới của riêng bạn nhé!
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Bắt đầu viết bài mới</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleOpenPost(post)}
                  className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-2xs hover:shadow-lg hover:border-orange-200 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold rounded-lg">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {customPosts.some((p) => p.id === post.id) && (
                          <button
                            onClick={(e) => handleDeletePost(post.id, e)}
                            className="p-1.5 bg-black/60 hover:bg-red-600 backdrop-blur-xs text-white rounded-lg transition-colors cursor-pointer"
                            title="Xóa bài viết này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-xs text-stone-400 mb-2 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.publishDate}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug mb-2">
                        {post.title}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-semibold rounded"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-stone-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-orange-100"
                      />
                      <span className="text-xs font-bold text-stone-800 truncate max-w-[120px]">
                        {post.author.name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                      Đọc tiếp <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. MODAL CREATE NEW BLOG POST */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-stone-900 text-lg">Viết Bài Blog Mới</h3>
                  <p className="text-xs text-stone-500">
                    Thêm bài viết mới vào trang blog và tạo mã nguồn lưu trữ
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 cursor-pointer ${
                    previewMode
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{previewMode ? 'Sửa' : 'Xem trước'}</span>
                </button>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            {previewMode ? (
              <div className="p-6 sm:p-8 space-y-4">
                <div className="aspect-16/9 rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src={newCoverImage}
                    alt={newTitle || 'Ảnh bài viết'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-orange-100 text-orange-800 text-xs font-bold rounded">
                    {newCategory}
                  </span>
                  <span className="text-xs text-stone-400">{newReadTime}</span>
                </div>
                <h2 className="text-2xl font-black text-stone-900">
                  {newTitle || 'Tiêu đề bài viết sẽ hiển thị ở đây'}
                </h2>
                <p className="text-stone-600 text-sm italic border-l-2 border-orange-400 pl-3">
                  {newExcerpt || 'Đoạn tóm tắt bài viết...'}
                </p>
                <div className="prose text-sm text-stone-700 pt-3 border-t border-stone-100">
                  {renderFormattedContent(newContent || 'Nội dung bài viết sẽ hiển thị ở đây...')}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Tiêu đề bài viết *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ví dụ: Bí quyết nấu phở bò Hà Nội thơm nức..."
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Chuyên mục
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) =>
                        setNewCategory(e.target.value as BlogPost['category'])
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
                    >
                      <option value="Mẹo Nhà Bếp">Mẹo Nhà Bếp</option>
                      <option value="Bí Quyết Nấu Ăn">Bí Quyết Nấu Ăn</option>
                      <option value="Văn Hóa Ẩm Thực">Văn Hóa Ẩm Thực</option>
                      <option value="Dinh Dưỡng & Sức Khỏe">Dinh Dưỡng & Sức Khỏe</option>
                      <option value="Gợi Ý Thực Đơn">Gợi Ý Thực Đơn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Thời gian đọc
                    </label>
                    <input
                      type="text"
                      value={newReadTime}
                      onChange={(e) => setNewReadTime(e.target.value)}
                      placeholder="5 phút đọc"
                      className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Link ảnh bìa (Cover Image URL)
                  </label>
                  <input
                    type="url"
                    value={newCoverImage}
                    onChange={(e) => setNewCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Tóm tắt ngắn (Excerpt)
                  </label>
                  <textarea
                    rows={2}
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    placeholder="Mô tả ngắn gọn trong 1 - 2 câu để hấp dẫn người đọc..."
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nội dung bài viết * (Hỗ trợ tiêu đề ###, gạch đầu dòng -, in đậm **)
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder={`### 1. Bí quyết đầu tiên\nNội dung chi tiết...\n\n- Điểm lưu ý 1\n- Điểm lưu ý 2\n\n> Lời khuyên của đầu bếp...`}
                    className="w-full px-3.5 py-2.5 text-sm font-mono bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Tác giả
                    </label>
                    <input
                      type="text"
                      value={newAuthorName}
                      onChange={(e) => setNewAuthorName(e.target.value)}
                      placeholder="Tên tác giả"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Thẻ tags (cách nhau bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      placeholder="Mẹo vặt, Nấu ăn, Phở bò"
                      className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Code Generator & Actions */}
                <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generatePostCodeSnippet());
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2500);
                    }}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Sao chép mã JSON để dán vào file src/data/blogPosts.ts"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Đã chép mã!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Sao chép mã vào blogPosts.ts</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-800 rounded-xl cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Đăng bài ngay
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
