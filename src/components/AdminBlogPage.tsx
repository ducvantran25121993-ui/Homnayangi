import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/blog-editor.css';
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  Save,
  ExternalLink,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Table as TableIcon,
  Quote,
  Undo,
  Redo,
  Sparkles,
  Tag,
  Folder,
  ArrowLeft,
  Check,
  X,
  Copy,
  Calendar,
  Clock,
  User,
  AlertCircle,
  HelpCircle,
  Minus,
  Maximize2,
  Minimize2,
  RefreshCw,
  Globe,
  Palette,
  Highlighter,
  Indent,
  Outdent,
  RemoveFormatting,
  Type,
  Download,
  Upload,
  Database,
  HardDrive,
  CheckCircle2,
  FileJson,
  Inbox,
  Mail,
  LogOut,
} from 'lucide-react';
import {
  BlogPost,
  BLOG_CATEGORIES,
  INITIAL_BLOG_POSTS,
  LOCAL_STORAGE_CUSTOM_POSTS,
  getAllBlogPosts,
} from '../data/blogPosts';
import {
  savePostToFirestore,
  deletePostFromFirestore,
  getPostsFromFirestore,
  logoutUser,
  onAuthStateChanged,
  auth,
} from '../firebase';
import { TabType } from '../utils/navigation';
import { AdminInboxView } from './AdminInboxView';
import { getContactMessages } from '../utils/contactStorage';
import {
  AdminLogin,
  AdminUserSession,
  ADMIN_SESSION_STORAGE_KEY,
} from './AdminLogin';

interface AdminBlogPageProps {
  onNavigate?: (tab: TabType) => void;
}

// Preset food images available in /public/images/ for fast selection
const PRESET_FOOD_IMAGES = [
  { name: 'Ăn gì cho đỡ ngán', url: '/images/an-gi-cho-do-ngan.jpg' },
  { name: 'Thịt heo làm món gì ngon', url: '/images/thit-heo-lam-mon-gi-ngon.jpg' },
  { name: 'Sườn heo làm món gì ngon', url: '/images/suon-heo-lam-mon-gi-ngon.jpg' },
  { name: 'Thịt nạc heo làm món gì ngon', url: '/images/thit-nac-heo-lam-mon-gi-ngon.jpg' },
  { name: 'Thịt gà nấu món gì ngon', url: '/images/thit-ga-nau-mon-gi-ngon.jpg' },
  { name: 'Thịt ba chỉ rang cháy cạnh', url: '/images/ba_chi_rang.jpg' },
  { name: 'Thịt kho tàu nước dừa', url: '/images/thit_kho_tau.jpg' },
  { name: 'Thịt ba chỉ luộc', url: '/images/thit_ba_chi_luoc.jpg' },
  { name: 'Thịt ba chỉ nướng', url: '/images/thit_ba_chi_nuong_noi_chien.jpg' },
  { name: 'Canh chua cá lóc', url: '/images/canh_chua_ca_loc.jpg' },
  { name: 'Bún cá thanh nhẹ', url: '/images/bun_ca.jpg' },
  { name: 'Cá diêu hồng hấp gừng', url: '/images/ca_dieu_hong_hap.jpg' },
  { name: 'Bún đậu mắm tôm', url: '/images/bun_dau_mam_tom.jpg' },
  { name: 'Đậu hũ sốt cà nấm', url: '/images/dau_hu_sot_ca_nam.jpg' },
  { name: 'Cải thìa xào nấm', url: '/images/cai_thia_xao_nam.jpg' },
  { name: 'Cháo cá lóc nóng', url: '/images/chao_ca_loc.jpg' },
];

// Color palettes for WordPress toolbar
const TEXT_COLORS = [
  { name: 'Đen mặc định', value: '#1c1917' },
  { name: 'Xám đậm', value: '#4b5563' },
  { name: 'Đỏ', value: '#dc2626' },
  { name: 'Cam thương hiệu', value: '#ea580c' },
  { name: 'Hổ phách', value: '#d97706' },
  { name: 'Xanh lá', value: '#16a34a' },
  { name: 'Xanh dương', value: '#2563eb' },
  { name: 'Tím', value: '#7c3aed' },
];

const HIGHLIGHT_COLORS = [
  { name: 'Không màu', value: 'transparent' },
  { name: 'Vàng tươi', value: '#fef08a' },
  { name: 'Cam nhạt', value: '#fed7aa' },
  { name: 'Xanh ngọc', value: '#bbf7d0' },
  { name: 'Xanh lam', value: '#bfdbfe' },
  { name: 'Tím nhạt', value: '#e9d5ff' },
  { name: 'Hồng phấn', value: '#fbcfe8' },
];

