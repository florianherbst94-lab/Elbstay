const fs = require('fs');
let content = fs.readFileSync('src/app/api/admin/upload/route.ts', 'utf-8');

content = content.replace(
  /\!\[\'urban\', \'premium\', \'boutique\'\]\.includes\(type\)/, 
  "!['urban', 'premium', 'boutique', 'boutique-2'].includes(type)"
);

fs.writeFileSync('src/app/api/admin/upload/route.ts', content);
