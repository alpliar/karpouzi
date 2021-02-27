import { Avatar, Badge, Box, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const CartItem = ({
    title,
    picture = `https://fakeimg.pl/150x150/282828/eae0d0/?retina=1&text=${title}`
}) => {
    const slug = title;
    return (
        <LinkBox as={Flex}>
            <Avatar src={picture} name={title} />
            <Box ml="3">
                <Text fontWeight="bold">
                    <Link
                        href={{
                            pathname: '/shop/product/[slug]',
                            query: { slug }
                        }}
                        passHref>
                        <LinkOverlay>{title}</LinkOverlay>
                    </Link>

                    <Badge ml="1" colorScheme="green">
                        New
                    </Badge>
                </Text>
                <Text fontSize="sm">product</Text>
            </Box>
        </LinkBox>
    );
};

export default CartItem;

CartItem.propTypes = {
    title: PropTypes.string.isRequired,
    picture: PropTypes.string
};
