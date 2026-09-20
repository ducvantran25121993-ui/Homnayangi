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

  // Iteratively adjust width and quality to hit 50KB - 60KB (51,200 - 61,440 bytes)
  let bestBuffer = null;
  let bestQuality = 80;
  for (const w of [680, 640, 600, 580, 540, 500, 480]) {
    for (let q = 88; q >= 40; q -= 2) {
      const buffer = await sharp(inputPath)
        .resize({ width: w, withoutEnlargement: true })
        .jpeg({
          quality: q,
          progressive: true,
          chromaSubsampling: '4:2:0',
        })
        .toBuffer();

      if (buffer.length >= targetMin && buffer.length <= targetMax) {
        bestBuffer = buffer;
        bestQuality = q;
        break;
      }
      if (buffer.length <= targetMax && (!bestBuffer || buffer.length > bestBuffer.length)) {
        bestBuffer = buffer;
        bestQuality = q;
      }
    }
    if (bestBuffer && bestBuffer.length >= targetMin && bestBuffer.length <= targetMax) {
      break;
    }
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
