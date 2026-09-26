const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = "/Users/florianherbst/Desktop/Marienalee bearbeitet ";
const destDir = path.join(__dirname, 'public', 'images', 'boutique-2');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// Map the folders to our new structure
const folderMap = {
  "Bad 1": "Badezimmer 1",
  "Bad 2": "Badezimmer 2",
  "Flur": "Flur",
  "Küche": "Küche",
  "Schlafen 1": "Schlafzimmer 1",
  "Schlafen 2": "Schlafzimmer 2",
  "Schlafen 3": "Schlafzimmer 3",
  "Schlafen 4": "Schlafzimmer 4",
  "Wohnzimmer": "Wohnbereich"
};

let imageConfig = [];
let highlightImages = [];

const dirs = fs.readdirSync(sourceDir);

for (const dir of dirs) {
  const fullDirPath = path.join(sourceDir, dir);
  if (!fs.statSync(fullDirPath).isDirectory()) continue;
  
  const mappedTitle = folderMap[dir] || dir;
  const files = fs.readdirSync(fullDirPath).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  
  const currentCategoryImages = [];
  
  for (const file of files) {
    const sourcePath = path.join(fullDirPath, file);
    // Sanitize filename to avoid spaces and special chars
    const safeFilename = file.replace(/[^a-zA-Z0-9.-]/g, '_');
    const destPath = path.join(destDir, safeFilename);
    
    // Copy the file
    fs.copyFileSync(sourcePath, destPath);
    
    const webPath = `/images/boutique-2/${safeFilename}`;
    currentCategoryImages.push(webPath);
    
    // Pick the first few good images for Highlights
    if (highlightImages.length < 5 && (file.toLowerCase().includes('gesamt') || file.toLowerCase().includes('wohn') || file.toLowerCase().includes('schlaf'))) {
       // We'll organize highlights manually later if needed, or just let the first few be highlights
    }
  }
  
  if (currentCategoryImages.length > 0) {
    imageConfig.push({
      title: mappedTitle,
      images: currentCategoryImages
    });
  }
}

// Create a Highlights category from the first image of Wohnbereich and Schlafzimmer 1
const wohnbereich = imageConfig.find(c => c.title === "Wohnbereich");
const schlafzimmer = imageConfig.find(c => c.title === "Schlafzimmer 1");

const highlights = {
  title: "Highlights",
  images: []
};

if (wohnbereich && wohnbereich.images.length > 0) highlights.images.push(wohnbereich.images[0]);
if (schlafzimmer && schlafzimmer.images.length > 0) highlights.images.push(schlafzimmer.images[0]);

// Add any other image just to have 4 highlights
for (const cat of imageConfig) {
  if (highlights.images.length >= 4) break;
  if (cat.images.length > 0 && !highlights.images.includes(cat.images[0])) {
     highlights.images.push(cat.images[0]);
  }
}

imageConfig.unshift(highlights);

// Update images.ts
const tsContent = `import { ImageCategory } from "@/lib/images";

export const boutique2Gallery: ImageCategory[] = ${JSON.stringify(imageConfig, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'boutique-2', 'images.ts'), tsContent);

console.log("Images copied and images.ts updated successfully!");
