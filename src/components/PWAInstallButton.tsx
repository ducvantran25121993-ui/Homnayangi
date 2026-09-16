import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Download, X, Smartphone, Monitor, Share, ExternalLink, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallButton: React.FC<{
  className?: string;
  variant?: 'nav' | 'navbar' | 'footer' | 'pill';
}> = ({ className = '', variant = 'navbar' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'ios' | 'android' | 'desktop'>('android');

  useEffect(() => {
    // Check standalone
    const isRunningStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    setIsStandalone(isRunningStandalone);

    // Check iframe
    try {
      setIsInIframe(window.self !== window.top);
    } catch {
      setIsInIframe(true);
    }

    // Auto-detect device for guide tab
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setActiveGuideTab('ios');
    } else if (/android/.test(ua)) {
      setActiveGuideTab('android');
    } else {
      setActiveGuideTab('desktop');
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      setShowModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If native prompt is ready and not in iframe, try triggering it
    if (deferredPrompt && !isInIframe) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsStandalone(true);
        }
        setDeferredPrompt(null);
        return;
      } catch {
        // Fallback to guide modal
      }
    }

    // Otherwise show the rich guide modal
    setShowModal(true);
  };

  const openInNewTab = () => {
    window.open(window.location.origin, '_blank');
  };

  const renderModal = () => {
    if (!showModal) return null;

    return createPortal(
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-linear-to-r from-orange-50/70 to-amber-50/50">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png?v=5" 
                  alt="Logo" 
                  className="w-9 h-9 object-contain drop-shadow-xs"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/logo.svg';
                  }}
                />
                <div>
                  <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-tight">
                    Cài Đặt Hôm Nay Ăn Gì?
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Mở nhanh như App, mượt mà và không tốn dung lượng
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-200/60 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* If inside iframe warning & direct button */}
              {isInIframe && (
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-200/80 text-orange-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>
                      Trình duyệt yêu cầu mở ở tab độc lập để kích hoạt tính năng cài đặt App.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={openInNewTab}
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Mở tab mới</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Native Prompt Available Action */}
              {deferredPrompt && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-xs text-emerald-900">Thiết bị sẵn sàng!</div>
                    <div className="text-[11px] text-emerald-700">Nhấn nút bên cạnh để cài đặt ngay.</div>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (deferredPrompt) {
                        await deferredPrompt.prompt();
                        const c = await deferredPrompt.userChoice;
                        if (c.outcome === 'accepted') setIsStandalone(true);
                        setDeferredPrompt(null);
                        setShowModal(false);
                      }
                    }}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Cài Đặt Ngay
                  </button>
                </div>
              )}

              {/* Platform Selector Tabs */}
              <div className="flex rounded-xl bg-stone-100 p-1 gap-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveGuideTab('android')}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeGuideTab === 'android'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Android / Chrome</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGuideTab('ios')}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeGuideTab === 'ios'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Share className="w-3.5 h-3.5 text-blue-600" />
                  <span>iPhone (Safari)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGuideTab('desktop')}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeGuideTab === 'desktop'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5 text-orange-600" />
                  <span>Máy Tính PC/Mac</span>
                </button>
              </div>

              {/* Step instructions */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700 space-y-3">
                {activeGuideTab === 'android' && (
                  <>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0 text-[11px]">1</div>
                      <p>Mở trang trên trình duyệt <strong>Google Chrome</strong> hoặc <strong>Cốc Cốc</strong>.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0 text-[11px]">2</div>
                      <p>Bấm vào biểu tượng <strong>dấu 3 chấm (⋮)</strong> ở góc trên bên phải màn hình.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0 text-[11px]">3</div>
                      <p>Chọn mục <strong>"Cài đặt ứng dụng"</strong> (hoặc <strong>"Thêm vào Màn hình chính"</strong>) và bấm <strong>Cài đặt</strong>.</p>
                    </div>
                  </>
                )}

                {activeGuideTab === 'ios' && (
                  <>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">1</div>
                      <p>Mở trang web bằng trình duyệt <strong>Safari</strong> trên iPhone / iPad.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">2</div>
                      <p>Bấm vào biểu tượng <strong>Chia sẻ</strong> (hình ô vuông có mũi tên trỏ lên) ở thanh điều hướng phía dưới.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">3</div>
                      <p>Cuộn xuống và chọn <strong>"Thêm vào MH chính" (Add to Home Screen)</strong> ➔ Bấm <strong>Thêm</strong> ở góc trên.</p>
                    </div>
                  </>
                )}

                {activeGuideTab === 'desktop' && (
                  <>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[11px]">1</div>
                      <p>Mở trang web trên Google Chrome, Cốc Cốc, Edge hoặc Brave.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[11px]">2</div>
                      <p>Để ý biểu tượng <strong>Cài đặt (Màn hình / Mũi tên tải xuống)</strong> nằm ở góc phải thanh địa chỉ URL.</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-stone-200 text-stone-800 font-bold flex items-center justify-center shrink-0 text-[11px]">3</div>
                      <p>Bấm vào và chọn <strong>"Cài đặt"</strong> để mở trang dưới dạng một ứng dụng riêng biệt trên máy tính.</p>
                    </div>
                  </>
                )}
              </div>

              {/* Perks list */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Không cần vào App Store</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Dung lượng siêu nhẹ (~1MB)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Mở toàn màn hình không viền</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Tự động cập nhật phiên bản mới</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={openInNewTab}
                className="text-xs text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Mở trong tab mới</span>
                <ExternalLink className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>,
      document.body
    );
  };

  if (variant === 'footer') {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-orange-600 transition-colors py-1 px-2 rounded-lg hover:bg-stone-50 cursor-pointer font-medium ${className}`}
          title={isStandalone ? "Ứng dụng đã được cài đặt" : "Cài đặt Hôm Nay Ăn Gì về điện thoại / máy tính"}
        >
          <Download className="w-3.5 h-3.5 text-orange-500" />
          <span>{isStandalone ? 'Đã cài đặt' : 'Cài đặt App'}</span>
        </button>
        {renderModal()}
      </>
    );
  }

  if (variant === 'pill') {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs ${className}`}
          title="Cài đặt App"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isStandalone ? 'Đã cài đặt' : 'Cài App'}</span>
        </button>
        {renderModal()}
      </>
    );
  }

  // Default navbar variant
  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className={`px-3 py-1.5 rounded-full border border-orange-200/90 bg-orange-50/70 hover:bg-orange-100 hover:border-orange-300 text-orange-700 transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-2xs group ${className}`}
        title="Cài đặt Hôm Nay Ăn Gì trên điện thoại / máy tính"
      >
        <Download className="w-3.5 h-3.5 text-orange-600 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">{isStandalone ? 'Đã cài' : 'Cài App'}</span>
      </button>
      {renderModal()}
    </>
  );
};

