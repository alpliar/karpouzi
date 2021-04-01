import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import CategoryCard from '../../components/categoryCard';
import Layout, { siteTitle } from '../../components/pageLayout';
import { getRandomProduct } from '../api/products';

export async function getStaticProps() {
    const categories = [
        {
            slug: 'fruits',
            lang: 'fr',
            title: 'Fruits',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            productsCount: 7,
            products: [
                getRandomProduct(),
                getRandomProduct(),
                getRandomProduct(),
                getRandomProduct(),
                getRandomProduct(),
                getRandomProduct(),
                getRandomProduct()
            ]
        },
        {
            slug: 'veggies',
            lang: 'fr',
            title: 'Veggies',
            description: 'Ex dolorem non soluta sit reprehenderit! Natus vitae doloribus amet?',
            productsCount: 3,
            products: [getRandomProduct(), getRandomProduct(), getRandomProduct()]
        },
        {
            slug: 'spices',
            lang: 'fr',
            title: 'Spices',
            description: 'Reprehenderit, tempora excepturi tempore porro natus assumenda recusandae ipsam aliquid non velit officiis nihil, eum veritatis quaerat, corporis a totam quia rerum!',
            productsCount: 7,
            products: [getRandomProduct(), getRandomProduct(), getRandomProduct(), getRandomProduct(), getRandomProduct(), getRandomProduct(), getRandomProduct()]
        },
        {
            slug: 'oils',
            lang: 'fr',
            title: 'Oils',
            description: 'Magni veritatis officia dolore fuga cum, aliquid animi illum odit enim eius culpa tenetur deleniti quos, tempore velit, sequi possimus commodi aut?',
            productsCount: 5,
            products: [getRandomProduct(), getRandomProduct(), getRandomProduct(), getRandomProduct(), getRandomProduct()]
        }
    ];

    return {
        props: {
            categories
        }
    };
}

// export const getStaticPaths = ({ defaultLocale }) => {
//     return {
//         paths: [{ params: '', locale: defaultLocale }],
//         fallback: true
//     };
// };

type Product = any;

type Category = {
    slug: string,
    title: string,
    description: string,
    products: Product[],
    productsCount: number
}

type ShopPageProps = {
    categories: Category[]
}



export default function ShopPage({ categories } : ShopPageProps) {
    return (
        <Layout>
            <Head>
                <title>Shop - {siteTitle}</title>
            </Head>

            <Container p={4} maxW="4xl">
                <Heading>Shop</Heading>
            </Container>

            <Divider maxW="100%" />

            <Container p={4} maxW="4xl">
                <SimpleGrid
                    minChildWidth={{ base: 'full', sm: '250px', md: '300px' }}
                    spacingX="0.5em"
                    spacingY="1em">
                    {categories &&
                        categories.map((category) => {
                            return (
                                <CategoryCard
                                    key={category.slug}
                                    slug={category.slug}
                                    title={category.title}
                                    shortDescription={category.description}
                                    products={category.products}
                                    productsCount={category.productsCount}
                                />
                            );
                        })}
                </SimpleGrid>
            </Container>
        </Layout>
    );
}

ShopPage.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            slug: PropTypes.string.isRequired,
            productsCount: PropTypes.number.isRequired,
            products: PropTypes.array.isRequired
        }).isRequired
    ).isRequired
};
