/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.propmatics.com",  // ✅ Change to your domain
  generateRobotsTxt: true,                // ✅ Auto-generate robots.txt
  sitemapSize: 7000,                       // Split large sitemaps if needed
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/admin/*", "/api/*"],         // ✅ Block private paths
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" }
    ],
    additionalSitemaps: [
      "https://www.propmatics.com/sitemap.xml",  // Add more if needed
    ],
  },
};
