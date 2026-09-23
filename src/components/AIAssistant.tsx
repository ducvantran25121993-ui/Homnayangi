import React, { useState, useEffect } from 'react';
import { Sparkles, Send, ShoppingBag, ExternalLink, RefreshCw, AlertCircle, ChefHat, Check, Heart, MapPin, RotateCcw } from 'lucide-react';
import { AISuggestion, AffiliateConfig, UserLocation, Dish } from '../types';
import { trackAndOpenAffiliateLink } from '../utils/affiliate';
import { formatLocationDisplay } from '../utils/location';
import { DeliveryLocationBadge } from './DeliveryLocationBadge';
import { INITIAL_DISHES } from '../data/dishes';

// Helper to generate smart fallback suggestions from curated dishes when network drops or server is offline
function getClientFallbackDishes(mealTime: string, budget: string, mood: string, location: string): { suggestions: AISuggestion[]; advice: string } {
  const mealMap: Record<string, 'sang' | 'trua' | 'toi' | 'an_vat' | 'an_dem'> = {
    'Sáng': 'sang',
    'Trưa': 'trua',
    'Xế Chiều': 'an_vat',
    'Tối': 'toi',
    'Ăn Đêm': 'an_dem',
  };
  const targetMeal = mealMap[mealTime] || 'trua';

  let pool = INITIAL_DISHES.filter((d) => d.mealTime && d.mealTime.includes(targetMeal));
  if (pool.length < 3) {
    pool = INITIAL_DISHES.filter((d) => d.category !== 'do_uong' && d.category !== 'an_vat');
  }

  // Filter based on mood if possible
  let filtered = pool;
  if (mood.includes('thanh đạm') || mood.includes('healthy')) {
    const healthy = pool.filter((d) => d.popularTags.some((t) => t.toLowerCase().includes('thanh') || t.toLowerCase().includes('rau') || t.toLowerCase().includes('healthy')) || d.category === 'salad_monnhe' || d.category === 'healthy');
    if (healthy.length >= 2) filtered = healthy;
  } else if (mood.includes('cay') || mood.includes('đậm đà')) {
    const spicy = pool.filter((d) => d.popularTags.some((t) => t.toLowerCase().includes('đậm đà') || t.toLowerCase().includes('cay') || t.toLowerCase().includes('nóng')) || d.category === 'bun_pho_mi' || d.category === 'nuong_chien');
    if (spicy.length >= 2) filtered = spicy;
  } else if (mood.includes('chắc bụng')) {
    const hearty = pool.filter((d) => d.category === 'com_xoi' || d.category === 'com' || d.popularTags.some((t) => t.toLowerCase().includes('chắc bụng') || t.toLowerCase().includes('no lâu')));
    if (hearty.length >= 2) filtered = hearty;
  }

  const selected = filtered.slice(0, 3);
  const suggestions: AISuggestion[] = selected.map((d) => ({
    name: d.vietnameseName || d.name,
    tagline: d.description.slice(0, 85) + '...',
    category: d.category === 'com_xoi' || d.category === 'com' ? 'Cơm' : d.category.includes('bun') ? 'Bún / Mì / Phở' : 'Món Ngon Đặc Sản',
    estimatedPrice: d.priceRange || '40.000đ - 65.000đ',
    reason: `Món ăn hoàn hảo cho bữa ${mealTime}, hương vị chuẩn vị thơm ngon và dễ dàng gọi ship tại ${location}.`,
    searchKeyword: d.searchKeyword || d.vietnameseName || d.name,
    tags: d.popularTags.slice(0, 3),
    calories: d.calories || '~520 kcal',
    pairWith: d.bestPairedWith || 'Trà đá hoặc nước mía tươi mát',
    image: d.image,
  }));

  return {
    suggestions,
    advice: `Tại khu vực ${location}, bạn có thể dễ dàng tìm thấy các quán ngon này trên ShopeeFood, GrabFood hoặc đặt ship quanh đây!`,
  };
}

