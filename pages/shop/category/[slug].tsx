import {
    Center,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    Wrap,
    WrapItem
} from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useIntl } from 'react-intl';
import Banner from '../../../components/banner';
import BlockQuote from '../../../components/blockQuote';
import Link from '../../../components/link';
import PageListingLayout from '../../../components/pageListingLayout';
import ProductCard from '../../../components/productCard';
import ShopStat from '../../../components/shopStat';
import { API_BASE_URL } from '../../../constants/api';
import { ONE_HOUR } from '../../../constants/time.constants';
import { ShopCategoryWithProductsAndAsset } from '../../../graphql/models/shop/category.model';
import CategoryHelper from '../../../helpers/category.helper';
import errorHandler from '../../../utils/errorsHandler';
import { CategoryResponse } from '../../api/shop/category/[slug]';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        if (!slug) throw new Error('Slug was not provided');

        const {
            data: { category }
        } = await axios.get<CategoryResponse>(API_BASE_URL + `/shop/category/${slug}`);

        // if (!category) throw new Error('Could not fetch category data');

        return {
            props: {
                category: category
            },
            revalidate: ONE_HOUR
        };
    } catch (err) {
        console.log(errorHandler(err));
        return {
            notFound: true
        };
    }
};
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    try {
        const slugs = await CategoryHelper.getCategoriesSlugs();

        if (!locales) throw new Error('no locales provided in next.config.js');

        const paths = slugs.flatMap((slug) => {
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

interface CategoryPageProps {
    category: ShopCategoryWithProductsAndAsset;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ category }) => {
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    const noProductBackground = useColorModeValue('orange.400', 'orange.800');
    if (!category) return null;

    return (
        <PageListingLayout
            title={category.name}
            breadcrumbs={[
                {
                    text: f('home'),
                    link: '/',
                    alt: f('goToPageName', { name: f('home') })
                },
                {
                    text: f('menuEntryShop'),
                    link: '/shop',
                    alt: f('goToPageName', { name: f('menuEntryShop') })
                },
                {
                    text: category.name,
                    link: `/shop/category/${category.slug}`,
                    alt: `${category.name} page`,
                    isCurrentPage: true
                }
            ]}
            introSlot={<BlockQuote noOfLines={3}>{category.description}</BlockQuote>}
            titleSlot={<ShopStat label={f('products')} number={category.products.length ?? 0} />}>
            {!!category.products.length ? (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} spacing={4}>
                    {category.products.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
                </SimpleGrid>
            ) : (
                <Banner
                    pattern="wiggle"
                    bgColor={noProductBackground}
                    height="inherit"
                    padding={16}>
                    <Center fontFamily="heading" fontSize={{ base: '2xl', lg: '4xl' }}>
                        <Stack spacing={8}>
                            <Text maxW="20ch">{f('noProductsInCategory')}</Text>
                            <Stack spacing={4}>
                                <Text fontSize={{ base: 'sm' }}>{f('sinceYoureHere')}</Text>
                                <Wrap justify="center">
                                    <WrapItem>
                                        <Link
                                            maxW={4}
                                            asButton
                                            href="/shop"
                                            buttonProps={{ size: 'sm' }}>
                                            {f('goToPageName', { name: 'shop' })}
                                        </Link>
                                    </WrapItem>
                                    <WrapItem>
                                        <Link
                                            maxW={4}
                                            asButton
                                            href="/"
                                            buttonProps={{ size: 'sm' }}>
                                            {f('goToPageName', { name: 'home' })}
                                        </Link>
                                    </WrapItem>
                                </Wrap>
                            </Stack>
                        </Stack>
                    </Center>
                </Banner>
            )}
        </PageListingLayout>
    );
};

export default CategoryPage;
