import { Container, Divider, Flex, Heading, Stack, Wrap } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import Head from 'next/head';
import Breadcrumb, { IBreadcrumbItemProps } from './breadcrumb';
import PageLayout, { siteTitle } from './pageLayout';

interface IPageLayoutProps {
    title: string;
    breadcrumbs: IBreadcrumbItemProps[];
    titleSlot?: React.ReactNode;
    introSlot?: React.ReactNode;
    children;
}

const PageListingLayout = ({
    children,
    breadcrumbs,
    title,
    titleSlot = null,
    introSlot = null
}: IPageLayoutProps) => {
    return (
        <PageLayout>
            <Head>
                <meta name="theme-color" content="#f0f" />
                <title>
                    {title} - {siteTitle}
                </title>
            </Head>
            <Container p={4} maxW="4xl">
                <Stack spacing={2}>
                    <Breadcrumb entries={breadcrumbs} />
                    <Wrap spacing={1} justify="space-between">
                        <Heading>{title}</Heading>

                        {titleSlot && titleSlot}
                        {/* <ShopStat label="Products" number={5} /> */}
                    </Wrap>
                    <Flex justifyContent={{ base: 'center', md: 'flex-end' }}>
                        {introSlot && introSlot}
                    </Flex>
                </Stack>
                {/* <Text>{categories?.length ?? 0} categories</Text> */}
            </Container>

            <Divider maxW="100%" />

            <Container p={{ sm: 4 }} maxW="4xl" /*paddingInline={{ base: 0, sm: '1rem' }}*/>
                {children}
            </Container>
        </PageLayout>
    );
};

export default chakra(PageListingLayout);
