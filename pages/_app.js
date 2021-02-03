import PropTypes from 'prop-types';
import '../styles/global.scss';
import { ThemeProvider } from 'theme-ui';
import theme from '../styles/theme';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider resetCSS>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ChakraProvider>
    );
}

App.propTypes = {
    Component: PropTypes.func,
    pageProps: PropTypes.object
};
