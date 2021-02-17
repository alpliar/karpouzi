import { Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const Rating = ({ rate, count }) => {
    return (
        <Text>
            {Array(5)
                .fill('')
                .map((_, i) => (
                    <StarIcon key={i} color={i < rate ? 'teal.500' : 'gray.300'} />
                ))}
            <Text isTruncated as="span" ml="2" /*color="gray.600"*/ fontSize="sm">
                {count} reviews
            </Text>
        </Text>
    );
};

export default Rating;

Rating.propTypes = {
    rate: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired
};
