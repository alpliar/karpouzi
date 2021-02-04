import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import LatestsPosts from '../../components/LatestsPosts';
import { getSortedPostsData } from '../../lib/posts';
import { PropTypes } from 'prop-types';

import { Box, Container, Divider, Heading } from '@chakra-ui/react';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    };
}

export default function Home({ allPostsData }) {
    // const [showModal, setShowModal] = useState(false);

    return (
        <Layout>
            <Head>
                <title>Blog - {siteTitle}</title>
            </Head>

            <Container p={0}>
                <Box p={4}>
                    <Heading>Blog</Heading>
                </Box>
                <Divider />
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
