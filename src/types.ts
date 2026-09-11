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
    | 'fastfood';
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
}
