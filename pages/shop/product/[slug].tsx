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
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Root } from 'remark-html';
import Banner from '../../../components/banner';
import { Image } from '../../../components/image';
import MarkdownRendered from '../../../components/MarkdownRendered';
import PageListingLayout from '../../../components/pageListingLayout';
import Polaroid from '../../../components/polaroid';
import Rating from '../../../components/rating';
import Reviews from '../../../components/Reviews';
import { API_BASE_URL } from '../../../constants/api';
import { ONE_DAY } from '../../../constants/time.constants';
import ShopCategory from '../../../graphql/models/shop/category.model';
import Product, {
    ParsedProductLocalization,
    ParsedProductLocalizations
} from '../../../graphql/models/shop/product.model';
import MarkdownHelper from '../../../helpers/markdown.helper';
import AddToCart from '../../../redux/container/addToCart';
import { ProductResponse } from '../../api/shop/product/[slug]';
import { ProductsResponse } from '../../api/shop/products/slugs';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        if (typeof slug !== 'string') throw new Error('Slug is missing in params');

        const {
            data: { product }
        } = await axios.get<ProductResponse>(API_BASE_URL + `/shop/product/${slug}`);

        if (!product) throw new Error('Could not fetch product');
        const description = MarkdownHelper.parseMarkdown(product.description);
        const localizations = product.localizations.map((locale) => ({
            ...locale,
            description: MarkdownHelper.parseMarkdown(locale.description)
        }));

        return {
            props: {
                product,
                description,
                localizations
            },
            revalidate: ONE_DAY
        };
    } catch (err) {
        console.error(err);
        return {
            notFound: true
        };
    }
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    try {
        const {
            data: { products }
        } = await axios.get<ProductsResponse>(API_BASE_URL + `/shop/products/slugs`);

        if (!locales) throw new Error('no locales provided in next.config.js');

        const paths = products.flatMap(({ slug }) => {
            return locales.map((locale) => {
                return {
                    params: {
                        slug
                    },
                    locale
                };
            });
        });

        return {
            paths,
            fallback: true
        };
    } catch (err) {
        return {
            paths: [],
            fallback: true
        };
    }
};

interface ProductPageProps {
    product: Product;
    description: Root;
    localizations: ParsedProductLocalizations;
}

const ProductPage: NextPage<ProductPageProps> = ({ product, description, localizations }) => {
    const router = useRouter();
    const { formatMessage, formatNumber } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const showAsPolaroid = useBreakpointValue({ base: false, xl: true });
    const pictureSizes = useBreakpointValue({ base: '320px', md: '640px' });

    if (!product) return null;

    const isNew = false;
    const reviewCount = product.reviews.length;
    const rate =
        reviewCount > 0
            ? product.reviews.map((rev) => rev.rating).reduce((a, b) => a + b) / reviewCount
            : 0;
    const [firstPrice] = product.prices;
    const [category]: Array<ShopCategory> | undefined = product.productCategories;

    const localized: ParsedProductLocalization | undefined = localizations.find(
        (i18n) => i18n.locale === router.locale
    );

    const productName = localized?.name || product.name;
    const productDescription = localized?.description || description;

    return (
        <PageListingLayout
            title={productName}
            breadcrumbs={[
                {
                    link: '/home',
                    alt: f('goToPageName', { name: f('home') }),
                    text: f('home'),
                    isCurrentPage: false
                },
                {
                    link: '/shop',
                    alt: f('goToPageName', { name: f('menuEntryShop') }),
                    text: f('menuEntryShop'),
                    isCurrentPage: false
                },
                {
                    text: category.name,
                    link: `/shop/category/${category.slug}`,
                    alt: f('goToPageName', { name: category.name }),
                    isCurrentPage: false
                },
                {
                    text: productName,
                    link: `/shop/product/${product.slug}`,
                    alt: productName,
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
            // introSlot={<BlockQuote noOfLines={3}>Blah blah</BlockQuote>}
        >
            <Head>
                <title>
                    {productName} | {f('menuEntryShop')} | {f('commonSiteName')}
                </title>
                <meta property="og:type" content="og:product" />
                <meta property="og:title" content={productName} />
                <meta property="og:image" content={product.coverPicture.asset.url} />
                <meta
                    property="og:description"
                    content={productDescription.toString().slice(0, 100)}
                />
                {/* <meta property="product:plural_title" content={product.pluralName} /> */}
                <meta property="product:price:amount" content={firstPrice.amount.toString()} />
                <meta property="product:price:currency" content={firstPrice.currency} />
            </Head>

            <Container p={{ base: 0 }} maxW="full">
                <Stack spacing={16}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ md: '1em' }}>
                        <Polaroid title={productName} unstyled={!showAsPolaroid}>
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={product.coverPicture.asset.url}
                                    alt={product.coverPicture.alternativeText}
                                    sizes={pictureSizes}
                                    width={pictureSizes}
                                    priority
                                    quality={90}
                                    blurDataURL={product.coverPicture.asset.thumbnail}
                                />
                            </AspectRatio>
                        </Polaroid>

                        <Box bg="" p={4} textAlign={{ base: 'center', md: 'left' }}>
                            <Heading as="p" fontSize="2xl">
                                {productName}
                            </Heading>

                            <Rating rate={rate} count={reviewCount} />

                            <Text fontSize="4xl" fontWeight="bolder">
                                {formatNumber(firstPrice.amount, {
                                    style: 'currency',
                                    currency: firstPrice.currency
                                })}
                            </Text>

                            <AddToCart slug={product.slug} quantity={1} />

                            <Divider my={4} w="100%" />

                            <Box
                                padding={{ base: '1rem', xl: '1.5rem' }}
                                maxH={{ base: undefined, md: '96' }}
                                overflow="auto">
                                <Stack
                                    spacing={5}
                                    textAlign="left"
                                    fontSize={{ base: 'xl', xl: '2xl' }}>
                                    {/* <Text as="p">{productDescription}</Text> */}
                                    <MarkdownRendered ast={productDescription} />
                                </Stack>
                            </Box>
                        </Box>
                    </SimpleGrid>
                    <Banner pattern="iLikeFood">
                        <Stack maxW="lg" fontSize="sm" fontWeight="bold" p={3} spacing={4}>
                            <Heading>{f('fondOfName', { name: category.name })}</Heading>
                            <Text>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum
                                minima quaerat fugit ullam illo ipsa perspiciatis sit voluptatem!
                            </Text>
                        </Stack>
                    </Banner>
                    <Box>
                        <Reviews reviews={product.reviews} />
                    </Box>
                </Stack>
            </Container>
        </PageListingLayout>
    );
};

export default ProductPage;
