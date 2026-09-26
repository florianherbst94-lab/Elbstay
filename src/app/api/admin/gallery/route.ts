import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getGalleries } from '@/lib/galleryService';

const CONFIG_FILENAME = 'gallery-config.json';

export async function GET() {
  const galleries = await getGalleries();
  return NextResponse.json(galleries);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Save to Vercel Blob
    const blob = await put(CONFIG_FILENAME, JSON.stringify(data), {
      access: 'public',
      addRandomSuffix: false, // Ensures the filename stays exactly 'gallery-config.json'
      contentType: 'application/json'
    });
    
    return NextResponse.json({ success: true, url: blob.url });
  } catch (err) {
    console.error("Failed to save gallery file:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
