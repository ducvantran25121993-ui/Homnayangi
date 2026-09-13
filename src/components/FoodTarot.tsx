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
  Volume2,
  VolumeX,
  Scroll,
  Shield,
  MapPin,
  Sparkle,
} from 'lucide-react';
import { INITIAL_DISHES } from '../data/dishes';
import { Dish, AffiliateConfig, UserLocation } from '../types';
import { trackAndOpenAffiliateLink, formatVND } from '../utils/affiliate';
import { formatLocationDisplay } from '../utils/location';
import { DeliveryLocationBadge } from './DeliveryLocationBadge';
import { tarotAudio } from '../utils/tarotSound';
import { FoodAmuletModal, FoodAmuletData } from './FoodAmuletModal';
import { TarotSigilArt } from './TarotSigilArt';
import confetti from 'canvas-confetti';

interface FoodTarotProps {
  affiliateConfig: AffiliateConfig;
  onSelectDish?: (dish: Dish) => void;
  userLocation: UserLocation;
  onOpenLocationModal: (dishName?: string) => void;
}

export interface TarotArchetype {
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
  sigilType:
    | 'sun'
    | 'wheel'
    | 'magician'
    | 'emperor'
    | 'star'
    | 'hermit'
    | 'lovers'
    | 'high_priestess'
    | 'empress'
    | 'chariot'
    | 'strength'
    | 'world';
  cardBg: string;
  archBg: string;
  archBorder: string;
  accentText: string;
}

export interface ZodiacSign {
  id: string;
  name: string;
  latin: string;
  symbol: string;
  element: 'Hỏa' | 'Thủy' | 'Khí' | 'Thổ' | 'Vũ Trụ';
  cravingDesc: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'all', name: 'Toàn Thể Vũ Trụ', latin: 'Cosmos', symbol: '🌌', element: 'Vũ Trụ', cravingDesc: 'Đón nhận vạn sắc thái mỹ vị nhân gian' },
  { id: 'aries', name: 'Bạch Dương', latin: 'Aries', symbol: '♈', element: 'Hỏa', cravingDesc: 'Thèm vị cay giòn, bốc lửa tiếp thêm sinh lực bứt phá' },
  { id: 'taurus', name: 'Kim Ngưu', latin: 'Taurus', symbol: '♉', element: 'Thổ', cravingDesc: 'Chuộng món đậm đà, thịt thà đẫm sốt, no nê sung túc' },
  { id: 'gemini', name: 'Song Tử', latin: 'Gemini', symbol: '♊', element: 'Khí', cravingDesc: 'Ưa nhiều topping, biến tấu vui nhộn, ăn hoài không ngán' },
  { id: 'cancer', name: 'Cự Giải', latin: 'Cancer', symbol: '♋', element: 'Thủy', cravingDesc: 'Cần nước dùng ngọt thanh, ấm áp vỗ về tâm can' },
  { id: 'leo', name: 'Sư Tử', latin: 'Leo', symbol: '♌', element: 'Hỏa', cravingDesc: 'Đại tiệc nướng vàng ươm, hoành tráng xứng tầm vương giả' },
  { id: 'virgo', name: 'Xử Nữ', latin: 'Virgo', symbol: '♍', element: 'Thổ', cravingDesc: 'Món thanh sạch chuẩn vị, hài hòa dưỡng chất và tinh tế' },
  { id: 'libra', name: 'Thiên Bình', latin: 'Libra', symbol: '♎', element: 'Khí', cravingDesc: 'Trình bày đẹp mắt, cân bằng chua cay mặn ngọt hoàn mỹ' },
  { id: 'scorpio', name: 'Bọ Cạp', latin: 'Scorpio', symbol: '♏', element: 'Thủy', cravingDesc: 'Hương vị bí ẩn, đậm sâu cuốn hút, cay tê tái càng ăn càng mê' },
  { id: 'sagittarius', name: 'Nhân Mã', latin: 'Sagittarius', symbol: '♐', element: 'Hỏa', cravingDesc: 'Phiêu lưu phong vị mới mẻ, đường phố độc lạ' },
  { id: 'capricorn', name: 'Ma Kết', latin: 'Capricorn', symbol: '♑', element: 'Thổ', cravingDesc: 'Cơm niêu, món kho truyền thống gia truyền vững bụng' },
  { id: 'aquarius', name: 'Bảo Bình', latin: 'Aquarius', symbol: '♒', element: 'Khí', cravingDesc: 'Món fusion phá cách ngoài khuôn khổ thường nhật' },
  { id: 'pisces', name: 'Song Ngư', latin: 'Pisces', symbol: '♓', element: 'Thủy', cravingDesc: 'Hải sản tươi rói, món nước êm dịu cuốn trôi muộn phiền' },
];

export const ZODIAC_ELEMENT_CONFIG: Record<
  ZodiacSign['element'],
  {
    name: string;
    icon: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    buttonInactive: string;
    buttonActive: string;
    glowShadow: string;
    symbolColor: string;
  }
> = {
  'Hỏa': {
    name: 'Hỏa',
    icon: '🔥',
    badgeBg: 'bg-rose-950/60',
    badgeText: 'text-rose-300',
    badgeBorder: 'border-rose-500/40',
    buttonInactive: 'from-[#20070d]/85 via-[#130308]/95 to-[#260811]/90 border-rose-900/40 hover:border-rose-400/80 text-rose-100/90 hover:text-white',
    buttonActive: 'from-[#651022] via-[#3a0812] to-[#80142b] border-rose-400 ring-2 ring-rose-400/50 text-white',
    glowShadow: 'shadow-[0_0_22px_rgba(244,63,94,0.55)]',
    symbolColor: 'text-rose-400 group-hover:text-rose-300',
  },
  'Thổ': {
    name: 'Thổ',
    icon: '🌿',
    badgeBg: 'bg-emerald-950/60',
    badgeText: 'text-emerald-300',
    badgeBorder: 'border-emerald-500/40',
    buttonInactive: 'from-[#071c14]/85 via-[#03110c]/95 to-[#0a271c]/90 border-emerald-900/40 hover:border-emerald-400/80 text-emerald-100/90 hover:text-white',
    buttonActive: 'from-[#0d4f37] via-[#072f21] to-[#126848] border-emerald-400 ring-2 ring-emerald-400/50 text-white',
    glowShadow: 'shadow-[0_0_22px_rgba(16,185,129,0.55)]',
    symbolColor: 'text-emerald-400 group-hover:text-emerald-300',
  },
  'Khí': {
    name: 'Khí',
    icon: '🌪️',
    badgeBg: 'bg-cyan-950/60',
    badgeText: 'text-cyan-300',
    badgeBorder: 'border-cyan-500/40',
    buttonInactive: 'from-[#081b26]/85 via-[#030f16]/95 to-[#0c2535]/90 border-cyan-900/40 hover:border-cyan-400/80 text-cyan-100/90 hover:text-white',
    buttonActive: 'from-[#0d4663] via-[#072a3c] to-[#135d84] border-cyan-400 ring-2 ring-cyan-400/50 text-white',
    glowShadow: 'shadow-[0_0_22px_rgba(6,182,212,0.55)]',
    symbolColor: 'text-cyan-400 group-hover:text-cyan-300',
  },
  'Thủy': {
    name: 'Thủy',
    icon: '🌊',
    badgeBg: 'bg-blue-950/60',
    badgeText: 'text-blue-300',
    badgeBorder: 'border-blue-500/40',
    buttonInactive: 'from-[#0b1333]/85 via-[#050b1f]/95 to-[#101b47]/90 border-blue-900/40 hover:border-blue-400/80 text-blue-100/90 hover:text-white',
    buttonActive: 'from-[#1a2c7a] via-[#0f1b4c] to-[#253fae] border-blue-400 ring-2 ring-blue-400/50 text-white',
    glowShadow: 'shadow-[0_0_22px_rgba(99,102,241,0.55)]',
    symbolColor: 'text-blue-400 group-hover:text-blue-300',
  },
  'Vũ Trụ': {
    name: 'Vũ Trụ',
    icon: '🌌',
    badgeBg: 'bg-purple-950/60',
    badgeText: 'text-amber-300',
    badgeBorder: 'border-amber-400/40',
    buttonInactive: 'from-[#21093f]/90 via-[#100322]/95 to-[#330d61]/90 border-purple-700/50 hover:border-amber-400/80 text-purple-100 hover:text-white',
    buttonActive: 'from-[#42127d] via-[#240846] to-[#5b19ab] border-amber-300 ring-2 ring-amber-400/60 text-white',
    glowShadow: 'shadow-[0_0_28px_rgba(245,158,11,0.55)]',
    symbolColor: 'text-amber-300',
  },
};

