const fs = require('fs');
const path = require('path');
const ids = ['boutique', 'urban', 'premium'];

for (const apt of ids) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'apartments', apt, 'page.tsx');
  let content = fs.readFileSync(pagePath, 'utf8');
  
  if (content.includes('<ViewItemTracker item={apartment} />')) {
    // We need to pass the object from APARTMENTS
    // The apartment object is already found as `const apartment = APARTMENTS.find(a => a.id === '...');` in some cases
    // Wait, let's see if `const apartment = ...` exists.
    content = content.replace('<ViewItemTracker item={apartment} />', `<ViewItemTracker item={APARTMENTS.find(a => a.id.includes('${apt}'))} />`);
    fs.writeFileSync(pagePath, content);
  }
}
