import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/data/config';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    const indexNowKey = "165edcf94b274299b820a8cc72dff1b4";
    const host = new URL(siteConfig.url).hostname;

    const payload = {
      host: host,
      key: indexNowKey,
      keyLocation: `${siteConfig.url}/${indexNowKey}.txt`,
      urlList: [url]
    };

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to submit to IndexNow" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
