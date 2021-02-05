import Head from 'next/head';
import Layout from '../../../components/layout';
// import Date from '../../../components/Date';
// import { getAllPostIds, getPostData } from '../../../lib/posts';
import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

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
            <Container pt={2} maxW="4xl">
                <Breadcrumb fontSize="sm" separator={<ChevronRightIcon color="gray.500" />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop/">Shop</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href={`/shop/${category.slug}`}>
                            {category.slug}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Container>

            <Container px={4} py={4} maxW="4xl">
                <Heading size="xl" mb={4} pr="20%">
                    {category.slug}
                </Heading>
                {/* <Heading size="xs">
                    <Date dateString={postData.date} />
                </Heading> */}
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
