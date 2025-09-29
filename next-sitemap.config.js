/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.propmatics.com", // 👈 your live domain
  generateRobotsTxt: true, // (optional but recommended)
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/private/*"], // 👈 optional exclusions
};
