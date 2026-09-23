import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Sparkles,
  Disc,
  Search,
  ArrowRight,
  Flame,
  ChefHat,
} from 'lucide-react';
import { TabType } from '../utils/navigation';
import { Dish } from '../types';
import { INITIAL_DISHES } from '../data/dishes';

interface NotFoundPageProps {
  onNavigate: (tab: TabType) => void;
  onSelectDish?: (dish: Dish) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onSelectDish }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Top trending dishes to suggest when a user hits a 404
  const featuredDishes: Dish[] = [
    INITIAL_DISHES.find((d) => d.id === 'pho-bo-tai-lan') || INITIAL_DISHES[0],
    INITIAL_DISHES.find((d) => d.id === 'com-tam-suon-bi-cha') || INITIAL_DISHES[1],
    INITIAL_DISHES.find((d) => d.id === 'bun-bo-hue') || INITIAL_DISHES[2],
    INITIAL_DISHES.find((d) => d.id === 'xoi-xeo-ha-noi') || INITIAL_DISHES[3],
    INITIAL_DISHES.find((d) => d.id === 'nem-nuong-nha-trang') || INITIAL_DISHES[4],
    INITIAL_DISHES.find((d) => d.id === 'com-ga-xoi-mo') || INITIAL_DISHES[5],
  ].filter(Boolean) as Dish[];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      onNavigate('catalog');
      return;
    }
    const cleanQuery = encodeURIComponent(searchQuery.trim());
    window.history.pushState(null, '', `/mon-ngon?q=${cleanQuery}`);
    onNavigate('catalog');
  };

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '404 - Không Tìm Thấy Trang | Hôm Nay Ăn Gì',
    description: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã được dọn sang địa chỉ mới.',
    url: typeof window !== 'undefined' ? window.location.href : 'https://www.angigio.com/404',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Trang chủ',
          item: 'https://www.angigio.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '404 Không Tìm Thấy Trang',
          item: 'https://www.angigio.com/404',
        },
      ],
    },
  };

  return (
    <div className="min-h-[85vh] bg-[#0a0512] text-white pt-6 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[540px] sm:h-[540px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Visual 404 Culinary Graphic */}
        <div className="inline-flex items-center justify-center relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-rose-500/20 border border-amber-500/30 flex items-center justify-center shadow-2xl shadow-amber-500/10 relative group">
            <UtensilsCrossed className="w-12 h-12 text-amber-400 animate-pulse" />
            <span className="absolute -top-2 -right-2 text-2xl select-none animate-bounce">
              🥢
            </span>
            <span className="absolute -bottom-2 -left-2 text-2xl select-none">
              🍲
            </span>
          </div>
        </div>

        {/* 404 Headline */}
        <div className="space-y-3">
          <div className="inline-block text-xs uppercase tracking-widest font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Mã Lỗi: 404 · Không Tìm Thấy Trang
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
            Ôi! Bàn Ăn Này{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Chưa Lên Món
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Đường dẫn bạn vừa truy cập không tồn tại hoặc đã được chuyển dọn sang mâm cỗ khác.
            Đừng để chiếc bụng đói phải chờ đợi lâu, hãy cùng khám phá các món ngon tuyệt vời bên dưới nhé!
          </p>
        </div>

        {/* Search Bar on 404 Page */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 max-w-lg mx-auto flex items-center gap-2 bg-slate-900/90 border border-white/10 rounded-2xl p-1.5 shadow-xl shadow-black/40 focus-within:border-amber-400/50 transition-colors"
        >
          <div className="pl-3.5 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bạn đang thèm món gì? (Phở, bún bò, cơm tấm...)"
            className="flex-1 bg-transparent border-0 text-white placeholder-slate-400 text-sm sm:text-base focus:ring-0 focus:outline-none px-2 py-2"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Tìm món</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Primary Action Hub (Anti-slop clean interactive cards) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {/* Card 1: Home / Tarot */}
          <button
            onClick={() => {
              window.history.pushState(null, '', '/');
              onNavigate('tarot');
            }}
            className="group p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-amber-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-amber-300 transition-colors">
                Bàn Tiệc Tarot
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Trải bài Tarot ẩm thực 12 cung hoàng đạo tìm món ăn định mệnh.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Trải bài ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Card 2: Wheel */}
          <button
            onClick={() => {
              window.history.pushState(null, '', '/vong-quay');
              onNavigate('wheel');
            }}
            className="group p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-orange-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Disc className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-orange-300 transition-colors">
                Vòng Quay Ăn Gì
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Không biết ăn gì? Bấm quay ngẫu nhiên chốt món thần tốc trong 3 giây.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-orange-400 group-hover:translate-x-1 transition-transform">
              <span>Quay món ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Card 3: Catalog */}
          <button
            onClick={() => {
              window.history.pushState(null, '', '/mon-ngon');
              onNavigate('catalog');
            }}
            className="group p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors">
                160+ Món Ngon 3 Miền
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Bách khoa toàn thư món ngon Việt Nam kèm calo, giá và gợi ý quán ngon.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Khám phá menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Card 4: Recipes */}
          <button
            onClick={() => {
              window.history.pushState(null, '', '/cach-nau-mon-ngon');
              onNavigate('discover');
            }}
            className="group p-5 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-rose-500/40 hover:bg-slate-900/90 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ChefHat className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white group-hover:text-rose-300 transition-colors">
                Bí Quyết Nấu Ăn
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Công thức chi tiết chuẩn vị quán từ phở bò tái lăn đến cơm tấm đặc biệt.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>Xem công thức</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Featured Dish Recommendations on 404 */}
        <div className="mt-14 pt-10 border-t border-white/10 text-left">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Gợi Ý Món Đang Được Yêu Thích Hôm Nay</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Các món đặc sắc vừa ra lò được nhiều người chọn nhất
              </p>
            </div>
            <button
              onClick={() => {
                window.history.pushState(null, '', '/mon-ngon');
                onNavigate('catalog');
              }}
              className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {featuredDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  if (onSelectDish) {
                    onSelectDish(dish);
                  } else {
                    onNavigate('catalog');
                  }
                }}
                className="group bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-slate-800">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 left-2 text-[11px] font-bold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {dish.price}
                  </span>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {dish.name}
                  </h4>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{dish.calories} kcal</span>
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <p>
            Bạn phát hiện đường dẫn này bị hỏng? Hãy gửi góp ý cho chúng mình qua trang{' '}
            <button
              onClick={() => {
                window.history.pushState(null, '', '/lien-he');
                onNavigate('contact');
              }}
              className="text-amber-400 hover:underline font-medium cursor-pointer"
            >
              Liên hệ & Báo lỗi
            </button>{' '}
            để ban quản trị sửa ngay nhé!
          </p>
        </div>
      </div>
    </div>
  );
};
