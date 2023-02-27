import { Box, Container } from '@chakra-ui/react';
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
    introSlot?: React.ReactNode;
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
    introSlot,
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
                {/* <Box>{bannerSlot && bannerSlot}</Box> */}

                <Container
                    // bgColor={`${colorScheme}.50`}
                    // _dark={{
                    //     bgColor: `${colorScheme}.800`
                    // }}
                    p={fullWidth ? 0 : containerPadding}
                    maxW={fullWidth ? 'full' : APP_MAX_WIDTH}>
                    {/* <Box maxW={APP_MAX_WIDTH} margin="auto"> */}
                    <Section
                        title={title}
                        titleComplement={titleComplement}
                        subtitle={introSlot}
                        colorScheme={colorScheme}
                        headingFontSize={{ base: '3xl', xl: '4xl' }}
                        useSecondaryColor
                        headingTag="h1"
                        // headingFontSize={{ base: '2xl', sm: '3xl' }}
                        aboveTitleSlot={<Breadcrumb entries={breadcrumbs} />}
                        component={
                            <>
                                {titleSlot}
                                {bannerSlot}
                            </>
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
