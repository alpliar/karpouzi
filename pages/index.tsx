import { Container, Divider, Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import Banner from '../components/banner';
import CallToActionNewsletter from '../components/callToActionNewsletter';
import CallToActionWithAnnotation from '../components/callToActionWithAnnotation';
import SectionSideBySide from '../components/layout/sectionSideBySide';
import PageLayout, { siteTitle } from '../components/pageLayout';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';

export default function Home() {
    const router = useRouter();
    const { formatMessage } = useIntl();
    const f = (id: string) => formatMessage({ id });

    const handleVisitShop = () => {
        router.push('/shop');
    };

    const handleKnowMore = () => {
        router.push('/blog');
    };

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
                                    {f('welcomeMessage')}
                                </Text>
                                <Text
                                    fontSize="1.5em"
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
            <Container p={4} maxW={APP_MAX_WIDTH}>
                <Divider />
                <SectionSideBySide />
                <Divider />
                <CallToActionNewsletter />
            </Container>
        </PageLayout>
    );
}
