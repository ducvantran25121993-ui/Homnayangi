const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// We will construct the exact 3D tubular metallic logo as shown in user's image.png and image_9d81f281-removebg-preview.png:
// 1. Center of circular emblem is (256, 236)
// 2. Center 3D Plate: sphere with radial gradient at (256, 236), radius ~68
//    Inside plate: Spoon and fork tilted 45 degrees.
// 3. Question mark spiral:
//    - Outer ring: starts near bottom gap, sweeps around 360 deg
//    - Inner spiral: loops around the plate and hooks down into question mark tail at (256, 410)
// 4. Dot: at (256, 446), radius 18, 3D golden sphere
// 5. 3D Tube effect:
//    - Wide dark-gold base stroke
//    - Medium rich gold body stroke
//    - Narrow bright yellow/white specular highlight along spine
//    - Drop shadow for depth

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Rich Golden Metallic Gradients -->
    <linearGradient id="goldBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9A4500" />
      <stop offset="25%" stop-color="#D97200" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="75%" stop-color="#D96800" />
      <stop offset="100%" stop-color="#803300" />
    </linearGradient>

    <linearGradient id="goldBody" x1="15%" y1="10%" x2="85%" y2="90%">
      <stop offset="0%" stop-color="#D96E00" />
      <stop offset="20%" stop-color="#FFAE1A" />
      <stop offset="35%" stop-color="#FFD666" />
      <stop offset="50%" stop-color="#FFA310" />
      <stop offset="70%" stop-color="#E07000" />
      <stop offset="85%" stop-color="#FFB52E" />
      <stop offset="100%" stop-color="#9E3E00" />
    </linearGradient>

    <!-- Specular Ridge Highlight (creates 3D cylindrical tube look) -->
    <linearGradient id="goldSpine" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#FFF2B2" stop-opacity="0.9" />
      <stop offset="25%" stop-color="#FFFFFF" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#FFE082" stop-opacity="0.8" />
      <stop offset="75%" stop-color="#FFFFFF" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#FFF5C2" stop-opacity="0.85" />
    </linearGradient>

    <!-- 3D Spherical Radial Gradient for Central Plate -->
    <radialGradient id="spherePlate" cx="38%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#FFEBA0" />
      <stop offset="18%" stop-color="#FFBA24" />
      <stop offset="45%" stop-color="#E67300" />
      <stop offset="75%" stop-color="#B84D00" />
      <stop offset="100%" stop-color="#732B00" />
    </radialGradient>

    <!-- 3D Spherical Radial Gradient for Dot -->
    <radialGradient id="sphereDot" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="20%" stop-color="#FFE27A" />
      <stop offset="45%" stop-color="#FFA817" />
      <stop offset="75%" stop-color="#C75400" />
      <stop offset="100%" stop-color="#732600" />
    </radialGradient>

    <!-- Soft Depth Shadow -->
    <filter id="tubeShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#542100" flood-opacity="0.45" />
    </filter>

    <filter id="dotShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#542100" flood-opacity="0.5" />
    </filter>

    <filter id="engraveWhite" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0.5" dy="1" stdDeviation="1" flood-color="#4A1A00" flood-opacity="0.4" />
    </filter>
  </defs>

  <g id="full-logo" transform="translate(0, 8)">
    <!-- 1. Central 3D Dome / Plate -->
    <!-- Center (256, 222), Radius = 66 -->
    <g filter="url(#tubeShadow)">
      <!-- Base Outer Dark Rim -->
      <circle cx="256" cy="222" r="68" fill="#803300" />
      <!-- Spherical Dome -->
      <circle cx="256" cy="222" r="66" fill="url(#spherePlate)" />
      <!-- Top-left Specular Glint on Sphere -->
      <ellipse cx="236" cy="192" rx="28" ry="14" fill="#FFFFFF" opacity="0.35" transform="rotate(-30, 236, 192)" />
    </g>

    <!-- 2. Spoon and Fork Motif on Central Dome -->
    <!-- Positioned diagonally at 45 degrees inside the sphere -->
    <g transform="translate(256, 222) rotate(-45)" filter="url(#engraveWhite)">
      <!-- Spoon (Left) -->
      <!-- Scoop -->
      <ellipse cx="-16" cy="-24" rx="13" ry="19" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5" />
      <!-- Scoop Inner Shading -->
      <ellipse cx="-16" cy="-24" rx="8" ry="13" fill="url(#spherePlate)" opacity="0.35" />
      <!-- Spoon Handle -->
      <path
        d="M -18 -5 C -19 12, -20 34, -20 48 C -20 54, -17 56, -14 56 C -11 56, -10 54, -11 48 C -12 34, -14 12, -14 -5 Z"
        fill="#FFFBEB"
      />

      <!-- Fork (Right) -->
      <!-- Handle -->
      <path
        d="M 12 2 C 13 18, 15 36, 16 48 C 17 54, 20 56, 23 56 C 26 56, 27 54, 25 48 C 23 36, 20 18, 18 2 Z"
        fill="#FFFBEB"
      />
      <!-- Fork Crown Base -->
      <path
        d="M 8 2 C 9 -7, 10 -15, 10 -20 L 26 -20 C 26 -15, 27 -7, 28 2 C 23 7, 13 7, 8 2 Z"
        fill="#FFFBEB"
      />
      <!-- 4 Tines -->
      <path d="M 11 -18 L 11 -42" stroke="#FFFBEB" stroke-width="3" stroke-linecap="round" />
      <path d="M 16 -19 L 16 -45" stroke="#FFFBEB" stroke-width="3" stroke-linecap="round" />
      <path d="M 21 -19 L 21 -45" stroke="#FFFBEB" stroke-width="3" stroke-linecap="round" />
      <path d="M 26 -18 L 26 -42" stroke="#FFFBEB" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- 3. The 3D Question Mark Ribbon Paths -->
    <!-- We render in 3 layered passes to create genuine 3D metallic tube shading:
         Pass A: Wide dark amber base stroke with drop shadow
         Pass B: Vibrant metallic gold body stroke
         Pass C: Slender bright specular highlight stroke along the tube spine -->

    <g filter="url(#tubeShadow)">
      <!-- A1. Outer Ring Base -->
      <!-- Circular ring centered at (256, 222), Radius ~176, opening at bottom between 218 and 294 -->
      <path
        d="
          M 218 394
          C 120 366, 76 295, 76 222
          C 76 122, 156 46, 256 46
          C 356 46, 436 122, 436 222
          C 436 295, 392 366, 294 394
        "
        fill="none"
        stroke="url(#goldBase)"
        stroke-width="22"
        stroke-linecap="round"
      />

      <!-- A2. Inner Question Mark Spiral Body Base -->
      <!-- Starts on left of plate, loops over top, down right, curves inward to bottom hook -->
      <path
        d="
          M 162 258
          C 152 210, 175 142, 228 116
          C 285 88, 350 114, 372 166
          C 392 214, 378 285, 320 342
          C 286 376, 260 398, 256 414
        "
        fill="none"
        stroke="url(#goldBase)"
        stroke-width="26"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- B. Vibrant Metallic Gold Body -->
    <!-- B1. Outer Ring Body -->
    <path
      d="
        M 218 394
        C 120 366, 76 295, 76 222
        C 76 122, 156 46, 256 46
        C 356 46, 436 122, 436 222
        C 436 295, 392 366, 294 394
      "
      fill="none"
      stroke="url(#goldBody)"
      stroke-width="17"
      stroke-linecap="round"
    />

    <!-- B2. Inner Spiral Body -->
    <path
      d="
        M 162 258
        C 152 210, 175 142, 228 116
        C 285 88, 350 114, 372 166
        C 392 214, 378 285, 320 342
        C 286 376, 260 398, 256 414
      "
      fill="none"
      stroke="url(#goldBody)"
      stroke-width="21"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- C. 3D Specular Spine Highlights (Bright golden metallic reflection) -->
    <!-- C1. Outer Ring Highlight -->
    <path
      d="
        M 216 392
        C 122 364, 80 294, 80 222
        C 80 125, 158 50, 256 50
        C 354 50, 432 125, 432 222
        C 432 294, 390 364, 296 392
      "
      fill="none"
      stroke="url(#goldSpine)"
      stroke-width="5"
      stroke-linecap="round"
      opacity="0.9"
    />

    <!-- C2. Inner Spiral Highlight -->
    <path
      d="
        M 164 254
        C 155 210, 177 145, 228 120
        C 283 93, 346 117, 368 167
        C 387 213, 374 282, 318 338
        C 285 372, 260 395, 256 412
      "
      fill="none"
      stroke="url(#goldSpine)"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
      opacity="0.9"
    />

    <!-- Secondary micro-specular gloss -->
    <path
      d="
        M 190 90
        C 220 62, 280 62, 320 85
      "
      fill="none"
      stroke="#FFFFFF"
      stroke-width="2.5"
      stroke-linecap="round"
      opacity="0.75"
    />
    <path
      d="
        M 260 115
        C 310 120, 355 155, 365 195
      "
      fill="none"
      stroke="#FFFFFF"
      stroke-width="2.5"
      stroke-linecap="round"
      opacity="0.8"
    />

    <!-- 4. 3D Spherical Bottom Question Mark Dot -->
    <!-- Positioned directly below hook (256, 414), at (256, 448) -->
    <g filter="url(#dotShadow)">
      <!-- Soft ambient shadow -->
      <ellipse cx="256" cy="466" rx="14" ry="4" fill="#3D1700" opacity="0.4" />
      <!-- Base Outer Dark Rim -->
      <circle cx="256" cy="448" r="19" fill="#803300" />
      <!-- Sphere Dot -->
      <circle cx="256" cy="448" r="18" fill="url(#sphereDot)" />
      <!-- Top-left specular glint -->
      <ellipse cx="250" cy="442" rx="6" ry="4" fill="#FFFFFF" opacity="0.85" transform="rotate(-30, 250, 442)" />
    </g>
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
console.log('Successfully completed 3D metallic logo generation!');
