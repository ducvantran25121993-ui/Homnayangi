import { Dish, DayPlan, WeeklyMealPlan, MealSlot } from '../types';
import { INITIAL_DISHES } from '../data/dishes';

export const DAYS_OF_WEEK: Array<{
  id: 't2' | 't3' | 't4' | 't5' | 't6' | 't7' | 'cn';
  name: string;
  short: string;
  dayIndex: number;
}> = [
  { id: 't2', name: 'Thứ Hai', short: 'T2', dayIndex: 1 },
  { id: 't3', name: 'Thứ Ba', short: 'T3', dayIndex: 2 },
  { id: 't4', name: 'Thứ Tư', short: 'T4', dayIndex: 3 },
  { id: 't5', name: 'Thứ Năm', short: 'T5', dayIndex: 4 },
  { id: 't6', name: 'Thứ Sáu', short: 'T6', dayIndex: 5 },
  { id: 't7', name: 'Thứ Bảy', short: 'T7', dayIndex: 6 },
  { id: 'cn', name: 'Chủ Nhật', short: 'CN', dayIndex: 0 },
];

export interface MealPreset {
  id: string;
  title: string;
  desc: string;
  tag: string;
  badge: string;
}

export const MEAL_PRESETS: MealPreset[] = [
  {
    id: 'balanced',
    title: 'Cân Bằng & Đủ Chất',
    desc: 'Luân phiên món nước, cơm xôi, thịt cá rau xanh hài hòa dinh dưỡng',
    tag: 'Phổ biến nhất',
    badge: 'Đủ Dưỡng Chất',
  },
  {
    id: 'office',
    title: 'Dân Văn Phòng Tiết Kiệm',
    desc: 'Ưu tiên bữa trưa ship nhanh, gọn nhẹ, ngân sách tiết kiệm 30k - 45k',
    tag: 'Tiết kiệm',
    badge: 'Ngon - Bổ - Rẻ',
  },
  {
    id: 'healthy',
    title: 'Eat Clean & Giảm Cân',
    desc: 'Nhiều rau củ, giàu protein nạc, ít dầu mỡ, nhẹ bụng & giữ dáng',
    tag: 'Sức khỏe',
    badge: 'Low Calorie',
  },
  {
    id: 'vietnam3mien',
    title: 'Đặc Sản 3 Miền Đậm Đà',
    desc: 'Tuyển chọn các món ngon trứ danh: Phở Bắc, Bún bò Huế, Cơm tấm Nam Bộ...',
    tag: 'Chuẩn vị Việt',
    badge: 'Tinh Hoa Ẩm Thực',
  },
  {
    id: 'vegetarian',
    title: 'Thanh Tịnh & Món Chay',
    desc: '100% món ăn thực vật thơm ngon, thanh đạm, tốt cho tiêu hóa',
    tag: 'Thuần thực vật',
    badge: '100% Món Chay',
  },
];

export function getCurrentDayId(): 't2' | 't3' | 't4' | 't5' | 't6' | 't7' | 'cn' {
  if (typeof window === 'undefined') return 't2';
  const day = new Date().getDay();
  if (day === 0) return 'cn';
  if (day === 1) return 't2';
  if (day === 2) return 't3';
  if (day === 3) return 't4';
  if (day === 4) return 't5';
  if (day === 5) return 't6';
  return 't7';
}

export interface WeekInfo {
  weekKey: string;
  weekNumber: number;
  year: number;
  startDateFormatted: string;
  endDateFormatted: string;
  dateRangeLabel: string;
  label: string;
  isCurrentWeek: boolean;
  weekOffset: number;
}

/**
 * Computes calendar ISO week info for current week or relative offset (-1: last week, 0: this week, 1: next week)
 */
