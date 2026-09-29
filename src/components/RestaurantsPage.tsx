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
} from 'lucide-react';
import { SAMPLE_SPONSORED_PARTNERS } from '../data/sponsoredPartners';
import { SponsoredPartner, UserLocation } from '../types';

interface RestaurantsPageProps {
  userLocation?: UserLocation;
  onOpenLocationModal?: () => void;
  onSelectDish?: (dishId: string) => void;
  onNavigateContact?: () => void;
}

const CATEGORIES = [
  'Tất Cả',
  'Bún & Phở',
  'Cơm Tấm & Cơm Nhà',
  'Bánh Mì & Ăn Nhanh',
  'Đồ Uống & Trà Sữa',
  'Lẩu & Nướng',
  'Ăn Vặt & Hải Sản',
  'Healthy & Chay',
] as const;

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
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');
  const [selectedCity, setSelectedCity] = useState<string>('Tất Cả Thành Phố');
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [onlyHighRating, setOnlyHighRating] = useState(false);

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return SAMPLE_SPONSORED_PARTNERS.filter((partner) => {
      if (!partner.isActive) return false;

      // Category filter
      if (selectedCategory !== 'Tất Cả' && partner.category !== selectedCategory) {
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

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-stone-900 via-stone-800 to-orange-950 text-white p-8 sm:p-12 shadow-lg border border-stone-800">
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-lg uppercase tracking-wider mb-3 inline-block">
              Dành Cho Chủ Quán Ăn & Nhà Hàng
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white mb-3">
              Quán Của Bạn Chưa Có Mặt Trên "Hôm Nay Ăn Gì?"
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mb-6 leading-relaxed">
              Tiếp cận hơn 50.000+ thực khách mỗi tháng đang tìm kiếm món ăn mỗi ngày quanh khu vực của bạn. Xuất hiện nổi bật trong Vòng Quay, Tarot Ẩm Thực và danh bạ Quán Ngon với nút đặt món trực tiếp qua ShopeeFood, GrabFood, BeFood.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {onNavigateContact && (
                <button
                  onClick={onNavigateContact}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Đăng ký quán ngon ngay</span>
                </button>
              )}
              <a
                href="mailto:contact@angigio.com"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
              >
                Liên hệ hợp tác: contact@angigio.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
