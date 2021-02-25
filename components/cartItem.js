import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CartItem = ({
    title,
    picture = `https://fakeimg.pl/150x150/282828/eae0d0/?retina=1&text=${title}`
}) => {
    return (
        <Flex>
            <Avatar src={picture} name={title} />
            <Box ml="3">
                <Text fontWeight="bold">
                    {title}
                    <Badge ml="1" colorScheme="green">
                        New
                    </Badge>
                </Text>
                <Text fontSize="sm">product</Text>
            </Box>
        </Flex>
    );
};

export default CartItem;

CartItem.propTypes = {
    title: PropTypes.string.isRequired,
    picture: PropTypes.string
};
