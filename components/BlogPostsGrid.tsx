import { Box, SimpleGrid } from '@chakra-ui/react';
import BlogPost from '../graphql/models/blog/post.model';
import BlogPostCard from './BlogPostCard';

interface ILatestsPostsProps {
    posts: Array<BlogPost>;
}

const GridBlogPosts: React.FC<ILatestsPostsProps> = ({ posts }) => {
    return (
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 3, '3xl': 4 }} spacing={4}>
            {posts.map((post) => (
                <Box p={0} key={post.id}>
                    <BlogPostCard post={post} />
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default GridBlogPosts;
