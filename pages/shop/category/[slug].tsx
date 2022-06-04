import { SimpleGrid } from '@chakra-ui/layout';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { GiTomato } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { SET_PRODUCTS_DATA } from '../../../actions/shop';
import BlockQuote from '../../../components/blockQuote';
import PageListingLayout from '../../../components/pageListingLayout';
import ProductCard from '../../../components/productCard';
import ShopStat from '../../../components/shopStat';
import { getSortedProductData } from '../../../lib/products';
import { RootState } from '../../../reducer';
import { wrapper } from '../../../store';

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(({ store }) => {
    const products = getSortedProductData();
    store.dispatch({ type: SET_PRODUCTS_DATA, products: products });
});

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { slug: 'fruits' }, locale: 'en' },
            { params: { slug: 'veggies' }, locale: 'en' }
        ],
        fallback: true
    };
};

const CategoryPage: NextPage = () => {
    const { products } = useSelector((state: RootState) => state.server);

    return (
        <PageListingLayout
            title="Fruits"
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
                    text: 'category',
                    link: '/shop/category/fruits',
                    alt: 'fruits page',
                    isCurrentPage: true
                }
            ]}
            introSlot={
                <BlockQuote noOfLines={3}>
                    Case had never seen him wear the same suit twice, although his wardrobe seemed
                    to consist entirely of meticulous reconstruction’s of garments of the blowers
                    and the amplified breathing of the fighters.
                </BlockQuote>
            }
            titleSlot={<ShopStat label="Products" number={products?.length ?? 0} />}>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} spacing={4}>
                {products &&
                    products.length &&
                    products.map((product, index) => (
                        <ProductCard
                            key={`${product.slug}-${index}`}
                            slug={product.slug}
                            title={product.title}
                            imageUrl={product.imageUrl}
                            imageAlt={`${product.title} picture`}
                            formattedPrice={product.price}
                            isNew={product.isNew}
                            reviewCount={product.reviewCount}
                            rating={product.rating}
                            ratingIcon={GiTomato}
                        />
                    ))}
            </SimpleGrid>
        </PageListingLayout>
    );
};

export default CategoryPage;
