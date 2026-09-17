const fs = require('fs');
const path = require('path');
const ids = ['boutique', 'urban', 'premium'];

for (const apt of ids) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'apartments', apt, 'page.tsx');
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Need to make sure APARTMENTS is imported correctly
  if (content.includes(`APARTMENTS.find(a => a.id.includes('${apt}')) || APARTMENTS[0]`)) {
    // If it's undefined, provide a fallback to avoid errors
    content = content.replace(
      `<ViewItemTracker item={APARTMENTS.find(a => a.id.includes('${apt}')) || APARTMENTS[0]} />`,
      `<ViewItemTracker item={APARTMENTS.find(a => a.id.includes('${apt}'))!} />`
    );
    fs.writeFileSync(pagePath, content);
  }
}
