import {
    Avatar,
    AvatarGroup,
    Heading,
    LinkBox,
    LinkOverlay,
    Stack,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from './card';

const CategoryCard = ({ slug, title, shortDescription, products, productsCount }) => {
    return (
        <LinkBox>
            <Card key={slug}>
                <Stack>
                    <Heading as="h2" size="lg">
                        <Link href={`/shop/category/${slug}`} passHref>
                            <LinkOverlay title={`go to ${slug} category`}>{title}</LinkOverlay>
                        </Link>
                        <Text
                            as="span"
                            fontSize="sm"
                            fontStyle="italic"
                            display={{ base: 'block', sm: 'inline' }}>
                            {' '}
                            ({productsCount} products)
                        </Text>
                    </Heading>
                    {productsCount > 0 && (
                        <AvatarGroup size="md" max={useBreakpointValue({ base: 3, md: 5 })}>
                            {products.map((product, index) => (
                                <Avatar
                                    src={
                                        index % 2 === 1
                                            ? `https://images.unsplash.com/photo-1552914953-938eef0ce926?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=80`
                                            : `https://images.unsplash.com/photo-1579523360587-1e2613000ee3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80`
                                    }
                                    name={product.title}
                                    key={`${index}-${product.slug}`}
                                />
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
