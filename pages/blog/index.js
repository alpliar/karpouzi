import PropTypes from 'prop-types';
import { Container, Heading } from '@chakra-ui/react';
import LatestsPosts from '../../components/LatestsPosts';
import Layout from '../../components/layout';

import { getSortedPostsData } from '../../lib/posts';

export async function getStaticProps() {
    const posts = getSortedPostsData();
    return {
        props: {
            posts
        }
    };
}

const Blog = ({ posts }) => {
    return (
        <Layout>
            <Container p={4}>
                <Heading>Blog</Heading>
                <LatestsPosts posts={posts} />
            </Container>
        </Layout>
    );
};

export default Blog;

Blog.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            date: PropTypes.string,
            title: PropTypes.string
        })
    )
};
