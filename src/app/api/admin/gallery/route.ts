import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { urbanGallery, premiumGallery } from '@/lib/images';
import { boutiqueGallery } from '@/lib/boutique/images';

export async function GET() {
  return NextResponse.json({ urbanGallery, premiumGallery, boutiqueGallery });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // We are going to directly write to the src/lib/images.ts file.
    // This allows the local dev server to immediately pick up the changes.
    const filePath = path.join(process.cwd(), 'src', 'lib', 'images.ts');
    
    let content = `export interface ImageCategory {\n  title: string;\n  images: string[];\n}\n\n`;
    content += `export const urbanGallery: ImageCategory[] = ${JSON.stringify(data.urbanGallery, null, 2)};\n\n`;
    content += `export const premiumGallery: ImageCategory[] = ${JSON.stringify(data.premiumGallery, null, 2)};\n`;

    fs.writeFileSync(filePath, content, 'utf8');
    
    if (data.boutiqueGallery) {
      const boutiquePath = path.join(process.cwd(), 'src', 'lib', 'boutique', 'images.ts');
      let boutiqueContent = `import { ImageCategory } from "@/lib/images";\n\n`;
      boutiqueContent += `export const boutiqueGallery: ImageCategory[] = ${JSON.stringify(data.boutiqueGallery, null, 2)};\n`;
      fs.writeFileSync(boutiquePath, boutiqueContent, 'utf8');
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save gallery file:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
