import { MetadataRoute } from 'next';
import { siteConfig } from "@/lib/data/config";
import { APARTMENTS } from "@/lib/data/apartments";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  const seoPages = [
    'ferienwohnung-dresden',
    'ferienwohnung-dresden-neustadt',
    'ferienwohnung-dresden-pieschen',
    'ferienwohnung-dresden-zentrum',
    'monteurwohnung-dresden',
    'business-apartment-dresden',
    'ferienwohnung-dresden-familie',
    'langzeitaufenthalt-dresden',
    'ferienwohnung-dresden-mit-parkplatz',
    'dresden-guide',
    'dresden-guide/neustadt',
    'dresden-guide/pieschen',
    'dresden-guide/altstadt'
  ];

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...APARTMENTS.map((apt) => ({
      url: `${baseUrl}${apt.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...seoPages.map(page => ({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    {
      url: `${baseUrl}/apartments`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
