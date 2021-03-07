import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import CategoryCard from '../../components/categoryCard';
import Layout, { siteTitle } from '../../components/pageLayout';
import { getRandomProduct } from '../api/products';

export async function getStaticProps() {
    const categories = [
        {
            slug: 'fruits',
            title: 'Fruits',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            productsCount: 1,
            products: [getRandomProduct()]
        },
        {
            slug: 'veggies',
            title: 'Veggies',
            description: 'Ex dolorem non soluta sit reprehenderit! Natus vitae doloribus amet?',
            productsCount: 3,
            products: [getRandomProduct(), getRandomProduct(), getRandomProduct()]
        }
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
                <SimpleGrid
                    minChildWidth={{ base: 'full', sm: '250px' }}
                    spacingX="0.5em"
                    spacingY="1em">
                    {categories &&
                        categories.map((category) => {
                            return (
                                <CategoryCard
                                    key={category.slug}
                                    slug={category.slug}
                                    title={category.title}
                                    shortDescription={category.description}
                                    products={category.products}
                                    productsCount={category.productsCount}
                                />
                            );
                        })}
                </SimpleGrid>
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
