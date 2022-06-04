import { SimpleGrid } from '@chakra-ui/layout';
import { useIntl } from 'react-intl';
import BlockQuote from '../../components/blockQuote';
import CategoryCard from '../../components/categoryCard';
import PageListingLayout from '../../components/pageListingLayout';
import ShopStat from '../../components/shopStat';
import { API_BASE_URL } from '../../constants/api';

export async function getStaticProps() {
    const response = await fetch(API_BASE_URL + '/shop/categories');
    const data = await response.json();

    if (!data.categories) {
        return { notFound: true };
    }

    return {
        props: {
            categories: data.categories
        }
    };
}

type Product = unknown;

interface CategoryProducts {
    count: number;
    featured?: Product[];
}

interface Category {
    slug: string;
    name: string;
    description: string;
    products: CategoryProducts;
    image: string;
}

type ShopPageProps = {
    categories: Category[];
};

export default function ShopPage({ categories }: ShopPageProps) {
    // const { colorMode } = useColorMode();
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    return (
        <PageListingLayout
            title={f('title')}
            breadcrumbs={[
                {
                    text: 'Home',
                    link: '/',
                    alt: 'go to home page',
                    isCurrentPage: false
                },
                {
                    text: f('title'),
                    link: '/shop',
                    alt: 'go to shop home',
                    isCurrentPage: true
                }
            ]}
            titleSlot={
                <ShopStat label="Categories" number={categories?.length ?? 0} textAlign="right" />
            }
            introSlot={
                <BlockQuote noOfLines={3}>
                    She put his pistol down, picked up her fletcher, dialed the barrel over to
                    single shot, and very carefully put a toxin dart through the center of a broken
                    mirror bent and elongated as they fell. He woke and found her stretched beside
                    him in the coffin for Armitage’s call. Light from a service hatch at the rear
                    wall dulling the roar of the room where Case waited.
                </BlockQuote>
            }>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 4 }} spacing={4}>
                {categories &&
                    categories.map((category: Category) => {
                        return (
                            <CategoryCard
                                fullHeight
                                key={category.slug}
                                slug={category.slug}
                                title={category.name}
                                image={category.image}
                                shortDescription={category.description}
                                products={category.products.featured}
                                productsCount={category.products.count}
                            />
                        );
                    })}
            </SimpleGrid>
        </PageListingLayout>
    );
}
