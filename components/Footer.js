import { Container } from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
    return (
        <Container as="footer" p={4} textAlign="center">
            This is the footer
            <ThemeToggle />
        </Container>
    );
};

export default Footer;
