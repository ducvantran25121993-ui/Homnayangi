import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOffline, setIsOffline] = useState(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-stone-900/95 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2.5 text-xs">
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>Đang hoạt động ngoại tuyến (Offline)</span>
      <button
        onClick={() => window.location.reload()}
        className="ml-2 text-orange-400 hover:text-orange-300 font-bold inline-flex items-center gap-1 cursor-pointer"
      >
        <RefreshCw className="w-3 h-3" />
        Thử lại
      </button>
    </div>
  );
};
