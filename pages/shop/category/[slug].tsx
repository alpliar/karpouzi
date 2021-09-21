import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { SET_PRODUCTS_DATA } from '../../../actions/shop';
import Breadcrumb from '../../../components/breadcrumb';
import Layout from '../../../components/pageLayout';
import ProductCard from '../../../components/productCard';
import { getSortedProductData } from '../../../lib/products';
import { RootState } from '../../../reducer';
import { wrapper } from '../../../store';

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(({ store }) => {
    const products = getSortedProductData();
    store.dispatch({ type: SET_PRODUCTS_DATA, products: products });
});

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { slug: 'fruits' }, locale: 'en' },
            { params: { slug: 'veggies' }, locale: 'en' }
        ],
        fallback: true
    };
};

const CategoryPage: NextPage = () => {
    const { products } = useSelector((state: RootState) => state.server);

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
                    {products &&
                        products.length &&
                        products.map((product, index) => (
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
};

export default CategoryPage;
