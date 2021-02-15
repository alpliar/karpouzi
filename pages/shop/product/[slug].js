import PropTypes from 'prop-types';
import Head from 'next/head';

import Layout from '../../../components/layout';

import { Container, Divider, Heading, Img, SimpleGrid, Text, Box } from '@chakra-ui/react';
import Breadcrumb from '../../../components/breadcrumb';

import { API_BASE_URL } from '../../../utils/constants/api';
import { StarIcon } from '@chakra-ui/icons';

export async function getStaticProps() {
    const res = await fetch(`${API_BASE_URL}/product`);
    const data = await res.json();

    return {
        props: {
            product: data.product
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: 'apple' } }, { params: { slug: 'banana' } }],
        fallback: false
    };
}

export default function ProductPage({ product }) {
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
                        {
                            text: 'category',
                            link: '/shop/fruits',
                            alt: 'go to fruits category',
                            isCurrentPage: false
                        },
                        { text: product.slug, link: '', alt: '', isCurrentPage: true }
                    ]}
                />
                <Heading size="xl" mb={4} pr="20%">
                    {product.title}
                </Heading>
            </Container>

            <Divider w="100%" />

            <Container p={4} maxW="4xl">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1em">
                    <Box bg="tomato" width="full">
                        <Img src={product.imageUrl} alt={product.imageAlt} width="full" />
                    </Box>
                    <Box bg="tomato" p={4}>
                        <Heading>{product.title}</Heading>
                        <Text>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < product.rating ? 'teal.500' : 'gray.300'}
                                    />
                                ))}
                            <Box isTruncated as="span" ml="2" /*color="gray.600"*/ fontSize="sm">
                                {product.reviewCount} reviews
                            </Box>
                        </Text>
                        <Text fontSize="4xl" fontWeight="bolder">{product.price}</Text>
                    </Box>
                </SimpleGrid>
            </Container>
        </Layout>
    );
}

ProductPage.propTypes = {
    product: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        reviewCount: PropTypes.number.isRequired,
        isNew: PropTypes.bool.isRequired,
        imageUrl: PropTypes.string.isRequired,
        imageAlt: PropTypes.string.isRequired
    }).isRequired
};
