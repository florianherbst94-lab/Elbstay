import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!['urban', 'premium', 'boutique', 'boutique-2'].includes(type)) {
      return NextResponse.json({ error: "Invalid apartment type" }, { status: 400 });
    }

    // Create a safe, unique filename
    const filename = `${type}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false // We already added a timestamp
    });
    
    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Error uploading file: " + String(error) }, { status: 500 });
  }
}
