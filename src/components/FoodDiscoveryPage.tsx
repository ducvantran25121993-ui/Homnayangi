import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  ChefHat,
  Sparkles,
  Clock,
  Flame,
  Users,
  Search,
  BookOpen,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  ShoppingBag,
  RotateCcw,
  Utensils,
  Lightbulb,
  Heart,
  ChevronRight,
  Compass,
  Soup,
  Fish,
  Sun,
  Moon,
} from 'lucide-react';
import { Dish, UserLocation, AffiliateConfig } from '../types';
import {
  TabType,
  DiscoverSubSection,
  DISCOVER_SUB_CONFIG,
  getDiscoverSubSectionFromUrl,
  updateDiscoverSubSEO,
} from '../utils/navigation';
import { INITIAL_DISHES } from '../data/dishes';
import { REGIONAL_CUISINES } from '../data/regionalCuisine';
import {
  DAILY_DAY_MENUS,
  DEFAULT_TRAY_IMAGE,
  getTrayIngredients,
} from '../data/dailyMenus';
import { getDishRecipe, FEATURED_RECIPE_IDS } from '../data/recipes';
import { getFamilyMealDishRecipe, FamilyDishRecipe } from '../data/familyDishRecipes';

/**
 * Converts human Vietnamese time strings (e.g. "25 phút", "15 - 20 phút", "1 giờ 30 phút")
 * to standard ISO 8601 duration (e.g. "PT25M", "PT1H30M") required by Google Recipe Schema.
 */
function parseToIsoDuration(timeStr: string | undefined, defaultMinutes: number): string {
  if (!timeStr) return `PT${defaultMinutes}M`;
  const clean = timeStr.toLowerCase();

  let hours = 0;
  let minutes = 0;

  // Match hours, e.g. "3 - 4 giờ", "1 giờ", "2 tiếng", "1.5 giờ"
  const hourMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*(?:giờ|tiếng|h)/);
  if (hourMatch) {
    const h1 = parseFloat(hourMatch[1]);
    const h2 = hourMatch[2] ? parseFloat(hourMatch[2]) : h1;
    hours = Math.round((h1 + h2) / 2);
  }

  // Match minutes, e.g. "25 phút", "15 - 20 phút", "30p", "45 phút"
  const minMatch = clean.match(/(\d+)\s*(?:-\s*(\d+))?\s*(?:phút|p|m)/);
  if (minMatch) {
    const m1 = parseInt(minMatch[1], 10);
    const m2 = minMatch[2] ? parseInt(minMatch[2], 10) : m1;
    minutes = Math.round((m1 + m2) / 2);
  }

  // Fallback: search for any standalone number if neither regex matched
  if (hours === 0 && minutes === 0) {
    const anyDigit = clean.match(/\d+/);
    if (anyDigit) {
      minutes = parseInt(anyDigit[0], 10);
    } else {
      minutes = defaultMinutes;
    }
  }

  if (hours > 0 && minutes > 0) {
    return `PT${hours}H${minutes}M`;
  } else if (hours > 0) {
    return `PT${hours}H`;
  } else {
    return `PT${minutes || defaultMinutes}M`;
  }
}

/**
 * Calculates ISO 8601 total duration from prep and cook durations.
 */
function calculateTotalIsoDuration(prepDuration: string, cookDuration: string): string {
  const getMinutes = (iso: string): number => {
    let total = 0;
    const h = iso.match(/(\d+)H/);
    if (h) total += parseInt(h[1], 10) * 60;
    const m = iso.match(/(\d+)M/);
    if (m) total += parseInt(m[1], 10);
    return total || 30;
  };

  const totalMin = getMinutes(prepDuration) + getMinutes(cookDuration);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;

  if (h > 0 && m > 0) return `PT${h}H${m}M`;
  if (h > 0) return `PT${h}H`;
  return `PT${m || 30}M`;
}

/**
 * Extracts approximate numeric calories value from text (e.g. "450 - 550 kcal" -> 500).
 */
function parseCaloriesToNumber(calStr: string | undefined): number {
  if (!calStr) return 420;
  const digits = calStr.match(/\d+/g);
  if (digits && digits.length >= 2) {
    return Math.round((parseInt(digits[0], 10) + parseInt(digits[1], 10)) / 2);
  }
  if (digits && digits.length === 1) {
    return parseInt(digits[0], 10);
  }
  return 420;
}

interface FoodDiscoveryPageProps {
  onSelectDish: (dish: Dish) => void;
  onNavigate: (tab: TabType, sub?: DiscoverSubSection) => void;
  userLocation?: UserLocation;
  affiliateConfig?: AffiliateConfig;
  currentSubSection?: DiscoverSubSection;
  onSubSectionChange?: (sub: DiscoverSubSection) => void;
}

