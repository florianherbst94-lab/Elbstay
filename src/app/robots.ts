import { MetadataRoute } from 'next';
import { siteConfig } from "@/lib/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/wbadd2703', '/wbadd5902', '/wbadd6701'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-Web', 'Google-Extended', 'Applebot-Extended', 'CCBot'],
        allow: '/',
        disallow: ['/admin/', '/api/'],
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
