const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

// Center of the emblem: (256, 230)
// Radii:
// Dot: center (256, 476), radius 24
// Stem end: centered around (256, 420), width ~ 22
// Plate: center (256, 220), radius 96
// Inner Question Ring: radius 146, thickness 26 (inner 133, outer 159)
// Outer Ring: radius 192, thickness 24 (inner 180, outer 204)

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 520" width="100%" height="100%" fill="none">
  <defs>
    <!-- Metallic Gold/Amber Gradient -->
    <linearGradient id="goldGradient" x1="10%" y1="10%" x2="90%" y2="90%">
      <stop offset="0%" stop-color="#C2600C" />
      <stop offset="16%" stop-color="#E2841B" />
      <stop offset="38%" stop-color="#FBBF24" />
      <stop offset="55%" stop-color="#F59E0B" />
      <stop offset="78%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#9A3C04" />
    </linearGradient>

    <!-- Plate Radial Gradient -->
    <radialGradient id="plateRadial" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="30%" stop-color="#F59E0B" />
      <stop offset="70%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#883505" />
    </radialGradient>

    <!-- Subtle Edge Highlight -->
    <linearGradient id="edgeHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#B45309" stop-opacity="0.2" />
    </linearGradient>

    <filter id="cleanShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#542004" flood-opacity="0.25" />
    </filter>
  </defs>

  <g filter="url(#cleanShadow)">
    
    <!-- 1. Outer Concentric Ring with Bottom Gap (Question Mark Outer Loop) -->
    <!-- Center (256, 220), Outer Radius 200, Inner Radius 176 -->
    <!-- Arc from ~100 deg to ~80 deg (gap at the bottom around 256) -->
    <path
      d="
        M 284 416
        A 200 200 0 1 0 228 416
        L 233 392
        A 176 176 0 1 1 279 392
        Z
      "
      fill="url(#goldGradient)"
    />

    <!-- Outer Ring Highlight Stroke -->
    <path
      d="M 284 416 A 200 200 0 1 0 228 416"
      stroke="url(#edgeHighlight)"
      stroke-width="2.5"
      stroke-linecap="round"
      fill="none"
    />

    <!-- 2. Mid Question Mark Arc / Swirl -->
    <!-- Smooth circular band curling into the question mark -->
    <path
      d="
        M 226 386
        A 146 146 0 1 1 316 322
        C 298 342 278 368 274 396
        L 274 416
        C 274 421 270 425 265 425
        L 247 425
        C 242 425 238 421 238 416
        L 238 398
        C 238 376 250 354 266 336
        C 282 318 296 294 296 266
        C 296 230 268 202 232 202
        C 204 202 180 220 174 246
        L 150 240
        C 158 200 192 176 232 176
        C 282 176 322 216 322 266
        C 322 300 306 328 284 348
        C 270 362 262 378 262 398
        L 262 402
        L 246 402
        L 246 398
        C 246 374 256 352 272 334
        C 292 312 306 290 306 250
        A 146 146 0 0 0 178 220
        A 146 146 0 0 0 226 386
        Z
      "
      fill="url(#goldGradient)"
    />

    <!-- 3. Central Dining Plate (Smooth Circle) -->
    <circle cx="256" cy="220" r="100" fill="url(#plateRadial)" />
    <!-- Plate Inner Rim Circles -->
    <circle cx="256" cy="220" r="92" stroke="#9A3C04" stroke-width="2.5" opacity="0.6" fill="none" />
    <circle cx="256" cy="220" r="90" stroke="#FEF08A" stroke-width="1.5" opacity="0.6" fill="none" />

    <!-- 4. Cutlery: Spoon & Fork inside the plate tilted at 42 degrees -->
    <g transform="translate(256, 220) rotate(42) translate(-256, -220)">
      
      <!-- SPOON (Left) -->
      <g transform="translate(-23, 0)">
        <!-- Spoon Head -->
        <ellipse cx="256" cy="158" rx="17" ry="26" fill="#FFFFFF" />
        <ellipse cx="256" cy="158" rx="12" ry="20" fill="url(#goldGradient)" />
        <ellipse cx="254" cy="156" rx="8" ry="15" fill="#FEF08A" opacity="0.6" />
        
        <!-- Spoon Neck & Handle (Crisp White Silhouette with inner gold inlay) -->
        <path
          d="
            M 252 183
            C 252 196 250 220 248 246
            C 247 266 245 280 245 290
            C 245 298 249 303 256 303
            C 263 303 267 298 267 290
            C 267 280 265 266 264 246
            C 262 220 260 196 260 183
            Z
          "
          fill="#FFFFFF"
        />
        <!-- Inner gold line of spoon handle -->
        <path
          d="
            M 254 192
            L 252 280
            C 252 288 254 293 256 293
            C 258 293 260 288 260 280
            L 258 192
            Z
          "
          fill="url(#goldGradient)"
        />
      </g>

      <!-- FORK (Right) -->
      <g transform="translate(23, 0)">
        <!-- Fork Tines & Handle (Crisp White Silhouette) -->
        <path
          d="
            M 239 140
            L 239 170
            C 239 184 245 194 251 196
            L 247 290
            C 247 298 251 303 256 303
            C 261 303 265 298 265 290
            L 261 196
            C 267 194 273 184 273 170
            L 273 140
            L 267 140
            L 267 168
            C 267 174 264 177 261 177
            L 261 140
            L 257 140
            L 257 168
            C 257 174 255 177 254 177
            C 253 177 251 174 251 168
            L 251 140
            L 247 140
            L 247 177
            C 244 177 241 174 241 168
            L 241 140
            Z
          "
          fill="#FFFFFF"
        />
        <!-- Inner fork handle inlay -->
        <path
          d="
            M 254 204
            L 253 282
            C 253 288 254 291 256 291
            C 258 291 259 288 259 282
            L 258 204
            Z
          "
          fill="url(#goldGradient)"
        />
      </g>
    </g>

    <!-- 5. Question Mark Bottom Dot -->
    <circle cx="256" cy="466" r="24" fill="url(#goldGradient)" />
    <circle cx="252" cy="462" r="18" fill="url(#edgeHighlight)" opacity="0.4" />
    <circle cx="256" cy="466" r="23.5" stroke="#FDE68A" stroke-width="1.5" opacity="0.8" fill="none" />

  </g>
</svg>`;

fs.writeFileSync('public/logo.svg', svg.trim());
fs.writeFileSync('public/icon.svg', svg.trim());

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1024 } });
const pngBuffer = resvg.render().asPng();
fs.writeFileSync('public/logo.png', pngBuffer);
console.log("Success: logo.svg and logo.png generated cleanly!");
