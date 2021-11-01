import Head from 'next/head';
import Layout from '../../../components/pageLayout';
import Date from '../../../components/Date';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import { Avatar, Text, Stack, Box, Container, Divider, Heading } from '@chakra-ui/react';

import PropTypes from 'prop-types';
import Breadcrumb from '../../../components/breadcrumb';
import { sanitizeText } from '../../../utils/sanitize';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.slug);
    return {
        props: {
            postData
        }
    };
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: true
    };
}

export default function Post({ postData }) {
    if (!postData) {
        return false;
    }
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
                <Stack mt={6} direction="row" spacing={4} align="center">
                    <Avatar src={'/icon-48x48.png'} alt="Author" bg="green.500" />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Heading size="xs">Karpouzi</Heading>
                        <Text>
                            <Date dateString={postData.date} />· 6min read
                        </Text>
                    </Stack>
                </Stack>
            </Container>

            <Divider w="100%" />

            <Container p={4} maxW="4xl">
                <Box
                    className="externalHtml"
                    dangerouslySetInnerHTML={{ __html: sanitizeText(postData.contentHtml) }}
                />
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
    })
};
