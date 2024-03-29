import { useColorModeValue } from '@chakra-ui/color-mode';
import { Container } from '@chakra-ui/layout';
import { ThemingProps } from '@chakra-ui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './PageFooter';

export const siteTitle = `Karpouzi`;

interface PageLayoutProps {
    children: React.ReactNode;
    colorScheme?: ThemingProps['colorScheme'];
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, colorScheme }) => {
    const themeColor: string = useColorModeValue('#48BB78', '#2A4F3A');
    const router = useRouter();
    const canonicalUrl = router.asPath;
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
                />
                <meta name="description" content={`${siteTitle} e-shop`} />
                <meta name="keywords" content="Keywords" />
                <title>{siteTitle}</title>
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="og:url" content={canonicalUrl} />
                <meta name="twitter:card" content="summary_large_image" />

                <link rel="manifest" href="/manifest.json" />
                <link href="/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/icon-512x512.png"></link>

                <meta name="theme-color" content={themeColor} />
            </Head>

            <Header colorScheme={colorScheme} />

            <Container p={0} as="main" maxW="100%">
                {children}
            </Container>

            <Footer colorScheme={colorScheme} />
        </>
    );
};

export default PageLayout;