export const AdminBlogPage: React.FC<AdminBlogPageProps> = ({ onNavigate }) => {
  // Authentication session state
  const [adminSession, setAdminSession] = useState<AdminUserSession | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored =
        localStorage.getItem(ADMIN_SESSION_STORAGE_KEY) ||
        sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return null;
  });

  const [viewMode, setViewMode] = useState<'list' | 'editor' | 'inbox'>('list');
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('Tất Cả');
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);

  // Sync Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const session: AdminUserSession = {
          email: user.email || 'ducvantran25121993@gmail.com',
          name: user.displayName || 'Quản Trị Viên',
          avatar: user.photoURL || undefined,
          method: 'google',
          loginAt: new Date().toISOString(),
        };
        setAdminSession(session);
        try {
          localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
        } catch {}
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    if (typeof window !== 'undefined' && !window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi trang quản trị?')) {
      return;
    }
    try {
      await logoutUser();
    } catch {}
    try {
      localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
      sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    } catch {}
    setAdminSession(null);
    if (toastMessage) setToastMessage(null);
  };

  // Editor State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('Gợi Ý Thực Đơn');
  const [coverImage, setCoverImage] = useState('/images/an-gi-cho-do-ngan.jpg');
  const [tags, setTags] = useState('Món ngon, Bữa cơm gia đình, Đổi vị');
  const [authorName, setAuthorName] = useState('Bếp Trưởng Hôm Nay Ăn Gì');
  const [authorRole, setAuthorRole] = useState('Chuyên gia Ẩm thực & Dinh dưỡng');
  const [publishDate, setPublishDate] = useState(() =>
    new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
  );
  const [readTime, setReadTime] = useState('6 phút đọc');
  const [featured, setFeatured] = useState(false);
  const [editorSubTab, setEditorSubTab] = useState<'visual' | 'preview' | 'markdown'>('visual');
  const [currentBlockFormat, setCurrentBlockFormat] = useState<string>('p');
  const [currentFontSize, setCurrentFontSize] = useState<string>('3');

  // Fullscreen & Live counters for Word/WordPress experience
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorWordCount, setEditorWordCount] = useState(0);
  const [editorCharCount, setEditorCharCount] = useState(0);

  // Interactive Link Toolbar floating state
  const [floatingLink, setFloatingLink] = useState<{
    targetEl: HTMLAnchorElement;
    url: string;
    text: string;
    top: number;
    left: number;
  } | null>(null);
  const [editingLinkUrl, setEditingLinkUrl] = useState('');
  const [isEditingLinkInline, setIsEditingLinkInline] = useState(false);
  const [editingLinkTextVal, setEditingLinkTextVal] = useState('');
  const [isEditingLinkText, setIsEditingLinkText] = useState(false);

  // Insert Link Modal
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkModalUrl, setLinkModalUrl] = useState('');
  const [linkModalText, setLinkModalText] = useState('');
  const [linkSearchQuery, setLinkSearchQuery] = useState('');
  const savedSelectionRange = useRef<Range | null>(null);

  // Insert Image Modal / Image Picker
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  // Insert Table Modal
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(2);

  // Text Color / Highlight Popover
  const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState(false);
  const [isBgColorPickerOpen, setIsBgColorPickerOpen] = useState(false);

  // Editor Ref
  const editorRef = useRef<HTMLDivElement>(null);

  // Data Storage & Backup Center State
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [syncingServer, setSyncingServer] = useState(false);
  const [copiedDataJson, setCopiedDataJson] = useState(false);
  const [remoteServerUrl, setRemoteServerUrl] = useState('');
  const [syncingRemote, setSyncingRemote] = useState(false);
  const fileImportRef = useRef<HTMLInputElement>(null);

  // Show Toast Helper
  const showToast = (text: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Export exact custom_blog_posts.json file for other web servers (Vercel, VPS, Nginx, Hosting)
  const handleExportServerJson = () => {
    try {
      const customRaw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS) : null;
      const customParsed = customRaw ? JSON.parse(customRaw) : [];
      const exportList = customParsed.length > 0 ? customParsed : posts;

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportList, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'custom_blog_posts.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast('Đã tải file chuẩn "custom_blog_posts.json"! Chỉ cần đặt file này vào thư mục public của bất kỳ máy chủ nào.');
    } catch (err: any) {
      showToast('Lỗi xuất file: ' + (err?.message || ''), 'error');
    }
  };

  // Copy raw JSON to clipboard for instant pasting on other servers
  const handleCopyJsonToClipboard = () => {
    try {
      const customRaw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS) : null;
      const customParsed = customRaw ? JSON.parse(customRaw) : [];
      const exportList = customParsed.length > 0 ? customParsed : posts;
      navigator.clipboard.writeText(JSON.stringify(exportList, null, 2));
      setCopiedDataJson(true);
      showToast('Đã sao chép mã JSON vào Clipboard! Bạn có thể dán vào máy chủ khác.');
      setTimeout(() => setCopiedDataJson(false), 3000);
    } catch {
      showToast('Không thể sao chép tự động', 'error');
    }
  };

  // Sync posts from another remote web server URL
  const handleSyncFromRemoteUrl = async () => {
    if (!remoteServerUrl.trim()) {
      showToast('Vui lòng nhập địa chỉ máy chủ khác (VD: https://domain-cua-ban.com)', 'error');
      return;
    }
    setSyncingRemote(true);
    let target = remoteServerUrl.trim().replace(/\/$/, '');
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`;
    }

    try {
      let remotePosts: BlogPost[] = [];
      try {
        const res = await fetch(`${target}/api/admin/posts?_t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.customPosts) && data.customPosts.length > 0) {
            remotePosts = data.customPosts;
          } else if (Array.isArray(data.posts) && data.posts.length > 0) {
            remotePosts = data.posts;
          }
        }
      } catch {
        // ignore
      }

      if (remotePosts.length === 0) {
        const res = await fetch(`${target}/custom_blog_posts.json?_t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            remotePosts = data;
          }
        }
      }

      if (remotePosts.length === 0) {
        throw new Error('Không thể tải bài viết từ máy chủ này. Hãy kiểm tra URL hoặc CORS.');
      }

      // Merge and save
      const existingRaw = localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS);
      const existingList: BlogPost[] = existingRaw ? JSON.parse(existingRaw) : [];
      const map = new Map<string, BlogPost>();
      existingList.forEach((p) => map.set(p.slug || p.id, p));
      remotePosts.forEach((p) => map.set(p.slug || p.id, p));
      const merged = Array.from(map.values());

      localStorage.setItem(LOCAL_STORAGE_CUSTOM_POSTS, JSON.stringify(merged));

      // Sync to local server
      await fetch('/api/admin/posts/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posts: merged, overwrite: false }),
      });

      await loadPosts();
      showToast(`Đồng bộ thành công! Đã nạp ${remotePosts.length} bài viết từ máy chủ từ xa.`);
      setRemoteServerUrl('');
    } catch (err: any) {
      showToast(err.message || 'Lỗi kết nối máy chủ từ xa', 'error');
    } finally {
      setSyncingRemote(false);
    }
  };

  // Export / Download Data JSON file to computer
  const handleExportData = () => {
    try {
      const customRaw = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS) : null;
      const customParsed = customRaw ? JSON.parse(customRaw) : [];
      const backupPayload = {
        app: 'Hôm Nay Ăn Gì (angigio.com)',
        type: 'blog_data_backup',
        version: '2.0',
        exportedAt: new Date().toISOString(),
        totalPosts: posts.length,
        customPostsCount: customParsed.length,
        customPosts: customParsed,
        allPosts: posts,
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupPayload, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute(
        'download',
        `angigio_data_backup_${new Date().toISOString().split('T')[0]}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast('Đã lưu và tải file sao lưu dữ liệu (.json) về máy thành công!');
    } catch (err: any) {
      console.error('Export error:', err);
      showToast('Lỗi khi xuất dữ liệu: ' + (err?.message || ''), 'error');
    }
  };

  // Import / Restore Data from JSON file
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const json = JSON.parse(text);
        let importedPosts: BlogPost[] = [];

        if (Array.isArray(json)) {
          importedPosts = json;
        } else if (json.customPosts && Array.isArray(json.customPosts)) {
          importedPosts = json.customPosts;
        } else if (json.allPosts && Array.isArray(json.allPosts)) {
          importedPosts = json.allPosts;
        } else if (json.posts && Array.isArray(json.posts)) {
          importedPosts = json.posts;
        } else {
          throw new Error('Định dạng file sao lưu không hợp lệ. Cần chứa mảng bài viết.');
        }

        if (importedPosts.length === 0) {
          throw new Error('File không chứa bài viết nào để khôi phục.');
        }

        // Save to localStorage
        const existingCustomRaw = localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS);
        const existingCustom: BlogPost[] = existingCustomRaw ? JSON.parse(existingCustomRaw) : [];
        const mergedMap = new Map<string, BlogPost>();
        existingCustom.forEach((p) => mergedMap.set(p.slug || p.id, p));
        importedPosts.forEach((p) => mergedMap.set(p.slug || p.id, p));
        const mergedList = Array.from(mergedMap.values());
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_POSTS, JSON.stringify(mergedList));

        // Sync to server API
        try {
          await fetch('/api/admin/posts/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ posts: mergedList, overwrite: false }),
          });
        } catch (apiErr) {
          console.warn('Server sync warning during import:', apiErr);
        }

        await loadPosts();
        showToast(`Đã khôi phục thành công ${importedPosts.length} bài viết vào hệ thống!`);
        setIsDataModalOpen(false);
      } catch (err: any) {
        console.error('Import error:', err);
        showToast(err.message || 'Lỗi khi đọc file JSON', 'error');
      } finally {
        if (fileImportRef.current) fileImportRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  // Sync All Data to Server
  const handleSyncAllData = async () => {
    setSyncingServer(true);
    try {
      const customRaw = localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS);
      const customParsed = customRaw ? JSON.parse(customRaw) : [];

      const res = await fetch('/api/admin/posts/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posts: customParsed, overwrite: false }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Lỗi đồng bộ server');

      await loadPosts();
      showToast(`Đã đồng bộ và lưu toàn bộ ${customParsed.length} bài viết tùy chỉnh lên máy chủ!`);
    } catch (err: any) {
      showToast(err?.message || 'Lỗi khi lưu dữ liệu lên máy chủ', 'error');
    } finally {
      setSyncingServer(false);
    }
  };

  // Auto generate slug from title
  const generateSlug = (rawTitle: string): string => {
    return rawTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  // Fetch all posts from Cloud Firestore, API, or localStorage
  const loadPosts = useCallback(async () => {
    setLoading(true);

    // 1. Try Cloud Firestore first for global multi-device sync
    try {
      const cloudPosts = await getPostsFromFirestore();
      if (cloudPosts && cloudPosts.length > 0) {
        const map = new Map<string, BlogPost>();
        // Custom posts first
        cloudPosts.forEach((p) => map.set(p.slug || p.id, p));
        INITIAL_BLOG_POSTS.forEach((p) => {
          if (!map.has(p.slug)) map.set(p.slug, p);
        });
        const merged = Array.from(map.values());
        setPosts(merged);
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_CUSTOM_POSTS, JSON.stringify(cloudPosts));
        }
        setLoading(false);
        return;
      }
    } catch (e) {
      console.warn('Firestore load error:', e);
    }

    // 2. Try server API
    try {
      const res = await fetch('/api/admin/posts');
      if (res.ok) {
        const data = await res.json();
        if (data.posts && Array.isArray(data.posts)) {
          const map = new Map<string, BlogPost>();
          if (Array.isArray(data.customPosts)) {
            data.customPosts.forEach((p: BlogPost) => map.set(p.slug || p.id, p));
          }
          data.posts.forEach((p: BlogPost) => {
            if (!map.has(p.slug || p.id)) map.set(p.slug || p.id, p);
          });
          setPosts(Array.from(map.values()));
          // Sync custom posts into localStorage as instant fallback
          if (data.customPosts && typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_CUSTOM_POSTS, JSON.stringify(data.customPosts));
          }
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback to local
    }

    // 3. Local fallback
    const all = getAllBlogPosts();
    setPosts(all);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Check URL query tab=inbox and track unread contact messages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'inbox') {
      setViewMode('inbox');
    }

    const updateUnread = () => {
      try {
        const msgs = getContactMessages();
        const unread = msgs.filter((m) => m.status === 'unread').length;
        setUnreadMessagesCount(unread);
      } catch {
        // ignore
      }
    };

    updateUnread();
    window.addEventListener('angigio_new_message', updateUnread);
    window.addEventListener('angigio_messages_updated', updateUnread);
    return () => {
      window.removeEventListener('angigio_new_message', updateUnread);
      window.removeEventListener('angigio_messages_updated', updateUnread);
    };
  }, []);

  // Convert markdown to clean HTML for visual editing
  const markdownToHtml = (md: string): string => {
    if (!md) return '<p>Bắt đầu viết nội dung bài viết...</p>';
    if (md.trim().startsWith('<') && md.includes('</')) {
      return md; // already HTML
    }

    const lines = md.split('\n');
    const htmlChunks: string[] = [];
    let inList = false;
    let inOrderedList = false;
    let inTable = false;
    let tableHtml = '';

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // End list if needed
      if (inList && !line.trim().startsWith('* ') && !line.trim().startsWith('- ')) {
        htmlChunks.push('</ul>');
        inList = false;
      }
      if (inOrderedList && !/^\d+\.\s/.test(line.trim())) {
        htmlChunks.push('</ol>');
        inOrderedList = false;
      }

      // Check Table
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableHtml = '<table class="w-full border-collapse my-6 border border-stone-300"><tbody>';
        }
        if (line.includes('---')) {
          continue; // separator
        }
        const cells = line
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const isHeader = !tableHtml.includes('<tr>');
        tableHtml += '<tr>';
        cells.forEach((cell) => {
          if (isHeader) {
            tableHtml += `<th class="border border-stone-300 bg-stone-100 p-2.5 font-bold text-left">${cell}</th>`;
          } else {
            tableHtml += `<td class="border border-stone-300 p-2.5">${cell}</td>`;
          }
        });
        tableHtml += '</tr>';
        continue;
      } else if (inTable) {
        tableHtml += '</tbody></table>';
        htmlChunks.push(tableHtml);
        inTable = false;
        tableHtml = '';
      }

      // Headings
      if (line.startsWith('### ')) {
        htmlChunks.push(`<h3 class="text-xl font-bold text-stone-900 mt-6 mb-3">${formatInline(line.slice(4))}</h3>`);
        continue;
      }
      if (line.startsWith('## ')) {
        htmlChunks.push(`<h2 class="text-2xl font-bold text-stone-900 mt-8 mb-4 pb-2 border-b border-stone-200">${formatInline(line.slice(3))}</h2>`);
        continue;
      }
      if (line.startsWith('# ')) {
        htmlChunks.push(`<h1 class="text-3xl font-extrabold text-stone-900 mt-8 mb-4">${formatInline(line.slice(2))}</h1>`);
        continue;
      }

      // HR
      if (line.trim() === '---' || line.trim() === '***') {
        htmlChunks.push('<hr class="my-8 border-stone-200" />');
        continue;
      }

      // Blockquote
      if (line.startsWith('> ')) {
        htmlChunks.push(
          `<blockquote class="border-l-4 border-orange-500 pl-4 py-2 my-4 italic text-stone-700 bg-orange-50/50 rounded-r-lg">${formatInline(
            line.slice(2)
          )}</blockquote>`
        );
        continue;
      }

      // Bullet list
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        if (!inList) {
          htmlChunks.push('<ul class="list-disc pl-6 my-4 space-y-1.5">');
          inList = true;
        }
        htmlChunks.push(`<li>${formatInline(line.trim().slice(2))}</li>`);
        continue;
      }

      // Ordered list
      if (/^\d+\.\s/.test(line.trim())) {
        if (!inOrderedList) {
          htmlChunks.push('<ol class="list-decimal pl-6 my-4 space-y-1.5">');
          inOrderedList = true;
        }
        htmlChunks.push(`<li>${formatInline(line.trim().replace(/^\d+\.\s/, ''))}</li>`);
        continue;
      }

      // Images ![alt](url)
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        const [, alt, src] = imgMatch;
        htmlChunks.push(
          `<figure class="my-6 text-center"><img src="${src}" alt="${alt}" class="max-w-md w-full mx-auto rounded-xl shadow-xs border border-stone-200" />${
            alt ? `<figcaption class="text-xs text-stone-500 mt-2 italic">${alt}</figcaption>` : ''
          }</figure>`
        );
        continue;
      }

      // Paragraph
      if (line.trim()) {
        htmlChunks.push(`<p class="my-3 text-stone-800 leading-relaxed text-base">${formatInline(line)}</p>`);
      } else {
        htmlChunks.push('<p class="my-2">&nbsp;</p>');
      }
    }

    if (inList) htmlChunks.push('</ul>');
    if (inOrderedList) htmlChunks.push('</ol>');
    if (inTable) {
      tableHtml += '</tbody></table>';
      htmlChunks.push(tableHtml);
    }

    return htmlChunks.join('\n');
  };

  // Format inline bold and links
  const formatInline = (str: string): string => {
    return str
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-orange-600 underline font-semibold hover:text-orange-700">$1</a>');
  };

  // Convert HTML back to clean Markdown
  const htmlToMarkdown = (html: string): string => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const processNode = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || '';
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toLowerCase();

        if (tag === 'h1') return `\n# ${Array.from(el.childNodes).map(processNode).join('').trim()}\n\n`;
        if (tag === 'h2') return `\n## ${Array.from(el.childNodes).map(processNode).join('').trim()}\n\n`;
        if (tag === 'h3') return `\n### ${Array.from(el.childNodes).map(processNode).join('').trim()}\n\n`;
        if (tag === 'h4') return `\n#### ${Array.from(el.childNodes).map(processNode).join('').trim()}\n\n`;
        if (tag === 'hr') return `\n---\n\n`;
        if (tag === 'br') return '\n';
        if (tag === 'blockquote') {
          const rawInner = Array.from(el.childNodes).map(processNode).join('');
          const bqLines = rawInner.split('\n').map((l) => l.trim()).filter(Boolean);
          if (bqLines.length === 0) return '';
          return '\n' + bqLines.map((l) => (l.startsWith('>') ? l : `> ${l}`)).join('\n') + '\n\n';
        }
        if (tag === 'div') {
          const inner = Array.from(el.childNodes).map(processNode).join('');
          return inner.trim() ? `\n${inner.trim()}\n` : '\n';
        }
        if (tag === 'p') {
          const inner = Array.from(el.childNodes).map(processNode).join('');
          return inner.trim() ? `\n${inner.trim()}\n` : '\n';
        }
        if (tag === 'ul') {
          return (
            '\n' +
            Array.from(el.querySelectorAll(':scope > li'))
              .map((li) => `* ${Array.from(li.childNodes).map(processNode).join('').trim()}`)
              .join('\n') +
            '\n\n'
          );
        }
        if (tag === 'ol') {
          return (
            '\n' +
            Array.from(el.querySelectorAll(':scope > li'))
              .map((li, idx) => `${idx + 1}. ${Array.from(li.childNodes).map(processNode).join('').trim()}`)
              .join('\n') +
            '\n\n'
          );
        }
        if (tag === 'a') {
          const href = el.getAttribute('href') || '#';
          const text = Array.from(el.childNodes).map(processNode).join('').trim() || el.textContent?.trim() || href;
          return `[${text}](${href})`;
        }
        if (tag === 'strong' || tag === 'b') {
          const inner = Array.from(el.childNodes).map(processNode).join('');
          return `**${inner}**`;
        }
        if (tag === 'em' || tag === 'i') {
          const inner = Array.from(el.childNodes).map(processNode).join('');
          return `*${inner}*`;
        }
        if (tag === 'u' || tag === 'span') {
          return Array.from(el.childNodes).map(processNode).join('');
        }
        if (tag === 'img') {
          const src = el.getAttribute('src') || '';
          const alt = el.getAttribute('alt') || '';
          return `\n![${alt}](${src})\n`;
        }
        if (tag === 'figure') {
          const img = el.querySelector('img');
          if (img) {
            const src = img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || el.querySelector('figcaption')?.textContent || '';
            return `\n![${alt}](${src})\n`;
          }
        }
        if (tag === 'table') {
          const rows = Array.from(el.querySelectorAll('tr'));
          if (rows.length === 0) return '';
          let mdTable = '\n';
          rows.forEach((row, rowIdx) => {
            const cols = Array.from(row.querySelectorAll('th, td')).map((c) => c.textContent?.trim() || '');
            mdTable += `| ${cols.join(' | ')} |\n`;
            if (rowIdx === 0) {
              mdTable += `| ${cols.map(() => '---').join(' | ')} |\n`;
            }
          });
          return mdTable + '\n';
        }

        return Array.from(el.childNodes).map(processNode).join('');
      }

      return '';
    };

    let md = Array.from(tempDiv.childNodes).map(processNode).join('');
    // Normalize newlines
    md = md.replace(/\n{3,}/g, '\n\n').trim();
    return md;
  };

  // Helper to ensure all raw links, "Xem thêm" references, and internal post mentions are properly formatted as markdown links
  const autoFormatLinksAndReferences = (markdown: string, existingPosts: BlogPost[]): string => {
    if (!markdown) return '';
    const lines = markdown.split('\n');
    return lines
      .map((line) => {
        let processed = line;

        // 1. Check if line has "Xem thêm" without markdown link (e.g. "> Xem thêm: angigio.com/slug" or "> Xem thêm: Tiêu đề")
        if (/>\s*Xem thêm[:\s]/i.test(processed) && !processed.includes('](')) {
          let foundPost: BlogPost | undefined;
          for (const p of existingPosts) {
            if (
              processed.toLowerCase().includes(p.slug.toLowerCase()) ||
              processed.toLowerCase().includes(p.title.toLowerCase().trim())
            ) {
              foundPost = p;
              break;
            }
          }
          if (foundPost) {
            return `> Xem thêm: [${foundPost.title}](https://angigio.com/${foundPost.slug})`;
          }
        }

        // 2. Auto-link bare URLs outside existing markdown links
        const parts = processed.split(/(\[[^\]]+\]\([^)]+\))/g);
        processed = parts
          .map((part) => {
            if (part.startsWith('[') && part.includes('](')) return part;
            return part.replace(
              /\b(?:https?:\/\/angigio\.com\/|angigio\.com\/)([a-z0-9-]+)\b/gi,
              (full, slugPart) => {
                const target = existingPosts.find((p) => p.slug.toLowerCase() === slugPart.toLowerCase());
                const anchorText = target ? target.title : slugPart;
                return `[${anchorText}](https://angigio.com/${slugPart})`;
              }
            );
          })
          .join('');

        return processed;
      })
      .join('\n');
  };

  // Open New Post Form
  const handleOpenNewPost = () => {
    setEditingPostId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setCategory('Gợi Ý Thực Đơn');
    setCoverImage('/images/an-gi-cho-do-ngan.jpg');
    setTags('Món ngon, Bữa cơm gia đình, Đổi vị');
    setAuthorName('Bếp Trưởng Hôm Nay Ăn Gì');
    setAuthorRole('Chuyên gia Ẩm thực & Dinh dưỡng');
    setPublishDate(new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    setReadTime('6 phút đọc');
    setFeatured(false);
    setViewMode('editor');
    setEditorSubTab('visual');
    setFloatingLink(null);

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = '<p>Bắt đầu viết nội dung bài viết của bạn tại đây...</p>';
      }
    }, 50);
  };

  // Open Edit Post Form
  const handleEditPost = (post: BlogPost) => {
    setEditingPostId(post.id || post.slug);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setCategory(post.category);
    setCoverImage(post.coverImage);
    setTags(Array.isArray(post.tags) ? post.tags.join(', ') : post.tags);
    setAuthorName(post.author?.name || 'Bếp Trưởng Hôm Nay Ăn Gì');
    setAuthorRole(post.author?.role || 'Chuyên gia Ẩm thực & Dinh dưỡng');
    setPublishDate(post.publishDate || new Date().toLocaleDateString('vi-VN'));
    setReadTime(post.readTime || '5 phút đọc');
    setFeatured(!!post.featured);
    setViewMode('editor');
    setEditorSubTab('visual');
    setFloatingLink(null);

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = markdownToHtml(post.content);
      }
    }, 50);
  };

  // Update live word & character counts
  const updateCounts = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
      setEditorWordCount(words);
      setEditorCharCount(text.length);
    }
  }, []);

  // Map heading/block tag to font size level (1-7 scale used by browser execCommand)
  const getFontSizeForTag = (tag: string): string => {
    switch (tag) {
      case 'h1':
        return '6'; // 32px (H1)
      case 'h2':
        return '5'; // 24px (H2)
      case 'h3':
        return '4'; // 18-20px (H3)
      case 'h4':
        return '3'; // 16px (H4)
      case 'p':
        return '3'; // 16px (Normal paragraph)
      case 'blockquote':
        return '3'; // 16px
      case 'pre':
        return '2'; // 13px
      default:
        return '3';
    }
  };

  // Detect current block/heading format at cursor position
  const detectCurrentBlockFormat = useCallback(() => {
    if (typeof window === 'undefined') return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.current) return;

    // 1. Traverse upwards from anchorNode to editorRef container
    let node: Node | null = selection.anchorNode;
    let foundTag = 'p';

    while (node && node !== editorRef.current) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as HTMLElement).tagName.toLowerCase();
        if (['h1', 'h2', 'h3', 'h4', 'blockquote', 'pre', 'p'].includes(tag)) {
          foundTag = tag;
          break;
        }
      }
      node = node.parentNode;
    }

    if (foundTag === 'p') {
      try {
        const val = document.queryCommandValue('formatBlock');
        if (val) {
          const cleanVal = val.toLowerCase().replace(/[<>]/g, '');
          if (['h1', 'h2', 'h3', 'h4', 'blockquote', 'pre', 'p'].includes(cleanVal)) {
            foundTag = cleanVal;
          }
        }
      } catch {}
    }

    setCurrentBlockFormat(foundTag);

    // Sync font size to match heading size
    try {
      const fsVal = document.queryCommandValue('fontSize');
      if (fsVal && ['1', '2', '3', '4', '5', '6', '7'].includes(fsVal)) {
        setCurrentFontSize(fsVal);
      } else {
        setCurrentFontSize(getFontSizeForTag(foundTag));
      }
    } catch {
      setCurrentFontSize(getFontSizeForTag(foundTag));
    }
  }, []);

  // Format block change handler (H1, H2, H3, H4, Quote, Paragraph)
  const handleFormatBlockChange = (tag: string) => {
    setCurrentBlockFormat(tag);
    setCurrentFontSize(getFontSizeForTag(tag));

    if (!tag || !editorRef.current) return;
    editorRef.current.focus();
    try {
      document.execCommand('formatBlock', false, tag);
    } catch {
      document.execCommand('formatBlock', false, `<${tag}>`);
    }
    updateCounts();
    setTimeout(detectCurrentBlockFormat, 30);
  };

  // Sync toolbar with cursor position whenever user clicks, types, or moves cursor
  useEffect(() => {
    if (viewMode !== 'editor' || editorSubTab !== 'visual') return;
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || !editorRef.current) return;
      if (editorRef.current.contains(selection.anchorNode)) {
        detectCurrentBlockFormat();
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [viewMode, editorSubTab, detectCurrentBlockFormat]);

  // Execute formatting command in document
  const execCmd = (cmd: string, val: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(cmd, false, val);
    updateCounts();
  };

  // Font Size formatter
  const handleApplyFontSize = (sizeVal: string) => {
    if (!sizeVal) return;
    setCurrentFontSize(sizeVal);
    execCmd('fontSize', sizeVal);
  };

  // Text Color formatter
  const handleApplyTextColor = (color: string) => {
    execCmd('foreColor', color);
    setIsTextColorPickerOpen(false);
  };

  // Background Highlight formatter
  const handleApplyBgColor = (color: string) => {
    execCmd('hiliteColor', color);
    setIsBgColorPickerOpen(false);
  };

  // Clear / Remove formatting
  const handleRemoveFormat = () => {
    execCmd('removeFormat');
    showToast('Đã xóa định dạng văn bản đã chọn');
  };

  // Quick Unlink from Toolbar
  const handleToolbarUnlink = () => {
    execCmd('unlink');
    showToast('Đã gỡ bỏ liên kết!');
  };

  // Handle click on links inside editor ("trình soạn thảo đứng im dể dễ chọn & có thể xóa bỏ")
  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCounts();
    detectCurrentBlockFormat();
    const target = e.target as HTMLElement;
    const linkEl = target.closest('a');

    if (linkEl && editorRef.current?.contains(linkEl)) {
      e.preventDefault();
      e.stopPropagation();

      const rect = linkEl.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();

      // Ensure floating toolbar stays within visible area and does not cause scroll jump
      const showBelow = rect.bottom + 65 < window.innerHeight;
      const topPos = showBelow
        ? rect.bottom - editorRect.top + editorRef.current.scrollTop + 8
        : rect.top - editorRect.top + editorRef.current.scrollTop - 44;

      setFloatingLink({
        targetEl: linkEl as HTMLAnchorElement,
        url: linkEl.getAttribute('href') || '',
        text: linkEl.textContent || '',
        top: Math.max(8, topPos),
        left: Math.max(10, Math.min(rect.left - editorRect.left, editorRect.width - 320)),
      });
      setIsEditingLinkInline(false);
      setIsEditingLinkText(false);
      setEditingLinkUrl(linkEl.getAttribute('href') || '');
      setEditingLinkTextVal(linkEl.textContent || '');
      return;
    }

    // Clicked outside link: dismiss floating toolbar & popovers
    setFloatingLink(null);
    setIsEditingLinkInline(false);
    setIsEditingLinkText(false);
    setIsTextColorPickerOpen(false);
    setIsBgColorPickerOpen(false);
  };

  // Remove the currently selected link (Unlink without jumping or moving the editor)
  const handleRemoveFloatingLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!floatingLink?.targetEl) return;

    const el = floatingLink.targetEl;
    const parent = el.parentNode;
    if (parent) {
      while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
      }
      parent.removeChild(el);
    }
    setFloatingLink(null);
    setIsEditingLinkInline(false);
    updateCounts();
    showToast('Đã gỡ bỏ liên kết thành công (giữ nguyên chữ)!', 'success');
  };

  // Update target URL of floating link
  const handleSaveFloatingLinkUrl = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!floatingLink?.targetEl || !editingLinkUrl.trim()) return;

    floatingLink.targetEl.setAttribute('href', editingLinkUrl.trim());
    setFloatingLink(null);
    setIsEditingLinkInline(false);
    showToast('Đã cập nhật liên kết!', 'success');
  };

  // Update anchor text of floating link
  const handleSaveFloatingLinkText = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!floatingLink?.targetEl || !editingLinkTextVal.trim()) return;

    floatingLink.targetEl.textContent = editingLinkTextVal.trim();
    setFloatingLink(null);
    setIsEditingLinkText(false);
    updateCounts();
    showToast('Đã đổi chữ hiển thị của link thành công!', 'success');
  };

  // Add space after link if glued to text
  const handleAddSpaceAfterFloatingLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!floatingLink?.targetEl) return;

    floatingLink.targetEl.after(document.createTextNode(' '));
    updateCounts();
    setFloatingLink(null);
    showToast('Đã tách khoảng cách giữa link và chữ sau!', 'success');
  };

  // Open Link Modal with captured selection
  const handleOpenLinkModal = () => {
    let selectedText = '';
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current) {
      const range = sel.getRangeAt(0);
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        savedSelectionRange.current = range.cloneRange();
        selectedText = sel.toString().trim();
      } else {
        savedSelectionRange.current = null;
      }
    } else {
      savedSelectionRange.current = null;
    }

    setLinkModalText(selectedText);
    setLinkModalUrl('');
    setLinkSearchQuery('');
    setIsLinkModalOpen(true);
  };

  // Insert Link from Toolbar Modal
  const handleInsertLink = () => {
    let href = linkModalUrl.trim();
    if (!href) {
      showToast('Vui lòng nhập địa chỉ URL hoặc chọn bài viết gợi ý', 'warning');
      return;
    }

    // Auto-fix URL format if not absolute or domain-relative
    if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('/')) {
      href = 'https://' + href;
    }

    // Determine readable anchor text
    let text = linkModalText.trim();
    if (!text) {
      const slugCandidate = href.split('/').filter(Boolean).pop()?.toLowerCase();
      const matched = posts.find(
        (p) => p.slug?.toLowerCase() === slugCandidate || href.includes(p.slug)
      );
      if (matched) {
        text = matched.title;
      } else if (slugCandidate) {
        text = slugCandidate.replace(/[-_]/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
      } else {
        text = href;
      }
    }

    if (editorRef.current) {
      editorRef.current.focus();

      let targetRange = savedSelectionRange.current;
      const sel = window.getSelection();

      // Ensure targetRange is valid and located within editor
      if (!targetRange || !editorRef.current.contains(targetRange.commonAncestorContainer)) {
        if (sel && sel.rangeCount > 0 && editorRef.current.contains(sel.getRangeAt(0).commonAncestorContainer)) {
          targetRange = sel.getRangeAt(0);
        } else {
          // Default to end of editor
          targetRange = document.createRange();
          targetRange.selectNodeContents(editorRef.current);
          targetRange.collapse(false);
        }
      }

      // Create anchor element directly with full attributes & high-contrast styling
      const anchor = document.createElement('a');
      anchor.setAttribute('href', href);
      anchor.className = 'text-orange-600 underline font-semibold hover:text-orange-700 cursor-pointer';
      anchor.textContent = text;

      // Delete whatever was selected and insert anchor
      targetRange.deleteContents();
      targetRange.insertNode(anchor);

      // Add space text node after anchor
      const spaceNode = document.createTextNode(' ');
      anchor.after(spaceNode);

      // Move caret after the space
      const newRange = document.createRange();
      newRange.setStartAfter(spaceNode);
      newRange.collapse(true);
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(newRange);
      }

      updateCounts();
    }

    setIsLinkModalOpen(false);
    setLinkModalUrl('');
    setLinkModalText('');
    savedSelectionRange.current = null;
    showToast(`Đã chèn liên kết "${text}" thành công!`, 'success');
  };

  // Insert Image from Library / URL
  const handleInsertImage = (imgUrl: string, captionText: string = '') => {
    if (!imgUrl.trim()) return;
    if (editorRef.current) {
      editorRef.current.focus();
      const figureHtml = `
        <figure class="my-6 text-center">
          <img src="${imgUrl}" alt="${captionText || title}" class="max-w-md w-full mx-auto rounded-xl shadow-xs border border-stone-200" />
          ${captionText ? `<figcaption class="text-xs text-stone-500 mt-2 italic font-medium">${captionText}</figcaption>` : ''}
        </figure>
        <p><br/></p>
      `;
      document.execCommand('insertHTML', false, figureHtml);
    }
    setIsImagePickerOpen(false);
    setCustomImageUrl('');
    setImageCaption('');
    showToast('Đã chèn ảnh vào bài viết!');
  };

  // Insert Table
  const handleInsertTable = () => {
    if (!editorRef.current) return;
    let tableHtml = '<table class="w-full border-collapse my-6 border border-stone-300"><tbody>';
    for (let r = 0; r < tableRows; r++) {
      tableHtml += '<tr>';
      for (let c = 0; c < tableCols; c++) {
        if (r === 0) {
          tableHtml += `<th class="border border-stone-300 bg-stone-100 p-2.5 font-bold text-left">Tiêu đề ${c + 1}</th>`;
        } else {
          tableHtml += `<td class="border border-stone-300 p-2.5">Nội dung ${r}-${c + 1}</td>`;
        }
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table><p><br/></p>';
    editorRef.current.focus();
    document.execCommand('insertHTML', false, tableHtml);
    setIsTableModalOpen(false);
    showToast('Đã chèn bảng vào bài viết!');
  };

  // Insert Callout Box (Mẹo hay / Chú thích)
  const handleInsertCallout = () => {
    if (!editorRef.current) return;
    const calloutHtml = `
      <div class="my-6 p-4 rounded-xl bg-orange-50 border-l-4 border-orange-500 text-stone-800">
        <strong class="text-orange-950 font-bold block mb-1">💡 Mẹo nấu ngon từ Bếp Trưởng:</strong>
        <p class="text-sm">Nhập lời khuyên hoặc bí quyết nhà bếp bổ ích cho bạn đọc tại đây...</p>
      </div>
      <p><br/></p>
    `;
    editorRef.current.focus();
    document.execCommand('insertHTML', false, calloutHtml);
    showToast('Đã thêm hộp chú thích!');
  };

  // Save Post to Server & Local Storage
  const handleSavePost = async () => {
    if (!title.trim()) {
      showToast('Vui lòng nhập tiêu đề bài viết!', 'error');
      return;
    }

    const cleanSlug = slug.trim() ? generateSlug(slug) : generateSlug(title);
    if (!cleanSlug) {
      showToast('Vui lòng nhập đường dẫn (slug) hợp lệ!', 'error');
      return;
    }

    setSaving(true);

    // Get current HTML from editor and convert to clean markdown
    const currentHtml = editorRef.current?.innerHTML || '';
    const rawMarkdown = htmlToMarkdown(currentHtml);
    const markdownContent = autoFormatLinksAndReferences(rawMarkdown, posts);

    const postPayload: BlogPost = {
      id: editingPostId || cleanSlug,
      slug: cleanSlug,
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      coverImage: coverImage.trim() || '/images/an-gi-cho-do-ngan.jpg',
      category: category || 'Gợi Ý Thực Đơn',
      tags: (typeof tags === 'string' ? tags : '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      author: {
        name: authorName.trim() || 'Bếp Trưởng Hôm Nay Ăn Gì',
        role: authorRole.trim() || 'Chuyên gia Ẩm thực & Dinh dưỡng',
        avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&auto=format&fit=crop&q=80',
      },
      publishDate: publishDate.trim() || new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      readTime: readTime.trim() || '6 phút đọc',
      featured: !!featured,
      content: markdownContent,
    };

    let cloudSaved = false;
    try {
      await savePostToFirestore(postPayload);
      cloudSaved = true;
    } catch (fbErr) {
      console.warn('Firestore save warning:', fbErr);
    }

    let serverSaved = false;
    let serverErrorMsg = '';

    try {
      // 1. Send to server API
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postPayload),
      });

      const resData = await res.json().catch(() => null);

      if (res.ok && resData?.success) {
        serverSaved = true;
      } else {
        serverErrorMsg = resData?.message || `Lỗi máy chủ (${res.status})`;
      }
    } catch (apiErr: any) {
      serverErrorMsg = apiErr?.message || 'Không thể kết nối máy chủ';
    }

    // 2. Also save to localStorage immediately for instant client responsiveness
    try {
      const existingCustomStr = localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS);
      let customList: BlogPost[] = existingCustomStr ? JSON.parse(existingCustomStr) : [];
      const idx = customList.findIndex((p) => p.slug === cleanSlug || p.id === postPayload.id);
      if (idx >= 0) {
        customList[idx] = postPayload;
      } else {
        customList.unshift(postPayload);
      }
      localStorage.setItem(LOCAL_STORAGE_CUSTOM_POSTS, JSON.stringify(customList));

      if (typeof window !== 'undefined') {
        (window as any).__INITIAL_CUSTOM_POSTS__ = customList;
      }

      // Add to KNOWN_BLOG_SLUGS so route is immediately recognized
      const { KNOWN_BLOG_SLUGS } = await import('../data/blogSlugs');
      KNOWN_BLOG_SLUGS.add(cleanSlug);
      if (postPayload.id) KNOWN_BLOG_SLUGS.add(postPayload.id);
    } catch (storageErr) {
      console.warn('LocalStorage error:', storageErr);
    }

    // Dispatch global events so the public website and all components update immediately
    window.dispatchEvent(new Event('custom-posts-updated'));
    window.dispatchEvent(new Event('locationchange'));

    // Reload posts
    await loadPosts();

    setSaving(false);

    if (cloudSaved) {
      showToast(`Đã lưu bài viết lên Đám Mây (Firestore) thành công! Tất cả các máy tính và điện thoại khác đều xem được ngay tại /${cleanSlug}`, 'success');
    } else if (serverSaved) {
      showToast(`Đã lưu bài viết thành công! Website đã được cập nhật tại /${cleanSlug}`, 'success');
    } else {
      const is404OrStatic = serverErrorMsg.includes('404') || serverErrorMsg.includes('Failed to fetch');
      if (is404OrStatic) {
        showToast(
          `Đã lưu bài viết vào bộ nhớ trình duyệt! (Chế độ web tĩnh / Vercel: Bạn có thể nhấn nút "Mục Lưu Data" để tải file JSON)`,
          'warning'
        );
      } else {
        showToast(`Đã lưu bài viết vào bộ nhớ trình duyệt! (${serverErrorMsg})`, 'warning');
      }
    }

    // Update current post ID
    setEditingPostId(postPayload.id);
    setSlug(cleanSlug);
  };

  // Delete Post
  const handleDeletePost = async (post: BlogPost) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${post.title}"?`)) return;

    try {
      try {
        await deletePostFromFirestore(post.slug || post.id);
      } catch (e) {
        console.warn('Firestore delete error:', e);
      }

      await fetch(`/api/admin/posts/${post.slug || post.id}`, {
        method: 'DELETE',
      });

      // Update local storage
      const existing = localStorage.getItem(LOCAL_STORAGE_CUSTOM_POSTS);
      if (existing) {
        const list: BlogPost[] = JSON.parse(existing);
        const filtered = list.filter((p) => p.slug !== post.slug && p.id !== post.id);
        localStorage.setItem(LOCAL_STORAGE_CUSTOM_POSTS, JSON.stringify(filtered));
        window.dispatchEvent(new Event('custom-posts-updated'));
        window.dispatchEvent(new Event('locationchange'));
      }

      await loadPosts();
      showToast('Đã xóa bài viết thành công!', 'success');
    } catch {
      showToast('Lỗi khi xóa bài viết!', 'error');
    }
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory === 'Tất Cả' || p.category === filterCategory;
    return matchQuery && matchCategory;
  });

  // Check if user is authenticated before rendering admin dashboard
  if (!adminSession) {
    return (
      <AdminLogin
        onLoginSuccess={(session) => {
          setAdminSession(session);
          showToast(`Đăng nhập thành công! Chào mừng ${session.name || session.email}.`, 'success');
        }}
        onBackToHome={() => {
          if (onNavigate) {
            onNavigate('tarot');
          } else {
            window.location.href = '/';
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border text-sm font-semibold ${
              toastMessage.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : toastMessage.type === 'warning'
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-rose-600 text-white border-rose-500'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-stone-900 text-white shadow-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (viewMode === 'editor' || viewMode === 'inbox') {
                  setViewMode('list');
                } else if (onNavigate) {
                  onNavigate('blog');
                } else {
                  window.location.href = '/blog';
                }
              }}
              className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{viewMode === 'editor' || viewMode === 'inbox' ? 'Danh Sách' : 'Xem Blog'}</span>
            </button>

            <div className="h-4 w-px bg-stone-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="font-extrabold text-sm sm:text-base tracking-wide text-white flex items-center gap-1.5">
                <span>Hôm Nay Ăn Gì</span>
                <span className="text-stone-300 font-normal text-xs bg-stone-800 border border-stone-700 px-2 py-0.5 rounded-md hidden md:inline">
                  Quản Trị Hệ Thống
                </span>
              </h1>
            </div>

            {/* Main Navigation Tabs: Bài Viết Blog & Hộp Thư Góp Ý */}
            <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-xl border border-stone-700 ml-2">
              <button
                type="button"
                onClick={() => {
                  setViewMode('list');
                  const url = new URL(window.location.href);
                  url.searchParams.delete('tab');
                  window.history.replaceState({ tab: 'admin' }, '', url.pathname);
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode !== 'inbox'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Bài Viết</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode('inbox');
                  const url = new URL(window.location.href);
                  url.searchParams.set('tab', 'inbox');
                  window.history.replaceState({ tab: 'admin' }, '', `${url.pathname}?tab=inbox`);
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer relative ${
                  viewMode === 'inbox'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white hover:bg-stone-700/60'
                }`}
                title="Hộp thư góp ý & liên hệ từ người dùng"
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Hộp Thư</span>
                {unreadMessagesCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full animate-pulse ml-0.5">
                    {unreadMessagesCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {viewMode === 'inbox' ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold py-2 px-3 sm:px-3.5 rounded-lg border border-stone-700 shadow-sm transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-orange-400" />
                  <span>Về Bài Viết</span>
                </button>
              </div>
            ) : viewMode === 'list' ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDataModalOpen(true)}
                  className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold py-2 px-3 sm:px-3.5 rounded-lg border border-stone-700 shadow-sm transition-colors cursor-pointer"
                  title="Mục lưu dữ liệu & sao lưu bài viết"
                >
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Mục Lưu Data</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenNewPost}
                  className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold py-2 px-3.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Viết Bài Mới</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDataModalOpen(true)}
                  className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold py-2 px-3 rounded-lg border border-stone-700 shadow-sm transition-colors cursor-pointer"
                  title="Mục lưu dữ liệu & xuất file cho máy chủ khác"
                >
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Mục Lưu Data</span>
                </button>
                {(() => {
                  const targetSlug = (slug.trim() ? generateSlug(slug) : (title.trim() ? generateSlug(title) : editingPostId || '')).replace(/^\//, '');
                  return (
                    <a
                      href={targetSlug ? `/${targetSlug}` : '/blog'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 py-2 px-3 rounded-lg border border-stone-700 transition-colors"
                      title={targetSlug ? `Xem bài viết tại /${targetSlug}` : 'Xem danh sách blog trên web'}
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Xem Trên Web</span>
                    </a>
                  );
                })()}
                <button
                  onClick={handleSavePost}
                  disabled={saving}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-xs sm:text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-colors"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{saving ? 'Đang Lưu...' : 'Đăng / Lưu Bài'}</span>
                </button>
              </div>
            )}

            {/* Admin User Badge & Logout Button */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-stone-800">
              <div
                className="hidden xl:flex items-center gap-1.5 text-xs text-stone-300 bg-stone-800/90 px-2.5 py-1.5 rounded-lg border border-stone-700/60 max-w-[150px] truncate"
                title={adminSession.email}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="truncate">{adminSession.email.split('@')[0]}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs text-stone-300 hover:text-rose-200 bg-stone-800 hover:bg-rose-950/80 py-2 px-2.5 sm:px-3 rounded-lg border border-stone-700 hover:border-rose-800 transition-colors cursor-pointer"
                title="Đăng xuất khỏi trang quản trị"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline font-semibold">Đăng Xuất</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {viewMode === 'inbox' ? (
          /* ================= INBOX VIEW ================= */
          <div className="py-2">
            <AdminInboxView embedded={true} onClose={() => setViewMode('list')} />
          </div>
        ) : viewMode === 'list' ? (
          /* ================= POST LIST VIEW ================= */
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Tổng bài viết</div>
                <div className="text-2xl font-black text-stone-900 mt-1">{posts.length}</div>
              </div>
              <div
                onClick={() => {
                  setViewMode('inbox');
                  const url = new URL(window.location.href);
                  url.searchParams.set('tab', 'inbox');
                  window.history.replaceState({ tab: 'admin' }, '', `${url.pathname}?tab=inbox`);
                }}
                className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs cursor-pointer hover:border-orange-300 hover:shadow-sm transition-all group"
                title="Bấm để mở Hộp Thư Góp Ý"
              >
                <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                  <span>Hộp thư góp ý</span>
                  <Inbox className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-black text-orange-600 mt-1 flex items-baseline gap-1.5">
                  <span>{unreadMessagesCount}</span>
                  <span className="text-xs font-semibold text-stone-400">tin chưa đọc</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Bài nổi bật</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">
                  {posts.filter((p) => p.featured).length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Trạng thái hệ thống</div>
                <div className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Đồng bộ thời gian thực
                </div>
              </div>
            </div>

            {/* Mục Lưu Data & Quản Lý Dữ Liệu (Data Storage & Backup Center) */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-extrabold text-stone-900 text-sm sm:text-base">
                        Mục Lưu Data & Quản Lý Dữ Liệu Bài Viết
                      </h2>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Lưu an toàn 2 lớp (Server & Trình duyệt)
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      Dữ liệu bài viết được lưu trữ trực tiếp trên file máy chủ (<code className="font-mono text-[11px] text-stone-800 bg-stone-100 px-1 py-0.5 rounded">public/custom_blog_posts.json</code>) và tự động đồng bộ sitemap Google. Bạn có thể sao lưu, tải file JSON về máy tính hoặc khôi phục bất cứ khi nào.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <input
                    type="file"
                    ref={fileImportRef}
                    onChange={handleImportData}
                    accept=".json,application/json"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={handleExportData}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                    title="Tải toàn bộ bài viết về máy tính dạng file JSON để lưu trữ dự phòng"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Lưu & Tải Data Về Máy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileImportRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 text-xs font-bold transition-colors cursor-pointer"
                    title="Khôi phục bài viết từ file JSON đã lưu trước đây"
                  >
                    <Upload className="w-3.5 h-3.5 text-stone-600" />
                    <span>Khôi Phục Data (Import)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSyncAllData}
                    disabled={syncingServer}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                    title="Lưu và đồng bộ dữ liệu ngay lập tức lên file máy chủ"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncingServer ? 'animate-spin' : ''}`} />
                    <span>{syncingServer ? 'Đang Lưu...' : 'Lưu Lên Server'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Controls: Search & Category */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tiêu đề, slug, tác giả..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                {['Tất Cả', ...BLOG_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold shrink-0 transition-colors ${
                      filterCategory === cat
                        ? 'bg-orange-600 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
                <h2 className="font-extrabold text-stone-900 text-sm sm:text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span>Danh Sách Bài Viết ({filteredPosts.length})</span>
                </h2>
                <button
                  onClick={loadPosts}
                  className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 font-medium"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Tải lại</span>
                </button>
              </div>

              <div className="divide-y divide-stone-100">
                {filteredPosts.length === 0 ? (
                  <div className="py-12 text-center text-stone-400 text-sm">
                    Không tìm thấy bài viết nào phù hợp.
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div
                      key={post.id || post.slug}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <img
                          src={post.coverImage || '/images/an-gi-cho-do-ngan.jpg'}
                          alt={post.title}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-stone-200 bg-stone-100"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                              {post.category}
                            </span>
                            {post.featured && (
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Nổi bật
                              </span>
                            )}
                            <span className="text-xs text-stone-400">
                              {post.publishDate} • {post.readTime}
                            </span>
                          </div>

                          <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug truncate">
                            {post.title}
                          </h3>

                          <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-500 font-mono">
                            <span className="text-stone-400">/{post.slug}</span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`https://angigio.com/${post.slug}`);
                                showToast('Đã sao chép link!');
                              }}
                              className="text-stone-400 hover:text-stone-700"
                              title="Sao chép link"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <a
                          href={`/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                          title="Xem trên web"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleEditPost(post)}
                          className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Chỉnh Sửa</span>
                        </button>

                        <button
                          onClick={() => handleDeletePost(post)}
                          className="p-2 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Xóa bài viết"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ================= WORDPRESS VISUAL EDITOR VIEW ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Main Document Editor */}
            <div className={isFullscreen ? "fixed inset-0 z-50 bg-stone-100 overflow-y-auto p-4 sm:p-6 space-y-4" : "lg:col-span-8 space-y-4"}>
              {/* STICKY TOP CONTROLS: Title, Slug, Tab Switcher & Word Ribbon Toolbar */}
              <div className={`sticky ${isFullscreen ? 'top-0' : 'top-16'} z-30 bg-white rounded-2xl border border-stone-200/90 shadow-md transition-all`}>
                {/* 1. Title & Permalink */}
                <div className="p-3.5 sm:p-4.5 space-y-2.5">
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề bài viết tại đây..."
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingPostId) {
                        setSlug(generateSlug(e.target.value));
                      }
                    }}
                    className="w-full text-lg sm:text-2xl font-black text-stone-900 placeholder-stone-300 border-none outline-none focus:ring-0 leading-tight"
                  />

                  {/* Permalink */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-stone-50 p-2 sm:p-2.5 rounded-xl border border-stone-200/80">
                    <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="font-semibold text-stone-600">Đường dẫn:</span>
                    <span className="text-stone-400 font-mono">https://angigio.com/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(generateSlug(e.target.value))}
                      className="font-mono font-bold text-orange-700 bg-white border border-stone-300 px-2 py-0.5 rounded text-xs flex-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="duong-dan-bai-viet"
                    />
                  </div>
                </div>

                {/* 2. Sub Tabs (Trực quan vs Xem trước) */}
                <div className="px-3.5 py-2 bg-stone-50/80 border-t border-b border-stone-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditorSubTab('visual')}
                      className={`text-xs font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
                        editorSubTab === 'visual'
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      Trực Quan (Word / WordPress)
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorSubTab('preview')}
                      className={`text-xs font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer ${
                        editorSubTab === 'preview'
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      Xem Trước Thực Tế
                    </button>
                  </div>

                  <span className="text-xs text-stone-400 hidden sm:inline">
                    Hỗ trợ định dạng Rich-Text & tự động tối ưu hóa SEO
                  </span>
                </div>

                {/* 3. Sticky Ribbon Toolbar */}
                {editorSubTab === 'visual' && (
                  <div className="bg-stone-50/90 rounded-b-2xl p-2 sm:p-2.5 flex flex-wrap items-center gap-1.5 text-stone-700 text-xs">
                    {/* Format Block (Headings) */}
                    <select
                      value={currentBlockFormat}
                      onChange={(e) => handleFormatBlockChange(e.target.value)}
                      className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-2xs cursor-pointer"
                      title="Định dạng đoạn văn & tiêu đề (tự động nhận diện theo vị trí con trỏ)"
                    >
                      <option value="p">Đoạn văn (Normal)</option>
                      <option value="h1">Tiêu đề lớn (H1)</option>
                      <option value="h2">Tiêu đề mục (H2)</option>
                      <option value="h3">Tiêu đề phụ (H3)</option>
                      <option value="h4">Tiêu đề nhỏ (H4)</option>
                      <option value="blockquote">Trích dẫn (Quote)</option>
                      <option value="pre">Định dạng mã (Pre)</option>
                    </select>

                    {/* Font Size */}
                    <select
                      value={currentFontSize}
                      onChange={(e) => handleApplyFontSize(e.target.value)}
                      className="bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-2xs cursor-pointer"
                      title="Cỡ chữ (tự động đồng bộ theo loại tiêu đề hoặc tùy chỉnh)"
                    >
                      <option value="2">Nhỏ (13px)</option>
                      <option value="3">Chuẩn (16px)</option>
                      <option value="4">Vừa (18px - H3)</option>
                      <option value="5">Lớn (24px - H2)</option>
                      <option value="6">Rất lớn (32px - H1)</option>
                      <option value="7">Cực lớn (36px)</option>
                    </select>

                    <div className="h-4 w-px bg-stone-300 mx-0.5" />

                    {/* Bold, Italic, Underline, Strikethrough, RemoveFormat */}
                    <button
                      type="button"
                      onClick={() => execCmd('bold')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 font-bold transition-colors"
                      title="In đậm (Ctrl+B)"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('italic')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 italic transition-colors"
                      title="In nghiêng (Ctrl+I)"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('underline')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 underline transition-colors"
                      title="Gạch chân (Ctrl+U)"
                    >
                      <Underline className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('strikeThrough')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Gạch ngang"
                    >
                      <Strikethrough className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveFormat}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-600 transition-colors"
                      title="Xóa định dạng vùng chọn"
                    >
                      <RemoveFormatting className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-4 w-px bg-stone-300 mx-0.5" />

                    {/* Text Color Picker */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsTextColorPickerOpen(!isTextColorPickerOpen);
                          setIsBgColorPickerOpen(false);
                        }}
                        className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 flex items-center gap-0.5 transition-colors"
                        title="Màu chữ"
                      >
                        <Palette className="w-3.5 h-3.5 text-stone-700" />
                        <span className="w-2 h-1 bg-orange-600 rounded-full inline-block" />
                      </button>
                      {isTextColorPickerOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-xl p-2 z-40 w-44 grid grid-cols-4 gap-1.5 animate-fadeIn">
                          {TEXT_COLORS.map((c) => (
                            <button
                              key={c.value}
                              type="button"
                              onClick={() => handleApplyTextColor(c.value)}
                              className="w-7 h-7 rounded-lg border border-stone-200 hover:scale-110 transition-transform shadow-2xs flex items-center justify-center cursor-pointer"
                              style={{ backgroundColor: c.value }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Background Highlight Color Picker */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsBgColorPickerOpen(!isBgColorPickerOpen);
                          setIsTextColorPickerOpen(false);
                        }}
                        className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 flex items-center gap-0.5 transition-colors"
                        title="Màu nền / Đánh dấu văn bản"
                      >
                        <Highlighter className="w-3.5 h-3.5 text-amber-600" />
                        <span className="w-2 h-1 bg-amber-400 rounded-full inline-block" />
                      </button>
                      {isBgColorPickerOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-stone-200 rounded-xl shadow-xl p-2 z-40 w-44 grid grid-cols-4 gap-1.5 animate-fadeIn">
                          {HIGHLIGHT_COLORS.map((c) => (
                            <button
                              key={c.value}
                              type="button"
                              onClick={() => handleApplyBgColor(c.value)}
                              className="w-7 h-7 rounded-lg border border-stone-300 hover:scale-110 transition-transform shadow-2xs flex items-center justify-center text-[10px] font-bold text-stone-600 cursor-pointer"
                              style={{ backgroundColor: c.value === 'transparent' ? '#ffffff' : c.value }}
                              title={c.name}
                            >
                              {c.value === 'transparent' ? '✕' : ''}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="h-4 w-px bg-stone-300 mx-0.5" />

                    {/* Alignment */}
                    <button
                      type="button"
                      onClick={() => execCmd('justifyLeft')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Căn trái"
                    >
                      <AlignLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('justifyCenter')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Căn giữa"
                    >
                      <AlignCenter className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('justifyRight')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Căn phải"
                    >
                      <AlignRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('justifyFull')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Căn đều hai bên"
                    >
                      <AlignJustify className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-4 w-px bg-stone-300 mx-0.5" />

                    {/* Lists & Indentation */}
                    <button
                      type="button"
                      onClick={() => execCmd('insertUnorderedList')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Danh sách dấu chấm"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('insertOrderedList')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Danh sách số thứ tự"
                    >
                      <ListOrdered className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('indent')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Tăng thụt lề"
                    >
                      <Indent className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('outdent')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Giảm thụt lề"
                    >
                      <Outdent className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-4 w-px bg-stone-300 mx-0.5" />

                    {/* Links */}
                    <button
                      type="button"
                      onClick={handleOpenLinkModal}
                      className="p-1.5 rounded-md hover:bg-orange-100 text-orange-700 flex items-center gap-1 font-bold transition-colors cursor-pointer"
                      title="Chèn liên kết (Bôi đen chữ hoặc chèn mới)"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Chèn Link</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleToolbarUnlink}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-600 transition-colors"
                      title="Gỡ liên kết khỏi vùng chọn"
                    >
                      <Unlink className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-4 w-px bg-stone-300 mx-0.5" />

                    {/* Media & Inserts */}
                    <button
                      type="button"
                      onClick={() => setIsImagePickerOpen(true)}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 flex items-center gap-1 font-medium transition-colors"
                      title="Chèn hình ảnh từ thư viện"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-stone-600" />
                      <span className="hidden sm:inline">Ảnh</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsTableModalOpen(true)}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 flex items-center gap-1 font-medium transition-colors"
                      title="Chèn bảng dữ liệu"
                    >
                      <TableIcon className="w-3.5 h-3.5 text-stone-600" />
                      <span className="hidden sm:inline">Bảng</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleInsertCallout}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 flex items-center gap-1 font-medium transition-colors"
                      title="Thêm hộp mẹo hay"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span className="hidden sm:inline">Mẹo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('insertHorizontalRule')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Đường phân cách ngang"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <div className="h-4 w-px bg-stone-300 mx-0.5" />

                    {/* Undo / Redo */}
                    <button
                      type="button"
                      onClick={() => execCmd('undo')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Hoàn tác (Ctrl+Z)"
                    >
                      <Undo className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => execCmd('redo')}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors"
                      title="Làm lại (Ctrl+Y)"
                    >
                      <Redo className="w-3.5 h-3.5" />
                    </button>

                    {/* Fullscreen Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 rounded-md hover:bg-stone-200 text-stone-800 transition-colors ml-auto cursor-pointer"
                      title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình không phân tâm'}
                    >
                      {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>

              {/* The Visual WYSIWYG Document Sheet */}
              <div
                className={`bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden relative transition-all ${
                  editorSubTab === 'visual' ? 'block' : 'hidden'
                }`}
              >
                {/* Document Page Canvas Styled Like Microsoft Word / WordPress Sheet */}
                <div className="p-4 sm:p-8 bg-stone-100/80 min-h-[680px] relative">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-stone-200/90 p-8 sm:p-14 min-h-[600px] relative">
                      <div
                        ref={editorRef}
                        contentEditable
                        onClick={handleEditorClick}
                        onInput={() => {
                          updateCounts();
                          detectCurrentBlockFormat();
                        }}
                        onKeyUp={() => {
                          updateCounts();
                          detectCurrentBlockFormat();
                        }}
                        onMouseUp={detectCurrentBlockFormat}
                        className="prose prose-stone max-w-none focus:outline-none min-h-[500px] text-stone-800 leading-relaxed text-[16px] blog-editor-canvas"
                        style={{
                          wordBreak: 'break-word',
                        }}
                      />

                      {/* Floating Interactive Link Toolbar (Anchored directly to clicked link) */}
                      {floatingLink && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute z-30 bg-stone-900 text-white rounded-xl shadow-2xl p-2.5 flex items-center gap-2 border border-stone-700 animate-fadeIn text-xs"
                          style={{
                            top: `${floatingLink.top}px`,
                            left: `${floatingLink.left}px`,
                          }}
                        >
                          {isEditingLinkInline ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={editingLinkUrl}
                                onChange={(e) => setEditingLinkUrl(e.target.value)}
                                className="bg-stone-800 border border-stone-600 rounded px-2.5 py-1 text-white text-xs w-60 focus:outline-none focus:border-orange-500 font-mono"
                                placeholder="https://... hoặc /duong-dan"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={handleSaveFloatingLinkUrl}
                                className="bg-orange-600 hover:bg-orange-500 text-white px-2.5 py-1 rounded-md font-bold text-xs cursor-pointer shadow-xs"
                              >
                                Lưu URL
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsEditingLinkInline(false)}
                                className="text-stone-400 hover:text-white px-1.5 py-1 text-xs cursor-pointer"
                              >
                                Hủy
                              </button>
                            </div>
                          ) : isEditingLinkText ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={editingLinkTextVal}
                                onChange={(e) => setEditingLinkTextVal(e.target.value)}
                                className="bg-stone-800 border border-stone-600 rounded px-2.5 py-1 text-white text-xs w-60 focus:outline-none focus:border-orange-500"
                                placeholder="Đổi chữ hiển thị của liên kết..."
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={handleSaveFloatingLinkText}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-md font-bold text-xs cursor-pointer shadow-xs"
                              >
                                Đổi chữ
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsEditingLinkText(false)}
                                className="text-stone-400 hover:text-white px-1.5 py-1 text-xs cursor-pointer"
                              >
                                Hủy
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-1.5 max-w-[170px] sm:max-w-[220px] truncate">
                                <LinkIcon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                                <span className="font-mono text-stone-200 text-[11px] truncate">
                                  {floatingLink.url}
                                </span>
                              </div>

                              <div className="h-4 w-px bg-stone-700 mx-0.5" />

                              <a
                                href={floatingLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-white transition-colors"
                                title="Mở liên kết trong tab mới"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>

                              {/* Edit URL */}
                              <button
                                type="button"
                                onClick={() => {
                                  setIsEditingLinkInline(true);
                                  setIsEditingLinkText(false);
                                }}
                                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-orange-400 transition-colors"
                                title="Sửa địa chỉ URL"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit Anchor Text */}
                              <button
                                type="button"
                                onClick={() => {
                                  setIsEditingLinkText(true);
                                  setIsEditingLinkInline(false);
                                  setEditingLinkTextVal(floatingLink.targetEl.textContent || '');
                                }}
                                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-1 text-[11px] font-medium"
                                title="Đổi chữ hiển thị của link (Ví dụ: đổi từ link thô sang tên bài viết)"
                              >
                                <Type className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Sửa chữ</span>
                              </button>

                              {/* Add space if stuck */}
                              <button
                                type="button"
                                onClick={handleAddSpaceAfterFloatingLink}
                                className="p-1.5 rounded-lg hover:bg-stone-800 text-amber-300 hover:text-amber-200 transition-colors text-[11px] font-medium"
                                title="Thêm dấu cách sau liên kết nếu bị dính liền chữ"
                              >
                                <span>Tách cách</span>
                              </button>

                              {/* UNLINK BUTTON */}
                              <button
                                type="button"
                                onClick={handleRemoveFloatingLink}
                                className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white px-2 py-1 rounded-lg font-bold text-[11px] transition-colors cursor-pointer shadow-xs ml-0.5"
                                title="Gỡ bỏ liên kết (giữ nguyên chữ)"
                              >
                                <Unlink className="w-3.5 h-3.5" />
                                <span>Gỡ link</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setFloatingLink(null)}
                                className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white cursor-pointer ml-0.5"
                                title="Đóng thanh công cụ liên kết"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Bar at the bottom like Word & WordPress */}
                  <div className="bg-stone-50 border-t border-stone-200 px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-stone-500">
                    <div className="flex items-center gap-3">
                      <span><strong>{editorWordCount}</strong> từ</span>
                      <span>•</span>
                      <span><strong>{editorCharCount}</strong> ký tự</span>
                      <span>•</span>
                      <span>Ước tính: ~{Math.max(1, Math.ceil(editorWordCount / 200))} phút đọc</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-400">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Trình soạn thảo trực quan (WYSIWYG Word / WordPress)</span>
                    </div>
                  </div>
                </div>

              {/* Live Preview Mode */}
              {editorSubTab === 'preview' && (
                <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs space-y-6">
                  <div className="border-b border-stone-200 pb-6">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-orange-100 text-orange-800">
                      {category}
                    </span>
                    <h1 className="text-3xl font-extrabold text-stone-900 mt-3 leading-snug">
                      {title || 'Tiêu đề bài viết chưa có'}
                    </h1>
                    <div className="text-xs text-stone-500 mt-2">
                      {authorName} • {publishDate} • {readTime}
                    </div>
                  </div>

                  {coverImage && (
                    <img
                      src={coverImage}
                      alt={title}
                      className="w-full max-h-[420px] object-cover rounded-2xl border border-stone-200"
                    />
                  )}

                  <div
                    className="prose prose-stone max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: editorRef.current ? editorRef.current.innerHTML : '',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right 4 Cols: WordPress Document Settings Sidebar (Sticky & Fixed) */}
            <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1.5 pb-10 overscroll-contain">
              {/* Google SERP SEO Preview */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  <span>Xem Trước Kết Quả Google (SEO)</span>
                </h3>

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="text-[11px] text-stone-500 flex items-center gap-1">
                    <span className="font-bold text-stone-700">angigio.com</span>
                    <span>›</span>
                    <span className="font-mono text-stone-500 truncate">/{slug || 'bai-viet'}</span>
                  </div>
                  <div className="text-blue-700 font-bold text-sm hover:underline cursor-pointer leading-snug">
                    {title ? `${title} | Hôm Nay Ăn Gì` : 'Tiêu Đề Bài Viết Chuẩn SEO'}
                  </div>
                  <div className="text-stone-600 line-clamp-2 text-[12px] leading-relaxed">
                    {excerpt || 'Tóm tắt bài viết hấp dẫn, chứa từ khóa chính giúp tăng tỷ lệ nhấp chuột CTR từ công cụ tìm kiếm Google...'}
                  </div>
                </div>

                {/* Excerpt Meta Description input */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mô tả tóm tắt (Meta Description):
                  </label>
                  <textarea
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Tóm tắt ngắn gọn 140 - 160 ký tự..."
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 leading-relaxed"
                  />
                  <div className="text-[11px] text-stone-400 text-right mt-0.5">
                    {excerpt.length}/160 ký tự
                  </div>
                </div>
              </div>

              {/* Chuyên mục (Category) */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-orange-600" />
                  <span>Chuyên Mục</span>
                </h3>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs font-bold p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Thẻ (Tags) */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-orange-600" />
                  <span>Thẻ Tag (Phân cách bằng dấu phẩy)</span>
                </h3>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Món ngon, Nấu ăn, Mẹo hay"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <div className="flex flex-wrap gap-1 mt-1">
                  {tags
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t, idx) => (
                      <span key={idx} className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 rounded text-stone-600">
                        #{t}
                      </span>
                    ))}
                </div>
              </div>

              {/* Ảnh đại diện (Cover Image) */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-orange-600" />
                  <span>Ảnh Đại Diện (Cover Image)</span>
                </h3>

                {coverImage && (
                  <div className="relative rounded-xl overflow-hidden border border-stone-200 aspect-video bg-stone-100">
                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="/images/an-gi-cho-do-ngan.jpg"
                    className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg font-mono focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIsImagePickerOpen(true)}
                    className="text-xs font-bold px-2.5 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 shrink-0"
                  >
                    Chọn ảnh
                  </button>
                </div>
              </div>

              {/* Tác giả & Cài đặt bổ sung */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <h3 className="font-extrabold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-stone-600" />
                  <span>Tác Giả & Xuất Bản</span>
                </h3>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] text-stone-500 font-medium">Tên tác giả:</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-500 font-medium">Thời gian đọc:</label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-stone-500 font-medium">Ngày hiển thị:</label>
                    <input
                      type="text"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none"
                    />
                  </div>

                  <label className="flex items-center gap-2 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                    />
                    <span className="text-xs font-bold text-stone-800">Đặt làm bài viết nổi bật (Featured)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: CHÈN LIÊN KẾT ================= */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <span>Chèn Liên Kết Mới (Anchor Link)</span>
              </h3>
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Selection Guidance Tip */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 leading-relaxed">
                <p className="font-bold">Mẹo chèn liên kết đẹp & chuẩn SEO:</p>
                <p className="text-amber-800">
                  {linkModalText ? (
                    <span>
                      Đang gán liên kết cho chữ đã chọn:{' '}
                      <strong className="text-orange-700 bg-white px-1.5 py-0.5 rounded border border-amber-200">
                        "{linkModalText}"
                      </strong>
                    </span>
                  ) : (
                    <span>
                      Bạn có thể bôi đen chữ trong bài trước khi bấm <strong>"Chèn Link"</strong>, hoặc điền từ khóa vào ô <strong>"Văn bản hiển thị"</strong> bên dưới để tránh bị dán cả đường link thô.
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* URL Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Địa chỉ URL liên kết:
                </label>
                <input
                  type="text"
                  placeholder="https://angigio.com/cach-nau-pho-ga-ta-la-chanh hoặc /cach-nau-pho-ga-ta-la-chanh"
                  value={linkModalUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    setLinkModalUrl(val);
                    if (!linkModalText.trim() && val.trim()) {
                      const slugCandidate = val.trim().split('/').filter(Boolean).pop()?.toLowerCase();
                      const matched = posts.find((p) => p.slug?.toLowerCase() === slugCandidate);
                      if (matched) {
                        setLinkModalText(matched.title);
                      } else if (slugCandidate && slugCandidate.length > 2 && !slugCandidate.includes('.')) {
                        setLinkModalText(
                          slugCandidate.replace(/[-_]/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
                        );
                      }
                    }
                  }}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono"
                  autoFocus
                />
              </div>

              {/* Anchor Text Input */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Văn bản hiển thị (Anchor text):
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: cách nấu phở gà ta lá chanh"
                  value={linkModalText}
                  onChange={(e) => setLinkModalText(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Đây là từ ngữ người đọc nhìn thấy và bấm vào trên trang web.
                </p>
              </div>

              {/* Quick Select Internal Posts */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-orange-600" />
                    <span>Gợi ý bài viết nội bộ (SEO Internal Links):</span>
                  </span>
                  <span className="text-[11px] font-normal text-stone-400">Bấm 1 chạm để tự điền</span>
                </div>

                <div className="max-h-36 overflow-y-auto space-y-1 border border-stone-200 rounded-xl p-1.5 bg-stone-50/50">
                  {posts
                    .filter((p) => p.slug !== slug)
                    .slice(0, 6)
                    .map((p) => {
                      const isSelected = linkModalUrl.includes(p.slug);
                      return (
                        <button
                          key={p.slug}
                          type="button"
                          onClick={() => {
                            setLinkModalUrl(`https://angigio.com/${p.slug}`);
                            if (!linkModalText.trim()) {
                              setLinkModalText(p.title);
                            }
                          }}
                          className={`w-full text-left p-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-orange-100 text-orange-950 font-bold border border-orange-300'
                              : 'hover:bg-white text-stone-700 hover:text-stone-900 border border-transparent'
                          }`}
                        >
                          <img
                            src={p.coverImage || '/images/an-gi-cho-do-ngan.jpg'}
                            alt=""
                            className="w-7 h-7 rounded-md object-cover border border-stone-200 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold truncate leading-tight">{p.title}</div>
                            <div className="text-[10px] text-stone-400 font-mono truncate">/{p.slug}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-orange-600 shrink-0" />}
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Preview */}
              {(linkModalText || linkModalUrl) && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-600 flex items-center justify-between">
                  <span className="text-stone-400 text-[11px]">Xem trước liên kết:</span>
                  <span className="truncate max-w-[280px]">
                    <span className="text-orange-600 underline font-semibold">
                      {linkModalText || linkModalUrl}
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-xs px-3.5 py-2 rounded-lg text-stone-600 hover:bg-stone-100"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertLink}
                className="text-xs px-4 py-2 rounded-lg font-bold bg-orange-600 hover:bg-orange-500 text-white cursor-pointer shadow-xs"
              >
                Chèn Liên Kết
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CHỌN / CHÈN ẢNH ================= */}
      {isImagePickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-orange-600" />
                <span>Thư Viện Ảnh Món Ăn Chuẩn SEO</span>
              </h3>
              <button onClick={() => setIsImagePickerOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 flex-1 pr-1">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Chọn ảnh mẫu có sẵn (Đã tối ưu 50-60KB chuẩn SEO):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRESET_FOOD_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => {
                        setCoverImage(img.url);
                        handleInsertImage(img.url, img.name);
                      }}
                      className="group flex flex-col items-center p-2 rounded-xl border border-stone-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all text-left"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full aspect-square object-cover rounded-lg mb-1.5 group-hover:scale-105 transition-transform"
                      />
                      <span className="text-[11px] font-bold text-stone-700 group-hover:text-orange-700 line-clamp-1 w-full text-center">
                        {img.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-100 pt-3 space-y-2">
                <label className="block text-xs font-bold text-stone-700">Hoặc nhập URL hình ảnh tùy chỉnh:</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Chú thích ảnh (Caption)..."
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsImagePickerOpen(false)}
                className="text-xs px-3.5 py-2 rounded-lg text-stone-600 hover:bg-stone-100"
              >
                Hủy
              </button>
              {customImageUrl && (
                <button
                  type="button"
                  onClick={() => handleInsertImage(customImageUrl, imageCaption)}
                  className="text-xs px-4 py-2 rounded-lg font-bold bg-orange-600 hover:bg-orange-500 text-white"
                >
                  Chèn Ảnh Này
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CHÈN BẢNG ================= */}
      {isTableModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-1.5">
                <TableIcon className="w-4 h-4 text-orange-600" />
                <span>Chèn Bảng Dữ Liệu</span>
              </h3>
              <button onClick={() => setIsTableModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Số dòng:</label>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={tableRows}
                  onChange={(e) => setTableRows(parseInt(e.target.value) || 2)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Số cột:</label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={tableCols}
                  onChange={(e) => setTableCols(parseInt(e.target.value) || 2)}
                  className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsTableModalOpen(false)}
                className="text-xs px-3 py-1.5 rounded-lg text-stone-600"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleInsertTable}
                className="text-xs px-4 py-2 rounded-lg font-bold bg-orange-600 hover:bg-orange-500 text-white"
              >
                Tạo Bảng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: MỤC LƯU DATA & SAO LƯU BÀI VIẾT ================= */}
      {isDataModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-stone-900 text-base sm:text-lg">
                    Mục Lưu Data & Quản Lý Dữ Liệu
                  </h3>
                  <p className="text-xs text-stone-500">
                    Bảo toàn bài viết và đồng bộ máy chủ an toàn 100%
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDataModalOpen(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Information Status Card */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Tổng bài viết trong hệ thống:</span>
                <span className="font-bold text-stone-900">{posts.length} bài</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Lưu trữ máy chủ:</span>
                <span className="font-mono text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  public/custom_blog_posts.json
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Lưu trữ trình duyệt:</span>
                <span className="text-stone-700 font-bold">LocalStorage (Đang kích hoạt)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 font-medium">Sitemap Google:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Tự động thêm link khi lưu
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Option 1: Direct File for Other Web Servers */}
              <button
                type="button"
                onClick={handleExportServerJson}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <FileJson className="w-5 h-5 shrink-0" />
                  <div className="text-left">
                    <div>Tải File Chuẩn Cho Máy Chủ Khác (custom_blog_posts.json)</div>
                    <div className="text-[11px] font-normal text-amber-100">
                      Đặt file này vào thư mục public của Vercel, VPS, Nginx, Hosting để máy chủ đó xem được ngay
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-amber-700 px-2.5 py-1 rounded-lg shrink-0">Tải JSON</span>
              </button>

              {/* Option 2: Copy JSON to Clipboard */}
              <button
                type="button"
                onClick={handleCopyJsonToClipboard}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm border border-stone-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {copiedDataJson ? <Check className="w-5 h-5 text-emerald-600 shrink-0" /> : <Copy className="w-5 h-5 text-stone-600 shrink-0" />}
                  <div className="text-left">
                    <div>{copiedDataJson ? 'Đã Sao Chép Vào Bộ Nhớ Đệm!' : 'Sao Chép Mã JSON Bài Viết (Clipboard)'}</div>
                    <div className="text-[11px] font-normal text-stone-500">
                      Dán trực tiếp vào file custom_blog_posts.json trên bất kỳ máy chủ nào
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-stone-200 text-stone-700 px-2.5 py-1 rounded-lg shrink-0">
                  {copiedDataJson ? 'Đã chép' : 'Sao chép'}
                </span>
              </button>

              {/* Option 3: Full Backup */}
              <button
                type="button"
                onClick={handleExportData}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 shrink-0" />
                  <div className="text-left">
                    <div>Lưu Bản Sao Lưu Đầy Đủ (Full Backup JSON)</div>
                    <div className="text-[11px] font-normal text-emerald-100">
                      Tải file sao lưu chứa toàn bộ lịch sử và bài viết để cất giữ an toàn
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-emerald-700 px-2.5 py-1 rounded-lg shrink-0">Tải backup</span>
              </button>

              {/* Option 4: Import File */}
              <button
                type="button"
                onClick={() => {
                  fileImportRef.current?.click();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm border border-stone-200 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-stone-600 shrink-0" />
                  <div className="text-left">
                    <div>Khôi Phục / Nhập Bài Viết Từ File JSON (Import)</div>
                    <div className="text-[11px] font-normal text-stone-500">
                      Nạp danh sách bài viết từ file .json vào hệ thống máy chủ hiện tại
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-stone-200 text-stone-700 px-2.5 py-1 rounded-lg shrink-0">Chọn file</span>
              </button>

              {/* Option 5: Sync with Remote Server URL */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <Globe className="w-4 h-4 text-orange-600" />
                  <span>Kéo bài viết từ máy chủ web khác qua URL:</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://may-chu-khac.com"
                    value={remoteServerUrl}
                    onChange={(e) => setRemoteServerUrl(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleSyncFromRemoteUrl}
                    disabled={syncingRemote}
                    className="px-3.5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold shrink-0 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {syncingRemote ? 'Đang kéo...' : 'Đồng bộ'}
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">
                  Nhập địa chỉ máy chủ khác để lấy toàn bộ bài viết đã đăng về máy chủ này tự động.
                </p>
              </div>

              {/* Option 6: Push/Sync to Local Server */}
              <button
                type="button"
                onClick={handleSyncAllData}
                disabled={syncingServer}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className={`w-5 h-5 shrink-0 ${syncingServer ? 'animate-spin text-orange-400' : 'text-stone-300'}`} />
                  <div className="text-left">
                    <div>{syncingServer ? 'Đang Gửi Lên Máy Chủ...' : 'Lưu & Cập Nhật File Trên Máy Chủ Này'}</div>
                    <div className="text-[11px] font-normal text-stone-400">
                      Ghi đè file public/custom_blog_posts.json ngay lập tức
                    </div>
                  </div>
                </div>
                <span className="text-xs bg-stone-800 text-stone-300 px-2.5 py-1 rounded-lg shrink-0">Lưu Server</span>
              </button>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsDataModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
