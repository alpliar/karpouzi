import { Flex, Text } from '@chakra-ui/layout';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import Banner from '../components/banner';
import CallToActionNewsletter from '../components/callToActionNewsletter';
import CallToActionWithAnnotation from '../components/callToActionWithAnnotation';
import { SectionProps } from '../components/layout/Section';
import SectionSideBySide from '../components/layout/sectionSideBySide';
import PageLayout, { siteTitle } from '../components/pageLayout';

export default function Home() {
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });
    const { data: session } = useSession();

    const sections: SectionProps[] = [
        {
            title: f('welcomeDiscoverProducts'),
            description: f('welcomeDiscoverProductsDescription'),
            url: '/shop',
            image: '/images/shop2.webp',
            buttonLabel: f('welcomeShopCTA'),
            colorScheme: 'orange',
            pattern: 'formalInvitation',
            useSecondaryColor: true
        },
        {
            title: f('welcomeDiscoverKarpouzi'),
            description: f('welcomeDiscoverKarpouziDescription'),
            url: '/blog',
            image: '/images/knowmore.webp',
            buttonLabel: f('welcomeBlogCTA'),
            colorScheme: 'yellow',
            pattern: 'houndstooth',
            useSecondaryColor: true
        },
        {
            title: f('newsletterSubscribe'),
            description: f('newsletterSubscribeHelper'),
            image: '/images/newsletter2.webp',
            buttonLabel: 'label',
            colorScheme: 'green',
            pattern: 'pixelDots',
            component: <CallToActionNewsletter colorScheme="green" />
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
                            <Flex
                                direction="column"
                                as="span"
                                align="start"
                                justify="start"
                                w="full">
                                <Text
                                    fontSize="0.75em"
                                    style={{ fontVariantCaps: 'small-caps' }}
                                    overflowWrap="anywhere">
                                    {`${session?.user?.name ? session?.user?.name + ', ' : ''}
                                    ${f('welcomeMessage')}`}
                                </Text>
                                <Text
                                    fontSize="1.3em"
                                    alignSelf="end"
                                    lineHeight="1em"
                                    as={'span'}
                                    color="currentColor"
                                    overflowWrap="anywhere"
                                    whiteSpace="pre-wrap">
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
            <SectionSideBySide sections={sections} />
        </PageLayout>
    );
}