function normalizeDishText(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

export function resolveDishImage(item: { name: string; searchKeyword?: string; category?: string; image?: string }): string {
  if (item.image && item.image.trim() !== '') return item.image;

  const itemNameNorm = normalizeDishText(item.name);
  const keywordNorm = item.searchKeyword ? normalizeDishText(item.searchKeyword) : '';

  // 1. Exact match
  const exact = INITIAL_DISHES.find(
    (d) => normalizeDishText(d.vietnameseName || '') === itemNameNorm || normalizeDishText(d.name || '') === itemNameNorm
  );
  if (exact?.image) return exact.image;

  // 2. Keyword match
  if (keywordNorm) {
    const kwMatch = INITIAL_DISHES.find(
      (d) =>
        normalizeDishText(d.vietnameseName || '') === keywordNorm ||
        normalizeDishText(d.name || '') === keywordNorm ||
        normalizeDishText(d.searchKeyword || '') === keywordNorm
    );
    if (kwMatch?.image) return kwMatch.image;
  }

  // 3. Partial substring match
  const partial = INITIAL_DISHES.find((d) => {
    const dName = normalizeDishText(d.vietnameseName || d.name || '');
    return dName.length > 4 && (itemNameNorm.includes(dName) || dName.includes(itemNameNorm));
  });
  if (partial?.image) return partial.image;

  if (keywordNorm) {
    const kwPartial = INITIAL_DISHES.find((d) => {
      const dName = normalizeDishText(d.vietnameseName || d.name || '');
      return dName.length > 4 && (keywordNorm.includes(dName) || dName.includes(keywordNorm));
    });
    if (kwPartial?.image) return kwPartial.image;
  }

  // 4. Category-based fallback
  const cat = (item.category || '').toLowerCase();
  if (cat.includes('cơm') || cat.includes('com')) return '/images/com_tam_suon_bi_cha.jpg';
  if (cat.includes('bún') || cat.includes('phở') || cat.includes('mi')) return '/images/bun_bo_hue.jpg';
  if (cat.includes('cuốn')) return '/images/nem_nuong_nha_trang.jpg';
  if (cat.includes('chay')) return '/images/goi_cuon_chay.jpg';
  if (cat.includes('lẩu') || cat.includes('nóng')) return '/images/buffet.jpg';

  return '/images/mam_com_gia_dinh.jpg';
}

interface AIAssistantProps {
  affiliateConfig: AffiliateConfig;
  userLocation: UserLocation;
  onOpenLocationModal: (dishName?: string) => void;
  onSelectDish?: (dish: Dish) => void;
  selectedDish?: Dish | null;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  affiliateConfig,
  userLocation,
  onOpenLocationModal,
  onSelectDish,
  selectedDish,
}) => {
  const [mealTime, setMealTime] = useState('Trưa');
  const [budget, setBudget] = useState('35k - 60k (Văn phòng)');
  const [mood, setMood] = useState('Thèm đồ đậm đà cay nồng');
  const [weather, setWeather] = useState('Nắng nóng cần giải nhiệt');
  const [location, setLocation] = useState(userLocation.city || 'TP. Hồ Chí Minh');
  const [partySize, setPartySize] = useState(1);
  const [cravings, setCravings] = useState('');

  useEffect(() => {
    if (userLocation.city) {
      setLocation(userLocation.city);
    }
  }, [userLocation]);
  
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealTime,
          budget,
          mood,
          weather,
          location,
          partySize,
          cravings,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (data.success && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
        setAiAdvice(data.advice || '');
      } else {
        throw new Error(data.error || 'Không thể tạo gợi ý');
      }
    } catch (err: any) {
      console.warn('AI suggestion using curated fallback:', err);
      // Fallback seamlessly to local curated dishes
      const fallback = getClientFallbackDishes(mealTime, budget, mood, location);
      setSuggestions(fallback.suggestions);
      setAiAdvice(fallback.advice);
      setErrorMsg('Đang hiển thị thực đơn gợi ý chuẩn vị cho bữa ' + mealTime + '.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 sm:py-8 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-5xl xl:max-w-6xl mx-auto mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-stone-900 tracking-tight mb-2 md:whitespace-nowrap">
          AI Gợi Ý Món Ăn - <span className="text-purple-600">Trợ Lý Ẩm Thực Thông Minh</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Đừng để bụng đói phải đắn đo! Chọn nhanh tâm trạng và mức giá mong muốn, trợ lý sẽ &ldquo;bắt trúng&rdquo; ngay món ngon chuẩn vị, vừa miệng vừa ví.
        </p>
      </div>

      {/* Interactive Form */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-5 sm:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Meal time */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              1. Bữa Ăn Nào?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Sáng', 'Trưa', 'Xế Chiều', 'Tối', 'Ăn Đêm'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMealTime(t)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all ${
                    mealTime === t
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              2. Ngân Sách Mỗi Người
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Dưới 35k (Tiết kiệm)',
                '35k - 60k (Văn phòng)',
                '60k - 100k (Đầy đặn)',
                '> 100k (Sang chảnh)',
              ].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all ${
                    budget === b
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Mood / Feeling */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              3. Tâm Trạng Hôm Nay
            </label>
            <div className="space-y-1.5">
              {[
                'Thèm đồ đậm đà cay nồng',
                'Mệt mỏi cần ăn thanh đạm/healthy',
                'Đói cồn cào cần món chắc bụng',
                'Thèm đồ ngọt/trà sữa giải stress',
              ].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`w-full text-left py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                    mood === m
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Second row: Location, Party Size & Freeform input */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4 border-t border-stone-100">
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-stone-700">
                Khu Vực Giao Hàng
              </label>
              <button
                type="button"
                onClick={() => onOpenLocationModal()}
                className="text-[10px] text-purple-700 hover:text-purple-900 font-bold flex items-center gap-0.5 cursor-pointer underline"
              >
                <MapPin className="w-3 h-3" />
                Định vị GPS
              </button>
            </div>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:outline-hidden focus:border-purple-500"
            >
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Bình Dương">Bình Dương</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Vũng Tàu">Vũng Tàu</option>
              <option value="Nha Trang">Nha Trang</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Số Người Ăn
            </label>
            <select
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:outline-hidden focus:border-purple-500"
            >
              <option value={1}>1 người (Ăn mảnh)</option>
              <option value={2}>2 người (Hẹn hò)</option>
              <option value={4}>3 - 5 người (Nhóm nhỏ)</option>
              <option value={8}>6+ người (Liên hoan)</option>
            </select>
          </div>

          <div className="md:col-span-5">
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Ghi Chú Hoặc Cơn Thèm Riêng (Tùy chọn)
            </label>
            <input
              type="text"
              placeholder="VD: Không hành, thèm bún, thích sốt phô mai..."
              value={cravings}
              onChange={(e) => setCravings(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              onClick={() => handleGenerate()}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang nghĩ...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Gợi Ý AI
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Status / Fallback Notice banner */}
      {errorMsg && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => handleGenerate()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs shrink-0 cursor-pointer shadow-2xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm mới</span>
          </button>
        </div>
      )}

      {/* AI Advice Pill */}
      {aiAdvice && (
        <div className="mb-6 p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 text-sm flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <ChefHat className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-purple-950 text-xs uppercase tracking-wider mb-0.5">
              Lời khuyên từ Bếp Trưởng AI
            </div>
            <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">{aiAdvice}</p>
          </div>
        </div>
      )}

      {/* Generated Suggestions Cards */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Top Món Ngon AI Đề Xuất Dành Riêng Cho Bạn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestions.map((item, index) => {
            const dishImage = resolveDishImage(item);
            return (
            <div
              key={index}
              className="bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Dish Illustration Image */}
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-stone-100">
                <img
                  src={dishImage}
                  alt={`${item.name} - Gợi ý món ngon chuẩn vị`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/mam_com_gia_dinh.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-purple-900 shadow-xs backdrop-blur-xs border border-purple-200/50">
                    Lựa chọn #{index + 1} • {item.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white shadow-xs backdrop-blur-xs">
                    {item.calories}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-extrabold text-stone-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs font-medium text-orange-600 mb-3 italic">
                  "{item.tagline}"
                </p>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 flex-1">
                  {item.reason}
                </p>

                <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl mb-4 border border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Khoảng giá:</span>
                    <span className="font-bold text-stone-900">{item.estimatedPrice}</span>
                  </div>
                  {item.pairWith && (
                    <div className="flex items-center justify-between">
                      <span className="text-stone-500">Khuyên gọi cùng:</span>
                      <span className="font-medium text-stone-800">{item.pairWith}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {item.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 text-stone-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Affiliate / Food App Action Bar */}
              <div className="p-4 bg-stone-50/80 border-t border-stone-100">
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 mb-2">
                  <span className="flex items-center gap-1 text-orange-950 font-black">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span>Chuyển qua app tìm món:</span>
                  </span>
                  {onSelectDish && (
                    <button
                      onClick={() => {
                        const dishObj: Dish = {
                          id: `ai-${index}-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
                          name: item.name,
                          vietnameseName: item.name,
                          category: 'mon_khac',
                          mealTime: ['trua', 'toi'],
                          priceRange: item.estimatedPrice || '40.000đ - 65.000đ',
                          estimatedPrice: 50000,
                          calories: item.calories || '500 kcal',
                          description: item.reason || item.tagline,
                          image: dishImage,
                          popularTags: item.tags || ['AI Gợi ý'],
                          searchKeyword: item.searchKeyword || item.name,
                          bestPairedWith: item.pairWith,
                        };
                        onSelectDish(dishObj);
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors bg-stone-200/80 hover:bg-orange-100 text-stone-700 hover:text-orange-700"
                    >
                      Xem chi tiết
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink(
                        'shopeefood',
                        { name: item.searchKeyword || item.name },
                        affiliateConfig,
                        userLocation
                      )
                    }
                    title={`Chuyển qua ShopeeFood tìm ${item.name} (${userLocation.city})`}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white transition-all active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span className="text-[11px] font-black">ShopeeFood</span>
                    <span className="text-[9px] opacity-85">Tìm quán gần</span>
                  </button>

                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink(
                        'grabfood',
                        { name: item.searchKeyword || item.name },
                        affiliateConfig,
                        userLocation
                      )
                    }
                    title={`Chuyển qua GrabFood định vị quán ${item.name} gần bạn`}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#00B14F] hover:bg-[#009643] text-white transition-all active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span className="text-[11px] font-black">GrabFood</span>
                    <span className="text-[9px] opacity-85">Tìm quán gần</span>
                  </button>

                  <button
                    onClick={() =>
                      trackAndOpenAffiliateLink(
                        'befood',
                        { name: item.searchKeyword || item.name },
                        affiliateConfig,
                        userLocation
                      )
                    }
                    title={`Chuyển qua BeFood tìm ${item.name} (${userLocation.city})`}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 transition-all active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span className="text-[11px] font-black">BeFood</span>
                    <span className="text-[9px] font-bold">Tìm quán gần</span>
                  </button>
                </div>
              </div>
            </div>
            );
          })}
          </div>
        </div>
      )}

      {/* Initial state placeholder */}
      {suggestions.length === 0 && !loading && (
        <div className="text-center py-12 bg-stone-50/60 rounded-3xl border border-dashed border-stone-300">
          <ChefHat className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-800 mb-1">
            Chưa có gợi ý nào được tạo
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-4">
            Hãy chọn bữa ăn và tiêu chí ở trên, sau đó bấm nút "Gợi Ý AI" để trí tuệ nhân tạo Gemini tìm món phù hợp nhất cho bạn.
          </p>
          <button
            onClick={() => handleGenerate()}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Tạo gợi ý mẫu ngay
          </button>
        </div>
      )}
    </div>
  );
};
