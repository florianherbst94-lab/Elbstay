import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import { urbanGallery, premiumGallery } from '@/lib/images';
import { boutiqueGallery } from '@/lib/boutique/images';

const execAsync = util.promisify(exec);

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
    
    // Auto-commit and push changes
    try {
      console.log("Committing and pushing gallery updates...");
      await execAsync('git add src/lib/images.ts src/lib/boutique/images.ts public/images && git commit -m "chore(gallery): Update images via admin interface" && git push origin main');
      console.log("Push successful");
    } catch (gitErr) {
      console.error("Git push failed:", gitErr);
      // We still return success since the files were written, but maybe warn the user
      return NextResponse.json({ success: true, warning: "Files saved locally but Git push failed. Please push manually." });
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save gallery file:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
