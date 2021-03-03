import { Box, Container } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box bgColor="blackAlpha.100">
            <hr />
            <Container as="footer" p={4} textAlign="center">
                This is the footer
            </Container>
        </Box>
    );
};

export default Footer;
