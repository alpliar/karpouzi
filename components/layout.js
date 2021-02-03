import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';
import { Box, Container } from '@chakra-ui/react';

export const siteTitle = `MyWebsite`;

export default function Layout({ children, home = false }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <Header siteTitle={siteTitle} />

            <Container p={0} as="main">
                {children}
            </Container>

            {!home && (
                <Box p={4} textAlign="center">
                    <Link href="/">
                        <a alt="go back to home">← Back to home</a>
                    </Link>
                </Box>
            )}
            <Footer />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    home: PropTypes.bool
};
