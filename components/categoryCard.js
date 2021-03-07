import { Box, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from './card';
import ProductCardSmall from './productCardSmall';

const CategoryCard = ({ slug, title, shortDescription, products, productsCount }) => {
    return (
        <LinkBox>
            <Card key={slug}>
                <Stack>
                    <Heading as="h2" size="lg">
                        <Link
                            href={`/shop/category/${slug}`}
                            alt={`go to ${slug} category`}
                            passHref>
                            <LinkOverlay>{title}</LinkOverlay>
                        </Link>
                        <Text as="span" fontSize="sm" fontStyle="italic">
                            {' '}
                            ({productsCount} products)
                        </Text>
                    </Heading>
                    {/* {productsCount > 0 && (
                        <Box>
                            {products.map((product, index) => (
                                <ProductCardSmall
                                    key={`${product.slug}-${index}`}
                                    slug={product.slug}
                                    title={product.title}
                                    imageUrl={product.imageUrl}
                                    imageAlt={`${product.title} picture`}
                                    formattedPrice={product.price}
                                    isNew={product.isNew}
                                    reviewCount={product.reviewCount}
                                    rating={product.rating}
                                />
                            ))}
                        </Box>
                    )} */}

                    <Text noOfLines={2}>{shortDescription}</Text>
                </Stack>
            </Card>
        </LinkBox>
    );
};

export default CategoryCard;

CategoryCard.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    productsCount: PropTypes.number.isRequired
};
