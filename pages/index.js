import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
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

export default function Home() {
    // const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleVisitShop = () => {
        router.push('/shop');
    };

    const handleKnowMore = () => {
        router.push('/');
    };

    return (
        <Layout home={true}>
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
                            Welcome to <br />
                            <Text as={'span'} color={'green.400'}>
                                Karpouzi
                            </Text>
                        </>
                    }
                    description={
                        <>
                            <br />
                            🍇🍈🍉🍊🍋🍌🍍🥭
                            <br />
                            🍎🍏🍐🍑🍒🍓
                            <Box p={2}>Fresh fruits and vegetables for your mind and body...</Box>
                            🥝🍅🥥🥑🍆🥔🥕🌽
                            <br />
                            🌶️🥒🥬🥦🧄🧅🍄🥜🌰
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
        </Layout>
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
