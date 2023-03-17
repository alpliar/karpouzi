import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Root } from 'remark-html';
import Section from '../../../components/layout/Section';
import ShopGrid from '../../../components/layout/ShopGrid';
import NoContentBanner from '../../../components/NoContentBanner';
import PageListingLayout from '../../../components/PageListingLayout';
import ProductCard from '../../../components/ProductCard';
import { API_BASE_URL } from '../../../constants/api';
import { ONE_HOUR } from '../../../constants/time.constants';
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

    if (!category) return null;

    const localized = localizations?.find((i18n) => i18n.locale === router.locale);

    const categoryName = localized?.name || category.name;
    const categoryDescription = localized?.description || category.description;

    // console.log(categoryName, categoryDescription);

    return (
        <PageListingLayout
            fullWidth
            title={categoryName}
            titleComplement={`(${category.products.length} ${formatMessage({
                id: 'products'
            })})`.toLocaleLowerCase()}
            subtitle={categoryDescription.toString()}
            breadcrumbs={[
                {
                    text: formatMessage({ id: 'menuEntryShop' }),
                    link: '/shop',
                    alt: formatMessage(
                        { id: 'goToPageName' },
                        { name: formatMessage({ id: 'menuEntryShop' }) }
                    )
                },
                {
                    text: categoryName,
                    link: `/shop/category/${category.slug}`,
                    alt: formatMessage({ id: 'goToPageName' }, { name: categoryName }),
                    isCurrentPage: true
                }
            ]}>
            <Section
                title={formatMessage({ id: 'products' })}
                colorScheme="white"
                component={
                    <>
                        {!!category.products.length ? (
                            <ShopGrid>
                                {category.products.map((product) => {
                                    return <ProductCard key={product.id} product={product} />;
                                })}
                            </ShopGrid>
                        ) : (
                            <NoContentBanner
                                text={formatMessage({ id: 'nothingToDisplay' })}
                                helperText={formatMessage({ id: 'sinceYoureHere' })}
                                links={[
                                    {
                                        href: '/shop',
                                        text: formatMessage(
                                            { id: 'goToPageName' },
                                            { name: formatMessage({ id: 'menuEntryShop' }) }
                                        )
                                    },
                                    {
                                        href: '/blog',
                                        text: formatMessage(
                                            { id: 'goToPageName' },
                                            { name: formatMessage({ id: 'menuEntryBlog' }) }
                                        )
                                    }
                                ]}
                            />
                        )}
                    </>
                }
            />
        </PageListingLayout>
    );
};

export default CategoryPage;
