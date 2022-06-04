import { BellIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Flex, Img, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';
import Card from './card';
import ProductCardBadge from './productCardBadge';
import Rating from './rating';

interface IProps {
    slug: string;
    imageUrl: string;
    imageAlt: string;
    title: string;
    formattedPrice: string;
    isNew: boolean;
    reviewCount: number;
    rating: number;
}

const ProductCardSmall: React.FC<IProps> = ({
    slug,
    imageUrl,
    imageAlt,
    title,
    formattedPrice,
    isNew,
    reviewCount,
    rating
}) => {
    return (
        <LinkBox>
            <Card>
                <Flex>
                    <Box bg="#282828" position="relative" pos={'relative'} overflow="hidden">
                        <Img
                            objectFit="cover"
                            src={imageUrl}
                            alt={imageAlt}
                            w={'96px'}
                            h={'96px'}
                        />
                        {isNew && (
                            <ProductCardBadge
                                icon={isNew ? BellIcon : TriangleDownIcon}
                                text={isNew ? 'NEW' : '-20%'}
                                positionX="right"
                                positionY="top"
                            />
                        )}

                        {!isNew && (
                            <ProductCardBadge
                                icon={isNew ? BellIcon : TriangleDownIcon}
                                text={isNew ? 'NEW' : '-20%'}
                                positionX="right"
                                positionY="bottom"
                            />
                        )}
                    </Box>

                    <Box ml={2}>
                        {/* <Box d="flex" alignItems="baseline">
                    <Box
                        color="gray.800"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2">
                        {property.beds} beds &bull; {property.baths} baths
                    </Box>
                </Box> */}

                        <Box mt="1" fontWeight="semibold" lineHeight="tight">
                            <Link
                                href={{
                                    pathname: '/shop/product/[slug]',
                                    query: { slug }
                                }}
                                passHref>
                                <LinkOverlay>{title}</LinkOverlay>
                            </Link>
                        </Box>

                        <Box>
                            {formattedPrice}
                            <Box as="span" /*color="gray.600"*/ fontSize="sm">
                                / piece
                            </Box>
                        </Box>

                        <Box>
                            <Rating rate={rating} count={reviewCount} />
                        </Box>
                    </Box>
                </Flex>
            </Card>
        </LinkBox>
    );
};

export default ProductCardSmall;
