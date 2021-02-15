import PropTypes from 'prop-types';
import { Box, Img } from '@chakra-ui/react';
import { StarIcon, BellIcon, TriangleDownIcon } from '@chakra-ui/icons';
import ProductCardBadge from './productCardBadge';

const ProductCard = ({ imageUrl, imageAlt, title, formattedPrice, isNew, reviewCount, rating }) => {
    // const property = {
    //     imageUrl: `https://picsum.photos/seed/${Date.now()}/300/200/`,
    //     imageAlt: 'Rear view of modern home with pool',
    //     beds: 3,
    //     baths: 2,
    //     title: 'Modern home in city center in the heart of historic Los Angeles',
    //     formattedPrice: '$1,900.00',
    //     reviewCount: 34,
    //     rating: 4
    // };

    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box position="relative">
                <Img
                    objectFit="cover"
                    htmlHeight="200px"
                    htmlWidth="300px"
                    w="100%"
                    fallback="https://picsum.photos/300/200"
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

            <Box p="6">
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
                    {title}
                </Box>

                <Box>
                    {formattedPrice}
                    <Box as="span" /*color="gray.600"*/ fontSize="sm">
                        / piece
                    </Box>
                </Box>

                <Box d="flex" mt="2" alignItems="center">
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <StarIcon key={i} color={i < rating ? 'teal.500' : 'gray.300'} />
                        ))}
                    <Box isTruncated as="span" ml="2" /*color="gray.600"*/ fontSize="sm">
                        {reviewCount} reviews
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    formattedPrice: PropTypes.string.isRequired,
    isNew: PropTypes.bool.isRequired,
    reviewCount: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
};
