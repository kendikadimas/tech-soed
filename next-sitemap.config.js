/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://techsoe.com',
  generateRobotsTxt: false, // Managed by Next.js app/robots.ts
  sitemapSize: 7000,
  exclude: [
    '/googlec89a64b5fe216935.html',
    '/googlee2a92e08e8dc4a4c.html',
    '/admin',
    '/admin/*',
    '/admin/**',
  ],
};
