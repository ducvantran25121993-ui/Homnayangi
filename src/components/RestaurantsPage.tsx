import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Star,
  Clock,
  Phone,
  ExternalLink,
  Tag,
  CheckCircle2,
  Sparkles,
  UtensilsCrossed,
  Filter,
  Navigation,
  Compass,
  ArrowRight,
  Flame,
  Award,
  Store,
  ChevronRight,
  PlusCircle,
  Crown,
  Coffee,
  Beer,
  Zap,
  TrendingUp,
  ShieldCheck,
  Mail,
  Check,
} from 'lucide-react';
import { SAMPLE_SPONSORED_PARTNERS } from '../data/sponsoredPartners';
import { SponsoredPartner, UserLocation } from '../types';

interface RestaurantsPageProps {
  userLocation?: UserLocation;
  onOpenLocationModal?: () => void;
  onSelectDish?: (dishId: string) => void;
  onNavigateContact?: () => void;
}

interface CategoryTab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_TABS: CategoryTab[] = [
  { id: 'Quán Ăn', name: 'Quán Ăn', icon: UtensilsCrossed },
  { id: 'Nhà Hàng', name: 'Nhà Hàng', icon: Crown },
  { id: 'Đồ Uống & Ăn Vặt', name: 'Đồ Uống & Ăn Vặt', icon: Coffee },
  { id: 'Quán Nhậu', name: 'Quán Nhậu', icon: Beer },
];

const CITIES = [
  'Tất Cả Thành Phố',
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
] as const;

