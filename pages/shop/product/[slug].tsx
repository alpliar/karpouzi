import { BellIcon } from '@chakra-ui/icons';
import { Img } from '@chakra-ui/image';
import {
    Badge,
    Box,
    Container,
    Divider,
    Heading,
    SimpleGrid,
    Stack,
    Text
} from '@chakra-ui/layout';
import { GetStaticPaths, GetStaticPathsContext, GetStaticPathsResult, NextPage } from 'next';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { FC, WeakValidationMap } from 'react';
import Breadcrumb from '../../../components/breadcrumb';
import Layout from '../../../components/pageLayout';
import Rating from '../../../components/rating';
import AddToCart from '../../../container/addToCart';
import { getAllProductIds, getProductData } from '../../../lib/products';
import { sanitizeText } from '../../../utils/sanitize';

export async function getStaticProps({ params }) {
    const productData = await getProductData(params.slug);

    return {
        props: {
            ...productData
        }
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllProductIds();

    return {
        paths,
        fallback: true
    };
};

type ProductPageProps = {
    slug: string;
    title: string;
    price: string;
    rating: string;
    reviewCount: string;
    isNew: boolean;
    imageUrl: string;
    contentHtml: any;
};

const ProductPage = ({
    slug,
    title,
    price,
    rating,
    reviewCount,
    isNew,
    imageUrl,
    contentHtml
}: ProductPageProps) => {
    if (!slug) {
        return false;
    }
    return (
        <Layout>
            <Head>
                <title>Shop - {title}</title>
            </Head>

            <Container px={4} py={4} maxW="4xl">
                <Stack spacing={2}>
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
                                link: '/shop/category/fruits',
                                alt: 'go to fruits category',
                                isCurrentPage: false
                            },
                            { text: slug, link: '', alt: '', isCurrentPage: true }
                        ]}
                    />
                    <Heading size="xl" pr={{ base: 0, md: '20%' }}>
                        {title}{' '}
                        {isNew && (
                            <Badge>
                                <BellIcon /> NEW!
                            </Badge>
                        )}
                    </Heading>
                </Stack>
            </Container>

            <Divider w="100%" />

            <Container p={{ base: 0, sm: 4 }} maxW="4xl">
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ md: '1em' }}>
                    <Box bg="#282828" width="full" maxH="15em" overflow="hidden">
                        <Img src={imageUrl} alt={`picture of ${title}`} width="full" />
                    </Box>
                    <Box bg="" p={4} textAlign={{ base: 'center', md: 'left' }}>
                        {/* <Heading>{title}</Heading> */}

                        <Rating rate={parseInt(rating)} count={parseInt(reviewCount)} />

                        <Text fontSize="4xl" fontWeight="bolder">
                            {price}
                        </Text>

                        <AddToCart slug={slug} quantity={1} />
                    </Box>
                </SimpleGrid>

                <Box p={4} width="full" padding="1em">
                    <Divider my={4} w="100%" />
                    <Box
                        className="externalHtml"
                        dangerouslySetInnerHTML={{ __html: sanitizeText(contentHtml) }}
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default ProductPage;

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
