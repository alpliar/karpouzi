const withPWA = require('next-pwa');
// const withImages = require('next-images');
const runtimeCaching = require('next-pwa/cache');

module.exports =
    // withImages(
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
            locales: ['en', 'fr', 'es', 'gr'],
            defaultLocale: 'en'
        }
    });
// );
