import { Box, Container, Stack } from '@chakra-ui/react';
import { chakra, ThemingProps } from '@chakra-ui/system';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';
import Breadcrumb, { IBreadcrumbItemProps } from './breadcrumb';
import Section from './layout/Section';
import PageLayout, { siteTitle } from './pageLayout';
import ScrollProgressBar from './ScrollProgressBar';

interface IPageLayoutProps {
    title: string;
    breadcrumbs: IBreadcrumbItemProps[];
    fullWidth?: boolean;
    titleSlot?: React.ReactNode;
    titleComplement?: string;
    subtitle?: React.ReactNode;
    bannerSlot?: React.ReactNode;
    colorScheme?: ThemingProps['colorScheme'];
}

const PageListingLayout: React.FC<PropsWithChildren<IPageLayoutProps>> = ({
    children,
    breadcrumbs,
    title,
    fullWidth,
    titleSlot,
    titleComplement,
    subtitle,
    bannerSlot,
    colorScheme
}) => {
    const containerPadding = { base: 2, sm: 4 };

    return (
        <PageLayout colorScheme={colorScheme}>
            <Head>
                <title>{`${title} | ${siteTitle}`}</title>
            </Head>

            <Box>
                <Box
                    className="progress-bar-container"
                    position="fixed"
                    left="0"
                    right="0"
                    bottom="0px"
                    zIndex={2}
                    height={2}>
                    <ScrollProgressBar colorScheme={colorScheme} />
                </Box>

                <Container
                    p={fullWidth ? 0 : containerPadding}
                    maxW={fullWidth ? 'full' : APP_MAX_WIDTH}>
                    <Section
                        title={title}
                        titleComplement={titleComplement}
                        subtitle={subtitle}
                        colorScheme={colorScheme}
                        headingFontSize={{ base: '3xl', xl: '4xl' }}
                        useSecondaryColor
                        headingTag="h1"
                        aboveTitleSlot={<Breadcrumb entries={breadcrumbs} />}
                        component={
                            <Stack spacing={2}>
                                <Box>{titleSlot}</Box>
                                <Box>{bannerSlot}</Box>
                            </Stack>
                        }
                        paddingY={{ base: 2, sm: 4 }}
                    />
                    {children}
                </Container>
            </Box>
        </PageLayout>
    );
};

export default chakra(PageListingLayout);
