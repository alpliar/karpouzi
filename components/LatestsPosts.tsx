import { Box, SimpleGrid } from '@chakra-ui/react';
import BlogPost from '../graphql/models/blog/post.model';
import BlogPostCard from './blogPostCard';

interface ILatestsPostsProps {
    posts: Array<BlogPost>;
}

const LatestsPosts: React.FC<ILatestsPostsProps> = ({ posts }) => {
    return (
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 3, '3xl': 4 }} spacing={4}>
            {posts.map(
                ({ id, slug, createdAt: date, title, picture: { url }, timeToRead, content }) => (
                    <Box p={0} key={id}>
                        <BlogPostCard
                            date={date}
                            title={title}
                            slug={slug}
                            image={url}
                            timeToRead={timeToRead}
                            content={content}
                        />
                    </Box>
                )
            )}
        </SimpleGrid>
    );
};

export default LatestsPosts;
