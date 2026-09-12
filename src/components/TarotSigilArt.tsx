import React from 'react';
import { TarotArchetype } from './FoodTarot';

interface TarotSigilArtProps {
  type: TarotArchetype['sigilType'];
  sizeClass?: string;
}

/**
 * 12 Bespoke Sacred Geometry & Occult Sigils for Food Tarot Cards.
 * Each card has an entirely distinct, esoteric, mystical visual emblem
 * reflecting its deep tarot archetype, astral sign, and cosmic energy.
 */
export const TarotSigilArt: React.FC<TarotSigilArtProps> = ({
  type,
  sizeClass = 'w-16 h-16 sm:w-20 sm:h-20',
}) => {
  switch (type) {
    // ==========================================
    // I. THE MAGICIAN (Pháp Sư Vị Giác - ☿ Mercury)
    // Alchemical wand, Infinity lemniscate, 4 elements
    // ==========================================
    case 'magician':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Rotating Alchemical Glyphs & Planetary Dial */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <circle cx="50" cy="50" r="39" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
              {/* 4 Alchemical Cardinal Element Markers */}
              {/* Fire (Triangle up) */}
              <polygon points="50,11 54,18 46,18" stroke="currentColor" strokeWidth="1" fill="rgba(6,182,212,0.25)" />
              {/* Air (Triangle up with bar) */}
              <polygon points="89,50 82,46 82,54" stroke="currentColor" strokeWidth="1" fill="rgba(6,182,212,0.25)" />
              {/* Water (Triangle down) */}
              <polygon points="50,89 46,82 54,82" stroke="currentColor" strokeWidth="1" fill="rgba(6,182,212,0.25)" />
              {/* Earth (Triangle down with bar) */}
              <polygon points="11,50 18,54 18,46" stroke="currentColor" strokeWidth="1" fill="rgba(6,182,212,0.25)" />
            </svg>
          </div>

          {/* Counter-rotating Arcane Magic Circle */}
          <div className="absolute inset-1 animate-tarot-spin-rev opacity-70">
            <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-300" fill="none">
              <polygon points="50,16 79,67 21,67" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
              <polygon points="50,84 21,33 79,33" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Center Emblem: Glowing Infinity Lemniscate & Caduceus Wand */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 p-[2px] shadow-[0_0_24px_rgba(6,182,212,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#041424] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]" fill="none">
                {/* Floating Infinity Lemniscate (∞) */}
                <path
                  d="M18 24 C12 24 9 29 13 33 C17 37 25 33 30 29 C35 33 43 37 47 33 C51 29 48 24 42 24 C36 24 33 27 30 29 C27 27 24 24 18 24 Z"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  fill="rgba(56,189,248,0.2)"
                />
                {/* Alchemical Wand with glowing star burst */}
                <line x1="30" y1="12" x2="30" y2="48" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="30" cy="12" r="3.5" fill="#fde047" />
                <path d="M22 30 Q30 24 38 30" stroke="#a5f3fc" strokeWidth="1.2" fill="none" />
                <path d="M22 36 Q30 42 38 36" stroke="#a5f3fc" strokeWidth="1.2" fill="none" />
                <circle cx="30" cy="30" r="2" fill="#ffffff" className="animate-ping" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // II. THE HIGH PRIESTESS (Nữ Đại Tế Mỹ Vị - ☽ Moon)
    // Triple Moon Goddess, Boaz & Jachin pillars, Third Eye
    // ==========================================
    case 'high_priestess':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Lunar Orbit Rings & Night Starlight */}
          <div className="absolute inset-0 animate-tarot-spin-rev">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
              {/* Moon Phase Pearls */}
              <circle cx="50" cy="5" r="2.5" fill="#bfdbfe" />
              <circle cx="95" cy="50" r="2.5" fill="#bfdbfe" />
              <circle cx="50" cy="95" r="2.5" fill="#bfdbfe" />
              <circle cx="5" cy="50" r="2.5" fill="#bfdbfe" />
              {/* Water wave ripple at bottom */}
              <path d="M20 78 Q35 73 50 78 T80 78" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>

          {/* Center Emblem: Triple Moon (Waxing, Full, Waning) + Temple Pillars + Third Eye */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 p-[2px] shadow-[0_0_24px_rgba(59,130,246,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#060c22] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-blue-200 drop-shadow-[0_0_8px_rgba(96,165,250,0.9)]" fill="none">
                {/* Temple Pillars Boaz (left) & Jachin (right) */}
                <line x1="12" y1="14" x2="12" y2="46" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <line x1="48" y1="14" x2="48" y2="46" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <rect x="9.5" y="12" width="5" height="2.5" fill="#93c5fd" opacity="0.8" />
                <rect x="45.5" y="12" width="5" height="2.5" fill="#93c5fd" opacity="0.8" />
                {/* Triple Moon Goddess */}
                {/* Waxing Crescent */}
                <path d="M22 18 A14 14 0 0 1 22 42 A11 11 0 0 0 22 18 Z" fill="#60a5fa" />
                {/* Full Moon Sphere */}
                <circle cx="30" cy="30" r="10" stroke="#bfdbfe" strokeWidth="1.5" fill="rgba(30,58,138,0.5)" />
                {/* Waning Crescent */}
                <path d="M38 18 A11 11 0 0 0 38 42 A14 14 0 0 1 38 18 Z" fill="#60a5fa" />
                {/* Sacred Third Eye of Intuition */}
                <path d="M24 30 Q30 24 36 30 Q30 36 24 30 Z" stroke="#e0e7ff" strokeWidth="1.2" fill="#1e1b4b" />
                <circle cx="30" cy="30" r="2.2" fill="#38bdf8" />
                <circle cx="30" cy="30" r="0.8" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // III. THE EMPRESS (Hoàng Hậu Phong Vị - ♀ Venus)
    // Sacred Flower of Life, Venus Symbol, Crown of 12 Stars, Wheat
    // ==========================================
    case 'empress':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Flower of Life Rotating Mandala */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              {/* Interlocking Petals of Creation */}
              {[...Array(6)].map((_, i) => (
                <circle
                  key={i}
                  cx={50 + 20 * Math.cos((i * Math.PI) / 3)}
                  cy={50 + 20 * Math.sin((i * Math.PI) / 3)}
                  r="20"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
              ))}
              {/* 12 Stars Crown on Perimeter */}
              {[...Array(12)].map((_, i) => (
                <circle
                  key={i}
                  cx={50 + 43 * Math.cos((i * Math.PI) / 6)}
                  cy={50 + 43 * Math.sin((i * Math.PI) / 6)}
                  r="1.5"
                  fill="#fde047"
                />
              ))}
            </svg>
          </div>

          {/* Center Emblem: Sacred Venus Talisman & Golden Wheat Sheaf */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-[2px] shadow-[0_0_24px_rgba(16,185,129,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#031c13] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-emerald-200 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]" fill="none">
                {/* Curving ears of golden wheat */}
                <path d="M14 42 Q20 28 26 18" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M46 42 Q40 28 34 18" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="21" cy="24" r="1.5" fill="#fde047" />
                <circle cx="39" cy="24" r="1.5" fill="#fde047" />
                <circle cx="24" cy="20" r="1.5" fill="#fde047" />
                <circle cx="36" cy="20" r="1.5" fill="#fde047" />
                {/* Venus Planetary Symbol (♀) */}
                <circle cx="30" cy="26" r="10.5" stroke="#34d399" strokeWidth="2" fill="rgba(6,95,70,0.4)" />
                <line x1="30" y1="36.5" x2="30" y2="49" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="23" y1="43" x2="37" y2="43" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" />
                {/* Blooming Emerald Heart Gem inside */}
                <circle cx="30" cy="26" r="4" fill="#6ee7b7" />
                <circle cx="30" cy="26" r="1.5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // IV. THE EMPEROR (Hoàng Đế Vương Quyền - ♈ Aries)
    // Aries Ram Horns, Imperial Crown, Sovereign Shield
    // ==========================================
    case 'emperor':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Octagram Fortress Border of Dominion */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-rose-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="22" y="22" width="56" height="56" stroke="currentColor" strokeWidth="1" />
              <rect
                x="22"
                y="22"
                width="56"
                height="56"
                stroke="currentColor"
                strokeWidth="1"
                transform="rotate(45 50 50)"
                opacity="0.6"
              />
              {/* 4 Corner Aries Fire Embers */}
              <circle cx="16" cy="16" r="2" fill="#fb7185" />
              <circle cx="84" cy="16" r="2" fill="#fb7185" />
              <circle cx="84" cy="84" r="2" fill="#fb7185" />
              <circle cx="16" cy="84" r="2" fill="#fb7185" />
            </svg>
          </div>

          {/* Center Emblem: Aries Ram Horns & Royal Crest */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 p-[2px] shadow-[0_0_24px_rgba(244,63,94,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#20050d] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-rose-200 drop-shadow-[0_0_8px_rgba(251,113,133,0.9)]" fill="none">
                {/* Imperial Battle Shield */}
                <path
                  d="M17 18 L43 18 L43 33 C43 43 30 50 30 50 C30 50 17 43 17 33 Z"
                  stroke="#fb7185"
                  strokeWidth="1.8"
                  fill="rgba(159,18,57,0.4)"
                />
                {/* Imperial Crown at top */}
                <path d="M22 18 L24 13 L30 16 L36 13 L38 18 Z" fill="#fde047" stroke="#fbbf24" strokeWidth="1" />
                {/* Aries Majestic Ram Horns */}
                <path
                  d="M27 24 C23 19 14 19 14 27 C14 34 22 36 26 31"
                  stroke="#fecdd3"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M33 24 C37 19 46 19 46 27 C46 34 38 36 34 31"
                  stroke="#fecdd3"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Imperial Scepter Cross at center */}
                <line x1="30" y1="24" x2="30" y2="44" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="25" y1="31" x2="35" y2="31" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="30" cy="31" r="2.5" fill="#f43f5e" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // VI. THE LOVERS (Đôi Uyên Ương Mỹ Vị - ♊ Gemini)
    // Vesica Piscis, Twin Flame Hearts, Angelic Wings, Ishtar Star
    // ==========================================
    case 'lovers':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Vesica Piscis Interlocking Rings */}
          <div className="absolute inset-0 animate-tarot-spin-rev">
            <svg viewBox="0 0 100 100" className="w-full h-full text-pink-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              {/* Interlocking Divine Portals */}
              <circle cx="38" cy="50" r="26" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="62" cy="50" r="26" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
            </svg>
          </div>

          {/* Center Emblem: Twin Flame Intertwined Hearts & Angel Wings */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-pink-600 via-rose-500 to-fuchsia-500 p-[2px] shadow-[0_0_24px_rgba(236,72,153,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#24051a] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-pink-200 drop-shadow-[0_0_8px_rgba(244,114,182,0.9)]" fill="none">
                {/* Angelic Protective Wings Arch */}
                <path d="M12 26 Q20 14 30 20 Q40 14 48 26" stroke="#fbcfe8" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M15 30 Q22 20 30 24 Q38 20 45 30" stroke="#fbcfe8" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
                {/* Intertwined Twin Hearts */}
                <path
                  d="M24 24 C19 19 13 25 18 33 L27 42 L29 39 C27 34 23 27 24 24 Z"
                  fill="rgba(244,63,94,0.6)"
                  stroke="#f43f5e"
                  strokeWidth="1.2"
                />
                <path
                  d="M36 24 C41 19 47 25 42 33 L33 42 L31 39 C33 34 37 27 36 24 Z"
                  fill="rgba(236,72,153,0.6)"
                  stroke="#ec4899"
                  strokeWidth="1.2"
                />
                {/* Sacred 8-Point Star of Ishtar Union */}
                <polygon
                  points="30,22 32,27 37,29 32,31 30,36 28,31 23,29 28,27"
                  fill="#fef08a"
                  className="animate-pulse"
                />
                <circle cx="30" cy="29" r="1.5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // VII. THE CHARIOT (Cỗ Xe Chiến Thắng - ♋ Cancer)
    // Winged Sun Disk, Twin Sphinxes, Celestial Spear, Blazing Wheels
    // ==========================================
    case 'chariot':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Rotating Blazing Solar War Wheel */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-orange-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              {/* 8 Blazing Wheel Spokes */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 45 * Math.cos((i * Math.PI) / 4)}
                  y2={50 + 45 * Math.sin((i * Math.PI) / 4)}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ))}
              {/* Flame turbine tips */}
              {[...Array(8)].map((_, i) => (
                <path
                  key={i}
                  d={`M${50 + 42 * Math.cos((i * Math.PI) / 4)} ${50 + 42 * Math.sin((i * Math.PI) / 4)} L${
                    50 + 47 * Math.cos(((i + 0.3) * Math.PI) / 4)
                  } ${50 + 47 * Math.sin(((i + 0.3) * Math.PI) / 4)}`}
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          {/* Center Emblem: Egyptian Winged Sun Disk & Triumphant Arrow */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 p-[2px] shadow-[0_0_24px_rgba(249,115,22,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#200e03] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-orange-200 drop-shadow-[0_0_8px_rgba(251,146,60,0.9)]" fill="none">
                {/* Horus Winged Sun Disk */}
                <path
                  d="M10 28 C18 20 25 24 30 27 C35 24 42 20 50 28 C42 26 35 29 30 31 C25 29 18 26 10 28 Z"
                  fill="#fbbf24"
                  stroke="#f59e0b"
                  strokeWidth="1"
                />
                {/* Sun Disk Core */}
                <circle cx="30" cy="28" r="6" fill="#ea580c" stroke="#fde047" strokeWidth="1.5" />
                {/* Soaring Celestial Spear Arrow */}
                <line x1="30" y1="12" x2="30" y2="48" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
                <polygon points="30,9 26,16 34,16" fill="#fde047" />
                {/* Twin Sphinx Stars (Light & Dark polarity) */}
                <circle cx="18" cy="40" r="3" fill="#fed7aa" stroke="#f97316" strokeWidth="1" />
                <circle cx="42" cy="40" r="3" fill="#431407" stroke="#fed7aa" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // VIII. STRENGTH (Sức Mạnh Bất Phàm - ♌ Leo)
    // Golden Lion, Floating Lemniscate (∞), Celestial Rose Garland
    // ==========================================
    case 'strength':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Solar Lion Radial Aura */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              {/* 12 Solar Petals */}
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d={`M50 50 Q${50 + 35 * Math.cos(((i + 0.5) * Math.PI) / 6)} ${
                    50 + 35 * Math.sin(((i + 0.5) * Math.PI) / 6)
                  } ${50 + 44 * Math.cos((i * Math.PI) / 6)} ${50 + 44 * Math.sin((i * Math.PI) / 6)}`}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.6"
                />
              ))}
            </svg>
          </div>

          {/* Center Emblem: Golden Lion Crest & Crowning Infinity */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-yellow-600 via-amber-500 to-amber-300 p-[2px] shadow-[0_0_24px_rgba(234,179,8,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#1c1202] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-yellow-200 drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]" fill="none">
                {/* Floating Divine Infinity Lemniscate above Lion */}
                <path
                  d="M22 17 C18 17 16 20 18 22 C20 24 25 22 28 20 C31 22 36 24 38 22 C40 20 38 17 34 17 C30 17 28 19 28 20 C28 19 26 17 22 17 Z"
                  stroke="#fde047"
                  strokeWidth="1.8"
                  fill="rgba(253,224,71,0.3)"
                />
                {/* Stylized Majestic Lion Face */}
                {/* Lion Mane */}
                <path
                  d="M16 28 C13 36 16 45 23 48 C27 50 33 50 37 48 C44 45 47 36 44 28 C47 24 43 21 38 24 C34 22 26 22 22 24 C17 21 13 24 16 28 Z"
                  stroke="#eab308"
                  strokeWidth="1.8"
                  fill="rgba(161,98,7,0.35)"
                />
                {/* Lion Muzzle & Nose */}
                <polygon points="30,34 27,39 33,39" fill="#fde047" />
                <path d="M27 39 Q30 43 33 39" stroke="#fde047" strokeWidth="1.4" fill="none" />
                {/* Piercing Noble Eyes */}
                <circle cx="25" cy="31" r="1.5" fill="#fde047" />
                <circle cx="35" cy="31" r="1.5" fill="#fde047" />
                {/* Whiskers */}
                <line x1="21" y1="36" x2="16" y2="35" stroke="#fde047" strokeWidth="1" />
                <line x1="21" y1="38" x2="16" y2="39" stroke="#fde047" strokeWidth="1" />
                <line x1="39" y1="36" x2="44" y2="35" stroke="#fde047" strokeWidth="1" />
                <line x1="39" y1="38" x2="44" y2="39" stroke="#fde047" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // IX. THE HERMIT (Ẩn Sĩ Vị Giác - ♍ Virgo)
    // Lantern of Diogenes, 6-Point Star of Truth, Pilgrim Staff
    // ==========================================
    case 'hermit':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Deep Space Cosmic Concentric Rings */}
          <div className="absolute inset-0 animate-tarot-spin-rev">
            <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
              {/* Constellation Guide Dots */}
              {[...Array(6)].map((_, i) => (
                <circle
                  key={i}
                  cx={50 + 42 * Math.cos((i * Math.PI) / 3)}
                  cy={50 + 42 * Math.sin((i * Math.PI) / 3)}
                  r="2"
                  fill="#c7d2fe"
                />
              ))}
            </svg>
          </div>

          {/* Center Emblem: Hexagonal Star Lantern & Pilgrim Staff */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-indigo-600 via-violet-500 to-amber-300 p-[2px] shadow-[0_0_24px_rgba(99,102,241,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#070924] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-indigo-200 drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]" fill="none">
                {/* Pilgrim's Wooden Staff of Wisdom (left) */}
                <path d="M16 48 L16 16 C16 12 12 14 12 14" stroke="#c7d2fe" strokeWidth="1.8" strokeLinecap="round" />
                {/* Ancient Hexagonal Lantern */}
                {/* Hanging ring */}
                <circle cx="34" cy="13" r="3" stroke="#fde047" strokeWidth="1.2" />
                {/* Lantern Roof */}
                <polygon points="34,16 23,22 45,22" fill="#4338ca" stroke="#fde047" strokeWidth="1.2" />
                {/* Glass Chamber */}
                <rect x="25" y="22" width="18" height="19" rx="2" stroke="#fde047" strokeWidth="1.4" fill="rgba(67,56,202,0.4)" />
                {/* Lantern Base */}
                <rect x="23" y="41" width="22" height="3" rx="1" fill="#fde047" />
                {/* Incandescent 6-Point Star of Truth inside */}
                <polygon points="34,25 39,34 29,34" fill="#fef08a" opacity="0.9" />
                <polygon points="34,37 29,28 39,28" fill="#fef08a" opacity="0.9" />
                {/* Radiating Beacon Rays */}
                <line x1="34" y1="21" x2="34" y2="18" stroke="#ffffff" strokeWidth="1.2" />
                <line x1="44" y1="31" x2="48" y2="31" stroke="#ffffff" strokeWidth="1.2" />
                <line x1="24" y1="31" x2="20" y2="31" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="34" cy="31" r="2" fill="#ffffff" className="animate-ping" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // X. WHEEL OF FORTUNE (Vòng Định Mệnh - ♃ Jupiter)
    // Ouroboros Serpent, 8-Spoke Samsara Wheel, Alchemical Seals
    // ==========================================
    case 'wheel':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Ouroboros & Astrolabe Perpetual Rotation */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-purple-400/80" fill="none">
              {/* Ouroboros Serpent Body */}
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="50" cy="50" r="37" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              {/* 8 Cardinal Wheel Spokes */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 46 * Math.cos((i * Math.PI) / 4)}
                  y2={50 + 46 * Math.sin((i * Math.PI) / 4)}
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              ))}
              {/* Alchemical elemental dots on perimeter */}
              {[...Array(8)].map((_, i) => (
                <circle
                  key={i}
                  cx={50 + 41 * Math.cos(((i + 0.5) * Math.PI) / 4)}
                  cy={50 + 41 * Math.sin(((i + 0.5) * Math.PI) / 4)}
                  r="1.8"
                  fill="#e879f9"
                />
              ))}
            </svg>
          </div>

          {/* Center Emblem: Celestial Astrolabe Core & Spinning Compass */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-500 p-[2px] shadow-[0_0_24px_rgba(168,85,247,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#1b0730] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-purple-200 drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]" fill="none">
                {/* Center Hub */}
                <circle cx="30" cy="30" r="14" stroke="#c084fc" strokeWidth="1.5" fill="rgba(88,28,135,0.4)" />
                <circle cx="30" cy="30" r="8" stroke="#f0abfc" strokeWidth="1" strokeDasharray="2 2" />
                {/* 4 Mystic Letters T-A-R-O at cardinal axes */}
                <circle cx="30" cy="20" r="1.8" fill="#fde047" />
                <circle cx="40" cy="30" r="1.8" fill="#fde047" />
                <circle cx="30" cy="40" r="1.8" fill="#fde047" />
                <circle cx="20" cy="30" r="1.8" fill="#fde047" />
                {/* Golden Celestial Astrolabe Needle */}
                <polygon points="30,16 33,30 30,33 27,30" fill="#fde047" />
                <polygon points="30,44 33,30 30,27 27,30" fill="#a855f7" />
                <circle cx="30" cy="30" r="3" fill="#ffffff" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // XVII. THE STAR (Ngôi Sao Hy Vọng - ♒ Aquarius)
    // 8-Point Star of Sirius, 7 Satellite Stars, Pouring Water Urns
    // ==========================================
    case 'star':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Crystalline Merkaba Light Field */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-teal-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              {/* Merkaba Star Triangles */}
              <polygon points="50,12 83,68 17,68" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              <polygon points="50,88 17,32 83,32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              {/* 7 Orbiting Pleiades Satellite Stars */}
              {[...Array(7)].map((_, i) => (
                <circle
                  key={i}
                  cx={50 + 40 * Math.cos((i * 2 * Math.PI) / 7)}
                  cy={50 + 40 * Math.sin((i * 2 * Math.PI) / 7)}
                  r="2"
                  fill="#99f6e4"
                />
              ))}
            </svg>
          </div>

          {/* Center Emblem: Radiant 8-Pointed Star of Sirius & Cosmic Water Pitchers */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-teal-600 via-cyan-500 to-emerald-400 p-[2px] shadow-[0_0_24px_rgba(20,184,166,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#031c19] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-teal-200 drop-shadow-[0_0_8px_rgba(45,212,191,0.9)]" fill="none">
                {/* Two Sacred Water Urns Pouring Life */}
                {/* Left Urn */}
                <path d="M16 38 C14 34 16 30 18 30 C20 30 21 33 21 38 Z" stroke="#a7f3d0" strokeWidth="1.2" fill="rgba(167,243,208,0.3)" />
                <path d="M18 38 Q18 45 22 47" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
                {/* Right Urn */}
                <path d="M44 38 C46 34 44 30 42 30 C40 30 39 33 39 38 Z" stroke="#a7f3d0" strokeWidth="1.2" fill="rgba(167,243,208,0.3)" />
                <path d="M42 38 Q42 45 38 47" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
                {/* Brilliant 8-Point Star of Sirius (Stella Maris) */}
                <polygon
                  points="30,11 32.5,23 44,21 35,27 41,37 31,33 27,44 26,33 16,36 23,27 15,20 27,23"
                  fill="#5eead4"
                  stroke="#ccfbf1"
                  strokeWidth="1"
                />
                <circle cx="30" cy="27" r="3.5" fill="#ffffff" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // XIX. THE SUN (Thái Dương Quang - ☉ Sun)
    // Helios 16-Ray Sun Face, Sunflower Corona, Solar Coronas
    // ==========================================
    case 'sun':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* Rotating 16-Ray Solar Corona (straight + wavy) */}
          <div className="absolute inset-0 animate-tarot-spin">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              {/* 16 Solar Rays */}
              {[...Array(16)].map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 45 * Math.cos((i * Math.PI) / 8)}
                  y2={50 + 45 * Math.sin((i * Math.PI) / 8)}
                  stroke="currentColor"
                  strokeWidth={i % 2 === 0 ? '1.8' : '1'}
                  opacity={i % 2 === 0 ? '0.9' : '0.5'}
                />
              ))}
            </svg>
          </div>

          {/* Center Emblem: Divine Helios Solar Face & Golden Coronal Rings */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-[2px] shadow-[0_0_24px_rgba(245,158,11,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#1c0c02] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-amber-200 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" fill="none">
                {/* Outer Sun Flower Petals */}
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    cx={30 + 12 * Math.cos((i * Math.PI) / 4)}
                    cy={30 + 12 * Math.sin((i * Math.PI) / 4)}
                    r="4"
                    fill="rgba(245,158,11,0.35)"
                    stroke="#fde047"
                    strokeWidth="0.8"
                  />
                ))}
                {/* Sun Face Circle */}
                <circle cx="30" cy="30" r="11" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.5" />
                {/* Noble Closed Celestial Eyelids */}
                <path d="M24 28 Q26 31 28 28" stroke="#451a03" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M32 28 Q34 31 36 28" stroke="#451a03" strokeWidth="1.4" strokeLinecap="round" />
                {/* Peaceful Smile */}
                <path d="M27 34 Q30 37 33 34" stroke="#451a03" strokeWidth="1.4" strokeLinecap="round" />
                {/* Solar Third Eye Mark (☉) */}
                <circle cx="30" cy="24" r="1.5" fill="#fef08a" />
                <circle cx="30" cy="24" r="0.5" fill="#b45309" />
              </svg>
            </div>
          </div>
        </div>
      );

    // ==========================================
    // XXI. THE WORLD (Vũ Trụ Toàn Năng - ♄ Saturn)
    // Laurel Wreath of Eternity, 4 Tetramorph Cherubim, Cosmic Armillary
    // ==========================================
    case 'world':
      return (
        <div className={`relative ${sizeClass} flex items-center justify-center select-none`}>
          {/* 4 Tetramorph Cherubim & Armillary Sphere */}
          <div className="absolute inset-0 animate-tarot-spin-rev">
            <svg viewBox="0 0 100 100" className="w-full h-full text-fuchsia-400/80" fill="none">
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              {/* 4 Sacred Tetramorph Corner Emblems (Man, Eagle, Lion, Bull) */}
              <circle cx="16" cy="16" r="3" fill="#f472b6" stroke="currentColor" strokeWidth="1" />
              <circle cx="84" cy="16" r="3" fill="#f472b6" stroke="currentColor" strokeWidth="1" />
              <circle cx="84" cy="84" r="3" fill="#f472b6" stroke="currentColor" strokeWidth="1" />
              <circle cx="16" cy="84" r="3" fill="#f472b6" stroke="currentColor" strokeWidth="1" />
              {/* Elliptical Universe Orbit */}
              <ellipse cx="50" cy="50" rx="42" ry="24" stroke="currentColor" strokeWidth="0.8" opacity="0.5" transform="rotate(30 50 50)" />
              <ellipse cx="50" cy="50" rx="42" ry="24" stroke="currentColor" strokeWidth="0.8" opacity="0.5" transform="rotate(-30 50 50)" />
            </svg>
          </div>

          {/* Center Emblem: Oval Laurel Wreath of Victory & Cosmic Wands */}
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-fuchsia-600 via-purple-500 to-pink-400 p-[2px] shadow-[0_0_24px_rgba(217,70,239,0.85)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#1c0420] flex items-center justify-center overflow-hidden relative">
              <svg viewBox="0 0 60 60" className="w-8 h-8 text-fuchsia-200 drop-shadow-[0_0_8px_rgba(232,121,249,0.9)]" fill="none">
                {/* Oval Laurel Wreath of Eternity (Vesica) */}
                <ellipse cx="30" cy="30" rx="14" ry="19" stroke="#e879f9" strokeWidth="1.8" fill="rgba(112,26,117,0.3)" />
                {/* Top and bottom infinity ribbon knots */}
                <path d="M26 12 Q30 15 34 12" stroke="#fde047" strokeWidth="1.5" />
                <path d="M26 48 Q30 45 34 48" stroke="#fde047" strokeWidth="1.5" />
                {/* Cosmic Wands of the Cosmic Dancer (crossed wands) */}
                <line x1="22" y1="20" x2="38" y2="40" stroke="#fbcfe8" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="38" y1="20" x2="22" y2="40" stroke="#fbcfe8" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="22" cy="20" r="2" fill="#fde047" />
                <circle cx="38" cy="20" r="2" fill="#fde047" />
                <circle cx="22" cy="40" r="2" fill="#fde047" />
                <circle cx="38" cy="40" r="2" fill="#fde047" />
                {/* Central Singularity Star */}
                <circle cx="30" cy="30" r="3.5" fill="#ffffff" className="animate-pulse" />
                <circle cx="30" cy="30" r="1.5" fill="#ec4899" />
              </svg>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
