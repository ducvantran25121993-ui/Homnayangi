import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  RefreshCw,
  ShoppingBag,
  RotateCcw,
  Flame,
  CheckCircle2,
  Dice5,
  Eye,
  Wand2,
} from 'lucide-react';
import { INITIAL_DISHES } from '../data/dishes';
import { Dish, AffiliateConfig, UserLocation } from '../types';
import { trackAndOpenAffiliateLink, formatVND } from '../utils/affiliate';
import { DeliveryLocationBadge } from './DeliveryLocationBadge';
import confetti from 'canvas-confetti';

interface FoodTarotProps {
  affiliateConfig: AffiliateConfig;
  onSelectDish?: (dish: Dish) => void;
  userLocation: UserLocation;
  onOpenLocationModal: (dishName?: string) => void;
}

interface TarotArchetype {
  id: string;
  romanNumeral: string;
  name: string;
  latin: string;
  subtitle: string;
  badge: string;
  astralSign: string;
  elementText: string;
  borderGlow: string;
  badgeColor: string;
  glowAura: string;
  sigilType: 'sun' | 'wheel' | 'magician' | 'emperor' | 'star' | 'hermit';
}

const TAROT_ARCHETYPES: TarotArchetype[] = [
  {
    id: 'the_sun',
    romanNumeral: 'XIX',
    name: 'Lá Mặt Trời',
    latin: 'The Sun',
    subtitle: 'Hào Quang No Đủ & Nhiệt Huyết',
    badge: 'Năng Lượng',
    astralSign: '☉',
    elementText: 'Thái Dương Quang',
    borderGlow: 'border-amber-400/50 group-hover:border-amber-300',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.55)]',
    sigilType: 'sun',
  },
  {
    id: 'wheel_of_fortune',
    romanNumeral: 'X',
    name: 'Vòng Định Mệnh',
    latin: 'Wheel of Fortune',
    subtitle: 'Cơ Duyên Ẩm Thực Khởi Sắc',
    badge: 'Duyên Phận',
    astralSign: '♃',
    elementText: 'Luân Hồi Mỹ Vị',
    borderGlow: 'border-purple-400/50 group-hover:border-purple-300',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.55)]',
    sigilType: 'wheel',
  },
  {
    id: 'the_magician',
    romanNumeral: 'I',
    name: 'Pháp Sư Vị Giác',
    latin: 'The Magician',
    subtitle: 'Vô Cực Biến Hóa Mỹ Vị',
    badge: 'Sáng Tạo',
    astralSign: '☿',
    elementText: 'Vô Cực Linh Khí',
    borderGlow: 'border-cyan-400/50 group-hover:border-cyan-300',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.55)]',
    sigilType: 'magician',
  },
  {
    id: 'the_emperor',
    romanNumeral: 'IV',
    name: 'Lá Hoàng Đế',
    latin: 'The Emperor',
    subtitle: 'Đại Tiệc Thịnh Soạn Vương Giả',
    badge: 'Vương Giả',
    astralSign: '♈',
    elementText: 'Vương Quyền Tối Thượng',
    borderGlow: 'border-rose-400/50 group-hover:border-rose-300',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(244,63,94,0.55)]',
    sigilType: 'emperor',
  },
  {
    id: 'the_star',
    romanNumeral: 'XVII',
    name: 'Ngôi Sao Hy Vọng',
    latin: 'The Star',
    subtitle: 'Thanh Lọc Cảm Xúc & Tươi Mát',
    badge: 'Chữa Lành',
    astralSign: '♒',
    elementText: 'Tinh Tú Dẫn Lối',
    borderGlow: 'border-emerald-400/50 group-hover:border-emerald-300',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.55)]',
    sigilType: 'star',
  },
  {
    id: 'the_hermit',
    romanNumeral: 'IX',
    name: 'Lá Ẩn Sĩ',
    latin: 'The Hermit',
    subtitle: 'Mỹ Vị Tĩnh Tại & Chiêm Nghiệm',
    badge: 'Tinh Hoa',
    astralSign: '♍',
    elementText: 'Ngọn Đèn Bát Nhã',
    borderGlow: 'border-indigo-400/50 group-hover:border-indigo-300',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(99,102,241,0.55)]',
    sigilType: 'hermit',
  },
];