export const RestaurantsPage: React.FC<RestaurantsPageProps> = ({
  userLocation,
  onOpenLocationModal,
  onSelectDish,
  onNavigateContact,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Quán Ăn');
  const [selectedCity, setSelectedCity] = useState<string>('Tất Cả Thành Phố');
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyHighRating, setOnlyHighRating] = useState(false);

  // Count restaurants in each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'Quán Ăn': 0,
      'Nhà Hàng': 0,
      'Đồ Uống & Ăn Vặt': 0,
      'Quán Nhậu': 0,
    };
    SAMPLE_SPONSORED_PARTNERS.forEach((p) => {
      if (p.isActive && p.category && counts[p.category] !== undefined) {
        if (selectedCity === 'Tất Cả Thành Phố' || p.city === selectedCity || p.city === 'Toàn quốc') {
          counts[p.category] += 1;
        }
      }
    });
    return counts;
  }, [selectedCity]);

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return SAMPLE_SPONSORED_PARTNERS.filter((partner) => {
      if (!partner.isActive) return false;

      // Category filter (strictly match selected category)
      if (partner.category !== selectedCategory) {
        return false;
      }

      // City filter
      if (selectedCity !== 'Tất Cả Thành Phố') {
        if (partner.city !== selectedCity && partner.city !== 'Toàn quốc') {
          return false;
        }
      }

      // Only promo filter
      if (onlyPromo && !partner.promoBadge) {
        return false;
      }

      // Only high rating filter (>= 4.8)
      if (onlyHighRating && partner.rating < 4.8) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = partner.restaurantName.toLowerCase().includes(query);
        const matchAddress = partner.address.toLowerCase().includes(query);
        const matchCategory = partner.category?.toLowerCase().includes(query);
        const matchDishes = partner.highlightDishes?.some((d) => d.toLowerCase().includes(query));
        const matchDesc = partner.description?.toLowerCase().includes(query);
        if (!matchName && !matchAddress && !matchCategory && !matchDishes && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedCity, onlyPromo, onlyHighRating]);

  return (
    <div className="min-h-screen bg-stone-50/70 pb-20 animate-fade-in">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-5xl xl:max-w-6xl mx-auto pt-6 sm:pt-8 mb-6 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border border-orange-200/80 shadow-2xs">
          <Store className="w-4 h-4 text-orange-600" />
          <span>Địa Điểm Ẩm Thực Uy Tín & Chuẩn Vị</span>
        </div>
        
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-stone-900 tracking-tight mb-3">
          Top Quán Ngon Gần Bạn
        </h1>
        
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl mx-auto leading-relaxed">
          Tuyển chọn những quán ăn gia truyền, thương hiệu nổi tiếng và địa chỉ ẩm thực được thực khách đánh giá cao nhất. Đặt giao tận nơi qua ShopeeFood, GrabFood, BeFood hoặc chỉ đường Google Maps nhanh chóng.
        </p>
      </section>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xs border border-stone-200 space-y-4">
          {/* Search bar + City filter */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="relative sm:col-span-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên quán ăn, món đặc trưng, địa chỉ, quận huyện..."
                className="w-full pl-11 pr-4 py-3 bg-stone-50 hover:bg-stone-100/70 focus:bg-white rounded-2xl text-xs sm:text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 px-2 py-1 bg-stone-200 rounded-lg cursor-pointer"
                >
                  Xóa
                </button>
              )}
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-3 px-4 bg-stone-50 hover:bg-stone-100/70 focus:bg-white rounded-2xl text-xs sm:text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-semibold text-stone-700 cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    📍 {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs - Centered & Beautiful Segmented Control */}
          <div className="flex justify-center pt-1 pb-1">
            <div className="inline-flex p-1.5 sm:p-2 bg-stone-100 rounded-2xl sm:rounded-full border border-stone-200/90 shadow-2xs max-w-full overflow-x-auto scrollbar-none gap-1 sm:gap-2">
              {CATEGORY_TABS.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                const count = categoryCounts[cat.id] ?? 0;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 cursor-pointer select-none ${
                      isSelected
                        ? 'bg-linear-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/25 scale-[1.02]'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/80 active:scale-95'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-stone-500'}`} />
                    <span>{cat.name}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick toggle badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-stone-400 font-semibold inline-flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Lọc nhanh:
              </span>
              
              <button
                onClick={() => setOnlyPromo(!onlyPromo)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                  onlyPromo
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>Có khuyến mãi</span>
              </button>

              <button
                onClick={() => setOnlyHighRating(!onlyHighRating)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
                  onlyHighRating
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Đánh giá 4.8★ trở lên</span>
              </button>
            </div>

            <div className="text-stone-500 font-medium">
              Tìm thấy <strong className="text-stone-900">{filteredRestaurants.length}</strong> quán ngon
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESTAURANTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-2xs max-w-lg mx-auto">
            <UtensilsCrossed className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800 mb-1">
              Không tìm thấy quán ăn phù hợp
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Hãy thử chọn thành phố khác, đổi chuyên mục món hoặc xóa bớt từ khóa tìm kiếm.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Tất Cả');
                setSelectedCity('Tất Cả Thành Phố');
                setOnlyPromo(false);
                setOnlyHighRating(false);
              }}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((partner) => {
              return (
                <article
                  key={partner.id}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Image Cover */}
                  <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
                    <img
                      src={partner.coverImage || partner.logo}
                      alt={partner.restaurantName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Verified Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 bg-orange-600/90 backdrop-blur-xs text-white text-[11px] font-bold rounded-lg shadow-xs flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {partner.verifiedBadge || 'Quán Ngon'}
                      </span>
                      {partner.category && (
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium rounded-lg">
                          {partner.category}
                        </span>
                      )}
                    </div>

                    {/* Price Range Badge */}
                    {partner.priceRange && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-black rounded-lg shadow-xs">
                        {partner.priceRange}
                      </div>
                    )}

                    {/* Rating at bottom-left */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white text-xs font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{partner.rating.toFixed(1)}</span>
                      {partner.reviewCount && (
                        <span className="text-stone-300 text-[10px]">
                          ({partner.reviewCount.toLocaleString('vi-VN')})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Restaurant Title */}
                      <h2 className="text-base sm:text-lg font-black text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1 mb-1.5">
                        {partner.restaurantName}
                      </h2>

                      {/* Promo Badge */}
                      {partner.promoBadge && (
                        <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-lg text-xs font-bold">
                          <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="line-clamp-1">{partner.promoBadge}</span>
                        </div>
                      )}

                      {/* Description */}
                      {partner.description && (
                        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
                          {partner.description}
                        </p>
                      )}

                      {/* Address & Hours */}
                      <div className="space-y-1.5 text-xs text-stone-500 mb-4">
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 text-stone-700">{partner.address}</span>
                        </div>
                        {partner.openingHours && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>Mở cửa: {partner.openingHours}</span>
                          </div>
                        )}
                      </div>

                      {/* Highlight Dishes */}
                      {partner.highlightDishes && partner.highlightDishes.length > 0 && (
                        <div className="mb-4 pt-3 border-t border-stone-100">
                          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                            Món nổi bật
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {partner.highlightDishes.map((dish, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-0.5 bg-stone-100 text-stone-700 text-[11px] font-medium rounded-md"
                              >
                                {dish}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Delivery & Maps Buttons */}
                    <div className="pt-3 border-t border-stone-100 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        {partner.shopeeFoodUrl && (
                          <a
                            href={partner.shopeeFoodUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white border border-orange-200 hover:border-orange-600 text-xs font-bold transition-all shadow-2xs cursor-pointer group/btn"
                          >
                            <span>ShopeeFood</span>
                            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        )}

                        {partner.grabFoodUrl && (
                          <a
                            href={partner.grabFoodUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white border border-emerald-200 hover:border-emerald-600 text-xs font-bold transition-all shadow-2xs cursor-pointer group/btn"
                          >
                            <span>GrabFood</span>
                            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {partner.googleMapsUrl && (
                          <a
                            href={partner.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer"
                          >
                            <Navigation className="w-3 h-3 text-blue-600" />
                            <span>Chỉ đường</span>
                          </a>
                        )}

                        {partner.phone ? (
                          <a
                            href={`tel:${partner.phone.replace(/\s+/g, '')}`}
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer"
                          >
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>Gọi quán</span>
                          </a>
                        ) : partner.beFoodUrl ? (
                          <a
                            href={partner.beFoodUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all cursor-pointer"
                          >
                            <span>BeFood</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. PARTNER PROMOTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-orange-950 border border-orange-500/30 shadow-2xl p-6 sm:p-10 lg:p-12">
          
          {/* Ambient Lighting & Glow Effects */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
          
          {/* Decorative Subtle Grid Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px' 
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7">
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Dành Cho Chủ Quán Ăn & Nhà Hàng</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-semibold normal-case">Hỗ trợ toàn quốc</span>
              </div>

              {/* Main Headline with Gradient */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                Quán Của Bạn Chưa Có Mặt Trên <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  "Hôm Nay Ăn Gì?"
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 mb-6 leading-relaxed max-w-xl">
                Tiếp cận hơn <strong className="text-white font-bold">50.000+ thực khách mỗi tháng</strong> đang tìm kiếm món ăn mỗi ngày quanh khu vực của bạn. Xuất hiện nổi bật trong Vòng Quay, Tarot Ẩm Thực và danh bạ Quán Ngon với nút đặt món trực tiếp qua ShopeeFood, GrabFood, BeFood.
              </p>

              {/* Feature Benefit Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-xl">
                <div className="flex items-center gap-2.5 bg-stone-900/70 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Xuất hiện nổi bật</div>
                    <div className="text-[11px] text-stone-400">Trong Vòng Quay & Tarot Ẩm Thực</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-stone-900/70 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Tăng đơn đặt món</div>
                    <div className="text-[11px] text-stone-400">Nút đặt ShopeeFood, Grab, Be</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-stone-900/70 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Định vị GPS thông minh</div>
                    <div className="text-[11px] text-stone-400">Ưu tiên khách ở gần quán nhất</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-stone-900/70 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Duyệt hồ sơ nhanh 24h</div>
                    <div className="text-[11px] text-stone-400">Hỗ trợ tối ưu thông tin quán</div>
                  </div>
                </div>
              </div>

              {/* Call-to-action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {onNavigateContact && (
                  <button
                    onClick={onNavigateContact}
                    className="px-6 py-3.5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2 group"
                  >
                    <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Đăng ký quán ngon ngay</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                <a
                  href="https://zalo.me/0385522474"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-[#0068FF]/15 hover:bg-[#0068FF]/25 text-white border border-[#0068FF]/40 hover:border-[#0068FF]/70 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer inline-flex items-center gap-2.5 backdrop-blur-sm group"
                  title="Nhắn tin Zalo trực tiếp hỗ trợ đối tác nhà hàng"
                >
                  <span className="w-5 h-5 rounded-md bg-[#0068FF] text-white flex items-center justify-center font-black text-[10px] tracking-tighter shrink-0 shadow-xs">
                    Zalo
                  </span>
                  <span>Liên hệ Zalo: 038 5522 474</span>
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-[11px] text-stone-400">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Miễn phí đăng ký cơ bản
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Không giữ cọc hay ràng buộc
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Hỗ trợ gắn link app giao hàng
                </span>
              </div>
            </div>

            {/* Right Showcase Column (5 cols) - Interactive Restaurant Preview Mockup */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-sm">
                
                {/* Floating Decorative Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl blur-xl opacity-30 animate-pulse pointer-events-none" />

                {/* Main Card Mockup */}
                <div className="relative bg-stone-900 border border-stone-700/80 rounded-2xl overflow-hidden shadow-2xl p-4 space-y-3.5">
                  
                  {/* Mockup Header: Verified Partner */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                      <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>Quán Đối Tác Xác Thực</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Đang mở cửa</span>
                    </span>
                  </div>

                  {/* Image with overlay tags */}
                  <div className="relative h-44 rounded-xl overflow-hidden bg-stone-800">
                    <img 
                      src="/images/thit_ba_chi_nuong_noi_chien.jpg" 
                      alt="Quán đối tác mẫu" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-black/20" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-lg border border-white/10">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>4.9 (1.200+ đánh giá)</span>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <div className="text-white font-extrabold text-sm drop-shadow-md leading-tight">
                        Cơm Tấm Sườn Cọng Nướng & Món Ngon Gia Đình
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-300 text-[11px] mt-1">
                        <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                        <span className="truncate">Cách bạn 0.8 km • Quận 1, TP.HCM</span>
                      </div>
                    </div>
                  </div>

                  {/* Mockup Delivery CTA Buttons */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      Khách hàng bấm đặt món trực tiếp qua:
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="bg-orange-950/80 border border-orange-500/40 text-orange-200 text-center py-2 px-1 rounded-lg text-[11px] font-extrabold flex flex-col items-center">
                        <span className="text-[10px] text-orange-400">Shopee</span>
                        <span>Food</span>
                      </div>
                      <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-center py-2 px-1 rounded-lg text-[11px] font-extrabold flex flex-col items-center">
                        <span className="text-[10px] text-emerald-400">Grab</span>
                        <span>Food</span>
                      </div>
                      <div className="bg-amber-950/80 border border-amber-500/40 text-amber-200 text-center py-2 px-1 rounded-lg text-[11px] font-extrabold flex flex-col items-center">
                        <span className="text-[10px] text-amber-400">Be</span>
                        <span>Food</span>
                      </div>
                    </div>
                  </div>

                  {/* Conversion Stat Pill on the card */}
                  <div className="p-2.5 rounded-xl bg-stone-800/90 border border-stone-700/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        ↗
                      </div>
                      <span className="text-stone-300 text-[11px]">Lượt xem & đặt hàng:</span>
                    </div>
                    <span className="font-extrabold text-emerald-400 text-xs">
                      +350 khách / tuần
                    </span>
                  </div>

                </div>

                {/* Floating mini badge at bottom right */}
                <div className="absolute -bottom-3 -right-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl shadow-xl px-3 py-1.5 text-[11px] font-extrabold flex items-center gap-1.5 border border-white/20">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>Ưu tiên hiển thị top</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
