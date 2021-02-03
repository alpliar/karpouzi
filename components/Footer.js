import { Container } from 'theme-ui';
// import ColorModeChooser from './ColorModeChooser';

const Footer = () => {
    return (
        <Container
            as="footer"
            p={4}
            sx={{
                textAlign: 'center'
            }}>
            - This is the footer
            {/* <ColorModeChooser /> */}
        </Container>
    );
};

export default Footer;
