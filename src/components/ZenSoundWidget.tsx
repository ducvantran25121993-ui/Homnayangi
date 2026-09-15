import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CloudRain, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  X, 
  Pause 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { zenAudio, ZenAudioStatus } from '../utils/zenAudio';

export function useZenAudioStatus(): ZenAudioStatus {
  const [status, setStatus] = useState<ZenAudioStatus>(() => zenAudio.getStatus());
  useEffect(() => {
    return zenAudio.subscribe(setStatus);
  }, []);
  return status;
}

export interface ZenSoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZenSoundModal: React.FC<ZenSoundModalProps> = ({ isOpen, onClose }) => {
  const status = useZenAudioStatus();
  const [volume, setVolume] = useState(status.volume);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<number>(0); // minutes (0 = continuous)
  const [isRippling, setIsRippling] = useState(false);
  const [strikeCount, setStrikeCount] = useState(0);

  const isAnyPlaying = status.isPlaying;

  // Sync volume changes
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (isMuted && val > 0) setIsMuted(false);
    zenAudio.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      zenAudio.setVolume(volume);
    } else {
      setIsMuted(true);
      zenAudio.setVolume(0);
    }
  };

  // Toggle Bowl Drone
  const handleToggleBowl = () => {
    if (status.isBowlDronePlaying) {
      zenAudio.stopBowlDrone();
    } else {
      zenAudio.startBowlDrone();
      if (selectedTimer > 0) {
        setupTimer(selectedTimer);
      }
    }
  };

  // Toggle Rain
  const handleToggleRain = () => {
    if (status.isRainPlaying) {
      zenAudio.stopRain();
    } else {
      zenAudio.startRain();
      if (selectedTimer > 0) {
        setupTimer(selectedTimer);
      }
    }
  };

  // Strike Bowl once
  const handleStrikeBowl = () => {
    zenAudio.strikeBowl(432);
    setIsRippling(true);
    setStrikeCount((c) => c + 1);
    setTimeout(() => setIsRippling(false), 1200);
  };

  // Setup Sleep Timer
  const setupTimer = (minutes: number) => {
    setSelectedTimer(minutes);
    zenAudio.setTimer(minutes, () => {
      // Audio stopped
    });
  };

  // Stop everything
  const handleStopAll = () => {
    zenAudio.stopAll();
    setSelectedTimer(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-2xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Bảng điều khiển Chuông Tây Tạng & Âm thanh thiền"
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md bg-stone-900 text-stone-100 rounded-t-3xl sm:rounded-3xl border border-stone-800 shadow-2xl p-5 sm:p-6 overflow-hidden relative max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                    Chuông Tây Tạng &amp; Tiếng Mưa
                  </h3>
                  <p className="text-[11px] text-amber-400/90 font-medium">
                    Tần số chữa lành 432Hz • Giúp tâm tịnh khi chọn món
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Đóng bảng âm thanh"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Interactive Bowl Strike Button */}
            <div className="my-5 text-center">
              <div className="relative inline-block">
                {/* Visual Ripple wave effect when struck */}
                {isRippling && (
                  <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                )}
                
                <button
                  type="button"
                  onClick={handleStrikeBowl}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 border-4 border-amber-300/40 text-stone-950 shadow-xl shadow-amber-600/30 flex flex-col items-center justify-center gap-1 group hover:scale-105 active:scale-95 transition-transform cursor-pointer select-none mx-auto"
                  title="Bấm để gõ một tiếng chuông đồng"
                  aria-label="Gõ một tiếng chuông Tây Tạng 432Hz"
                >
                  <Bell className="w-7 h-7 text-stone-950 group-hover:rotate-12 transition-transform" />
                  <span className="text-[11px] font-black tracking-wider uppercase">
                    Gõ Chuông
                  </span>
                </button>
              </div>
              
              <p className="text-xs text-stone-400 mt-2.5">
                Chạm để ngân vang một tiếng chuông đồng thanh lọc năng lượng.
              </p>
              {strikeCount > 0 && (
                <p className="text-[11px] text-amber-400/80 font-medium mt-0.5">
                  Đã gõ {strikeCount} lần • Âm vang ngân trong 10 giây
                </p>
              )}
            </div>

            {/* Ambient Sound Channels */}
            <div className="space-y-2.5 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800/80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-1">
                Âm thanh nền liên tục
              </div>

              {/* Singing Bowl Drone */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    status.isBowlDronePlaying ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Chuông Xoay Tây Tạng (Singing Bowl)
                    </p>
                    <p className="text-[10px] text-stone-400">
                      Âm ngân sóng trầm 432Hz du dương xua tan căng thẳng
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleBowl}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    status.isBowlDronePlaying
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {status.isBowlDronePlaying ? 'Đang Bật' : 'Bật'}
                </button>
              </div>

              {/* Rain Sound */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    status.isRainPlaying ? 'bg-cyan-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}>
                    <CloudRain className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Tiếng Mưa Rơi Tĩnh Lặng
                    </p>
                    <p className="text-[10px] text-stone-400">
                      Tiếng mưa êm dịu tạo không gian ấm cúng khi chọn món
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleRain}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    status.isRainPlaying
                      ? 'bg-cyan-500 text-stone-950 shadow-xs'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {status.isRainPlaying ? 'Đang Bật' : 'Bật'}
                </button>
              </div>
            </div>

            {/* Master Volume Slider */}
            <div className="mt-4 p-3 rounded-2xl bg-stone-950/40 border border-stone-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  Âm lượng tổng
                </span>
                <span className="text-[11px] font-mono font-bold text-stone-300">
                  {isMuted ? 'Tắt tiếng' : `${Math.round(volume * 100)}%`}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? 'Bật âm' : 'Tắt âm'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                  aria-label="Điều chỉnh âm lượng"
                />
              </div>
            </div>

            {/* Sleep Timer & Stop All */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-stone-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-medium">Hẹn giờ tắt:</span>
              </div>

              <div className="flex items-center gap-1">
                {[
                  { label: 'Vô tận', val: 0 },
                  { label: '5p', val: 5 },
                  { label: '15p', val: 15 },
                  { label: '30p', val: 30 },
                ].map((t) => (
                  <button
                    key={t.val}
                    type="button"
                    onClick={() => setupTimer(t.val)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                      selectedTimer === t.val
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between gap-2">
              {isAnyPlaying ? (
                <button
                  type="button"
                  onClick={handleStopAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 hover:bg-rose-900 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Dừng tất cả âm thanh</span>
                </button>
              ) : (
                <span className="text-[11px] text-stone-500 italic">
                  Âm thanh giúp tâm tịnh khi chọn món
                </span>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer ml-auto"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ZenSoundWidget: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
  showFloatingButton?: boolean;
}> = ({ isOpen: controlledIsOpen, onClose: controlledOnClose, showFloatingButton = false }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const status = useZenAudioStatus();

  const isControlled = typeof controlledIsOpen === 'boolean';
  const open = isControlled ? controlledIsOpen : internalIsOpen;
  const close = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  return (
    <>
      {showFloatingButton && (
        <aside 
          aria-label="Tiện ích âm thanh thư giãn"
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center"
        >
          <button
            type="button"
            onClick={() => setInternalIsOpen((prev) => !prev)}
            className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-lg border transition-all duration-300 backdrop-blur-md cursor-pointer group ${
              status.isPlaying
                ? 'bg-amber-950/90 border-amber-600/50 text-amber-200 shadow-amber-900/30'
                : 'bg-white/95 border-stone-200/90 text-stone-700 hover:border-amber-400 hover:shadow-md'
            }`}
            title="Âm thanh thiền & Chuông Tây Tạng thư giãn"
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            {status.isPlaying && (
              <span className="absolute -inset-1 rounded-full bg-amber-500/20 animate-ping pointer-events-none" />
            )}

            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
              status.isPlaying ? 'bg-amber-500 text-stone-950 scale-105' : 'bg-amber-100 text-amber-800 group-hover:scale-110'
            }`}>
              <Bell className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-tight flex items-center gap-1">
                Chuông Thiền
                {status.isPlaying && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </span>
              <span className="text-[10px] opacity-75 leading-none">
                {status.isPlaying ? 'Đang phát • 432Hz' : 'Thư giãn'}
              </span>
            </div>
          </button>
        </aside>
      )}

      <ZenSoundModal isOpen={open} onClose={close} />
    </>
  );
};
