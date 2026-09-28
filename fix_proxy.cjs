const fs = require('fs');
let content = fs.readFileSync('src/proxy.ts', 'utf8');

// replace export default auth with export const proxy = auth
content = content.replace('export default auth((req) => {', 'export const proxy = auth((req) => {');

fs.writeFileSync('src/proxy.ts', content);
