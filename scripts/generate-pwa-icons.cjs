const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

function createPNG(width, height, drawPixel) {
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawPixel(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      let byte = buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ ((crc ^ byte) & 1 ? 0xedb88320 : 0);
        byte >>>= 1;
      }
    }
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const crcBuf = Buffer.alloc(4);
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Helper to draw iconic food bowl + steam
function drawFoodIcon(x, y, width, height, isMaskable = false) {
  // Normalize coordinates to [-1, 1]
  const scale = isMaskable ? 0.75 : 0.88; // safe zone margin for maskable
  const nx = ((x / width) * 2 - 1) / scale;
  const ny = ((y / height) * 2 - 1) / scale;

  // Background: Rounded rect for standard, full bleed for maskable
  let inBg = true;
  if (!isMaskable) {
    // 22% rounded rectangle
    const cornerRadius = 0.22;
    const dx = Math.max(0, Math.abs(nx) - (1 - cornerRadius));
    const dy = Math.max(0, Math.abs(ny) - (1 - cornerRadius));
    inBg = (dx * dx + dy * dy) <= (cornerRadius * cornerRadius);
    if (Math.abs(nx) > 1 || Math.abs(ny) > 1) inBg = false;
  }

  if (!inBg) {
    return [0, 0, 0, 0]; // Transparent outside icon shape
  }

  // Gradient background: Warm orange (#ea580c) to rich amber (#d97706)
  const gradT = (y / height);
  let bgR = Math.round(234 * (1 - gradT) + 217 * gradT);
  let bgG = Math.round(88 * (1 - gradT) + 119 * gradT);
  let bgB = Math.round(12 * (1 - gradT) + 6 * gradT);

  // Check if pixel is inside Bowl shape:
  // Center is around nx = 0, ny = 0.2
  // Bowl top edge: ny = 0.05, bottom ny = 0.55
  let isWhite = false;
  let isGold = false;

  // 1. Bowl semi-ellipse (ny from 0.05 to 0.55)
  if (ny >= 0.05 && ny <= 0.55) {
    const bowlX = nx / 0.55;
    const bowlY = (ny - 0.05) / 0.5;
    if (bowlX * bowlX + bowlY * bowlY <= 1) {
      isWhite = true;
    }
  }

  // 1b. Bowl Rim: horizontal pill at ny = 0.05, height 0.06, width 0.6
  if (Math.abs(ny - 0.05) <= 0.035 && Math.abs(nx) <= 0.6) {
    isWhite = true;
  }

  // 1c. Bowl Base: ny from 0.55 to 0.65, width 0.3
  if (ny >= 0.52 && ny <= 0.62 && Math.abs(nx) <= (0.28 - (ny - 0.52) * 0.4)) {
    isWhite = true;
  }

  // 2. Bowl decorative inner food accent line (amber/gold band inside rim)
  if (isWhite && Math.abs(ny - 0.14) <= 0.025 && Math.abs(nx) <= 0.42) {
    isGold = true;
  }

  // 3. Chopsticks pointing diagonally:
  // Stick 1: line from (-0.55, -0.45) to (0.25, 0.12)
  const stick1_dx = 0.8;
  const stick1_dy = 0.57;
  const t1 = ((nx - (-0.55)) * stick1_dx + (ny - (-0.45)) * stick1_dy) / (stick1_dx * stick1_dx + stick1_dy * stick1_dy);
  if (t1 >= 0 && t1 <= 1) {
    const px = -0.55 + t1 * stick1_dx;
    const py = -0.45 + t1 * stick1_dy;
    const dist = Math.hypot(nx - px, ny - py);
    if (dist <= 0.025) {
      isWhite = true;
    }
  }

  // Stick 2: line from (-0.45, -0.55) to (0.32, 0.16)
  const stick2_dx = 0.77;
  const stick2_dy = 0.71;
  const t2 = ((nx - (-0.45)) * stick2_dx + (ny - (-0.55)) * stick2_dy) / (stick2_dx * stick2_dx + stick2_dy * stick2_dy);
  if (t2 >= 0 && t2 <= 1) {
    const px = -0.45 + t2 * stick2_dx;
    const py = -0.55 + t2 * stick2_dy;
    const dist = Math.hypot(nx - px, ny - py);
    if (dist <= 0.025) {
      isWhite = true;
    }
  }

  // 4. Steam waves rising above bowl:
  // Center steam wave: nx around 0, ny from -0.1 to -0.38
  if (ny <= -0.05 && ny >= -0.38) {
    const wave1 = 0.06 * Math.sin((ny + 0.1) * 16);
    if (Math.abs(nx - wave1) <= 0.025) {
      isWhite = true;
    }
    // Left steam wave: nx around -0.22, ny from -0.08 to -0.32
    if (ny <= -0.05 && ny >= -0.32) {
      const wave2 = -0.22 + 0.05 * Math.sin((ny + 0.12) * 16);
      if (Math.abs(nx - wave2) <= 0.025) {
        isWhite = true;
      }
    }
    // Right steam wave: nx around 0.22, ny from -0.08 to -0.32
    if (ny <= -0.05 && ny >= -0.32) {
      const wave3 = 0.22 + 0.05 * Math.sin((ny + 0.12) * 16);
      if (Math.abs(nx - wave3) <= 0.025) {
        isWhite = true;
      }
    }
  }

  // 5. Little sparkle / star top right (nx = 0.5, ny = -0.4)
  const sx = nx - 0.48;
  const sy = ny - (-0.38);
  if ((Math.abs(sx) <= 0.02 && Math.abs(sy) <= 0.08) || (Math.abs(sy) <= 0.02 && Math.abs(sx) <= 0.08)) {
    isGold = true;
  }

  if (isGold) {
    return [254, 240, 138, 255]; // Golden amber sparkle #fef08a
  }
  if (isWhite) {
    return [255, 255, 255, 255]; // Crisp white
  }

  return [bgR, bgG, bgB, 255];
}

