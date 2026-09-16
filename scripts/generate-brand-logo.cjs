const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Background Radiant Culinary Gradient -->
    <linearGradient id="bgGrad" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#EA580C" />
      <stop offset="50%" stop-color="#F97316" />
      <stop offset="100%" stop-color="#FB923C" />
    </linearGradient>

    <!-- Top Rim Specular Shine -->
    <linearGradient id="rimShine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.0" />
    </linearGradient>

    <!-- Bowl Outer Porcelain 3D Gradient -->
    <linearGradient id="bowlPorcelain" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="65%" stop-color="#FFF7ED" />
      <stop offset="100%" stop-color="#FED7AA" />
    </linearGradient>

    <!-- Bowl Inner Broth / Food Golden Glow -->
    <linearGradient id="foodSoup" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>

    <!-- Gold Accent Ribbon -->
    <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#FDE68A" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>

    <!-- Fresh Herb Leaf Gradient -->
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>

    <!-- Chopsticks Wood / Gold Gradient -->
    <linearGradient id="chopstickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="40%" stop-color="#FEF3C7" />
      <stop offset="100%" stop-color="#FDE68A" />
    </linearGradient>

    <!-- Soft Drop Shadow on Inner Elements -->
    <filter id="bowlDropShadow" x="-15%" y="-10%" width="130%" height="135%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#7C2D12" flood-opacity="0.32" />
    </filter>

    <filter id="steamGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#9A3412" flood-opacity="0.2" />
    </filter>
  </defs>

  <!-- 1. App Icon Rounded Squircle Container -->
  <rect x="32" y="32" width="448" height="448" rx="108" fill="url(#bgGrad)" />

  <!-- Beveled inner highlight on top border -->
  <rect x="34" y="34" width="444" height="444" rx="106" fill="none" stroke="url(#rimShine)" stroke-width="4" />

  <!-- Subtle Ambient Glow in Center -->
  <circle cx="256" cy="256" r="160" fill="#FFEDD5" opacity="0.15" />

  <!-- 2. Steam Question Mark (?) Rising from Food -->
  <g filter="url(#steamGlow)">
    <!-- Main Steam Swirl forming Question Mark Hook (?) -->
    <!-- Starts above bowl, sweeps smoothly clockwise into question mark hook -->
    <path
      d="
        M 226 238
        C 214 200, 204 168, 230 136
        C 252 108, 296 104, 326 126
        C 356 148, 362 188, 342 216
        C 324 242, 296 256, 276 274
        C 264 285, 258 296, 256 312
      "
      fill="none"
      stroke="#FFFFFF"
      stroke-width="26"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Question Mark Dot (Appetizing Golden Pearl / Food Dot) -->
    <circle cx="256" cy="348" r="13" fill="#FFFBEB" />
    <circle cx="256" cy="348" r="9" fill="url(#goldAccent)" />

    <!-- Secondary Steam Wisp (Left side, creates lively aroma) -->
    <path
      d="
        M 172 268
        C 162 236, 174 208, 166 182
        C 160 162, 144 148, 148 132
      "
      fill="none"
      stroke="#FFFFFF"
      stroke-width="12"
      stroke-linecap="round"
      opacity="0.75"
    />
  </g>

  <!-- 3. Chopsticks (Angled gracefully across bowl top-right) -->
  <g filter="url(#steamGlow)">
    <!-- Chopstick 1 -->
    <path
      d="M 176 298 L 388 152"
      stroke="url(#chopstickGrad)"
      stroke-width="11"
      stroke-linecap="round"
    />
    <!-- Chopstick 2 -->
    <path
      d="M 194 316 L 406 170"
      stroke="url(#chopstickGrad)"
      stroke-width="9"
      stroke-linecap="round"
    />
  </g>

  <!-- 4. Ceramic Dining Bowl with 3D Depth -->
  <g filter="url(#bowlDropShadow)">
    <!-- Inner Food Surface (Warm savory broth inside bowl rim) -->
    <ellipse cx="256" cy="348" rx="120" ry="24" fill="url(#foodSoup)" />

    <!-- Bowl Outer Body (Solid porcelain geometry, perfectly continuous) -->
    <path
      d="
        M 132 348
        C 132 404, 184 446, 256 446
        C 328 446, 380 404, 380 348
        Z
      "
      fill="url(#bowlPorcelain)"
    />

    <!-- Bowl Rim Ring (Smooth rounded rim) -->
    <ellipse cx="256" cy="346" rx="124" ry="18" fill="none" stroke="#FFFFFF" stroke-width="8" />

    <!-- Bowl Pedestal Foot Ring -->
    <path
      d="
        M 216 444
        L 212 458
        C 212 462, 230 464, 256 464
        C 282 464, 300 462, 300 458
        L 296 444
        Z
      "
      fill="#FDBA74"
    />
    <ellipse cx="256" cy="458" rx="44" ry="6" fill="#FFF7ED" />

    <!-- Decorative Golden Band along bowl contour -->
    <path
      d="
        M 152 380
        C 174 416, 214 430, 256 430
        C 298 430, 338 416, 360 380
      "
      fill="none"
      stroke="url(#goldAccent)"
      stroke-width="7"
      stroke-linecap="round"
    />

    <!-- Fresh Herb Garnish (Two delicate mint leaves on rim) -->
    <g transform="translate(142, 332)">
      <!-- Leaf 1 -->
      <path
        d="M 0 10 C -12 2, -18 -12, -4 -18 C 10 -22, 14 -4, 0 10 Z"
        fill="url(#leafGrad)"
      />
      <!-- Leaf 2 -->
      <path
        d="M 6 12 C 18 6, 24 -6, 14 -16 C 4 -22, -2 -6, 6 12 Z"
        fill="url(#leafGrad)"
        opacity="0.9"
      />
      <!-- Leaf vein -->
      <path d="M 0 10 L -4 -12" stroke="#A7F3D0" stroke-width="2" stroke-linecap="round" />
    </g>
  </g>

  <!-- Specular glint on bowl rim -->
  <path
    d="M 180 348 C 210 354, 260 354, 290 350"
    fill="none"
    stroke="#FFFFFF"
    stroke-width="3.5"
    stroke-linecap="round"
    opacity="0.8"
  />
</svg>`;

const publicDir = path.resolve(__dirname, '..', 'public');

// Render files
function renderIcon(size) {
  const resvg = new Resvg(logoSvg, {
    fitTo: { mode: 'width', value: size }
  });
  return resvg.render().asPng();
}

fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(publicDir, 'icon.svg'), logoSvg);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), logoSvg);

console.log('Saved SVG files.');

// Render PNGs
const sizes = [
  { name: 'logo.png', size: 512 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'pwa-maskable-512x512.png', size: 512 },
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-144x144.png', size: 144 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'favicon-64x64.png', size: 64 },
  { name: 'favicon-48x48.png', size: 48 }
];

for (const item of sizes) {
  const pngBuf = renderIcon(item.size);
  fs.writeFileSync(path.join(publicDir, item.name), pngBuf);
  console.log(`Rendered ${item.name} (${item.size}x${item.size}) - ${pngBuf.length} bytes`);
}
