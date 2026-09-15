import React, { useState, useMemo } from 'react';
import { X, Search, Utensils, Check, Sparkles, Filter } from 'lucide-react';
import { Dish, MealSlot } from '../types';
import { INITIAL_DISHES } from '../data/dishes';
import { isMealFoodDish } from '../utils/mealPlanner';

interface MealDishPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayName: string;
  slot: MealSlot;
  currentDish?: Dish | null;
  onSelect: (dish: Dish) => void;
}

const SLOT_NAMES: Record<MealSlot, { title: string; desc: string }> = {
  breakfast: { title: 'Bữa Sáng', desc: 'Món ăn sáng nhẹ nhàng, nạp năng lượng' },
  lunch: { title: 'Bữa Trưa', desc: 'Món ăn trưa đậm đà, no lâu' },
  dinner: { title: 'Bữa Tối', desc: 'Món ăn tối thanh đạm hoặc tụ họp ấm cúng' },
};

export const MealDishPickerModal: React.FC<MealDishPickerModalProps> = ({
  isOpen,
  onClose,
  dayName,
  slot,
  currentDish,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats: { id: string; label: string }[] = [
      { id: 'all', label: 'Tất Cả Món' },
      { id: 'com_xoi', label: 'Cơm & Xôi' },
      { id: 'bun_pho_mi', label: 'Bún, Phở, Mì' },
      { id: 'banhmi_cuon', label: 'Bánh Mì & Cuốn' },
      { id: 'salad_monnhe', label: 'Salad & Healthy' },
      { id: 'lau_chao', label: 'Lẩu & Cháo' },
      { id: 'nuong_chien', label: 'Nướng & Chiên' },
      { id: 'do_chay', label: 'Món Chay' },
    ];
    return cats;
  }, []);

  const filteredDishes = useMemo(() => {
    // Strictly food dishes only, exclude all beverages and drinks
    let result = INITIAL_DISHES.filter(isMealFoodDish);

    if (selectedCategory !== 'all') {
      result = result.filter((d) => d.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.vietnameseName.toLowerCase().includes(q) ||
          d.name.toLowerCase().includes(q) ||
          d.searchKeyword?.toLowerCase().includes(q) ||
          d.popularTags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [selectedCategory, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-1">
              <Sparkles className="w-3 h-3" />
              <span>{dayName} • {SLOT_NAMES[slot]?.title}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-stone-900">
              Chọn Món Cho {dayName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 bg-stone-50/80 border-b border-stone-200/80 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm món (Phở bò, Cơm tấm, Salad, Bánh mì...)"
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Quick Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-stone-200/70 border border-stone-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dish List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-stone-100">
          {filteredDishes.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-sm">
              <Utensils className="w-10 h-10 mx-auto mb-2 text-stone-300" />
              <p>Không tìm thấy món ăn phù hợp với từ khóa &quot;{searchTerm}&quot;</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-orange-600 font-bold hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            filteredDishes.map((dish) => {
              const isSelected = currentDish?.id === dish.id;
              return (
                <div
                  key={dish.id}
                  onClick={() => {
                    onSelect(dish);
                    onClose();
                  }}
                  className={`flex items-center justify-between gap-3 p-3 rounded-2xl transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-orange-50 border border-orange-200/80'
                      : 'hover:bg-stone-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={dish.image}
                      alt={dish.vietnameseName}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-200/70 group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm truncate group-hover:text-orange-600 transition-colors">
                          {dish.vietnameseName}
                        </span>
                        {isSelected && (
                          <span className="shrink-0 px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-bold">
                            Đang chọn
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {dish.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-stone-500 font-medium">
                        <span className="text-orange-600 font-bold">
                          {dish.estimatedPrice ? `${dish.estimatedPrice.toLocaleString('vi-VN')}đ` : 'Giá linh hoạt'}
                        </span>
                        <span>•</span>
                        <span>{dish.calories || '450 kcal'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isSelected
                        ? 'bg-orange-600 text-white'
                        : 'bg-stone-100 text-stone-700 group-hover:bg-orange-600 group-hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Đã gán' : 'Chọn món'}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
          <span>Tìm thấy <strong>{filteredDishes.length}</strong> món phù hợp</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 font-medium hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
