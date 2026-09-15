const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

// Emblem coordinates:
// Center: (256, 215)
// Dot: center (256, 462), radius 22

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Metallic Rich Copper-Gold Gradient -->
    <linearGradient id="goldMetallic" x1="10%" y1="5%" x2="90%" y2="95%">
      <stop offset="0%" stop-color="#C25E08" />
      <stop offset="15%" stop-color="#DE8218" />
      <stop offset="35%" stop-color="#FBBF24" />
      <stop offset="55%" stop-color="#F59E0B" />
      <stop offset="75%" stop-color="#D97706" />
      <stop offset="90%" stop-color="#B45309" />
      <stop offset="100%" stop-color="#883303" />
    </linearGradient>

    <!-- Linear Gradient for Question Mark Body -->
    <linearGradient id="qMarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2841A" />
      <stop offset="30%" stop-color="#FCD34D" />
      <stop offset="60%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#9A3B04" />
    </linearGradient>

    <!-- Plate Radial Gradient -->
    <radialGradient id="plateRadial" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="25%" stop-color="#FBBF24" />
      <stop offset="60%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#7C2D04" />
    </radialGradient>

    <!-- Outer Rim Highlight -->
    <linearGradient id="rimHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#78350F" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- 1. Outer Concentric Ring (Smooth circular arc with bottom gap) -->
  <!-- Center (256, 215), Radius 190, Gap at bottom between (225, 401) and (287, 401) -->
  <path
    d="M 284 402 A 190 190 0 1 0 228 402"
    fill="none"
    stroke="url(#goldMetallic)"
    stroke-width="22"
    stroke-linecap="round"
  />
  <path
    d="M 284 402 A 190 190 0 1 0 228 402"
    fill="none"
    stroke="url(#rimHighlight)"
    stroke-width="2.5"
    stroke-linecap="round"
    opacity="0.8"
  />

  <!-- 2. Mid Question Mark Swirl (Smooth concentric sweep + stem) -->
  <!-- Center (256, 215), Radius 144, curls clockwise and curves down into the stem -->
  <path
    d="
      M 160 270
      A 144 144 0 1 1 332 316
      C 305 348 266 362 256 392
      L 256 410
    "
    fill="none"
    stroke="url(#qMarkGrad)"
    stroke-width="24"
    stroke-linecap="round"
    stroke-linejoin="round"
  />

  <!-- 3. Central Dining Plate (Smooth Circle) -->
  <circle cx="256" cy="215" r="98" fill="url(#plateRadial)" />
  
  <!-- Plate Inner Embossed Rim Grooves -->
  <circle cx="256" cy="215" r="90" fill="none" stroke="#7C2D04" stroke-width="2.5" opacity="0.6" />
  <circle cx="256" cy="215" r="88" fill="none" stroke="#FFFBEB" stroke-width="1.5" opacity="0.6" />

  <!-- 4. Cutlery: Spoon & Fork inside the plate, angled at 45 degrees -->
  <g transform="translate(256, 215) rotate(45) translate(-256, -215)">
    
    <!-- SPOON (Left) -->
    <g transform="translate(-22, 0)">
      <!-- Spoon Bowl Outer White Silhouette -->
      <ellipse cx="256" cy="154" rx="18" ry="27" fill="#FFFFFF" />
      <!-- Spoon Bowl Inner Gold Fill -->
      <ellipse cx="256" cy="154" rx="13" ry="21" fill="url(#goldMetallic)" />
      <ellipse cx="254" cy="152" rx="9" ry="15" fill="#FEF08A" opacity="0.7" />

      <!-- Spoon Handle White Outline -->
      <path
        d="M 251 180 L 246 270 C 246 280 250 286 256 286 C 262 286 266 280 266 270 L 261 180 Z"
        fill="#FFFFFF"
      />
      <!-- Spoon Handle Inner Gold -->
      <path
        d="M 253 186 L 250 268 C 250 274 252 278 256 278 C 260 278 262 274 262 268 L 259 186 Z"
        fill="url(#goldMetallic)"
      />
    </g>

    <!-- FORK (Right) -->
    <g transform="translate(22, 0)">
      <!-- Fork Tines & Neck White Outline -->
      <path
        d="
          M 238 135 L 238 168 C 238 182 245 192 251 195
          L 247 270 C 247 280 251 286 256 286 C 261 286 265 280 265 270
          L 261 195 C 267 192 274 182 274 168 L 274 135
          L 268 135 L 268 165 C 268 171 265 174 262 174 L 262 135
          L 258 135 L 258 174 C 255 174 254 171 254 165 L 254 135
          L 250 135 L 250 174 C 247 174 244 171 244 165 L 244 135
          Z
        "
        fill="#FFFFFF"
      />
      <!-- Fork Handle Inner Gold -->
      <path
        d="M 253 198 L 251 268 C 251 274 253 278 256 278 C 259 278 261 274 261 268 L 259 198 Z"
        fill="url(#goldMetallic)"
      />
    </g>
  </g>

  <!-- 5. Question Mark Bottom Dot -->
  <circle cx="256" cy="458" r="22" fill="url(#goldMetallic)" />
  <circle cx="253" cy="454" r="16" fill="url(#rimHighlight)" opacity="0.4" />
  <circle cx="256" cy="458" r="21.5" fill="none" stroke="#FFFBEB" stroke-width="1.5" opacity="0.8" />
</svg>`;

fs.writeFileSync('public/logo.svg', svg.trim());
fs.writeFileSync('public/icon.svg', svg.trim());

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1024 } });
const pngBuffer = resvg.render().asPng();
fs.writeFileSync('public/logo.png', pngBuffer);
console.log("Rendered smooth test SVG and PNG!");
