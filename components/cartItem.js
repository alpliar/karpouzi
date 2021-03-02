import { Avatar, Badge, Box, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import CartItemActions from './cartItemActions';

const CartItem = ({
    title,
    picture = `https://fakeimg.pl/150x150/282828/eae0d0/?retina=1&text=${title}`,
    quantity
}) => {
    const slug = title;
    return (
        <Flex>
            <LinkBox as={Flex}>
                <Avatar src={picture} name={title} />
                <Box flexGrow={1} ml="3">
                    <Text fontWeight="bold">
                        <Link
                            href={{
                                pathname: '/shop/product/[slug]',
                                query: { slug }
                            }}
                            passHref>
                            <LinkOverlay>{title}</LinkOverlay>
                        </Link>
                    </Text>
                    <Text fontSize="sm">
                        <Badge ml="1" colorScheme="green">
                            New
                        </Badge>
                        product
                    </Text>
                </Box>
            </LinkBox>
            <Box ml="3">
                <CartItemActions quantity={quantity} />
            </Box>
        </Flex>
    );
};

export default CartItem;

CartItem.propTypes = {
    title: PropTypes.string.isRequired,
    picture: PropTypes.string,
    quantity: PropTypes.number.isRequired
};
