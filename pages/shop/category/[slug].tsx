import { Container, Divider, Heading, SimpleGrid, Wrap } from '@chakra-ui/layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { SET_PRODUCTS_DATA } from '../../../actions/shop';
import Breadcrumb from '../../../components/breadcrumb';
import Layout from '../../../components/pageLayout';
import ProductCard from '../../../components/productCard';
import ShopStat from '../../../components/shopStat';
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
                            text: 'Home',
                            link: '/',
                            alt: 'go to home'
                        },
                        {
                            text: 'Shop',
                            link: '/shop',
                            alt: 'go to shop home'
                        },
                        {
                            text: 'category',
                            link: '/shop/category/fruits',
                            alt: 'fruits page',
                            isCurrentPage: true
                        }
                    ]}
                />
                <Wrap spacing={1} justify="space-between">
                    <Heading>Category</Heading>

                    <ShopStat label="Products" number={products?.length ?? 0} />
                    {/* <ShopStat label="Products" number={5} /> */}
                </Wrap>
            </Container>

            <Divider w="100%" />

            <Container py={4} px={{ base: 0, sm: 4 }} maxW="4xl">
                <SimpleGrid minChildWidth={{ base: 'full', sm: '230px' }} spacing={4}>
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
