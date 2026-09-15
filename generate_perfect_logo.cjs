const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

// Center and key radii
// Let viewBox be 0 0 512 512
// Center: (256, 224)
// R_outer = 196 (diameter 392)
// Ring thickness = 26
// Gap = 18
// R_inner_ring = 152
// Plate radius = 108

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 560" width="100%" height="100%">
  <defs>
    <!-- Rich Golden Bronze Gradients -->
    <linearGradient id="bronzeGold" x1="15%" y1="5%" x2="85%" y2="95%">
      <stop offset="0%" stop-color="#CA6B14" />
      <stop offset="20%" stop-color="#E88F23" />
      <stop offset="45%" stop-color="#F9C646" />
      <stop offset="65%" stop-color="#F29E1D" />
      <stop offset="85%" stop-color="#D06F12" />
      <stop offset="100%" stop-color="#933D06" />
    </linearGradient>

    <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3C4" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#F59E0B" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#78350F" stop-opacity="0.6" />
    </linearGradient>

    <radialGradient id="plateGrad" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="35%" stop-color="#F59E0B" />
      <stop offset="70%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#883505" />
    </radialGradient>

    <!-- Subtle texture and 3D bevel filters -->
    <filter id="crispShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#542004" flood-opacity="0.3" />
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#2D1102" flood-opacity="0.25" />
    </filter>

    <filter id="cutleryGaze">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#6B2907" flood-opacity="0.4" />
    </filter>
  </defs>

  <g filter="url(#crispShadow)">
    
    <!-- 1. Outer Swirl Band of the Question Mark -->
    <!-- Starts from bottom-right (276, 404), sweeps around outer circle to bottom-left (220, 404) -->
    <!-- Arc from 85 deg to 445 deg (or -70 deg clockwise to 250 deg) -->
    <path 
      d="
        M 276 406
        A 196 196 0 1 0 216 406
        L 223 376
        A 168 168 0 1 1 270 376
        Z
      "
      fill="url(#bronzeGold)"
    />

    <!-- Outer Sheen Rim -->
    <path 
      d="M 276 406 A 196 196 0 1 0 216 406"
      fill="none"
      stroke="url(#goldHighlight)"
      stroke-width="3"
      stroke-linecap="round"
    />

    <!-- 2. Inner Question Mark Spiral Stem & Loop -->
    <!-- Sweeps from inner track at top/left, curves around the plate, down to the stem base -->
    <path 
      d="
        M 218 368
        A 146 146 0 1 1 310 326
        C 292 344 274 366 270 392
        L 270 412
        C 270 417 266 421 261 421
        L 243 421
        C 238 421 234 417 234 412
        L 234 394
        C 234 374 246 356 260 342
        C 276 326 288 304 288 280
        C 288 244 258 214 222 214
        C 192 214 168 234 162 262
        L 134 256
        C 142 214 178 184 222 184
        C 274 184 316 226 316 278
        C 316 308 302 334 282 352
        C 270 364 262 378 262 396
        L 262 400
        L 242 400
        L 242 396
        C 242 374 252 354 266 338
        C 290 312 320 286 320 230
        A 146 146 0 0 0 174 224
        A 146 146 0 0 0 218 368
        Z
      "
      fill="url(#bronzeGold)"
    />

    <!-- 3. Central Circular Plate with Rich Warm Gradient -->
    <circle cx="256" cy="226" r="102" fill="url(#plateGrad)" />
    <!-- Circular Plate Inset Grooves -->
    <circle cx="256" cy="226" r="94" fill="none" stroke="#B45309" stroke-width="2.5" opacity="0.6" />
    <circle cx="256" cy="226" r="92" fill="none" stroke="#FDE68A" stroke-width="1.5" opacity="0.5" />

    <!-- 4. Cutlery in the center: Spoon & Fork tilted at 42 degrees -->
    <g transform="translate(256, 226) rotate(42) translate(-256, -226)" filter="url(#cutleryGaze)">
      
      <!-- SPOON (Left) -->
      <g transform="translate(-24, 0)">
        <!-- Spoon Head - perfect smooth ellipse -->
        <ellipse cx="256" cy="162" rx="18" ry="28" fill="#FFFDF5" />
        <ellipse cx="256" cy="162" rx="13" ry="22" fill="url(#bronzeGold)" />
        <ellipse cx="254" cy="160" rx="9" ry="17" fill="#FDE68A" opacity="0.55" />
        
        <!-- Spoon Neck & Stem -->
        <path 
          d="
            M 252 189
            C 252 198 250 220 248 248
            C 247 268 245 284 245 294
            C 245 301 249 306 256 306
            C 263 306 267 301 267 294
            C 267 284 265 268 264 248
            C 262 220 260 198 260 189
            Z
          "
          fill="#FFFDF5"
        />
        <!-- Inner gold groove for handle -->
        <path 
          d="
            M 254 198
            L 252 284
            C 252 292 254 296 256 296
            C 258 296 260 292 260 284
            L 258 198
            Z
          "
          fill="url(#bronzeGold)"
        />
      </g>

      <!-- FORK (Right) -->
      <g transform="translate(24, 0)">
        <!-- Fork 4 Tines & Head -->
        <path 
          d="
            M 239 144
            L 239 174
            C 239 188 245 198 251 200
            L 247 294
            C 247 301 251 306 256 306
            C 261 306 265 301 265 294
            L 261 200
            C 267 198 273 188 273 174
            L 273 144
            L 267 144
            L 267 172
            C 267 178 264 181 261 181
            L 261 144
            L 257 144
            L 257 172
            C 257 178 255 181 254 181
            C 253 181 251 178 251 172
            L 251 144
            L 247 144
            L 247 181
            C 244 181 241 178 241 172
            L 241 144
            Z
          "
          fill="#FFFDF5"
        />
        <!-- Inner fork handle groove -->
        <path 
          d="
            M 254 208
            L 253 286
            C 253 291 254 294 256 294
            C 258 294 259 291 259 286
            L 258 208
            Z
          "
          fill="url(#bronzeGold)"
        />
      </g>
    </g>

    <!-- 5. Question Mark Bottom Dot -->
    <circle cx="256" cy="482" r="28" fill="url(#bronzeGold)" />
    <circle cx="251" cy="477" r="22" fill="url(#goldHighlight)" opacity="0.35" />
    <circle cx="256" cy="482" r="27.5" fill="none" stroke="#FDE68A" stroke-width="2" opacity="0.8" />

  </g>
</svg>
`;

fs.writeFileSync('public/logo.svg', svg.trim());
console.log("Written public/logo.svg");

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1024 } });
const pngBuffer = resvg.render().asPng();
fs.writeFileSync('public/logo.png', pngBuffer);
console.log("Rendered public/logo.png (1024px), size:", pngBuffer.length);
