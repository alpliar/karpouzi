import { Container, Divider, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { PropTypes } from 'prop-types';
import { useIntl } from 'react-intl';
import CallToActionNewsletter from '../components/callToActionNewsletter';
import CallToActionWithAnnotation from '../components/callToActionWithAnnotation';
import PageLayout, { siteTitle } from '../components/pageLayout';

export default function Home() {
    // const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const { formatMessage } = useIntl();
    const f = (id) => formatMessage({ id });

    const { locale, locales, defaultLocale } = router;

    const handleVisitShop = () => {
        router.push('/shop');
    };

    const handleKnowMore = () => {
        router.push('/blog');
    };

    return (
        <PageLayout home={true}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            {/* <Container p={4} maxW="4xl">
                <Box>
                    <Heading>Hi, welcome !</Heading>
                </Box>
            </Container>

            <Divider /> */}

            <Container p={4} maxW="4xl">
                <CallToActionWithAnnotation
                    title={
                        <>
                            {f('welcomeMessage')} <br />
                            <Text as={'span'} color={'green.400'}>
                                {f('commonSiteName')}
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
            </Container>

            <Divider />

            <Container p={4}>
                <CallToActionNewsletter />
            </Container>
        </PageLayout>
    );
}

Home.propTypes = {
    allPostsData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            date: PropTypes.string,
            title: PropTypes.string
        })
    )
};
