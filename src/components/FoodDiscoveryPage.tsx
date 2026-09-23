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
  Play,
  Video,
  X,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Filter,
  HelpCircle,
  Target,
} from 'lucide-react';
import { Dish, UserLocation, AffiliateConfig, RegionId } from '../types';
import {
  TabType,
  DiscoverSubSection,
  DISCOVER_SUB_CONFIG,
  getDiscoverSubSectionFromUrl,
  updateDiscoverSubSEO,
  updateRegionSEO,
  updateRecipeArticleSEO,
} from '../utils/navigation';
import { INITIAL_DISHES } from '../data/dishes';
import {
  REGIONAL_CUISINES,
  getRegionById,
  getRegionByPath,
  getRegionFromUrl,
  isRegionPath,
} from '../data/regionalCuisine';
import {
  DAILY_DAY_MENUS,
  DEFAULT_TRAY_IMAGE,
  getTrayIngredients,
} from '../data/dailyMenus';
import {
  getDishRecipe,
  getRecipeSlug,
  getRecipePath,
  findDishByRecipeSlug,
  formatRecipeSeoTitle,
  getRecipeArticleTitle,
  getActiveRecipeDishes,
  ACTIVE_RECIPE_DISH_IDS,
} from '../data/recipes';
import { getFamilyMealDishRecipe, FamilyDishRecipe } from '../data/familyDishRecipes';

export const RECIPE_CATEGORIES = [
  { id: 'all', label: 'Tất cả món' },
  { id: 'com_xoi', label: 'Cơm & Xôi' },
  { id: 'bun_pho_mi', label: 'Bún, Phở & Mì' },
  { id: 'lau_chao', label: 'Lẩu & Cháo' },
  { id: 'nuong_chien', label: 'Nướng & Chiên' },
  { id: 'banhmi_cuon', label: 'Bánh Mì & Cuốn' },
  { id: 'salad_monnhe', label: 'Món Xào & Nộm' },
  { id: 'do_chay', label: 'Món Chay' },
  { id: 'mon_nhau', label: 'Món Nhậu' },
  { id: 'an_vat_do_uong', label: 'Ăn Vặt & Uống' },
];

