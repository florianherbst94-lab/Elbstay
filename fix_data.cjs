const fs = require('fs');

let content = fs.readFileSync('src/lib/data/apartments.ts', 'utf-8');

// The boutique2 gallery is still pointing to the Airbnb URL as fallback for the first image
content = content.replace(
  /imageUrl: boutique2Gallery\[0\]\?\.images\[0\] \|\| "https:\/\/a0.muscache.com\/im\/pictures\/hosting\/Hosting-1781405111319682049\/original\/b7bf01d9-dea2-4143-823a-21afccc10266.png",/g,
  'imageUrl: boutique2Gallery[0]?.images[0] || "/images/boutique-2/image-1.png",'
);

fs.writeFileSync('src/lib/data/apartments.ts', content);
