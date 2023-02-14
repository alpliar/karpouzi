import {
    Badge,
    Box,
    Flex,
    HStack,
    LinkBox,
    LinkOverlay,
    Stack,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../constants/api';
import Product from '../graphql/models/shop/product.model';
import Card from './card';
import CartItemActions from './cartItemActions';
import { Image } from './image';

interface IProps {
    slug: string;
    quantity: number;
}

const CartItem: React.FC<IProps> = ({ slug, quantity }) => {
    const cardPadding = 4;

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setLoading] = useState(false);
    const firstPrice = product?.prices[0];

    useEffect(() => {
        setLoading(true);
        fetch(API_BASE_URL + `/shop/product/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product);
                setLoading(false);
            });
    }, [slug]);

    const imageSize = useBreakpointValue({ base: '180px', md: '200px' });

    if (isLoading) return <p>Loading...</p>;
    if (!product) return null;

    return (
        <LinkBox>
            <Card padding={cardPadding}>
                <Stack spacing={4} direction={{ base: 'column', sm: 'row' }}>
                    <Box w={{ base: 'full', sm: imageSize }} marginY={-4} ml={-4}>
                        <Image
                            quality={75}
                            src={product.coverPicture.asset.url}
                            alt={product.coverPicture.alternativeText || product.name}
                            sizes={imageSize}
                            priority
                            height={imageSize}
                            w={{ base: imageSize }}
                            blurDataURL={product.coverPicture.asset.thumbnail}
                        />
                    </Box>
                    <Stack ml="3" spacing="1">
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
                        <Text fontSize="sm" noOfLines={1}>
                            {product.description}
                        </Text>
                        <Flex>
                            <Stack>
                                {firstPrice && (
                                    <Text fontSize="2xl" fontWeight="bold" color="teal">{`${
                                        firstPrice.amount * quantity
                                    } ${firstPrice.currency}`}</Text>
                                )}
                                <CartItemActions slug={slug} quantity={quantity} />
                            </Stack>
                        </Flex>
                    </Stack>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default CartItem;
