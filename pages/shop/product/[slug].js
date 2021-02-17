import PropTypes from 'prop-types';
import Head from 'next/head';

import Layout from '../../../components/layout';

import { Badge, Container, Divider, Heading, Img, SimpleGrid, Text, Box } from '@chakra-ui/react';
import Breadcrumb from '../../../components/breadcrumb';

import { API_BASE_URL } from '../../../utils/constants/api';
import { products } from '../../api/products';

import { BellIcon } from '@chakra-ui/icons';
import Rating from '../../../components/rating';

export async function getStaticProps({ params }) {
    const { slug } = params;
    const api = `${API_BASE_URL}/product/${slug}`;

    const res = await fetch(api);
    const data = await res.json();

    return {
        props: {
            ...data.product
        }
    };
}

export async function getStaticPaths() {
    const pathsToPreload = products.map((product) => ({ params: { slug: product.toLowerCase() } }));

    return {
        paths: pathsToPreload,
        fallback: false
    };
}

export default function ProductPage({
    slug,
    title,
    price,
    rating,
    reviewCount,
    isNew,
    imageUrl,
    imageAlt,
    description
}) {
    return (
        <Layout>
            <Head>
                <title>Shop - {title}</title>
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
                            link: '/shop/categories/fruits',
                            alt: 'go to fruits category',
                            isCurrentPage: false
                        },
                        { text: slug, link: '', alt: '', isCurrentPage: true }
                    ]}
                />
                <Heading size="xl" mb={4} pr="20%">
                    {title}
                </Heading>
            </Container>

            <Divider w="100%" />

            <Container p={4} maxW="4xl">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1em">
                    <Box bg="tomato" width="full">
                        <Img src={imageUrl} alt={imageAlt} width="full" />
                    </Box>
                    <Box bg="tomato" p={4}>
                        <Heading>
                            {title}{' '}
                            {isNew && (
                                <Badge>
                                    <BellIcon /> NEW!
                                </Badge>
                            )}
                        </Heading>

                        <Rating rate={rating} count={reviewCount} />

                        <Text fontSize="4xl" fontWeight="bolder">
                            {price}
                        </Text>
                    </Box>
                </SimpleGrid>
                <Box width="full" padding="1em">
                    <Text>{description}</Text>
                </Box>
            </Container>
        </Layout>
    );
}

ProductPage.propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    isNew: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};
