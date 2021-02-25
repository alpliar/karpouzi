import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';

import { Box, Container, Divider, Heading, Text } from '@chakra-ui/react';
import Link from '../../components/link';

export async function getStaticProps() {
    const categories = [
        { slug: 'fruits', title: 'Fruits', productsCount: 10, products: [] },
        { slug: 'veggies', title: 'Veggies', productsCount: 3, products: [] }
    ];

    return {
        props: {
            categories
        }
    };
}

export default function ShopPage({ categories }) {
    return (
        <Layout>
            <Head>
                <title>Shop - {siteTitle}</title>
            </Head>

            <Container p={4} maxW="4xl">
                <Heading>Shop</Heading>
            </Container>

            <Divider maxW="100%" />

            <Container p={4} maxW="4xl">
                <Link href={`/shop/cart/`} alt="go to cart">
                    Cart
                </Link>
            </Container>

            <Container p={4} maxW="4xl">
                {categories &&
                    categories.map((category) => {
                        return (
                            <Box key={category.slug}>
                                <Heading as="h2" size="lg">
                                    <Link
                                        href={`/shop/categories/${category.slug}`}
                                        alt={`go to ${category.slug} category`}>
                                        {category.slug}
                                    </Link>
                                </Heading>
                                <Text size="sm"> ({category.productsCount} products)</Text>
                                <Text>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Aspernatur consectetur quod at amet cumque quaerat possimus
                                    harum ducimus tenetur delectus. Ex dolorem non soluta sit
                                    reprehenderit! Natus vitae doloribus amet?
                                </Text>
                            </Box>
                        );
                    })}
            </Container>
        </Layout>
    );
}

ShopPage.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            slug: PropTypes.string.isRequired,
            productsCount: PropTypes.number.isRequired,
            products: PropTypes.array.isRequired
        }).isRequired
    ).isRequired
};
