import { SimpleGrid } from '@chakra-ui/layout';
import axios from 'axios';
import { GetStaticProps } from 'next';
import { useIntl } from 'react-intl';
import CategoryCard from '../../components/categoryCard';
import PageListingLayout from '../../components/pageListingLayout';
import { API_BASE_URL } from '../../constants/api';
import { ONE_HOUR } from '../../constants/time.constants';
import { APP_MAX_WIDTH } from '../../constants/ui/main.layout';
import { ShopCategoryWithProductsAndAsset } from '../../graphql/models/shop/category.model';
import errorHandler from '../../utils/errorsHandler';
import { CategoriesResponse } from '../api/shop/categories';

export const getStaticProps: GetStaticProps = async () => {
    try {
        const {
            data: { categories }
        } = await axios.get<CategoriesResponse>(API_BASE_URL + '/shop/categories');

        return {
            props: {
                categories
            },
            revalidate: ONE_HOUR
        };
    } catch (err) {
        console.error(errorHandler(err));
        return {
            notFound: true
        };
    }
};

type ShopPageProps = {
    categories: ShopCategoryWithProductsAndAsset[];
};

export default function ShopPage({ categories }: ShopPageProps) {
    // const { colorMode } = useColorMode();
    const intl = useIntl();
    const f = (id: string) => intl.formatMessage({ id });

    return (
        <PageListingLayout
            fullWidth
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
            titleComplement={` (${categories?.length || 0} ${f('categories').toLocaleLowerCase()})`}
            introSlot={intl.formatMessage({ id: 'shopDescription' })}>
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
                spacing={4}
                mx="auto"
                maxWidth={APP_MAX_WIDTH}
                paddingY={{ base: 2, sm: 4 }}>
                {categories &&
                    categories.map((category) => {
                        return <CategoryCard key={category.id} category={category} />;
                    })}
            </SimpleGrid>
        </PageListingLayout>
    );
}
