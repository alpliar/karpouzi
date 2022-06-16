/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
// const withImages = require('next-images');
const runtimeCaching = require('next-pwa/cache');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports =
    // withImages(
    withBundleAnalyzer(
        withPWA({
            pwa: {
                dest: 'public',
                // disable: process.env.NODE_ENV === 'development',
                register: true,
                runtimeCaching,
                publicExcludes: ['!robots.txt']
            },
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
            }
        })
    );
// );
