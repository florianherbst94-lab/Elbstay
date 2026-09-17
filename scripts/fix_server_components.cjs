const fs = require('fs');
const path = require('path');

const ids = ['boutique', 'urban', 'premium'];

for (const apt of ids) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'apartments', apt, 'page.tsx');
  let content = fs.readFileSync(pagePath, 'utf8');
  
  content = content.replace('import { event as gaEvent } from "@/components/layout/GoogleAnalytics";', 'import { ViewItemTracker } from "@/components/layout/GoogleAnalytics";');
  content = content.replace('import { useEffect } from "react";\n', '');
  
  const regex = /  useEffect\(\(\) => \{\n    gaEvent\(\{\n      action: "view_item",\n      category: "ecommerce",\n      label: apartment\.name,\n      value: apartment\.priceFrom,\n      items: \[\{\n        item_id: apartment\.id,\n        item_name: apartment\.name,\n        price: apartment\.priceFrom,\n        item_category: "Apartment"\n      \}\]\n    \}\);\n  \}, \[\]\);\n\n/;
  content = content.replace(regex, '');
  
  content = content.replace('<ApartmentHeaderGallery', '<ViewItemTracker item={apartment} />\n      <ApartmentHeaderGallery');
  
  fs.writeFileSync(pagePath, content);
}
