import { Alert, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import BlockQuote from '../../../components/blockQuote';
import PageListingLayout from '../../../components/pageListingLayout';
import ProductCard from '../../../components/productCard';
import ShopStat from '../../../components/shopStat';
import { API_BASE_URL } from '../../../constants/api';
import {
    ShopCategoriesData,
    ShopCategoryExcerpt
} from '../../../graphql/models/shop/category.model';
import { CategoryResponse } from '../../api/shop/category/[slug]';

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const slug = params?.slug;

        const {
            data: { category }
        } = await axios.get<CategoryResponse>(API_BASE_URL + `/shop/category/${slug}`);

        if (!category) throw new Error('Could not fetch category data');

        return {
            props: {
                category: category
            }
        };
    } catch (err) {
        return {
            notFound: true
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const {
            data: { categories }
        } = await axios.post<ShopCategoriesData>(API_BASE_URL + '/shop/categories');

        if (!categories) throw new Error('Could not fetch categories data');

        return {
            paths: categories.map(({ slug }) => ({
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

const CategoryPage: NextPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (!props.category) return null;

    const category = props.category as ShopCategoryExcerpt;

    return (
        <PageListingLayout
            title={category.name}
            breadcrumbs={[
                {
                    text: 'Home',
                    link: '/',
                    alt: 'go to home'
                },
                {
                    text: 'Shop',
                    link: '/shop',
                    alt: 'go to shop home'
                },
                {
                    text: category.name,
                    link: `/shop/category/${category.slug}`,
                    alt: `${category.name} page`,
                    isCurrentPage: true
                }
            ]}
            introSlot={<BlockQuote noOfLines={3}>{category.description}</BlockQuote>}
            titleSlot={<ShopStat label="Products" number={category.products.length ?? 0} />}>
            {!!category.products.length ? (
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} spacing={4}>
                    {category.products.map((product) => {
                        return (
                            <>
                                <ProductCard key={product.id} product={product} />
                            </>
                        );
                    })}
                </SimpleGrid>
            ) : (
                <Alert>No products to show</Alert>
            )}
        </PageListingLayout>
    );
};

export default CategoryPage;
