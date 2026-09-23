export interface Dish {
  id: string;
  name: string;
  vietnameseName: string;
  category:
    | 'com_xoi'
    | 'bun_pho_mi'
    | 'banhmi_cuon'
    | 'nuong_chien'
    | 'salad_monnhe'
    | 'lau_chao'
    | 'pizza_pasta'
    | 'do_chay'
    | 'mon_khac'
    | 'com'
    | 'bun_pho'
    | 'an_vat'
    | 'lau_nuong'
    | 'healthy'
    | 'fastfood'
    | 'do_uong'
    | 'mon_nhau';
  mealTime: ('sang' | 'trua' | 'toi' | 'an_vat' | 'an_dem')[];
  priceRange: string;
  estimatedPrice: number; // in VND
  calories: string;
  description: string;
  image: string;
  popularTags: string[];
  searchKeyword: string;
  idealWeather?: string;
  bestPairedWith?: string;
}

export interface Voucher {
  id: string;
  platform: 'shopeefood' | 'grabfood' | 'befood';
  code: string;
  discountText: string;
  minOrder: string;
  expireDate: string;
  description: string;
  affiliateUrl: string;
}

export interface AffiliateConfig {
  shopeeAffiliateId: string;
  shopeeSubId: string;
  shopeeBaseUrl: string;
  grabfoodAffiliateId: string;
  grabfoodWebUrl: string;
  befoodPartnerId: string;
  befoodWebUrl: string;
  averageCommissionRate: number; // e.g. 5.5%
  defaultCity: string;
}

export interface ClickRecord {
  id: string;
  dishId: string;
  dishName: string;
  platform: 'shopeefood' | 'grabfood' | 'befood';
  timestamp: string;
  estimatedCommission: number;
}

export interface UserLocation {
  city: string;
  citySlug: string;
  district?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  source: 'gps' | 'manual' | 'default';
  updatedAt?: string;
}

export interface AISuggestion {
  name: string;
  tagline: string;
  category: string;
  estimatedPrice: string;
  reason: string;
  searchKeyword: string;
  tags: string[];
  calories: string;
  pairWith: string;
  image?: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
  notes?: string;
}

export type MealSlot = 'breakfast' | 'lunch' | 'dinner';

export interface DayPlan {
  dayId: 't2' | 't3' | 't4' | 't5' | 't6' | 't7' | 'cn';
  dayName: string;
  dayShort: string;
  breakfast?: Dish | null;
  lunch?: Dish | null;
  dinner?: Dish | null;
  note?: string;
}

export interface WeeklyMealPlan {
  id: string;
  name: string;
  presetKey?: string;
  weekKey?: string;
  weekLabel?: string;
  updatedAt: string;
  days: Record<string, DayPlan>;
}

export interface RecipeStep {
  step: number;
  title: string;
  description: string;
  time?: string;
  heat?: string;
  goal?: string;
  actionPoints?: string[];
  tip?: string;
}

export interface DishRecipe {
  dishId: string;
  dishName: string;
  seoTitle?: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Cầu kỳ';
  servings: string;
  ingredients: {
    category: string;
    items: string[];
  }[];
  steps: RecipeStep[];
  chefSecret: string;
  recommendedSauce?: string;
}

export type RegionId = 'bac' | 'trung' | 'nam' | 'mientay';

export interface RegionalCuisine {
  id: RegionId;
  name: string;
  title: string;
  badge: string;
  description: string;
  tasteProfile: string[];
  iconicKeyIngredients: string[];
  dishIds: string[];
  highlightTip: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
}

export interface FamilyMealDish {
  role: 'Món Mặn' | 'Món Canh' | 'Món Xào / Rau' | 'Ăn Kèm / Tráng Miệng' | string;
  roleTag: string; // e.g. "Món mặn chính", "Canh thanh mát", "Rau xanh củ quả", "Kèm đưa cơm"
  dishId: string;
  name: string;
  description: string;
  cookingTime?: string;
  calories?: string;
  image?: string;
  recipe?: {
    prepTime?: string;
    cookTime?: string;
    servings?: string;
    ingredients: string[];
    steps: string[];
    tip?: string;
  };
}

export interface FamilyMealTray {
  trayName: string; // e.g. "Mâm Cơm Trưa Gia Đình", "Mâm Cơm Chiều Ấm Cúng"
  slot: 'Trưa' | 'Tối';
  description: string;
  trayImage?: string; // e.g. "/images/mam_com_gia_dinh.jpg"
  servings?: string; // e.g. "3 - 4 người ăn"
  dishes: FamilyMealDish[];
  ingredients?: {
    category: string; // e.g. "Thực phẩm chính (Thịt, cá, tôm)", "Rau củ quả tươi", "Gia vị & Phụ liệu"
    items: string[];
  }[];
}

export interface DailyMealOption {
  id: string;
  dayName: string;
  title: string;
  tagline: string;
  targetAudience: string;
  estimatedTotalCalories: string;
  avgBudget: string;
  // Mâm cơm 3 món chuẩn vị gia đình cho từng ngày
  familyLunch: FamilyMealTray;
  familyDinner: FamilyMealTray;
  meals?: {
    slot: 'Sáng' | 'Trưa' | 'Xế Chiều' | 'Tối';
    dishId: string;
    dishName: string;
    pairing: string;
    reason: string;
  }[];
}

export interface SponsoredPartner {
  id: string;
  restaurantName: string;
  verifiedBadge?: string; // e.g. "Đối tác chính thức", "Quán ngon đề xuất"
  dishIds: string[]; // List of dish IDs this restaurant sponsors (e.g. ['com-tam', 'com-tam-suon-bi-cha'])
  logo?: string;
  rating: number; // e.g. 4.9
  reviewCount?: number; // e.g. 1280
  address: string; // e.g. "128 Nguyễn Đình Chiểu, P. Đa Kao, Quận 1, TP.HCM"
  district: string; // e.g. "Quận 1"
  city: string; // e.g. "TP. Hồ Chí Minh"
  promoBadge?: string; // e.g. "Giảm 20% đơn đầu", "Tặng trà đào"
  phone?: string;
  shopeeFoodUrl?: string;
  grabFoodUrl?: string;
  directBookingUrl?: string; // e.g. Fanpage, Zalo or Hotline
  googleMapsUrl?: string;
  isActive: boolean;
}
