import Head from 'next/head';
import Layout from '../../../components/pageLayout';
import Date from '../../../components/Date';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import { Box, Container, Divider, Heading } from '@chakra-ui/react';

import PropTypes from 'prop-types';
import Breadcrumb from '../../../components/breadcrumb';

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
            <Container pt={2} maxW="4xl">
                <Breadcrumb
                    entries={[
                        {
                            text: 'Blog',
                            link: '/blog',
                            alt: 'go back to blog home',
                            isCurrentPage: false
                        },
                        { text: postData.id, link: '', alt: '', isCurrentPage: true }
                    ]}
                />
            </Container>

            <Container px={4} py={4} maxW="4xl">
                <Heading size="xl" mb={4} pr="20%">
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
