const fs = require('fs');
const path = require('path');

const ids = ['boutique', 'urban', 'premium'];

for (const apt of ids) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', '(app)', 'apartments', apt, 'page.tsx');
  let content = fs.readFileSync(pagePath, 'utf8');
  
  if (!content.includes('view_item')) {
    content = content.replace(
      'import { ApartmentHeaderGallery } from "@/components/apartment/ApartmentHeaderGallery";',
      'import { ApartmentHeaderGallery } from "@/components/apartment/ApartmentHeaderGallery";\nimport { event as gaEvent } from "@/components/layout/GoogleAnalytics";\nimport { useEffect } from "react";'
    );
    
    const useEffectString = `  useEffect(() => {
    gaEvent({
      action: "view_item",
      category: "ecommerce",
      label: apartment.name,
      value: apartment.priceFrom,
      items: [{
        item_id: apartment.id,
        item_name: apartment.name,
        price: apartment.priceFrom,
        item_category: "Apartment"
      }]
    });
  }, []);\n\n`;

    content = content.replace('const apartment = APARTMENTS', useEffectString + '  const apartment = APARTMENTS');
    fs.writeFileSync(pagePath, content);
  }
}
