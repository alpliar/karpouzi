import Head from 'next/head';
import Layout, { siteTitle } from '../../components/layout';

import { Container, Divider, Heading } from '@chakra-ui/react';

export default function ShopPage() {
    // const [showModal, setShowModal] = useState(false);

    return (
        <Layout>
            <Head>
                <title>Shop - {siteTitle}</title>
            </Head>

            <Container p={4} maxW="4xl">
                <Heading>Shop</Heading>
            </Container>

            <Divider maxW="100%" />

            <Container p={4} maxW="4xl"></Container>
        </Layout>
    );
}
