import Head from 'next/head';
import Layout from '../../../components/layout';
// import Date from '../../../components/Date';
// import { getAllPostIds, getPostData } from '../../../lib/posts';
import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import Breadcrumb from '../../../components/breadcrumb';
//import Link from '../../../components/link';
import PropTypes from 'prop-types';
import Card from '../../../components/card';
import { API_BASE_URL } from '../../../utils/constants/api';

export async function getStaticProps() {
    const res = await fetch(`${API_BASE_URL}/products`);
    const data = await res.json();

    return {
        props: {
            category: {
                slug: 'fruits',
                products: await data.products,
                productsCount: await data.totalCount
            }
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: 'fruits' } }, { params: { slug: 'veggies' } }],
        fallback: false
    };
}

export default function CategoryPage({ category }) {
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
                        { text: category.slug, link: '', alt: '', isCurrentPage: true }
                    ]}
                />
                <Heading size="xl" mb={4} pr="20%">
                    {category.slug}
                </Heading>
            </Container>

            <Divider w="100%" />

            <Container p={4} maxW="4xl">
                <SimpleGrid minChildWidth="220px" spacing={10}>
                    {category &&
                        category.products &&
                        category.products.length &&
                        category.products.map((product) => (
                            <Card
                                key={product.slug}
                                title={product.title}
                                imageUrl={`https://picsum.photos/seed/${Date.now()}/300/200/`}
                                imageAlt={`picture of ${product.title}`}
                                formattedPrice={`${product.price} €`}
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

CategoryPage.propTypes = {
    category: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        productsCount: PropTypes.number.isRequired,
        products: PropTypes.array.isRequired
    }).isRequired
};