export const TAROT_ARCHETYPES: TarotArchetype[] = [
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
    cardBg: 'from-[#081829] via-[#040f1a] to-[#0a2036]',
    archBg: 'bg-gradient-to-b from-cyan-500/20 via-blue-950/40 to-black/70',
    archBorder: 'border-cyan-400/40 group-hover:border-cyan-300/80 shadow-[inset_0_0_20px_rgba(6,182,212,0.25)]',
    accentText: 'text-cyan-300',
  },
  {
    id: 'the_high_priestess',
    romanNumeral: 'II',
    name: 'Nữ Đại Tế Mỹ Vị',
    latin: 'The High Priestess',
    subtitle: 'Trực Giác Thanh Khiết & Tinh Tế',
    badge: 'Thanh Khiết',
    astralSign: '☽',
    elementText: 'Huyền Nguyệt Thủy',
    borderGlow: 'border-blue-400/50 group-hover:border-blue-300',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.55)]',
    sigilType: 'high_priestess',
    cardBg: 'from-[#0a1236] via-[#050a22] to-[#0e1747]',
    archBg: 'bg-gradient-to-b from-blue-500/20 via-indigo-950/40 to-black/70',
    archBorder: 'border-blue-400/40 group-hover:border-blue-300/80 shadow-[inset_0_0_20px_rgba(59,130,246,0.25)]',
    accentText: 'text-blue-300',
  },
  {
    id: 'the_empress',
    romanNumeral: 'III',
    name: 'Hoàng Hậu Phong Vị',
    latin: 'The Empress',
    subtitle: 'Đất Mẹ Màu Mỡ & Đậm Đà',
    badge: 'Trù Phú',
    astralSign: '♀',
    elementText: 'Địa Mẫu Phồn Vinh',
    borderGlow: 'border-emerald-400/50 group-hover:border-emerald-300',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.55)]',
    sigilType: 'empress',
    cardBg: 'from-[#06241b] via-[#031711] to-[#093326]',
    archBg: 'bg-gradient-to-b from-emerald-500/20 via-teal-950/40 to-black/70',
    archBorder: 'border-emerald-400/40 group-hover:border-emerald-300/80 shadow-[inset_0_0_20px_rgba(16,185,129,0.25)]',
    accentText: 'text-emerald-300',
  },
  {
    id: 'the_emperor',
    romanNumeral: 'IV',
    name: 'Hoàng Đế Vương Quyền',
    latin: 'The Emperor',
    subtitle: 'Đại Tiệc Thịnh Soạn Vương Giả',
    badge: 'Vương Giả',
    astralSign: '♈',
    elementText: 'Vương Quyền Tối Thượng',
    borderGlow: 'border-rose-400/50 group-hover:border-rose-300',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(244,63,94,0.55)]',
    sigilType: 'emperor',
    cardBg: 'from-[#290812] via-[#17030a] to-[#380b19]',
    archBg: 'bg-gradient-to-b from-rose-500/20 via-red-950/40 to-black/70',
    archBorder: 'border-rose-400/40 group-hover:border-rose-300/80 shadow-[inset_0_0_20px_rgba(244,63,94,0.25)]',
    accentText: 'text-rose-300',
  },
  {
    id: 'the_lovers',
    romanNumeral: 'VI',
    name: 'Đôi Uyên Ương Mỹ Vị',
    latin: 'The Lovers',
    subtitle: 'Hòa Hợp Hương Vị Đỉnh Cao',
    badge: 'Gắn Kết',
    astralSign: '♊',
    elementText: 'Giao Thoa Tình Duyên',
    borderGlow: 'border-pink-400/50 group-hover:border-pink-300',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(236,72,153,0.55)]',
    sigilType: 'lovers',
    cardBg: 'from-[#290820] via-[#170313] to-[#380b2c]',
    archBg: 'bg-gradient-to-b from-pink-500/20 via-fuchsia-950/40 to-black/70',
    archBorder: 'border-pink-400/40 group-hover:border-pink-300/80 shadow-[inset_0_0_20px_rgba(236,72,153,0.25)]',
    accentText: 'text-pink-300',
  },
  {
    id: 'the_chariot',
    romanNumeral: 'VII',
    name: 'Cỗ Xe Chiến Thắng',
    latin: 'The Chariot',
    subtitle: 'Bứt Phá Năng Lượng Thần Tốc',
    badge: 'Tiến Công',
    astralSign: '♋',
    elementText: 'Chiến Xa Hỏa Lực',
    borderGlow: 'border-orange-400/50 group-hover:border-orange-300',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.55)]',
    sigilType: 'chariot',
    cardBg: 'from-[#291304] via-[#170a02] to-[#381a06]',
    archBg: 'bg-gradient-to-b from-orange-500/20 via-amber-950/40 to-black/70',
    archBorder: 'border-orange-400/40 group-hover:border-orange-300/80 shadow-[inset_0_0_20px_rgba(249,115,22,0.25)]',
    accentText: 'text-orange-300',
  },
  {
    id: 'the_strength',
    romanNumeral: 'VIII',
    name: 'Sức Mạnh Bất Phàm',
    latin: 'Strength',
    subtitle: 'Cường Tráng Dồi Dào Sinh Lực',
    badge: 'Sinh Lực',
    astralSign: '♌',
    elementText: 'Dũng Khí Bất Diệt',
    borderGlow: 'border-yellow-400/50 group-hover:border-yellow-300',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(234,179,8,0.55)]',
    sigilType: 'strength',
    cardBg: 'from-[#291c04] via-[#170f02] to-[#382606]',
    archBg: 'bg-gradient-to-b from-yellow-500/20 via-amber-950/40 to-black/70',
    archBorder: 'border-yellow-400/40 group-hover:border-yellow-300/80 shadow-[inset_0_0_20px_rgba(234,179,8,0.25)]',
    accentText: 'text-yellow-300',
  },
  {
    id: 'the_hermit',
    romanNumeral: 'IX',
    name: 'Ẩn Sĩ Vị Giác',
    latin: 'The Hermit',
    subtitle: 'Mỹ Vị Tĩnh Tại & Chiêm Nghiệm',
    badge: 'Tinh Hoa',
    astralSign: '♍',
    elementText: 'Ngọn Đèn Bát Nhã',
    borderGlow: 'border-indigo-400/50 group-hover:border-indigo-300',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(99,102,241,0.55)]',
    sigilType: 'hermit',
    cardBg: 'from-[#0d0f30] via-[#06081f] to-[#131642]',
    archBg: 'bg-gradient-to-b from-indigo-500/20 via-violet-950/40 to-black/70',
    archBorder: 'border-indigo-400/40 group-hover:border-indigo-300/80 shadow-[inset_0_0_20px_rgba(99,102,241,0.25)]',
    accentText: 'text-indigo-300',
  },
  {
    id: 'the_wheel_of_fortune',
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
    cardBg: 'from-[#1f0b36] via-[#110520] to-[#2b0f4a]',
    archBg: 'bg-gradient-to-b from-purple-500/20 via-fuchsia-950/40 to-black/70',
    archBorder: 'border-purple-400/40 group-hover:border-purple-300/80 shadow-[inset_0_0_20px_rgba(168,85,247,0.25)]',
    accentText: 'text-purple-300',
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
    borderGlow: 'border-teal-400/50 group-hover:border-teal-300',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(20,184,166,0.55)]',
    sigilType: 'star',
    cardBg: 'from-[#052424] via-[#021616] to-[#073030]',
    archBg: 'bg-gradient-to-b from-teal-500/20 via-cyan-950/40 to-black/70',
    archBorder: 'border-teal-400/40 group-hover:border-teal-300/80 shadow-[inset_0_0_20px_rgba(20,184,166,0.25)]',
    accentText: 'text-teal-300',
  },
  {
    id: 'the_sun',
    romanNumeral: 'XIX',
    name: 'Thái Dương Quang',
    latin: 'The Sun',
    subtitle: 'Hào Quang No Đủ & Nhiệt Huyết',
    badge: 'Năng Lượng',
    astralSign: '☉',
    elementText: 'Thái Dương Quang',
    borderGlow: 'border-amber-400/50 group-hover:border-amber-300',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.55)]',
    sigilType: 'sun',
    cardBg: 'from-[#291704] via-[#170c02] to-[#382005]',
    archBg: 'bg-gradient-to-b from-amber-500/20 via-orange-950/40 to-black/70',
    archBorder: 'border-amber-400/40 group-hover:border-amber-300/80 shadow-[inset_0_0_20px_rgba(245,158,11,0.25)]',
    accentText: 'text-amber-300',
  },
  {
    id: 'the_world',
    romanNumeral: 'XXI',
    name: 'Vũ Trụ Toàn Năng',
    latin: 'The World',
    subtitle: 'Viên Mãn Vạn Sự An Lành',
    badge: 'Viên Mãn',
    astralSign: '♄',
    elementText: 'Đại Viên Mãn Giới',
    borderGlow: 'border-fuchsia-400/50 group-hover:border-fuchsia-300',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40',
    glowAura: 'group-hover:shadow-[0_0_40px_rgba(217,70,239,0.55)]',
    sigilType: 'world',
    cardBg: 'from-[#27062a] via-[#160218] to-[#36083a]',
    archBg: 'bg-gradient-to-b from-fuchsia-500/20 via-purple-950/40 to-black/70',
    archBorder: 'border-fuchsia-400/40 group-hover:border-fuchsia-300/80 shadow-[inset_0_0_20px_rgba(217,70,239,0.25)]',
    accentText: 'text-fuchsia-300',
  },
];

