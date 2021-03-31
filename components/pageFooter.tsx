import { Box, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import BackToHome from './backToHome';

const Footer = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';

    return (
        <Box bgColor="blackAlpha.100" mt={8}>
            <hr />
            <Container as="footer" p={4} textAlign="center">
                {!isHome && <BackToHome />}
            </Container>
        </Box>
    );
};

export default Footer;
