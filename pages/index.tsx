import { Container, Divider, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useIntl } from 'react-intl';
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

            <Container p={4} maxW={APP_MAX_WIDTH}>
                <CallToActionWithAnnotation
                    title={
                        <>
                            <Text as="span">
                                {f('welcomeMessage')} <br />
                                <Text as={'span'} color={'green.400'}>
                                    {f('commonSiteName')}
                                </Text>
                            </Text>
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
                <Divider />
                <SectionSideBySide />
                <Divider />
                <CallToActionNewsletter />
            </Container>
        </PageLayout>
    );
}
