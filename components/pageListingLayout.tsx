import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Container, Divider, Flex, Heading, Stack, Wrap } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import Head from 'next/head';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';
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

    const bgPatternFillColor = useColorModeValue('white', 'gray.800');
    const bgPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm20 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 37a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10-17h20v20H20V20zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' fill='${bgPatternFillColor}' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`;

    return (
        <PageLayout>
            <Head>
                <meta name="theme-color" content="#f0f" />
                <title>
                    {title} - {siteTitle}
                </title>
            </Head>

            {/* LISTING'S HEADER */}
            <Box
                position="relative"
                // bgColor={headerBgColor(colorMode)}
                bgGradient={headerBgGradient(colorMode)}>
                <Container p={4} maxW={APP_MAX_WIDTH}>
                    <Stack spacing={2}>
                        <Breadcrumb entries={breadcrumbs} />
                        <Wrap spacing={1} justify="space-between">
                            <Heading as="h1" maxW="lg">
                                {title}
                            </Heading>

                            {titleSlot && titleSlot}
                            {/* <ShopStat label="Products" number={5} /> */}
                        </Wrap>
                        <Flex pt={6} justifyContent={{ base: 'center', md: 'flex-end' }} zIndex="1">
                            {introSlot && introSlot}
                        </Flex>
                    </Stack>
                    {/* <Text>{categories?.length ?? 0} categories</Text> */}
                </Container>

                <Box
                    _before={{
                        content: `''`,
                        display: 'block',
                        backgroundImage: bgPattern,
                        position: 'absolute',
                        width: '100%',
                        height: '50%',
                        top: '50%',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 0.2,
                        '-webkit-mask-image':
                            '-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,1)))'
                    }}
                />
            </Box>

            <Box>
                <Container
                    p={{ base: 4 }}
                    maxW={APP_MAX_WIDTH} /*paddingInline={{ base: 0, sm: '1rem' }}*/
                >
                    {children}
                </Container>
            </Box>
        </PageLayout>
    );
};

export default chakra(PageListingLayout);
