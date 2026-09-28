const fs = require('fs');
let content = fs.readFileSync('.env.local', 'utf8');
content += `\nAUTH_SECRET="secret123"\nAUTH_URL="http://localhost:3000"\nDATABASE_URL="postgresql://test:test@localhost:5432/test"\nHOSPITABLE_API_TOKEN="token"\n`;
fs.writeFileSync('.env.local', content);
