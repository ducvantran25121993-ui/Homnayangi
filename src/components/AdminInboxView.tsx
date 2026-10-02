import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  Phone,
  Calendar,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  Reply,
  Shield,
  KeyRound,
  Download,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Lock,
  LogOut,
  Save,
  RefreshCw,
  Send,
  User,
  Inbox,
  Filter,
} from 'lucide-react';
import { ContactMessage } from '../types';
import {
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
  getAdminPin,
  setAdminPin,
  DEFAULT_ADMIN_PIN,
} from '../utils/contactStorage';

interface AdminInboxViewProps {
  embedded?: boolean;
  onClose?: () => void;
}

const SESSION_AUTH_KEY = 'angigio_admin_inbox_auth';

export const AdminInboxView: React.FC<AdminInboxViewProps> = ({ embedded = false, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (embedded) return true; // Đã xác thực qua mật khẩu trang quản trị tổng 'conlaumoinoi'
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [adminNote, setAdminNote] = useState('');
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState('');
  const [saveNoteSuccess, setSaveNoteSuccess] = useState(false);

  // Reload messages from storage
  const reloadMessages = () => {
    const list = getContactMessages();
    setMessages(list);
    if (selectedMessage) {
      const refreshed = list.find((m) => m.id === selectedMessage.id);
      setSelectedMessage(refreshed || null);
      if (refreshed) setAdminNote(refreshed.notes || '');
    }
  };

  useEffect(() => {
    reloadMessages();
  }, []);

  useEffect(() => {
    const handleUpdate = () => reloadMessages();
    window.addEventListener('angigio_messages_updated', handleUpdate);
    window.addEventListener('angigio_new_message', handleUpdate);
    return () => {
      window.removeEventListener('angigio_messages_updated', handleUpdate);
      window.removeEventListener('angigio_new_message', handleUpdate);
    };
  }, [selectedMessage]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getAdminPin();
    if (pinInput.trim() === correctPin) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      }
      setPinError('');
      setPinInput('');
      reloadMessages();
    } else {
      setPinError('Mã PIN không chính xác. Vui lòng thử lại.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
    }
    setSelectedMessage(null);
  };

  const handleSelectMessage = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setAdminNote(msg.notes || '');
    if (msg.status === 'unread') {
      updateMessageStatus(msg.id, 'read');
    }
  };

  const handleStatusChange = (id: string, newStatus: ContactMessage['status']) => {
    updateMessageStatus(id, newStatus, adminNote);
  };

  const handleSaveNotes = () => {
    if (!selectedMessage) return;
    updateMessageStatus(selectedMessage.id, selectedMessage.status, adminNote);
    setSaveNoteSuccess(true);
    setTimeout(() => setSaveNoteSuccess(false), 2500);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn tin nhắn này không?')) {
      deleteContactMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      setPinError('Mã PIN mới phải từ 4 ký tự trở lên!');
      return;
    }
    const success = setAdminPin(newPin);
    if (success) {
      setPinChangeSuccess('Đã đổi mã PIN quản trị thành công!');
      setNewPin('');
      setTimeout(() => {
        setPinChangeSuccess('');
        setIsChangingPin(false);
      }, 2000);
    }
  };

  // Export CSV with UTF-8 BOM
  const handleExportCsv = () => {
    if (messages.length === 0) return;
    const headers = ['ID', 'Thời gian', 'Họ tên', 'Email', 'SĐT', 'Chủ đề', 'Trạng thái', 'Nội dung', 'Ghi chú nội bộ'];
    const rows = messages.map((m) => [
      m.id,
      new Date(m.createdAt).toLocaleString('vi-VN'),
      `"${m.fullName.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${(m.phone || '').replace(/"/g, '""')}"`,
      `"${m.subject.replace(/"/g, '""')}"`,
      m.status === 'unread' ? 'Chưa xử lý' : m.status === 'read' ? 'Đã xem' : 'Đã phản hồi',
      `"${m.message.replace(/"/g, '""')}"`,
      `"${(m.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `danh_sach_hop_thu_homnayangi_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchStatus = statusFilter === 'all' || m.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        m.fullName.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.phone && m.phone.includes(q)) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [messages, statusFilter, searchQuery]);

  const unreadCount = messages.filter((m) => m.status === 'unread').length;
  const readCount = messages.filter((m) => m.status === 'read').length;
  const repliedCount = messages.filter((m) => m.status === 'replied').length;

  return (
    <div className={`flex flex-col ${embedded ? 'w-full space-y-6' : 'h-full'}`}>
      {/* Overview Stats Bar (When inside Admin Page) */}
      {embedded && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-medium">Tổng thư nhận được</div>
            <div className="text-2xl font-black text-stone-900 mt-1 flex items-center gap-2">
              <span>{messages.length}</span>
              <Inbox className="w-5 h-5 text-stone-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-medium">Thư mới chưa đọc</div>
            <div className="text-2xl font-black text-red-600 mt-1 flex items-center gap-2">
              <span>{unreadCount}</span>
              {unreadCount > 0 && <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />}
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-medium">Đang xử lý / Đã đọc</div>
            <div className="text-2xl font-black text-blue-600 mt-1">{readCount}</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div className="text-xs text-stone-500 font-medium">Đã phản hồi khách</div>
            <div className="text-2xl font-black text-emerald-600 mt-1 flex items-center gap-2">
              <span>{repliedCount}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col min-h-[640px] md:h-[720px]">
        {/* Header Bar */}
        <header className="px-5 sm:px-6 py-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3 bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-stone-900">
                  Hộp Thư Liên Hệ (Khách Gửi)
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-bold animate-pulse">
                    {unreadCount} mới
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">
                Tiếp nhận & xử lý tin nhắn, góp ý món ăn và liên hệ hợp tác từ trang Liên Hệ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={reloadMessages}
                  title="Tải lại danh sách thư"
                  className="p-2 rounded-xl text-stone-600 hover:bg-stone-200/60 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleExportCsv}
                  title="Xuất danh sách thư ra file Excel/CSV"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 shadow-2xs transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-500" />
                  <span className="hidden sm:inline">Xuất CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsChangingPin(!isChangingPin)}
                  title="Cài đặt mã PIN quản trị"
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isChangingPin
                      ? 'bg-amber-100 text-amber-800'
                      : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Khóa hộp thư (Đăng xuất)"
                  className="p-2 rounded-xl text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:bg-stone-200/60 hover:text-stone-700 transition-colors cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>
        </header>

        {/* Change PIN Bar */}
        {isAuthenticated && isChangingPin && (
          <div className="p-3 bg-amber-50 border-b border-amber-200/80 px-6 flex items-center justify-between text-xs">
            <form onSubmit={handleSaveNewPin} className="flex flex-wrap items-center gap-3 w-full max-w-lg">
              <span className="font-bold text-amber-900 shrink-0">Đổi mã PIN mới:</span>
              <input
                type="password"
                maxLength={32}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Nhập mã PIN mới (tối thiểu 4 số)"
                className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs w-48"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors cursor-pointer"
              >
                Lưu PIN
              </button>
              <button
                type="button"
                onClick={() => setIsChangingPin(false)}
                className="text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                Hủy
              </button>
              {pinChangeSuccess && <span className="text-emerald-700 font-bold">{pinChangeSuccess}</span>}
              {pinError && <span className="text-red-600 font-bold">{pinError}</span>}
            </form>
          </div>
        )}

        {/* Body Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-stone-50/40">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200 shadow-sm text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-stone-900 mb-1">
                Mở Khóa Hộp Thư Quản Trị
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Nhập mã PIN quản trị viên để xem toàn bộ danh sách liên hệ và thông tin khách hàng gửi.
              </p>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Mã PIN bảo mật (Mặc định: 1234)
                  </label>
                  <input
                    type="password"
                    autoFocus
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (pinError) setPinError('');
                    }}
                    placeholder="••••"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-center tracking-widest text-lg font-mono placeholder:tracking-widest"
                  />
                  {pinError && (
                    <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{pinError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  Mở Khóa Xem Hộp Thư
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* 2-Pane Inbox View */
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-0">
            {/* Left Column: Message Search & List */}
            <div className={`md:col-span-5 border-r border-stone-100 flex flex-col h-full bg-white ${selectedMessage ? 'hidden md:flex' : 'flex'}`}>
              {/* Search & Filter Bar */}
              <div className="p-3.5 border-b border-stone-100 space-y-2.5 bg-stone-50/50">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên, email, sđt, nội dung..."
                    className="w-full pl-9 pr-3.5 py-1.5 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Status Chips */}
                <div className="flex items-center gap-1.5 text-[11px] overflow-x-auto pb-0.5">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === 'all'
                        ? 'bg-stone-900 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Tất cả ({messages.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('unread')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === 'unread'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Mới ({unreadCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('read')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === 'read'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Đang xem ({readCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('replied')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      statusFilter === 'replied'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Đã trả lời ({repliedCount})
                  </button>
                </div>
              </div>

              {/* Message Items Scroll List */}
              <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-400">
                    {messages.length === 0
                      ? 'Hộp thư hiện chưa có tin nhắn nào từ người dùng.'
                      : 'Không tìm thấy tin nhắn nào phù hợp với bộ lọc.'}
                  </div>
                ) : (
                  filteredMessages.map((msg) => {
                    const isSelected = selectedMessage?.id === msg.id;
                    const dateFormatted = new Date(msg.createdAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <div
                        key={msg.id}
                        onClick={() => handleSelectMessage(msg)}
                        className={`p-3.5 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-orange-50/70 border-l-4 border-orange-600'
                            : msg.status === 'unread'
                            ? 'bg-amber-50/40 hover:bg-stone-50 font-medium'
                            : 'hover:bg-stone-50 text-stone-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs ${
                              msg.status === 'unread' ? 'font-bold text-stone-900' : 'text-stone-800'
                            }`}
                          >
                            {msg.fullName}
                          </span>
                          <span className="text-[10px] text-stone-400">{dateFormatted}</span>
                        </div>

                        <div className="text-xs font-semibold text-stone-700 truncate mb-1">
                          {msg.subject}
                        </div>

                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                          {msg.message}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              msg.status === 'unread'
                                ? 'bg-red-100 text-red-700'
                                : msg.status === 'read'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {msg.status === 'unread' ? 'Mới' : msg.status === 'read' ? 'Đã xem' : 'Đã phản hồi'}
                          </span>

                          <span className="text-[11px] text-stone-400 truncate max-w-[140px]">
                            {msg.email}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Message Detail & Response Actions */}
            <div className={`md:col-span-7 flex-col h-full bg-stone-50/30 overflow-y-auto ${selectedMessage ? 'flex' : 'hidden md:flex'}`}>
              {selectedMessage ? (
                <div className="p-5 sm:p-6 space-y-5">
                  {/* Mobile Back Button to list */}
                  <div className="md:hidden pb-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMessage(null)}
                      className="text-xs text-orange-600 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      &larr; Quay lại danh sách thư
                    </button>
                  </div>

                  {/* Header & Sender Meta */}
                  <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 block mb-1">
                          {selectedMessage.subject}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-stone-400" />
                          <span>{selectedMessage.fullName}</span>
                        </h3>
                        <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            Gửi lúc {new Date(selectedMessage.createdAt).toLocaleString('vi-VN')}
                          </span>
                        </p>
                      </div>

                      {/* Status Selector & Delete */}
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={selectedMessage.status}
                          onChange={(e) =>
                            handleStatusChange(selectedMessage.id, e.target.value as ContactMessage['status'])
                          }
                          className="text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-2xs"
                        >
                          <option value="unread">Chưa xử lý (Mới)</option>
                          <option value="read">Đang xem (Đã đọc)</option>
                          <option value="replied">Đã phản hồi khách</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDelete(selectedMessage.id)}
                          title="Xóa tin nhắn này"
                          className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Quick Contact Links */}
                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center gap-3 text-xs">
                      {selectedMessage.email ? (
                        <a
                          href={`mailto:${selectedMessage.email}?subject=Phản hồi từ Hôm Nay Ăn Gì: ${encodeURIComponent(
                            selectedMessage.subject
                          )}`}
                          className="inline-flex items-center gap-1.5 text-orange-600 hover:underline font-semibold"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{selectedMessage.email}</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-stone-400 text-xs">
                          <Mail className="w-3.5 h-3.5" />
                          <span>(Khách không để lại email)</span>
                        </span>
                      )}

                      {selectedMessage.phone && (
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${selectedMessage.phone}`}
                            className="inline-flex items-center gap-1.5 text-emerald-600 hover:underline font-semibold"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{selectedMessage.phone}</span>
                          </a>
                          <a
                            href={`https://zalo.me/${selectedMessage.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-[11px] font-bold inline-flex items-center gap-1"
                          >
                            <span>Chat Zalo</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Nội dung thư của khách
                    </h4>
                    <div className="text-xs sm:text-sm text-stone-800 whitespace-pre-wrap leading-relaxed bg-stone-50/60 p-4 rounded-xl border border-stone-100">
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Admin Notes & Quick Response */}
                  <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                        <span>Ghi chú nội bộ cho quản trị viên</span>
                      </h4>
                      <div className="flex items-center gap-2">
                        {saveNoteSuccess && (
                          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Đã lưu
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={handleSaveNotes}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          <Save className="w-3 h-3" />
                          <span>Lưu ghi chú</span>
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      placeholder="Ghi chú nội bộ: Đã gọi điện lúc 14h, khách cần tư vấn gói quảng cáo / báo giá..."
                      className="w-full p-3 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500 resize-none"
                    />

                    {/* Quick Response Mail Button */}
                    <div className="pt-2 flex items-center justify-end">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Phản hồi từ Hôm Nay Ăn Gì: ${encodeURIComponent(
                          selectedMessage.subject
                        )}&body=Chào bạn ${encodeURIComponent(selectedMessage.fullName)},%0D%0A%0D%0ACảm ơn bạn đã liên hệ với Hôm Nay Ăn Gì (angigio.com).`}
                        onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span>Gửi Email Trả Lời Khách</span>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400">
                  <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-3">
                    <Mail className="w-7 h-7 text-stone-300" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-700 mb-1">
                    Chưa chọn tin nhắn nào
                  </h4>
                  <p className="text-xs max-w-xs text-stone-500 leading-relaxed">
                    Chọn một tin nhắn ở danh sách bên trái để đọc nội dung chi tiết, gọi điện, nhắn tin Zalo hoặc gửi email phản hồi.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
