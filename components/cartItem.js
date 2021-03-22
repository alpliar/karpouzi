import { Badge, Flex, HStack, Img, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from './card';
import CartItemActions from './cartItemActions';

const CartItem = ({ title, picture = `/images/${title}.webp`, quantity }) => {
    const slug = title;
    const cardPadding = 4;
    const imageDimensions = `${cardPadding * 1.7}rem`;
    return (
        <LinkBox>
            <Card padding={cardPadding}>
                <HStack spacing={{ base: 0, sm: 4 }}>
                    <Flex
                        mt={-cardPadding}
                        ml={-cardPadding}
                        mb={-cardPadding}
                        pos="relative"
                        maxH={imageDimensions}
                        maxW={imageDimensions}
                        alignItems="center"
                        alignContent="center"
                        display={{ base: 'none', sm: 'inline-block' }}>
                        {/* <Avatar src={picture} name={title} size="lg" /> */}
                        <Img
                            fallback="https://picsum.photos/300/200"
                            width="full"
                            src={picture}
                            alt={`picture of ${title}`}
                        />
                    </Flex>
                    <Stack ml="3" spacing="1" w={{ base: 'full' }}>
                        <Text fontWeight="bold">
                            <HStack>
                                <Link
                                    href={{
                                        pathname: '/shop/product/[slug]',
                                        query: { slug }
                                    }}
                                    passHref>
                                    <LinkOverlay>{title}</LinkOverlay>
                                </Link>
                                <Badge colorScheme="teal">New</Badge>
                            </HStack>
                        </Text>
                        <Text fontSize="sm">product</Text>
                        <Flex justify="flex-end">
                            <CartItemActions slug={slug} quantity={quantity} />
                        </Flex>
                    </Stack>
                </HStack>
            </Card>
        </LinkBox>
    );
};

export default CartItem;

CartItem.propTypes = {
    title: PropTypes.string.isRequired,
    picture: PropTypes.string,
    quantity: PropTypes.number.isRequired
};
