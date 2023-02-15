import { Container, Divider, Flex, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import CallToActionNewsletter from '../components/callToActionNewsletter';
import CallToActionWithAnnotation from '../components/callToActionWithAnnotation';
import SectionSideBySide from '../components/layout/sectionSideBySide';
import PageLayout, { siteTitle } from '../components/pageLayout';
import { APP_MAX_WIDTH } from '../constants/ui/main.layout';
import Banner from '../components/banner';

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
            <Banner pattern="linesInMotion" height="inherit">
                <CallToActionWithAnnotation
                    title={
                        <>
                            <Flex direction="column" as="span" align="start" justify="start">
                                <Text>{f('welcomeMessage')}</Text>
                                <Text
                                    lineHeight="1em"
                                    // fontSize="9xl"
                                    as={'span'}
                                    color={'white'}
                                    style={{
                                        textShadow: `
                                        2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000,
                                        1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000`
                                    }}>
                                    {f('commonSiteName')}
                                </Text>
                            </Flex>
                        </>
                    }
                    description={
                        <>
                            <Text as="span" p={2}>
                                {f('welcomeDescription')}
                            </Text>
                        </>
                    }
                    primaryActionLabel={f('welcomeDiscoverShop')}
                    secondaryActionLabel={f('welcomeLearnMore')}
                    handlePrimaryAction={handleVisitShop}
                    handleSecondaryAction={handleKnowMore}
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
