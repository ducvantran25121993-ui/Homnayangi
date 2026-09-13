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
    borderCard: 'border-cyan-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(6,182,212,0.35)]',
    headerGradient: 'from-cyan-900 via-sky-800 to-indigo-950',
    headerBorder: 'border-cyan-500/60',
    headerSubtext: 'text-cyan-200',
    photoBorder: 'border-cyan-400',
    dishBadgeBg: 'bg-cyan-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-cyan-300',
    quoteBg: 'bg-cyan-50/80',
    quoteBorder: 'border-cyan-200',
    quoteText: 'text-cyan-950',
    quoteHeader: 'text-cyan-800',
    talismanBanner: 'from-cyan-100/80 via-sky-50 to-indigo-100/70',
    talismanBorder: 'border-cyan-300',
    talismanText: 'text-cyan-900',
    talismanBtn: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    actionPrimaryBtn: 'from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700',
  },
  the_high_priestess: {
    borderCard: 'border-blue-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(59,130,246,0.35)]',
    headerGradient: 'from-blue-900 via-indigo-900 to-slate-950',
    headerBorder: 'border-blue-400/60',
    headerSubtext: 'text-blue-200',
    photoBorder: 'border-blue-400',
    dishBadgeBg: 'bg-blue-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-blue-300',
    quoteBg: 'bg-blue-50/80',
    quoteBorder: 'border-blue-200',
    quoteText: 'text-blue-950',
    quoteHeader: 'text-blue-800',
    talismanBanner: 'from-blue-100/80 via-sky-50 to-indigo-100/70',
    talismanBorder: 'border-blue-300',
    talismanText: 'text-blue-900',
    talismanBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
    actionPrimaryBtn: 'from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800',
  },
  the_empress: {
    borderCard: 'border-emerald-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(16,185,129,0.35)]',
    headerGradient: 'from-emerald-900 via-teal-800 to-green-950',
    headerBorder: 'border-emerald-500/60',
    headerSubtext: 'text-emerald-200',
    photoBorder: 'border-emerald-400',
    dishBadgeBg: 'bg-emerald-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-emerald-300',
    quoteBg: 'bg-emerald-50/80',
    quoteBorder: 'border-emerald-200',
    quoteText: 'text-emerald-950',
    quoteHeader: 'text-emerald-800',
    talismanBanner: 'from-emerald-100/80 via-teal-50 to-green-100/70',
    talismanBorder: 'border-emerald-300',
    talismanText: 'text-emerald-900',
    talismanBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    actionPrimaryBtn: 'from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800',
  },
  the_emperor: {
    borderCard: 'border-rose-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(244,63,94,0.35)]',
    headerGradient: 'from-rose-900 via-red-800 to-orange-950',
    headerBorder: 'border-rose-500/60',
    headerSubtext: 'text-rose-200',
    photoBorder: 'border-rose-400',
    dishBadgeBg: 'bg-rose-500',
    dishBadgeText: 'text-white',
    dishPriceColor: 'text-rose-300',
    quoteBg: 'bg-rose-50/80',
    quoteBorder: 'border-rose-200',
    quoteText: 'text-rose-950',
    quoteHeader: 'text-rose-800',
    talismanBanner: 'from-rose-100/80 via-pink-50 to-orange-100/70',
    talismanBorder: 'border-rose-300',
    talismanText: 'text-rose-900',
    talismanBtn: 'bg-rose-600 hover:bg-rose-700 text-white',
    actionPrimaryBtn: 'from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800',
  },
  the_lovers: {
    borderCard: 'border-pink-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(236,72,153,0.35)]',
    headerGradient: 'from-pink-900 via-rose-800 to-fuchsia-950',
    headerBorder: 'border-pink-500/60',
    headerSubtext: 'text-pink-200',
    photoBorder: 'border-pink-400',
    dishBadgeBg: 'bg-pink-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-pink-300',
    quoteBg: 'bg-pink-50/80',
    quoteBorder: 'border-pink-200',
    quoteText: 'text-pink-950',
    quoteHeader: 'text-pink-800',
    talismanBanner: 'from-pink-100/80 via-rose-50 to-fuchsia-100/70',
    talismanBorder: 'border-pink-300',
    talismanText: 'text-pink-900',
    talismanBtn: 'bg-pink-600 hover:bg-pink-700 text-white',
    actionPrimaryBtn: 'from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700',
  },
  the_chariot: {
    borderCard: 'border-orange-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(249,115,22,0.35)]',
    headerGradient: 'from-orange-900 via-amber-800 to-stone-950',
    headerBorder: 'border-orange-500/60',
    headerSubtext: 'text-orange-200',
    photoBorder: 'border-orange-400',
    dishBadgeBg: 'bg-orange-500',
    dishBadgeText: 'text-white',
    dishPriceColor: 'text-orange-300',
    quoteBg: 'bg-orange-50/80',
    quoteBorder: 'border-orange-200',
    quoteText: 'text-orange-950',
    quoteHeader: 'text-orange-800',
    talismanBanner: 'from-orange-100/80 via-amber-50 to-yellow-100/70',
    talismanBorder: 'border-orange-300',
    talismanText: 'text-orange-900',
    talismanBtn: 'bg-orange-600 hover:bg-orange-700 text-white',
    actionPrimaryBtn: 'from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700',
  },
  the_strength: {
    borderCard: 'border-yellow-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(234,179,8,0.35)]',
    headerGradient: 'from-yellow-900 via-amber-800 to-stone-950',
    headerBorder: 'border-yellow-500/60',
    headerSubtext: 'text-yellow-200',
    photoBorder: 'border-yellow-400',
    dishBadgeBg: 'bg-yellow-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-yellow-300',
    quoteBg: 'bg-yellow-50/80',
    quoteBorder: 'border-yellow-200',
    quoteText: 'text-yellow-950',
    quoteHeader: 'text-yellow-800',
    talismanBanner: 'from-yellow-100/80 via-amber-50 to-orange-100/70',
    talismanBorder: 'border-yellow-300',
    talismanText: 'text-yellow-900',
    talismanBtn: 'bg-yellow-600 hover:bg-yellow-700 text-stone-950 font-black',
    actionPrimaryBtn: 'from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-stone-950',
  },
  the_hermit: {
    borderCard: 'border-indigo-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(99,102,241,0.35)]',
    headerGradient: 'from-indigo-950 via-slate-900 to-purple-950',
    headerBorder: 'border-indigo-500/60',
    headerSubtext: 'text-indigo-200',
    photoBorder: 'border-indigo-400',
    dishBadgeBg: 'bg-indigo-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-indigo-300',
    quoteBg: 'bg-indigo-50/80',
    quoteBorder: 'border-indigo-200',
    quoteText: 'text-indigo-950',
    quoteHeader: 'text-indigo-800',
    talismanBanner: 'from-indigo-100/80 via-slate-50 to-purple-100/70',
    talismanBorder: 'border-indigo-300',
    talismanText: 'text-indigo-900',
    talismanBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    actionPrimaryBtn: 'from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800',
  },
  the_wheel_of_fortune: {
    borderCard: 'border-purple-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(168,85,247,0.35)]',
    headerGradient: 'from-purple-950 via-violet-900 to-indigo-950',
    headerBorder: 'border-purple-500/60',
    headerSubtext: 'text-purple-200',
    photoBorder: 'border-purple-400',
    dishBadgeBg: 'bg-purple-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-purple-300',
    quoteBg: 'bg-purple-50/80',
    quoteBorder: 'border-purple-200',
    quoteText: 'text-purple-950',
    quoteHeader: 'text-purple-800',
    talismanBanner: 'from-purple-100/80 via-violet-50 to-indigo-100/70',
    talismanBorder: 'border-purple-300',
    talismanText: 'text-purple-900',
    talismanBtn: 'bg-purple-600 hover:bg-purple-700 text-white',
    actionPrimaryBtn: 'from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800',
  },
  the_star: {
    borderCard: 'border-teal-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(20,184,166,0.35)]',
    headerGradient: 'from-teal-950 via-cyan-900 to-slate-950',
    headerBorder: 'border-teal-500/60',
    headerSubtext: 'text-teal-200',
    photoBorder: 'border-teal-400',
    dishBadgeBg: 'bg-teal-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-teal-300',
    quoteBg: 'bg-teal-50/80',
    quoteBorder: 'border-teal-200',
    quoteText: 'text-teal-950',
    quoteHeader: 'text-teal-800',
    talismanBanner: 'from-teal-100/80 via-cyan-50 to-slate-100/70',
    talismanBorder: 'border-teal-300',
    talismanText: 'text-teal-900',
    talismanBtn: 'bg-teal-600 hover:bg-teal-700 text-white',
    actionPrimaryBtn: 'from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700',
  },
  the_sun: {
    borderCard: 'border-amber-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(245,158,11,0.35)]',
    headerGradient: 'from-[#1c0836] via-[#381163] to-[#1c0836]',
    headerBorder: 'border-amber-400/60',
    headerSubtext: 'text-amber-200',
    photoBorder: 'border-amber-400',
    dishBadgeBg: 'bg-amber-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-amber-300',
    quoteBg: 'bg-amber-50/80',
    quoteBorder: 'border-amber-200',
    quoteText: 'text-amber-950',
    quoteHeader: 'text-amber-800',
    talismanBanner: 'from-amber-100/80 via-yellow-50 to-orange-100/70',
    talismanBorder: 'border-amber-300',
    talismanText: 'text-amber-900',
    talismanBtn: 'bg-amber-500 hover:bg-amber-600 text-white',
    actionPrimaryBtn: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
  },
  the_world: {
    borderCard: 'border-fuchsia-400',
    shadowAura: 'shadow-[0_20px_60px_-15px_rgba(217,70,239,0.35)]',
    headerGradient: 'from-fuchsia-950 via-purple-900 to-slate-950',
    headerBorder: 'border-fuchsia-500/60',
    headerSubtext: 'text-fuchsia-200',
    photoBorder: 'border-fuchsia-400',
    dishBadgeBg: 'bg-fuchsia-400',
    dishBadgeText: 'text-stone-950',
    dishPriceColor: 'text-fuchsia-300',
    quoteBg: 'bg-fuchsia-50/80',
    quoteBorder: 'border-fuchsia-200',
    quoteText: 'text-fuchsia-950',
    quoteHeader: 'text-fuchsia-800',
    talismanBanner: 'from-fuchsia-100/80 via-purple-50 to-pink-100/70',
    talismanBorder: 'border-fuchsia-300',
    talismanText: 'text-fuchsia-900',
    talismanBtn: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white',
    actionPrimaryBtn: 'from-fuchsia-600 to-purple-700 hover:from-fuchsia-700 hover:to-purple-800',
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

        {/* Zodiac Horoscope Selector (Hiển thị đầy đủ 12 Cung & Vũ Trụ) - Mở rộng toàn diện, bỏ khung viền vàng */}
        <div className="relative z-10 w-full mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#17052e] via-[#2b0c4f] to-[#17052e] border border-purple-800/50 shadow-xl overflow-hidden text-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-1 relative z-10">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 m-0">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent font-black">
                CHỌN CUNG HOÀNG ĐẠO (ĐẦY ĐỦ 12 CUNG & VŨ TRỤ):
              </span>
            </h2>
            <span className="text-xs text-purple-200 font-semibold">
              ✦ 13 năng lượng vị giác
            </span>
          </div>

          {/* Lưới các cung hoàng đạo rộng rãi, bề thế, dễ thao tác */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-2.5 relative z-10 w-full">
            {ZODIAC_SIGNS.map((z) => {
              const isSelected = selectedZodiac.id === z.id;
              const isUniversal = z.id === 'all';
              return (
                <button
                  key={z.id}
                  onClick={() => {
                    setSelectedZodiac(z);
                    tarotAudio.playCandleSpark();
                  }}
                  className={`px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-[13px] font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm w-full text-center ${
                    isUniversal ? 'col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1' : ''
                  } ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-stone-950 font-black shadow-[0_0_18px_rgba(245,158,11,0.55)] scale-[1.02] border border-amber-100 ring-2 ring-amber-400/40'
                      : 'bg-white/10 hover:bg-white/20 text-stone-100 hover:text-white border border-white/15 hover:border-purple-400/60'
                  }`}
                >
                  <span className="text-sm sm:text-base shrink-0">{z.symbol}</span>
                  <span className="truncate">{z.name}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 text-left text-xs sm:text-sm text-purple-100 px-4 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#100324]/95 via-[#1e073b]/90 to-[#100324]/95 border border-purple-700/40 flex flex-wrap sm:flex-nowrap items-center gap-2 shadow-inner relative z-10">
            <span className="text-amber-300 font-bold shrink-0">🔮 Khẩu vị {selectedZodiac.name}:</span>
            <strong className="text-stone-100 font-medium leading-relaxed">{selectedZodiac.cravingDesc}</strong>
          </div>
        </div>

        {/* State 1: Deck of 12 Mystical Arcana Cards */}
        {!revealedResult ? (
          <div className="relative z-10 w-full">
            <div className="text-center mb-6">
              <h2 className="text-xs sm:text-sm md:text-base font-black text-stone-800 uppercase tracking-widest flex items-center justify-center gap-2 m-0">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Chọn 1 lá bài bạn cảm thấy gắn kết tâm linh nhất để khai quẻ:
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h2>
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
        /* State 2: Revealed Non-Duplicate Tarot Card - Màu khung & hào quang đồng bộ màu thẻ bài */
        (() => {
          const theme = ARCHETYPE_THEMES[revealedResult.archetype.id] || DEFAULT_THEME;
          return (
            <div className="relative z-10 max-w-xl mx-auto animate-fade-in">
              <div className={`bg-white rounded-3xl border-2 ${theme.borderCard} ${theme.shadowAura} overflow-hidden text-center relative text-stone-900 transition-all duration-500`}>
                {/* Top banner đồng bộ màu sắc và hào quang của lá bài */}
                <div className={`relative bg-gradient-to-r ${theme.headerGradient} p-4 sm:p-5 text-white flex items-center justify-between border-b ${theme.headerBorder} overflow-hidden`}>
                  {/* Subtle corner flourishes in header */}
                  <div className="absolute top-1 left-1 opacity-40 scale-75 pointer-events-none">
                    <TarotCornerFlourish position="tl" />
                  </div>
                  <div className="absolute top-1 right-1 opacity-40 scale-75 pointer-events-none">
                    <TarotCornerFlourish position="tr" />
                  </div>

                  <div className="flex items-center gap-2.5 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-black/40 border border-amber-300/40 flex items-center justify-center text-white shadow-inner shrink-0 p-1">
                      <TarotSigilArt type={revealedResult.archetype.sigilType} sizeClass="w-9 h-9" />
                    </div>
                    <div className="text-left">
                      <div className={`text-[11px] font-bold ${theme.headerSubtext} uppercase tracking-wider flex items-center gap-1.5`}>
                        <span>{revealedResult.archetype.romanNumeral}</span>
                        <span>•</span>
                        <span>{revealedResult.archetype.latin}</span>
                        <span>•</span>
                        <span className="font-extrabold text-amber-300">QUẺ #{revealedResult.drawOrder}</span>
                      </div>
                      <div className="text-base sm:text-lg font-black text-white tracking-wide">
                        {revealedResult.archetype.name}
                      </div>
                    </div>
                  </div>

                  {/* Upright vs Reversed Orientation Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm relative z-10 shrink-0 ${
                    revealedResult.isUpright
                      ? 'bg-emerald-500 text-white border-emerald-400'
                      : 'bg-purple-600 text-white border-purple-400'
                  }`}>
                    <span>{revealedResult.isUpright ? '✦ Thuận Chiều' : '✦ Nghịch Chiều'}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  {/* Dish Photo & Basic Info with matching frame color */}
                  <div className={`relative mb-5 rounded-2xl overflow-hidden border-2 ${theme.photoBorder} shadow-lg group`}>
                    <img
                      src={revealedResult.dish.image}
                      alt={`Quẻ bài Tarot ẩm thực: ${revealedResult.dish.vietnameseName || revealedResult.dish.name} chiêm tinh cung ${revealedResult.zodiac.name} - Hôm Nay Ăn Gì`}
                      referrerPolicy="no-referrer"
                      className={`w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500 ${
                        !revealedResult.isUpright ? 'brightness-95' : ''
                      }`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-left text-white">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${theme.dishBadgeBg} ${theme.dishBadgeText} text-[11px] font-black w-fit shadow`}>
                          <Flame className="w-3 h-3 text-red-600 fill-red-600" />
                          MÓN VŨ TRỤ CHỈ ĐỊNH
                        </div>
                        <div className="text-[11px] font-bold text-amber-200">
                          {revealedResult.zodiac.symbol} {revealedResult.zodiac.name}
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black drop-shadow leading-tight text-white">
                        {revealedResult.dish.vietnameseName || revealedResult.dish.name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-stone-200 mt-1">
                        <span>{revealedResult.dish.calories}</span>
                        <span>•</span>
                        <span className={`font-black ${theme.dishPriceColor} drop-shadow-xs`}>
                          {formatVND(revealedResult.dish.estimatedPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mystical Prophecy Quote & Warning with themed card tone */}
                  <div className={`p-4 rounded-2xl ${theme.quoteBg} border ${theme.quoteBorder} ${theme.quoteText} italic text-sm sm:text-base leading-relaxed mb-5 relative text-left shadow-2xs`}>
                    <div className={`text-xs uppercase font-extrabold ${theme.quoteHeader} tracking-wider not-italic mb-1.5 flex items-center gap-1.5`}>
                      <Compass className="w-3.5 h-3.5 text-amber-700" />
                      Lời Sấm Truyền Vị Giác:
                    </div>
                    {revealedResult.quote}

                    {/* Reversed Cosmic Warning Note */}
                    {!revealedResult.isUpright && revealedResult.warningQuote && (
                      <div className={`mt-2.5 pt-2.5 border-t ${theme.quoteBorder} text-purple-900 text-xs sm:text-sm not-italic font-sans`}>
                        ⚠️ <strong className="text-amber-900 font-bold">Cảnh báo nghịch chiều:</strong> {revealedResult.warningQuote}
                      </div>
                    )}
                  </div>

                  {/* Cosmic Stats (Lucky number, Hour, Element) */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
                    <div className={`p-3 ${theme.quoteBg} rounded-2xl border ${theme.quoteBorder} text-center shadow-2xs`}>
                      <div className={`text-[10px] uppercase font-bold ${theme.quoteHeader}`}>Số Thần Tài</div>
                      <div className={`text-lg sm:text-xl font-black ${theme.quoteHeader}`}>
                        #{revealedResult.luckyNumber}
                      </div>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-center shadow-2xs">
                      <div className="text-[10px] uppercase font-bold text-stone-500">Giờ Hoàng Đạo</div>
                      <div className="text-xs sm:text-sm font-extrabold text-stone-800 line-clamp-1 mt-0.5">
                        {revealedResult.luckyHours}
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-center shadow-2xs">
                      <div className="text-[10px] uppercase font-bold text-purple-800">Hào Quang</div>
                      <div className="text-xs sm:text-sm font-extrabold text-purple-700 line-clamp-1 mt-0.5">
                        {revealedResult.elementText.split('(')[0]}
                      </div>
                    </div>
                  </div>

                  {/* Food Amulet Card Launch Banner with matching palette */}
                  <div className={`mb-5 p-3.5 rounded-2xl bg-gradient-to-r ${theme.talismanBanner} border ${theme.talismanBorder} flex items-center justify-between gap-2 text-left shadow-2xs`}>
                    <div className="flex items-center gap-2.5">
                      <Scroll className="w-5 h-5 text-amber-700 shrink-0" />
                      <div>
                        <div className={`text-xs font-black ${theme.talismanText}`}>Tấm Bùa Hộ Mệnh Ẩm Thực</div>
                        <div className="text-[10px] text-stone-600">Lưu phù chú hoặc chia sẻ bạn bè</div>
                      </div>
                    </div>
                    <button
                      onClick={handleOpenAmulet}
                      className={`px-3.5 py-1.5 rounded-xl ${theme.talismanBtn} font-black text-xs transition-transform active:scale-95 cursor-pointer shrink-0 shadow-sm`}
                    >
                      Xem Bùa Hộ Mệnh
                    </button>
                  </div>

                  {/* Order Buttons with District Priority */}
                  <div className="pt-3 border-t border-stone-200 mb-5">
                    <div className="mb-3 max-w-md mx-auto">
                      <DeliveryLocationBadge
                        location={userLocation}
                        onClick={() => onOpenLocationModal(revealedResult.dish.name)}
                        variant="card"
                      />
                    </div>

                    <div className="text-xs font-bold text-stone-700 mb-3 flex items-center justify-center gap-1.5">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                      <span>
                        Bấm nút để tìm quán <strong>"{revealedResult.dish.name}"</strong> tại{' '}
                        <strong className="text-orange-600 underline decoration-orange-400/50">
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
                        className="py-3 px-3 rounded-2xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 shrink-0" />
                        <span>ShopeeFood</span>
                      </button>

                      <button
                        onClick={() =>
                          trackAndOpenAffiliateLink('grabfood', revealedResult.dish, affiliateConfig, userLocation)
                        }
                        title={`Chuyển qua GrabFood tìm quán ${revealedResult.dish.name} tại ${targetArea}`}
                        className="py-3 px-3 rounded-2xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 shrink-0" />
                        <span>GrabFood</span>
                      </button>

                      <button
                        onClick={() =>
                          trackAndOpenAffiliateLink('befood', revealedResult.dish, affiliateConfig, userLocation)
                        }
                        title={`Chuyển qua BeFood tìm quán ${revealedResult.dish.name} tại ${targetArea}`}
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
                      className={`w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r ${theme.actionPrimaryBtn} text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02] uppercase tracking-wider`}
                    >
                      <RefreshCw className={`w-4 h-4 text-white ${isFlipping ? 'animate-spin' : ''}`} />
                      Khai quẻ món khác
                    </button>

                    {onSelectDish && (
                      <button
                        onClick={() => onSelectDish(revealedResult.dish)}
                        className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-200"
                      >
                        <Eye className="w-4 h-4 text-amber-600" />
                        Xem chi tiết món
                      </button>
                    )}

                    <button
                      onClick={() => setRevealedResult(null)}
                      className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Rút từ bộ bài
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
