import { SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Root } from 'remark-html';
import BlockQuote from '../../../components/blockQuote';
import NoContentBanner from '../../../components/NoContentBanner';
import PageListingLayout from '../../../components/pageListingLayout';
import ProductCard from '../../../components/productCard';
import ShopStat from '../../../components/shopStat';
import { API_BASE_URL } from '../../../constants/api';
import { ONE_HOUR } from '../../../constants/time.constants';
import { APP_MAX_WIDTH } from '../../../constants/ui/main.layout';
import {
    ParsedCategoryLocalizations,
    ShopCategoryWithProductsAndAsset
} from '../../../graphql/models/shop/category.model';
import CategoryHelper from '../../../helpers/category.helper';
import MarkdownHelper from '../../../helpers/markdown.helper';
import errorHandler from '../../../utils/errorsHandler';
import { CategoryResponse } from '../../api/shop/category/[slug]';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        if (!slug) throw new Error('Slug was not provided');

        const {
            data: { category }
        } = await axios.get<CategoryResponse>(API_BASE_URL + `/shop/category/${slug}`);

        if (!category) throw new Error('Could not fetch category data');

        const description = MarkdownHelper.parseMarkdown(category.description);
        const localizations = category.localizations.map((locale) => ({
            ...locale
            // description: MarkdownHelper.parseMarkdown(locale.description)
        }));

        return {
            props: {
                category: category,
                description,
                localizations
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
    localizations: ParsedCategoryLocalizations;
    _description: Root;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ category, localizations, _description }) => {
    const router = useRouter();
    const { formatMessage } = useIntl();
    const f = (id: string, values: any = null) => formatMessage({ id }, values);

    if (!category) return null;

    const localized = localizations?.find((i18n) => i18n.locale === router.locale);

    const categoryName = localized?.name || category.name;
    const categoryDescription = localized?.description || category.description;

    // console.log(categoryName, categoryDescription);

    return (
        <PageListingLayout
            fullWidth
            title={categoryName}
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
                    text: categoryName,
                    link: `/shop/category/${category.slug}`,
                    alt: f('goToPageName', { name: categoryName }),
                    isCurrentPage: true
                }
            ]}
            introSlot={<BlockQuote noOfLines={3}>{categoryDescription.toString()}</BlockQuote>}
            titleSlot={<ShopStat label={f('products')} number={category.products.length ?? 0} />}>
            {!!category.products.length ? (
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
                    spacing={4}
                    mx="auto"
                    maxWidth={APP_MAX_WIDTH}>
                    {category.products.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
                </SimpleGrid>
            ) : (
                <NoContentBanner
                    text={f('nothingToDisplay')}
                    helperText={f('sinceYoureHere')}
                    links={[
                        {
                            href: '/shop',
                            text: f('goToPageName', { name: f('menuEntryShop') })
                        },
                        {
                            href: '/blog',
                            text: f('goToPageName', { name: f('menuEntryBlog') })
                        }
                    ]}
                />
            )}
        </PageListingLayout>
    );
};

export default CategoryPage;
