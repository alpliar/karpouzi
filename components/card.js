import { Box, Img, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const Card = () => {
    const property = {
        imageUrl: 'https://picsum.photos/300/200',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4
    };

    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Img
                objectFit="cover"
                htmlHeight="200px"
                htmlWidth="300px"
                w="100%"
                fallback="https://picsum.photos/300/200"
                src={property.imageUrl}
                alt={property.imageAlt}
            />

            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        New
                    </Badge>
                    <Box
                        color="gray.800"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2">
                        {property.beds} beds &bull; {property.baths} baths
                    </Box>
                </Box>

                <Box mt="1" fontWeight="semibold" lineHeight="tight" isTruncated>
                    {property.title}
                </Box>

                <Box>
                    {property.formattedPrice}
                    <Box as="span" color="gray.600" fontSize="sm">
                        / wk
                    </Box>
                </Box>

                <Box d="flex" mt="2" alignItems="center">
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < property.rating ? 'teal.500' : 'gray.300'}
                            />
                        ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                        {property.reviewCount} reviews
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Card;
