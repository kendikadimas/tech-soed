/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://techsoe.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/googlec89a64b5fe216935.html', '/googlee2a92e08e8dc4a4c.html'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
