const fs = require('fs');
const path = require('path');
const ids = ['boutique', 'urban', 'premium'];

for (const apt of ids) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'apartments', apt, 'page.tsx');
  let content = fs.readFileSync(pagePath, 'utf8');
  
  if (!content.includes('import { APARTMENTS }')) {
    content = content.replace('import { ViewItemTracker', 'import { APARTMENTS } from "@/lib/data/apartments";\nimport { ViewItemTracker');
    fs.writeFileSync(pagePath, content);
  }
}
