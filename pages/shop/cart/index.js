import Head from 'next/head';
import Layout from '../../../components/pageLayout';
import { Alert, AlertIcon, Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import Breadcrumb from '../../../components/breadcrumb';
import { useSelector } from 'react-redux';
import CartItem from '../../../components/cartItem';

export default function CartPage() {
    const { cart } = useSelector((state) => state.client);

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

            <Container py={4} px={{ base: 0, sm: 4 }} maxW="4xl">
                {cart.length > 0 && (
                    <SimpleGrid
                        minChildWidth={{ base: 'full', md: '450px' }}
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