export interface ArchetypeColorTheme {
  borderCard: string;
  shadowAura: string;
  headerGradient: string;
  headerBorder: string;
  headerSubtext: string;
  photoBorder: string;
  dishBadgeBg: string;
  dishBadgeText: string;
  dishPriceColor: string;
  quoteBg: string;
  quoteBorder: string;
  quoteText: string;
  quoteHeader: string;
  talismanBanner: string;
  talismanBorder: string;
  talismanText: string;
  talismanBtn: string;
  actionPrimaryBtn: string;
}

export const ARCHETYPE_THEMES: Record<string, ArchetypeColorTheme> = {
  the_magician: {
    borderCard: 'border-cyan-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(6,182,212,0.4)]',
    headerGradient: 'from-[#071927] via-[#04101c] to-[#0a2336]',
    headerBorder: 'border-cyan-500/40',
    headerSubtext: 'text-cyan-300',
    photoBorder: 'border-cyan-500/40',
    dishBadgeBg: 'bg-cyan-500/30 border border-cyan-400/50',
    dishBadgeText: 'text-cyan-200',
    dishPriceColor: 'text-cyan-300',
    quoteBg: 'bg-[#081b28]/90',
    quoteBorder: 'border-cyan-500/30',
    quoteText: 'text-cyan-100',
    quoteHeader: 'text-cyan-300',
    talismanBanner: 'from-[#061826] via-[#040f1a] to-[#092233]',
    talismanBorder: 'border-cyan-500/30',
    talismanText: 'text-cyan-200',
    talismanBtn: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]',
    actionPrimaryBtn: 'from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.45)]',
  },
  the_high_priestess: {
    borderCard: 'border-indigo-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(99,102,241,0.4)]',
    headerGradient: 'from-[#0b1030] via-[#060820] to-[#121946]',
    headerBorder: 'border-indigo-500/40',
    headerSubtext: 'text-indigo-300',
    photoBorder: 'border-indigo-500/40',
    dishBadgeBg: 'bg-indigo-500/30 border border-indigo-400/50',
    dishBadgeText: 'text-indigo-200',
    dishPriceColor: 'text-indigo-300',
    quoteBg: 'bg-[#0c1236]/90',
    quoteBorder: 'border-indigo-500/30',
    quoteText: 'text-indigo-100',
    quoteHeader: 'text-indigo-300',
    talismanBanner: 'from-[#0a0f2e] via-[#05071e] to-[#111742]',
    talismanBorder: 'border-indigo-500/30',
    talismanText: 'text-indigo-200',
    talismanBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]',
    actionPrimaryBtn: 'from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.45)]',
  },
  the_empress: {
    borderCard: 'border-emerald-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(16,185,129,0.4)]',
    headerGradient: 'from-[#052117] via-[#03150e] to-[#082d20]',
    headerBorder: 'border-emerald-500/40',
    headerSubtext: 'text-emerald-300',
    photoBorder: 'border-emerald-500/40',
    dishBadgeBg: 'bg-emerald-500/30 border border-emerald-400/50',
    dishBadgeText: 'text-emerald-200',
    dishPriceColor: 'text-emerald-300',
    quoteBg: 'bg-[#06241b]/90',
    quoteBorder: 'border-emerald-500/30',
    quoteText: 'text-emerald-100',
    quoteHeader: 'text-emerald-300',
    talismanBanner: 'from-[#052017] via-[#03130e] to-[#082a1e]',
    talismanBorder: 'border-emerald-500/30',
    talismanText: 'text-emerald-200',
    talismanBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]',
    actionPrimaryBtn: 'from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-[0_0_20px_rgba(16,185,129,0.45)]',
  },
  the_emperor: {
    borderCard: 'border-rose-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(244,63,94,0.4)]',
    headerGradient: 'from-[#2a0611] via-[#160309] to-[#360817]',
    headerBorder: 'border-rose-500/40',
    headerSubtext: 'text-rose-300',
    photoBorder: 'border-rose-500/40',
    dishBadgeBg: 'bg-rose-500/30 border border-rose-400/50',
    dishBadgeText: 'text-rose-200',
    dishPriceColor: 'text-rose-300',
    quoteBg: 'bg-[#290712]/90',
    quoteBorder: 'border-rose-500/30',
    quoteText: 'text-rose-100',
    quoteHeader: 'text-rose-300',
    talismanBanner: 'from-[#25050f] via-[#140207] to-[#330715]',
    talismanBorder: 'border-rose-500/30',
    talismanText: 'text-rose-200',
    talismanBtn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]',
    actionPrimaryBtn: 'from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 shadow-[0_0_20px_rgba(244,63,94,0.45)]',
  },
  the_lovers: {
    borderCard: 'border-fuchsia-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(217,70,239,0.4)]',
    headerGradient: 'from-[#280521] via-[#160312] to-[#37072e]',
    headerBorder: 'border-fuchsia-500/40',
    headerSubtext: 'text-fuchsia-300',
    photoBorder: 'border-fuchsia-500/40',
    dishBadgeBg: 'bg-fuchsia-500/30 border border-fuchsia-400/50',
    dishBadgeText: 'text-fuchsia-200',
    dishPriceColor: 'text-pink-300',
    quoteBg: 'bg-[#2a0624]/90',
    quoteBorder: 'border-fuchsia-500/30',
    quoteText: 'text-fuchsia-100',
    quoteHeader: 'text-fuchsia-300',
    talismanBanner: 'from-[#25041f] via-[#140210] to-[#33062a]',
    talismanBorder: 'border-fuchsia-500/30',
    talismanText: 'text-fuchsia-200',
    talismanBtn: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]',
    actionPrimaryBtn: 'from-fuchsia-600 to-pink-700 hover:from-fuchsia-500 hover:to-pink-600 shadow-[0_0_20px_rgba(217,70,239,0.45)]',
  },
  the_chariot: {
    borderCard: 'border-amber-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(245,158,11,0.4)]',
    headerGradient: 'from-[#2a1304] via-[#160901] to-[#381a05]',
    headerBorder: 'border-amber-500/40',
    headerSubtext: 'text-amber-300',
    photoBorder: 'border-amber-500/40',
    dishBadgeBg: 'bg-amber-500/30 border border-amber-400/50',
    dishBadgeText: 'text-amber-200',
    dishPriceColor: 'text-amber-300',
    quoteBg: 'bg-[#2a1405]/90',
    quoteBorder: 'border-amber-500/30',
    quoteText: 'text-amber-100',
    quoteHeader: 'text-amber-300',
    talismanBanner: 'from-[#251003] via-[#140801] to-[#331604]',
    talismanBorder: 'border-amber-500/30',
    talismanText: 'text-amber-200',
    talismanBtn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]',
    actionPrimaryBtn: 'from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 shadow-[0_0_20px_rgba(245,158,11,0.45)]',
  },
  the_strength: {
    borderCard: 'border-amber-400/50',
    shadowAura: 'shadow-[0_0_50px_rgba(251,191,36,0.4)]',
    headerGradient: 'from-[#261503] via-[#140a01] to-[#341d04]',
    headerBorder: 'border-amber-400/40',
    headerSubtext: 'text-amber-300',
    photoBorder: 'border-amber-400/40',
    dishBadgeBg: 'bg-amber-400/30 border border-amber-300/50',
    dishBadgeText: 'text-amber-100',
    dishPriceColor: 'text-amber-300',
    quoteBg: 'bg-[#261504]/90',
    quoteBorder: 'border-amber-400/30',
    quoteText: 'text-amber-100',
    quoteHeader: 'text-amber-300',
    talismanBanner: 'from-[#211202] via-[#120901] to-[#2d1903]',
    talismanBorder: 'border-amber-400/30',
    talismanText: 'text-amber-200',
    talismanBtn: 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-black shadow-[0_0_15px_rgba(251,191,36,0.4)]',
    actionPrimaryBtn: 'from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 shadow-[0_0_20px_rgba(251,191,36,0.45)]',
  },
  the_hermit: {
    borderCard: 'border-purple-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(168,85,247,0.4)]',
    headerGradient: 'from-[#12082b] via-[#09041a] to-[#1c0d40]',
    headerBorder: 'border-purple-500/40',
    headerSubtext: 'text-purple-300',
    photoBorder: 'border-purple-500/40',
    dishBadgeBg: 'bg-purple-500/30 border border-purple-400/50',
    dishBadgeText: 'text-purple-200',
    dishPriceColor: 'text-purple-300',
    quoteBg: 'bg-[#150a32]/90',
    quoteBorder: 'border-purple-500/30',
    quoteText: 'text-purple-100',
    quoteHeader: 'text-purple-300',
    talismanBanner: 'from-[#100626] via-[#080316] to-[#180a37]',
    talismanBorder: 'border-purple-500/30',
    talismanText: 'text-purple-200',
    talismanBtn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    actionPrimaryBtn: 'from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.45)]',
  },
  the_wheel_of_fortune: {
    borderCard: 'border-violet-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(139,92,246,0.4)]',
    headerGradient: 'from-[#1a0833] via-[#0d031c] to-[#250d47]',
    headerBorder: 'border-violet-500/40',
    headerSubtext: 'text-violet-300',
    photoBorder: 'border-violet-500/40',
    dishBadgeBg: 'bg-violet-500/30 border border-violet-400/50',
    dishBadgeText: 'text-violet-200',
    dishPriceColor: 'text-violet-300',
    quoteBg: 'bg-[#1e0a3a]/90',
    quoteBorder: 'border-violet-500/30',
    quoteText: 'text-violet-100',
    quoteHeader: 'text-violet-300',
    talismanBanner: 'from-[#18062e] via-[#0b0217] to-[#21093f]',
    talismanBorder: 'border-violet-500/30',
    talismanText: 'text-violet-200',
    talismanBtn: 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]',
    actionPrimaryBtn: 'from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 shadow-[0_0_20px_rgba(139,92,246,0.45)]',
  },
  the_star: {
    borderCard: 'border-teal-500/50',
    shadowAura: 'shadow-[0_0_50px_rgba(20,184,166,0.4)]',
    headerGradient: 'from-[#042020] via-[#021313] to-[#072d2d]',
    headerBorder: 'border-teal-500/40',
    headerSubtext: 'text-teal-300',
    photoBorder: 'border-teal-500/40',
    dishBadgeBg: 'bg-teal-500/30 border border-teal-400/50',
    dishBadgeText: 'text-teal-200',
    dishPriceColor: 'text-teal-300',
    quoteBg: 'bg-[#052424]/90',
    quoteBorder: 'border-teal-500/30',
    quoteText: 'text-teal-100',
    quoteHeader: 'text-teal-300',
    talismanBanner: 'from-[#031d1d] via-[#021111] to-[#062828]',
    talismanBorder: 'border-teal-500/30',
    talismanText: 'text-teal-200',
    talismanBtn: 'bg-teal-600 hover:bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.4)]',
    actionPrimaryBtn: 'from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(20,184,166,0.45)]',
  },
  the_sun: {
    borderCard: 'border-amber-400/50',
    shadowAura: 'shadow-[0_0_50px_rgba(245,158,11,0.45)]',
    headerGradient: 'from-[#1f093a] via-[#100322] to-[#2e0e54]',
    headerBorder: 'border-amber-400/40',
    headerSubtext: 'text-amber-300',
    photoBorder: 'border-amber-400/40',
    dishBadgeBg: 'bg-amber-400/30 border border-amber-300/50',
    dishBadgeText: 'text-amber-200',
    dishPriceColor: 'text-amber-300',
    quoteBg: 'bg-[#1b0833]/90',
    quoteBorder: 'border-amber-400/30',
    quoteText: 'text-amber-100',
    quoteHeader: 'text-amber-300',
    talismanBanner: 'from-[#19062e] via-[#0d0219] to-[#260a45]',
    talismanBorder: 'border-amber-400/30',
    talismanText: 'text-amber-200',
    talismanBtn: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]',
    actionPrimaryBtn: 'from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.45)]',
  },
  the_world: {
    borderCard: 'border-purple-400/50',
    shadowAura: 'shadow-[0_0_50px_rgba(168,85,247,0.45)]',
    headerGradient: 'from-[#1f0529] via-[#0e0214] to-[#2d083b]',
    headerBorder: 'border-purple-400/40',
    headerSubtext: 'text-purple-300',
    photoBorder: 'border-purple-400/40',
    dishBadgeBg: 'bg-purple-500/30 border border-purple-400/50',
    dishBadgeText: 'text-purple-200',
    dishPriceColor: 'text-purple-300',
    quoteBg: 'bg-[#21062b]/90',
    quoteBorder: 'border-purple-400/30',
    quoteText: 'text-purple-100',
    quoteHeader: 'text-purple-300',
    talismanBanner: 'from-[#1b0424] via-[#0c0111] to-[#260633]',
    talismanBorder: 'border-purple-400/30',
    talismanText: 'text-purple-200',
    talismanBtn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    actionPrimaryBtn: 'from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-[0_0_20px_rgba(168,85,247,0.45)]',
  },
};

