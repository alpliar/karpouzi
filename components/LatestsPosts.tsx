import { Box, SimpleGrid } from '@chakra-ui/react';
import BlogPostCard from './blogPostCard';

interface IPost {
    id: string;
    date: string;
    title: string;
}
interface ILatestsPostsProps {
    posts: Array<IPost>;
}

const LatestsPosts: React.FC<ILatestsPostsProps> = ({ posts }) => {
    return (
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 3, '3xl': 4 }} spacing={4}>
            {posts.map(({ id, date, title }) => (
                <Box p={0} key={id}>
                    <BlogPostCard date={date} title={title} slug={id} />
                </Box>
            ))}
        </SimpleGrid>
    );
};

export default LatestsPosts;
