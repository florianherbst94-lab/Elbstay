const fs = require('fs');

let content = fs.readFileSync('src/lib/data/apartments.ts', 'utf-8');

// The new apartment details to update
// guests is already 8
// beds should be "3 Betten + 1 Schlafcouch"
// size should be 90
// priceFrom should be 110

content = content.replace(/beds: "4 Betten",\s*bedrooms: 2,\s*bathrooms: 2,\s*size: 80,/g, 'beds: "3 Betten + 1 Schlafcouch",\n    bedrooms: 2,\n    bathrooms: 2,\n    size: 90,');
content = content.replace(/priceFrom: 120,\s*address: {/g, 'priceFrom: 110,\n    address: {');

fs.writeFileSync('src/lib/data/apartments.ts', content);

let pageContent = fs.readFileSync('src/app/(app)/apartments/boutique-2/page.tsx', 'utf-8');
pageContent = pageContent.replace(/80 m²/g, '90 m²');
pageContent = pageContent.replace(/4 Betten/g, '3 Betten + 1 Schlafcouch');
pageContent = pageContent.replace(/"value": 80,/g, '"value": 90,');
pageContent = pageContent.replace(/"price": "120",/g, '"price": "110",');
pageContent = pageContent.replace(/"price": "85",/g, '"price": "110",'); // if it was originally 85

fs.writeFileSync('src/app/(app)/apartments/boutique-2/page.tsx', pageContent);

