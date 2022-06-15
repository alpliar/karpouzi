/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.NEXT_PUBLIC_URL,
    generateRobotsTxt: true,
    exclude: ['/server-sitemap-index.xml'],
    robotsTxtOptions: {
        additionalSitemaps: [`${process.env.NEXT_PUBLIC_URL}/server-sitemap-index.xml`]
    }
};

module.exports = config;
