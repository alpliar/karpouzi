/* eslint-disable @typescript-eslint/no-var-requires */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
    dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    register: true,
    runtimeCaching,
    publicExcludes: ['!robots.txt']
});
const i18nConfig = require('./constants/i18n.config.json');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withPWA({
    images: {
        domains: ['media.graphassets.com']
    },
    i18n: {
        locales: i18nConfig.supportedLocales,
        defaultLocale: i18nConfig.defaultLocale
    },
    compiler: {
        removeConsole: {
            exclude: ['error']
        }
    },
    swcMinify: true,
    experimental: {
        scrollRestoration: true
    }
    // modularizeImports: {
    //     '@chakra-ui/react': {
    //         transform: '@chakra-ui/core/dist/{{member}}'
    //     }
    // }
});

module.exports = nextConfig;
