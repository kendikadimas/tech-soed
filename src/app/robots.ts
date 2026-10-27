import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/admin/'],
            },
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'Google-Extended',
                    'ClaudeBot',
                    'anthropic-ai',
                    'PerplexityBot',
                    'Applebot-Extended',
                    'cohere-ai',
                ],
                allow: '/',
                disallow: ['/admin', '/admin/'],
            },
        ],
        sitemap: 'https://techsoe.com/sitemap.xml',
    };
}
