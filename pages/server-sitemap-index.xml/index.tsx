import { GetServerSideProps } from 'next';
import { getServerSideSitemapIndex } from 'next-sitemap';
import CategoryHelper from '../../helpers/category.helper';
import PostHelper from '../../helpers/post.helper';
import ProductHelper from '../../helpers/product.helper';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')

    const baseUrl = process.env.NEXT_PUBLIC_URL || '';

    const shopCategoriesUrls = (await CategoryHelper.getCategories()).map(
        ({ slug }) => `${baseUrl}/shop/category/${slug}`
    );

    const productsUrls = (await ProductHelper.getAllProductsSlugs()).map(
        ({ slug }) => `${baseUrl}/shop/product/${slug}`
    );

    const blogPostsUrls = (await PostHelper.getPosts()).map(
        ({ slug }) => `${baseUrl}/blog/post/${slug}`
    );

    return getServerSideSitemapIndex(ctx, [
        ...shopCategoriesUrls,
        ...productsUrls,
        ...blogPostsUrls
    ]);
};

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapIndex() {}
