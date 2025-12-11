const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/tehesmol.png');
const outputDir = path.join(__dirname, '../public');

const sizes = [
  { name: 'favicon.ico', size: 32, format: 'ico' },
  { name: 'favicon-16x16.png', size: 16, format: 'png' },
  { name: 'favicon-32x32.png', size: 32, format: 'png' },
  { name: 'apple-touch-icon.png', size: 180, format: 'png' },
  { name: 'android-chrome-192x192.png', size: 192, format: 'png' },
  { name: 'android-chrome-512x512.png', size: 512, format: 'png' },
];

async function generateFavicons() {
  try {
    // Ensure input file exists
    if (!fs.existsSync(inputPath)) {
      console.error('Input file not found:', inputPath);
      process.exit(1);
    }

    // Generate each favicon size
    for (const { name, size, format } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      if (format === 'ico') {
        // For ICO, generate 32x32 size
        await sharp(inputPath)
          .resize(size, size, { 
            kernel: sharp.kernel.nearest,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .toFile(outputPath);
      } else {
        await sharp(inputPath)
          .resize(size, size, { 
            kernel: sharp.kernel.nearest,
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .toFile(outputPath);
      }
      
      console.log(`Generated: ${name}`);
    }

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
