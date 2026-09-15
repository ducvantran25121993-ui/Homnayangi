const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Optimizes an image to land between minBytes and maxBytes (defaults to 50KB - 60KB).
 * Strips metadata, applies 4:2:0 subsampling, progressive jpeg / high-efficiency compression.
 */
function optimizeImage(filePath, minBytes = 51200, maxBytes = 61440) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  
  const originalSize = fs.statSync(filePath).size;
  console.log(`\nOptimizing ${filePath} (Original: ${(originalSize / 1024).toFixed(1)} KB)...`);
  
  const target = (minBytes + maxBytes) / 2;
  let closestFile = null;
  let closestDiff = Infinity;
  let foundExact = false;

  // Search through reasonable dimensions for web cards (540px - 720px width)
  const widths = [680, 640, 600, 560, 520, 480];
  
  for (const width of widths) {
    if (foundExact) break;
    for (let q = 88; q >= 40; q -= 1) {
      const tmpPath = path.join('/tmp', `opt_${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`);
      try {
        execSync(`convert "${filePath}" -strip -interlace Plane -sampling-factor 4:2:0 -resize ${width}x -quality ${q} "${tmpPath}"`, { stdio: 'ignore' });
        const size = fs.statSync(tmpPath).size;
        
        if (size >= minBytes && size <= maxBytes) {
          fs.copyFileSync(tmpPath, filePath);
          fs.unlinkSync(tmpPath);
          console.log(`✨ Hit target: ${(size / 1024).toFixed(1)} KB (${size} bytes) [width: ${width}px, quality: ${q}%]`);
          foundExact = true;
          break;
        }

        const diff = Math.abs(size - target);
        if (diff < closestDiff) {
          closestDiff = diff;
          if (closestFile && fs.existsSync(closestFile)) fs.unlinkSync(closestFile);
          closestFile = tmpPath;
        } else {
          fs.unlinkSync(tmpPath);
        }
      } catch (err) {
        if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      }
    }
  }

  if (!foundExact && closestFile && fs.existsSync(closestFile)) {
    const finalSize = fs.statSync(closestFile).size;
    fs.copyFileSync(closestFile, filePath);
    fs.unlinkSync(closestFile);
    console.log(`Closest match achieved: ${(finalSize / 1024).toFixed(1)} KB (${finalSize} bytes)`);
  }
}

// Support command line arguments or run for default images
const args = process.argv.slice(2);
if (args.length > 0) {
  args.forEach(file => optimizeImage(file));
} else {
  optimizeImage('./public/images/ba_chi_rang.jpg');
  optimizeImage('./public/images/com_nieu_bo_tieu_den.jpg');
}
