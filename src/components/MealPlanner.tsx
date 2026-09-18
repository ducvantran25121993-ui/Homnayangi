import React, { useState, useEffect, useMemo } from 'react';
import {
  CalendarDays,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Printer,
  Utensils,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight,
  Sun,
  Sunrise,
  Moon,
  Shuffle,
  Pencil,
  Plus,
  Trash2,
  Share2,
  SlidersHorizontal,
  Flame,
  Coins,
  Heart,
  Grid,
  ListFilter,
  CheckCircle2,
  Info,
  ShieldCheck
} from 'lucide-react';
import { Dish, MealSlot, UserLocation, AffiliateConfig, DayPlan, WeeklyMealPlan } from '../types';
import { TabType } from '../utils/navigation';
import {
  DAYS_OF_WEEK,
  MEAL_PRESETS,
  getCurrentDayId,
  getWeekInfo,
  getDishIdsFromPlan,
  getAllStoredPlans,
  saveStoredPlan,
  loadMealPlanForWeek,
  generateWeeklyPlan,
  getRandomDishForSlot,
  calculatePlanStats,
  formatPlanAsShareText,
  parseCalories,
  WeekInfo
} from '../utils/mealPlanner';
import { INITIAL_DISHES } from '../data/dishes';
import { MealDishPickerModal } from './MealDishPickerModal';

interface MealPlannerProps {
  affiliateConfig?: AffiliateConfig;
  userLocation?: UserLocation;
  onOpenLocationModal?: () => void;
  onSelectDish: (dish: Dish) => void;
  onNavigate?: (tab: TabType) => void;
}

const SLOT_CONFIG: Record<
  MealSlot,
  {
    title: string;
    time: string;
    icon: React.ReactNode;
    color: string;
    bgBadge: string;
  }
> = {
  breakfast: {
    title: 'Bữa Sáng',
    time: '07:00 - 09:00',
    icon: <Sunrise className="w-4 h-4 text-amber-500" />,
    color: 'text-amber-700',
    bgBadge: 'bg-amber-50 border-amber-200 text-amber-700',
  },
  lunch: {
    title: 'Bữa Trưa',
    time: '11:30 - 13:00',
    icon: <Sun className="w-4 h-4 text-orange-500" />,
    color: 'text-orange-700',
    bgBadge: 'bg-orange-50 border-orange-200 text-orange-700',
  },
  dinner: {
    title: 'Bữa Tối',
    time: '18:30 - 20:30',
    icon: <Moon className="w-4 h-4 text-indigo-500" />,
    color: 'text-indigo-700',
    bgBadge: 'bg-indigo-50 border-indigo-200 text-indigo-700',
  },
};

