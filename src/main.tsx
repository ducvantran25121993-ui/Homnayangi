import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker for offline caching and instant updates
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('Hôm Nay Ăn Gì: Phiên bản mới đã sẵn sàng');
    },
    onOfflineReady() {
      console.log('Hôm Nay Ăn Gì: Ứng dụng đã sẵn sàng chạy ngoại tuyến (Offline)');
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

