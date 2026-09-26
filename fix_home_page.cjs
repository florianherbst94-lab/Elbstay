const fs = require('fs');

const file = 'src/app/(app)/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (content.includes('"use client"')) {
  // It's a client component, we shouldn't be running server functions directly inside it
  content = content.replace(/import \{ getGalleries \} from "@\/lib\/galleryService";\n/, "");
  content = content.replace(/const \{ urbanGallery, premiumGallery, boutiqueGallery, boutique2Gallery \} = await getGalleries\(\);\n/, "");
  content = content.replace(/async function Home\(\) \{/, "function Home() {");
  
  // Actually, how did it get galleries before? Let's revert it.
  content = fs.readFileSync(file, 'utf8'); // reload
  
  // Remove the async and await getGalleries stuff
  content = content.replace(/const \{ urbanGallery, premiumGallery, boutiqueGallery, boutique2Gallery \} = await getGalleries\(\);\n/g, "");
  
  // Instead of importing from galleryService, import directly from images again
  content = content.replace(/import \{ getGalleries \} from "@\/lib\/galleryService";/g, "");
  
  if (!content.includes('urbanGallery')) {
    content = content.replace(
      /import \{ APARTMENTS \} from "@\/lib\/data\/apartments";/,
      `import { APARTMENTS } from "@/lib/data/apartments";
import { urbanGallery, premiumGallery } from "@/lib/images";
import { boutiqueGallery } from "@/lib/boutique/images";
import { boutique2Gallery } from "@/lib/boutique-2/images";`
    );
  }
  
  // It shouldn't be async
  content = content.replace(/export default async function Home\(\) \{/, "export default function Home() {");
  
  fs.writeFileSync(file, content);
  console.log("Restored home page to sync Client Component.");
}
