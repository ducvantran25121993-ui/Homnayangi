import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { BlogPost } from './data/blogPosts';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: The app will break without firebaseConfig.firestoreDatabaseId */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot per Firebase skill guidelines
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection: client appears offline, using cached or fallback storage.');
    }
  }
}
if (typeof window !== 'undefined') {
  testConnection();
}

/**
 * Save / Update a post in Cloud Firestore
 */
export async function savePostToFirestore(post: BlogPost): Promise<void> {
  const docId = (post.slug || post.id).toLowerCase().replace(/[^a-zA-Z0-9_\-]/g, '-').slice(0, 120);
  const path = `posts/${docId}`;
  
  const payload = {
    id: post.id || docId,
    slug: post.slug || docId,
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    coverImage: post.coverImage || '',
    category: post.category || 'Gợi Ý Thực Đơn',
    tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
    authorName: post.author?.name || 'Bếp Trưởng Hôm Nay Ăn Gì',
    authorRole: post.author?.role || 'Bếp Trưởng & Chuyên Gia Ẩm Thực',
    authorAvatar: post.author?.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=160&auto=format&fit=crop&q=80',
    publishDate: post.publishDate || new Date().toLocaleDateString('vi-VN'),
    readTime: post.readTime || '5 phút đọc',
    featured: Boolean(post.featured),
    updatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'posts', docId), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Get all posts from Cloud Firestore
 */
export async function getPostsFromFirestore(): Promise<BlogPost[]> {
  const path = 'posts';
  try {
    const snapshot = await getDocs(collection(db, path));
    const posts: BlogPost[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      posts.push({
        id: data.id || d.id,
        slug: data.slug || d.id,
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
        category: (data.category as BlogPost['category']) || 'Gợi Ý Thực Đơn',
        tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : (data.tags || []),
        author: {
          name: data.authorName || 'Bếp Trưởng Hôm Nay Ăn Gì',
          role: data.authorRole || 'Bếp Trưởng & Chuyên Gia Ẩm Thực',
          avatar: data.authorAvatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=160&auto=format&fit=crop&q=80',
        },
        publishDate: data.publishDate || '',
        readTime: data.readTime || '5 phút đọc',
        featured: Boolean(data.featured),
      });
    });
    return posts;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

/**
 * Delete a post from Cloud Firestore
 */
export async function deletePostFromFirestore(postIdOrSlug: string): Promise<void> {
  const clean = String(postIdOrSlug).toLowerCase().trim().replace(/^\//, '').replace(/\/$/, '');
  const docId = clean.replace(/[^a-zA-Z0-9_\-]/g, '-').slice(0, 120);
  const path = `posts/${docId}`;
  try {
    await deleteDoc(doc(db, 'posts', docId));
    if (clean !== docId) {
      await deleteDoc(doc(db, 'posts', clean)).catch(() => {});
    }
  } catch (error) {
    console.warn('Firestore delete error for path', path, error);
    try {
      handleFirestoreError(error, OperationType.DELETE, path);
    } catch {}
  }
}

/**
 * Authentication Helpers for Admin
 */
export const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export { onAuthStateChanged };
export type { User };