export function getWeekInfo(weekOffset = 0): WeekInfo {
  const now = new Date();
  const target = new Date(now.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000);

  // Determine Monday of target week
  const day = target.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(target);
  monday.setDate(target.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  // ISO 8601 week number calculation
  const temp = new Date(Date.UTC(monday.getFullYear(), monday.getMonth(), monday.getDate()));
  const dayNum = temp.getUTCDay() || 7;
  temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((temp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  const year = temp.getUTCFullYear();

  const weekKey = `${year}-W${String(weekNumber).padStart(2, '0')}`;
  const pad = (n: number) => String(n).padStart(2, '0');
  const startFmt = `${pad(monday.getDate())}/${pad(monday.getMonth() + 1)}`;
  const endFmt = `${pad(sunday.getDate())}/${pad(sunday.getMonth() + 1)}`;
  const dateRangeLabel = `${startFmt} - ${endFmt}/${sunday.getFullYear()}`;
  const label = `Tuần ${weekNumber} (${startFmt} - ${endFmt})`;

  return {
    weekKey,
    weekNumber,
    year,
    startDateFormatted: startFmt,
    endDateFormatted: endFmt,
    dateRangeLabel,
    label,
    isCurrentWeek: weekOffset === 0,
    weekOffset,
  };
}

/**
 * Extract all dish IDs currently scheduled in a weekly plan
 */
export function getDishIdsFromPlan(plan?: WeeklyMealPlan | null): string[] {
  if (!plan?.days) return [];
  const ids: string[] = [];
  Object.values(plan.days).forEach((d) => {
    if (d.breakfast?.id) ids.push(d.breakfast.id);
    if (d.lunch?.id) ids.push(d.lunch.id);
    if (d.dinner?.id) ids.push(d.dinner.id);
  });
  return ids;
}

/**
 * Strict Main Meal Dish Filter:
 * Strictly guarantees ONLY genuine main meal dishes (món ăn chính no bụng):
 * - Cơm, Xôi mặn
 * - Bún, Phở, Mì, Hủ tiếu, Miến
 * - Bánh Mì, Cuốn, Bánh cuốn, Bánh ướt
 * - Lẩu, Cháo
 * - Món Nướng, Chiên xào ăn cơm
 * - Pizza, Pasta / Mì Ý
 * - Món Chay chính
 * - Salad / Món gỏi bữa chính
 *
 * ABSOLUTELY EXCLUDES:
 * - Món ăn vặt (Xoài lắc, Bánh tráng trộn, Bánh tráng nướng, Kem bơ, Bắp xào, Bingsu, Bánh flan...)
 * - Đồ uống (Trà sen, Cà phê, Trà sữa, Sinh tố, Nước ép, Macchiato...)
 * - Mồi nhậu quán bia (Ốc, Chân gà sả tắc, Sụn gà...)
 * - Chè, Đồ ngọt tráng miệng
 */
export function isMealFoodDish(d?: Dish | null): boolean {
  if (!d) return false;

  // 1. Exclude snacks (an_vat), drinks (do_uong), and pub snacks (mon_nhau)
  if (d.category === 'do_uong' || d.category === 'an_vat' || d.category === 'mon_nhau') {
    return false;
  }

  // 2. Only allow recognized main meal categories
  const allowedCategories = [
    'com_xoi',
    'bun_pho_mi',
    'banhmi_cuon',
    'nuong_chien',
    'salad_monnhe',
    'lau_chao',
    'pizza_pasta',
    'do_chay',
    'com',
    'bun_pho',
    'healthy',
    'fastfood',
  ];

  if (!allowedCategories.includes(d.category)) {
    return false;
  }

  const name = (d.vietnameseName || d.name || '').toLowerCase();
  const searchKw = (d.searchKeyword || '').toLowerCase();
  const tags = (d.popularTags || []).map((t) => t.toLowerCase());

  // 3. Exclude tags indicating snacks, desserts, drinks, or pub bites
  if (
    tags.some(
      (t) =>
        t.includes('ăn vặt') ||
        t.includes('tráng miệng') ||
        t.includes('mồi nhậu') ||
        t.includes('uống bia') ||
        t.includes('giải khát')
    )
  ) {
    return false;
  }

  // 4. Exclude snack, sweet dessert, and drink keywords
  const excludedKeywords = [
    'trà ',
    'trà sữa',
    'cà phê',
    'cafe',
    'sinh tố',
    'nước ép',
    'nước mía',
    'macchiato',
    'latte',
    'cappuccino',
    'matcha',
    'sữa chua',
    'xoài lắc',
    'kem bơ',
    'kem ',
    'bingsu',
    'bánh flan',
    'chè ',
    'chè',
    'hoa cau',
    'khoai lang lắc',
  ];

  if (
    excludedKeywords.some(
      (kw) => name.startsWith(kw) || name.includes(kw) || searchKw.includes(kw)
    )
  ) {
    return false;
  }

  return true;
}

/**
 * Filter pool of dishes suitable for a specific meal slot and preset.
 * Strictly guarantees ONLY real food dishes are returned (no drinks/beverages).
 */
export function getFilteredDishesForSlot(slot: MealSlot, presetId = 'balanced'): Dish[] {
  // CRITICAL: Strictly food dishes only, never beverages
  let pool = INITIAL_DISHES.filter(isMealFoodDish);

  // Apply preset-specific filtering
  if (presetId === 'vegetarian') {
    const vegPool = pool.filter(
      (d) => d.category === 'do_chay' || d.popularTags?.some((t) => t.toLowerCase().includes('chay'))
    );
    if (vegPool.length > 5) pool = vegPool;
  } else if (presetId === 'healthy') {
    const healthyPool = pool.filter(
      (d) =>
        d.category === 'salad_monnhe' ||
        d.category === 'do_chay' ||
        d.popularTags?.some((t) =>
          ['healthy', 'eat clean', 'salad', 'gỏi', 'chay', 'ít dầu', 'canh', 'thanh đạm'].some((kw) =>
            t.toLowerCase().includes(kw)
          )
        ) ||
        parseCalories(d.calories) <= 500
    );
    if (healthyPool.length > 5) pool = healthyPool;
  } else if (presetId === 'office') {
    const officePool = pool.filter((d) => (d.estimatedPrice || 45000) <= 50000);
    if (officePool.length > 5) pool = officePool;
  } else if (presetId === 'vietnam3mien') {
    const regionalPool = pool.filter(
      (d) =>
        d.category === 'bun_pho_mi' ||
        d.category === 'com_xoi' ||
        d.category === 'banhmi_cuon' ||
        d.category === 'lau_chao'
    );
    if (regionalPool.length > 5) pool = regionalPool;
  }

  // Filter by slot
  if (slot === 'breakfast') {
    const breakfastList = pool.filter(
      (d) =>
        d.mealTime?.includes('sang') ||
        d.category === 'bun_pho_mi' ||
        d.category === 'banhmi_cuon' ||
        d.category === 'com_xoi'
    );
    return breakfastList.length > 0 ? breakfastList : pool;
  }

  if (slot === 'lunch') {
    const lunchList = pool.filter(
      (d) =>
        d.mealTime?.includes('trua') ||
        d.category === 'com_xoi' ||
        d.category === 'bun_pho_mi' ||
        d.category === 'pizza_pasta' ||
        d.category === 'nuong_chien'
    );
    return lunchList.length > 0 ? lunchList : pool;
  }

  if (slot === 'dinner') {
    const dinnerList = pool.filter(
      (d) =>
        d.mealTime?.includes('toi') ||
        d.category === 'lau_chao' ||
        d.category === 'nuong_chien' ||
        d.category === 'do_chay' ||
        d.category === 'salad_monnhe' ||
        d.category === 'com_xoi'
    );
    return dinnerList.length > 0 ? dinnerList : pool;
  }

  return pool;
}

/**
 * Pick a random dish for slot avoiding recent duplicates.
 * Prioritizes excluding both current week's dishes AND previous week's dishes.
 */
export function getRandomDishForSlot(
  slot: MealSlot,
  presetId = 'balanced',
  excludeDishIds: string[] = [],
  previousWeekDishIds: string[] = []
): Dish | null {
  const pool = getFilteredDishesForSlot(slot, presetId);
  if (pool.length === 0) return null;

  // Level 1 Priority: Exclude both dishes chosen in current week AND dishes from previous week!
  const strictlyNew = pool.filter(
    (d) => !excludeDishIds.includes(d.id) && !previousWeekDishIds.includes(d.id)
  );

  if (strictlyNew.length > 0) {
    const randomIndex = Math.floor(Math.random() * strictlyNew.length);
    return strictlyNew[randomIndex];
  }

  // Level 2 Fallback: If pool is restricted (e.g. niche vegetarian), at least guarantee no current week duplicates
  const availableCurrentWeek = pool.filter((d) => !excludeDishIds.includes(d.id));
  const candidatePool = availableCurrentWeek.length > 0 ? availableCurrentWeek : pool;
  const randomIndex = Math.floor(Math.random() * candidatePool.length);
  return candidatePool[randomIndex];
}

/**
 * Generate a complete 7-day meal plan for a specific week,
 * automatically filtering out dishes from the previous week.
 */
export function generateWeeklyPlan(
  presetId = 'balanced',
  weekInfo?: WeekInfo,
  previousWeekDishIds: string[] = []
): WeeklyMealPlan {
  const preset = MEAL_PRESETS.find((p) => p.id === presetId) || MEAL_PRESETS[0];
  const info = weekInfo || getWeekInfo(0);
  const usedIds: string[] = [];

  const days: Record<string, DayPlan> = {};

  DAYS_OF_WEEK.forEach((d) => {
    const b = getRandomDishForSlot('breakfast', presetId, usedIds, previousWeekDishIds);
    if (b) usedIds.push(b.id);

    const l = getRandomDishForSlot('lunch', presetId, usedIds, previousWeekDishIds);
    if (l) usedIds.push(l.id);

    const dn = getRandomDishForSlot('dinner', presetId, usedIds, previousWeekDishIds);
    if (dn) usedIds.push(dn.id);

    days[d.id] = {
      dayId: d.id,
      dayName: d.name,
      dayShort: d.short,
      breakfast: b,
      lunch: l,
      dinner: dn,
    };
  });

  return {
    id: `plan_${info.weekKey}_${Date.now()}`,
    name: preset.title,
    presetKey: preset.id,
    weekKey: info.weekKey,
    weekLabel: info.label,
    updatedAt: new Date().toISOString(),
    days,
  };
}

const MULTI_WEEK_STORAGE_KEY = 'angigio_weekly_plans_v2';
const LEGACY_STORAGE_KEY = 'angigio_meal_planner_data_v1';

export function getAllStoredPlans(): Record<string, WeeklyMealPlan> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(MULTI_WEEK_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    // Fallback: migrate legacy single-plan storage
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const parsedLegacy = JSON.parse(legacyRaw);
      const currentWeek = getWeekInfo(0);
      const initialMap: Record<string, WeeklyMealPlan> = {
        [currentWeek.weekKey]: {
          ...parsedLegacy,
          weekKey: currentWeek.weekKey,
          weekLabel: currentWeek.label,
        },
      };
      localStorage.setItem(MULTI_WEEK_STORAGE_KEY, JSON.stringify(initialMap));
      return initialMap;
    }
  } catch (err) {
    console.error('Failed to load stored weekly plans:', err);
  }
  return {};
}

export function saveStoredPlan(plan: WeeklyMealPlan): void {
  if (typeof window === 'undefined') return;
  try {
    const currentWeekKey = plan.weekKey || getWeekInfo(0).weekKey;
    const all = getAllStoredPlans();
    all[currentWeekKey] = plan;
    localStorage.setItem(MULTI_WEEK_STORAGE_KEY, JSON.stringify(all));
    // Synchronize legacy storage key for backward compatibility
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(plan));
  } catch (err) {
    console.error('Failed to save meal plan:', err);
  }
}

