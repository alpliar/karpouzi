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
                <title>{siteTitle}</title>
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
