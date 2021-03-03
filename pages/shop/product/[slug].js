import PropTypes from 'prop-types';
import Head from 'next/head';

import Layout from '../../../components/layout';
import { getAllProductIds, getProductData } from '../../../lib/products';

import { Badge, Container, Divider, Heading, Img, SimpleGrid, Text, Box } from '@chakra-ui/react';
import Breadcrumb from '../../../components/breadcrumb';

import { BellIcon } from '@chakra-ui/icons';
import Rating from '../../../components/rating';
import AddToCart from '../../../container/addToCart';

export async function getStaticProps({ params }) {
    const productData = await getProductData(params.slug);

    return {
        props: {
            ...productData
        }
    };
}

export async function getStaticPaths() {
    const paths = getAllProductIds();

    return {
        paths,
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
    contentHtml
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
                    {title}{' '}
                    {isNew && (
                        <Badge>
                            <BellIcon /> NEW!
                        </Badge>
                    )}
                </Heading>
            </Container>

            <Divider w="100%" />

            <Container p={4} maxW="4xl">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing="1em">
                    <Box bg="#282828" width="full">
                        <Img src={imageUrl} alt={`picture of ${title}`} width="full" />
                    </Box>
                    <Box bg="" p={4}>
                        {/* <Heading>{title}</Heading> */}

                        <Rating rate={rating} count={reviewCount} />

                        <Text fontSize="4xl" fontWeight="bolder">
                            {price}
                        </Text>

                        <AddToCart slug={slug} quantity={1} />
                    </Box>
                </SimpleGrid>
                <Box width="full" padding="1em">
                    <Box dangerouslySetInnerHTML={{ __html: contentHtml }} />
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
    contentHtml: PropTypes.string.isRequired
};
