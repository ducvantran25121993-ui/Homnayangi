import React, { useState, useEffect, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Sparkles, 
  ShoppingBag, 
  ExternalLink, 
  Flame, 
  Briefcase, 
  Coins, 
  Coffee, 
  Salad, 
  PartyPopper,
  Check,
  ChefHat,
  Shuffle,
  Search,
  Utensils,
  Soup,
  Sandwich,
  Drumstick,
  Pizza,
  Layers,
  Zap,
  Cookie,
  Leaf,
  Share2,
  MapPin
} from 'lucide-react';
import { WHEEL_PRESETS, INITIAL_DISHES } from '../data/dishes';
import { Dish, AffiliateConfig, UserLocation } from '../types';
import { trackAndOpenAffiliateLink, formatVND } from '../utils/affiliate';
import { DeliveryLocationBadge } from './DeliveryLocationBadge';
import { ShareModal } from './ShareModal';

interface LuckyWheelProps {
  affiliateConfig: AffiliateConfig;
  onDishSelect: (dish: Dish) => void;
  userLocation: UserLocation;
  onOpenLocationModal: (dishName?: string) => void;
}

// Sophisticated vibrant palette tailored for culinary wheel
const SLICE_COLORS = [
  '#EA580C', // Deep Orange
  '#0D9488', // Teal
  '#E11D48', // Rose Red
  '#2563EB', // Royal Blue
  '#D97706', // Amber Gold
  '#7C3AED', // Violet
  '#059669', // Emerald Green
  '#DB2777', // Pink Red
  '#4F46E5', // Indigo
  '#CA8A04', // Warm Yellow
  '#0284C7', // Sky Blue
  '#BE123C', // Crimson
  '#16A34A', // Green
  '#9333EA', // Purple
  '#C2410C', // Burnt Orange
  '#0891B2', // Cyan Teal
  '#4338CA', // Deep Indigo
  '#B91C1C', // Strong Red
  '#047857', // Forest
  '#6D28D9', // Deep Violet
];

const WHEEL_ITEMS_STORAGE_KEY = 'homnayangi_luckywheel_items_v1';
const WHEEL_PRESET_STORAGE_KEY = 'homnayangi_luckywheel_preset_v1';

