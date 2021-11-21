import { GiWatermelon } from 'react-icons/gi';
import { StarIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import Icon from '@chakra-ui/icon';
import { Flex, Text } from '@chakra-ui/layout';

interface IOwnProps {
    rate: number;
    count: number;
    icon?: any;
}

const Rating = ({ rate, count, icon = GiWatermelon }: IOwnProps) => {
    return (
        <Flex as={Text} alignItems="end">
            {Array(5)
                .fill('')
                .map((_, i) => (
                    <Icon
                        boxSize={6}
                        as={icon}
                        key={i}
                        color={i < rate ? 'teal.500' : 'gray.300'}
                    />
                ))}
            <Text isTruncated as="span" ml="2" /*color="gray.600"*/ fontSize="sm">
                {count.toString()} reviews
            </Text>
        </Flex>
    );
};

export default Rating;

Rating.propTypes = {
    rate: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired
};
