const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// viewBox 0 0 500 560
// Center of main circular emblem: cx = 250, cy = 230
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 560" width="100%" height="100%">
  <defs>
    <!-- Rich Golden Metallic Multi-Stop Linear Gradient -->
    <linearGradient id="goldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C25E00" />
      <stop offset="12%" stop-color="#E67E00" />
      <stop offset="25%" stop-color="#FFA826" />
      <stop offset="38%" stop-color="#FFE79A" />
      <stop offset="48%" stop-color="#FFB326" />
      <stop offset="62%" stop-color="#E66A00" />
      <stop offset="78%" stop-color="#FFAE2B" />
      <stop offset="90%" stop-color="#FFE48E" />
      <stop offset="100%" stop-color="#B84D00" />
    </linearGradient>

    <!-- Radial Gradient for Inner Plate Depth -->
    <radialGradient id="plateRadial" cx="42%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#FFE599" />
      <stop offset="25%" stop-color="#FFAA24" />
      <stop offset="55%" stop-color="#E87200" />
      <stop offset="85%" stop-color="#C95400" />
      <stop offset="100%" stop-color="#9E3A00" />
    </radialGradient>

    <!-- 3D Dot Spherical Gradient -->
    <radialGradient id="dotRadial" cx="35%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#FFF2B8" />
      <stop offset="30%" stop-color="#FFAD26" />
      <stop offset="70%" stop-color="#D95F00" />
      <stop offset="100%" stop-color="#8A3100" />
    </radialGradient>

    <!-- Cutout / Engraved Channel Shadow -->
    <filter id="engraveFilter" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#5E2200" flood-opacity="0.4" />
    </filter>

    <!-- Overall Soft Specular Glow -->
    <filter id="logoGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#803300" flood-opacity="0.25" />
    </filter>
  </defs>

  <g filter="url(#logoGlow)">
    <!-- 1. Outermost Ring (with bottom gap) -->
    <!-- Center (250, 230), R = 212, thickness = 16 -->
    <!-- Bottom gap between ~106° and ~74° (from x=216 to x=284 at bottom y=434) -->
    <path
      d="
        M 214 433
        A 212 212 0 1 1 286 433
      "
      fill="none"
      stroke="url(#goldLinear)"
      stroke-width="16"
      stroke-linecap="round"
    />

    <!-- 2. Concentric Intermediate Ring Arc -->
    <!-- Radius ~176px, loops around top and right, guiding into the question mark -->
    <path
      d="
        M 170 380
        A 176 176 0 1 1 315 390
      "
      fill="none"
      stroke="url(#goldLinear)"
      stroke-width="14"
      stroke-linecap="round"
    />

    <!-- 3. Question Mark Spiral Ribbon -->
    <!-- Wraps around, connects down towards bottom-left, forming the Question Mark body -->
    <!-- Starting at bottom neck (250, 420), curving up left, sweeping over top, circling around to center -->
    <path
      d="
        M 238 418
        C 210 415, 120 370, 102 270
        C 86 180, 140 85, 250 85
        C 348 85, 412 160, 404 254
        C 396 338, 326 394, 272 414
      "
      fill="none"
      stroke="url(#goldLinear)"
      stroke-width="26"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- 4. Central Solid Dish / Plate -->
    <!-- Solid circular plate centered at (248, 222), Radius = 106 -->
    <circle cx="248" cy="222" r="106" fill="url(#plateRadial)" />
    <!-- Plate Rim Highlight -->
    <circle cx="248" cy="222" r="105" fill="none" stroke="#FFE9A3" stroke-width="2.5" opacity="0.6" />

    <!-- 5. Spoon & Fork Cutout Motif on Plate -->
    <!-- Angled at 45 degrees, transformed around plate center (248, 222) -->
    <g transform="translate(248, 222) rotate(-45)">
      <!-- Left: Spoon -->
      <g filter="url(#engraveFilter)">
        <!-- Spoon Scoop -->
        <ellipse cx="-24" cy="-35" rx="19" ry="29" fill="url(#goldLinear)" stroke="#FFFFFF" stroke-width="4.5" />
        <!-- Spoon Inner Dimple Outline -->
        <ellipse cx="-24" cy="-35" rx="12" ry="20" fill="none" stroke="#FFEBA3" stroke-width="2" opacity="0.8" />
        <!-- Spoon Handle -->
        <path
          d="
            M -27 -7
            C -27 15, -28 45, -29 68
            C -30 76, -26 80, -22 80
            C -18 80, -17 76, -19 68
            C -21 45, -22 15, -21 -7
            Z
          "
          fill="url(#goldLinear)"
          stroke="#FFFFFF"
          stroke-width="4.5"
          stroke-linejoin="round"
        />
      </g>

      <!-- Right: Fork -->
      <g filter="url(#engraveFilter)">
        <!-- Fork Head Base & 4 Tines -->
        <!-- Fork Handle -->
        <path
          d="
            M 19 0
            C 20 22, 21 48, 23 68
            C 24 76, 28 80, 32 80
            C 36 80, 37 76, 35 68
            C 33 48, 31 22, 29 0
            Z
          "
          fill="url(#goldLinear)"
          stroke="#FFFFFF"
          stroke-width="4.5"
          stroke-linejoin="round"
        />

        <!-- Fork Tines Base Bridge -->
        <path
          d="
            M 12 2
            C 14 -12, 16 -24, 16 -30
            L 34 -30
            C 34 -24, 36 -12, 38 2
            C 32 10, 18 10, 12 2
            Z
          "
          fill="url(#goldLinear)"
          stroke="#FFFFFF"
          stroke-width="4.5"
          stroke-linejoin="round"
        />

        <!-- 4 Fork Tines (Prongs) -->
        <!-- Tine 1 (leftmost) -->
        <path d="M 16 -28 L 16 -65" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round" />
        <path d="M 16 -28 L 16 -64" stroke="url(#goldLinear)" stroke-width="2.5" stroke-linecap="round" />

        <!-- Tine 2 -->
        <path d="M 22 -28 L 22 -68" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round" />
        <path d="M 22 -28 L 22 -67" stroke="url(#goldLinear)" stroke-width="2.5" stroke-linecap="round" />

        <!-- Tine 3 -->
        <path d="M 28 -28 L 28 -68" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round" />
        <path d="M 28 -28 L 28 -67" stroke="url(#goldLinear)" stroke-width="2.5" stroke-linecap="round" />

        <!-- Tine 4 (rightmost) -->
        <path d="M 34 -28 L 34 -65" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round" />
        <path d="M 34 -28 L 34 -64" stroke="url(#goldLinear)" stroke-width="2.5" stroke-linecap="round" />
      </g>
    </g>

    <!-- 6. Question Mark Dot (Bottom Center) -->
    <!-- Centered at (250, 485), radius 22 -->
    <circle cx="250" cy="485" r="23" fill="url(#dotRadial)" />
    <circle cx="250" cy="485" r="22.5" fill="none" stroke="#FFE9A3" stroke-width="2" opacity="0.7" />
  </g>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 512 }
});
const pngData = resvg.render().asPng();
fs.writeFileSync('scripts/test-logo.png', pngData);
console.log('Successfully generated scripts/test-logo.png with size:', pngData.length);
