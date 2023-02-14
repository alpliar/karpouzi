import { Badge, Flex, HStack, Img, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants/api';
import Product from '../graphql/models/shop/product.model';
import Card from './card';
import CartItemActions from './cartItemActions';

interface IProps {
    title: string;
    picture?: string;
    quantity: number;
}

const CartItem: React.FC<IProps> = ({ title, picture = `/images/${title}.webp`, quantity }) => {
    const slug = title;
    const cardPadding = 4;
    const imageDimensions = `${cardPadding * 1.7}rem`;

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [firstPrice] = product?.prices;

    useEffect(() => {
        setLoading(true);
        fetch(API_BASE_URL + `/shop/product/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product);
                setLoading(false);
            });
    }, [slug]);

    if (isLoading) return <p>Loading...</p>;
    if (!product) return null;

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
                            width="full"
                            src={product.coverPicture.asset.url}
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
                                    <LinkOverlay>{product.name}</LinkOverlay>
                                </Link>
                                <Badge colorScheme="teal">New</Badge>
                            </HStack>
                        </Text>
                        <Text fontSize="sm" noOfLines={2}>
                            {product.description}
                        </Text>
                        <Flex>
                            <Stack>
                                <Text fontSize="2xl" fontWeight="bold" color="teal">{`${
                                    firstPrice.amount * quantity
                                } ${firstPrice.currency}`}</Text>
                                <CartItemActions slug={slug} quantity={quantity} />
                            </Stack>
                        </Flex>
                    </Stack>
                </HStack>
            </Card>
        </LinkBox>
    );
};

export default CartItem;
