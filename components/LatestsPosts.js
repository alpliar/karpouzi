import { Box, SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import BlogPostCard from './blogPostCard';

const LatestsPosts = ({ posts }) => {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={5}>
            {posts.map(({ id, date, title }) => (
                <Box key={id}>
                    {/* <Text as="time" fontSize="xs" dateTime={date}>
                        {date}
                    </Text>
                    <ListIcon as={ChevronRightIcon} color="green.500" />
                    <Link href={`/blog/posts/${id}`} alt="read post">
                        <Text isTruncated>{title}</Text>
                    </Link> */}
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