/**
 * Sanitizes an existing meal plan to ensure NO drinks/beverages exist in any slot.
 * Automatically replaces any beverage with a suitable food dish from that slot.
 */
export function sanitizePlanFoodOnly(plan: WeeklyMealPlan): {
  plan: WeeklyMealPlan;
  modified: boolean;
} {
  if (!plan || !plan.days) return { plan, modified: false };
  let modified = false;
  const newDays = { ...plan.days };
  const currentDishIds = getDishIdsFromPlan(plan);

  for (const dayId of Object.keys(newDays)) {
    const day = { ...newDays[dayId] };
    const slots: MealSlot[] = ['breakfast', 'lunch', 'dinner'];
    for (const slot of slots) {
      const dish = day[slot];
      if (!dish || !isMealFoodDish(dish)) {
        // Exclude currently used dish IDs to avoid in-week duplicates
        const replacement = getRandomDishForSlot(
          slot,
          plan.presetKey || 'balanced',
          currentDishIds,
          []
        );
        if (replacement) {
          day[slot] = replacement;
          currentDishIds.push(replacement.id);
          modified = true;
        }
      }
    }
    newDays[dayId] = day;
  }

  return {
    plan: modified ? { ...plan, days: newDays, updatedAt: new Date().toISOString() } : plan,
    modified,
  };
}

