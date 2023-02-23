import { Container, Divider, Flex, Stack, Text } from '@chakra-ui/layout';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import Banner from '../components/banner';
import CallToActionNewsletter from '../components/callToActionNewsletter';
import CallToActionWithAnnotation from '../components/callToActionWithAnnotation';
import SectionSideBySide, { Section } from '../components/layout/sectionSideBySide';
import PageLayout, { siteTitle } from '../components/pageLayout';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';

export default function Home() {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });
    const { data: session } = useSession();

    const sections: Section[] = [
        {
            title: f('welcomeDiscoverProducts'),
            description: f('welcomeDiscoverProductsDescription'),
            url: '/shop',
            image: '/images/shop.webp',
            buttonLabel: f('welcomeShopCTA')
        },
        {
            title: f('welcomeDiscoverKarpouzi'),
            description: f('welcomeDiscoverKarpouziDescription'),
            url: '/blog',
            image: '/images/karpouzi_hero.webp',
            buttonLabel: f('welcomeBlogCTA')
        }
    ];

    return (
        <PageLayout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Banner pattern="wiggle" height="inherit">
                <CallToActionWithAnnotation
                    title={
                        <>
                            <Flex direction="column" as="span" align="start" justify="start">
                                <Text fontSize="0.75em" style={{ fontVariantCaps: 'small-caps' }}>
                                    {`${session?.user?.name ? session?.user?.name + ', ' : ''}
                                    ${f('welcomeMessage')}`}
                                </Text>
                                <Text
                                    fontSize="1.3em"
                                    alignSelf="end"
                                    lineHeight="1em"
                                    as={'span'}
                                    color="currentColor">
                                    {f('commonSiteName')}
                                </Text>
                            </Flex>
                        </>
                    }
                    description={<>{f('welcomeDescription')}</>}
                    primaryActionLabel={f('welcomeDiscoverShop')}
                    secondaryActionLabel={f('welcomeLearnMore')}
                    primaryUrl="/shop"
                    secondaryUrl="/blog"
                    primaryActionAnnotation={f('welcomeDeals')}
                />
            </Banner>
            <Stack as={Container} p={4} maxW={APP_MAX_WIDTH} gap={8}>
                <Divider />
                <SectionSideBySide sections={sections} />
                <Divider />
                <CallToActionNewsletter />
            </Stack>
        </PageLayout>
    );
}
