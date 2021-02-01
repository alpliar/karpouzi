import { Container } from 'theme-ui';
import ColorModeChooser from './ColorModeChooser';

const Footer = () => {
    return (
        <Container as="footer" p={4}>
            - This is the footer -<br />
            <ColorModeChooser />
        </Container>
    );
};

export default Footer;