/**
 * Load or auto-rotate meal plan for a specific calendar week offset
 */
export function loadMealPlanForWeek(
  weekOffset = 0,
  defaultPreset = 'balanced'
): {
  plan: WeeklyMealPlan;
  previousWeekDishIds: string[];
  avoidedCount: number;
} {
  const currentWeekInfo = getWeekInfo(weekOffset);
  const prevWeekInfo = getWeekInfo(weekOffset - 1);
  const allPlans = getAllStoredPlans();

  const prevPlan = allPlans[prevWeekInfo.weekKey];
  const prevWeekDishIds = getDishIdsFromPlan(prevPlan);

  // If a plan for this week already exists, retrieve it and sanitize out any drinks
  if (
    allPlans[currentWeekInfo.weekKey]?.days &&
    Object.keys(allPlans[currentWeekInfo.weekKey].days).length === 7
  ) {
    const rawPlan = allPlans[currentWeekInfo.weekKey];
    const { plan, modified } = sanitizePlanFoodOnly(rawPlan);
    if (modified) {
      saveStoredPlan(plan);
    }
    const currentDishIds = getDishIdsFromPlan(plan);
    const avoidedCount =
      prevWeekDishIds.length > 0
        ? currentDishIds.filter((id) => !prevWeekDishIds.includes(id)).length
        : 21;

    return {
      plan,
      previousWeekDishIds: prevWeekDishIds,
      avoidedCount,
    };
  }

  // Auto-generate fresh plan for this week with anti-duplicate rotation
  const newPlan = generateWeeklyPlan(defaultPreset, currentWeekInfo, prevWeekDishIds);
  saveStoredPlan(newPlan);

  const currentDishIds = getDishIdsFromPlan(newPlan);
  const avoidedCount =
    prevWeekDishIds.length > 0
      ? currentDishIds.filter((id) => !prevWeekDishIds.includes(id)).length
      : 21;

  return {
    plan: newPlan,
    previousWeekDishIds: prevWeekDishIds,
    avoidedCount,
  };
}