export const LuckyWheel: React.FC<LuckyWheelProps> = ({
  affiliateConfig,
  onDishSelect,
  userLocation,
  onOpenLocationModal,
}) => {
  // Default to saved items or first category preset (Cơm & Xôi)
  const [items, setItems] = useState<string[]>(() => {
    if (typeof window === 'undefined') return WHEEL_PRESETS[1].items;
    try {
      const saved = localStorage.getItem(WHEEL_ITEMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 2) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading wheel items from localStorage:', e);
    }
    return WHEEL_PRESETS[1].items;
  });

  const [selectedPreset, setSelectedPreset] = useState<string>(() => {
    if (typeof window === 'undefined') return WHEEL_PRESETS[1].id;
    try {
      const savedPreset = localStorage.getItem(WHEEL_PRESET_STORAGE_KEY);
      if (savedPreset) {
        return savedPreset;
      }
    } catch (e) {
      console.error('Error loading wheel preset from localStorage:', e);
    }
    return WHEEL_PRESETS[1].id;
  });

  // Automatically persist items to localStorage whenever updated
  useEffect(() => {
    try {
      if (items && items.length >= 2) {
        localStorage.setItem(WHEEL_ITEMS_STORAGE_KEY, JSON.stringify(items));
      }
    } catch (e) {
      console.error('Error saving wheel items to localStorage:', e);
    }
  }, [items]);

  // Automatically persist selectedPreset to localStorage
  useEffect(() => {
    try {
      if (selectedPreset) {
        localStorage.setItem(WHEEL_PRESET_STORAGE_KEY, selectedPreset);
      }
    } catch (e) {
      console.error('Error saving wheel preset to localStorage:', e);
    }
  }, [selectedPreset]);

  const [presetTab, setPresetTab] = useState<'categories' | 'themes'>('categories');
  const [newItemText, setNewItemText] = useState('');
  const [quickSearchText, setQuickSearchText] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [matchedDish, setMatchedDish] = useState<Dish | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  // Fixed spin speed: ~2s smooth duration
  const spinSpeed: 'fast' = 'fast';

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<number>(0);
  const angularVelocityRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickIndexRef = useRef<number>(-1);
  const audioContextRef = useRef<AudioContext | null>(null);

  const renderPresetIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-4 h-4 ${isSelected ? 'text-orange-600' : 'text-stone-500'}`;
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Utensils':
        return <Utensils className={className} />;
      case 'Soup':
        return <Soup className={className} />;
      case 'Sandwich':
        return <Sandwich className={className} />;
      case 'Drumstick':
        return <Drumstick className={className} />;
      case 'Salad':
        return <Salad className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Pizza':
        return <Pizza className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Coins':
        return <Coins className={className} />;
      case 'Coffee':
        return <Coffee className={className} />;
      case 'Cookie':
        return <Cookie className={className} />;
      case 'Leaf':
        return <Leaf className={className} />;
      case 'PartyPopper':
        return <PartyPopper className={className} />;
      default:
        return <Flame className={className} />;
    }
  };

  // Initialize Web Audio API for ticking sound
  const playTickSound = () => {
    if (!audioEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio not permitted or failed
    }
  };

  const playFanfareSound = () => {
    if (!audioEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + index * 0.1);
        osc.stop(ctx.currentTime + index * 0.1 + 0.4);
      });
    } catch {
      // Audio failed
    }
  };

  // Draw the wheel canvas
  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 44;

    ctx.clearRect(0, 0, width, height);

    const numSlices = items.length;
    if (numSlices === 0) return;

    const arcSize = (2 * Math.PI) / numSlices;
    const currentRotation = rotationRef.current;

    // Draw outer glow and background
    ctx.save();
    ctx.shadowColor = 'rgba(234, 88, 12, 0.28)';
    ctx.shadowBlur = 32;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.restore();

    // Outer decorative ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 14, 0, 2 * Math.PI);
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 10;
    ctx.stroke();

    // Outer bulbs
    const bulbCount = 32;
    for (let i = 0; i < bulbCount; i++) {
      const angle = (i * 2 * Math.PI) / bulbCount;
      const bx = centerX + (radius + 9) * Math.cos(angle);
      const by = centerY + (radius + 9) * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? '#FBBF24' : '#F97316';
      ctx.fill();
    }

    // Slices
    for (let i = 0; i < numSlices; i++) {
      const sliceStart = currentRotation + i * arcSize;
      const sliceEnd = sliceStart + arcSize;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, sliceStart, sliceEnd);
      ctx.closePath();

      ctx.fillStyle = SLICE_COLORS[i % SLICE_COLORS.length];
      ctx.fill();

      // Dynamic separator line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.lineWidth = numSlices > 50 ? 1 : numSlices > 24 ? 1.5 : 2.5;
      ctx.stroke();

      // Text label inside slice
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sliceStart + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      
      let fontSize = 23;
      if (numSlices > 70) {
        fontSize = 11.5;
      } else if (numSlices > 40) {
        fontSize = 13.5;
      } else if (numSlices > 25) {
        fontSize = 16;
      } else if (numSlices > 16) {
        fontSize = 18.5;
      } else if (numSlices > 12) {
        fontSize = 21;
      }
      ctx.font = `600 ${fontSize}px system-ui, -apple-system, sans-serif`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
      ctx.shadowBlur = 4;

      const label = items[i];
      const maxTextWidth = radius - (numSlices > 40 ? 60 : 85);
      let displayLabel = label;
      if (ctx.measureText(displayLabel).width > maxTextWidth) {
        while (ctx.measureText(displayLabel + '..').width > maxTextWidth && displayLabel.length > 3) {
          displayLabel = displayLabel.slice(0, -1);
        }
        displayLabel += '..';
      }

      ctx.fillText(displayLabel, radius - 24, fontSize * 0.35);
      ctx.restore();
    }

    // Center hub - Sleek modern multi-layer ring
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 56, 0, 2 * Math.PI);
    ctx.fillStyle = '#1C1917';
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 56, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 24, 0, 2 * Math.PI);
    ctx.fillStyle = '#F97316';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  };

  useEffect(() => {
    drawWheel();
  }, [items]);

  // Spin the wheel
  const startSpin = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setWinner(null);
    setMatchedDish(null);

    // Initial angular velocity - energetic boost for smooth ~2s spin
    const randomBoost = 0.42 + Math.random() * 0.12;
    angularVelocityRef.current = randomBoost;

    // Smooth ~2s deceleration rate
    const friction = items.length > 50 ? 0.950 : 0.956;
    const stopThreshold = 0.0045;

    const updatePhysics = () => {
      rotationRef.current = (rotationRef.current + angularVelocityRef.current) % (2 * Math.PI);
      angularVelocityRef.current *= friction;

      // Detect ticking sound when needle passes a slice border
      const numSlices = items.length;
      const arcSize = (2 * Math.PI) / numSlices;
      const needleAngle = (3 * Math.PI) / 2; // Top needle
      let normalizedRotation = (needleAngle - rotationRef.current) % (2 * Math.PI);
      if (normalizedRotation < 0) normalizedRotation += 2 * Math.PI;

      const currentSliceIndex = Math.floor(normalizedRotation / arcSize);
      // For large wheels (e.g. 128 items), group ticks so sound is crisp and pleasant
      const tickStep = numSlices > 50 ? 4 : numSlices > 25 ? 2 : 1;
      if (Math.abs(currentSliceIndex - lastTickIndexRef.current) >= tickStep) {
        lastTickIndexRef.current = currentSliceIndex;
        playTickSound();
      }

      drawWheel();

      // Stop condition
      if (angularVelocityRef.current < stopThreshold) {
        setIsSpinning(false);
        const winningItem = items[currentSliceIndex % numSlices];
        setWinner(winningItem);
        playFanfareSound();

        // Trigger confetti
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 },
        });

        // Find matching dish from database or create synthetic dish
        const cleanWin = (winningItem || '').trim().toLowerCase();
        const found = INITIAL_DISHES.find((d) => {
          const vn = (d.vietnameseName || '').toLowerCase();
          const nm = (d.name || '').toLowerCase();
          return vn === cleanWin || nm === cleanWin || vn.includes(cleanWin) || cleanWin.includes(vn);
        });

        if (found) {
          setMatchedDish(found);
        } else {
          setMatchedDish({
            id: 'custom-' + Date.now(),
            name: winningItem,
            vietnameseName: winningItem,
            category: 'com_xoi',
            mealTime: ['trua', 'toi'],
            priceRange: '35.000đ - 65.000đ',
            estimatedPrice: 50000,
            calories: '~550 kcal',
            description: `Món ngon ${winningItem} nóng hổi, chuẩn vị, đang sẵn sàng được giao tận nơi qua các ứng dụng đặt món.`,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
            popularTags: ['Hôm nay ăn gì', 'Quán hot gần bạn'],
            searchKeyword: winningItem,
            idealWeather: 'Hôm nay',
            bestPairedWith: 'Trà đá hoặc nước ngọt mát lạnh',
          });
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(updatePhysics);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
  };

  // Immediate stop button for users who don't want to wait
  const stopSpinImmediately = () => {
    if (!isSpinning) return;
    angularVelocityRef.current = 0.0025;
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handlePresetSelect = (presetId: string) => {
    const preset = WHEEL_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setItems([...preset.items]);
      setWinner(null);
      setMatchedDish(null);
      playTickSound();
    }
  };

  const handleRandomShuffle = () => {
    const shuffled = [...INITIAL_DISHES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20).map((d) => d.vietnameseName || d.name);
    setItems(selected);
    setSelectedPreset('custom_random');
    setWinner(null);
    setMatchedDish(null);
    playTickSound();
  };

  const handleLoadAll = () => {
    const all = INITIAL_DISHES.map((d) => d.vietnameseName || d.name);
    setItems(all);
    setSelectedPreset('tat_ca_all');
    setWinner(null);
    setMatchedDish(null);
    playTickSound();
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newItemText.trim();
    if (!text) return;
    if (items.includes(text)) return;
    setItems([...items, text]);
    setSelectedPreset('custom');
    setNewItemText('');
  };

  const handleAddDishFromSearch = (dish: Dish) => {
    const name = dish.vietnameseName || dish.name;
    if (!items.includes(name)) {
      setItems([...items, name]);
      setSelectedPreset('custom');
    }
    setQuickSearchText('');
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 2) {
      alert('Vòng quay cần ít nhất 2 món ăn!');
      return;
    }
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    setSelectedPreset('custom');
  };

  const handleResetToDefault = () => {
    const defaultPreset = WHEEL_PRESETS[1];
    setItems([...defaultPreset.items]);
    setSelectedPreset(defaultPreset.id);
    setWinner(null);
    setMatchedDish(null);
    playTickSound();
  };

  // Filter presets based on selected tab
  const displayedPresets = useMemo(() => {
    return WHEEL_PRESETS.filter((p) => p.group === presetTab);
  }, [presetTab]);

  const categoriesCount = useMemo(
    () => WHEEL_PRESETS.filter((p) => p.group === 'categories').length,
    []
  );
  const themesCount = useMemo(
    () => WHEEL_PRESETS.filter((p) => p.group === 'themes').length,
    []
  );

  // Live quick search suggestions
  const searchSuggestions = useMemo(() => {
    if (!quickSearchText.trim()) return [];
    const q = quickSearchText.trim().toLowerCase();
    return INITIAL_DISHES.filter(
      (d) =>
        (d.vietnameseName && d.vietnameseName.toLowerCase().includes(q)) ||
        d.name.toLowerCase().includes(q) ||
        d.popularTags.some((tag) => tag.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [quickSearchText]);

  return (
    <div className="py-6 sm:py-8">
      {/* Hero Title */}
      <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          VÒNG QUAY ẨM THỰC THẦN KỲ - ĐÃ KẾT NỐI {INITIAL_DISHES.length} MÓN NGON
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-stone-900 tracking-tight mb-2 md:whitespace-nowrap">
          Vòng Quay Ăn Gì - <span className="text-orange-600">Quay Món Ăn May Mắn Ngẫu Nhiên</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl mx-auto">
          Phân vân trưa nay, tối nay ăn gì? Hãy để Vòng Quay Ăn Gì chọn ngẫu nhiên từ hơn {INITIAL_DISHES.length} món ngon Việt Nam chuẩn vị và đặt món giao ngay tận nơi!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto px-4">
        
        {/* Left Col: The Wheel Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs relative">
          
          {/* Top Indicator Arrow */}
          <div className="relative flex justify-center mb-2">
            <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-t-[30px] border-t-orange-600 drop-shadow-md z-10 animate-bounce" />
          </div>

          {/* Canvas Wheel with click to stop */}
          <div 
            onClick={isSpinning ? stopSpinImmediately : undefined}
            className={`relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] flex items-center justify-center select-none ${
              isSpinning ? 'cursor-pointer' : ''
            }`}
            title={isSpinning ? 'Bấm vào vòng quay để dừng ngay!' : undefined}
          >
            <canvas
              ref={canvasRef}
              width={800}
              height={800}
              className="w-full h-full max-w-[380px] max-h-[380px]"
            />
            {isSpinning && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-xs text-white text-xs font-black animate-pulse shadow-xl flex items-center gap-1.5 border border-white/20">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Bấm để dừng ngay</span>
                </div>
              </div>
            )}
          </div>

          {/* Slices count info */}
          <div className="mt-3 flex items-center justify-center text-xs">
            <div className="font-semibold text-stone-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Đang có <strong className="text-stone-800">{items.length} món</strong> trên vòng quay
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              onClick={isSpinning ? stopSpinImmediately : startSpin}
              disabled={items.length === 0}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base sm:text-lg font-extrabold text-white shadow-lg transition-all ${
                isSpinning
                  ? 'bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 shadow-amber-500/40 animate-pulse hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isSpinning ? (
                <>
                  <Zap className="w-5 h-5 fill-white animate-bounce" />
                  <span>Dừng & Xem ngay!</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>QUAY NGAY!</span>
                </>
              )}
            </button>

            <button
              onClick={handleRandomShuffle}
              disabled={isSpinning}
              title="Xáo ngẫu nhiên 20 món từ kho 128 món"
              className="flex items-center justify-center gap-1.5 px-4 py-4 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm transition-colors"
            >
              <Shuffle className="w-4 h-4 text-orange-600" />
              <span>Xáo 20 món</span>
            </button>

            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-4 rounded-2xl border font-bold text-xs transition-colors ${
                audioEnabled
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-stone-50 border-stone-200 text-stone-400'
              }`}
              title={audioEnabled ? 'Tắt âm thanh quay' : 'Bật âm thanh quay'}
            >
              {audioEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt'}
            </button>
          </div>

          {/* Winner Result Card */}
          {winner && (
            <div className="mt-6 w-full p-5 sm:p-6 bg-gradient-to-br from-orange-50 to-amber-50/80 border border-orange-200 rounded-3xl animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {matchedDish && (
                  <img
                    src={matchedDish.image}
                    alt={`${matchedDish.vietnameseName || matchedDish.name} đặc sản ${matchedDish.category} trúng thưởng Vòng Quay May Mắn - Hôm Nay Ăn Gì`}
                    referrerPolicy="no-referrer"
                    onClick={() => onDishSelect(matchedDish)}
                    title={`Bấm để xem chi tiết & đặt ${matchedDish.name}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md border-2 border-white shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  />
                )}
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-xs font-extrabold text-orange-700 uppercase tracking-wider mb-1 flex items-center justify-center sm:justify-start gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Vũ trụ đã chọn cho bạn:
                  </div>
                  <h3
                    onClick={() => matchedDish && onDishSelect(matchedDish)}
                    title={`Bấm để xem chi tiết & đặt ${winner}`}
                    className="text-xl sm:text-2xl font-black text-stone-900 mb-1 cursor-pointer hover:text-orange-600 transition-colors"
                  >
                    {winner}
                  </h3>
                  {matchedDish && (
                    <>
                      <p className="text-xs sm:text-sm text-stone-600 mb-2 line-clamp-2">
                        {matchedDish.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-stone-700">
                        <span className="px-2.5 py-1 bg-white rounded-lg shadow-xs border border-orange-100">
                          {matchedDish.priceRange}
                        </span>
                        <span className="px-2.5 py-1 bg-white rounded-lg shadow-xs border border-orange-100">
                          {matchedDish.calories}
                        </span>
                        <button
                          onClick={() => onDishSelect(matchedDish)}
                          className="text-orange-600 hover:text-orange-700 font-bold underline ml-1"
                        >
                          Xem chi tiết món
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Instant Delivery Buttons with Location & Affiliate Tracking */}
              <div className="mt-5 pt-4 border-t border-orange-200/80">
                <div className="mb-3">
                  <DeliveryLocationBadge
                    location={userLocation}
                    onClick={() => onOpenLocationModal(winner || matchedDish?.name)}
                    variant="card"
                  />
                </div>

                <div className="text-xs font-black text-stone-800 mb-2.5 text-center sm:text-left flex items-center gap-1.5 flex-wrap">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span>
                    Bấm nút để tìm quán <strong>"{winner}"</strong> tại{' '}
                    <strong className="text-orange-600 underline decoration-orange-300">
                      {userLocation.district || userLocation.city}
                    </strong>
                    :
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink(
                        'shopeefood',
                        matchedDish || { name: winner || 'Món ngon' },
                        affiliateConfig,
                        userLocation
                      )
                    }
                    title={`Chuyển qua ShopeeFood tìm quán ${winner} tại ${userLocation.district || userLocation.city}`}
                    className="flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>ShopeeFood</span>
                  </button>

                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink(
                        'grabfood',
                        matchedDish || { name: winner || 'Món ngon' },
                        affiliateConfig,
                        userLocation
                      )
                    }
                    title={`Chuyển qua GrabFood tìm quán ${winner} tại ${userLocation.district || userLocation.city}`}
                    className="flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>GrabFood</span>
                  </button>

                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink(
                        'befood',
                        matchedDish || { name: winner || 'Món ngon' },
                        affiliateConfig,
                        userLocation
                      )
                    }
                    title={`Chuyển qua BeFood tìm quán ${winner} tại ${userLocation.district || userLocation.city}`}
                    className="flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 font-extrabold text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>BeFood</span>
                  </button>

                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink(
                        'googlemaps',
                        matchedDish || { name: winner || 'Món ngon' },
                        affiliateConfig,
                        userLocation
                      )
                    }
                    title={`Mở Google Maps tìm quán ${winner} gần bạn`}
                    className="flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 shrink-0 text-white" />
                    <span>Maps</span>
                  </button>
                </div>

                {/* Share result with friends */}
                <div className="mt-3 pt-3 border-t border-orange-200/60 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">
                    Rủ bạn bè hoặc nhóm cùng ăn món này:
                  </span>
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 border border-orange-200 text-orange-700 hover:text-orange-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-orange-600" />
                    <span>Chia sẻ kết quả</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Col: Menu Presets & Slice Customizer */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Presets card with Category tabs */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-500" />
                Bộ Thực Đơn Chọn Sẵn
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
                {INITIAL_DISHES.length} Món Sẵn Có
              </span>
            </div>

            {/* Tabs for Category vs Lifestyle Theme */}
            <div className="flex p-1 bg-stone-100 rounded-xl mb-3.5">
              <button
                onClick={() => setPresetTab('categories')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  presetTab === 'categories'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🍱 {categoriesCount} Danh Mục Ẩm Thực
              </button>
              <button
                onClick={() => setPresetTab('themes')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  presetTab === 'themes'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🎯 {themesCount} Chủ Đề Thịnh Hành
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {displayedPresets.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/80 shadow-xs ring-1 ring-orange-500/30'
                        : 'border-stone-200/80 bg-stone-50/60 hover:bg-stone-100/80 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-orange-500 text-white' : 'bg-white border border-stone-200 text-stone-600'
                        }`}
                      >
                        {renderPresetIcon(preset.iconName, isSelected)}
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`text-xs sm:text-sm font-bold truncate ${
                            isSelected ? 'text-orange-950' : 'text-stone-800'
                          }`}
                        >
                          {preset.name}
                        </div>
                        <div className="text-[11px] font-semibold text-stone-500">
                          {preset.badge}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-orange-600 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Fast Load Actions */}
            <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={handleLoadAll}
                className="text-stone-600 hover:text-orange-600 font-bold flex items-center gap-1 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Nạp toàn bộ {INITIAL_DISHES.length} món
              </button>
              <button
                onClick={handleRandomShuffle}
                className="text-stone-600 hover:text-orange-600 font-bold flex items-center gap-1 transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5 text-orange-500" />
                Xáo 20 món ngẫu nhiên
              </button>
            </div>
          </div>

          {/* List of items & Quick Search / Add tool */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-stone-900">
                  Món Trên Vòng Quay ({items.length})
                </h2>
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60"
                  title="Danh sách món được tự động lưu trên trình duyệt, không bị mất khi tải lại trang"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đã tự động lưu
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedPreset === 'custom' && (
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="text-xs text-stone-500 hover:text-orange-600 transition-colors underline decoration-dotted"
                    title="Khôi phục danh sách món về mặc định (Cơm & Xôi)"
                  >
                    Đặt lại mặc định
                  </button>
                )}
                <span className="text-xs text-stone-500 hidden sm:inline">Hỗ trợ không giới hạn món</span>
              </div>
            </div>

            {/* Quick search & add from all dishes */}
            <div className="relative mb-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={`Tìm & thêm nhanh từ kho ${INITIAL_DISHES.length} món...`}
                  value={quickSearchText}
                  onChange={(e) => setQuickSearchText(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50/70 text-xs sm:text-sm focus:outline-hidden focus:border-orange-500 focus:bg-white transition-colors"
                />
              </div>

              {/* Search suggestions dropdown */}
              {searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl border border-stone-200 shadow-lg z-20 overflow-hidden divide-y divide-stone-100">
                  {searchSuggestions.map((dish) => {
                    const dishName = dish.vietnameseName || dish.name;
                    const isAlreadyAdded = items.includes(dishName);
                    return (
                      <div
                        key={dish.id}
                        className="p-2.5 flex items-center justify-between hover:bg-orange-50/60 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={dish.image}
                            alt={`${dishName} đặc sản gợi ý thêm vào Vòng Quay - Hôm Nay Ăn Gì`}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-lg object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-stone-800 truncate">
                              {dishName}
                            </div>
                            <div className="text-[10px] text-stone-500">
                              {dish.priceRange} • {dish.calories}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={isAlreadyAdded}
                          onClick={() => handleAddDishFromSearch(dish)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                            isAlreadyAdded
                              ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                              : 'bg-orange-500 hover:bg-orange-600 text-white'
                          }`}
                        >
                          {isAlreadyAdded ? 'Đã có' : '+ Thêm'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Custom manual item add form */}
            <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Hoặc tự gõ món riêng (VD: Lẩu ếch măng cay...)"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                maxLength={30}
                className="flex-1 px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:border-orange-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Thêm
              </button>
            </form>

            {/* Items tags container */}
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 text-xs sm:text-sm text-stone-800 font-medium transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: SLICE_COLORS[idx % SLICE_COLORS.length] }}
                    />
                    <span className="truncate">{item}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(idx)}
                    title="Xóa món"
                    className="text-stone-400 hover:text-red-600 p-1 rounded-md transition-colors shrink-0 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Social Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`Vòng quay Hôm Nay Ăn Gì đã chọn: ${winner || 'Món ngon'}!`}
        text={`Vũ trụ ẩm thực vừa chỉ định món "${winner || 'món ngon'}" cho bữa ăn hôm nay. Bạn có muốn cùng ăn không?`}
      />
    </div>
  );
};
