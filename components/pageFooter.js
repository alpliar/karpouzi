import { Box, Container, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Footer = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';

    return (
        <Box bgColor="blackAlpha.100">
            <hr />
            <Container as="footer" p={4} textAlign="center">
                {!isHome && (
                    <LinkBox cursor="pointer" as="span">
                        Feeling lost ?{' '}
                        <Link href="/" alt="go back to home">
                            <LinkOverlay>Go back to home</LinkOverlay>
                        </Link>
                    </LinkBox>
                )}
            </Container>
        </Box>
    );
};

export default Footer;
