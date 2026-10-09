const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function optimizeImage(inputPath, outputPath) {
  if (!outputPath) {
    outputPath = inputPath;
  }

  const targetMin = 51200; // 50 KB
  const targetMax = 61440; // 60 KB

  // Read metadata
  const metadata = await sharp(inputPath).metadata();
  const targetWidth = Math.min(metadata.width || 680, 680);

  // Step 1: Pre-scale image down to max width 680px once
  const preScaledBuffer = await sharp(inputPath)
    .resize({ width: targetWidth, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true, chromaSubsampling: '4:2:0' })
    .toBuffer();

  // Step 2: Binary search quality across widths to hit 50KB - 60KB (51,200 - 61,440 bytes)
  let bestBuffer = null;
  for (const w of [680, 640, 600, 560, 520]) {
    let lowQ = 40;
    let highQ = 94;

    while (lowQ <= highQ) {
      const midQ = Math.round((lowQ + highQ) / 2);
      const buffer = await sharp(preScaledBuffer)
        .resize({ width: w, withoutEnlargement: true })
        .jpeg({
          quality: midQ,
          progressive: true,
          chromaSubsampling: '4:2:0',
        })
        .toBuffer();

      if (buffer.length >= targetMin && buffer.length <= targetMax) {
        bestBuffer = buffer;
        break;
      }

      if (buffer.length < targetMin) {
        if (!bestBuffer || buffer.length > bestBuffer.length) {
          bestBuffer = buffer;
        }
        lowQ = midQ + 1;
      } else {
        highQ = midQ - 1;
      }
    }

    if (bestBuffer && bestBuffer.length >= targetMin && bestBuffer.length <= targetMax) {
      break;
    }
  }

  if (!bestBuffer) {
    bestBuffer = preScaledBuffer;
  }

  fs.writeFileSync(outputPath, bestBuffer);
  console.log(`Optimized ${outputPath}: ${bestBuffer.length} bytes (${(bestBuffer.length / 1024).toFixed(1)} KB)`);
}

const args = process.argv.slice(2);
if (args.length > 0) {
  const input = args[0];
  const output = args[1] || input;
  optimizeImage(input, output).catch(console.error);
} else {
  // If run with no args, check public/images
  console.log('Usage: node scripts/optimize-image.cjs <input-image-path> [output-path]');
}
