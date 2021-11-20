import { Avatar } from '@chakra-ui/avatar';
import { Container, Divider, Heading, Stack, Text } from '@chakra-ui/layout';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { SET_POSTS_DATA } from '../../actions/blog';
import Breadcrumb from '../../components/breadcrumb';
import LatestsPosts from '../../components/LatestsPosts';
import Layout, { siteTitle } from '../../components/pageLayout';
import { getSortedPostsData } from '../../lib/posts';
import { RootState } from '../../reducer';
import { wrapper } from '../../store';

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
    // const postsData = getSortedPostsData();
    store.dispatch({ type: SET_POSTS_DATA, posts: getSortedPostsData() });
});

export default function Home() {
    const { posts } = useSelector((state: RootState) => state.server);

    return (
        <Layout>
            <Head>
                <title>Blog - {siteTitle}</title>
            </Head>

            <Container p={4} maxW="4xl">
                <Breadcrumb
                    entries={[
                        {
                            text: 'Home',
                            link: '/',
                            alt: 'go to home page'
                        },
                        {
                            text: 'Blog',
                            link: '/blog',
                            alt: 'go to blog home',
                            isCurrentPage: true
                        }
                    ]}
                />
                <Heading>Blog</Heading>
                <Stack mt={6} direction="row" spacing={4} align="center">
                    <Avatar src={'/icon-48x48.png'} alt="Author" bg="green.500" />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Heading size="xs">Karpouzi</Heading>
                        <Text>
                            {/* <Date dateString={postData.date} />· 6min read */}
                            fafazfazf
                        </Text>
                    </Stack>
                </Stack>
            </Container>

            <Divider maxW="100%" />

            <Container p={{ base: 0, sm: 4 }} maxW="4xl">
                {posts && <LatestsPosts posts={posts} />}
            </Container>
        </Layout>
    );
}
