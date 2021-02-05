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
    Thead
} from '@chakra-ui/react';

const Stats = (
    <StatGroup textAlign="center">
        <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
                <StatArrow type="increase" />
                23.36%
            </StatHelpText>
        </Stat>

        <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
            </StatHelpText>
        </Stat>
    </StatGroup>
);
const TableStat = (
    <Table variant="striped">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
            <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
            </Tr>
        </Thead>
        <Tbody>
            <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
            </Tr>
        </Tbody>
        <Tfoot>
            <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
            </Tr>
        </Tfoot>
    </Table>
);
export default function Home() {
    // const [showModal, setShowModal] = useState(false);

    return (
        <Layout home={true}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Container p={4} maxW="4xl">
                <Box>
                    <Heading>Hi, welcome !</Heading>
                </Box>
            </Container>

            <Divider />

            <Container p={4} maxW="4xl">
                {Stats}
            </Container>

            <Divider />

            <Container p={4} maxW="4xl">
                {TableStat}
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
