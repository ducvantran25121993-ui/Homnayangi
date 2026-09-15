import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePWAInstall } from '../utils/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'mobile-banner' | 'menu-item' | 'footer';
  onInstalledCallback?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'navbar',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // If already running as an installed standalone PWA app, hide install CTA
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
      }
    } else {
      // For iOS or browsers without native prompt support, show the interactive guide
      setShowIOSModal(true);
    }
  };

  // Render modal for iOS or manual install instruction
  const renderIOSGuideModal = () => (
    <AnimatePresence>
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-stone-200 p-5 sm:p-6 overflow-hidden relative"
          >
            {/* Close button */}
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Đóng hướng dẫn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 leading-tight">
                  Cài Đặt App "Ăn Gì?"
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Mở nhanh như ứng dụng native, dùng mượt mà kể cả khi mất mạng.
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3.5 my-5 text-xs text-stone-700">
              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                    Nhấn nút Chia Sẻ <Share className="w-3.5 h-3.5 text-blue-600 inline" />
                  </p>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    {isIOS
                      ? 'Nằm ở thanh công cụ dưới cùng trên Safari của iPhone/iPad.'
                      : 'Trên thanh địa chỉ hoặc menu góc phải trình duyệt.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                    Chọn "Thêm vào MH chính" <PlusSquare className="w-3.5 h-3.5 text-orange-600 inline" />
                  </p>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Cuộn danh sách tùy chọn và chọn "Thêm vào Màn hình chính" (Add to Home Screen).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-2xl bg-stone-50 border border-stone-100">
                <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-semibold text-stone-900">
                    Xác nhận "Thêm" (Add)
                  </p>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Biểu tượng Hôm Nay Ăn Gì sẽ xuất hiện trên màn hình điện thoại như một App thực thụ!
                  </p>
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs sm:text-sm font-semibold hover:brightness-105 active:scale-98 transition shadow-md shadow-orange-600/20"
            >
              Đã hiểu, tiến hành cài đặt
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Variant for Navbar header
  if (variant === 'navbar') {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          title="Cài đặt ứng dụng vào điện thoại / máy tính"
          aria-label="Cài đặt app Hôm Nay Ăn Gì"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:brightness-105 transition-all text-xs font-semibold shadow-xs hover:shadow-orange-500/20 cursor-pointer group"
        >
          <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          <span>Cài App</span>
        </button>

        {/* Small icon-only button for mobile header next to Share */}
        <button
          type="button"
          onClick={handleInstallClick}
          title="Cài đặt app"
          aria-label="Cài đặt ứng dụng"
          className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100 transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>

        {renderIOSGuideModal()}
      </>
    );
  }

  // Variant for footer
  if (variant === 'footer') {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 hover:text-orange-600 transition-colors py-1 px-2 rounded-lg hover:bg-stone-50 text-xs font-semibold text-stone-600 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-orange-600" />
          <span>Cài Đặt App</span>
        </button>
        {renderIOSGuideModal()}
      </>
    );
  }

  // Variant for menu or footer item
  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors w-full text-left"
      >
        <Download className="w-4 h-4 text-orange-600" />
        <span>Cài đặt ứng dụng vào điện thoại</span>
      </button>
      {renderIOSGuideModal()}
    </>
  );
};
