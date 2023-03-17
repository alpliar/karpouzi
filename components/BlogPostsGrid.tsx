import { Box, SimpleGrid } from '@chakra-ui/react';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';
import { BASE_TRANSITION } from '../constants/ui/transitions';
import BlogPost from '../graphql/models/blog/post.model';
import BlogPostCard from './BlogPostCard';

interface ILatestsPostsProps {
    posts: Array<BlogPost>;
}

const GridBlogPosts: React.FC<ILatestsPostsProps> = ({ posts }) => {
    return (
        <SimpleGrid
            transition={BASE_TRANSITION}
            columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
            spacingX={{ base: 1, sm: 2, '2xl': 4 }}
            spacingY={{ base: 4, sm: 4, '2xl': 8 }}
            mx="auto"
            maxWidth={APP_MAX_WIDTH}
            py={{ base: 2, sm: 4 }}>
            {posts.map((post) => (
                <Box p={0} key={post.id}>
                    <BlogPostCard post={post} />
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default GridBlogPosts;
