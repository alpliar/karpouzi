import { BellIcon } from '@chakra-ui/icons';
import {
    Badge,
    Box,
    Button,
    Container,
    Stack,
    Text,
    useBreakpointValue,
    useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Root } from 'remark-html';
import Section from '../../../components/layout/Section';
import Link from '../../../components/link';
import MarkdownRendered from '../../../components/MarkdownRendered';
import PageListingLayout from '../../../components/pageListingLayout';
import Rating from '../../../components/rating';
import Reviews from '../../../components/Reviews';
import { API_BASE_URL } from '../../../constants/api';
import { ONE_DAY } from '../../../constants/time.constants';
import ShopCategory from '../../../graphql/models/shop/category.model';
import Product, {
    ParsedProductLocalization,
    ParsedProductLocalizations
} from '../../../graphql/models/shop/product.model';
import DateHelper from '../../../helpers/date.helper';
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
    const { isOpen, onToggle } = useDisclosure();
    const { formatMessage, formatNumber } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    // const imageSize = useBreakpointValue({ base: '100', md: 'xs', xl: 'sm' });
    // const bigImageSize = useBreakpointValue({ base: '32', sm: '44', md: 'sm', xl: 'lg' });
    const fillInspiringPicture = useBreakpointValue({ base: false, sm: !isOpen });
    const fillPrincipalImage = useBreakpointValue({ sm: true, md: false });

    if (!product) return null;

    const isNew = DateHelper.isNew(product.createdAt);
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
    const categoryName =
        category.localizations.find((localization) => localization.locale === router.locale)
            ?.name || category.name;

    const colorScheme = product.colorScheme || 'green';

    return (
        <PageListingLayout
            colorScheme={colorScheme}
            fullWidth
            title={productName}
            titleComplement={
                isNew && (
                    <Badge
                        display="flex"
                        alignItems="center"
                        colorScheme={product.colorScheme}
                        fontSize="md"
                        textTransform="lowercase">
                        <BellIcon mr={1} />
                        {f('new')}
                    </Badge>
                )
            }
            breadcrumbs={[
                {
                    link: '/',
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
                    text: categoryName,
                    link: `/shop/category/${category.slug}`,
                    alt: f('goToPageName', { name: categoryName }),
                    isCurrentPage: false
                },
                {
                    text: productName,
                    link: `/shop/product/${product.slug}`,
                    alt: productName,
                    isCurrentPage: true
                }
            ]}>
            <Head>
                <title>{`${productName} | ${f('menuEntryShop')} | ${f('commonSiteName')}`}</title>
                <meta property="og:type" content="og:product" />
                <meta property="og:title" content={productName} />
                <meta property="og:image" content={product.coverPicture.asset.url} />
                <meta
                    property="og:description"
                    content={product.description.toString().slice(0, 100)}
                />
                {/* <meta property="product:plural_title" content={product.pluralName} /> */}
                <meta property="product:price:amount" content={firstPrice.amount.toString()} />
                <meta property="product:price:currency" content={firstPrice.currency} />
            </Head>

            <Container p={{ base: 0 }} maxW="full">
                <Section
                    id="description"
                    isFirst
                    priorityImage
                    centerItems={false}
                    colorScheme={colorScheme}
                    useSecondaryColor
                    // customImageSize={imageSize}
                    isEven
                    // customDirection={isOpen ? 'column' : undefined}
                    fillImage={fillInspiringPicture}
                    title={f('description')}
                    // image={isOpen ? undefined : product.inspiringPicture?.asset.url}
                    image={product.inspiringPicture?.asset.url}
                    customImageSize={isOpen ? { base: 'full', md: '3xs', xl: 'xl' } : undefined}
                    imageThumbnail={product.inspiringPicture?.asset.thumbnail}
                    customDirection={isOpen ? { base: 'column', md: 'row' } : undefined}
                    customImageRatio={isOpen ? { base: 2 / 1, md: 1 / 2 } : undefined}
                    component={
                        <Stack spacing={5} textAlign="left" fontSize={{ xl: 'xl' }}>
                            {/* <Text as="p">{productDescription}</Text> */}
                            <Box maxHeight={isOpen ? 'inherit' : 'xs'} overflow="hidden">
                                <MarkdownRendered
                                    ast={productDescription}
                                    // noOfLines={!isOpen ? 8 : undefined}
                                />
                            </Box>
                            <Box>
                                {isOpen ? (
                                    <Link
                                        asButton
                                        href="#description"
                                        onClick={onToggle}
                                        buttonProps={{
                                            colorScheme:
                                                colorScheme === 'blackAlpha' ? 'gray' : colorScheme,
                                            shadow: 'md'
                                        }}>
                                        {f('readLess')}
                                    </Link>
                                ) : (
                                    <Button
                                        shadow="md"
                                        onClick={onToggle}
                                        colorScheme={
                                            colorScheme === 'blackAlpha' ? 'gray' : colorScheme
                                        }>
                                        {f('readMore')}
                                    </Button>
                                )}
                            </Box>
                        </Stack>
                    }
                />
                <Section
                    isEven={false}
                    colorScheme={colorScheme}
                    title={productName}
                    headingFontSize={{ base: '2xl', xl: '4xl' }}
                    image={product.coverPicture.asset.url}
                    imageThumbnail={product.coverPicture.asset.thumbnail}
                    sectionPattern="lisbon"
                    pattern="bamboo"
                    fillImage={fillPrincipalImage}
                    imageTransform={{ sm: 'scale(98%) rotate(-.5deg)' }}
                    component={
                        <Stack spacing={4} maxW="sm">
                            <Rating rate={rate} count={reviewCount} target="#reviews" />

                            <Text fontSize="4xl" lineHeight="1em" fontWeight="bold">
                                {formatNumber(firstPrice.amount, {
                                    style: 'currency',
                                    currency: firstPrice.currency
                                })}{' '}
                                <Text as="span" fontSize="md">
                                    {f(firstPrice.measurementUnit)}
                                </Text>
                            </Text>

                            <AddToCart slug={product.slug} name={productName} quantity={1} />
                        </Stack>
                    }
                />

                <Section
                    id="reviews"
                    colorScheme={colorScheme}
                    useSecondaryColor
                    title={f('reviews')}
                    component={<Reviews reviews={product.reviews} />}
                />

                <Section
                    sectionPattern="plus"
                    colorScheme={colorScheme}
                    useSecondaryColor
                    isEven={true}
                    title={f('fondOfName', { name: categoryName })}
                    url={`/shop/category/${category.slug}`}
                    buttonLabel={f('goToPageName', { name: categoryName })}
                    description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum minimaquaerat fugit ullam illo ipsa perspiciatis sit voluptatem!"
                    image={category.picture.url}
                    fillImage
                    imageTransform={{ md: 'scale(80%)' }}
                    customImageSize={{ base: 'full', sm: 'xs' }}
                    customImageRatio={{ base: 2 / 1, sm: undefined, md: 1 }}
                    pattern="iLikeFood"
                />
            </Container>
        </PageListingLayout>
    );
};

export default ProductPage;
