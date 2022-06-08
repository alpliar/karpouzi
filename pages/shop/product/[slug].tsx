import { BellIcon } from '@chakra-ui/icons';
import { Badge, Box, Container, Divider, SimpleGrid, Text } from '@chakra-ui/layout';
import { AspectRatio, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import BlockQuote from '../../../components/blockQuote';
import { Image } from '../../../components/image';
import PageListingLayout from '../../../components/pageListingLayout';
import Polaroid from '../../../components/polaroid';
import Rating from '../../../components/rating';
import { API_BASE_URL } from '../../../constants/api';
import AddToCart from '../../../container/addToCart';
import Product, { ShopProductsData } from '../../../graphql/models/shop/product.model';
import { ProductResponse } from '../../api/shop/product/[slug]';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        const {
            data: { product }
        } = await axios.get<ProductResponse>(API_BASE_URL + '/shop/product/' + slug);

        if (!product) throw new Error('Could not fetch category data');

        return {
            props: {
                product
            }
        };
    } catch (err) {
        // console.error(err);
        return {
            notFound: true
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const {
            data: { products }
        } = await axios.post<ShopProductsData>(API_BASE_URL + '/shop/products');

        if (!products) throw new Error('Could not fetch products data');

        return {
            paths: products.map(({ slug }) => ({
                params: {
                    slug
                },
                locale: 'en'
            })),
            fallback: true
        };
    } catch (err) {
        return {
            paths: [],
            fallback: true
        };
    }
};

const ProductPage = ({ product }: { product: Product }) => {
    const showAsPolaroid = useBreakpointValue({ base: true, md: false });

    if (!product) return null;

    const isNew = false;
    const reviewCount = product.reviews.length;
    const rate =
        reviewCount > 0
            ? product.reviews.map((rev) => rev.rating).reduce((a, b) => a + b) / reviewCount
            : 0;
    const [firstPrice] = product.prices;

    return (
        <PageListingLayout
            title={product.name}
            breadcrumbs={[
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
                {
                    text: product.name,
                    link: `/shop/product/${product.slug}`,
                    alt: `${product.name} picture`,
                    isCurrentPage: true
                }
            ]}
            titleSlot={
                isNew && (
                    <Box>
                        <Badge>
                            <BellIcon /> NEW!
                        </Badge>
                    </Box>
                )
            }
            introSlot={<BlockQuote noOfLines={3}>Blah blah</BlockQuote>}>
            <Head>
                <title>Shop - {product.name}</title>
            </Head>

            <Container p={{ base: 0 }} maxW="full">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ md: '1em' }}>
                    <Polaroid title={product.name} unstyled={showAsPolaroid}>
                        <AspectRatio ratio={1 / 1}>
                            <Image
                                src={product.coverPicture.asset.url}
                                alt={product.coverPicture.alternativeText}
                                width={500}
                                height={500}
                                placeholder="blur"
                                // bg="#282828"
                                // width={{ base: 'full', sm: '100%' }}
                                // h={{ base: '100vw', sm: 'auto' }}
                                // overflow="hidden"
                            />
                        </AspectRatio>
                    </Polaroid>

                    <Box
                        bg=""
                        p={4}
                        textAlign={{ base: 'center', md: 'left' }}
                        transform={{ base: 'rotate(0deg)', md: 'rotate(-1deg)' }}>
                        {/* <Heading>{title}</Heading> */}

                        <Rating rate={rate} count={reviewCount} />

                        <Text fontSize="4xl" fontWeight="bolder">
                            {firstPrice.amount}
                            {` `}
                            {firstPrice.currency}
                        </Text>

                        <AddToCart slug={product.slug} quantity={1} />

                        <Divider my={4} w="100%" />

                        <Box padding={{ base: '1rem', xl: '1.5rem' }}>
                            <Box textAlign="left" fontSize={{ base: 'xl', xl: '2xl' }}>
                                <Text as="p">{product.description}</Text>
                            </Box>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Container>
        </PageListingLayout>
    );
};

export default ProductPage;