const publicDir = path.resolve(__dirname, '..', 'public');

console.log('Generating PWA icons into:', publicDir);

// 1. 192x192
const icon192 = createPNG(192, 192, (x, y) => drawFoodIcon(x, y, 192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);
console.log('Generated pwa-192x192.png');

// 2. 512x512
const icon512 = createPNG(512, 512, (x, y) => drawFoodIcon(x, y, 512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);
console.log('Generated pwa-512x512.png');

// 3. 512x512 Maskable (with safe zone padding and full-bleed background)
const iconMaskable512 = createPNG(512, 512, (x, y) => drawFoodIcon(x, y, 512, 512, true));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), iconMaskable512);
console.log('Generated pwa-maskable-512x512.png');

// 4. Apple Touch Icon 180x180
const iconApple = createPNG(180, 180, (x, y) => drawFoodIcon(x, y, 180, 180, false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), iconApple);
console.log('Generated apple-touch-icon.png');

// 5. Favicon 64x64 PNG & Favicon ICO wrapper
const favicon64 = createPNG(64, 64, (x, y) => drawFoodIcon(x, y, 64, 64, false));
fs.writeFileSync(path.join(publicDir, 'favicon-64x64.png'), favicon64);
// Writing valid ICO containing the PNG
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type: 1 = ICO
icoHeader.writeUInt16LE(1, 4); // Count: 1 image

const icoEntry = Buffer.alloc(16);
icoEntry[0] = 64; // width
icoEntry[1] = 64; // height
icoEntry[2] = 0;  // palette colors
icoEntry[3] = 0;  // reserved
icoEntry.writeUInt16LE(1, 4);  // color planes
icoEntry.writeUInt16LE(32, 6); // bits per pixel
icoEntry.writeUInt32LE(favicon64.length, 8); // size of image
icoEntry.writeUInt32LE(22, 12); // offset = 6 + 16 = 22

const icoFile = Buffer.concat([icoHeader, icoEntry, favicon64]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFile);
console.log('Generated favicon.ico');

console.log('All icons generated successfully!');
