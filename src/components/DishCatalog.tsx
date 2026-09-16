import React, { useState, useMemo } from 'react';
import { Search, UtensilsCrossed, Flame, ShoppingBag, ExternalLink, Filter, MapPin, CalendarDays } from 'lucide-react';
import { INITIAL_DISHES } from '../data/dishes';
import { Dish, AffiliateConfig, UserLocation } from '../types';
import { TabType } from '../utils/navigation';
import { trackAndOpenAffiliateLink, formatVND } from '../utils/affiliate';

interface DishCatalogProps {
  affiliateConfig: AffiliateConfig;
  onSelectDish: (dish: Dish) => void;
  userLocation: UserLocation;
  onOpenLocationModal: (dishName?: string) => void;
  selectedDish?: Dish | null;
  onNavigate?: (tab: TabType) => void;
}

export const DishCatalog: React.FC<DishCatalogProps> = ({
  affiliateConfig,
  onSelectDish,
  userLocation,
  onOpenLocationModal,
  selectedDish,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMeal, setSelectedMeal] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất cả', icon: null },
    { id: 'com_xoi', label: 'Cơm & xôi', icon: '🍚' },
    { id: 'bun_pho_mi', label: 'Bún, phở & mì', icon: '🍜' },
    { id: 'banhmi_cuon', label: 'Bánh mì & cuốn', icon: '🥖' },
    { id: 'nuong_chien', label: 'Nướng & chiên', icon: '🍗' },
    { id: 'salad_monnhe', label: 'Salad & món nhẹ', icon: '🥗' },
    { id: 'lau_chao', label: 'Lẩu & cháo', icon: '🍲' },
    { id: 'pizza_pasta', label: 'Pizza & pasta', icon: '🍕' },
    { id: 'do_chay', label: 'Đồ chay', icon: '🥬' },
    { id: 'mon_khac', label: 'Món khác', icon: '🍽️' },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: INITIAL_DISHES.length,
      com_xoi: 0,
      bun_pho_mi: 0,
      banhmi_cuon: 0,
      nuong_chien: 0,
      salad_monnhe: 0,
      lau_chao: 0,
      pizza_pasta: 0,
      do_chay: 0,
      mon_khac: 0,
    };
    INITIAL_DISHES.forEach((d) => {
      const cat = d.category;
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    });
    return counts;
  }, []);

  const mealTimes = [
    { id: 'all', label: 'Mọi bữa ăn' },
    { id: 'sang', label: 'Bữa Sáng' },
    { id: 'trua', label: 'Bữa Trưa' },
    { id: 'an_vat', label: 'Xế Chiều' },
    { id: 'toi', label: 'Bữa Tối' },
    { id: 'an_dem', label: 'Ăn Đêm' },
  ];

  const filteredDishes = useMemo(() => {
    return INITIAL_DISHES.filter((dish) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        dish.name.toLowerCase().includes(query) ||
        (dish.vietnameseName ? dish.vietnameseName.toLowerCase().includes(query) : false) ||
        dish.description.toLowerCase().includes(query) ||
        dish.popularTags.some((tag) => tag.toLowerCase().includes(query));

      const matchCategory = selectedCategory === 'all' || dish.category === selectedCategory;
      const matchMeal = selectedMeal === 'all' || dish.mealTime.includes(selectedMeal as any);

      return matchSearch && matchCategory && matchMeal;
    });
  }, [searchQuery, selectedCategory, selectedMeal]);

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4">
      {/* Submenu tab switcher for Món Ngon */}
      {onNavigate && (
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-2xl bg-stone-100/90 border border-stone-200/80 shadow-2xs">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-xs text-stone-900 text-xs sm:text-sm font-bold border border-stone-200/60"
            >
              <UtensilsCrossed className="w-4 h-4 text-orange-600" />
              <span>Tất Cả Món Ngon (160+)</span>
            </button>
            <button
              onClick={() => onNavigate('planner')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:bg-stone-50"
            >
              <CalendarDays className="w-4 h-4 text-stone-500" />
              <span>Lịch Ăn Tuần</span>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-stone-900 tracking-tight mb-2 md:whitespace-nowrap">
          Thực Đơn Món Ngon 3 Miền - <span className="text-orange-600">160+ Đặc Sản Việt Nam Chuẩn Vị</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-3xl mx-auto">
          Tra cứu nhanh danh sách các món ngon 3 miền Bắc - Trung - Nam được yêu thích nhất kèm liên kết đặt món trực tiếp trên ShopeeFood, GrabFood & BeFood.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên món, nguyên liệu, hương vị..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-300 text-sm focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Meal Time Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {mealTimes.map((meal) => (
              <button
                key={meal.id}
                onClick={() => setSelectedMeal(meal.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedMeal === meal.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {meal.label}
              </button>
            ))}
          </div>

        </div>

        {/* Categories Tab Pill List */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-stone-100">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'border-amber-500/80 bg-stone-900 text-amber-400 shadow-xs ring-1 ring-amber-500/30'
                    : 'border-stone-200/90 bg-stone-50/80 hover:bg-stone-100 text-stone-700 hover:border-stone-300'
                }`}
              >
                {cat.icon && <span className="text-sm leading-none">{cat.icon}</span>}
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] font-bold ${
                    isSelected ? 'text-amber-300/80' : 'text-stone-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>Danh Sách Món Ngon</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                {filteredDishes.length} món
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => {
            const isSelected = selectedDish?.id === dish.id;
            return (
              <div
                key={dish.id}
                className={`bg-white rounded-3xl border transition-all overflow-hidden flex flex-col justify-between group ${
                  isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/80 shadow-lg bg-orange-50/10'
                    : 'border-stone-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                <div
                  onClick={() => onSelectDish(dish)}
                  className="cursor-pointer"
                >
                  {/* Food Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={dish.image}
                      alt={`${dish.vietnameseName || dish.name} đặc sản ${dish.category} chuẩn vị thơm ngon - Hôm Nay Ăn Gì`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-orange-700 shadow-xs">
                        {dish.priceRange}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-900/80 backdrop-blur-xs text-white">
                        {dish.calories}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {dish.popularTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-orange-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-black text-stone-900 group-hover:text-orange-600 transition-colors mb-1.5">
                      {dish.name}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-3">
                      {dish.description}
                    </p>

                    {dish.bestPairedWith && (
                      <div className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl">
                        <span className="font-semibold text-stone-700">Ăn kèm chuẩn vị:</span>{' '}
                        {dish.bestPairedWith}
                      </div>
                    )}
                  </div>
                </div>

                {/* Instant Order / App Switch Buttons with Affiliate Tracking */}
                <div className="p-4 bg-stone-50/80 border-t border-stone-100">
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <div className="text-[10px] uppercase font-bold text-stone-600 flex items-center gap-1">
                      <span>Chuyển qua app tìm món:</span>
                    </div>
                    <button
                      onClick={() => onSelectDish(dish)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200/80 hover:bg-orange-100 text-stone-700 hover:text-orange-700 transition-colors cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        trackAndOpenAffiliateLink('shopeefood', dish, affiliateConfig, userLocation);
                      }}
                      className="py-2 px-1 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-[11px] flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs cursor-pointer"
                      title={`Chuyển qua ShopeeFood tìm quán ${dish.name} tại ${userLocation.district || userLocation.city}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>Shopee</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        trackAndOpenAffiliateLink('grabfood', dish, affiliateConfig, userLocation);
                      }}
                      className="py-2 px-1 rounded-xl bg-[#00B14F] hover:bg-[#009643] text-white font-extrabold text-[11px] flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs cursor-pointer"
                      title={`Chuyển qua GrabFood tìm quán ${dish.name} tại ${userLocation.district || userLocation.city}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>Grab</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        trackAndOpenAffiliateLink('befood', dish, affiliateConfig, userLocation);
                      }}
                      className="py-2 px-1 rounded-xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 font-extrabold text-[11px] flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs cursor-pointer"
                      title={`Chuyển qua BeFood tìm quán ${dish.name} tại ${userLocation.district || userLocation.city}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>BeFood</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        trackAndOpenAffiliateLink('googlemaps', dish, affiliateConfig, userLocation);
                      }}
                      className="py-2 px-1 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-extrabold text-[11px] flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs cursor-pointer"
                      title={`Mở Google Maps tìm quán ${dish.name} gần bạn`}
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>Maps</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <UtensilsCrossed className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-stone-700">Không tìm thấy món nào phù hợp</h3>
          <p className="text-xs text-stone-500 mt-1">
            Vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.
          </p>
        </div>
      )}
    </div>
  );
};