export function loadMealPlanFromStorage(): WeeklyMealPlan {
  return loadMealPlanForWeek(0).plan;
}

export function saveMealPlanToStorage(plan: WeeklyMealPlan): void {
  saveStoredPlan(plan);
}

export function parseCalories(calStr?: string): number {
  if (!calStr) return 450;
  const numbers = calStr.match(/\d+/g);
  if (!numbers || numbers.length === 0) return 450;
  if (numbers.length === 1) return parseInt(numbers[0], 10);
  // Average if range like 400-500
  const n1 = parseInt(numbers[0], 10);
  const n2 = parseInt(numbers[1], 10);
  return Math.round((n1 + n2) / 2);
}

export interface PlanStats {
  totalEstimatedCost: number;
  avgDailyCost: number;
  avgDailyCalories: number;
  totalDishesCount: number;
  uniqueDishesCount: number;
}

export function calculatePlanStats(plan: WeeklyMealPlan): PlanStats {
  let totalCost = 0;
  let totalCalories = 0;
  let count = 0;
  const uniqueIds = new Set<string>();

  Object.values(plan.days).forEach((day) => {
    [day.breakfast, day.lunch, day.dinner].forEach((dish) => {
      if (dish) {
        totalCost += dish.estimatedPrice || 45000;
        totalCalories += parseCalories(dish.calories);
        count++;
        uniqueIds.add(dish.id);
      }
    });
  });

  return {
    totalEstimatedCost: totalCost,
    avgDailyCost: Math.round(totalCost / 7),
    avgDailyCalories: Math.round(totalCalories / 7),
    totalDishesCount: count,
    uniqueDishesCount: uniqueIds.size,
  };
}

