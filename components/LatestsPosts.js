import { Box, SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import BlogPostCard from './blogPostCard';

const LatestsPosts = ({ posts }) => {
    return (
        <SimpleGrid minChildWidth={{ base: 'full', sm: '250px' }} spacingX="0.5em" spacingY="1em">
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
