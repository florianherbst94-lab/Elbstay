const fs = require('fs');

let content = fs.readFileSync('src/components/apartment/ApartmentCard.tsx', 'utf-8');

// Change href={`/apartments/${type.toLowerCase()}`} 
// to href={id ? `/apartments/${id}` : `/apartments/${type.toLowerCase()}`}
// Note: slug from ApartmentData could be used instead. 
content = content.replace(/href=\{`\/apartments\/\$\{type\.toLowerCase\(\)\}`\}/g, "href={`/apartments/${id}`}");
content = content.replace(/href=\{`\/apartments\/\$\{type\.toLowerCase\(\)\}#book`\}/g, "href={`/apartments/${id}#book`}");

fs.writeFileSync('src/components/apartment/ApartmentCard.tsx', content);
