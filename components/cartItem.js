import { Avatar, Badge, Box, Flex, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
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
        <LinkBox as={Flex} px={2}>
            <Flex h="full" alignItems="center" alignContent="center">
                <Avatar src={picture} name={title} size="lg" />
            </Flex>
            <Stack ml="3" spacing="1" w={{ base: 'full' }}>
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
                    <Badge colorScheme="teal">New</Badge>
                    product
                </Text>
                <Flex justify="flex-end">
                    <CartItemActions slug={slug} quantity={quantity} />
                </Flex>
            </Stack>
        </LinkBox>
    );
};

export default CartItem;

CartItem.propTypes = {
    title: PropTypes.string.isRequired,
    picture: PropTypes.string,
    quantity: PropTypes.number.isRequired
};
