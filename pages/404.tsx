import { Box, Container, Divider, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/PageLayout';

export default function Custom404() {
    return (
        <Layout>
            <Head>404 - {siteTitle}</Head>

            <Container p={0}>
                <Box p={4}>
                    <Heading>404</Heading>
                </Box>
                <Divider />
                <Box p={4}>
                    <Heading>Page not found</Heading>
                </Box>
            </Container>
        </Layout>
    );
}
