import { Container } from 'theme-ui';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
    return (
        <Container
            as="footer"
            p={4}
            sx={{
                textAlign: 'center'
            }}>
            - This is the footer
            <ThemeToggle />
        </Container>
    );
};

export default Footer;
