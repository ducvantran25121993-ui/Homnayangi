import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
  MessageCircle,
  Send,
  QrCode,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SocialPlatform {
  id: string;
  name: string;
  category: string;
  color: string;
  bgLight: string;
  textColor: string;
  borderColor: string;
  icon: React.ReactNode;
  getUrl: (url: string, title: string, text: string) => string;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Mạng xã hội',
    color: '#1877F2',
    bgLight: 'hover:bg-blue-50',
    textColor: 'text-[#1877F2]',
    borderColor: 'hover:border-blue-300',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    getUrl: (url, title) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  {
    id: 'messenger',
    name: 'Messenger',
    category: 'Nhắn tin',
    color: '#00B2FF',
    bgLight: 'hover:bg-sky-50',
    textColor: 'text-[#0084FF]',
    borderColor: 'hover:border-sky-300',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.093.303 2.252.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.73 8.35l3.125 3.259 5.892-3.26-6.556 6.614z" />
      </svg>
    ),
    getUrl: (url) =>
      `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}`,
  },
  {
    id: 'zalo',
    name: 'Zalo',
    category: 'Mạng xã hội VN',
    color: '#0068FF',
    bgLight: 'hover:bg-blue-50',
    textColor: 'text-[#0068FF]',
    borderColor: 'hover:border-blue-300',
    icon: (
      <span className="w-5 h-5 flex items-center justify-center font-black text-xs font-sans border-2 border-current rounded-md leading-none">
        Z
      </span>
    ),
    getUrl: (url) => `https://zalo.me/share?url=${encodeURIComponent(url)}`,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'Nhắn tin',
    color: '#229ED9',
    bgLight: 'hover:bg-sky-50',
    textColor: 'text-[#229ED9]',
    borderColor: 'hover:border-sky-300',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    getUrl: (url, title, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title}\n${text}`)}`,
  },
  {
    id: 'x_twitter',
    name: 'X (Twitter)',
    category: 'Mạng xã hội',
    color: '#000000',
    bgLight: 'hover:bg-stone-100',
    textColor: 'text-stone-900',
    borderColor: 'hover:border-stone-400',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'Nhắn tin',
    color: '#25D366',
    bgLight: 'hover:bg-emerald-50',
    textColor: 'text-[#25D366]',
    borderColor: 'hover:border-emerald-300',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.677.15-.2.3-.777.98-.952 1.18-.175.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.494-.894-.799-1.498-1.787-1.674-2.088-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.235-.244-.587-.492-.507-.677-.517-.175-.009-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.124 3.243 5.144 4.549.718.311 1.279.497 1.716.636.723.23 1.38.198 1.901.12.58-.087 1.782-.728 2.032-1.431.25-.703.25-1.305.175-1.431-.075-.126-.276-.201-.577-.351zm-5.467 7.618a9.92 9.92 0 0 1-5.061-1.391l-.363-.216-3.763.987 1.004-3.669-.236-.376a9.924 9.924 0 0 1-1.521-5.26c0-5.495 4.47-9.965 9.967-9.965 2.663 0 5.166 1.037 7.045 2.918a9.919 9.919 0 0 1 2.915 7.049c0 5.496-4.471 9.963-9.967 9.963z" />
      </svg>
    ),
    getUrl: (url, title) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
];

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title = 'Hôm Nay Ăn Gì? • Khám Phá Món Ngon Chuẩn Vị',
  text = 'Rút quẻ Tarot ẩm thực, quay vòng may mắn và tìm món ngon 3 miền cực đỉnh!',
  url,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://homnayangi.vn');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleOpenSocial = (platform: SocialPlatform) => {
    const targetUrl = platform.getUrl(shareUrl, title, text);
    if (typeof window !== 'undefined') {
      window.open(targetUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
    }
  };

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    shareUrl
  )}&bgcolor=ffffff&color=1c1917&margin=2`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200/80 overflow-hidden text-stone-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-100 bg-gradient-to-r from-stone-50 via-white to-orange-50/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-stone-900 leading-tight">
                  Chia Sẻ Cùng Bạn Bè
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Chọn mạng xã hội để rủ bạn bè cùng ăn
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Social Grid */}
          <div className="p-5 sm:p-6 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
                Chia sẻ qua mạng xã hội
              </span>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handleOpenSocial(platform)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border border-stone-200/80 transition-all duration-200 cursor-pointer ${platform.bgLight} ${platform.borderColor} hover:shadow-xs group`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110 ${platform.textColor}`}
                      style={{ backgroundColor: `${platform.color}15` }}
                    >
                      {platform.icon}
                    </div>
                    <span className="text-xs font-bold text-stone-800 tracking-tight">
                      {platform.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Copy Link Bar */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Hoặc sao chép đường dẫn
              </span>
              <div className="flex items-center gap-2 p-1.5 pl-3.5 rounded-2xl border border-stone-200 bg-stone-50">
                <span className="text-xs text-stone-600 truncate flex-1 font-mono">
                  {shareUrl}
                </span>
                <button
                  onClick={handleCopyLink}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-900 hover:bg-black text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Toggle QR Code View */}
            <div className="pt-2 border-t border-stone-100 flex flex-col items-center">
              <button
                onClick={() => setShowQR(!showQR)}
                className="text-xs font-semibold text-stone-600 hover:text-orange-600 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{showQR ? 'Ẩn mã QR' : 'Hiện mã QR để quét trên điện thoại'}</span>
              </button>

              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 flex flex-col items-center p-3 rounded-2xl bg-stone-50 border border-stone-200"
                >
                  <img
                    src={qrImageUrl}
                    alt="Mã QR liên kết Hôm Nay Ăn Gì"
                    className="w-40 h-40 rounded-xl bg-white p-2 border border-stone-200"
                  />
                  <span className="text-[11px] text-stone-500 mt-2 text-center">
                    Mở camera điện thoại quét mã để vào ngay
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