const DEFAULT_THEME = ARCHETYPE_THEMES.the_sun;

const LOCAL_STORAGE_KEY = 'food_tarot_drawn_ids_v3';

interface RevealedTarotResult {
  archetype: TarotArchetype;
  dish: Dish;
  quote: string;
  warningQuote?: string;
  isUpright: boolean;
  zodiac: ZodiacSign;
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

function getTarotQuoteWithZodiac(dish: Dish, zodiac: ZodiacSign, isUpright: boolean): { quote: string; warning?: string } {
  const name = dish.vietnameseName || dish.name;

  if (!isUpright) {
    // Reversed (Nghịch chiều) reading: humorous cosmic warning
    return {
      quote: `"Lá bài nghịch chiều xuất hiện như một cú chớp mắt của Vũ Trụ: Món ${name} hôm nay mang năng lượng mê hoặc cực mạnh, vị ngon quá đậm đà dễ khiến bạn ăn quên đường về!"`,
      warning: `Hôm nay ăn ${name} nhớ dặn quán vừa ớt, tránh ăn quá vội và nhớ gọi thêm một ly nước mát để hòa hợp phong vị nhé!`,
    };
  }

  // Upright reading influenced by Zodiac
  let zodiacAdvice = '';
  switch (zodiac.element) {
    case 'Hỏa':
      zodiacAdvice = `Ngọn lửa nhiệt huyết của cung ${zodiac.name} hôm nay sẽ được bùng nổ trọn vẹn qua từng thớ vị của ${name}.`;
      break;
    case 'Thủy':
      zodiacAdvice = `Tâm can nhạy cảm của cung ${zodiac.name} sẽ được xoa dịu tuyệt đối, dòng nước thanh lành vỗ về từng giác quan.`;
      break;
    case 'Thổ':
      zodiacAdvice = `Sự vững vàng thực tế của ${zodiac.name} tìm thấy bến đỗ no nê, chắc dạ và sung túc trong từng miếng ${name}.`;
      break;
    case 'Khí':
      zodiacAdvice = `Trí tưởng tượng bay bổng của ${zodiac.name} sẽ được khơi nguồn cảm hứng bất tận từ sự kết hợp gia vị tinh tế.`;
      break;
    default:
      zodiacAdvice = `Vũ Trụ quy tụ tinh hoa tứ phương để ban tặng cho bạn khoảnh khắc vị giác thăng hoa nhất.`;
  }

  return {
    quote: `"Các vì sao đã hội tụ và sấm truyền: ${name} chính là chân ái ẩm thực định mệnh của bạn hôm nay! ${zodiacAdvice} Hãy an tâm thưởng thức để tiếp nhận trọn vẹn phước lành!"`,
  };
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

  // Mystic Ritual & Ambience States
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [candlePuffs, setCandlePuffs] = useState(0);
  const [isMuted, setIsMuted] = useState(() => tarotAudio.getIsMuted());
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign>(ZODIAC_SIGNS[0]);
  const [amuletData, setAmuletData] = useState<FoodAmuletData | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drawnDishIds));
    } catch {
      // storage error
    }
  }, [drawnDishIds]);

  const handleToggleMute = () => {
    const muted = tarotAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      tarotAudio.playSingingBowl();
    }
  };

  const handleInteractCandle = () => {
    tarotAudio.playCandleSpark();
    setIsCandleLit(true);
    setCandlePuffs((prev) => prev + 1);
  };

  const drawNextUniqueDish = (archetype?: TarotArchetype) => {
    if (isFlipping) return;
    setIsFlipping(true);

    // Audio cue
    tarotAudio.playCardShuffle();

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

    // Upright vs Reversed (75% Upright, 25% Reversed)
    const isUpright = Math.random() > 0.25;
    const { quote, warning } = getTarotQuoteWithZodiac(selectedDish, selectedZodiac, isUpright);

    const newResult: RevealedTarotResult = {
      archetype: chosenArchetype,
      dish: selectedDish,
      quote,
      warningQuote: warning,
      isUpright,
      zodiac: selectedZodiac,
      luckyNumber: luckyNum,
      luckyHours: cosmicInfo.luckyHours,
      elementText: cosmicInfo.elementText,
      elementClass: cosmicInfo.elementClass,
      drawOrder: newDrawnIds.length,
    };

    setTimeout(() => {
      setRevealedResult(newResult);
      setIsFlipping(false);
      tarotAudio.playCardReveal();
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#6366F1', '#EC4899', '#10B981', '#3B82F6'],
      });
    }, 550);
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

  const handleOpenAmulet = () => {
    if (!revealedResult) return;
    const serial = `TRT-${revealedResult.archetype.romanNumeral}-${revealedResult.luckyNumber}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAmuletData({
      dish: revealedResult.dish,
      tarotName: revealedResult.archetype.name,
      romanNumeral: revealedResult.archetype.romanNumeral,
      latin: revealedResult.archetype.latin,
      isUpright: revealedResult.isUpright,
      zodiacName: revealedResult.zodiac.name,
      zodiacSymbol: revealedResult.zodiac.symbol,
      zodiacElement: revealedResult.zodiac.element,
      oracleQuote: revealedResult.quote,
      warningQuote: revealedResult.warningQuote,
      luckyNumber: revealedResult.luckyNumber,
      luckyHours: revealedResult.luckyHours,
      serialNumber: serial,
    });
  };

  const remainingCount = Math.max(0, INITIAL_DISHES.length - drawnDishIds.length);
  const targetArea = userLocation.district || userLocation.city;

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-6">
      {/* Altar Container - Bỏ khung vàng, mở rộng không gian thoáng đãng */}
      <div className="relative rounded-3xl bg-transparent sm:bg-white/70 sm:backdrop-blur-sm sm:shadow-lg sm:shadow-purple-950/5 p-2 sm:p-6 lg:p-8 text-stone-900 overflow-hidden">
        {/* Subtle celestial watermark rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border border-indigo-100/40 animate-tarot-spin pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-dashed border-purple-100/30 animate-tarot-spin-rev pointer-events-none" />
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Altar Utility Bar (Audio sound toggle & Candle shrine) */}
        <div className="relative z-10 flex items-center justify-between gap-2 w-full mb-6 px-1">
          {/* Interactive Mystic Candle */}
          <button
            onClick={handleInteractCandle}
            title="Bấm để thắp nến ước nguyện vị giác"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-purple-950/30 bg-gradient-to-r from-[#0d041c] via-[#200b3d] to-[#3b0d5c] ${
              isCandleLit
                ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                : 'border-purple-600/40 hover:border-amber-400/70'
            }`}
          >
            <div className="relative w-4 h-6 flex items-center justify-center">
              {/* Candle Body */}
              <div className="w-2.5 h-3.5 bg-gradient-to-b from-amber-300 to-amber-500 rounded-xs mt-auto border border-amber-400/70 shadow-2xs" />
              {/* Candle Flame */}
              {isCandleLit ? (
                <div className="absolute -top-1.5 w-2 h-3.5 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full animate-candle-flame shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
              ) : (
                <div className="absolute -top-0.5 w-1 h-1.5 bg-amber-400/40 rounded-full" />
              )}
            </div>
            <span className="text-xs font-black text-amber-300 tracking-wide">
              {candlePuffs > 0 ? `Nến Tâm Linh (${candlePuffs} nguyện)` : 'Thắp Nến Ước Nguyện'}
            </span>
          </button>

          {/* Tibetan Sound Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Bật âm thanh huyền ảo' : 'Tắt âm thanh'}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-stone-500" />
                <span className="text-xs text-stone-600 font-medium">Âm Thanh: Tắt</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-purple-600 animate-pulse" />
                <span className="text-xs text-purple-950 font-bold">Chuông Tây Tạng</span>
              </>
            )}
          </button>
        </div>

        {/* Altar Header */}
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1c0836] via-[#381163] to-[#1c0836] text-amber-300 text-xs font-black uppercase tracking-wider mb-3 shadow-md shadow-purple-950/20 border border-purple-500/40 backdrop-blur-sm">
            <Compass className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent font-black drop-shadow-xs">
              TAROT ẨM THỰC VIỆT NAM • TRẢI BÀI CHIÊM TINH
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-stone-900 tracking-tight mb-3">
            Hôm nay <span className="text-[#4f46e5] font-black">Vũ Trụ</span> mách bạn ăn gì?
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Lật mở một lá bài Tarot bất kỳ để tiếp nhận lời tiên tri vị giác. Mỗi quẻ là một món ăn duy nhất — <strong className="text-stone-800 font-semibold">tuyệt đối không trùng lặp!</strong>
          </p>

          {/* Counter & Status Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Đã mở: <strong className="text-emerald-950 font-bold">{drawnDishIds.length}</strong> / {INITIAL_DISHES.length} món
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50/80 text-indigo-700 font-semibold border border-indigo-200 shadow-xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Còn lại: <strong className="text-indigo-900 font-bold">{remainingCount}</strong> món chưa lật
            </div>

            {drawnDishIds.length > 0 && (
              <button
                onClick={handleResetCycle}
                title="Xóa lịch sử và bắt đầu lại chu kỳ mới"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition-colors cursor-pointer border border-stone-300 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
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

        {/* Zodiac Horoscope Selector (Thiết kế Đền Thờ Chiêm Tinh Tinh Vân Huyền Bí) */}
        <div className="relative z-10 w-full mb-8 p-4 sm:p-6 lg:p-7 rounded-3xl bg-gradient-to-b from-[#0a0216] via-[#140529] to-[#0c031a] border border-purple-800/40 shadow-2xl shadow-purple-950/50 overflow-hidden text-white">
          {/* Subtle celestial stardust watermark */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-purple-500/10 pointer-events-none animate-tarot-spin" />

          {/* Header với 4 Nguyên Tố Huyền Học */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-4 border-b border-purple-800/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2a0b50] to-[#120324] border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md shadow-purple-950/40 shrink-0">
                <Compass className="w-5 h-5 animate-spin-slow text-amber-300" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black uppercase tracking-wider flex items-center gap-2 m-0">
                  <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent">
                    BẢN ĐỒ CHIÊM TINH HOÀNG ĐẠO • KHAI MỞ KHẨU VỊ
                  </span>
                </h2>
                <p className="text-[11.5px] text-purple-200/80 font-medium mt-0.5">
                  Chọn cung mệnh để kích hoạt tần số năng lượng vị giác cần bổ sung hôm nay
                </p>
              </div>
            </div>

            {/* 4 Nguyên Tố Chiêm Tinh Indicators */}
            <div className="flex items-center gap-1.5 self-start md:self-auto flex-wrap">
              <span className="text-[10.5px] font-bold text-purple-300/70 mr-1 hidden sm:inline">4 Nguyên Tố:</span>
              <span className="px-2 py-0.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300 text-[11px] font-semibold flex items-center gap-1">
                🔥 Hỏa
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                🌿 Thổ
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold flex items-center gap-1">
                🌪️ Khí
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-300 text-[11px] font-semibold flex items-center gap-1">
                🌊 Thủy
              </span>
            </div>
          </div>

          {/* Vị trí Đặc Biệt: TOÀN THỂ VŨ TRỤ (Cosmos Nexus) */}
          <div className="relative z-10 mb-3.5">
            {(() => {
              const cosmos = ZODIAC_SIGNS[0]; // Toàn Thể Vũ Trụ
              const isCosmosSelected = selectedZodiac.id === 'all';
              return (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedZodiac(cosmos);
                    tarotAudio.playCandleSpark();
                  }}
                  className={`w-full group relative px-4 sm:px-5 py-3 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 text-left cursor-pointer overflow-hidden ${
                    isCosmosSelected
                      ? 'bg-gradient-to-r from-[#390d63] via-[#240846] to-[#4c1285] border-amber-300/90 shadow-[0_0_25px_rgba(245,158,11,0.45)] ring-1 ring-amber-300/50'
                      : 'bg-[#15062b]/80 hover:bg-[#200a40]/90 border-purple-700/40 hover:border-purple-400/60 text-purple-100'
                  }`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${
                      isCosmosSelected
                        ? 'bg-amber-400/20 border border-amber-300/50 text-amber-200 shadow-inner'
                        : 'bg-purple-900/40 border border-purple-500/30 text-purple-300'
                    }`}>
                      🌌
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black tracking-wide text-white group-hover:text-amber-200 transition-colors">
                          Toàn Thể Vũ Trụ (Mọi Cung Hoàng Đạo)
                        </span>
                        {isCosmosSelected && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/50 text-amber-300 text-[10px] font-black uppercase tracking-wider animate-pulse">
                            ✦ Đang kết nối
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-purple-200/80 line-clamp-1 mt-0.5">
                        Đón nhận tự do toàn bộ mỹ vị 3 miền Bắc - Trung - Nam, không giới hạn khẩu vị
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 shrink-0 relative z-10">
                    <span className="text-[11px] text-amber-300/90 font-medium italic">
                      Cosmos Omniverse
                    </span>
                    <Sparkles className={`w-4 h-4 ${isCosmosSelected ? 'text-amber-300 animate-spin-slow' : 'text-purple-400'}`} />
                  </div>
                </button>
              );
            })()}
          </div>

          {/* Lưới 12 Cung Hoàng Đạo phân loại theo 4 Nguyên Tố */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5 relative z-10 w-full">
            {ZODIAC_SIGNS.slice(1).map((z) => {
              const isSelected = selectedZodiac.id === z.id;
              const elementCfg = ZODIAC_ELEMENT_CONFIG[z.element];
              return (
                <button
                  key={z.id}
                  onClick={() => {
                    setSelectedZodiac(z);
                    tarotAudio.playCandleSpark();
                  }}
                  className={`group relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer select-none bg-gradient-to-b ${
                    isSelected
                      ? `${elementCfg.buttonActive} ${elementCfg.glowShadow} scale-[1.02]`
                      : `${elementCfg.buttonInactive}`
                  }`}
                >
                  {/* Active Indicator Gem */}
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,1)] animate-ping" />
                  )}

                  {/* Zodiac Symbol Glyph */}
                  <div className="relative mb-1 flex items-center justify-center">
                    <span className={`text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-115 ${
                      isSelected ? 'text-amber-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : elementCfg.symbolColor
                    }`}>
                      {z.symbol}
                    </span>
                  </div>

                  {/* Zodiac Vietnamese Name */}
                  <div className={`text-xs sm:text-[13px] font-black tracking-tight ${
                    isSelected ? 'text-white drop-shadow' : 'text-stone-100 group-hover:text-white'
                  }`}>
                    {z.name}
                  </div>

                  {/* Latin & Element Tag */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[9.5px] sm:text-[10px] text-purple-200/70 italic font-medium">
                      {z.latin}
                    </span>
                    <span className="text-[9px] text-stone-400">•</span>
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-amber-300/90">
                      {elementCfg.icon} {z.element}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sacred Oracle Prophecy Banner: Lời Sấm Khẩu Vị Cung Hoàng Đạo */}
          <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-purple-600/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner relative z-10">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-900/60 to-black/80 border border-purple-400/40 flex items-center justify-center text-xl shrink-0 shadow-inner">
                {selectedZodiac.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                    🔮 LỜI SẤM KHẨU VỊ {selectedZodiac.name.toUpperCase()} ({selectedZodiac.latin}):
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-400/30 text-[10px] font-bold text-purple-200">
                    {ZODIAC_ELEMENT_CONFIG[selectedZodiac.element].icon} {selectedZodiac.element}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 font-medium italic mt-0.5 leading-relaxed">
                  &ldquo;{selectedZodiac.cravingDesc}&rdquo;
                </p>
              </div>
            </div>

            <div className="shrink-0 self-end sm:self-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-300 text-[11px] font-semibold">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin-slow" />
                Tần số vị giác sẵn sàng
              </div>
            </div>
          </div>
        </div>

        {/* State 1: Deck of 12 Mystical Arcana Cards */}
        {!revealedResult ? (
          <div className="relative z-10 w-full">
            <div className="text-center mb-6">
              <h2 className="text-xs sm:text-sm md:text-base font-black text-stone-800 uppercase tracking-widest flex items-center justify-center gap-2 m-0">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Chọn 1 lá bài bạn cảm thấy gắn kết tâm linh nhất để khai quẻ</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h2>
              <p className="text-xs text-purple-900/70 font-semibold mt-1">
                ✦ Đang cộng hưởng cùng trường năng lượng <strong className="text-purple-950 font-bold">{selectedZodiac.name}</strong> ({selectedZodiac.symbol}) ✦
              </p>
            </div>

          {/* 12 Majestic 3D Holographic Tarot Cards - Mở rộng to đẹp, thoáng đãng */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 md:gap-5 mb-10 w-full">
            {TAROT_ARCHETYPES.map((arc) => {
              return (
                <button
                  key={arc.id}
                  disabled={isFlipping}
                  onClick={() => drawNextUniqueDish(arc)}
                  className={`group relative aspect-[1/1.6] min-h-[290px] sm:min-h-[330px] rounded-2xl bg-gradient-to-b ${arc.cardBg} p-3 sm:p-3.5 flex flex-col items-center justify-between border-2 ${arc.borderGlow} ${arc.glowAura} hover:-translate-y-2.5 hover:scale-[1.03] transition-all duration-500 shadow-xl cursor-pointer overflow-hidden text-center select-none ${
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
                  <div className="w-full relative z-10 pt-1 flex items-center justify-between px-1.5">
                    <span className="text-[11px] sm:text-xs font-black tracking-widest text-amber-300 drop-shadow">
                      ✦ {arc.romanNumeral} ✦
                    </span>
                    <span className="text-xs sm:text-sm text-amber-300/90 font-mono font-bold">
                      {arc.astralSign}
                    </span>
                  </div>

                  {/* Center Sacred Geometry Arcana Sigil with Gothic Arch Frame */}
                  <div className="my-auto relative z-10 flex flex-col items-center justify-center py-2 w-full">
                    {/* Arch Backdrop glow */}
                    <div className={`relative p-2.5 rounded-2xl ${arc.archBg} border ${arc.archBorder} transition-all duration-300 shadow-inner group-hover:scale-[1.05]`}>
                      <TarotSigilArt type={arc.sigilType} />
                    </div>

                    {/* Tarot Card Title Plate */}
                    <div className="mt-2.5 px-1 w-full">
                      <div className="text-[13px] sm:text-sm md:text-[15px] font-black text-white group-hover:text-amber-300 transition-colors tracking-wide leading-tight drop-shadow">
                        {arc.name}
                      </div>
                      <div className="text-[9.5px] sm:text-[10px] text-amber-300/80 italic tracking-wider truncate mt-0.5">
                        {arc.latin}
                      </div>
                      <div className="text-[9px] sm:text-[9.5px] text-stone-300/80 truncate mt-0.5 font-medium">
                        {arc.subtitle.split('&')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Prompt Ribbon */}
                  <div className="w-full relative z-10 pt-2 pb-0.5 border-t border-amber-400/25">
                    <div className="text-[10.5px] sm:text-[11px] font-bold text-amber-300 group-hover:text-amber-200 flex items-center justify-center gap-1 tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:animate-spin-slow" />
                      Khai Mở Quẻ
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Celestial Draw Action Banner - Mở rộng, viền tối huyền bí thanh lịch */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1b0736] via-[#280c4c] to-[#1b0736] border border-purple-700/50 shadow-xl p-4 sm:p-6 w-full max-w-5xl mx-auto my-8 text-white group">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 text-left">
                <div className="w-11 h-11 rounded-xl bg-[#34115f] border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-inner shrink-0 mt-0.5">
                  <Wand2 className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Khế Ước Vị Giác & Thiên Duyên Kỳ Bí
                    </span>
                    <span className="text-[10px] px-3 py-0.5 rounded-full bg-[#3b1268] border border-purple-400/40 text-purple-200 font-bold">
                      Bất Trùng Lặp
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-stone-200 leading-relaxed max-w-xl font-normal">
                    Thiên hà quy tụ hơn <strong className="text-amber-300 font-extrabold">{INITIAL_DISHES.length} phong vị trần gian</strong>. Mỗi quẻ bài khai mở là một chỉ dẫn duy nhất từ các vì sao — <span className="text-amber-300 underline decoration-amber-400 underline-offset-2 font-semibold">tuyệt đối không trùng lặp</span> trong suốt chu kỳ luân chuyển định mệnh!
                  </p>
                </div>
              </div>

              {/* Enchanted Celestial Draw Button */}
              <button
                onClick={() => drawNextUniqueDish()}
                disabled={isFlipping}
                className={`relative shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-stone-950 font-black text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 cursor-pointer border border-amber-300 overflow-hidden ${
                  isFlipping ? 'opacity-60 pointer-events-none' : ''
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-stone-950/15 flex items-center justify-center">
                  <Dice5 className="w-4 h-4 text-stone-950" />
                </div>
                <span className="uppercase font-black">Khai Quẻ Định Mệnh</span>
                <Sparkles className="w-3.5 h-3.5 text-stone-950 animate-spin-slow" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* State 2: Revealed Non-Duplicate Tarot Card - Bảng đồ ăn phong cách ma mị, huyền bí, dạ nguyệt */
        (() => {
          const theme = ARCHETYPE_THEMES[revealedResult.archetype.id] || DEFAULT_THEME;
          return (
            <div className="relative z-10 max-w-xl mx-auto animate-fade-in">
              {/* Thẻ bài Tarot ma mị với nền vũ trụ bóng đêm, viền vàng cổ điển và hào quang nguyên tố */}
              <div className={`relative rounded-3xl bg-gradient-to-b from-[#120526] via-[#090214] to-[#15062c] border-2 ${theme.borderCard} ${theme.shadowAura} overflow-hidden text-center text-white transition-all duration-500 shadow-2xl`}>
                
                {/* 4 Góc Họa Tiết Cổ Điển Hoàng Gia Cho Bảng Thần Thoại */}
                <TarotCornerFlourish position="tl" />
                <TarotCornerFlourish position="tr" />
                <TarotCornerFlourish position="bl" />
                <TarotCornerFlourish position="br" />

                {/* Vòng Quỹ Đạo Huyền Bí Mờ Ảo Phía Sau */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-purple-500/10 pointer-events-none blur-[1px]" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border border-amber-500/10 pointer-events-none blur-[1px]" />

                {/* Top banner đồng bộ màu sắc và linh ấn cổ điển */}
                <div className={`relative bg-gradient-to-r ${theme.headerGradient} p-4 sm:p-5 text-white flex items-center justify-between border-b ${theme.headerBorder} overflow-hidden`}>
                  {/* Subtle Inset Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                  <div className="flex items-center gap-2.5 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-black/60 border border-amber-300/40 flex items-center justify-center text-white shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] shrink-0 p-1">
                      <TarotSigilArt type={revealedResult.archetype.sigilType} sizeClass="w-9 h-9" />
                    </div>
                    <div className="text-left">
                      <div className={`text-[11px] font-bold ${theme.headerSubtext} uppercase tracking-wider flex items-center gap-1.5`}>
                        <span>{revealedResult.archetype.romanNumeral}</span>
                        <span>•</span>
                        <span>{revealedResult.archetype.latin}</span>
                        <span>•</span>
                        <span className="font-extrabold text-amber-300 drop-shadow">QUẺ #{revealedResult.drawOrder}</span>
                      </div>
                      <div className="text-base sm:text-lg font-black text-white tracking-wide flex items-center gap-1.5 drop-shadow">
                        <span>{revealedResult.archetype.name}</span>
                        <span className="text-amber-400 text-xs">✦</span>
                      </div>
                    </div>
                  </div>

                  {/* Upright vs Reversed Orientation Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border shadow-lg relative z-10 shrink-0 ${
                    revealedResult.isUpright
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-purple-950/80 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  }`}>
                    <span>{revealedResult.isUpright ? '✦ Thuận Chiều' : '✦ Nghịch Chiều'}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-7 relative z-10">
                  {/* Dish Photo & Basic Info with matching mystical frame */}
                  <div className={`relative mb-5 rounded-2xl overflow-hidden border-2 ${theme.photoBorder} shadow-[0_10px_30px_rgba(0,0,0,0.8)] group`}>
                    <img
                      src={revealedResult.dish.image}
                      alt={`Quẻ bài Tarot ẩm thực: ${revealedResult.dish.vietnameseName || revealedResult.dish.name} chiêm tinh cung ${revealedResult.zodiac.name} - Hôm Nay Ăn Gì`}
                      referrerPolicy="no-referrer"
                      className={`w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700 ${
                        !revealedResult.isUpright ? 'brightness-90 contrast-110' : ''
                      }`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090214] via-[#090214]/60 to-black/20 flex flex-col justify-end p-4 text-left text-white">
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full ${theme.dishBadgeBg} ${theme.dishBadgeText} text-[11px] font-black w-fit shadow-md`}>
                          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
                          <span>MÓN VŨ TRỤ CHỈ ĐỊNH</span>
                        </div>
                        <div className="text-xs font-black text-amber-300 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 border border-amber-400/30">
                          <span>{revealedResult.zodiac.symbol}</span>
                          <span>{revealedResult.zodiac.name}</span>
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black drop-shadow-md leading-tight text-white tracking-wide">
                        {revealedResult.dish.vietnameseName || revealedResult.dish.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-stone-300 mt-1 font-medium">
                        <span className="text-stone-300">{revealedResult.dish.calories}</span>
                        <span className="text-amber-400/60">•</span>
                        <span className={`font-black text-sm ${theme.dishPriceColor} drop-shadow`}>
                          {formatVND(revealedResult.dish.estimatedPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mystical Prophecy Quote & Warning - Phiến đá sấm truyền ma mị */}
                  <div className={`p-4 sm:p-5 rounded-2xl ${theme.quoteBg} border ${theme.quoteBorder} leading-relaxed mb-5 relative text-left shadow-lg backdrop-blur-sm`}>
                    <div className={`text-xs uppercase font-black ${theme.quoteHeader} tracking-wider mb-2 flex items-center gap-1.5`}>
                      <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
                      <span>Lời Sấm Truyền Vị Giác:</span>
                    </div>
                    <p className={`italic text-sm sm:text-[15px] ${theme.quoteText} leading-relaxed font-normal m-0`}>
                      "{revealedResult.quote}"
                    </p>

                    {/* Reversed Cosmic Warning Note */}
                    {!revealedResult.isUpright && revealedResult.warningQuote && (
                      <div className={`mt-3 pt-3 border-t ${theme.quoteBorder} text-purple-200 text-xs sm:text-sm not-italic flex items-start gap-2`}>
                        <span className="text-amber-400 shrink-0">⚠️</span>
                        <div>
                          <strong className="text-amber-300 font-bold">Cảnh báo nghịch chiều:</strong>{' '}
                          <span className="text-purple-200/90">{revealedResult.warningQuote}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cosmic Stats (Lucky number, Hour, Element) - 3 Phù Ấn Tâm Linh Tối Màu */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
                    <div className={`p-3 rounded-2xl bg-[#140628]/90 border ${theme.quoteBorder} text-center shadow-md`}>
                      <div className="text-[10px] uppercase font-bold text-amber-300/80 tracking-wider">Số Thần Tài</div>
                      <div className="text-lg sm:text-xl font-black text-amber-300 drop-shadow mt-0.5">
                        #{revealedResult.luckyNumber}
                      </div>
                    </div>

                    <div className={`p-3 rounded-2xl bg-[#140628]/90 border border-purple-500/25 text-center shadow-md`}>
                      <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Giờ Hoàng Đạo</div>
                      <div className="text-xs sm:text-sm font-extrabold text-stone-200 line-clamp-1 mt-1">
                        {revealedResult.luckyHours}
                      </div>
                    </div>

                    <div className={`p-3 rounded-2xl bg-[#140628]/90 border border-purple-500/25 text-center shadow-md`}>
                      <div className="text-[10px] uppercase font-bold text-purple-300/80 tracking-wider">Hào Quang</div>
                      <div className="text-xs sm:text-sm font-extrabold text-purple-200 line-clamp-1 mt-1">
                        {revealedResult.elementText.split('(')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Food Amulet Card Launch Banner - Tấm Bùa Hộ Mệnh Huyền Bí */}
                  <div className={`mb-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r ${theme.talismanBanner} border ${theme.talismanBorder} flex items-center justify-between gap-3 text-left shadow-lg`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black/50 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-inner">
                        <Scroll className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <div className={`text-xs sm:text-sm font-black ${theme.talismanText} flex items-center gap-1.5`}>
                          <span>Tấm Bùa Hộ Mệnh Ẩm Thực</span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">Linh Phù</span>
                        </div>
                        <div className="text-[11px] text-stone-300 mt-0.5">Lưu phù chú vị giác hoặc chia sẻ cùng bạn bè</div>
                      </div>
                    </div>
                    <button
                      onClick={handleOpenAmulet}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl ${theme.talismanBtn} font-black text-xs transition-all active:scale-95 cursor-pointer shrink-0`}
                    >
                      Xem Bùa Hộ Mệnh
                    </button>
                  </div>

                  {/* Order Buttons with District Priority - Khung Đặt Món Ma Mị */}
                  <div className="pt-4 border-t border-purple-800/40 mb-5">
                    {/* Location Badge */}
                    <div 
                      onClick={() => onOpenLocationModal(revealedResult.dish.name)}
                      className="mb-3 max-w-md mx-auto flex items-center justify-between p-2.5 rounded-xl bg-[#140628]/90 border border-purple-500/30 hover:border-amber-400/60 transition-colors cursor-pointer text-xs group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-stone-950 flex items-center justify-center shrink-0 shadow">
                          <MapPin className="w-3.5 h-3.5 text-stone-950" />
                        </div>
                        <div className="truncate text-left">
                          <span className="text-stone-400 text-[10px] block leading-tight font-medium">
                            Vị trí tìm quán giao tới:
                          </span>
                          <span className="font-bold text-amber-200 truncate block">
                            {formatLocationDisplay(userLocation)}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-amber-400 group-hover:text-amber-300 shrink-0 ml-2 underline decoration-amber-400/40">
                        Đổi vị trí
                      </span>
                    </div>

                    <div className="text-xs font-bold text-stone-300 mb-3 flex items-center justify-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      <span>
                        Khám phá quán <strong>"{revealedResult.dish.name}"</strong> tại{' '}
                        <strong className="text-amber-300 underline decoration-amber-400/60 font-black">
                          {targetArea}
                        </strong>
                        :
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      <button
                        onClick={() =>
                          trackAndOpenAffiliateLink('shopeefood', revealedResult.dish, affiliateConfig, userLocation)
                        }
                        title={`Chuyển qua ShopeeFood tìm quán ${revealedResult.dish.name} tại ${targetArea}`}
                        className="py-3 px-3 rounded-2xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-[0_4px_15px_rgba(238,77,45,0.35)] cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 shrink-0" />
                        <span>ShopeeFood</span>
                      </button>

                      <button
                        onClick={() =>
                          trackAndOpenAffiliateLink('grabfood', revealedResult.dish, affiliateConfig, userLocation)
                        }
                        title={`Chuyển qua GrabFood tìm quán ${revealedResult.dish.name} tại ${targetArea}`}
                        className="py-3 px-3 rounded-2xl bg-[#00B14F] hover:bg-[#009643] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-[0_4px_15px_rgba(0,177,79,0.35)] cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 shrink-0" />
                        <span>GrabFood</span>
                      </button>

                      <button
                        onClick={() =>
                          trackAndOpenAffiliateLink('befood', revealedResult.dish, affiliateConfig, userLocation)
                        }
                        title={`Chuyển qua BeFood tìm quán ${revealedResult.dish.name} tại ${targetArea}`}
                        className="py-3 px-3 rounded-2xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-[0_4px_15px_rgba(255,209,0,0.35)] cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 shrink-0 text-stone-950" />
                        <span>BeFood</span>
                      </button>
                    </div>
                  </div>

                  {/* Secondary Navigation Buttons: Switch to another unique dish OR return to deck */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 border-t border-purple-800/30">
                    <button
                      disabled={isFlipping}
                      onClick={() => drawNextUniqueDish()}
                      className={`w-full sm:w-auto py-3 px-5 rounded-xl bg-gradient-to-r ${theme.actionPrimaryBtn} font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.03] uppercase tracking-wider`}
                    >
                      <RefreshCw className={`w-4 h-4 ${isFlipping ? 'animate-spin' : ''}`} />
                      <span>Khai quẻ món khác</span>
                    </button>

                    {onSelectDish && (
                      <button
                        onClick={() => onSelectDish(revealedResult.dish)}
                        className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#1e0a38] hover:bg-[#280e4b] text-purple-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-purple-500/30 shadow-sm"
                      >
                        <Eye className="w-4 h-4 text-amber-400" />
                        <span>Xem chi tiết món</span>
                      </button>
                    )}

                    <button
                      onClick={() => setRevealedResult(null)}
                      className="w-full sm:w-auto py-3 px-4 rounded-xl border border-purple-600/40 hover:border-amber-400/60 bg-[#120524] hover:bg-[#1b0836] text-stone-300 hover:text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Rút từ bộ bài</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* Amulet Talisman Modal */}
      {amuletData && (
        <FoodAmuletModal
          data={amuletData}
          onClose={() => setAmuletData(null)}
          userLocation={userLocation}
          affiliateConfig={affiliateConfig}
        />
      )}
      </div>
    </div>
  );
};
