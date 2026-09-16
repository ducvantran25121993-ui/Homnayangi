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

  // Iteratively adjust quality to hit 50KB - 60KB
  let minQ = 50;
  let maxQ = 95;
  let bestBuffer = null;
  let bestQuality = 80;

  for (let q = 88; q >= 50; q -= 3) {
    const buffer = await sharp(inputPath)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .jpeg({
        quality: q,
        progressive: true,
        chromaSubsampling: '4:2:0',
      })
      .toBuffer();

    if (buffer.length <= targetMax) {
      if (!bestBuffer || buffer.length >= targetMin || buffer.length > bestBuffer.length) {
        bestBuffer = buffer;
        bestQuality = q;
        if (buffer.length >= targetMin && buffer.length <= targetMax) {
          break;
        }
      }
    }
  }

  if (!bestBuffer) {
    // Fallback resize width slightly smaller if still > 60KB
    bestBuffer = await sharp(inputPath)
      .resize({ width: 560, withoutEnlargement: true })
      .jpeg({
        quality: 68,
        progressive: true,
        chromaSubsampling: '4:2:0',
      })
      .toBuffer();
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
