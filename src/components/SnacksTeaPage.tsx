import React, { useState, useMemo } from 'react';
import {
  Search,
  Coffee,
  Sparkles,
  ShoppingBag,
  MapPin,
  CalendarDays,
  UtensilsCrossed,
  Flame,
  Clock,
  Heart,
  ExternalLink,
  CupSoda,
  Cookie,
  Layers,
} from 'lucide-react';
import { DO_UONG_DISHES, DO_AN_VAT_DISHES } from '../data/dishes';
import { Dish, AffiliateConfig, UserLocation } from '../types';
import { TabType } from '../utils/navigation';
import { trackAndOpenAffiliateLink, formatVND } from '../utils/affiliate';

interface SnacksTeaPageProps {
  affiliateConfig: AffiliateConfig;
  onSelectDish: (dish: Dish) => void;
  userLocation: UserLocation;
  onOpenLocationModal: (dishName?: string) => void;
  selectedDish?: Dish | null;
  onNavigate?: (tab: TabType) => void;
}

export const SnacksTeaPage: React.FC<SnacksTeaPageProps> = ({
  affiliateConfig,
  onSelectDish,
  userLocation,
  onOpenLocationModal,
  selectedDish,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'tra_sua' | 'an_vat'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under30' | '30to50' | 'above50'>('all');

  // Combine beverages and street snacks into curated list, ensuring no duplicate items
  const allSnacksAndDrinks = useMemo(() => {
    const rawList = [...DO_UONG_DISHES, ...DO_AN_VAT_DISHES];
    const seen = new Set<string>();
    return rawList.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, []);

  const filteredItems = useMemo(() => {
    return allSnacksAndDrinks.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.vietnameseName && item.vietnameseName.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        item.popularTags.some((tag) => tag.toLowerCase().includes(query));

      const matchCategory =
        activeFilter === 'all' ||
        (activeFilter === 'tra_sua' && item.category === 'do_uong') ||
        (activeFilter === 'an_vat' && item.category === 'an_vat');

      let matchPrice = true;
      if (priceFilter === 'under30') {
        matchPrice = item.estimatedPrice <= 30000;
      } else if (priceFilter === '30to50') {
        matchPrice = item.estimatedPrice > 30000 && item.estimatedPrice <= 50000;
      } else if (priceFilter === 'above50') {
        matchPrice = item.estimatedPrice > 50000;
      }

      return matchSearch && matchCategory && matchPrice;
    });
  }, [allSnacksAndDrinks, searchQuery, activeFilter, priceFilter]);

  const stats = useMemo(() => {
    const drinksCount = allSnacksAndDrinks.filter((d) => d.category === 'do_uong').length;
    const snacksCount = allSnacksAndDrinks.filter((d) => d.category === 'an_vat').length;
    return {
      total: allSnacksAndDrinks.length,
      drinks: drinksCount,
      snacks: snacksCount,
    };
  }, [allSnacksAndDrinks]);

  return (
    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-stone-800">
      {/* Submenu Tab Switcher: Món Ngon | Đồ Uống & Ăn Vặt | Lịch Ăn Tuần */}
      {onNavigate && (
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex p-1 rounded-2xl bg-stone-100/90 border border-stone-200/80 shadow-2xs">
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:bg-stone-50"
            >
              <UtensilsCrossed className="w-4 h-4 text-stone-500" />
              <span>Món Ngon</span>
            </button>
            <button
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white shadow-xs text-stone-900 text-xs sm:text-sm font-bold border border-stone-200/60"
            >
              <Coffee className="w-4 h-4 text-orange-600" />
              <span>Đồ Uống & Ăn Vặt</span>
            </button>
            <button
              onClick={() => onNavigate('planner')}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:bg-stone-50"
            >
              <CalendarDays className="w-4 h-4 text-stone-500" />
              <span>Lịch Ăn Tuần</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3.5 border border-amber-200/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Thiên Đường Giải Khát & Đồ Ăn Vặt Giờ Xế Chiều</span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-black tracking-tight leading-tight mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-red-600">
            {stats.total}+ Món Hot Trend Giới Trẻ & Dân Văn Phòng
          </span>
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
          Cứ mỗi 3 - 4 giờ chiều lại buồn miệng? Khám phá trọn bộ trà sữa, cà phê muối, trà trái cây mát lạnh<br className="hidden md:inline" /> cùng bánh tráng trộn, nem chua rán, bánh tráng nướng Đà Lạt giòn rụm kèm link ship hỏa tốc gần bạn.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Tìm trà sữa, cà phê, trà đào, bánh tráng nướng, chè..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-300 text-sm focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-stone-50/50"
            />
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Tất cả ({stats.total})
            </button>
            <button
              onClick={() => setActiveFilter('tra_sua')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === 'tra_sua'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <CupSoda className="w-3.5 h-3.5" />
              <span>Trà Sữa & Đồ Uống ({stats.drinks})</span>
            </button>
            <button
              onClick={() => setActiveFilter('an_vat')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === 'an_vat'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Đồ Ăn Vặt ({stats.snacks})</span>
            </button>
          </div>
        </div>

        {/* Secondary filters: Price range */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-medium">Mức giá:</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'Tất cả giá' },
                { id: 'under30', label: 'Dưới 30k' },
                { id: '30to50', label: '30k - 50k' },
                { id: 'above50', label: 'Trên 50k' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriceFilter(p.id as any)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    priceFilter === p.id
                      ? 'bg-orange-100 text-orange-800 font-bold'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-stone-500">
            Đang hiển thị <strong className="text-stone-900 font-bold">{filteredItems.length}</strong> món
          </div>
        </div>
      </div>

      {/* Grid of Dishes */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((dish) => {
            const isBeverage = dish.category === 'do_uong';
            return (
              <div
                key={dish.id}
                onClick={() => onSelectDish(dish)}
                className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 flex flex-col cursor-pointer"
              >
                {/* Image & Badges */}
                <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={`${dish.vietnameseName || dish.name} - Trà Sữa & Ăn Vặt Hôm Nay Ăn Gì`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badge: Category */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold text-white shadow-xs backdrop-blur-xs flex items-center gap-1 ${
                        isBeverage ? 'bg-orange-600/90' : 'bg-amber-600/90'
                      }`}
                    >
                      {isBeverage ? <CupSoda className="w-3 h-3" /> : <Cookie className="w-3 h-3" />}
                      <span>{isBeverage ? 'Trà Sữa & Đồ Uống' : 'Ăn Vặt Đường Phố'}</span>
                    </span>
                  </div>

                  {/* Top Right: Calories */}
                  {dish.calories && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                      {dish.calories}
                    </div>
                  )}

                  {/* Bottom: Price */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-white/95 text-stone-900 font-extrabold text-xs shadow-xs">
                    {dish.priceRange}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-stone-900 text-base sm:text-lg group-hover:text-orange-600 transition-colors line-clamp-1 mb-1.5">
                      {dish.vietnameseName || dish.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
                      {dish.description}
                    </p>

                    {/* Tags */}
                    {dish.popularTags && dish.popularTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {dish.popularTags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-lg bg-stone-100 text-stone-600 text-[11px] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Order Delivery Action Buttons */}
                  <div className="pt-3 border-t border-stone-100 grid grid-cols-4 gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        trackAndOpenAffiliateLink('shopeefood', dish, affiliateConfig, userLocation);
                      }}
                      className="py-2 px-1 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-extrabold text-[11px] flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs cursor-pointer"
                      title={`Đặt ${dish.name} trên ShopeeFood`}
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
                      title={`Đặt ${dish.name} trên GrabFood`}
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
                      title={`Đặt ${dish.name} trên BeFood`}
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
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <Coffee className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-stone-700">Không tìm thấy món trà sữa hay ăn vặt nào</h3>
          <p className="text-xs text-stone-500 mt-1">
            Vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc mức giá.
          </p>
        </div>
      )}
    </div>
  );
};
