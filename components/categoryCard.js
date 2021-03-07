import { Avatar, AvatarGroup, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from './card';

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
                    {productsCount > 0 && (
                        <AvatarGroup size="lg" max={3}>
                            {products.map((product, index) => (
                                <LinkBox cursor="pointer" key={`${index}-${product.slug}`}>
                                    <Avatar src={product.image} name={product.title} />
                                    <Link
                                        href={{
                                            pathname: '/shop/product/[slug]',
                                            query: { slug: product.slug }
                                        }}
                                        passHref>
                                        <LinkOverlay display="none">{product.title}</LinkOverlay>
                                    </Link>
                                </LinkBox>
                            ))}
                        </AvatarGroup>
                    )}

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