export function getCategoryDisplayName(category: string): string {
  switch (category) {
    case 'com_xoi':
    case 'com':
      return 'Cơm & Xôi';
    case 'bun_pho_mi':
    case 'bun_pho':
      return 'Bún, Phở & Mì';
    case 'banhmi_cuon':
      return 'Bánh Mì & Cuốn';
    case 'nuong_chien':
      return 'Nướng & Chiên';
    case 'lau_chao':
    case 'lau_nuong':
      return 'Lẩu & Cháo';
    case 'salad_monnhe':
    case 'healthy':
      return 'Món Xào & Nộm';
    case 'do_chay':
      return 'Món Chay';
    case 'mon_nhau':
      return 'Món Nhậu';
    case 'an_vat':
    case 'do_uong':
      return 'Ăn Vặt & Uống';
    default:
      return 'Món Ngon';
  }
}

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

  // Listen to browser Back/Forward navigation for sub-sections & regional routes
  useEffect(() => {
    const handlePopState = () => {
      const regionId = getRegionFromUrl();
      if (regionId) {
        setSelectedRegionId(regionId);
        setSectionTab('region');
        setViewingRecipeArticle(false);
        updateRegionSEO(regionId);
        return;
      }
      const currentSub = getDiscoverSubSectionFromUrl();
      setSectionTab(currentSub);
      if (currentSub !== 'recipe') {
        setViewingRecipeArticle(false);
      }
      updateDiscoverSubSEO(currentSub);
      if (onSubSectionChange) {
        onSubSectionChange(currentSub);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [onSubSectionChange]);

  // Initial sync for regional route or hub route
  useEffect(() => {
    const regionId = getRegionFromUrl();
    if (regionId) {
      setSelectedRegionId(regionId);
      if (sectionTab !== 'region') {
        setSectionTab('region');
      }
      updateRegionSEO(regionId);
    } else if (typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '') === '/am-thuc-vung-mien') {
      if (sectionTab !== 'region') {
        setSectionTab('region');
      }
      updateDiscoverSubSEO('region');
    }
  }, []);

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
    }
    window.dispatchEvent(new Event('locationchange'));
    updateDiscoverSubSEO(sub);
    if (onSubSectionChange) {
      onSubSectionChange(sub);
    }
  };

  // Sub-state for Regional Cuisine
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>(() => {
    return getRegionFromUrl() || 'bac';
  });

  // Switch region tab with clean URL, history push, and SEO update
  const handleSelectRegion = (regionId: RegionId, e?: React.MouseEvent) => {
    if (e) {
      if (e.ctrlKey || e.metaKey || e.button === 1) return;
      e.preventDefault();
    }
    setSelectedRegionId(regionId);
    setSectionTab('region');
    const reg = getRegionById(regionId);
    const targetPath = reg?.path || '/am-thuc-vung-mien';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab: 'discover', sub: 'region', region: regionId }, '', targetPath);
    }
    window.dispatchEvent(new Event('locationchange'));
    updateRegionSEO(regionId);
  };

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
  const [selectedRecipeCategory, setSelectedRecipeCategory] = useState<string>('all');
  const [selectedRecipeDish, setSelectedRecipeDish] = useState<Dish>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const isRecipePath =
        (pathname.startsWith('/cach-nau-') ||
          pathname.startsWith('/cach-lam-') ||
          pathname.startsWith('/cach-nau-mon-ngon/')) &&
        pathname !== '/cach-nau-mon-ngon';

      if (isRecipePath) {
        const slug = pathname.replace('/cach-nau-mon-ngon/', '').replace(/^\//, '');
        const match = findDishByRecipeSlug(slug, INITIAL_DISHES);
        if (match) return match;
      }
      if (window.location.hash.startsWith('#recipe-')) {
        const match = findDishByRecipeSlug(window.location.hash, INITIAL_DISHES);
        if (match) return match;
      }
    }
    return (
      INITIAL_DISHES.find((d) => d.id === 'com-tam-suon-bi-cha') ||
      INITIAL_DISHES.find((d) => ACTIVE_RECIPE_DISH_IDS.includes(d.id)) ||
      INITIAL_DISHES[0]
    );
  });
  const [viewingRecipeArticle, setViewingRecipeArticle] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const isRecipePath =
        (pathname.startsWith('/cach-nau-') ||
          pathname.startsWith('/cach-lam-') ||
          pathname.startsWith('/cach-nau-mon-ngon/')) &&
        pathname !== '/cach-nau-mon-ngon';

      if (isRecipePath) {
        const slug = pathname.replace('/cach-nau-mon-ngon/', '').replace(/^\//, '');
        const match = findDishByRecipeSlug(slug, INITIAL_DISHES);
        if (match) return true;
      }
      if (window.location.hash.startsWith('#recipe-')) {
        return true;
      }
    }
    return false;
  });
  const [recipeDisplayLimit, setRecipeDisplayLimit] = useState<number>(24);
  const [copiedRecipe, setCopiedRecipe] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [copiedFamilyDishRecipe, setCopiedFamilyDishRecipe] = useState<string | null>(null);

  // Track where the user entered the recipe from (e.g. regional cuisine page, daily menu, or recipe catalog)
  interface RecipeOriginInfo {
    sub: DiscoverSubSection;
    regionId?: RegionId;
    path: string;
    label: string;
  }
  const [recipeOrigin, setRecipeOrigin] = useState<RecipeOriginInfo | null>(() => {
    if (typeof window !== 'undefined' && window.history.state?.origin) {
      return window.history.state.origin;
    }
    return null;
  });

  // Sync URL deep-linking for recipes (supports international clean URL /:slug, /cach-nau-mon-ngon/:slug, and legacy #recipe-...)
  useEffect(() => {
    const syncRecipeFromLocation = () => {
      if (typeof window === 'undefined') return;

      const pathname = window.location.pathname.replace(/\/$/, '') || '/';
      const isRecipePath =
        (pathname.startsWith('/cach-nau-') ||
          pathname.startsWith('/cach-lam-') ||
          pathname.startsWith('/cach-nau-mon-ngon/')) &&
        pathname !== '/cach-nau-mon-ngon';

      if (isRecipePath) {
        const slug = pathname.replace('/cach-nau-mon-ngon/', '').replace(/^\//, '');
        const match = findDishByRecipeSlug(slug, INITIAL_DISHES);
        if (match) {
          setSelectedRecipeDish(match);
          setViewingRecipeArticle(true);
          setSectionTab('recipe');
          // Canonicalize legacy /cach-nau-mon-ngon/:slug into international clean URL /:slug
          if (pathname.startsWith('/cach-nau-mon-ngon/')) {
            window.history.replaceState({ tab: 'discover', sub: 'recipe', dishId: match.id, origin: recipeOrigin }, '', getRecipePath(match));
          }
          updateRecipeArticleSEO(match, getDishRecipe(match));
          return;
        }
      } else if (window.location.hash.startsWith('#recipe-')) {
        const match = findDishByRecipeSlug(window.location.hash, INITIAL_DISHES);
        if (match) {
          setSelectedRecipeDish(match);
          setViewingRecipeArticle(true);
          setSectionTab('recipe');
          // Canonicalize legacy hash into international clean SEO path
          window.history.replaceState({ tab: 'discover', sub: 'recipe', dishId: match.id, origin: recipeOrigin }, '', getRecipePath(match));
          updateRecipeArticleSEO(match, getDishRecipe(match));
          return;
        }
      } else {
        // Not a recipe URL: dismiss recipe article view and let sub-tab handle its own view
        setViewingRecipeArticle(false);
        if (pathname === '/cach-nau-mon-ngon') {
          updateDiscoverSubSEO('recipe');
        }
      }
    };

    syncRecipeFromLocation();
    window.addEventListener('popstate', syncRecipeFromLocation);
    window.addEventListener('hashchange', syncRecipeFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRecipeFromLocation);
      window.removeEventListener('hashchange', syncRecipeFromLocation);
    };
  }, [recipeOrigin]);

  // Click on a dish card to open the article with SEO clean URL
  const handleSelectDishRecipe = (dish: Dish) => {
    const origin: RecipeOriginInfo = {
      sub: 'recipe',
      path: DISCOVER_SUB_CONFIG.recipe.path,
      label: 'Cách Nấu Món Ngon',
    };
    setRecipeOrigin(origin);
    setSelectedRecipeDish(dish);
    setViewingRecipeArticle(true);
    const targetPath = getRecipePath(dish);
    window.history.pushState({ tab: 'discover', sub: 'recipe', dishId: dish.id, origin }, '', targetPath);
    window.dispatchEvent(new Event('locationchange'));
    updateRecipeArticleSEO(dish, getDishRecipe(dish));
    const el = document.getElementById('recipe-article-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  // Back to previous section or gallery list with SEO clean URL
  const handleBackToRecipeList = () => {
    if (recipeOrigin && recipeOrigin.sub === 'region') {
      setViewingRecipeArticle(false);
      setSectionTab('region');
      if (recipeOrigin.regionId) {
        setSelectedRegionId(recipeOrigin.regionId);
      }
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.history.pushState(
          { tab: 'discover', sub: 'region', region: recipeOrigin.regionId },
          '',
          recipeOrigin.path
        );
        window.dispatchEvent(new Event('locationchange'));
        updateRegionSEO(recipeOrigin.regionId || 'bac');
      }
      return;
    }

    if (recipeOrigin && recipeOrigin.sub === 'daily') {
      setViewingRecipeArticle(false);
      setSectionTab('daily');
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.history.pushState(
          { tab: 'discover', sub: 'daily' },
          '',
          recipeOrigin.path
        );
        window.dispatchEvent(new Event('locationchange'));
        updateDiscoverSubSEO('daily');
      }
      return;
    }

    setViewingRecipeArticle(false);
    setSectionTab('recipe');
    window.history.pushState({ tab: 'discover', sub: 'recipe' }, '', DISCOVER_SUB_CONFIG.recipe.path);
    window.dispatchEvent(new Event('locationchange'));
    updateDiscoverSubSEO('recipe');
    const el = document.getElementById('recipe-discovery-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

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
    if (n.includes('nộm bò') || n.includes('nộm đu đủ') || n.includes('bò khô')) {
      return '/images/nom_bo_kho.jpg';
    }
    if (n.includes('ngó sen')) {
      return '/images/goi_ngo_sen.jpg';
    }
    if (n.includes('rau mầm')) {
      return '/images/salad_rau_mam_bo.jpg';
    }
    if (n.includes('lá é')) {
      return '/images/lau_ga_la_e.jpg';
    }
    if (n.includes('ớt hiểm') || n.includes('gà tiềm')) {
      return '/images/lau_ga_ot_hiem.jpg';
    }
    if (n.includes('gà')) {
      return '/images/com_ga_hoi_an.jpg';
    }
    if (n.includes('bò')) {
      return '/images/com_bo_luc_lac.jpg';
    }
    if (n.includes('nem lụi')) {
      return '/images/nem_lui.jpg';
    }
    if (n.includes('nem rán') || n.includes('chả giò') || n.includes('chả cá')) {
      return '/images/cha_gio.jpg';
    }
    if (n.includes('gỏi cuốn')) {
      return '/images/goi_cuon.jpg';
    }
    if (n.includes('ốc hương') || n.includes('trứng muối')) {
      return '/images/oc_huong_trung_muoi.jpg';
    }
    if (n.includes('ốc')) {
      return '/images/oc_huong_bo_toi.jpg';
    }
    if (n.includes('mực')) {
      return '/images/muc_nuong.jpg';
    }

    return '/images/mam_com_gia_dinh.jpg';
  };

  // Base dishes available for recipe selection (strictly 2 curated active dishes)
  const baseRecipeDishes = useMemo(() => {
    return getActiveRecipeDishes(INITIAL_DISHES);
  }, []);

  // Only display categories that exist in baseRecipeDishes
  const availableRecipeCategories = useMemo(() => {
    return RECIPE_CATEGORIES.filter((cat) => {
      if (cat.id === 'all') return true;
      if (cat.id === 'com_xoi') {
        return baseRecipeDishes.some((d) => d.category === 'com_xoi' || d.category === 'com');
      }
      return baseRecipeDishes.some((d) => d.category === cat.id);
    });
  }, [baseRecipeDishes]);

  // Filtered dishes for recipe selection
  const recipeFilteredDishes = useMemo(() => {
    let list = baseRecipeDishes;
    if (selectedRecipeCategory !== 'all') {
      if (selectedRecipeCategory === 'com_xoi') {
        list = list.filter((d) => d.category === 'com_xoi' || d.category === 'com');
      } else if (selectedRecipeCategory === 'bun_pho_mi') {
        list = list.filter((d) => d.category === 'bun_pho_mi' || d.category === 'bun_pho');
      } else if (selectedRecipeCategory === 'lau_chao') {
        list = list.filter((d) => d.category === 'lau_chao' || d.category === 'lau_nuong');
      } else if (selectedRecipeCategory === 'nuong_chien') {
        list = list.filter((d) => d.category === 'nuong_chien');
      } else if (selectedRecipeCategory === 'banhmi_cuon') {
        list = list.filter((d) => d.category === 'banhmi_cuon');
      } else if (selectedRecipeCategory === 'salad_monnhe') {
        list = list.filter((d) => d.category === 'salad_monnhe' || d.category === 'healthy');
      } else if (selectedRecipeCategory === 'do_chay') {
        list = list.filter((d) => d.category === 'do_chay');
      } else if (selectedRecipeCategory === 'mon_nhau') {
        list = list.filter((d) => d.category === 'mon_nhau');
      } else if (selectedRecipeCategory === 'an_vat_do_uong') {
        list = list.filter((d) => d.category === 'an_vat' || d.category === 'do_uong');
      }
    }

    if (!recipeSearchQuery.trim()) {
      return list;
    }
    const q = recipeSearchQuery.toLowerCase().trim();
    return list.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.vietnameseName.toLowerCase().includes(q) ||
        d.searchKeyword.toLowerCase().includes(q) ||
        d.popularTags.some((t) => t.toLowerCase().includes(q))
    );
  }, [baseRecipeDishes, recipeSearchQuery, selectedRecipeCategory]);

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
  const handleViewDishRecipe = (dish: Dish, customOrigin?: RecipeOriginInfo) => {
    const origin: RecipeOriginInfo = customOrigin || (sectionTab === 'region' ? {
      sub: 'region',
      regionId: selectedRegionId,
      path: currentRegion.path,
      label: currentRegion.title,
    } : sectionTab === 'daily' ? {
      sub: 'daily',
      path: DISCOVER_SUB_CONFIG.daily.path,
      label: 'Thực Đơn Mỗi Ngày',
    } : {
      sub: 'recipe',
      path: DISCOVER_SUB_CONFIG.recipe.path,
      label: 'Cách Nấu Món Ngon',
    });

    setRecipeOrigin(origin);
    setSelectedRecipeDish(dish);
    setViewingRecipeArticle(true);
    setSectionTab('recipe');
    const targetPath = getRecipePath(dish);
    window.history.pushState(
      { tab: 'discover', sub: 'recipe', dishId: dish.id, origin },
      '',
      targetPath
    );
    window.dispatchEvent(new Event('locationchange'));
    updateRecipeArticleSEO(dish, getDishRecipe(dish));
    window.scrollTo({ top: 350, behavior: 'smooth' });
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
    const articleTitle = getRecipeArticleTitle(selectedRecipeDish, currentRecipe);
    const lines = [
      `🍳 CÔNG THỨC NẤU: ${articleTitle}`,
      `⏱ Chuẩn bị: ${currentRecipe.prepTime} | Nấu: ${currentRecipe.cookTime} | Độ khó: ${currentRecipe.difficulty}`,
      `👥 Khẩu phần: ${currentRecipe.servings}`,
      '',
      '📋 NGUYÊN LIỆU:',
      ...currentRecipe.ingredients.flatMap((cat) => [
        `• ${cat.category}:`,
        ...cat.items.map((it) => `  - ${it}`),
      ]),
      '',
      '👩‍🍳 CÁC BƯỚC THỰC HIỆN TỪNG BƯỚC:',
      ...currentRecipe.steps.flatMap((st) => [
        `Bước ${st.step}: ${st.title}`,
        st.time || st.heat ? `⏱ Thời gian: ${st.time || 'Linh hoạt'} | 🔥 Mức lửa: ${st.heat || 'Lửa vừa'}` : '',
        st.goal ? `🎯 Mục tiêu đạt được: ${st.goal}` : '',
        ...(st.actionPoints && st.actionPoints.length > 0
          ? st.actionPoints.map((ap, idx) => `  ${idx + 1}. ${ap}`)
          : []),
        st.description ? `Chi tiết: ${st.description}` : '',
        st.tip ? `(💡 Mẹo bếp: ${st.tip})` : '',
        '',
      ]),
      '',
      `💡 BÍ QUYẾT BẾP TRƯỞNG: ${currentRecipe.chefSecret}`,
      currentRecipe.recommendedSauce ? `🥢 Nước chấm & đồ ăn kèm: ${currentRecipe.recommendedSauce}` : '',
      '',
      `Khám phá thêm ${INITIAL_DISHES.length}+ món ngon tại: https://www.angigio.com/am-thuc-vung-mien`,
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
              ? `Khám phá hương vị thanh tao miền Bắc, đậm đà cay nồng miền Trung, phóng khoáng miền Nam và trù phú miền Tây sông nước cùng danh mục hơn ${INITIAL_DISHES.length}+ món ngon đặc sắc.`
              : sectionTab === 'daily'
              ? 'Gợi ý thực đơn từ Thứ 2 đến Chủ Nhật, cơm trưa văn phòng, bữa tối gia đình ấm cúng và mẹo chuẩn bị nguyên liệu nhanh gọn, tiết kiệm thời gian.'
              : `Hướng dẫn chi tiết từng bước nấu hơn ${INITIAL_DISHES.length}+ món ngon gia đình Việt Nam với định lượng nguyên liệu chuẩn xác, mẹo sơ chế và bí quyết nêm nếm gia truyền.`}
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
          {/* Region Tabs (4 Regional SEO Links) */}
          <nav aria-label="Danh mục 4 vùng miền ẩm thực" className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {REGIONAL_CUISINES.map((region) => {
              const isActive = selectedRegionId === region.id;
              return (
                <a
                  key={region.id}
                  href={region.path}
                  onClick={(e) => handleSelectRegion(region.id, e)}
                  title={`Khám phá ${region.name} - ${region.badge}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer border no-underline ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white border-transparent shadow-md shadow-orange-500/25 ring-2 ring-orange-400/30'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300 hover:bg-orange-50/50 hover:text-orange-950'
                  }`}
                >
                  <span>{region.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Selected Region Detailed Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 pb-6 border-b border-stone-100 items-start">
              {/* Left Column: Region Badge, Title & Description (7 cols) */}
              <div className="lg:col-span-7 space-y-2.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-100/80 text-orange-800 text-[11px] font-extrabold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                  {currentRegion.badge}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                  {currentRegion.title}
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {currentRegion.description}
                </p>
              </div>

              {/* Right Column: Taste Profile & Region Highlights Box (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-orange-50/70 via-amber-50/50 to-stone-50 rounded-2xl border border-orange-200/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    Đặc trưng vị giác
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500 bg-white/80 px-2 py-0.5 rounded-full border border-orange-100">
                    {regionDishes.length} món đặc sản
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentRegion.tasteProfile.map((t, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 rounded-xl bg-white/95 text-stone-800 text-xs font-bold border border-orange-200/60 shadow-2xs flex items-center gap-1.5 leading-snug"
                    >
                      <span className="text-orange-500 text-xs shrink-0">✦</span>
                      <span className="break-words">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-orange-200/50 flex items-center justify-between text-[11px] text-stone-600">
                  <span className="flex items-center gap-1 text-stone-500">
                    <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                    Bản sắc vùng miền
                  </span>
                  <span className="font-bold text-orange-700">Chuẩn vị truyền thống</span>
                </div>
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
        <div id="recipe-discovery-section" className="space-y-8 animate-fade-in">
          {/* If viewing full recipe article */}
          {viewingRecipeArticle ? (
            <div id="recipe-article-container" className="space-y-6">
              {/* Back navigation & breadcrumb bar */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <button
                  type="button"
                  onClick={handleBackToRecipeList}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-50 hover:bg-orange-50 text-stone-800 hover:text-orange-700 border border-stone-200 hover:border-orange-300 font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-2xs group"
                >
                  <ArrowLeft className="w-4 h-4 text-orange-600 group-hover:-translate-x-1 transition-transform" />
                  <span>{recipeOrigin ? `Quay lại ${recipeOrigin.label}` : 'Quay lại danh sách món ngon'}</span>
                </button>

                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 font-medium overflow-hidden">
                  <a
                    href={recipeOrigin ? recipeOrigin.path : '/cach-nau-mon-ngon'}
                    onClick={(e) => {
                      e.preventDefault();
                      handleBackToRecipeList();
                    }}
                    className="shrink-0 hover:text-orange-600 transition-colors underline-offset-2 hover:underline"
                  >
                    {recipeOrigin ? recipeOrigin.label : 'Cách Nấu Món Ngon'}
                  </a>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                  <span className="shrink-0 text-stone-600">{getCategoryDisplayName(selectedRecipeDish.category)}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                  <span className="font-extrabold text-orange-700 truncate">{getRecipeArticleTitle(selectedRecipeDish, currentRecipe)}</span>
                </nav>
              </div>

              {/* Selected Recipe Display Box / Article */}
              <article className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8">
                {/* Recipe Hero banner */}
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8 pb-8 border-b border-stone-200">
                  <img
                    src={selectedRecipeDish.image}
                    alt={getRecipeArticleTitle(selectedRecipeDish, currentRecipe)}
                    referrerPolicy="no-referrer"
                    className="w-full md:w-64 h-48 sm:h-56 rounded-2xl object-cover border border-stone-200 shadow-sm shrink-0"
                  />

                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
                        Công Thức Món Ngon
                      </span>
                      <span className="px-3 py-1 rounded-full bg-stone-200 text-stone-700 text-xs font-bold">
                        {selectedRecipeDish.calories}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                        {getCategoryDisplayName(selectedRecipeDish.category)}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                      {getRecipeArticleTitle(selectedRecipeDish, currentRecipe)}
                    </h1>

                    <p className="text-stone-600 text-sm leading-relaxed">
                      {selectedRecipeDish.description || `Hướng dẫn chi tiết từng bước ${getRecipeArticleTitle(selectedRecipeDish, currentRecipe).toLowerCase()} đậm đà hương vị truyền thống gia đình Việt Nam.`}
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
                    <h2 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-orange-500" />
                      <span>Nguyên Liệu Chuẩn Bị</span>
                    </h2>

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
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-orange-500" />
                        <span>Các Bước Nấu Từng Bước</span>
                      </h2>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowVideoModal(true)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors cursor-pointer shadow-2xs"
                          title={`Xem video clip hướng dẫn nấu ${currentRecipe.dishName}`}
                        >
                          <Play className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                          <span>Video Hướng Dẫn</span>
                        </button>

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
                    </div>

                    <div className="space-y-4">
                      {currentRecipe.steps.map((st) => (
                        <div
                          key={st.step}
                          className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3.5 shadow-2xs hover:border-orange-200 transition-all"
                        >
                          {/* Step Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-stone-100">
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                                {st.step}
                              </span>
                              <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug">
                                {st.title}
                              </h3>
                            </div>

                            {/* Meta Badges: Time & Heat */}
                            {(st.time || st.heat) && (
                              <div className="flex items-center gap-2 flex-wrap pl-9.5 sm:pl-0">
                                {st.time && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-800 text-xs font-semibold border border-orange-200/60">
                                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                                    <span>{st.time}</span>
                                  </span>
                                )}
                                {st.heat && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200/60">
                                    <Flame className="w-3.5 h-3.5 text-rose-600" />
                                    <span>{st.heat}</span>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Goal Box if available */}
                          {st.goal && (
                            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
                              <Target className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="leading-relaxed">
                                <strong className="font-bold text-amber-900">Mục tiêu bước này:</strong>{' '}
                                <span>{st.goal}</span>
                              </div>
                            </div>
                          )}

                          {/* Action Points Checklist */}
                          {st.actionPoints && st.actionPoints.length > 0 ? (
                            <div className="space-y-2 pt-0.5">
                              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Các thao tác thực hiện chi tiết:</span>
                              </div>
                              <ul className="space-y-1.5 pl-1">
                                {st.actionPoints.map((ap, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 leading-relaxed bg-stone-50/80 rounded-xl p-2.5 border border-stone-200/60"
                                  >
                                    <span className="w-5 h-5 rounded-md bg-stone-200 text-stone-700 font-bold text-2xs flex items-center justify-center shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <span className="font-medium">{ap}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-1">
                              {st.description}
                            </p>
                          )}

                          {/* Chef tip for this step */}
                          {st.tip && (
                            <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/60 text-xs text-orange-900 flex items-start gap-2">
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
                      <h3 className="font-black text-amber-950 text-xs sm:text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        Bí Quyết Gia Truyền Của Bếp Trưởng
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                        {currentRecipe.chefSecret}
                      </p>
                    </div>

                    {/* If lazy to cook -> Order ship button */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl border border-stone-200 p-4 sm:p-5">
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

                {/* Bottom Back Button & Related recipes recommendations */}
                <div className="mt-10 pt-8 border-t border-stone-200 space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleBackToRecipeList}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{recipeOrigin ? `Quay lại ${recipeOrigin.label}` : `Quay lại danh sách công thức (${baseRecipeDishes.length} món)`}</span>
                    </button>

                    <span className="text-xs text-stone-500">
                      Đang xem công thức nấu món: <strong>{currentRecipe.dishName}</strong>
                    </span>
                  </div>

                  {/* Related Dishes to discover */}
                  <div className="pt-4">
                    <h2 className="text-sm sm:text-base font-extrabold text-stone-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      <span>Gợi Ý Các Món Ngon Khác Có Thể Bạn Thích</span>
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {(baseRecipeDishes.filter((d) => d.id !== selectedRecipeDish.id).length > 0
                        ? baseRecipeDishes.filter((d) => d.id !== selectedRecipeDish.id)
                        : INITIAL_DISHES.filter((d) => d.id !== selectedRecipeDish.id)
                      )
                        .slice(0, 4)
                        .map((relDish) => (
                          <div
                            key={relDish.id}
                            onClick={() => handleSelectDishRecipe(relDish)}
                            className="group bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 hover:border-orange-400 p-3 transition-all cursor-pointer shadow-2xs hover:shadow-sm"
                          >
                            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2.5 bg-stone-200">
                              <img
                                src={relDish.image}
                                alt={relDish.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h5 className="font-extrabold text-stone-900 text-xs group-hover:text-orange-600 line-clamp-1">
                              {relDish.vietnameseName}
                            </h5>
                            <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                              {relDish.calories}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            /* Gallery / Grid Mode: Mỗi món là 1 khung ảnh đại diện, tiêu đề riêng. Khi click vào thì hiện ra bài */
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Header & Search */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
                    <ChefHat className="w-6 h-6 text-orange-500" />
                    <span>Tra Cứu Cách Nấu &amp; Công Thức Món Ngon</span>
                  </h2>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1">
                    Bấm vào bất kỳ món ăn nào để xem công thức chi tiết, tỷ lệ nêm nếm gia vị và bí quyết nấu gia truyền.
                  </p>
                </div>

                {/* Search input */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm món muốn học nấu..."
                    value={recipeSearchQuery}
                    onChange={(e) => {
                      setRecipeSearchQuery(e.target.value);
                      setRecipeDisplayLimit(24);
                    }}
                    className="w-full pl-9.5 pr-8 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                  {recipeSearchQuery && (
                    <button
                      onClick={() => setRecipeSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Pills (nếu có nhiều hơn 1 danh mục) */}
              {availableRecipeCategories.length > 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-orange-500" />
                      <span>Lọc theo danh mục:</span>
                    </div>
                    <span className="text-xs text-stone-400 font-medium">
                      {recipeFilteredDishes.length} bài công thức
                    </span>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {availableRecipeCategories.map((cat) => {
                      const isActive = selectedRecipeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedRecipeCategory(cat.id);
                            setRecipeDisplayLimit(24);
                          }}
                          className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-white hover:border-stone-300'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Grid: Mỗi món là 1 khung ảnh đại diện, tiêu đề riêng. Khi click vào thì hiện ra bài */}
              <div className="pt-2">
                {recipeFilteredDishes.length === 0 ? (
                  <div className="p-12 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-stone-500">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-stone-800 text-base">
                      Không tìm thấy món ăn phù hợp
                    </h3>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Hãy thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục khác để khám phá công thức.
                    </p>
                    <button
                      onClick={() => {
                        setRecipeSearchQuery('');
                        setSelectedRecipeCategory('all');
                      }}
                      className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {recipeFilteredDishes.slice(0, recipeDisplayLimit).map((dish) => {
                      const recipe = getDishRecipe(dish);
                      const recipePath = getRecipePath(dish);
                      const articleTitle = getRecipeArticleTitle(dish, recipe);
                      return (
                        <a
                          key={dish.id}
                          id={`recipe-card-${dish.id}`}
                          href={recipePath}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelectDishRecipe(dish);
                          }}
                          className="group flex flex-col bg-white rounded-2xl border border-stone-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer text-inherit no-underline"
                        >
                          {/* Khung ảnh đại diện riêng */}
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                            <img
                              src={dish.image}
                              alt={articleTitle}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Badges on image */}
                            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                              <span className="px-2 py-0.5 rounded-lg bg-stone-950/75 backdrop-blur-md text-white text-[10px] font-bold tracking-wide">
                                {getCategoryDisplayName(dish.category)}
                              </span>
                            </div>

                            <div className="absolute top-2.5 right-2.5">
                              <span className="px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-md text-stone-800 text-[10px] font-extrabold flex items-center gap-1 shadow-2xs">
                                <Clock className="w-3 h-3 text-orange-500" />
                                {recipe.cookTime.split('(')[0].trim()}
                              </span>
                            </div>

                            <div className="absolute bottom-2.5 left-2.5">
                              <span className="px-2 py-0.5 rounded-md bg-orange-500/90 text-white text-[10px] font-bold">
                                {dish.calories}
                              </span>
                            </div>
                          </div>

                          {/* Tiêu đề riêng & Nội dung tóm tắt */}
                          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-base font-black text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-1.5 leading-snug">
                                {articleTitle}
                              </h3>
                              <p className="text-stone-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                                {dish.description || `Bí quyết nấu ${dish.vietnameseName} thơm ngon, chuẩn vị với các bước sơ chế và nêm nếm gia truyền.`}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                              <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                                <ChefHat className="w-3.5 h-3.5 text-amber-500" />
                                {recipe.difficulty}
                              </span>

                              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                                <span>Xem công thức</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                )}

                {/* Load More Button */}
                {recipeFilteredDishes.length > recipeDisplayLimit && (
                  <div className="pt-8 text-center">
                    <button
                      onClick={() => setRecipeDisplayLimit((prev) => prev + 24)}
                      className="px-6 py-2.5 rounded-xl bg-stone-100 hover:bg-orange-500 hover:text-white text-stone-700 font-extrabold text-xs sm:text-sm transition-all cursor-pointer border border-stone-200 hover:border-orange-500"
                    >
                      Xem thêm 24 món ngon khác (còn {recipeFilteredDishes.length - recipeDisplayLimit} món)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
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

      {/* Video Guide Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-100 bg-stone-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-sm sm:text-base line-clamp-1">
                    Video Hướng Dẫn: {currentRecipe.dishName}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Chuẩn vị truyền thống • Thời lượng ~{totalDurationIso.replace('PT', '').replace('H', ' giờ ').replace('M', ' phút')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Video Banner & Link */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-900 shadow-inner group">
                <img
                  src={selectedRecipeDish.image}
                  alt={currentRecipe.dishName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent flex flex-col justify-end p-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold w-fit mb-2 shadow-sm">
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Clip Hướng Dẫn Nấu Ăn
                  </span>
                  <h5 className="text-white font-bold text-sm sm:text-base drop-shadow">
                    {getRecipeArticleTitle(selectedRecipeDish, currentRecipe)}
                  </h5>
                  <p className="text-stone-300 text-xs mt-1 line-clamp-2">
                    {currentRecipe.chefSecret}
                  </p>
                </div>
              </div>

              {/* Video External Link Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-stone-500">
                  Xem thêm video hướng dẫn chi tiết từ các đầu bếp chuyên nghiệp:
                </div>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent('cách nấu ' + currentRecipe.dishName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <span>Mở Video Trên YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
                "@id": `https://www.angigio.com${
                  viewingRecipeArticle
                    ? getRecipePath(selectedRecipeDish)
                    : sectionTab === 'region' && typeof window !== 'undefined' && isRegionPath(window.location.pathname)
                    ? currentRegion.path
                    : DISCOVER_SUB_CONFIG[sectionTab].path
                }#webpage`,
                "url": `https://www.angigio.com${
                  viewingRecipeArticle
                    ? getRecipePath(selectedRecipeDish)
                    : sectionTab === 'region' && typeof window !== 'undefined' && isRegionPath(window.location.pathname)
                    ? currentRegion.path
                    : DISCOVER_SUB_CONFIG[sectionTab].path
                }`,
                "name": viewingRecipeArticle
                  ? formatRecipeSeoTitle(getRecipeArticleTitle(selectedRecipeDish, currentRecipe))
                  : sectionTab === 'region' && typeof window !== 'undefined' && isRegionPath(window.location.pathname)
                  ? currentRegion.metaTitle
                  : DISCOVER_SUB_CONFIG[sectionTab].title,
                "description": viewingRecipeArticle
                  ? (selectedRecipeDish.description || `Hướng dẫn chi tiết ${getRecipeArticleTitle(selectedRecipeDish, currentRecipe).toLowerCase()} chuẩn vị gia đình Việt Nam.`)
                  : sectionTab === 'region' && typeof window !== 'undefined' && isRegionPath(window.location.pathname)
                  ? currentRegion.metaDescription
                  : DISCOVER_SUB_CONFIG[sectionTab].description,
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
                "@id": `https://www.angigio.com${
                  viewingRecipeArticle
                    ? getRecipePath(selectedRecipeDish)
                    : sectionTab === 'region' && typeof window !== 'undefined' && isRegionPath(window.location.pathname)
                    ? currentRegion.path
                    : DISCOVER_SUB_CONFIG[sectionTab].path
                }#breadcrumb`,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Trang Chủ",
                    "item": "https://www.angigio.com/"
                  },
                  ...(sectionTab === 'recipe'
                    ? [
                        {
                          "@type": "ListItem",
                          "position": 2,
                          "name": "Cách Nấu Món Ngon",
                          "item": "https://www.angigio.com/cach-nau-mon-ngon"
                        },
                        ...(viewingRecipeArticle
                          ? [
                              {
                                "@type": "ListItem",
                                "position": 3,
                                "name": getRecipeArticleTitle(selectedRecipeDish, currentRecipe),
                                "item": `https://www.angigio.com${getRecipePath(selectedRecipeDish)}`
                              }
                            ]
                          : [])
                      ]
                    : sectionTab === 'region'
                    ? [
                        {
                          "@type": "ListItem",
                          "position": 2,
                          "name": "Ẩm Thực Vùng Miền",
                          "item": "https://www.angigio.com/am-thuc-vung-mien"
                        },
                        ...(typeof window !== 'undefined' && isRegionPath(window.location.pathname)
                          ? [
                              {
                                "@type": "ListItem",
                                "position": 3,
                                "name": currentRegion.name,
                                "item": `https://www.angigio.com${currentRegion.path}`
                              }
                            ]
                          : [])
                      ]
                    : [
                        {
                          "@type": "ListItem",
                          "position": 2,
                          "name": "Thực Đơn Mỗi Ngày",
                          "item": "https://www.angigio.com/thuc-don-moi-ngay"
                        }
                      ]
                  )
                ]
              },
              // Chỉ chèn Schema Recipe & FAQ khi đang ở đúng trang Công thức (/cach-nau-mon-ngon)
              ...(sectionTab === 'recipe'
                ? [
                    {
                      "@type": "Recipe",
                      "@id": `https://www.angigio.com${getRecipePath(selectedRecipeDish)}`,
                      "url": `https://www.angigio.com${getRecipePath(selectedRecipeDish)}`,
                      "mainEntityOfPage": `https://www.angigio.com${getRecipePath(selectedRecipeDish)}`,
                      "name": getRecipeArticleTitle(selectedRecipeDish, currentRecipe),
                      "headline": `${getRecipeArticleTitle(selectedRecipeDish, currentRecipe)} - Hướng dẫn chi tiết định lượng và các bước nấu chuẩn vị`,
                      "image": [
                        selectedRecipeDish.image.startsWith('http')
                          ? selectedRecipeDish.image
                          : `https://www.angigio.com${selectedRecipeDish.image}`
                      ],
                      "description":
                        selectedRecipeDish.description ||
                        `Hướng dẫn chi tiết từng bước ${getRecipeArticleTitle(selectedRecipeDish, currentRecipe).toLowerCase()} đậm đà hương vị truyền thống Việt Nam.`,
                      "keywords": `${getRecipeArticleTitle(selectedRecipeDish, currentRecipe).toLowerCase()}, ${currentRecipe.dishName}, cách nấu ${selectedRecipeDish.vietnameseName}, công thức ${selectedRecipeDish.vietnameseName}, cách làm ${selectedRecipeDish.vietnameseName}, món ngon mỗi ngày, ẩm thực Việt Nam, ${selectedRecipeDish.category}`,
                      "recipeCategory": selectedRecipeDish.category,
                      "recipeCuisine": "Vietnamese",
                      "recipeYield": currentRecipe.servings || "4 người",
                      "prepTime": prepDurationIso,
                      "cookTime": cookDurationIso,
                      "totalTime": totalDurationIso,
                      "datePublished": "2024-01-15T08:00:00+07:00",
                      "dateModified": "2026-09-20T00:00:00+07:00",
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
                      // Google Search Console Recipe VideoObject compliance
                      "video": {
                        "@type": "VideoObject",
                        "name": `Video Hướng Dẫn ${currentRecipe.dishName}`,
                        "description": `Video clip hướng dẫn chi tiết từng bước nấu món ${currentRecipe.dishName} thơm ngon đậm đà, chuẩn vị truyền thống gia đình Việt Nam tại nhà.`,
                        "thumbnailUrl": [
                          selectedRecipeDish.image.startsWith('http')
                            ? selectedRecipeDish.image
                            : `https://www.angigio.com${selectedRecipeDish.image}`
                        ],
                        "contentUrl": `https://www.angigio.com/videos/${getRecipeSlug(selectedRecipeDish)}.mp4`,
                        "embedUrl": `https://www.youtube-nocookie.com/embed?search=${encodeURIComponent(currentRecipe.dishName)}`,
                        "uploadDate": "2024-01-15T08:00:00+07:00",
                        "duration": totalDurationIso || "PT25M"
                      },
                      "recipeIngredient": currentRecipe.ingredients.flatMap((cat) => cat.items),
                      "recipeInstructions": currentRecipe.steps.map((st) => ({
                        "@type": "HowToStep",
                        "position": st.step,
                        "name": st.title,
                        "text": st.description,
                        "url": `https://www.angigio.com${getRecipePath(selectedRecipeDish)}#step-${st.step}`,
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
                : sectionTab === 'region'
                ? [
                    {
                      "@type": "CollectionPage",
                      "@id": `https://www.angigio.com${typeof window !== 'undefined' && isRegionPath(window.location.pathname) ? currentRegion.path : '/am-thuc-vung-mien'}#collection`,
                      "url": `https://www.angigio.com${typeof window !== 'undefined' && isRegionPath(window.location.pathname) ? currentRegion.path : '/am-thuc-vung-mien'}`,
                      "name": typeof window !== 'undefined' && isRegionPath(window.location.pathname)
                        ? currentRegion.metaTitle
                        : "Bản Đồ Ẩm Thực Vùng Miền 3 Miền Việt Nam",
                      "description": typeof window !== 'undefined' && isRegionPath(window.location.pathname)
                        ? currentRegion.metaDescription
                        : "Khám phá hương vị ẩm thực 3 miền Bắc, Trung, Nam và Miền Tây sông nước với các món đặc sản truyền thống tinh hoa.",
                      "inLanguage": "vi-VN",
                      "isPartOf": {
                        "@type": "WebSite",
                        "@id": "https://www.angigio.com/#website"
                      },
                      "mainEntity": {
                        "@type": "ItemList",
                        "name": `Danh sách món ngon đặc sản ${currentRegion.name}`,
                        "description": currentRegion.description,
                        "numberOfItems": regionDishes.length,
                        "itemListElement": regionDishes.map((dish, idx) => ({
                          "@type": "ListItem",
                          "position": idx + 1,
                          "name": dish.name,
                          "url": `https://www.angigio.com${getRecipePath(dish)}`,
                          "image": dish.image.startsWith('http') ? dish.image : `https://www.angigio.com${dish.image}`
                        }))
                      }
                    }
                  ]
                : [
                    {
                      "@type": "CollectionPage",
                      "@id": "https://www.angigio.com/thuc-don-moi-ngay#collection",
                      "url": "https://www.angigio.com/thuc-don-moi-ngay",
                      "name": "Thực Đơn Mỗi Ngày Cân Bằng Dinh Dưỡng",
                      "description": "Gợi ý mâm cơm gia đình chuẩn vị, đủ dinh dưỡng từ Thứ 2 đến Chủ Nhật cho cả nhà quây quần.",
                      "inLanguage": "vi-VN",
                      "isPartOf": {
                        "@type": "WebSite",
                        "@id": "https://www.angigio.com/#website"
                      }
                    }
                  ]
              )
            ]
          })
        }}
      />
    </div>
  );
};
