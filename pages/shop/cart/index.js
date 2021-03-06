import Head from 'next/head';
import Layout from '../../../components/pageLayout';
import { Alert, AlertIcon, Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import Breadcrumb from '../../../components/breadcrumb';
// import { getSortedProductData } from '../../../lib/products';

// import { wrapper } from '../../../reducer';
import { useSelector } from 'react-redux';
import CartItem from '../../../components/cartItem';
// import { SET_PRODUCTS_DATA } from '../../../actions/shop';

// export const getStaticProps = wrapper.getStaticProps(({ store }) => {
//     const productsData = getSortedProductData();
//     store.dispatch({ type: SET_PRODUCTS_DATA, payload: productsData });
// });

// export async function getStaticPaths() {
//     return {
//         paths: [{ params: { slug: 'fruits' } }, { params: { slug: 'veggies' } }],
//         fallback: false
//     };
// }

export default function CartPage() {
    const { cart } = useSelector((state) => state.shop);

    return (
        <Layout>
            <Head>
                <title>Shop - Cart</title>
            </Head>

            <Container px={4} py={4} maxW="4xl">
                <Breadcrumb
                    entries={[
                        {
                            text: 'Shop',
                            link: '/shop',
                            alt: 'go to shop home',
                            isCurrentPage: false
                        },
                        { text: 'Cart', link: '', alt: '', isCurrentPage: true }
                    ]}
                />
                <Heading size="xl" pr="20%">
                    My cart
                </Heading>
            </Container>

            <Divider w="100%" />

            <Container py={4} px={{ base: 0, md: 4 }} maxW="4xl">
                {cart.length > 0 && (
                    <SimpleGrid
                        minChildWidth={{ base: 'full', sm: '230px' }}
                        spacingX="0.5em"
                        spacingY="1em">
                        {cart.map((item, index) => (
                            <CartItem
                                key={`${item.slug}-${index}`}
                                title={item.slug}
                                quantity={item.quantity}
                            />
                        ))}
                    </SimpleGrid>
                )}

                {cart.length === 0 && (
                    <Alert status="info">
                        <AlertIcon />
                        You don&rsquo;t have any product in your cart !
                    </Alert>
                )}
            </Container>
        </Layout>
    );
}
