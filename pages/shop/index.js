import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';

import { Box, Container, Divider, Heading, Text } from '@chakra-ui/react';
import Link from '../../components/link';

export async function getStaticProps() {
    // const res = await fetch('http://localhost:3000/api/shop/categories');
    // const data = await res.json();

    const categories = [
        { slug: 'fruits', productsCount: 10, products: [] },
        { slug: 'veggies', productsCount: 3, products: [] }
    ];

    return {
        props: {
            categories
        }
    };
}

export default function ShopPage({ categories }) {
    // console.log(categories);
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
                {categories &&
                    categories.map((category) => {
                        return (
                            <Box key={category.slug}>
                                <Heading as="h2" size="lg">
                                    <Link href={`/shop/categories/${category.slug}`}>
                                        {category.slug}
                                    </Link>
                                </Heading>
                                <Text size="sm"> ({category.productsCount} products)</Text>
                                <Text>fazfzfzafaz fza fzazf azf</Text>
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
