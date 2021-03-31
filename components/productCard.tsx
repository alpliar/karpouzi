import PropTypes from 'prop-types';
import { Box, Img, LinkBox, LinkOverlay, useBreakpointValue } from '@chakra-ui/react';
import { BellIcon, TriangleDownIcon } from '@chakra-ui/icons';
import ProductCardBadge from './productCardBadge';
import Link from 'next/link';
import Rating from './rating';
import Card from './card';

const ProductCard = ({
    slug,
    imageUrl,
    imageAlt,
    title,
    formattedPrice,
    isNew,
    reviewCount,
    rating
}) => {
    const imageHeight = useBreakpointValue({ base: '280px', sm: '210px' });

    return (
        <LinkBox>
            <Card>
                <Box
                    bg="#282828"
                    position="relative"
                    h={imageHeight}
                    mt={-6}
                    mx={-6}
                    mb={6}
                    pos={'relative'}
                    overflow="hidden">
                    <Img
                        objectFit="cover"
                        fallback="https://picsum.photos/300/200"
                        minH={imageHeight}
                        src={imageUrl}
                        alt={imageAlt}
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

                <Box>
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

                    <Box mt="1" fontWeight="semibold" lineHeight="tight" isTruncated>
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

                    <Box isTruncated>
                        <Rating rate={rating} count={reviewCount} />
                    </Box>
                </Box>
            </Card>
        </LinkBox>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    slug: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    formattedPrice: PropTypes.string.isRequired,
    isNew: PropTypes.bool.isRequired,
    reviewCount: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
};
