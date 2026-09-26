const fs = require('fs');

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  const hasGalleries = content.includes('Gallery } from "@/lib/');
  const isPage = file.endsWith('page.tsx');
  
  if (hasGalleries && isPage) {
    // Inject the import
    if (!content.includes('import { getGalleries }')) {
      content = content.replace(/(import .* from "lucide-react";|import type \{ Metadata \} from "next";|import \{ ApartmentGallery.*)/, "$1\nimport { getGalleries } from \"@/lib/galleryService\";");
    }
    
    // Remove static imports
    content = content.replace(/import \{.*Gallery.*\} from "@\/lib\/.*?images";\n/g, "");
    
    // Update the component function
    // Match "export default function BoutiqueApartment() {" or similar
    const compMatch = content.match(/export default (async )?function \w+\([^)]*\) \{/);
    if (compMatch) {
      let functionDef = compMatch[0];
      if (!compMatch[1]) {
        // Add async if missing
        functionDef = compMatch[0].replace('function', 'async function');
        content = content.replace(compMatch[0], functionDef);
      }
      
      // Inject the fetch inside the component
      if (!content.includes('await getGalleries()')) {
        content = content.replace(
          functionDef, 
          `${functionDef}\n  const { urbanGallery, premiumGallery, boutiqueGallery, boutique2Gallery } = await getGalleries();`
        );
      }
    }
    
    fs.writeFileSync(file, content);
    console.log("Updated", file);
  }
}

// Manually target the files:
processFile('src/app/(app)/apartments/urban/page.tsx');
processFile('src/app/(app)/apartments/premium/page.tsx');
processFile('src/app/(app)/apartments/boutique/page.tsx');
processFile('src/app/(app)/apartments/boutique-2/page.tsx');
processFile('src/app/(app)/apartments/page.tsx');
processFile('src/app/(app)/page.tsx');

