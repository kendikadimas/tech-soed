import { MetadataRoute } from 'next';
import { createPublicClient } from '@/lib/supabase/public';
import { blogPosts } from '@/lib/blogData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://techsoe.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/syarat-dan-ketentuan`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/kebijakan-privasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  let articleRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = createPublicClient();
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, updated_at, created_at')
      .eq('published', true);

    if (articles && articles.length > 0) {
      articleRoutes = articles.map((art) => ({
        url: `${baseUrl}/blog/${art.slug}`,
        lastModified: new Date(art.updated_at || art.created_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    } else {
      articleRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (err) {
    articleRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  }

  return [...staticRoutes, ...articleRoutes];
}
