import { list } from '@vercel/blob';
import { ImageCategory } from '@/lib/images';

const CONFIG_FILENAME = 'gallery-config.json';

export interface GalleriesData {
  urbanGallery: ImageCategory[];
  premiumGallery: ImageCategory[];
  boutiqueGallery: ImageCategory[];
  boutique2Gallery: ImageCategory[];
}

export async function getGalleries(): Promise<GalleriesData> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list({ prefix: CONFIG_FILENAME });
      const configBlob = blobs.find(b => b.pathname === CONFIG_FILENAME);
      
      if (configBlob) {
        const response = await fetch(configBlob.url, { next: { revalidate: 60 } }); // Cache for 60 seconds
        if (response.ok) {
          const data = await response.json();
          // Ensure we return valid arrays even if data is missing some fields
          return {
            urbanGallery: data.urbanGallery || [],
            premiumGallery: data.premiumGallery || [],
            boutiqueGallery: data.boutiqueGallery || [],
            boutique2Gallery: data.boutique2Gallery || []
          };
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch remote gallery config:", err);
  }

  // Fallback to static code config
  const { urbanGallery, premiumGallery } = await import('@/lib/images');
  const { boutiqueGallery } = await import('@/lib/boutique/images');
  const { boutique2Gallery } = await import('@/lib/boutique-2/images');
  
  return { 
    urbanGallery: urbanGallery || [], 
    premiumGallery: premiumGallery || [], 
    boutiqueGallery: boutiqueGallery || [], 
    boutique2Gallery: boutique2Gallery || []
  };
}