/**
 * Format weekly meal plan into a clean text/markdown snippet to copy & share
 */
export function formatPlanAsShareText(plan: WeeklyMealPlan): string {
  const stats = calculatePlanStats(plan);
  const lines: string[] = [
    `🍱 LỊCH ĂN TUẦN ${plan.weekLabel ? `[${plan.weekLabel}] ` : ''}- HÔM NAY ĂN GÌ (Angigio.com)`,
    `🎯 Chế độ: ${plan.name}`,
    `💰 Tổng chi phí dự tính: ~${stats.totalEstimatedCost.toLocaleString('vi-VN')}đ (TB ${stats.avgDailyCost.toLocaleString('vi-VN')}đ/ngày)`,
    `🔥 Calo trung bình: ~${stats.avgDailyCalories} kcal/ngày`,
    `------------------------------------`,
  ];

  DAYS_OF_WEEK.forEach((d) => {
    const day = plan.days[d.id];
    lines.push(`\n📅 ${d.name.toUpperCase()}:`);
    if (day?.breakfast) {
      lines.push(`  🌅 Sáng: ${day.breakfast.vietnameseName} (${day.breakfast.estimatedPrice ? day.breakfast.estimatedPrice.toLocaleString('vi-VN') + 'đ' : ''} • ${day.breakfast.calories || ''})`);
    } else {
      lines.push(`  🌅 Sáng: Tự nấu hoặc ăn nhẹ`);
    }

    if (day?.lunch) {
      lines.push(`  ☀️ Trưa: ${day.lunch.vietnameseName} (${day.lunch.estimatedPrice ? day.lunch.estimatedPrice.toLocaleString('vi-VN') + 'đ' : ''} • ${day.lunch.calories || ''})`);
    } else {
      lines.push(`  ☀️ Trưa: Tự nấu hoặc ăn ngoài`);
    }

    if (day?.dinner) {
      lines.push(`  🌙 Tối: ${day.dinner.vietnameseName} (${day.dinner.estimatedPrice ? day.dinner.estimatedPrice.toLocaleString('vi-VN') + 'đ' : ''} • ${day.dinner.calories || ''})`);
    } else {
      lines.push(`  🌙 Tối: Tự nấu hoặc ăn nhẹ`);
    }
  });

  lines.push(`\n------------------------------------`);
  lines.push(`👉 Xem chi tiết & đặt món tại: https://www.angigio.com/mon-ngon/lich-an-theo-tuan`);
  return lines.join('\n');
}
