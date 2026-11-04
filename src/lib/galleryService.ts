import { list } from '@vercel/blob';
import { ImageCategory } from '@/lib/images';
import { APARTMENTS, ApartmentData } from '@/lib/data/apartments';

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
        const response = await fetch(configBlob.url, { next: { tags: ['gallery'], revalidate: 60 } }); // Cache with tag for explicit revalidation
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

export async function getDynamicApartments(): Promise<ApartmentData[]> {
  const galleries = await getGalleries();
  
  return APARTMENTS.map(apt => {
    let gallery = apt.gallery;
    if (apt.id === 'boutique' && galleries.boutiqueGallery?.length > 0) gallery = galleries.boutiqueGallery;
    if (apt.id === 'premium-1' && galleries.premiumGallery?.length > 0) gallery = galleries.premiumGallery;
    if (apt.id === 'urban-1' && galleries.urbanGallery?.length > 0) gallery = galleries.urbanGallery;
    if (apt.id === 'boutique-2' && galleries.boutique2Gallery?.length > 0) gallery = galleries.boutique2Gallery;
    
    return {
      ...apt,
      gallery,
      imageUrl: gallery?.[0]?.images?.[0] || apt.imageUrl
    };
  });
}
