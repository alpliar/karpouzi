import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';
import LatestsPosts from '../../components/LatestsPosts';
import { getSortedPostsData } from '../../lib/posts';
import { PropTypes } from 'prop-types';

import { Container, Divider, Heading } from '@chakra-ui/react';

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

            <Container p={4} maxW="4xl">
                <Heading>Blog</Heading>
            </Container>

            <Divider maxW="100%" />

            <Container p={4} maxW="4xl">
                <LatestsPosts posts={allPostsData} />
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