const LOCAL_STORAGE_KEY = 'food_tarot_drawn_ids_v2';

interface RevealedTarotResult {
  archetype: TarotArchetype;
  dish: Dish;
  quote: string;
  luckyNumber: number;
  luckyHours: string;
  elementText: string;
  elementClass: string;
  drawOrder: number;
}

// Ornate golden corner filigree for Tarot cards
const TarotCornerFlourish: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const rotationClass = {
    tl: '',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={`w-3.5 h-3.5 text-amber-400/80 absolute z-20 pointer-events-none ${rotationClass} ${
        position.includes('t') ? 'top-1.5' : 'bottom-1.5'
      } ${position.includes('l') ? 'left-1.5' : 'right-1.5'}`}
    >
      <path
        d="M2 2H12C12 7.52285 7.52285 12 2 12V2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="rgba(245, 158, 11, 0.15)"
      />
      <circle cx="5" cy="5" r="1.2" fill="currentColor" />
      <path d="M2 18V22H6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 2H22V6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
};

// Esoteric Sacred Geometry Sigils for the 6 Major Arcana
const TarotSigilArt: React.FC<{ type: TarotArchetype['sigilType'] }> = ({ type }) => {
  switch (type) {
    case 'sun':
      return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          {/* Rotating celestial rays */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400/70" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              {/* 16 straight and wavy rays */}
              {[...Array(16)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 44 * Math.cos((i * Math.PI) / 8)}
                  y2={50 + 44 * Math.sin((i * Math.PI) / 8)}
                  stroke="currentColor"
                  strokeWidth={i % 2 === 0 ? '1.5' : '1'}
                  opacity={i % 2 === 0 ? '0.9' : '0.5'}
                />
              ))}
            </svg>
          </div>
          {/* Glowing Sun Core */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-200 p-[2px] shadow-[0_0_20px_rgba(245,158,11,0.8)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2a1708] to-[#120803] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-amber-400/20 blur-sm" />
              <svg viewBox="0 0 40 40" className="w-8 h-8 text-amber-300" fill="currentColor">
                {/* Mystic Sun Face */}
                <circle cx="20" cy="20" r="14" fill="#fbbf24" fillOpacity="0.25" stroke="#fcd34d" strokeWidth="1.2" />
                <path d="M15 17C15 17 16 19 18 19C20 19 21 17 21 17" stroke="#fcd34d" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M23 17C23 17 24 19 26 19C28 19 29 17 29 17" stroke="#fcd34d" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M20 18V22H22" stroke="#fcd34d" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M17 25C18 26.5 22 26.5 23 25" stroke="#fcd34d" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      );

    case 'wheel':
      return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          {/* Rotating Rota Fortunae */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-purple-300/80" fill="none">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              {/* 8 spokes */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 45 * Math.cos((i * Math.PI) / 4)}
                  y2={50 + 45 * Math.sin((i * Math.PI) / 4)}
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              ))}
              {/* Mystic markers */}
              <text x="50" y="14" fill="#d8b4fe" fontSize="7" fontWeight="bold" textAnchor="middle">T</text>
              <text x="86" y="52" fill="#d8b4fe" fontSize="7" fontWeight="bold" textAnchor="middle">A</text>
              <text x="50" y="90" fill="#d8b4fe" fontSize="7" fontWeight="bold" textAnchor="middle">R</text>
              <text x="14" y="52" fill="#d8b4fe" fontSize="7" fontWeight="bold" textAnchor="middle">O</text>
            </svg>
          </div>
          {/* Inner Alchemical Hub */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-[2px] shadow-[0_0_20px_rgba(168,85,247,0.8)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#1e0d38] flex items-center justify-center">
              <Compass className="w-6 h-6 text-purple-200 animate-tarot-spin-rev" />
            </div>
          </div>
        </div>
      );

    case 'magician':
      return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          {/* Sacred Transmutation Geometry */}
          <div className="absolute inset-0 animate-tarot-spin-rev">
            <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-300/80" fill="none">
              <polygon points="50,6 90,80 10,80" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
              <polygon points="50,94 10,20 90,20" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7" />
              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
            </svg>
          </div>
          {/* Glowing Infinity Lemniscate */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.8)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#051c2c] flex items-center justify-center">
              <span className="text-2xl font-serif text-cyan-200 font-bold leading-none select-none drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]">
                ∞
              </span>
            </div>
          </div>
        </div>
      );

    case 'emperor':
      return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          {/* Imperial Solar Crest */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-rose-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 4" />
              <polygon points="50,8 62,38 94,38 68,58 78,88 50,70 22,88 32,58 6,38 38,38" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
            </svg>
          </div>
          {/* Imperial Crown Core */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 p-[2px] shadow-[0_0_20px_rgba(244,63,94,0.8)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#2a0812] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-rose-200" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 19H22V21H2V19Z" fill="currentColor" />
                <path d="M5 19L3 8L8 12L12 5L16 12L21 8L19 19H5Z" fill="currentColor" fillOpacity="0.4" strokeLinejoin="round" />
                <circle cx="3" cy="7" r="1.5" fill="#fecdd3" />
                <circle cx="12" cy="4" r="1.8" fill="#fecdd3" />
                <circle cx="21" cy="7" r="1.5" fill="#fecdd3" />
              </svg>
            </div>
          </div>
        </div>
      );

    case 'star':
      return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          {/* 8-pointed Sirius guiding star */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-300/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" />
              {/* 8-pointed Octagram */}
              <polygon points="50,6 60,38 94,38 66,58 76,92 50,72 24,92 34,58 6,38 40,38" fill="rgba(16, 185, 129, 0.15)" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
          {/* Central Sirius Star Glow */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shadow-[0_0_20px_rgba(16,185,129,0.8)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#06241b] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-200 animate-pulse" />
            </div>
          </div>
        </div>
      );

    case 'hermit':
      return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          {/* Star of Solomon in Cosmos */}
          <div className="absolute inset-0 animate-tarot-spin-rev">
            <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-300/80" fill="none">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <polygon points="50,12 83,68 17,68" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
              <polygon points="50,88 17,32 83,32" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
            </svg>
          </div>
          {/* Mystic Hexagonal Lantern */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 p-[2px] shadow-[0_0_20px_rgba(99,102,241,0.8)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#110d29] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-amber-200" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2V5M8 5H16L17 10L14 18H10L7 10L8 5Z" stroke="currentColor" fill="#fbbf24" fillOpacity="0.3" strokeLinejoin="round" />
                <path d="M10 18H14V21H10V18Z" fill="currentColor" />
                <circle cx="12" cy="11" r="2" fill="#fef08a" />
              </svg>
            </div>
          </div>
        </div>
      );
  }
};

function getTarotQuote(dish: Dish): string {
  const name = dish.vietnameseName || dish.name;
  switch (dish.category) {
    case 'com_xoi':
      return `"Vũ trụ nhìn thấu bạn đang cần một nguồn năng lượng vững chãi, chắc dạ để bứt phá. Một phần ${name} thơm nức hạt ngọc trời chính là chiếc neo định mệnh của bạn hôm nay!"`;
    case 'bun_pho_mi':
      return `"Tâm hồn bạn đang khao khát được vỗ về bởi dòng nước dùng nóng hổi thanh ngọt. Hãy để một tô ${name} bốc khói xoa dịu mọi áp lực và cứu rỗi ngày hôm nay!"`;
    case 'banhmi_cuon':
      return `"Sự giòn tan và năng lượng bùng nổ đang vẫy gọi bạn! Một phần ${name} đậm đà sốt cay sẽ đánh thức 100% sự hào hứng và tinh thần sảng khoái."`;
    case 'nuong_chien':
      return `"Ngọn lửa nhiệt huyết trong bạn đang bốc cao. Cuộc đời quá ngắn để ăn món tẻ nhạt, hãy chiều chuộng bản thân với ${name} xèo xèo thơm ngậy khó cưỡng!"`;
    case 'lau_chao':
      return `"Lá bài tụ hội và sẻ chia xuất hiện. Một nồi ${name} nghi ngút khói hoặc tô cháo nóng hổi ấm bụng sẽ xua tan mọi mệt mỏi và mang lại sự an yên tròn đầy."`;
    case 'salad_monnhe':
      return `"Vũ trụ gửi lời nhắc nhở: Hãy lắng nghe cơ thể với một phần ${name} tươi mát, dồi dào vitamin, vừa giữ dáng nhẹ bụng vừa tràn ngập sinh khí tích cực!"`;
    case 'pizza_pasta':
      return `"Phong vị Âu Mỹ phóng khoáng sẽ mở khóa nguồn cảm hứng sáng tạo bất tận. Thưởng thức ${name} đậm vị phô mai để nâng tầm trải nghiệm ngày hôm nay!"`;
    case 'do_chay':
      return `"Tâm an vạn sự an. Vị ngọt thanh khiết tự nhiên của ${name} mang đến phước lành, sự thư thái sâu thẳm và năng lượng thanh lọc tuyệt đối."`;
    default:
      return `"Các vì sao đã hội tụ và chỉ lối: Hôm nay ${name} chính là chân ái ẩm thực mang lại may mắn, no ấm và niềm vui trọn vẹn cho bạn!"`;
  }
}

function getDishCosmicInfo(dish: Dish): { elementText: string; elementClass: string; luckyHours: string } {
  if (['nuong_chien', 'pizza_pasta'].includes(dish.category)) {
    return {
      elementText: 'Hỏa Tinh (Nhiệt Huyết & Quyết Đoán)',
      elementClass: 'text-rose-700 bg-rose-50 border-rose-200',
      luckyHours: '11:30 - 13:30 hoặc 18:30 - 21:00',
    };
  }
  if (['bun_pho_mi', 'lau_chao'].includes(dish.category)) {
    return {
      elementText: 'Thủy Tinh (Mềm Mại & Chữa Lành)',
      elementClass: 'text-sky-700 bg-sky-50 border-sky-200',
      luckyHours: '07:00 - 09:00 hoặc 17:30 - 20:30',
    };
  }
  if (['com_xoi'].includes(dish.category)) {
    return {
      elementText: 'Thổ Tinh (Vững Chãi & Tràn Đầy)',
      elementClass: 'text-amber-800 bg-amber-50 border-amber-200',
      luckyHours: '11:00 - 13:00',
    };
  }
  if (['salad_monnhe', 'do_chay'].includes(dish.category)) {
    return {
      elementText: 'Mộc Tinh (Tươi Trẻ & Tái Sinh)',
      elementClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      luckyHours: '11:30 - 14:00 hoặc 17:00 - 19:30',
    };
  }
  return {
    elementText: 'Kim Tinh (Sắc Sảo & Giòn Rụm)',
    elementClass: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    luckyHours: '07:00 - 09:30 hoặc 15:00 - 17:30',
  };
}

export const FoodTarot: React.FC<FoodTarotProps> = ({
  affiliateConfig,
  onSelectDish,
  userLocation,
  onOpenLocationModal,
}) => {
  const [drawnDishIds, setDrawnDishIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [revealedResult, setRevealedResult] = useState<RevealedTarotResult | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [justRecycled, setJustRecycled] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drawnDishIds));
    } catch {
      // storage error
    }
  }, [drawnDishIds]);

  const drawNextUniqueDish = (archetype?: TarotArchetype) => {
    if (isFlipping) return;
    setIsFlipping(true);

    const chosenArchetype =
      archetype ||
      TAROT_ARCHETYPES[Math.floor(Math.random() * TAROT_ARCHETYPES.length)];

    let pool = INITIAL_DISHES.filter((d) => !drawnDishIds.includes(d.id));
    let recycled = false;

    if (pool.length === 0) {
      pool = [...INITIAL_DISHES];
      recycled = true;
      setJustRecycled(true);
      setTimeout(() => setJustRecycled(false), 4000);
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const selectedDish = pool[randomIndex];

    const newDrawnIds = recycled ? [selectedDish.id] : [...drawnDishIds, selectedDish.id];
    setDrawnDishIds(newDrawnIds);

    const cosmicInfo = getDishCosmicInfo(selectedDish);
    const luckyNum = Math.floor(Math.random() * 99) + 1;
    const quote = getTarotQuote(selectedDish);

    const newResult: RevealedTarotResult = {
      archetype: chosenArchetype,
      dish: selectedDish,
      quote,
      luckyNumber: luckyNum,
      luckyHours: cosmicInfo.luckyHours,
      elementText: cosmicInfo.elementText,
      elementClass: cosmicInfo.elementClass,
      drawOrder: newDrawnIds.length,
    };

    setTimeout(() => {
      setRevealedResult(newResult);
      setIsFlipping(false);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#6366F1', '#EC4899', '#10B981', '#3B82F6'],
      });
    }, 450);
  };

  const handleResetCycle = () => {
    setDrawnDishIds([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
    setRevealedResult(null);
  };

  const remainingCount = Math.max(0, INITIAL_DISHES.length - drawnDishIds.length);

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-amber-300 text-xs font-bold mb-3 shadow-lg border border-amber-400/40">
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          TAROT ẨM THỰC VIỆT NAM • LỤC ĐẠI QUẺ BÀI ARCANA
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
          Hôm nay <span className="text-indigo-600 bg-clip-text">Vũ Trụ</span> mách bạn ăn gì?
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Lật mở một lá bài Tarot bất kỳ để tiếp nhận lời tiên tri vị giác. Mỗi quẻ là một món ăn duy nhất — tuyệt đối không trùng lặp!
        </p>

        {/* Counter & Status Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold border border-stone-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Đã mở: <strong className="text-stone-900">{drawnDishIds.length}</strong> / {INITIAL_DISHES.length} món
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Còn lại: <strong>{remainingCount}</strong> món chưa lật
          </div>

          {drawnDishIds.length > 0 && (
            <button
              onClick={handleResetCycle}
              title="Xóa lịch sử và bắt đầu lại chu kỳ mới"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Làm mới chu kỳ
            </button>
          )}
        </div>

        {justRecycled && (
          <div className="mt-3 inline-block px-4 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold animate-bounce">
            🎉 Bạn đã khám phá hết toàn bộ thực đơn! Vũ trụ vừa làm mới vòng quay cho bạn.
          </div>
        )}
      </div>

      {/* State 1: Deck of 6 Mystical Arcana Cards */}
      {!revealedResult ? (
        <div>
          <div className="text-center mb-5">
            <span className="text-xs font-bold text-indigo-950 uppercase tracking-widest flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Chọn 1 lá bài bạn cảm thấy gắn kết tâm linh nhất để khai quẻ:
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </span>
          </div>

          {/* 6 Majestic Mystical Tarot Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-8">
            {TAROT_ARCHETYPES.map((arc) => {
              return (
                <button
                  key={arc.id}
                  disabled={isFlipping}
                  onClick={() => drawNextUniqueDish(arc)}
                  className={`group relative aspect-[1/1.78] rounded-2xl bg-gradient-to-b from-[#180f33] via-[#0b081d] to-[#140b28] p-3 flex flex-col items-center justify-between border-2 ${arc.borderGlow} ${arc.glowAura} hover:-translate-y-2.5 hover:scale-[1.03] transition-all duration-500 shadow-xl cursor-pointer overflow-hidden text-center select-none ${
                    isFlipping ? 'opacity-50 pointer-events-none scale-95' : ''
                  }`}
                >
                  {/* Subtle Shimmer Sweeper on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-amber-300/15 to-transparent pointer-events-none" />

                  {/* 4 Antique Ornate Gold Corners */}
                  <TarotCornerFlourish position="tl" />
                  <TarotCornerFlourish position="tr" />
                  <TarotCornerFlourish position="bl" />
                  <TarotCornerFlourish position="br" />

                  {/* Secondary Inset Gold Hairline Frame */}
                  <div className="absolute inset-1.5 rounded-xl border border-amber-400/25 pointer-events-none" />
                  <div className="absolute inset-2 rounded-lg border border-dashed border-amber-500/15 pointer-events-none" />

                  {/* Top Tarot Cartouche: Roman Numeral & Astral Glyph */}
                  <div className="w-full relative z-10 pt-1 flex items-center justify-between px-1">
                    <span className="text-[10px] font-serif font-black tracking-widest text-amber-300 drop-shadow">
                      ✦ {arc.romanNumeral} ✦
                    </span>
                    <span className="text-xs text-amber-300/90 font-mono font-bold">
                      {arc.astralSign}
                    </span>
                  </div>

                  {/* Center Sacred Geometry Arcana Sigil with Gothic Arch Frame */}
                  <div className="my-auto relative z-10 flex flex-col items-center justify-center py-2 w-full">
                    {/* Arch Backdrop glow */}
                    <div className="relative p-1.5 rounded-2xl bg-gradient-to-b from-amber-400/10 via-purple-500/10 to-transparent border border-amber-400/30 group-hover:border-amber-300/60 transition-colors shadow-inner">
                      <TarotSigilArt type={arc.sigilType} />
                    </div>

                    {/* Tarot Card Title Plate */}
                    <div className="mt-2.5 px-1">
                      <div className="text-xs sm:text-[13px] font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-wide leading-tight drop-shadow font-serif">
                        {arc.name}
                      </div>
                      <div className="text-[9px] text-amber-300/80 font-serif italic tracking-wider line-clamp-1 mt-0.5">
                        {arc.latin}
                      </div>
                      <div className="text-[8.5px] text-indigo-200/70 line-clamp-1 mt-0.5 font-medium">
                        {arc.subtitle.split('&')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Prompt Ribbon */}
                  <div className="w-full relative z-10 pt-1.5 pb-0.5 border-t border-amber-400/25">
                    <div className="text-[10px] font-bold text-amber-300 group-hover:text-amber-200 flex items-center justify-center gap-1 font-serif tracking-wider">
                      <Sparkles className="w-3 h-3 text-amber-400 group-hover:animate-spin-slow" />
                      Khai Mở Quẻ
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mystical Tarot Pact Banner & Celestial Draw Action */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 border-2 border-amber-400/40 shadow-2xl p-4 sm:p-5 max-w-3xl mx-auto my-6 text-white group">
            {/* Ambient Celestial Glows */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Mystical Prophecy Lore */}
              <div className="flex items-start gap-3.5 text-left">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400/20 to-purple-500/20 border border-amber-300/40 flex items-center justify-center text-amber-300 shadow-inner shrink-0 mt-0.5">
                  <Wand2 className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 flex items-center gap-1.5 font-serif">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Khế Ước Vị Giác & Thiên Duyên Kỳ Bí
                    </span>
                    <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200 font-medium">
                      Bất Trùng Lặp
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-indigo-100/90 leading-relaxed max-w-xl font-medium">
                    Thiên hà quy tụ hơn <strong className="text-amber-300 font-extrabold">{INITIAL_DISHES.length} phong vị trần gian</strong>. Mỗi quẻ bài khai mở là một chỉ dẫn duy nhất từ các vì sao — <span className="text-amber-200 underline decoration-amber-400/50 underline-offset-2">tuyệt đối không trùng lặp</span> trong suốt chu kỳ luân chuyển định mệnh!
                  </p>
                </div>
              </div>

              {/* Enchanted Celestial Draw Button */}
              <button
                onClick={() => drawNextUniqueDish()}
                disabled={isFlipping}
                className={`relative shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:via-amber-400 hover:to-yellow-300 text-stone-950 font-black text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.45)] hover:shadow-[0_0_35px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 cursor-pointer border border-amber-200/80 overflow-hidden ${
                  isFlipping ? 'opacity-60 pointer-events-none' : ''
                }`}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent transform" />
                
                <div className="w-6 h-6 rounded-lg bg-stone-950/15 flex items-center justify-center">
                  <Dice5 className="w-4 h-4 text-stone-950" />
                </div>
                <span className="drop-shadow-sm uppercase font-serif">Khai Quẻ Định Mệnh</span>
                <Sparkles className="w-3.5 h-3.5 text-stone-950 animate-spin-slow" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* State 2: Revealed Non-Duplicate Tarot Card */
        <div className="max-w-xl mx-auto animate-fade-in">
          <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-2xl overflow-hidden text-center relative">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 p-4 sm:p-5 text-white flex items-center justify-between border-b border-indigo-500/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider font-serif">
                    {revealedResult.archetype.romanNumeral} • {revealedResult.archetype.latin} • QUẺ SỐ #{revealedResult.drawOrder}
                  </div>
                  <div className="text-base font-extrabold text-white font-serif">
                    {revealedResult.archetype.name}
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Món mới 100%
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Dish Photo & Basic Info */}
              <div className="relative mb-6 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-md group">
                <img
                  src={revealedResult.dish.image}
                  alt={revealedResult.dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-left text-white">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[11px] font-extrabold w-fit mb-1 shadow font-serif">
                    <Flame className="w-3 h-3 text-red-600 fill-red-600" />
                    MÓN VŨ TRỤ CHỈ ĐỊNH
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black drop-shadow leading-tight">
                    {revealedResult.dish.vietnameseName || revealedResult.dish.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-stone-200 mt-1">
                    <span>{revealedResult.dish.calories}</span>
                    <span>•</span>
                    <span className="font-bold text-amber-300">
                      {formatVND(revealedResult.dish.estimatedPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mystical Prophecy Quote */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-indigo-950 italic text-sm sm:text-base leading-relaxed mb-6 relative">
                <div className="text-xs uppercase font-extrabold text-indigo-600 tracking-wider not-italic mb-1 flex items-center justify-center gap-1 font-serif">
                  <Compass className="w-3.5 h-3.5" />
                  Lời Tiên Tri Vị Giác
                </div>
                {revealedResult.quote}
              </div>

              {/* Cosmic Stats (Lucky number, Hour, Element) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-center">
                  <div className="text-[10px] uppercase font-bold text-amber-700 font-serif">Con Số May Mắn</div>
                  <div className="text-lg sm:text-xl font-black text-amber-900">
                    #{revealedResult.luckyNumber}
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                  <div className="text-[10px] uppercase font-bold text-stone-500 font-serif">Giờ Hoàng Đạo</div>
                  <div className="text-xs sm:text-sm font-extrabold text-stone-800 line-clamp-1 mt-0.5">
                    {revealedResult.luckyHours}
                  </div>
                </div>

                <div className={`p-3 rounded-2xl border text-center ${revealedResult.elementClass}`}>
                  <div className="text-[10px] uppercase font-bold font-serif">Trường Năng Lượng</div>
                  <div className="text-xs sm:text-sm font-extrabold line-clamp-1 mt-0.5">
                    {revealedResult.elementText.split('(')[0]}
                  </div>
                </div>
              </div>

              {/* Order Buttons */}
              <div className="pt-4 border-t border-stone-200 mb-5">
                <div className="mb-3 max-w-md mx-auto">
                  <DeliveryLocationBadge
                    location={userLocation}
                    onClick={() => onOpenLocationModal(revealedResult.dish.name)}
                    variant="card"
                  />
                </div>

                <div className="text-xs font-black text-stone-800 mb-3 flex items-center justify-center gap-1.5 font-serif">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span>Bấm nút để chuyển qua app tìm kiếm <strong>"{revealedResult.dish.name}"</strong>:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink('shopeefood', revealedResult.dish, affiliateConfig, userLocation)
                    }
                    title={`Chuyển qua ShopeeFood tìm ${revealedResult.dish.name} (${userLocation.city})`}
                    className="py-3 px-3 rounded-2xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>ShopeeFood</span>
                  </button>

                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink('grabfood', revealedResult.dish, affiliateConfig, userLocation)
                    }
                    title={`Chuyển qua GrabFood định vị quán ${revealedResult.dish.name} gần bạn`}
                    className="py-3 px-3 rounded-2xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>GrabFood</span>
                  </button>

                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink('befood', revealedResult.dish, affiliateConfig, userLocation)
                    }
                    title={`Chuyển qua BeFood tìm ${revealedResult.dish.name} (${userLocation.city})`}
                    className="py-3 px-3 rounded-2xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>BeFood</span>
                  </button>
                </div>
              </div>

              {/* Secondary Navigation Buttons: Switch to another unique dish OR return to deck */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  disabled={isFlipping}
                  onClick={() => drawNextUniqueDish()}
                  className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 hover:from-indigo-800 hover:via-purple-800 hover:to-indigo-900 text-amber-300 border border-amber-400/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-indigo-500/25 cursor-pointer hover:scale-[1.02] font-serif"
                >
                  <RefreshCw className={`w-4 h-4 text-amber-300 ${isFlipping ? 'animate-spin' : ''}`} />
                  Khai quẻ món khác (Bất trùng lặp)
                </button>

                {onSelectDish && (
                  <button
                    onClick={() => onSelectDish(revealedResult.dish)}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-stone-600" />
                    Xem chi tiết món
                  </button>
                )}

                <button
                  onClick={() => setRevealedResult(null)}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-600 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Rút từ bộ bài
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
