import { Box, SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import BlogPostCard from './blogPostCard';

const LatestsPosts = ({ posts }) => {
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

LatestsPosts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    )
};
