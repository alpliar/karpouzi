import Head from 'next/head';
import PageLayout, { siteTitle } from '../components/pageLayout';
import { PropTypes } from 'prop-types';

import {
    Box,
    Container,
    Divider,
    Heading,
    Stat,
    StatGroup,
    StatHelpText,
    StatArrow,
    StatLabel,
    StatNumber,
    Table,
    TableCaption,
    Tbody,
    Tfoot,
    Tr,
    Td,
    Th,
    Thead,
    Text
} from '@chakra-ui/react';
import CallToActionWithAnnotation from '../components/callToActionWithAnnotation';
import { useRouter } from 'next/dist/client/router';
import CallToActionNewsletter from '../components/callToActionNewsletter';
import { useIntl } from 'react-intl';

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
                                {f('welcomeMessagePart2')}
                            </Text>
                        </>
                    }
                    description={
                        <>
                            <Text as="span" p={2}>
                                Fresh fruits and vegetables for your mind and body...
                            </Text>
                        </>
                    }
                    primaryActionLabel="Discover our shop"
                    secondaryActionLabel="Learn more"
                    handlePrimaryAction={handleVisitShop}
                    handleSecondaryAction={handleKnowMore}
                    primaryActionAnnotation="Pretty good deals !"
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
