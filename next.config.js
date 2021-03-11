const withPWA = require('next-pwa');
const withImages = require('next-images');
const runtimeCaching = require('next-pwa/cache');

module.exports = withImages(
    withPWA({
        pwa: {
            dest: 'public',
            register: true,
            runtimeCaching,
            publicExcludes: ['!robots.txt']
        },
        images: {
            domains: ['fakeimg.pl', 'images.unsplash.com']
        },
        i18n: {
            locales: ['en', 'fr', 'es'],
            defaultLocale: 'en'
        }
    })
);
