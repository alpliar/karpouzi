import Head from 'next/head';
import Layout from '../../../components/layout';
// import Date from '../../../components/Date';
// import { getAllPostIds, getPostData } from '../../../lib/posts';
import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import Breadcrumb from '../../../components/breadcrumb';
//import Link from '../../../components/link';
// import PropTypes from 'prop-types';
import ProductCard from '../../../components/productCard';
// import { API_BASE_URL } from '../../../utils/constants/api';
import { getSortedProductData } from '../../../lib/products';

import { wrapper } from '../../../store';
import { useSelector } from 'react-redux';
import { SET_PRODUCTS_DATA } from '../../../actions/shop';

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
    const productsData = getSortedProductData();
    store.dispatch({ type: SET_PRODUCTS_DATA, payload: productsData });
});

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: 'fruits' } }, { params: { slug: 'veggies' } }],
        fallback: false
    };
}

export default function CategoryPage() {
    const { productsData } = useSelector((state) => state.shop);

    return (
        <Layout>
            <Head>
                <title>Shop</title>
            </Head>

            <Container px={4} py={4} maxW="4xl">
                <Breadcrumb
                    entries={[
                        {
                            text: 'Shop',
                            link: '/shop',
                            alt: 'go to shop home',
                            isCurrentPage: false
                        },
                        { text: 'category.slug', link: '', alt: '', isCurrentPage: true }
                    ]}
                />
                <Heading size="xl" pr="20%">
                    category.slug
                </Heading>
            </Container>

            <Divider w="100%" />

            <Container py={4} px={{ base: 0, sm: 4 }} maxW="4xl">
                <SimpleGrid
                    minChildWidth={{ base: 'full', sm: '230px' }}
                    spacingX="0.5em"
                    spacingY="1em">
                    {productsData &&
                        productsData.length &&
                        productsData.map((product, index) => (
                            <ProductCard
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
                </SimpleGrid>
            </Container>
        </Layout>
    );
}

// CategoryPage.propTypes = {
//     category: PropTypes.shape({
//         slug: PropTypes.string.isRequired,
//         productsCount: PropTypes.number.isRequired,
//         products: PropTypes.array.isRequired
//     }).isRequired
// };