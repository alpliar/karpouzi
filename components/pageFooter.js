import { Box, Container, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from './link';

const Footer = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';

    return (
        <Box bgColor="blackAlpha.100">
            <hr />
            <Container as="footer" p={4} textAlign="center">
                {!isHome && (
                    <Box p={2} textAlign="center">
                        <LinkBox cursor="pointer">
                            Feeling lost ?{' '}
                            <LinkOverlay>
                                <Link href="/" alt="go back to home">
                                    Go back to home
                                </Link>
                            </LinkOverlay>
                        </LinkBox>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Footer;
