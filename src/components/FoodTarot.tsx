import React, { useState } from 'react';
import { Compass, Sparkles, RefreshCw, ShoppingBag, ExternalLink, HelpCircle } from 'lucide-react';
import { FOOD_TAROT_CARDS, INITIAL_DISHES } from '../data/dishes';
import { AffiliateConfig } from '../types';
import { trackAndOpenAffiliateLink } from '../utils/affiliate';
import confetti from 'canvas-confetti';

interface FoodTarotProps {
  affiliateConfig: AffiliateConfig;
}

export const FoodTarot: React.FC<FoodTarotProps> = ({ affiliateConfig }) => {
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const [drawnCard, setDrawnCard] = useState<typeof FOOD_TAROT_CARDS[0] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDrawCard = (card: typeof FOOD_TAROT_CARDS[0]) => {
    if (isDrawing) return;
    setIsDrawing(true);
    setRevealedCardId(card.id);
    setDrawnCard(card);

    setTimeout(() => {
      setIsDrawing(false);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 600);
  };

  const handleReset = () => {
    setRevealedCardId(null);
    setDrawnCard(null);
  };

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-3">
          <Compass className="w-3.5 h-3.5 text-indigo-600" />
          TAROT ẨM THỰC VIỆT NAM
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mb-2">
          Hôm nay <span className="text-indigo-600">Vũ Trụ</span> bảo bạn ăn gì?
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Chọn 1 lá bài thần kỳ để lắng nghe thông điệp vị giác và định mệnh bữa ăn của bạn hôm nay!
        </p>
      </div>

      {/* Cards Deck */}
      {!drawnCard ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {FOOD_TAROT_CARDS.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleDrawCard(card)}
              className="group relative aspect-[2/3] rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-4 flex flex-col items-center justify-between border-2 border-indigo-400/40 hover:border-amber-400 hover:shadow-xl hover:scale-105 transition-all cursor-pointer overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                Lá bài #{index + 1}
              </div>

              <div className="w-12 h-12 rounded-full border border-indigo-300/40 flex items-center justify-center text-amber-300 group-hover:rotate-45 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="text-xs font-bold text-amber-300/90 group-hover:text-amber-200">
                Chạm để rút
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Revealed Tarot Card */
        <div className="max-w-xl mx-auto bg-white rounded-3xl border-2 border-indigo-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-fade-in text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            THÔNG ĐIỆP ĐÃ MỞ
          </div>

          <h2 className="text-2xl font-black text-stone-900 mb-3">
            {drawnCard.title}
          </h2>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 italic text-sm sm:text-base leading-relaxed mb-6">
            {drawnCard.quote}
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-[10px] uppercase font-bold text-stone-500">Món Vũ Trụ Chọn</div>
              <div className="text-base font-extrabold text-stone-900">{drawnCard.recommendedDish}</div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="text-[10px] uppercase font-bold text-amber-700">Con Số May Mắn</div>
              <div className="text-base font-extrabold text-amber-900">#{drawnCard.luckyNumber}</div>
            </div>
          </div>

          {/* Quick Affiliate Order */}
          <div className="pt-4 border-t border-stone-200 mb-4">
            <div className="text-xs font-bold text-stone-700 mb-3">
              Chốt đơn theo quẻ bài để nhận may mắn & giảm giá:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('shopeefood', { name: drawnCard.recommendedDish }, affiliateConfig)
                }
                className="py-2.5 px-3 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                ShopeeFood
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('grabfood', { name: drawnCard.recommendedDish }, affiliateConfig)
                }
                className="py-2.5 px-3 rounded-xl bg-[#00B14F] hover:bg-[#009643] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                GrabFood
              </button>

              <button
                onClick={() =>
                  trackAndOpenAffiliateLink('befood', { name: drawnCard.recommendedDish }, affiliateConfig)
                }
                className="py-2.5 px-3 rounded-xl bg-[#FFD100] hover:bg-[#ECC200] text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                BeFood
              </button>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors mt-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Rút quẻ bài khác
          </button>
        </div>
      )}
    </div>
  );
};
