const fs = require('fs');

let content = fs.readFileSync('src/components/apartment/ApartmentCard.tsx', 'utf-8');

// The links were hardcoded to type.toLowerCase() which maps both boutique-2 and boutique to /apartments/boutique
// Let's use the ID for the link instead. But wait, in the routes it's currently hardcoded:
// /apartments/boutique, /apartments/premium, /apartments/urban, /apartments/boutique-2

content = content.replace(/href=\{`\/apartments\/\$\{type\.toLowerCase\(\)\}`\}/g, "href={`/apartments/${id.replace('-1', '')}`}");
content = content.replace(/href=\{`\/apartments\/\$\{type\.toLowerCase\(\)\}#book`\}/g, "href={`/apartments/${id.replace('-1', '')}#book`}");

fs.writeFileSync('src/components/apartment/ApartmentCard.tsx', content);
