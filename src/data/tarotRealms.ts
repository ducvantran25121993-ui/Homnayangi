import { Dish } from '../types';

export type TarotRealmId = 'thuc_canh' | 'do_mien' | 'thuy_duoc' | 'tuy_vi';

export interface TarotRealm {
  id: TarotRealmId;
  name: string;
  tagline: string;
  shortDesc: string;
  icon: string;
  emoji: string;
  activeGradient: string;
  activeBorder: string;
  glowColor: string;
  badgeColor: string;
  pillBg: string;
  oracleFlavor: string;
}

export const TAROT_REALMS: TarotRealm[] = [
  {
    id: 'thuc_canh',
    name: 'Thực Cảnh',
    tagline: 'Bữa Chính No Nê • Vững Dạ Sinh Lực',
    shortDesc: 'Cơm, Bún, Phở, Mì, Bánh Mì, Món Mặn',
    icon: 'Utensils',
    emoji: '🍲',
    activeGradient: 'from-amber-600 via-orange-600 to-amber-700',
    activeBorder: 'border-amber-400',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    pillBg: 'bg-gradient-to-r from-amber-500/15 to-orange-500/15',
    oracleFlavor: 'Cõi ẩm thực no nê, chắc bụng, hồi sinh năng lượng thể chất và tinh thần.',
  },
  {
    id: 'do_mien',
    name: 'Đồ Miên',
    tagline: 'Ăn Vặt Xế Chiều • Miên Man Ngọt Ngào',
    shortDesc: 'Bánh Tráng, Chè, Kem, Bánh Ngọt, Tráng Miệng',
    icon: 'Cookie',
    emoji: '🍡',
    activeGradient: 'from-pink-600 via-rose-600 to-fuchsia-700',
    activeBorder: 'border-pink-400',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-400/40',
    pillBg: 'bg-gradient-to-r from-pink-500/15 to-rose-500/15',
    oracleFlavor: 'Miên man vị giác ngọt ngào, xua tan căng thẳng với từng ngụm chè, que kem giòn thơm.',
  },
  {
    id: 'thuy_duoc',
    name: 'Thủy Dược',
    tagline: 'Tiên Dược Dạng Nước • Tỉnh Thức Thanh Khiết',
    shortDesc: 'Trà Sữa, Cà Phê, Nước Ép, Sinh Tố, Trà Thơm',
    icon: 'Coffee',
    emoji: '🍵',
    activeGradient: 'from-cyan-600 via-teal-600 to-blue-700',
    activeBorder: 'border-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    pillBg: 'bg-gradient-to-r from-cyan-500/15 to-teal-500/15',
    oracleFlavor: 'Dòng nước tiên dược tưới mát tâm can, bừng sáng trí tuệ và khơi mở nguồn cảm hứng mới.',
  },
  {
    id: 'tuy_vi',
    name: 'Túy Vị',
    tagline: 'Mồi Nhắm Say Lòng • Huynh Đệ Tri Kỷ',
    shortDesc: 'Món Nhậu, Ốc, Chân Gà, Nướng, Mực, Bia Mồi',
    icon: 'Flame',
    emoji: '🍻',
    activeGradient: 'from-purple-600 via-indigo-600 to-violet-700',
    activeBorder: 'border-purple-400',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    pillBg: 'bg-gradient-to-r from-purple-500/15 to-indigo-500/15',
    oracleFlavor: 'Hương vị men say kết nối tâm hồn, nâng ly hội ngộ cùng chiến hữu đậm đà phong vị.',
  },
];

export function isDishInRealm(dish: Dish, realmId: TarotRealmId): boolean {
  if (realmId === 'thuy_duoc') {
    return dish.category === 'do_uong';
  }

  if (realmId === 'do_mien') {
    return dish.category === 'an_vat';
  }

  if (realmId === 'tuy_vi') {
    if (dish.category === 'mon_nhau') return true;
    // Also include drinking/pub dishes from grilling or seafood
    if (
      dish.id === 'bach-tuoc-nuong-sa-te' ||
      dish.id === 'nuong-ngoi-bo-toi' ||
      dish.id === 'mien-xao-cua' ||
      dish.popularTags?.some((t) => t.toLowerCase().includes('ăn nhậu') || t.toLowerCase().includes('mồi'))
    ) {
      return true;
    }
    return false;
  }

  // thuc_canh (Default main meals)
  // Exclude drinks, snacks, and pure drinking appetizers
  if (dish.category === 'do_uong' || dish.category === 'an_vat' || dish.category === 'mon_nhau') {
    return false;
  }
  if (dish.id === 'bach-tuoc-nuong-sa-te') {
    return false;
  }
  return true;
}
