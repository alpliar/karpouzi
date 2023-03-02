import { Handlee, Montserrat, PT_Sans_Caption } from '@next/font/google';

const headingFont = Montserrat({
    weight: ['300', '700'],
    subsets: ['latin-ext'],
    display: 'swap',
    fallback: ['sans-serif']
});
const bodyFont = PT_Sans_Caption({
    subsets: ['latin-ext'],
    display: 'swap',
    weight: ['400', '700'],
    fallback: ['sans-serif']
});
const cursiveFont = Handlee({
    weight: ['400'],
    display: 'swap',
    subsets: ['latin'],
    fallback: ['cursive', 'Comic Sans MS']
});

const fonts = {
    body: bodyFont.style.fontFamily,
    heading: headingFont.style.fontFamily,
    cursive: cursiveFont.style.fontFamily
};

export default fonts;
