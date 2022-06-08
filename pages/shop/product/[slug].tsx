import { BellIcon } from '@chakra-ui/icons';
import { Img } from '@chakra-ui/image';
import { Badge, Box, Container, Divider, SimpleGrid, Text } from '@chakra-ui/layout';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import BlockQuote from '../../../components/blockQuote';
import PageListingLayout from '../../../components/pageListingLayout';
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
    if (!product) return null;

    // const { name, slug, isNew, rating, imageUrl, reviewCount, contentHtml, price } = product as Product;
    // if (!slug) {
    //     return false;
    // }

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
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ md: '1em' }}>
                    <Box bg="#282828" width="full" maxH="20em" overflow="hidden">
                        <Img
                            src={product.coverPicture.asset.url}
                            alt={product.coverPicture.alternativeText}
                            width="full"
                        />
                    </Box>
                    <Box bg="" p={4} textAlign={{ base: 'center', md: 'left' }}>
                        {/* <Heading>{title}</Heading> */}

                        <Rating rate={rate} count={reviewCount} />

                        <Text fontSize="4xl" fontWeight="bolder">
                            {firstPrice.amount}
                            {` `}
                            {firstPrice.currency}
                        </Text>

                        <AddToCart slug={product.slug} quantity={1} />
                    </Box>
                </SimpleGrid>

                <Box p={4} width="full" padding="1em">
                    <Divider my={4} w="100%" />
                    {/* <Box
                        className="externalHtml"
                        dangerouslySetInnerHTML={{ __html: sanitizeText(prod) }}
                    /> */}
                    <Box>
                        <Text as="p">{product.description}</Text>
                    </Box>
                </Box>
            </Container>
        </PageListingLayout>
    );
};

export default ProductPage;
