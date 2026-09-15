import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState<boolean>(false);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      setDismissed(false);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && !dismissed && (
        <motion.div
          key="offline-banner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:right-auto sm:max-w-md z-50 bg-stone-900/95 text-white p-3 sm:p-3.5 rounded-2xl shadow-xl border border-stone-800 backdrop-blur-md flex items-center justify-between gap-3 text-xs sm:text-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-stone-100 flex items-center gap-1.5">
                Chế độ Ngoại Tuyến (Offline Mode)
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </p>
              <p className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                Vẫn bốc bài Tarot, quay vòng &amp; xem 160+ món ngon bình thường không cần mạng!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors shrink-0"
            title="Đóng thông báo"
            aria-label="Đóng thông báo ngoại tuyến"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {showReconnected && (
        <motion.div
          key="online-banner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:right-auto sm:max-w-xs z-50 bg-emerald-600 text-white p-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-medium"
          role="status"
          aria-live="polite"
        >
          <Wifi className="w-4 h-4 shrink-0" />
          <span>Đã khôi phục kết nối Internet!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
