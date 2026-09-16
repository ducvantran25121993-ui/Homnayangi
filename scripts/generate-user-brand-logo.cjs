const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// viewBox 0 0 600 660
// Center of main circular emblem: cx = 300, cy = 280
// Bottom dot: cx = 300, cy = 575, r = 26
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 660" width="100%" height="100%">
  <defs>
    <!-- Rich Golden Metallic Multi-Stop Linear Gradient at 45 degrees -->
    <linearGradient id="goldGradient" x1="15%" y1="10%" x2="85%" y2="90%">
      <stop offset="0%" stop-color="#C25900" />
      <stop offset="10%" stop-color="#DE7600" />
      <stop offset="22%" stop-color="#FFA825" />
      <stop offset="32%" stop-color="#FFDE82" />
      <stop offset="42%" stop-color="#FFAF28" />
      <stop offset="55%" stop-color="#E87100" />
      <stop offset="68%" stop-color="#FFA51E" />
      <stop offset="78%" stop-color="#FFDC75" />
      <stop offset="90%" stop-color="#E26D00" />
      <stop offset="100%" stop-color="#B24700" />
    </linearGradient>

    <!-- Metallic Radial Gradient for Inner Plate -->
    <radialGradient id="plateGradient" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFE08A" />
      <stop offset="20%" stop-color="#FFA922" />
      <stop offset="50%" stop-color="#E56E00" />
      <stop offset="80%" stop-color="#BD4F00" />
      <stop offset="100%" stop-color="#8F3400" />
    </radialGradient>

    <!-- Spherical 3D Gradient for Bottom Dot -->
    <radialGradient id="dotGradient" cx="35%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#FFF2B8" />
      <stop offset="28%" stop-color="#FFAF28" />
      <stop offset="65%" stop-color="#D95F00" />
      <stop offset="100%" stop-color="#822A00" />
    </radialGradient>

    <!-- Subtle Golden Texture Noise -->
    <filter id="goldTexture" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="
        1 0 0 0 0.8
        0 1 0 0 0.5
        0 0 1 0 0.1
        0 0 0 0.08 0" in="noise" result="coloredNoise" />
      <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="noiseOverlay" />
      <feBlend mode="overlay" in="noiseOverlay" in2="SourceGraphic" />
    </filter>

    <!-- Soft Depth Shadow -->
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#5E2200" flood-opacity="0.3" />
    </filter>

    <!-- Cutout White Bevel Filter for Spoon & Fork -->
    <filter id="bevelCutout" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" flood-color="#4A1800" flood-opacity="0.45" />
    </filter>
  </defs>

  <g id="brand-logo-emblem">
    <!-- 1. Outermost Ring with Bottom Opening and Inward Terminal Tips -->
    <!-- Center (300, 275), Radius ~248, Ring thickness = 14 -->
    <g filter="url(#subtleShadow)">
      <path
        d="
          M 252 516
          C 256 516, 260 514, 260 510
          C 260 488, 72 470, 56 275
          C 40 85, 175 28, 300 28
          C 425 28, 560 85, 544 275
          C 528 470, 340 488, 340 510
          C 340 514, 344 516, 348 516
        "
        fill="none"
        stroke="url(#goldGradient)"
        stroke-width="15"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- 2. Concentric Intermediate Spiral & Question Mark Hook Arc -->
    <!-- The outer concentric track that spirals inward to form the question mark head -->
    <g filter="url(#subtleShadow)">
      <!-- Outer Track Arc (Radius ~210) -->
      <path
        d="
          M 215 470
          C 120 435, 96 350, 96 275
          C 96 150, 185 72, 300 72
          C 415 72, 504 150, 504 275
          C 504 380, 425 450, 325 478
        "
        fill="none"
        stroke="url(#goldGradient)"
        stroke-width="18"
        stroke-linecap="round"
      />

      <!-- Question Mark Primary Swirl Body (Radius ~165 to center plate) -->
      <!-- Curves from bottom-right towards center plate, looping over top-left -->
      <path
        d="
          M 326 478
          C 380 440, 450 370, 448 275
          C 446 185, 385 125, 300 125
          C 215 125, 150 185, 152 275
          C 154 340, 195 400, 250 438
        "
        fill="none"
        stroke="url(#goldGradient)"
        stroke-width="26"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- 3. Central Dining Plate (Solid Gold Disc) -->
    <!-- Center (298, 275), Radius = 124 -->
    <g filter="url(#subtleShadow)">
      <circle cx="298" cy="275" r="124" fill="url(#plateGradient)" />
      <!-- Plate Rim Specular Highlight -->
      <circle cx="298" cy="275" r="122.5" fill="none" stroke="#FFEBA8" stroke-width="3" opacity="0.65" />
    </g>

    <!-- 4. Spoon and Fork Cutout Graphics on Plate -->
    <!-- Tilted at 45 degrees, transformed around (298, 275) -->
    <g transform="translate(298, 275) rotate(-45)">
      <!-- Left: Spoon (Muỗng) -->
      <g filter="url(#bevelCutout)">
        <!-- Spoon Scoop/Bowl -->
        <ellipse
          cx="-28"
          cy="-40"
          rx="24"
          ry="36"
          fill="url(#goldGradient)"
          stroke="#FFFFFF"
          stroke-width="5"
        />
        <!-- Inner Specular Ridge inside spoon scoop -->
        <ellipse
          cx="-28"
          cy="-40"
          rx="15"
          ry="24"
          fill="none"
          stroke="#FFEAA0"
          stroke-width="2.5"
          opacity="0.8"
        />

        <!-- Spoon Slender Neck & Handle (Extends down past plate rim) -->
        <path
          d="
            M -31 -5
            C -32 20, -34 60, -35 88
            C -36 102, -32 108, -26 108
            C -20 108, -18 102, -21 88
            C -24 60, -26 20, -25 -5
            Z
          "
          fill="url(#goldGradient)"
          stroke="#FFFFFF"
          stroke-width="5"
          stroke-linejoin="round"
        />
      </g>

      <!-- Right: Fork (Nĩa) -->
      <g filter="url(#bevelCutout)">
        <!-- Fork Handle (Extends down past plate rim parallel to spoon) -->
        <path
          d="
            M 24 5
            C 25 30, 27 65, 29 90
            C 30 102, 35 108, 41 108
            C 47 108, 48 102, 45 90
            C 42 65, 39 30, 36 5
            Z
          "
          fill="url(#goldGradient)"
          stroke="#FFFFFF"
          stroke-width="5"
          stroke-linejoin="round"
        />

        <!-- Fork Crown / Base of Tines -->
        <path
          d="
            M 14 6
            C 16 -12, 18 -26, 18 -34
            C 24 -36, 42 -36, 48 -34
            C 48 -26, 50 -12, 52 6
            C 44 14, 22 14, 14 6
            Z
          "
          fill="url(#goldGradient)"
          stroke="#FFFFFF"
          stroke-width="5"
          stroke-linejoin="round"
        />

        <!-- 4 Fork Tines (Prongs) with crisp white bevel and gold fill -->
        <!-- Tine 1 (Leftmost) -->
        <path d="M 18 -32 L 18 -76" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
        <path d="M 18 -32 L 18 -75" stroke="url(#goldGradient)" stroke-width="2.8" stroke-linecap="round" />

        <!-- Tine 2 (Center-Left) -->
        <path d="M 27 -34 L 27 -80" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
        <path d="M 27 -34 L 27 -79" stroke="url(#goldGradient)" stroke-width="2.8" stroke-linecap="round" />

        <!-- Tine 3 (Center-Right) -->
        <path d="M 36 -34 L 36 -80" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
        <path d="M 36 -34 L 36 -79" stroke="url(#goldGradient)" stroke-width="2.8" stroke-linecap="round" />

        <!-- Tine 4 (Rightmost) -->
        <path d="M 45 -32 L 45 -76" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
        <path d="M 45 -32 L 45 -75" stroke="url(#goldGradient)" stroke-width="2.8" stroke-linecap="round" />
      </g>
    </g>

    <!-- 5. Question Mark Bottom Dot -->
    <!-- Center (300, 575), Radius = 27 -->
    <g filter="url(#subtleShadow)">
      <circle cx="300" cy="575" r="28" fill="url(#dotGradient)" />
      <!-- Specular Highlight Ring on Dot -->
      <circle cx="300" cy="575" r="27" fill="none" stroke="#FFEBA8" stroke-width="2.5" opacity="0.8" />
    </g>
  </g>
</svg>`;

const publicDir = path.resolve(__dirname, '..', 'public');

function renderToPng(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size }
  });
  return resvg.render().asPng();
}

// Write SVG files
fs.writeFileSync(path.join(publicDir, 'logo.svg'), svg);
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svg);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg);
console.log('Saved SVG brand logo files.');

// Render PNGs for all touchpoints
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
  const pngBuf = renderToPng(item.size);
  fs.writeFileSync(path.join(publicDir, item.name), pngBuf);
  console.log(`Rendered ${item.name} (${item.size}x${item.size}) - ${pngBuf.length} bytes`);
}

// Also update dist directory if it exists
const distDir = path.resolve(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'logo.svg'), svg);
  fs.writeFileSync(path.join(distDir, 'logo.png'), renderToPng(512));
}
