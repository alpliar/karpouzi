import { Box, Container, Stack, StackItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import BackToHome from './backToHome';

const Footer = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';
    const copyrightMention = `© Karpouzi ${new Date().getFullYear()}`;

    return (
        <Box bgColor="blackAlpha.100" mt={8}>
            <hr />
            <Container as="footer" p={4} textAlign="center">
                <Stack>
                    <StackItem>{!isHome && <BackToHome />}</StackItem>
                    <StackItem>{copyrightMention}</StackItem>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
