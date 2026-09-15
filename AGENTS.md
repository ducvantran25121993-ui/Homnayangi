# Instructions for AI Coding Agent

## Food Illustration Images Guidelines
- **Target Size**: All food dish illustration images generated or added to `/public/images/` must be optimized to **50 KB - 60 KB** (between 51,200 and 61,440 bytes).
- **Tooling**: Use the provided script `node scripts/optimize-image.cjs <path-to-image>` or `npm run optimize:images` to automatically compress and optimize any newly generated or modified images while maintaining high visual clarity (subsampling 4:2:0, progressive scan, width 520-680px).
