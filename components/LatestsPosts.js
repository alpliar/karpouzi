import { List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from './link';

import PropTypes from 'prop-types';

const LatestsPosts = ({ posts }) => {
    return (
        <List spacing={3}>
            {posts.map(({ id, date, title }) => (
                <ListItem key={id}>
                    <Text as="time" fontSize="xs" dateTime={date}>
                        {date}
                    </Text>
                    <ListIcon as={ChevronRightIcon} color="green.500" />
                    <Link href={`/blog/posts/${id}`} alt="read post">
                        <Text isTruncated>{title}</Text>
                    </Link>
                </ListItem>
            ))}
        </List>
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
