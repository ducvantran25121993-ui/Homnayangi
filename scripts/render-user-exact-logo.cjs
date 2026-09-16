const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');
const sharp = require('sharp');

// Create the exact SVG matching user's image_9d81f281-removebg-preview.png:
// 1. Warm orange-gold metallic foil gradient
// 2. Exact spiral paths forming the question mark
// 3. Central disc with transparent cut-out spoon and fork with white outlines
// 4. Floating round dot at bottom

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 560" width="100%" height="100%">
  <defs>
    <!-- Rich warm orange-gold metallic gradient matching user's image -->
    <linearGradient id="userGold" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FFA826" />
      <stop offset="18%" stop-color="#F58E00" />
      <stop offset="38%" stop-color="#FFBD3D" />
      <stop offset="60%" stop-color="#E87600" />
      <stop offset="82%" stop-color="#FFA826" />
      <stop offset="100%" stop-color="#D46000" />
    </linearGradient>

    <radialGradient id="discGold" cx="45%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FFBE40" />
      <stop offset="35%" stop-color="#FFA11C" />
      <stop offset="70%" stop-color="#E67500" />
      <stop offset="100%" stop-color="#C25400" />
    </radialGradient>

    <!-- Subtle texture filter simulating gold foil grain -->
    <filter id="goldGrain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.95  0 0 0 0 0.55  0 0 0 0 0.05  0 0 0 0.12 0" />
      <feComposite in="SourceGraphic" in2="noise" operator="over" />
    </filter>

    <!-- Mask to punch transparent spoon & fork cutout out of the center gold disc -->
    <mask id="cutoutMask">
      <!-- White everywhere keeps the gold disc -->
      <rect x="0" y="0" width="500" height="560" fill="#FFFFFF" />

      <!-- Black cutouts make the spoon and fork bodies completely transparent! -->
      <g transform="translate(250, 230) rotate(-45)">
        <!-- Spoon Scoop Cutout -->
        <ellipse cx="-20" cy="-28" rx="16" ry="24" fill="#000000" />
        <!-- Spoon Handle Cutout -->
        <path d="M -22 -6 C -23 15, -24 45, -24 62 C -24 68, -20 70, -17 70 C -14 70, -11 68, -12 62 C -13 45, -16 15, -17 -6 Z" fill="#000000" />

        <!-- Fork Tines Cutout -->
        <path d="M 8 2 C 9 -10, 11 -22, 11 -28 L 33 -28 C 33 -22, 35 -10, 36 2 C 30 8, 16 8, 8 2 Z" fill="#000000" />
        <rect x="10" y="-62" width="4" height="36" rx="2" fill="#000000" />
        <rect x="17" y="-66" width="4" height="40" rx="2" fill="#000000" />
        <rect x="24" y="-66" width="4" height="40" rx="2" fill="#000000" />
        <rect x="31" y="-62" width="4" height="36" rx="2" fill="#000000" />

        <!-- Fork Handle Cutout -->
        <path d="M 17 2 C 18 20, 21 45, 22 62 C 23 68, 26 70, 29 70 C 32 70, 33 68, 32 62 C 29 45, 25 20, 23 2 Z" fill="#000000" />
      </g>
    </mask>
  </defs>

  <g id="user-logo-group">
    <!-- 1. Center Disc with Transparent Cutouts -->
    <circle cx="250" cy="230" r="96" fill="url(#discGold)" mask="url(#cutoutMask)" />

    <!-- 2. White Outlines for Spoon & Fork inside Center Disc -->
    <g transform="translate(250, 230) rotate(-45)">
      <!-- Spoon Outline -->
      <ellipse cx="-20" cy="-28" rx="16" ry="24" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
      <path
        d="M -22 -6 C -23 15, -24 45, -24 62 C -24 68, -20 70, -17 70 C -14 70, -11 68, -12 62 C -13 45, -16 15, -17 -6 Z"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="3.5"
      />

      <!-- Fork Outline -->
      <path
        d="M 8 2 C 9 -10, 11 -22, 11 -28 L 33 -28 C 33 -22, 35 -10, 36 2 C 30 8, 16 8, 8 2 Z"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="3.5"
      />
      <!-- Tines Outlines -->
      <path d="M 12 -28 L 12 -62" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 19 -28 L 19 -66" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 26 -28 L 26 -66" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 33 -28 L 33 -62" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />

      <!-- Fork Handle Outline -->
      <path
        d="M 17 2 C 18 20, 21 45, 22 62 C 23 68, 26 70, 29 70 C 32 70, 33 68, 32 62 C 29 45, 25 20, 23 2 Z"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="3.5"
      />
    </g>

    <!-- 3. Question Mark Spiral Ribbon -->
    <!-- Inner Question Mark Spiral Body: Loops tightly around the disc -->
    <path
      d="
        M 148 245
        C 142 195, 172 135, 224 116
        C 285 92, 348 118, 368 174
        C 386 222, 368 290, 314 345
        C 280 380, 252 402, 248 418
      "
      fill="none"
      stroke="url(#userGold)"
      stroke-width="24"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Outer Circular Ring of Question Mark -->
    <!-- Begins at bottom opening (210, 436), goes clockwise around to (290, 436) -->
    <path
      d="
        M 210 436
        C 105 404, 38 322, 38 230
        C 38 112, 132 18, 250 18
        C 368 18, 462 112, 462 230
        C 462 322, 395 404, 290 436
      "
      fill="none"
      stroke="url(#userGold)"
      stroke-width="20"
      stroke-linecap="round"
    />

    <!-- 4. Floating Round Golden Dot at Bottom -->
    <!-- Centered at (250, 482), radius 22 -->
    <circle cx="250" cy="482" r="22" fill="url(#discGold)" />
  </g>
</svg>`;

const publicDir = path.resolve(__dirname, '..', 'public');
const distDir = path.resolve(__dirname, '..', 'dist');

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

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'logo.svg'), svg);
}

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
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, item.name), pngBuf);
  }
  console.log(`Rendered ${item.name} (${item.size}x${item.size}) - ${pngBuf.length} bytes`);
}

console.log('Finished updating logo assets with exact user geometry!');
