import { BellIcon } from '@chakra-ui/icons';
import {
    AspectRatio,
    Badge,
    Box,
    Container,
    Divider,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Banner from '../../../components/banner';
import BlockQuote from '../../../components/blockQuote';
import { Image } from '../../../components/image';
import PageListingLayout from '../../../components/pageListingLayout';
import Polaroid from '../../../components/polaroid';
import Rating from '../../../components/rating';
import { API_BASE_URL } from '../../../constants/api';
import AddToCart from '../../../container/addToCart';
import ShopCategory from '../../../graphql/models/shop/category.model';
import Product, { ShopProductsData } from '../../../graphql/models/shop/product.model';
import { ProductResponse } from '../../api/shop/product/[slug]';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        const {
            data: { product }
        } = await axios.get<ProductResponse>(API_BASE_URL + '/shop/product/' + slug);

        if (!product) throw new Error('Could not fetch product data');

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
    const showAsPolaroid = useBreakpointValue({ base: false, xl: true });
    const pictureSizes = useBreakpointValue({ base: '100vw', md: '33vw' });

    if (!product) return null;

    const isNew = false;
    const reviewCount = product.reviews.length;
    const rate =
        reviewCount > 0
            ? product.reviews.map((rev) => rev.rating).reduce((a, b) => a + b) / reviewCount
            : 0;
    const [firstPrice] = product.prices;
    const [category]: Array<ShopCategory> | undefined = product.productCategories;

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
                    text: category.name,
                    link: `/shop/category/${category.slug}`,
                    alt: `go to ${category.name} category`,
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
                <Stack spacing={16}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ md: '1em' }}>
                        <Polaroid title={product.name} unstyled={!showAsPolaroid}>
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={product.coverPicture.asset.url}
                                    alt={product.coverPicture.alternativeText}
                                    sizes={pictureSizes}
                                    priority
                                    quality={100}
                                    blurDataURL={product.coverPicture.asset.thumbnail}
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
                            // transform={{ base: 'rotate(0deg)', md: 'rotate(-1deg)' }}
                        >
                            {/* <Heading>{title}</Heading> */}

                            <Rating rate={rate} count={reviewCount} />

                            <Text fontSize="4xl" fontWeight="bolder">
                                {firstPrice.amount}
                                {` `}
                                {firstPrice.currency}
                            </Text>

                            <AddToCart slug={product.slug} quantity={1} />

                            <Divider my={4} w="100%" />

                            <Box
                                padding={{ base: '1rem', xl: '1.5rem' }}
                                maxH={{ base: undefined, md: '80' }}
                                overflow="auto">
                                <Box textAlign="left" fontSize={{ base: 'xl', xl: '2xl' }}>
                                    <Text as="p">{product.description}</Text>
                                </Box>
                            </Box>
                        </Box>
                    </SimpleGrid>
                    <Banner pattern="wiggle">
                        <Stack maxW="md" fontSize="sm" fontWeight="bold" p={3}>
                            <Heading>Fond of {category.name} ?</Heading>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum
                                minima quaerat fugit ullam illo ipsa perspiciatis sit voluptatem!
                            </Text>
                        </Stack>
                    </Banner>
                </Stack>
            </Container>
        </PageListingLayout>
    );
};

export default ProductPage;