export const MealPlanner: React.FC<MealPlannerProps> = ({
  userLocation,
  onOpenLocationModal,
  onSelectDish,
  onNavigate,
}) => {
  // Calendar Week state & navigation
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const weekInfo = useMemo(() => getWeekInfo(weekOffset), [weekOffset]);
  const [avoidedCount, setAvoidedCount] = useState<number>(21);

  // Plan state loaded dynamically for current weekOffset
  const [plan, setPlan] = useState<WeeklyMealPlan>(() => {
    return loadMealPlanForWeek(0).plan;
  });
  const [selectedDayId, setSelectedDayId] = useState<string>(getCurrentDayId);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Dish Picker state
  const [pickerState, setPickerState] = useState<{
    isOpen: boolean;
    dayId: string;
    slot: MealSlot;
    currentDish?: Dish | null;
  }>({
    isOpen: false,
    dayId: 't2',
    slot: 'lunch',
    currentDish: null,
  });

  const todayId = useMemo(() => getCurrentDayId(), []);

  const dishLookup = useMemo(() => {
    const map = new Map<string, Dish>();
    for (const d of INITIAL_DISHES) {
      map.set(d.id, d);
    }
    return map;
  }, []);

  // Update plan when weekOffset changes
  useEffect(() => {
    const loaded = loadMealPlanForWeek(weekOffset, plan.presetKey || 'balanced');
    setPlan(loaded.plan);
    setAvoidedCount(loaded.avoidedCount);
  }, [weekOffset]);

  // Save changes to multi-week storage whenever plan updates
  useEffect(() => {
    saveStoredPlan(plan);
  }, [plan]);

  const stats = useMemo(() => calculatePlanStats(plan), [plan]);

  // Handle Preset Change or Randomize with anti-duplication against previous week
  const handleApplyPreset = (presetId: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      // Find previous week's dish ids to strictly avoid
      const prevWeekInfo = getWeekInfo(weekOffset - 1);
      const allPlans = getAllStoredPlans();
      const prevPlan = allPlans[prevWeekInfo.weekKey];
      const prevWeekDishIds = getDishIdsFromPlan(prevPlan);

      const newPlan = generateWeeklyPlan(presetId, weekInfo, prevWeekDishIds);
      setPlan(newPlan);
      saveStoredPlan(newPlan);

      const currentDishIds = getDishIdsFromPlan(newPlan);
      const avoided =
        prevWeekDishIds.length > 0
          ? currentDishIds.filter((id) => !prevWeekDishIds.includes(id)).length
          : 21;
      setAvoidedCount(avoided);
      setIsGenerating(false);
    }, 250);
  };

  // Shuffle a single meal slot with anti-duplication
  const handleShuffleSlot = (dayId: string, slot: MealSlot) => {
    const prevWeekInfo = getWeekInfo(weekOffset - 1);
    const allPlans = getAllStoredPlans();
    const prevPlan = allPlans[prevWeekInfo.weekKey];
    const prevWeekDishIds = getDishIdsFromPlan(prevPlan);

    const currentDishId = plan.days[dayId]?.[slot]?.id;
    const currentWeekUsed = getDishIdsFromPlan(plan).filter((id) => id !== currentDishId);

    const newDish = getRandomDishForSlot(
      slot,
      plan.presetKey || 'balanced',
      currentWeekUsed,
      prevWeekDishIds
    );

    if (newDish) {
      setPlan((prev) => ({
        ...prev,
        updatedAt: new Date().toISOString(),
        days: {
          ...prev.days,
          [dayId]: {
            ...prev.days[dayId],
            [slot]: newDish,
          },
        },
      }));
    }
  };

  // Remove meal from slot (mark as eat out / fast / self-cook)
  const handleRemoveSlot = (dayId: string, slot: MealSlot) => {
    setPlan((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      days: {
        ...prev.days,
        [dayId]: {
          ...prev.days[dayId],
          [slot]: null,
        },
      },
    }));
  };

  // Open Dish Picker
  const handleOpenPicker = (dayId: string, slot: MealSlot, currentDish?: Dish | null) => {
    setPickerState({
      isOpen: true,
      dayId,
      slot,
      currentDish,
    });
  };

  // Assign chosen dish from Picker
  const handleDishChosen = (dish: Dish) => {
    const { dayId, slot } = pickerState;
    setPlan((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      days: {
        ...prev.days,
        [dayId]: {
          ...prev.days[dayId],
          [slot]: dish,
        },
      },
    }));
  };

  // Copy shareable text to clipboard
  const handleCopyText = async () => {
    try {
      const text = formatPlanAsShareText(plan);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  // Print schedule
  const handlePrint = () => {
    window.print();
  };

  const activeDay = plan.days[selectedDayId] || plan.days['t2'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-stone-800">
      
      {/* Submenu tab switcher for Món Ngon */}
      {onNavigate && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-2xl bg-stone-100/90 border border-stone-200/80 shadow-2xs">
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:bg-stone-50"
            >
              <UtensilsCrossed className="w-4 h-4 text-stone-500" />
              <span>Tất Cả Món Ngon (160+)</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-xs text-stone-900 text-xs sm:text-sm font-bold border border-stone-200/60"
            >
              <CalendarDays className="w-4 h-4 text-orange-600" />
              <span>Lịch Ăn Tuần</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3.5 border border-orange-200/80">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Gợi Ý Lịch Ăn Theo Tuần Thông Minh</span>
        </div>
        
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-black text-stone-900 tracking-tight leading-tight mb-3 md:whitespace-nowrap">
          <span>Lịch Ăn Tuần: </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">
            Thực Đơn 7 Ngày Chuẩn Vị & Tiết Kiệm
          </span>
        </h1>
        
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl mx-auto">
          Không còn mất 30 phút mỗi ngày đau đầu nghĩ <strong className="text-stone-900">&quot;Ăn gì hôm nay?&quot;</strong>. Lập sẵn thực đơn 21 bữa sáng, trưa, tối đủ calo, chuẩn vị truyền thống 3 miền, tự do đổi món và đặt đồ ăn nhanh trong tích tắc.
        </p>
      </div>

      {/* Calendar Week Navigator & Anti-Duplicate Shield Bar */}
      <div className="bg-stone-900 text-white rounded-3xl p-4 sm:p-5 mb-8 shadow-md border border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-11 h-11 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                {weekInfo.label}
              </span>
              {weekInfo.isCurrentWeek ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  Tuần hiện tại
                </span>
              ) : weekOffset === 1 ? (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                  Tuần kế tiếp
                </span>
              ) : weekOffset === -1 ? (
                <span className="px-2.5 py-0.5 rounded-full bg-stone-700/80 text-stone-300 text-xs font-bold border border-stone-600">
                  Tuần trước
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-stone-700/80 text-stone-300 text-xs font-bold border border-stone-600">
                  {weekOffset > 0 ? `Tuần +${weekOffset}` : `Tuần ${weekOffset}`}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-400 mt-1">
              <span>{weekInfo.dateRangeLabel}</span>
              <span className="hidden sm:inline text-stone-600">•</span>
              <div className="inline-flex items-center gap-1.5 text-amber-300 font-medium bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Khác biệt 100%: Đã loại trừ món tuần trước ({avoidedCount}/21 món mới lạ)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t border-stone-800 md:border-t-0">
          <button
            onClick={() => setWeekOffset((prev) => prev - 1)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-stone-700/80 cursor-pointer active:scale-95 shadow-2xs"
            title="Xem lại lịch ăn tuần trước"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Tuần trước</span>
          </button>

          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="px-3 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs"
            >
              Về tuần này
            </button>
          )}

          <button
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-stone-700/80 cursor-pointer active:scale-95 shadow-2xs"
            title="Lên thực đơn sớm cho tuần tiếp theo"
          >
            <span>Tuần sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Chooser Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-extrabold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Thực Đơn Mẫu Theo Nhu Cầu</span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Chọn nhanh một chế độ ăn phù hợp hoặc bấm &quot;Xáo trộn tuần mới&quot; để tạo ngẫu nhiên
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => handleApplyPreset(plan.presetKey || 'balanced')}
              disabled={isGenerating}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Xáo Trộn Tuần Mới</span>
            </button>

            <button
              onClick={handleCopyText}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Sao chép thực đơn dạng chữ để gửi qua Zalo / Messenger / Threads"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Sao chép lịch</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="In thực đơn để dán tủ lạnh"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">In lịch</span>
            </button>
          </div>
        </div>

        {/* Presets Button Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-4">
          {MEAL_PRESETS.map((preset) => {
            const isActive = plan.presetKey === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className={`flex flex-col text-left p-3 rounded-2xl border transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-orange-50/80 border-orange-300 ring-2 ring-orange-400/20 shadow-xs'
                    : 'bg-stone-50/60 hover:bg-stone-100/80 border-stone-200/70'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-orange-600 text-white' : 'bg-stone-200/80 text-stone-600 group-hover:bg-stone-300'
                  }`}>
                    {preset.badge}
                  </span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />}
                </div>
                <div className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-orange-600 transition-colors">
                  {preset.title}
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-snug">
                  {preset.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Weekly Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">Tổng tiền dự tính</span>
            <div className="font-black text-sm sm:text-base text-stone-900">
              ~{stats.totalEstimatedCost.toLocaleString('vi-VN')}đ
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">
              ~{stats.avgDailyCost.toLocaleString('vi-VN')}đ/ngày
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">Calo trung bình</span>
            <div className="font-black text-sm sm:text-base text-stone-900">
              ~{stats.avgDailyCalories} kcal
            </div>
            <span className="text-[10px] text-orange-600 font-semibold">
              Mỗi ngày (3 bữa)
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">Số món đa dạng</span>
            <div className="font-black text-sm sm:text-base text-stone-900">
              {stats.uniqueDishesCount} / 21 món
            </div>
            <span className="text-[10px] text-amber-600 font-semibold">
              Không lo bị ngán
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">Hôm nay</span>
            <div className="font-black text-sm sm:text-base text-stone-900">
              {DAYS_OF_WEEK.find((d) => d.id === todayId)?.name || 'Hôm nay'}
            </div>
            <button
              onClick={() => setSelectedDayId(todayId)}
              className="text-[10px] text-blue-600 font-bold hover:underline"
            >
              Xem thực đơn hôm nay →
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher & Day Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        
        {/* Day Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1.5 bg-stone-100 rounded-2xl border border-stone-200/70 scrollbar-none">
          {DAYS_OF_WEEK.map((d) => {
            const isSelected = selectedDayId === d.id;
            const isToday = d.id === todayId;
            return (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDayId(d.id);
                  if (viewMode !== 'day') setViewMode('day');
                }}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected && viewMode === 'day'
                    ? 'bg-white text-stone-900 shadow-xs border border-stone-200/60'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <span>{d.name}</span>
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" title="Hôm nay" />
                )}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Day vs Week Matrix */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/70 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setViewMode('day')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'day'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Theo Ngày</span>
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'week'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Xem Cả Tuần</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: DAY-BY-DAY VIEW */}
      {viewMode === 'day' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <span>{activeDay.dayName}</span>
              {selectedDayId === todayId && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 font-bold border border-orange-200">
                  Hôm nay
                </span>
              )}
            </h2>
            <div className="text-xs text-stone-500 font-medium">
              3 bữa chính • Ước tính ~
              {(
                (activeDay.breakfast?.estimatedPrice || 0) +
                (activeDay.lunch?.estimatedPrice || 0) +
                (activeDay.dinner?.estimatedPrice || 0)
              ).toLocaleString('vi-VN')}đ
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {(['breakfast', 'lunch', 'dinner'] as MealSlot[]).map((slot) => {
              const dish = activeDay[slot];
              const cfg = SLOT_CONFIG[slot];

              return (
                <div
                  key={slot}
                  className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden flex flex-col hover:border-orange-200 transition-all group"
                >
                  {/* Slot Header */}
                  <div className="p-4 pb-3 flex items-center justify-between border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-stone-100/80">
                        {cfg.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-stone-900 block leading-tight">
                          {cfg.title}
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          {cfg.time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleShuffleSlot(selectedDayId, slot)}
                        title="Đổi món ngẫu nhiên cho bữa này"
                        className="w-8 h-8 rounded-full hover:bg-orange-50 text-stone-400 hover:text-orange-600 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenPicker(selectedDayId, slot, dish)}
                        title="Tự chọn món khác từ 160+ món"
                        className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      {dish && (
                        <button
                          onClick={() => handleRemoveSlot(selectedDayId, slot)}
                          title="Bỏ qua bữa này (tự nấu hoặc ăn ngoài)"
                          className="w-8 h-8 rounded-full hover:bg-red-50 text-stone-400 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Meal Content */}
                  {dish ? (() => {
                    const fresh = dishLookup.get(dish.id);
                    const displayImage = fresh?.image || dish.image;
                    const displayName = fresh?.vietnameseName || dish.vietnameseName;
                    const displayDesc = fresh?.description || dish.description;
                    const displayPrice = fresh?.estimatedPrice ?? dish.estimatedPrice;
                    const displayCalories = fresh?.calories || dish.calories;
                    return (
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-3.5 bg-stone-100 border border-stone-200/60">
                          <img
                            src={displayImage}
                            alt={`Món ${cfg.title.toLowerCase()} ${activeDay.dayName}: ${displayName}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {displayCalories || '450 kcal'}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="font-black text-stone-900 text-base sm:text-lg group-hover:text-orange-600 transition-colors line-clamp-1">
                            {displayName}
                          </h3>
                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                            {displayDesc}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-stone-400 block font-medium">Giá ước tính</span>
                          <span className="font-extrabold text-orange-600 text-sm">
                            {displayPrice ? `${displayPrice.toLocaleString('vi-VN')}đ` : '35.000đ - 50.000đ'}
                          </span>
                        </div>

                        <button
                          onClick={() => onSelectDish(fresh || dish)}
                          className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <span>Đặt món</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    );
                  })() : (
                    <div className="p-8 flex-1 flex flex-col items-center justify-center text-center text-stone-400">
                      <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mb-3">
                        <Utensils className="w-6 h-6 text-stone-300" />
                      </div>
                      <p className="text-xs font-medium text-stone-500 mb-3">
                        Bữa này đang để trống (Tự nấu hoặc ăn ngoài)
                      </p>
                      <button
                        onClick={() => handleOpenPicker(selectedDayId, slot)}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-orange-50 text-stone-700 hover:text-orange-600 text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Chọn món cho bữa này</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: FULL WEEK MATRIX GRID */}
      {viewMode === 'week' && (
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                Toàn Cảnh Thực Đơn 7 Ngày Trong Tuần
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Bấm vào từng món để đổi món hoặc xem chi tiết đặt hàng trên ShopeeFood, GrabFood
              </p>
            </div>
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép toàn tuần'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200/80 text-xs font-extrabold text-stone-600">
                  <th className="p-3.5 w-28">Bữa Ăn</th>
                  {DAYS_OF_WEEK.map((d) => (
                    <th key={d.id} className="p-3.5 text-center">
                      <span className={d.id === todayId ? 'text-orange-600 font-black' : ''}>
                        {d.name}
                      </span>
                      {d.id === todayId && (
                        <span className="block text-[9px] text-orange-600 font-bold">Hôm nay</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {(['breakfast', 'lunch', 'dinner'] as MealSlot[]).map((slot) => {
                  const cfg = SLOT_CONFIG[slot];
                  return (
                    <tr key={slot} className="hover:bg-stone-50/50 transition-colors">
                      <td className="p-3.5 font-bold text-stone-900 align-top bg-stone-50/40">
                        <div className="flex items-center gap-1.5">
                          {cfg.icon}
                          <span>{cfg.title}</span>
                        </div>
                        <span className="text-[10px] text-stone-400 font-normal block mt-0.5">
                          {cfg.time}
                        </span>
                      </td>

                      {DAYS_OF_WEEK.map((d) => {
                        const day = plan.days[d.id];
                        const dish = day?.[slot];

                        return (
                          <td key={d.id} className="p-2.5 align-top border-l border-stone-100">
                            {dish ? (() => {
                              const fresh = dishLookup.get(dish.id);
                              const displayImage = fresh?.image || dish.image;
                              const displayName = fresh?.vietnameseName || dish.vietnameseName;
                              const displayPrice = fresh?.estimatedPrice ?? dish.estimatedPrice;
                              const displayCalories = fresh?.calories || dish.calories;
                              return (
                              <div
                                onClick={() => onSelectDish(fresh || dish)}
                                className="p-2 rounded-2xl bg-white border border-stone-200/70 hover:border-orange-300 hover:shadow-xs transition-all cursor-pointer group"
                              >
                                <img
                                  src={displayImage}
                                  alt={`Thực đơn ${d.name} ${SLOT_CONFIG[slot].title.toLowerCase()}: ${displayName}`}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-16 object-cover rounded-xl mb-1.5"
                                  loading="lazy"
                                />
                                <div className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1 text-[11.5px]">
                                  {displayName}
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1 font-medium">
                                  <span className="text-orange-600 font-bold">
                                    {displayPrice ? `${Math.round(displayPrice / 1000)}k` : ''}
                                  </span>
                                  <span>{displayCalories ? `${parseCalories(displayCalories)} cal` : ''}</span>
                                </div>
                              </div>
                              );
                            })() : (
                              <div
                                onClick={() => handleOpenPicker(d.id, slot)}
                                className="p-4 rounded-2xl border border-dashed border-stone-200 text-center text-stone-400 hover:border-orange-300 hover:text-orange-600 transition-colors cursor-pointer"
                              >
                                <Plus className="w-4 h-4 mx-auto mb-1" />
                                <span className="text-[10px]">Thêm món</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tip Banner */}
      <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Mẹo quản lý bữa ăn:</strong> Thực đơn tuần này được lưu tự động trên trình duyệt của bạn. Bạn có thể bấm nút <strong>&quot;Sao chép lịch&quot;</strong> để dán nhanh vào nhóm chat Zalo, Messenger cùng gia đình hoặc đồng nghiệp văn phòng để cùng nhau đặt món tiết kiệm phí ship!
        </div>
      </div>

      {/* Dish Picker Modal */}
      <MealDishPickerModal
        isOpen={pickerState.isOpen}
        onClose={() => setPickerState((prev) => ({ ...prev, isOpen: false }))}
        dayName={DAYS_OF_WEEK.find((d) => d.id === pickerState.dayId)?.name || 'Hôm nay'}
        slot={pickerState.slot}
        currentDish={pickerState.currentDish}
        onSelect={handleDishChosen}
      />
    </div>
  );
};
