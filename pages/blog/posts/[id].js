import Head from 'next/head';
import Layout from '../../../components/layout';
import Date from '../../../components/Date';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import { Box, Container, Divider, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <Container p={4} maxW="4xl">
                <Heading size="xl" mb={4}>
                    {postData.title}
                </Heading>
                <Heading size="xs">
                    <Date dateString={postData.date} />
                </Heading>
            </Container>
            <Divider w="100%" />
            <Container p={4} maxW="4xl">
                <Box dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </Container>
        </Layout>
    );
}

Post.propTypes = {
    postData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        contentHtml: PropTypes.string.isRequired
    }).isRequired
};
