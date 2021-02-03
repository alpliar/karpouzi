import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import LatestsPosts from '../components/LatestsPosts';
import { getSortedPostsData } from '../lib/posts';
import { PropTypes } from 'prop-types';

import { Box, Button, Container, Divider, Heading, useToast } from '@chakra-ui/react';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    };
}

function ToastExample() {
    const toast = useToast();
    return (
        <Button
            onClick={() =>
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                })
            }>
            Show Toast
        </Button>
    );
}

export default function Home({ allPostsData }) {
    // const [showModal, setShowModal] = useState(false);

    return (
        <Layout home={true}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
                />
                <meta name="description" content="Description" />
                <meta name="keywords" content="Keywords" />
                <title>{siteTitle}</title>
                <link rel="manifest" href="/manifest.json" />
                <link href="/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
                <link href="/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/icon-512x512.png"></link>

                <meta name="theme-color" content="#000" />
            </Head>

            <Container p={0}>
                <Box p={4}>
                    <ToastExample />
                </Box>

                <Box p={4}>
                    <Heading>Hi, welcome !</Heading>
                    <Divider />
                </Box>

                <Box p={4}>
                    <LatestsPosts posts={allPostsData} />
                </Box>
            </Container>
        </Layout>
    );
}

Home.propTypes = {
    allPostsData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            date: PropTypes.string,
            title: PropTypes.string
        })
    )
};
