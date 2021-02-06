import Head from 'next/head';
import Layout from '../../../components/layout';
// import Date from '../../../components/Date';
// import { getAllPostIds, getPostData } from '../../../lib/posts';
import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import Breadcrumb from '../../../components/breadcrumb';
//import Link from '../../../components/link';
import PropTypes from 'prop-types';
import Card from '../../../components/card';

export async function getStaticProps() {
    // const res = await fetch('http://localhost:3000/api/shop/categories');
    // const categories = await res.json();

    const category = { slug: 'fruits', productsCount: 10, products: [] };

    return {
        props: {
            category
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
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
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
