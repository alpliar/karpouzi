import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Container, Divider, Flex, Heading, Stack, Wrap } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import Head from 'next/head';
import Breadcrumb, { IBreadcrumbItemProps } from './breadcrumb';
import { headerBgColor, headerBgGradient } from './Header';
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
    const { colorMode } = useColorMode();

    const headerBgGradient = (colorMode) => {
        const gradientStart = headerBgColor(colorMode);
        return colorMode === 'light'
            ? `linear(to-b, ${gradientStart}, green.400)`
            : `linear(to-b, ${gradientStart}, green.900)`;
    };

    return (
        <PageLayout>
            <Head>
                <meta name="theme-color" content="#f0f" />
                <title>
                    {title} - {siteTitle}
                </title>
            </Head>
            <Box
                // bgColor={headerBgColor(colorMode)}
                bgGradient={headerBgGradient(colorMode)}>
                <Container p={4} maxW={{ md: '4xl', xl: '6xl' }}>
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
            </Box>

            <Divider maxW="100%" />

            <Box
            // backgroundColor={
            //     colorMode === 'light' ? 'rgba(255,99,71,0.8)' : 'rgba(255,0,0,0.1)'
            // }
            // roundedBottom="3xl"
            >
                <Container
                    p={{ sm: 4 }}
                    maxW={{ md: '4xl', xl: '6xl' }} /*paddingInline={{ base: 0, sm: '1rem' }}*/
                >
                    {children}
                </Container>
            </Box>
        </PageLayout>
    );
};

export default chakra(PageListingLayout);
