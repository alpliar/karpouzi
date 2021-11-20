import { Avatar } from '@chakra-ui/avatar';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import {
    Container,
    Divider,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    Wrap
} from '@chakra-ui/layout';
import Head from 'next/head';
import BlockQuote from '../../components/blockQuote';
import Breadcrumb from '../../components/breadcrumb';
import CategoryCard from '../../components/categoryCard';
import Layout, { siteTitle } from '../../components/pageLayout';
import ShopStat from '../../components/shopStat';
import { API_BASE_URL } from '../../constants/api';

export async function getStaticProps() {
    // const response = await fetch(API_BASE_URL + '/shop/categories');
    // const data = await response.json();
    // if (!data.categories) {
    //     return { notFound: true };
    // }
    // return {
    //     props: {
    //         categories: data.categories
    //     }
    // };
    return {
        props: {
            categories: []
        }
    };
}

type Product = any;

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
    const { colorMode } = useColorMode();
    return (
        <Layout>
            <Head>
                <title>Shop - {siteTitle}</title>
            </Head>

            <Container p={4} maxW="4xl">
                <Stack spacing={2}>
                    <Breadcrumb
                        entries={[
                            {
                                text: 'Home',
                                link: '/',
                                alt: 'go to home page',
                                isCurrentPage: false
                            },
                            {
                                text: 'Shop',
                                link: '/shop',
                                alt: 'go to shop home',
                                isCurrentPage: true
                            }
                        ]}
                    />
                    <Wrap spacing={1} justify="space-between">
                        <Heading>Shop</Heading>

                        <ShopStat
                            label="Categories"
                            number={categories?.length ?? 0}
                            textAlign="right"
                        />
                        {/* <ShopStat label="Products" number={5} /> */}
                    </Wrap>
                    <Flex justifyContent={{ base: 'center', md: 'flex-end' }}>
                        <BlockQuote>
                            She put his pistol down, picked up her fletcher, dialed the barrel over
                            to single shot, and very carefully put a toxin dart through the center
                            of a broken mirror bent and elongated as they fell. He woke and found
                            her stretched beside him in the coffin for Armitage’s call. Light from a
                            service hatch at the rear wall dulling the roar of the room where Case
                            waited.
                        </BlockQuote>
                    </Flex>
                </Stack>
                {/* <Text>{categories?.length ?? 0} categories</Text> */}
            </Container>

            <Divider maxW="100%" />

            <Container p={4} maxW="4xl">
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
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
            </Container>
        </Layout>
    );
}
