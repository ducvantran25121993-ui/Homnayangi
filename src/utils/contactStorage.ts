import { ContactMessage } from '../types';

const STORAGE_KEY = 'angigio_contact_messages_v2';
const ADMIN_PIN_KEY = 'angigio_admin_pin_v2';
export const DEFAULT_ADMIN_PIN = 'Conlaumoinoi';

export function getContactMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    // Check v2 key first
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Check legacy key and migrate ONLY real messages (exclude seed messages)
      const legacyRaw = localStorage.getItem('angigio_contact_messages_v1');
      if (legacyRaw) {
        try {
          const parsed: ContactMessage[] = JSON.parse(legacyRaw);
          const realMessages = Array.isArray(parsed)
            ? parsed.filter((m) => m && !m.id?.startsWith('msg_seed_'))
            : [];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(realMessages));
          localStorage.removeItem('angigio_contact_messages_v1');
          return realMessages;
        } catch {
          // ignore
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter out any lingering seed messages
    const cleaned = parsed.filter((m) => m && !m.id?.startsWith('msg_seed_'));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch (error) {
    console.error('Failed to load contact messages:', error);
    return [];
  }
}

export function saveContactMessage(messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
  const current = getContactMessages();
  const newMessage: ContactMessage = {
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    ...messageData,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };

  const updated = [newMessage, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom event for real-time reactivity in the inbox
    window.dispatchEvent(new CustomEvent('angigio_new_message', { detail: newMessage }));
  } catch (error) {
    console.error('Failed to save message:', error);
  }
  return newMessage;
}

export function updateMessageStatus(id: string, status: ContactMessage['status'], notes?: string): void {
  const current = getContactMessages();
  const updated = current.map((msg) =>
    msg.id === id ? { ...msg, status, notes: notes !== undefined ? notes : msg.notes } : msg
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('angigio_messages_updated'));
  } catch (error) {
    console.error('Failed to update message:', error);
  }
}

export function deleteContactMessage(id: string): void {
  const current = getContactMessages();
  const updated = current.filter((msg) => msg.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('angigio_messages_updated'));
  } catch (error) {
    console.error('Failed to delete message:', error);
  }
}

export function getAdminPin(): string {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_PIN;
  try {
    return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_ADMIN_PIN;
  } catch {
    return DEFAULT_ADMIN_PIN;
  }
}

export function setAdminPin(newPin: string): boolean {
  if (!newPin || newPin.trim().length < 4) return false;
  try {
    localStorage.setItem(ADMIN_PIN_KEY, newPin.trim());
    return true;
  } catch {
    return false;
  }
}