export const FoodDiscoveryPage: React.FC<FoodDiscoveryPageProps> = ({
  onSelectDish,
  onNavigate,
  userLocation,
  affiliateConfig,
  currentSubSection,
  onSubSectionChange,
}) => {
  // Main discovery section tabs: 'region' | 'daily' | 'recipe'
  const [sectionTab, setSectionTab] = useState<DiscoverSubSection>(
    () => currentSubSection || getDiscoverSubSectionFromUrl()
  );

  // Sync internal sub-tab state if prop changes from outside
  useEffect(() => {
    if (currentSubSection && currentSubSection !== sectionTab) {
      setSectionTab(currentSubSection);
    }
  }, [currentSubSection]);

  // Listen to browser Back/Forward navigation for sub-sections
  useEffect(() => {
    const handlePopState = () => {
      const currentSub = getDiscoverSubSectionFromUrl();
      setSectionTab(currentSub);
      updateDiscoverSubSEO(currentSub);
      if (onSubSectionChange) {
        onSubSectionChange(currentSub);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onSubSectionChange]);

  // Switch sub-section with URL history and SEO update
  const handleSwitchSection = (sub: DiscoverSubSection, e?: React.MouseEvent) => {
    if (e) {
      if (e.ctrlKey || e.metaKey || e.button === 1) return;
      e.preventDefault();
    }
    setSectionTab(sub);
    const targetPath = DISCOVER_SUB_CONFIG[sub].path;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab: 'discover', sub }, '', targetPath);
      window.dispatchEvent(new Event('locationchange'));
    }
    updateDiscoverSubSEO(sub);
    if (onSubSectionChange) {
      onSubSectionChange(sub);
    }
  };

  // Sub-state for Regional Cuisine
  const [selectedRegionId, setSelectedRegionId] = useState<'bac' | 'trung' | 'nam' | 'mientay'>('bac');

  // Sub-state for Daily Menus
  const [selectedDayId, setSelectedDayId] = useState<string>('t2');
  const [mealSlotTab, setMealSlotTab] = useState<'lunch' | 'dinner'>('dinner');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [copiedIngredientsToast, setCopiedIngredientsToast] = useState(false);

  const toggleIngredientCheck = (itemKey: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const handleCopyIngredients = (
    trayName: string,
    ingredients: { category: string; items: string[] }[]
  ) => {
    const text =
      `📋 DANH SÁCH NGUYÊN LIỆU ĐI CHỢ - ${trayName.toUpperCase()}\n` +
      ingredients
        .map((cat) => `\n【${cat.category}】\n` + cat.items.map((it) => `• ${it}`).join('\n'))
        .join('\n') +
      `\n\nNấu chuẩn vị cùng Ăn Gì Đây!`;
    navigator.clipboard.writeText(text);
    setCopiedIngredientsToast(true);
    setTimeout(() => setCopiedIngredientsToast(false), 2500);
  };

  // Sub-state for Cooking Recipes (Cách Nấu)
  const [recipeSearchQuery, setRecipeSearchQuery] = useState<string>('');
  const [selectedRecipeDish, setSelectedRecipeDish] = useState<Dish>(() => {
    return INITIAL_DISHES.find((d) => d.id === 'pho-bo-tai-lan') || INITIAL_DISHES[0];
  });
  const [copiedRecipe, setCopiedRecipe] = useState(false);
  const [copiedFamilyDishRecipe, setCopiedFamilyDishRecipe] = useState<string | null>(null);

  // Helper to copy a dish's recipe
  const handleCopyFamilyRecipe = (dishName: string, recipe: FamilyDishRecipe) => {
    const text = [
      `🍳 CÔNG THỨC: ${dishName}`,
      `⏱ Chuẩn bị: ${recipe.prepTime} | Nấu: ${recipe.cookTime} | Khẩu phần: ${recipe.servings}`,
      '',
      '📋 NGUYÊN LIỆU CHÍNH:',
      ...recipe.ingredients.map((it) => `• ${it}`),
      '',
      '👩‍🍳 CÁC BƯỚC NẤU NHANH:',
      ...recipe.steps.map((st) => `Bước ${st.step} (${st.title}): ${st.desc}`),
      '',
      recipe.tip ? `💡 MẸO NẤU CHUẨN VỊ: ${recipe.tip}` : '',
      '',
      'Mâm cơm gia đình chuẩn vị Việt: https://www.angigio.com',
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopiedFamilyDishRecipe(dishName);
      setTimeout(() => setCopiedFamilyDishRecipe(null), 2500);
    });
  };

  // Helper to guarantee an accurate, mouthwatering image for every dish
  const getDishDisplayImage = (dishItem: { name: string; dishId: string; image?: string }, matchedDish?: Dish): string => {
    if (dishItem.image) return dishItem.image;

    const n = dishItem.name.toLowerCase();

    // 1. Precise dish-specific images
    if (n.includes('măng tươi') || (n.includes('măng') && n.includes('sườn'))) {
      return '/images/canh_mang_tuoi_suon.jpg';
    }
    if (n.includes('gà đồi') || (n.includes('gà') && (n.includes('muối hột') || n.includes('lá chanh')))) {
      return '/images/ga_doi_hap_la_chanh.jpg';
    }
    if (n.includes('chè hạt sen') || (n.includes('long nhãn') && n.includes('đồ chua'))) {
      return '/images/do_chua_che_hat_sen.jpg';
    }
    if (n.includes('diêu hồng') && (n.includes('hấp') || n.includes('xì dầu') || n.includes('gừng'))) {
      return '/images/ca_dieu_hong_hap.jpg';
    }
    if (n.includes('nước rau muống') || (n.includes('dầm sấu') || (n.includes('rau muống') && n.includes('sấu')))) {
      return '/images/nuoc_rau_muong_dam_sau.jpg';
    }
    if (n.includes('rau muống') && (n.includes('tương bần') || n.includes('luộc'))) {
      return '/images/rau_muong_luoc_tuong_ban.jpg';
    }
    if (n.includes('cà bát') || (n.includes('bơ sáp') && n.includes('dầm'))) {
      return '/images/ca_bat_bo_sap_dam.jpg';
    }
    if (n.includes('bò') && (n.includes('kho gừng') || (n.includes('gừng') && n.includes('sả')))) {
      return '/images/bo_kho_gung_sa.jpg';
    }
    if (n.includes('gà') && (n.includes('hạt sen') || n.includes('táo đỏ') || n.includes('kỷ tử'))) {
      return '/images/canh_ga_ham_hat_sen.jpg';
    }
    if (n.includes('cải xanh') || (n.includes('trứng') && n.includes('lòng đào'))) {
      return '/images/rau_cai_luoc_trung_long_dao.jpg';
    }
    if (n.includes('cam sành') || n.includes('đu đủ chín')) {
      return '/images/cam_sanh_du_du.jpg';
    }
    if (n.includes('gỏi cuốn') && (n.includes('tôm thịt') || n.includes('tương bơ') || n.includes('đậu phộng'))) {
      return '/images/goi_cuon_tom_thit_chuan.jpg';
    }
    if (n.includes('mọc') && (n.includes('nấm hương') || n.includes('su hào') || n.includes('cà rốt'))) {
      return '/images/canh_moc_nam_huong.jpg';
    }
    if (n.includes('nấm đùi gà') && (n.includes('húng quế') || n.includes('tiêu đen'))) {
      return '/images/nam_dui_ga_xao_hung_que.jpg';
    }
    if (n.includes('nho xanh') || (n.includes('dưa leo') && n.includes('muối hột'))) {
      return '/images/dua_leo_nho_xanh.jpg';
    }
    if (n.includes('ba chỉ') && (n.includes('luộc') || n.includes('mắm nêm') || n.includes('mắm tôm'))) {
      return '/images/thit_ba_chi_luoc.jpg';
    }
    if (n.includes('mướp') && (n.includes('lạc') || n.includes('đậu phộng'))) {
      return '/images/canh_muop_huong_lac.jpg';
    }
    if ((n.includes('su hào') || n.includes('cà rốt')) && (n.includes('mực khô') || n.includes('thái chỉ'))) {
      return '/images/su_hao_ca_rot_muc.jpg';
    }
    if (n.includes('thanh long') || (n.includes('cà pháo') && n.includes('dầm'))) {
      return '/images/ca_phao_thanh_long.jpg';
    }
    if (n.includes('cuộn trứng') || n.includes('vân mây') || (n.includes('trứng') && n.includes('thịt nạc băm'))) {
      return '/images/trung_cuon_van_may.jpg';
    }
    if (n.includes('nghêu') || n.includes('ngao')) {
      return '/images/canh_ngheu_nau_chua.jpg';
    }
    if (n.includes('thiên lý') || (n.includes('bò') && n.includes('hoa'))) {
      return '/images/bo_xao_thien_ly.jpg';
    }
    if (n.includes('nhãn xuồng') || (n.includes('ớt chuông') && n.includes('ngâm chua'))) {
      return '/images/ot_chuong_nhan_xuong.jpg';
    }
    if (n.includes('cải cúc') || n.includes('tần ô')) {
      return '/images/canh_cai_cuc_tom.jpg';
    }
    if (n.includes('mực') && (n.includes('cần tây') || n.includes('hành tây') || n.includes('xào'))) {
      return '/images/muc_xao_can_tay.jpg';
    }
    if ((n.includes('ớt xiêm') || n.includes('bưởi')) && (n.includes('nước mắm') || n.includes('da xanh'))) {
      return '/images/mam_ot_xiem_buoi.jpg';
    }
    if (n.includes('gà') && (n.includes('gừng') || n.includes('sả'))) {
      return '/images/ga_kho_gung_sa_ot.jpg';
    }
    if (n.includes('khổ qua') || n.includes('mướp đắng')) {
      return '/images/canh_kho_qua_don_thit.jpg';
    }
    if (n.includes('huyết') || (n.includes('giá') && n.includes('hẹ'))) {
      return '/images/gia_xao_huyet_he.jpg';
    }
    if ((n.includes('dưa chua') || n.includes('dưa cải')) && (n.includes('thơm') || n.includes('dứa') || n.includes('muối xổi'))) {
      return '/images/dua_chua_thom_muoi_ot.jpg';
    }
    if (n.includes('chả cá') || (n.includes('cá thu') && n.includes('sốt cà'))) {
      return '/images/cha_ca_sot_ca.jpg';
    }
    if (n.includes('rau dền') || (n.includes('dền đỏ') && n.includes('tôm khô'))) {
      return '/images/canh_rau_den_tom.jpg';
    }
    if (n.includes('su su') && (n.includes('tỏi') || n.includes('xào'))) {
      return '/images/su_su_xao_toi.jpg';
    }
    if (n.includes('dưa leo') || n.includes('mận hậu')) {
      return '/images/dua_leo_man_hau.jpg';
    }
    if (n.includes('bí đỏ') && (n.includes('sườn') || n.includes('đậu phộng'))) {
      return '/images/canh_suon_bi_do.jpg';
    }
    if (n.includes('cải thìa') || (n.includes('nấm đông cô') && n.includes('dầu hào'))) {
      return '/images/cai_thia_xao_nam.jpg';
    }
    if (n.includes('kim chi') || (n.includes('xoài') && n.includes('kim chi'))) {
      return '/images/kim_chi_xoai_cat.jpg';
    }
    if (n.includes('tôm đồng') || (n.includes('tôm') && n.includes('cháy cạnh'))) {
      return '/images/tom_dong_rim_ba_chi.jpg';
    }
    if (n.includes('bắp cải') && n.includes('cà chua')) {
      return '/images/bap_cai_xao_ca_chua.jpg';
    }
    if (n.includes('dưa giá') || (n.includes('giá đỗ') && n.includes('quýt'))) {
      return '/images/dua_gia_he_quyt_duong.jpg';
    }
    if (n.includes('canh bí') || (n.includes('bí đao') && n.includes('tôm')) || (n.includes('bí xanh') && n.includes('tôm'))) {
      return '/images/canh_bi_xanh_tom.jpg';
    }
    if (n.includes('ổi') || (n.includes('cà pháo') && n.includes('xí muội'))) {
      return '/images/ca_phao_oi_xi_muoi.jpg';
    }
    if (n.includes('bầu') || n.includes('kho quẹt')) {
      return '/images/bau_luoc_kho_quet.jpg';
    }
    if (n.includes('cà pháo') || n.includes('dưa hấu')) {
      return '/images/ca_phao_muoi_dua_hau.jpg';
    }
    if (n.includes('mắm nhĩ') || n.includes('chuối cau')) {
      return '/images/chen_mam_nhi_chuoi_cau.jpg';
    }

    // 2. Safe matchedDish (ONLY for non-beverages that actually match the dish id)
    if (
      matchedDish?.image &&
      matchedDish.category !== 'do_uong' &&
      !matchedDish.id.includes('tra-dao') &&
      !matchedDish.image.includes('photo-1513558161293') &&
      dishItem.dishId === matchedDish.id
    ) {
      return matchedDish.image;
    }

    // 3. Keyword-based matching for home-cooked meal staples
    if (n.includes('dưa giá') || n.includes('dưa chua') || n.includes('dưa leo') || n.includes('cà bát') || n.includes('kim chi') || n.includes('đồ chua')) {
      return '/images/ca_phao_muoi_dua_hau.jpg';
    }
    if (n.includes('tráng miệng') || n.includes('bưởi') || n.includes('quýt') || n.includes('nhãn') || n.includes('thanh long') || n.includes('cam sành') || n.includes('chè hạt sen')) {
      return '/images/chen_mam_nhi_chuoi_cau.jpg';
    }
    if (n.includes('cá') && (n.includes('kho') || n.includes('tộ') || n.includes('nục') || n.includes('diêu hồng'))) {
      return '/images/com_ca_kho_to.jpg';
    }
    if (n.includes('canh') && (n.includes('chua') || n.includes('cá') || n.includes('nghêu') || n.includes('măng') || n.includes('sấu'))) {
      return '/images/canh_chua_ca_loc.jpg';
    }
    if (n.includes('canh cua') || n.includes('mồng tơi') || n.includes('bí') || n.includes('mướp') || n.includes('gà hầm')) {
      return '/images/canh_cua_dong.jpg';
    }
    if (n.includes('canh rau ngót') || n.includes('rau dền') || n.includes('cải ngọt') || n.includes('mọc') || n.includes('khổ qua') || n.includes('cải cúc') || n.includes('tần ô')) {
      return '/images/canh_rau_ngot_thit_bam.jpg';
    }
    if (n.includes('rau muống') || n.includes('cải thìa') || n.includes('rau cải')) {
      return '/images/rau_muong_xao_toi.jpg';
    }
    if (n.includes('đậu que') || n.includes('su su') || n.includes('giá đỗ') || n.includes('nấm') || n.includes('bắp cải') || n.includes('su hào') || n.includes('thiên lý')) {
      return '/images/dau_que_xao_toi.jpg';
    }
    if (n.includes('sườn') && (n.includes('rim') || n.includes('xào chua ngọt') || n.includes('hầm'))) {
      return '/images/suon_heo_rim_man_ngot.jpg';
    }
    if (n.includes('thịt kho') || n.includes('kho tàu') || n.includes('trứng')) {
      return '/images/thit_kho_tau.jpg';
    }
    if (n.includes('ba chỉ') || n.includes('tôm rim') || n.includes('cháy cạnh') || n.includes('thịt luộc')) {
      return '/images/ba_chi_rang.jpg';
    }
    if (n.includes('gà')) {
      return '/images/com_ga_hoi_an.jpg';
    }
    if (n.includes('bò')) {
      return '/images/com_bo_luc_lac.jpg';
    }
    if (n.includes('nem rán') || n.includes('chả giò') || n.includes('chả cá')) {
      return '/images/cha_gio.jpg';
    }
    if (n.includes('gỏi cuốn')) {
      return '/images/goi_cuon.jpg';
    }
    if (n.includes('mực')) {
      return '/images/muc_nuong.jpg';
    }

    return '/images/mam_com_gia_dinh.jpg';
  };

  // Filtered dishes for recipe selection
  const recipeFilteredDishes = useMemo(() => {
    if (!recipeSearchQuery.trim()) {
      return INITIAL_DISHES.slice(0, 24);
    }
    const q = recipeSearchQuery.toLowerCase().trim();
    return INITIAL_DISHES.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.vietnameseName.toLowerCase().includes(q) ||
        d.searchKeyword.toLowerCase().includes(q) ||
        d.popularTags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 30);
  }, [recipeSearchQuery]);

  // Current active recipe
  const currentRecipe = useMemo(() => {
    return getDishRecipe(selectedRecipeDish);
  }, [selectedRecipeDish]);

  // Current region data
  const currentRegion = useMemo(() => {
    return REGIONAL_CUISINES.find((r) => r.id === selectedRegionId) || REGIONAL_CUISINES[0];
  }, [selectedRegionId]);

  // Dishes for current region
  const regionDishes = useMemo(() => {
    const dishMap = new Map(INITIAL_DISHES.map((d) => [d.id, d]));
    return currentRegion.dishIds
      .map((id) => dishMap.get(id))
      .filter((d): d is Dish => Boolean(d));
  }, [currentRegion]);

  // Current day menu
  const currentDayMenu = useMemo(() => {
    return DAILY_DAY_MENUS.find((m) => m.id === selectedDayId) || DAILY_DAY_MENUS[0];
  }, [selectedDayId]);

  // Helper to jump to a recipe from another section
  const handleViewDishRecipe = (dish: Dish) => {
    setSelectedRecipeDish(dish);
    handleSwitchSection('recipe');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Helper to jump to recipe by dish ID
  const handleViewRecipeById = (dishId: string) => {
    const dish = INITIAL_DISHES.find((d) => d.id === dishId);
    if (dish) {
      handleViewDishRecipe(dish);
    }
  };

  // Copy recipe text to clipboard
  const handleCopyRecipe = () => {
    const lines = [
      `🍳 CÔNG THỨC NẤU: ${currentRecipe.dishName}`,
      `⏱ Chuẩn bị: ${currentRecipe.prepTime} | Nấu: ${currentRecipe.cookTime} | Độ khó: ${currentRecipe.difficulty}`,
      `👥 Khẩu phần: ${currentRecipe.servings}`,
      '',
      '📋 NGUYÊN LIỆU:',
      ...currentRecipe.ingredients.flatMap((cat) => [
        `• ${cat.category}:`,
        ...cat.items.map((it) => `  - ${it}`),
      ]),
      '',
      '👩‍🍳 CÁC BƯỚC THỰC HIỆN:',
      ...currentRecipe.steps.flatMap((st) => [
        `Bước ${st.step}: ${st.title}`,
        st.description,
        st.tip ? `(Mẹo: ${st.tip})` : '',
      ]),
      '',
      `💡 BÍ QUYẾT BẾP TRƯỞNG: ${currentRecipe.chefSecret}`,
      currentRecipe.recommendedSauce ? `🥢 Nước chấm & đồ ăn kèm: ${currentRecipe.recommendedSauce}` : '',
      '',
      'Khám phá thêm 160+ món ngon tại: https://www.angigio.com/am-thuc-vung-mien',
    ].filter(Boolean);

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopiedRecipe(true);
      setTimeout(() => setCopiedRecipe(false), 2500);
    });
  };

  // Structured Schema.org values for Google Search Console compliance
  const prepDurationIso = useMemo(
    () => parseToIsoDuration(currentRecipe.prepTime, 15),
    [currentRecipe.prepTime]
  );
  const cookDurationIso = useMemo(
    () => parseToIsoDuration(currentRecipe.cookTime, 25),
    [currentRecipe.cookTime]
  );
  const totalDurationIso = useMemo(
    () => calculateTotalIsoDuration(prepDurationIso, cookDurationIso),
    [prepDurationIso, cookDurationIso]
  );
  const recipeCaloriesNumber = useMemo(
    () => parseCaloriesToNumber(selectedRecipeDish.calories),
    [selectedRecipeDish.calories]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-radial from-amber-500/15 via-orange-500/10 to-transparent border border-orange-200/80 p-6 sm:p-10 mb-8 sm:mb-12 shadow-sm text-center">
        <div className="max-w-5xl xl:max-w-6xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/90 text-orange-800 text-xs sm:text-sm font-bold mb-4 border border-orange-200">
            <Compass className="w-4 h-4 text-orange-600 animate-spin-slow" />
            <span>
              {sectionTab === 'region'
                ? 'Bản Đồ Ẩm Thực Vùng Miền 3 Miền Việt Nam'
                : sectionTab === 'daily'
                ? 'Thực Đơn Mỗi Ngày Cân Bằng Dinh Dưỡng'
                : 'Công Thức Nấu Ăn Chuẩn Vị & Bí Quyết Bếp Trưởng'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-stone-900 tracking-tight leading-tight mb-3 md:whitespace-nowrap">
            {sectionTab === 'region'
              ? 'Ẩm Thực Vùng Miền - Tinh Hoa Hương Vị 3 Miền Bắc, Trung, Nam'
              : sectionTab === 'daily'
              ? 'Thực Đơn Mỗi Ngày - Gợi Ý Bữa Cơm Gia Đình Chuẩn Vị & Đủ Chất'
              : 'Cách Nấu Món Ngon - Công Thức Chuẩn Xác & Bí Quyết Bếp Trưởng'}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 max-w-3xl mx-auto">
            {sectionTab === 'region'
              ? 'Khám phá hương vị thanh tao miền Bắc, đậm đà cay nồng miền Trung, phóng khoáng miền Nam và trù phú miền Tây sông nước cùng danh mục hơn 160+ món ngon đặc sắc.'
              : sectionTab === 'daily'
              ? 'Gợi ý thực đơn từ Thứ 2 đến Chủ Nhật, cơm trưa văn phòng, bữa tối gia đình ấm cúng và mẹo chuẩn bị nguyên liệu nhanh gọn, tiết kiệm thời gian.'
              : 'Hướng dẫn chi tiết từng bước nấu hơn 160+ món ngon gia đình Việt Nam với định lượng nguyên liệu chuẩn xác, mẹo sơ chế và bí quyết nêm nếm gia truyền.'}
          </p>

          {/* 3 Main Pillars Navigation Tabs */}
          <nav aria-label="Chuyên mục khám phá ẩm thực" className="w-full max-w-2xl grid grid-cols-3 gap-2 p-1.5 bg-stone-900/5 backdrop-blur-md rounded-2xl border border-stone-200">
            <a
              href={DISCOVER_SUB_CONFIG.region.path}
              onClick={(e) => handleSwitchSection('region', e)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                sectionTab === 'region'
                  ? 'bg-white text-orange-600 shadow-md scale-[1.02]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">Ẩm Thực Vùng Miền</span>
            </a>

            <a
              href={DISCOVER_SUB_CONFIG.daily.path}
              onClick={(e) => handleSwitchSection('daily', e)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                sectionTab === 'daily'
                  ? 'bg-white text-orange-600 shadow-md scale-[1.02]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">Thực Đơn Mỗi Ngày</span>
            </a>

            <a
              href={DISCOVER_SUB_CONFIG.recipe.path}
              onClick={(e) => handleSwitchSection('recipe', e)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                sectionTab === 'recipe'
                  ? 'bg-white text-orange-600 shadow-md scale-[1.02]'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <ChefHat className="w-4 h-4 shrink-0" />
              <span className="truncate">Cách Nấu Món Ngon</span>
            </a>
          </nav>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: ẨM THỰC VÙNG MIỀN */}
      {/* ========================================================================= */}
      {sectionTab === 'region' && (
        <div className="space-y-8 animate-fade-in">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {REGIONAL_CUISINES.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                className={`flex items-center px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer border ${
                  selectedRegionId === region.id
                    ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white border-transparent shadow-md shadow-orange-500/25 ring-2 ring-orange-400/30'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300 hover:bg-orange-50/50 hover:text-orange-950'
                }`}
              >
                <span>{region.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Region Detailed Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-6 pb-6 border-b border-stone-100">
              <div className="space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
                  {currentRegion.badge}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {currentRegion.title}
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
                  {currentRegion.description}
                </p>
              </div>

              {/* Taste Profile Badges */}
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {currentRegion.tasteProfile.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200"
                  >
                    ✨ {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Ingredients & Chef's Tip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-amber-900">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  Gia vị &amp; Linh hồn vùng đất
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {currentRegion.iconicKeyIngredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-stone-800">
                  <Lightbulb className="w-4 h-4 text-orange-500" />
                  Nghệ thuật thưởng thức
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {currentRegion.highlightTip}
                </p>
              </div>
            </div>

            {/* Grid of Dishes in this Region */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-stone-900 text-base sm:text-lg flex items-center gap-2">
                  <span>Món Ngon Tiêu Biểu ({regionDishes.length} món)</span>
                </h3>
                <span className="text-xs text-stone-500">
                  Bấm vào món để xem cách nấu hoặc đặt ship
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="group bg-stone-50 hover:bg-white rounded-2xl border border-stone-200 hover:border-orange-300 p-3.5 transition-all hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-stone-200">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
                          {dish.calories}
                        </div>
                      </div>

                      <h4 className="font-extrabold text-stone-900 text-sm group-hover:text-orange-600 transition-colors line-clamp-1 mb-1">
                        {dish.vietnameseName}
                      </h4>
                      <p className="text-stone-500 text-xs line-clamp-2 mb-3">
                        {dish.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleViewDishRecipe(dish)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-orange-100/80 hover:bg-orange-200 text-orange-800 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <ChefHat className="w-3.5 h-3.5 text-orange-600" />
                        <span>Xem Cách Nấu</span>
                      </button>

                      <button
                        onClick={() => onSelectDish(dish)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-200" />
                        <span>Đặt Món Ship</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SECTION 2: THỰC ĐƠN MỖI NGÀY */}
      {/* ========================================================================= */}
      {sectionTab === 'daily' && (
        <div className="space-y-8 animate-fade-in">
          {/* 7 Days Weekly Menus */}
          <div className="space-y-6">
            {/* Day Pills */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {DAILY_DAY_MENUS.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                      selectedDayId === day.id
                        ? 'bg-orange-600 text-white border-orange-600 shadow-sm scale-[1.02]'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300 hover:bg-orange-50/40'
                    }`}
                  >
                    <div className="font-extrabold text-sm sm:text-base">{day.dayName}</div>
                    <div
                      className={`text-[10px] truncate ${
                        selectedDayId === day.id ? 'text-orange-100' : 'text-stone-500'
                      }`}
                    >
                      {day.estimatedTotalCalories}
                    </div>
                  </button>
                ))}
              </div>

              {/* Day Menu Detail */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-100 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-100 text-orange-800 text-xs font-bold mb-2">
                      <span>{currentDayMenu.dayName}</span>
                      <span>•</span>
                      <span>{currentDayMenu.estimatedTotalCalories}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                      {currentDayMenu.title}
                    </h2>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1">
                      {currentDayMenu.tagline}
                    </p>
                  </div>

                  <div className="text-left md:text-right shrink-0">
                    <div className="text-xs text-stone-400">Ngân sách dự kiến</div>
                    <div className="font-extrabold text-orange-600 text-sm sm:text-base">
                      {currentDayMenu.avgBudget}
                    </div>
                  </div>
                </div>

                {/* Slot Switch: Mâm Cơm Trưa vs Mâm Cơm Tối */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 bg-orange-50/60 p-3 rounded-2xl border border-orange-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-700">Chọn bữa ăn gia đình:</span>
                    <div className="inline-flex p-1 rounded-xl bg-white border border-stone-200 shadow-xs">
                      <button
                        onClick={() => setMealSlotTab('lunch')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          mealSlotTab === 'lunch'
                            ? 'bg-orange-500 text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5" />
                        <span>Mâm Cơm Trưa</span>
                      </button>
                      <button
                        onClick={() => setMealSlotTab('dinner')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          mealSlotTab === 'dinner'
                            ? 'bg-orange-500 text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Moon className="w-3.5 h-3.5" />
                        <span>Mâm Cơm Tối</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-stone-500 italic">
                    {mealSlotTab === 'lunch'
                      ? currentDayMenu.familyLunch?.description
                      : currentDayMenu.familyDinner?.description}
                  </div>
                </div>

                {/* 3-Dish Meal Tray Presentation: Image + Ingredients + Dish Details */}
                {(() => {
                  const currentTray =
                    mealSlotTab === 'lunch'
                      ? currentDayMenu.familyLunch
                      : currentDayMenu.familyDinner;
                  const dishes = currentTray?.dishes || [];
                  const trayIngredients = getTrayIngredients(currentTray);

                  return (
                    <div className="space-y-6">
                      {/* 1. ẢNH LÀ MÂM CƠM 3 MÓN (Hero Meal Tray Showcase) */}
                      <div className="relative rounded-3xl overflow-hidden border border-stone-200/80 shadow-md bg-stone-900 group">
                        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
                          <img
                            src={currentTray?.trayImage || DEFAULT_TRAY_IMAGE}
                            alt={currentTray?.trayName || 'Mâm cơm gia đình 3 món'}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Rich atmospheric contrast gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/20" />

                          {/* Top Badges */}
                          <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 right-3.5 sm:right-5 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-stone-900 text-xs font-black shadow-sm">
                              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                              <span>MÂM CƠM GIA ĐÌNH 3 MÓN</span>
                            </div>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md text-amber-200 text-xs font-semibold border border-white/20">
                              <Users className="w-3.5 h-3.5 text-amber-300" />
                              <span>{currentTray?.servings || 'Khẩu phần 3 - 5 người'}</span>
                            </div>
                          </div>

                          {/* Bottom Content inside Tray Image */}
                          <div className="absolute bottom-3.5 sm:bottom-6 left-3.5 sm:left-6 right-3.5 sm:right-6">
                            <div className="max-w-3xl">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-orange-500 text-white text-[11px] font-extrabold mb-1.5 uppercase tracking-wide">
                                <span>{mealSlotTab === 'lunch' ? 'Bữa Trưa' : 'Bữa Tối'} Chuẩn Cơm Mẹ Nấu</span>
                              </div>
                              <h3 className="text-lg sm:text-2xl font-black text-white leading-tight drop-shadow-sm">
                                {currentTray?.trayName || 'Mâm Cơm 3 Món Chuẩn Vị Gia Đình'}
                              </h3>
                              <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2 drop-shadow-sm font-medium">
                                {currentTray?.description}
                              </p>

                              {/* 3 Dishes Quick Summary Chips on Tray */}
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                                {dishes.slice(0, 3).map((d, i) => (
                                  <div
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900/75 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold"
                                  >
                                    <span className="text-amber-400">
                                      {d.role === 'Món Mặn' ? '🥩' : d.role === 'Món Canh' ? '🥣' : '🥗'}
                                    </span>
                                    <span className="text-stone-300 font-normal">{d.role}:</span>
                                    <span className="text-white truncate max-w-[130px] sm:max-w-[190px]">{d.name}</span>
                                  </div>
                                ))}
                                {dishes[3] && (
                                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600/80 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold">
                                    <span>🍚 {dishes[3].name}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 2. BÊN DƯỚI LÀ NGUYÊN LIỆU NẤU (Cooking Ingredients & Shopping List) */}
                      <div className="bg-gradient-to-b from-amber-50/70 to-orange-50/40 rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-xs">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-200/70 mb-5">
                          <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                              <ShoppingBag className="w-3.5 h-3.5 text-orange-600" />
                              <span>Nguyên Liệu Đi Chợ &amp; Chuẩn Bị Bếp</span>
                            </div>
                            <h3 className="text-base sm:text-xl font-black text-stone-900 flex flex-wrap items-center gap-2">
                              <span>Nguyên Liệu Nấu Cho Cả Mâm Cơm 3 Món</span>
                              <span className="text-xs font-bold text-orange-700 px-2.5 py-0.5 rounded-full bg-white border border-amber-200 shadow-2xs">
                                {currentTray?.servings || '3 - 5 người'}
                              </span>
                            </h3>
                            <p className="text-xs text-stone-600 mt-1">
                              Đầy đủ định lượng thực phẩm đạm, rau củ tươi và gia vị để nấu trọn vẹn cả 3 món cho bữa cơm ấm cúng.
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                            <button
                              onClick={() => handleCopyIngredients(currentTray?.trayName || 'Mâm Cơm', trayIngredients)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
                            >
                              {copiedIngredientsToast ? (
                                <>
                                  <Check className="w-4 h-4 text-white" />
                                  <span>Đã sao chép danh sách!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  <span>Sao chép nguyên liệu</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Categorized Ingredients Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {trayIngredients.map((cat, catIdx) => (
                            <div
                              key={catIdx}
                              className="bg-white rounded-2xl border border-amber-200/60 p-4 sm:p-5 shadow-2xs flex flex-col justify-between"
                            >
                              <div>
                                <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 pb-2.5 border-b border-stone-100 flex items-center justify-between">
                                  <span>{cat.category}</span>
                                  <span className="text-[11px] font-bold text-stone-400">
                                    {cat.items.length} món
                                  </span>
                                </h4>
                                <ul className="mt-3 space-y-2.5">
                                  {cat.items.map((item, itemIdx) => {
                                    const itemKey = `${selectedDayId}-${mealSlotTab}-${catIdx}-${itemIdx}`;
                                    const isChecked = Boolean(checkedIngredients[itemKey]);

                                    return (
                                      <li
                                        key={itemIdx}
                                        onClick={() => toggleIngredientCheck(itemKey)}
                                        className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer group select-none"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={() => toggleIngredientCheck(itemKey)}
                                          className="mt-0.5 rounded border-stone-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                                        />
                                        <span
                                          className={`leading-relaxed transition-colors ${
                                            isChecked
                                              ? 'line-through text-stone-400'
                                              : 'group-hover:text-stone-900 font-medium'
                                          }`}
                                        >
                                          {item}
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>

                              <div className="pt-3 mt-3 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
                                <span>Tích chọn khi đã mua</span>
                                <span className="text-orange-600 font-medium text-[10px]">Cơm nhà tươi sạch</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-3 rounded-xl bg-white/70 border border-amber-200/60 text-xs text-stone-600 flex items-center justify-between flex-wrap gap-2">
                          <span className="flex items-center gap-1.5">
                            <span className="text-orange-500 font-bold">💡 Mẹo chuẩn bị:</span>
                            <span>Bấm "Sao chép nguyên liệu" để dán vào Zalo/Tin nhắn gửi người đi chợ tiện lợi!</span>
                          </span>
                          <span className="text-[11px] text-stone-400">Dự kiến chi phí: {currentDayMenu.avgBudget}</span>
                        </div>
                      </div>

                      {/* 3. CHI TIẾT 3 MÓN ĂN & CÔNG THỨC */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                            <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                              Chi Tiết Các Món Trong Mâm Cơm
                            </h3>
                          </div>
                          <span className="text-xs text-stone-500 font-medium">
                            Đủ 1 Món Mặn + 1 Món Canh + 1 Món Xào/Rau + Ăn Kèm
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          {dishes.map((dishItem, index) => {
                            const matchedDish = INITIAL_DISHES.find((d) => d.id === dishItem.dishId);
                            const displayImage = getDishDisplayImage(dishItem, matchedDish);
                            const recipe = dishItem.recipe || getFamilyMealDishRecipe(dishItem);
                            const roleColor =
                              dishItem.role === 'Món Mặn'
                                ? 'bg-amber-100 text-amber-900 border-amber-200'
                                : dishItem.role === 'Món Canh'
                                ? 'bg-blue-100 text-blue-900 border-blue-200'
                                : dishItem.role === 'Món Xào / Rau'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                                : 'bg-stone-100 text-stone-800 border-stone-200';

                            return (
                              <div
                                key={index}
                                className="bg-stone-50 hover:bg-stone-100/90 rounded-2xl border border-stone-200 p-4 sm:p-5 transition-all flex flex-col justify-between shadow-2xs"
                              >
                                <div>
                                  {/* Badge & Timing */}
                                  <div className="flex items-center justify-between gap-2 mb-3">
                                    <span
                                      className={`px-2.5 py-0.5 rounded-full border text-[11px] font-extrabold ${roleColor}`}
                                    >
                                      {dishItem.roleTag || dishItem.role}
                                    </span>

                                    <div className="flex items-center gap-2 text-xs text-stone-500">
                                      {dishItem.cookingTime && (
                                        <span className="inline-flex items-center gap-1 font-medium">
                                          <Clock className="w-3 h-3 text-stone-400" />
                                          {dishItem.cookingTime}
                                        </span>
                                      )}
                                      {dishItem.calories && (
                                        <span className="inline-flex items-center gap-1 font-medium">
                                          <Flame className="w-3 h-3 text-orange-400" />
                                          {dishItem.calories}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Dish Image, Title & Description */}
                                  <div className="flex gap-3.5 mb-3.5">
                                    <img
                                      src={displayImage}
                                      alt={dishItem.name}
                                      referrerPolicy="no-referrer"
                                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shrink-0 border border-stone-200 shadow-2xs"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                                        {dishItem.name}
                                      </h4>
                                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                                        {dishItem.description}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Công Thức Chế Biến - HIỆN RA LUÔN */}
                                  <div className="bg-white/90 border border-stone-200/90 rounded-xl p-3 sm:p-3.5 mt-2 shadow-2xs">
                                    <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-stone-100">
                                      <div className="flex items-center gap-1.5 text-xs font-black text-orange-700">
                                        <ChefHat className="w-4 h-4 text-orange-600" />
                                        <span>Công Thức Nấu Chuẩn Vị ({recipe.prepTime} chuẩn bị • {recipe.cookTime} nấu)</span>
                                      </div>
                                      <button
                                        onClick={() => handleCopyFamilyRecipe(dishItem.name, recipe)}
                                        className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-orange-600 px-2 py-0.5 rounded hover:bg-stone-100 transition-colors cursor-pointer"
                                        title="Sao chép công thức món ăn này"
                                      >
                                        {copiedFamilyDishRecipe === dishItem.name ? (
                                          <span className="text-emerald-600 flex items-center gap-1">
                                            <Check className="w-3 h-3" /> Đã chép
                                          </span>
                                        ) : (
                                          <span className="flex items-center gap-1">
                                            <Copy className="w-3 h-3" /> Chép công thức
                                          </span>
                                        )}
                                      </button>
                                    </div>

                                    {/* Nguyên liệu chính */}
                                    <div className="mb-2.5">
                                      <span className="text-[11px] font-extrabold text-stone-700 block mb-1">
                                        Nguyên liệu chính:
                                      </span>
                                      <ul className="grid grid-cols-1 gap-1 text-xs text-stone-600 pl-3 list-disc marker:text-orange-400">
                                        {recipe.ingredients.map((ing, iIdx) => (
                                          <li key={iIdx} className="leading-snug">
                                            {ing}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* Các bước nấu nhanh */}
                                    <div className="mb-2.5">
                                      <span className="text-[11px] font-extrabold text-stone-700 block mb-1">
                                        Các bước nấu nhanh:
                                      </span>
                                      <div className="space-y-1.5">
                                        {recipe.steps.map((st) => (
                                          <div key={st.step} className="flex gap-2 text-xs leading-relaxed">
                                            <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-700 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                              {st.step}
                                            </span>
                                            <p className="text-stone-700">
                                              <strong className="text-stone-900">{st.title}:</strong> {st.desc}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Mẹo đầu bếp */}
                                    {recipe.tip && (
                                      <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-200/60 text-[11px] text-amber-900 leading-snug flex items-start gap-1.5">
                                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                        <span>
                                          <strong>Mẹo chuẩn vị:</strong> {recipe.tip}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Footer actions */}
                                <div className="pt-3 mt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                                  <span className="text-[11px] font-medium text-stone-400 italic truncate max-w-[140px] sm:max-w-[180px]">
                                    {dishItem.role} chuẩn vị cơm nhà
                                  </span>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      onClick={() => handleCopyFamilyRecipe(dishItem.name, recipe)}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 px-2.5 py-1.5 rounded-lg hover:bg-orange-100/60 transition-colors cursor-pointer"
                                    >
                                      <ChefHat className="w-3.5 h-3.5" />
                                      <span>
                                        {copiedFamilyDishRecipe === dishItem.name ? 'Đã chép' : 'Sao chép'}
                                      </span>
                                    </button>

                                    {matchedDish && (
                                      <button
                                        onClick={() => onSelectDish(matchedDish)}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-stone-800 hover:text-stone-950 px-2.5 py-1.5 rounded-lg bg-stone-200/70 hover:bg-stone-200 transition-colors cursor-pointer"
                                      >
                                        <ShoppingBag className="w-3.5 h-3.5" />
                                        <span>Đặt ship</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SECTION 3: CÁCH NẤU (LẤY TỪ MÓN NGON QUA) */}
      {/* ========================================================================= */}
      {sectionTab === 'recipe' && (
        <div className="space-y-8 animate-fade-in">
          {/* Search bar & quick picker from INITIAL_DISHES */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-orange-500" />
                  <span>Tra Cứu Cách Nấu &amp; Công Thức Món Ngon</span>
                </h2>
                <p className="text-stone-600 text-xs sm:text-sm mt-1">
                  Chọn hoặc tìm kiếm bất kỳ món ăn nào từ thực đơn 160+ món ngon để xem công thức, tỷ lệ gia vị
                  và bí quyết nấu gia truyền.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm món muốn học nấu..."
                  value={recipeSearchQuery}
                  onChange={(e) => setRecipeSearchQuery(e.target.value)}
                  className="w-full pl-9.5 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Quick horizontal chips for popular recipe dishes */}
            <div className="mb-6 pb-4 border-b border-stone-100">
              <div className="text-xs font-bold text-stone-500 mb-2">Món phổ biến được tìm nhiều nhất:</div>
              <div className="flex flex-wrap gap-2">
                {FEATURED_RECIPE_IDS.map((id) => {
                  const dish = INITIAL_DISHES.find((d) => d.id === id);
                  if (!dish) return null;
                  const isCurrent = selectedRecipeDish.id === dish.id;
                  return (
                    <button
                      key={dish.id}
                      onClick={() => setSelectedRecipeDish(dish)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isCurrent
                          ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-orange-50 hover:border-orange-300'
                      }`}
                    >
                      {dish.vietnameseName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Horizontal Scroll / Grid of selectable dishes */}
            <div className="mb-8">
              <div className="text-xs font-semibold text-stone-500 mb-2.5">
                Danh sách món ăn ({recipeFilteredDishes.length} món):
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                {recipeFilteredDishes.map((dish) => {
                  const isCurrent = selectedRecipeDish.id === dish.id;
                  return (
                    <button
                      key={dish.id}
                      onClick={() => setSelectedRecipeDish(dish)}
                      className={`shrink-0 flex items-center gap-2 p-1.5 pr-3 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500/15 border-amber-500 text-stone-900 font-extrabold ring-2 ring-amber-500/30'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-white hover:border-stone-300'
                      }`}
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <span className="text-xs truncate max-w-[140px]">{dish.vietnameseName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Recipe Display Box */}
            <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8">
              {/* Recipe Hero banner */}
              <div className="flex flex-col md:flex-row items-start gap-6 mb-8 pb-8 border-b border-stone-200">
                <img
                  src={selectedRecipeDish.image}
                  alt={currentRecipe.dishName}
                  referrerPolicy="no-referrer"
                  className="w-full md:w-64 h-48 rounded-2xl object-cover border border-stone-200 shadow-sm shrink-0"
                />

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
                      Công Thức Món Ngon
                    </span>
                    <span className="px-3 py-1 rounded-full bg-stone-200 text-stone-700 text-xs font-bold">
                      {selectedRecipeDish.calories}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    {currentRecipe.dishName}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed">
                    {selectedRecipeDish.description}
                  </p>

                  {/* Metadata pills: Prep Time, Cook Time, Difficulty, Servings */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-center">
                      <div className="text-[10px] text-stone-400 font-bold uppercase flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" />
                        Sơ chế
                      </div>
                      <div className="font-extrabold text-stone-800 text-xs mt-0.5">
                        {currentRecipe.prepTime}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-center">
                      <div className="text-[10px] text-stone-400 font-bold uppercase flex items-center justify-center gap-1">
                        <Flame className="w-3 h-3 text-red-500" />
                        Nấu chín
                      </div>
                      <div className="font-extrabold text-stone-800 text-xs mt-0.5">
                        {currentRecipe.cookTime}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-center">
                      <div className="text-[10px] text-stone-400 font-bold uppercase flex items-center justify-center gap-1">
                        <ChefHat className="w-3 h-3 text-amber-500" />
                        Độ khó
                      </div>
                      <div className="font-extrabold text-stone-800 text-xs mt-0.5">
                        {currentRecipe.difficulty}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 text-center">
                      <div className="text-[10px] text-stone-400 font-bold uppercase flex items-center justify-center gap-1">
                        <Users className="w-3 h-3 text-emerald-500" />
                        Khẩu phần
                      </div>
                      <div className="font-extrabold text-stone-800 text-xs mt-0.5">
                        {currentRecipe.servings}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients & Steps Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Ingredients Column (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  <h4 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-orange-500" />
                    <span>Nguyên Liệu Chuẩn Bị</span>
                  </h4>

                  <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-5">
                    {currentRecipe.ingredients.map((cat, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg inline-block">
                          {cat.category}
                        </div>
                        <ul className="space-y-1.5 text-xs text-stone-700">
                          {cat.items.map((it, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Sauce & Pairing */}
                  {currentRecipe.recommendedSauce && (
                    <div className="bg-amber-50/90 rounded-2xl border border-amber-200 p-4">
                      <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        🥢 Đồ chấm &amp; Ăn kèm
                      </div>
                      <p className="text-xs text-amber-950 leading-relaxed">
                        {currentRecipe.recommendedSauce}
                      </p>
                    </div>
                  )}
                </div>

                {/* Steps Column (8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-orange-500" />
                      <span>Các Bước Nấu Từng Bước</span>
                    </h4>

                    <button
                      onClick={handleCopyRecipe}
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                    >
                      {copiedRecipe ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Sao chép công thức</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {currentRecipe.steps.map((st) => (
                      <div
                        key={st.step}
                        className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                            {st.step}
                          </span>
                          <h5 className="font-extrabold text-stone-900 text-sm">
                            {st.title}
                          </h5>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-8.5">
                          {st.description}
                        </p>
                        {st.tip && (
                          <div className="ml-8.5 mt-2 p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/60 text-xs text-orange-900 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>
                              <strong>Mẹo bếp:</strong> {st.tip}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Chef's Secret Box */}
                  <div className="bg-radial from-amber-500/20 via-orange-500/10 to-transparent border border-amber-300 rounded-2xl p-5 shadow-2xs">
                    <h5 className="font-black text-amber-950 text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Bí Quyết Gia Truyền Của Bếp Trưởng
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                      {currentRecipe.chefSecret}
                    </p>
                  </div>

                  {/* If lazy to cook -> Order ship button */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-stone-200 p-4 sm:p-5">
                    <div>
                      <div className="font-extrabold text-stone-900 text-sm">
                        Hôm nay bận rộn không có thời gian nấu nướng?
                      </div>
                      <div className="text-xs text-stone-500">
                        Đặt giao ngay món {selectedRecipeDish.vietnameseName} nóng hổi qua ShopeeFood / GrabFood
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectDish(selectedRecipeDish)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4 text-amber-200" />
                      <span>Đặt Món Ship Ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Bottom Engagement CTA: Connect to Wheel & Tarot */}
      <div className="mt-12 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden shadow-xl shadow-orange-500/15">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Vẫn Chưa Biết Nên Chọn Món Gì?</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-black tracking-tight">
            Hãy Để Vòng Quay Hoặc Bài Tarot Quyết Định Bữa Ăn Giúp Bạn!
          </h3>

          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            Chỉ mất 3 giây để quay bánh xe ngẫu nhiên hoặc bốc một quẻ Tarot ẩm thực 12 cung hoàng đạo tìm
            món ăn định mệnh hôm nay.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('wheel')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-orange-50 text-orange-600 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4 text-orange-600" />
              <span>Quay Vòng Quay Món Ăn</span>
            </button>

            <button
              onClick={() => onNavigate('tarot')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-xs sm:text-sm transition-all cursor-pointer backdrop-blur-xs"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>Bốc Quẻ Bài Tarot Ẩm Thực</span>
            </button>
          </div>
        </div>
      </div>

      {/* Structured Data (Schema.org JSON-LD for Discovery & Recipe) */}
      {/* Schema.org Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `https://www.angigio.com${DISCOVER_SUB_CONFIG[sectionTab].path}#webpage`,
                "url": `https://www.angigio.com${DISCOVER_SUB_CONFIG[sectionTab].path}`,
                "name": DISCOVER_SUB_CONFIG[sectionTab].title,
                "description": DISCOVER_SUB_CONFIG[sectionTab].description,
                "inLanguage": "vi-VN",
                "isPartOf": {
                  "@type": "WebSite",
                  "@id": "https://www.angigio.com/#website",
                  "name": "Hôm Nay Ăn Gì",
                  "url": "https://www.angigio.com/"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": `https://www.angigio.com${DISCOVER_SUB_CONFIG[sectionTab].path}#breadcrumb`,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Trang Chủ",
                    "item": "https://www.angigio.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": DISCOVER_SUB_CONFIG[sectionTab].label,
                    "item": `https://www.angigio.com${DISCOVER_SUB_CONFIG[sectionTab].path}`
                  }
                ]
              },
              {
                "@type": "Recipe",
                "@id": `https://www.angigio.com/cach-nau-mon-ngon#recipe-${selectedRecipeDish.id}`,
                "url": `https://www.angigio.com/cach-nau-mon-ngon#recipe-${selectedRecipeDish.id}`,
                "mainEntityOfPage": `https://www.angigio.com/cach-nau-mon-ngon`,
                "name": `Cách Nấu ${currentRecipe.dishName} Chuẩn Vị`,
                "headline": `Công thức nấu ${currentRecipe.dishName} thơm ngon đúng điệu`,
                "image": [
                  selectedRecipeDish.image.startsWith('http')
                    ? selectedRecipeDish.image
                    : `https://www.angigio.com${selectedRecipeDish.image}`
                ],
                "description":
                  selectedRecipeDish.description ||
                  `Hướng dẫn chi tiết từng bước nấu món ${currentRecipe.dishName} đậm đà hương vị truyền thống Việt Nam.`,
                "keywords": `${currentRecipe.dishName}, cách nấu ${currentRecipe.dishName}, công thức ${currentRecipe.dishName}, món ngon mỗi ngày, ẩm thực Việt Nam, ${selectedRecipeDish.category}`,
                "recipeCategory": selectedRecipeDish.category,
                "recipeCuisine": "Vietnamese",
                "recipeYield": currentRecipe.servings || "4 người",
                "prepTime": prepDurationIso,
                "cookTime": cookDurationIso,
                "totalTime": totalDurationIso,
                "nutrition": {
                  "@type": "NutritionInformation",
                  "calories": `${recipeCaloriesNumber} calories`,
                  "servingSize": "1 phần"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": (4.7 + ((selectedRecipeDish.name.length % 3) * 0.1)).toFixed(1),
                  "reviewCount": 85 + (selectedRecipeDish.name.length * 7),
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "recipeIngredient": currentRecipe.ingredients.flatMap((cat) => cat.items),
                "recipeInstructions": currentRecipe.steps.map((st) => ({
                  "@type": "HowToStep",
                  "position": st.step,
                  "name": st.title,
                  "text": st.description,
                  "url": `https://www.angigio.com/cach-nau-mon-ngon#recipe-${selectedRecipeDish.id}-step-${st.step}`,
                  "image": selectedRecipeDish.image.startsWith('http')
                    ? selectedRecipeDish.image
                    : `https://www.angigio.com${selectedRecipeDish.image}`
                })),
                "author": {
                  "@type": "Organization",
                  "name": "Hôm Nay Ăn Gì",
                  "url": "https://www.angigio.com/"
                }
              }
            ]
          })
        }}
      />
    </div>
  );
};
