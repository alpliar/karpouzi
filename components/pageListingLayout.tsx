import { Box, Container, Flex, Heading, Stack, Wrap } from '@chakra-ui/react';
import { chakra, ColorMode, useColorMode, useColorModeValue } from '@chakra-ui/system';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';
import Breadcrumb, { IBreadcrumbItemProps } from './breadcrumb';
import { headerBgColor } from './Header';
import PageLayout, { siteTitle } from './pageLayout';
import ScrollProgressBar from './ScrollProgressBar';

interface IPageLayoutProps {
    title: string;
    breadcrumbs: IBreadcrumbItemProps[];
    fullWidth?: boolean;
    titleSlot?: React.ReactNode;
    introSlot?: React.ReactNode;
    bannerSlot?: React.ReactNode;
}

const PageListingLayout: React.FC<PropsWithChildren<IPageLayoutProps>> = ({
    children,
    breadcrumbs,
    title,
    fullWidth,
    titleSlot = null,
    introSlot = null,
    bannerSlot = null
}) => {
    const { colorMode } = useColorMode();

    const headerBgGradient = (colorMode: ColorMode) => {
        const gradientStart = headerBgColor(colorMode);
        return colorMode === 'light'
            ? `linear(to-b, ${gradientStart}, green.400)`
            : `linear(to-b, ${gradientStart}, green.900)`;
    };

    const bgPatternFillColor = useColorModeValue('white', 'gray.800');
    const bgPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm20 0a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM10 37a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm10-17h20v20H20V20zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z' fill='${bgPatternFillColor}' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`;
    const containerPadding = { base: 2, sm: 4 };

    return (
        <PageLayout>
            <Head>
                <title>{`${title} | ${siteTitle}`}</title>
            </Head>

            {/* LISTING'S HEADER */}
            <Box position="relative" bgGradient={headerBgGradient(colorMode)}>
                <Container paddingX={{ base: 2, sm: 4 }} paddingY={3} maxW={APP_MAX_WIDTH}>
                    <Stack spacing={2}>
                        {introSlot && (
                            <Flex
                                // pt={6}
                                justifyContent={{ base: 'center', md: 'flex-end' }}
                                zIndex="1">
                                {introSlot}
                            </Flex>
                        )}
                    </Stack>
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
                        WebkitMaskImage:
                            '-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,1)))'
                    }}
                />
            </Box>

            <Box>
                <Box
                    className="progress-bar-container"
                    position="fixed"
                    left="0"
                    right="0"
                    bottom="0px"
                    zIndex={2}
                    height={1}>
                    <ScrollProgressBar />
                </Box>
                <Box>{bannerSlot && bannerSlot}</Box>
                <Container
                    p={fullWidth ? 0 : containerPadding}
                    maxW={fullWidth ? 'full' : APP_MAX_WIDTH}>
                    <Box maxW={APP_MAX_WIDTH} margin="auto">
                        <Box padding={containerPadding} paddingBottom="inherit !important">
                            <Breadcrumb entries={breadcrumbs} />
                        </Box>
                        <Wrap
                            p={{ base: 2, sm: 4 }}
                            spacing={1}
                            justify="space-between"
                            // mb={{ base: 4, sm: 8 }}
                        >
                            <Heading as="h1" fontSize="5xl" maxW="lg" paddingLeft={0}>
                                {title}
                            </Heading>

                            {titleSlot && titleSlot}
                        </Wrap>
                    </Box>
                    {children}
                </Container>
            </Box>
        </PageLayout>
    );
};

export default chakra(PageListingLayout);
