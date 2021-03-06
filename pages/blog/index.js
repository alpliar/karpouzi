import { Container, Divider, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { SET_POSTS_DATA } from '../../actions/blog';
import LatestsPosts from '../../components/LatestsPosts';
import Layout, { siteTitle } from '../../components/pageLayout';
import { getSortedPostsData } from '../../lib/posts';
import { wrapper } from '../../store';

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
    const postsData = getSortedPostsData();
    store.dispatch({ type: SET_POSTS_DATA, payload: postsData });
});

export default function Home() {
    const { postsData } = useSelector((state) => state.blog);

    return (
        <Layout>
            <Head>
                <title>Blog - {siteTitle}</title>
            </Head>

            <Container p={4} maxW="4xl">
                <Heading>Blog</Heading>
            </Container>

            <Divider maxW="100%" />

            <Container p={{ base: 0, sm: 4 }} maxW="4xl">
                <LatestsPosts posts={postsData} />
            </Container>
        </Layout>
    );
}
