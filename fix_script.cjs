const fs = require('fs');

const file = 'src/app/layout.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /strategy="lazyOnload"/g, 
  'strategy="afterInteractive"'
);

fs.writeFileSync(file, content);
console.log("Updated", file);
