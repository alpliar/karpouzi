/* eslint-disable @typescript-eslint/no-var-requires */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
    dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    register: true,
    runtimeCaching,
    publicExcludes: ['!robots.txt']
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPWA({
    images: {
        domains: ['media.graphassets.com']
    },
    i18n: {
        locales: ['en', 'fr', 'es', 'el'],
        defaultLocale: 'en'
    },
    compiler: {
        removeConsole: {
            exclude: ['error']
        }
    },
    swcMinify: true
});

module.exports = nextConfig;
