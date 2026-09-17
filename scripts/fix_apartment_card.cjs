const fs = require('fs');
const path = require('path');

const cardPath = path.join(__dirname, '..', 'src', 'components', 'apartment', 'ApartmentCard.tsx');
let content = fs.readFileSync(cardPath, 'utf8');

if (!content.includes('district?: string')) {
  content = content.replace('priceFrom: number;', 'priceFrom: number;\n  district?: string;');
  content = content.replace('priceFrom,\n}: ApartmentCardProps) {', 'priceFrom,\n  district,\n}: ApartmentCardProps) {');
  
  content = content.replace(
    '<span className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm">',
    '<span className="bg-background/90 backdrop-blur-sm text-foreground px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md shadow-sm">\n            {district ? district : `ElbStay ${type}`}'
  );
  content = content.replace('ElbStay {type}\n          </span>', '</span>');
  
  fs.writeFileSync(cardPath, content);
}
