import { BellIcon } from '@chakra-ui/icons';
import { Img } from '@chakra-ui/image';
import { Badge, Box, Container, Divider, SimpleGrid, Text } from '@chakra-ui/layout';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import BlockQuote from '../../../components/blockQuote';
import PageListingLayout from '../../../components/pageListingLayout';
import Rating from '../../../components/rating';
import AddToCart from '../../../container/addToCart';
import { getAllProductIds, getProductData } from '../../../lib/products';
import { sanitizeText } from '../../../utils/sanitize';

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const product = context.params?.slug
            ? await getProductData(context.params.slug?.toLocaleString())
            : undefined;
        return {
            props: {
                product
            }
        };
    } catch (_err) {
        // console.warn(err);
    }

    return {
        props: {}
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllProductIds();

    return {
        paths,
        fallback: true
    };
};

const ProductPage: NextPage = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { title, slug, isNew, rating, imageUrl, reviewCount, contentHtml, price } = product;
    // if (!slug) {
    //     return false;
    // }
    return (
        <PageListingLayout
            title={title}
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
                { text: slug, link: '', alt: '', isCurrentPage: true }
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
                <title>Shop - {title}</title>
            </Head>

            <Container p={{ base: 0 }} maxW="full">
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ md: '1em' }}>
                    <Box bg="#282828" width="full" maxH="20em" overflow="hidden">
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
        </PageListingLayout>
    );
};

export default ProductPage;
