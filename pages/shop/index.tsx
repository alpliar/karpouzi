import { SimpleGrid } from '@chakra-ui/layout';
import { useIntl } from 'react-intl';
import BlockQuote from '../../components/blockQuote';
import CategoryCard from '../../components/categoryCard';
import PageListingLayout from '../../components/pageListingLayout';
import ShopStat from '../../components/shopStat';
import { API_BASE_URL } from '../../constants/api';
import ShopCategory from '../../graphql/models/shop/category.model';

export async function getStaticProps() {
    const response = await fetch(API_BASE_URL + '/shop/categories');

    const { categories } = await response.json();

    if (!categories) {
        return { notFound: true };
    }

    return {
        props: {
            categories
        }
    };
}

type ShopPageProps = {
    categories: ShopCategory[];
};

export default function ShopPage({ categories }: ShopPageProps) {
    // const { colorMode } = useColorMode();
    const intl = useIntl();
    const f = (id: string) => intl.formatMessage({ id });

    return (
        <PageListingLayout
            title={f('title')}
            breadcrumbs={[
                {
                    text: f('home'),
                    link: '/',
                    alt: intl.formatMessage({ id: 'goToPageName' }, { name: f('home') }),
                    isCurrentPage: false
                },
                {
                    text: f('title'),
                    link: '/shop',
                    alt: intl.formatMessage({ id: 'goToPageName' }, { name: f('title') }),
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
                    categories.map((category) => {
                        return (
                            <CategoryCard
                                fullHeight
                                key={category.slug}
                                slug={category.slug}
                                title={category.name}
                                image={category.picture.url || ''}
                                shortDescription={category.description}
                                // products={category.products.featured}
                                // productsCount={category.products.count}
                            />
                        );
                    })}
            </SimpleGrid>
        </PageListingLayout>
    );
}
