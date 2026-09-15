import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
  Trash2,
  CheckCircle,
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

interface AdminInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminInboxModal: React.FC<AdminInboxModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  // Reload messages
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
    if (isOpen) {
      reloadMessages();
    }
  }, [isOpen]);

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
      setPinError('');
      setPinInput('');
      reloadMessages();
    } else {
      setPinError('Mã PIN không chính xác. Vui lòng thử lại.');
    }
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
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này không?')) {
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

  // Export JSON / CSV
  const handleExportCsv = () => {
    if (messages.length === 0) return;
    const headers = ['ID', 'Thời gian', 'Họ tên', 'Email', 'SĐT', 'Chủ đề', 'Trạng thái', 'Nội dung', 'Ghi chú'];
    const rows = messages.map((m) => [
      m.id,
      new Date(m.createdAt).toLocaleString('vi-VN'),
      `"${m.fullName.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${(m.phone || '').replace(/"/g, '""')}"`,
      `"${m.subject.replace(/"/g, '""')}"`,
      m.status,
      `"${m.message.replace(/"/g, '""')}"`,
      `"${(m.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `danh_sach_khach_lien_he_${new Date().toISOString().split('T')[0]}.csv`);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-5xl h-[90vh] max-h-[750px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <header className="px-5 sm:px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-stone-900">
                  Hòm Thư Quản Trị (Admin Inbox)
                </h2>
                {isAuthenticated && unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[11px] font-bold">
                    {unreadCount} mới
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">
                Tiếp nhận & quản lý thông tin khách gửi từ trang Liên Hệ (Angigio.com)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={handleExportCsv}
                  title="Xuất file Excel/CSV"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-white hover:border-stone-300 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-stone-500" />
                  <span>Xuất CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsChangingPin(!isChangingPin)}
                  title="Cài đặt mã PIN"
                  className="p-2 rounded-xl text-stone-500 hover:bg-stone-200/60 hover:text-stone-800 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  title="Đăng xuất"
                  className="p-2 rounded-xl text-stone-500 hover:bg-stone-200/60 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:bg-stone-200/60 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Change PIN Banner */}
        {isAuthenticated && isChangingPin && (
          <div className="p-3 bg-amber-50 border-b border-amber-200/80 px-6 flex items-center justify-between text-xs">
            <form onSubmit={handleSaveNewPin} className="flex items-center gap-3 w-full max-w-md">
              <span className="font-bold text-amber-900 shrink-0">Đổi mã PIN mới:</span>
              <input
                type="password"
                maxLength={32}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Nhập mã PIN mới"
                className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-orange-500 text-xs w-36"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 transition-colors cursor-pointer"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={() => setIsChangingPin(false)}
                className="text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                Hủy
              </button>
              {pinChangeSuccess && <span className="text-emerald-700 font-bold">{pinChangeSuccess}</span>}
            </form>
          </div>
        )}

        {/* Main Content: Either PIN Login OR Two-pane Inbox */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-stone-50/40">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200 shadow-md text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-stone-900 mb-1">
                Xác Thực Quản Trị Viên
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Vui lòng nhập mã PIN quản trị để truy cập hòm thư khách hàng gửi.
              </p>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Mã PIN bảo mật
                  </label>
                  <input
                    type="password"
                    autoFocus
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
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
                  Mở Hòm Thư Đến
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Left Pane: Search + Message List (5 cols) */}
            <div className="md:col-span-5 border-r border-stone-100 flex flex-col h-full bg-white">
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
                <div className="flex items-center gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
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
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
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
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      statusFilter === 'read'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Đang xem
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('replied')}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                      statusFilter === 'replied'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Đã trả lời
                  </button>
                </div>
              </div>

              {/* Message Items Scroll List */}
              <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-400">
                    {messages.length === 0
                      ? 'Hòm thư hiện chưa có tin nhắn nào từ người dùng.'
                      : 'Không tìm thấy tin nhắn nào phù hợp bộ lọc.'}
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
                            ? 'bg-amber-50/30 hover:bg-stone-50 font-medium'
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
                            {msg.status === 'unread' ? 'Mới' : msg.status === 'read' ? 'Đã đọc' : 'Đã phản hồi'}
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

            {/* Right Pane: Message Detail & Action (7 cols) */}
            <div className="md:col-span-7 flex flex-col h-full bg-stone-50/30 overflow-y-auto">
              {selectedMessage ? (
                <div className="p-5 sm:p-6 space-y-6">
                  {/* Subject & Actions */}
                  <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 block mb-1">
                          {selectedMessage.subject}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-stone-900">
                          {selectedMessage.fullName}
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            Gửi lúc {new Date(selectedMessage.createdAt).toLocaleString('vi-VN')}
                          </span>
                        </p>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-1.5">
                        <select
                          value={selectedMessage.status}
                          onChange={(e) =>
                            handleStatusChange(selectedMessage.id, e.target.value as ContactMessage['status'])
                          }
                          className="text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
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

                    {/* Quick Contacts */}
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
                            Mở Zalo
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      Nội dung tin nhắn
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Admin Internal Note & Quick Reply */}
                  <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                        <span>Ghi chú nội bộ quản trị</span>
                      </h4>
                      <button
                        type="button"
                        onClick={handleSaveNotes}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        <span>Lưu ghi chú</span>
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      placeholder="Ví dụ: Đã gọi điện tư vấn lúc 14h, khách đồng ý hợp tác gói banner..."
                      className="w-full p-3 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500 resize-none"
                    />

                    {/* Quick Reply Button to open default mail client */}
                    <div className="pt-2 flex items-center justify-end">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Phản hồi từ Hôm Nay Ăn Gì: ${encodeURIComponent(
                          selectedMessage.subject
                        )}&body=Chào bạn ${encodeURIComponent(selectedMessage.fullName)},%0D%0A%0D%0ACảm ơn bạn đã liên hệ với Hôm Nay Ăn Gì.`}
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
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mb-3">
                    <Mail className="w-6 h-6 text-stone-300" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-600 mb-1">
                    Chưa chọn tin nhắn nào
                  </h4>
                  <p className="text-xs max-w-xs">
                    Bấm vào một tin nhắn ở danh sách bên trái để xem nội dung chi tiết và phản hồi khách hàng.
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
