const fs = require('fs');
let file = fs.readFileSync('src/app/(app)/apartments/boutique-2/page.tsx', 'utf-8');

file = file.replace(/boutiqueGallery/g, 'boutique2Gallery');
file = file.replace(/@\/lib\/boutique\/images/, '@/lib/boutique-2/images');
file = file.replace(/ElbStay Boutique-Apartment(?!\s*nahe der Elbe)/g, 'ElbStay Boutique-Apartment nahe der Elbe');
file = file.replace(/Stilvolles Boutique-Apartment in Dresden-Pieschen.*?Komfort\./g, 'Großzügiges Boutique-Apartment in Dresden. Mit 2 Schlafzimmern, 2 Bädern und Platz für bis zu 8 Gäste.');
file = file.replace(/4 Gäste/g, '8 Gäste');
file = file.replace(/48 m²/g, '80 m²');
file = file.replace(/1 Bett \+ 1 Schlafcouch/g, '4 Betten');
file = file.replace(/1 Badezimmer/g, '2 Badezimmer');
file = file.replace(/a\.id\.includes\('boutique'\)/g, "a.id === 'boutique-2'");

file = file.replace(/<p>\s*Willkommen in unserem frisch renovierten Boutique-Apartment in Dresden-Pieschen.*<\/p>/, '<p>Willkommen im ElbStay Boutique Apartment – stilvoll, großzügig und ideal für bis zu 8 Gäste.</p>');

fs.writeFileSync('src/app/(app)/apartments/boutique-2/page.tsx', file);
